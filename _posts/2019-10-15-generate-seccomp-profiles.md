---
title: Generate SECCOMP Profiles for Containers Using Podman and eBPF
layout: default
author: vrothberg
categories: [blogs]
tags: containers, security, seccomp, oci, bpf, ebpf, tracing, syscall
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Generate SECCOMP Profiles for Containers Using Podman and eBPF
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})


Containers run everywhere. They run in the cloud, they run on IoT devices, they run in small and in big companies and wherever they run, we want them to run as securely as possible. In this article, I describe the [Google Summer of Code](https://summerofcode.withgoogle.com/) project that [Divyansh Kamboj](https://twitter.com/weirdwiz_), [Dan Walsh](https://twitter.com/rhatdan) and [I](https://twitter.com/vlntnrthbrg) have been working on and how we improved the state of the art in securing containers, and how you can try it out.


# Background

At [DevConf.cz](https://www.devconf.info/cz/) in early 2019, Dan Walsh and I were talking about container security and how we could improve the status quo in a user-friendly fashion. Among other things, we talked about [seccomp](http://man7.org/linux/man-pages/man2/seccomp.2.html), a widely used security feature of Linux. At its very core, seccomp allows for filtering the syscalls invoked by a process and can thereby be used to restrict which syscalls a given process is allowed to execute. Many software projects such as Android, Flatpak, Chrome and Firefox use seccomp to further tighten the security. One threat model seccomp protects against is the damage a malicious process can do. The fewer syscalls are available, the smaller is the attack surface. Hence, an attacker might gain control over some process of a web browser but seccomp will restrict the set of available syscalls to only those it needs. For instance, the syscalls needed for a rendering a website. The reduced attack surface can prevent the attacker from gaining control over the system. This makes seccomp a powerful security tool but while talking about it Dan and I quickly realized there is room for improvement.

The tricky part of security is making it user friendly. A security mechanism should not turn into an annoyance or an obstacle. Otherwise some users will turn it off. Most container tools use a default seccomp filter which was initially written by [Jesse Frazelle](https://twitter.com/jessfraz?lang=de) for Docker. This default filter found a balance between tightening the security while remaining portable to allow most workloads to run without receiving permission errors. The fact that this default filter is used by Docker, Podman, CRI-O, containerd and other tools on millions of deployments around the globe, shows its importance and impact. However, the default filter is pretty loose and it still allows more than 300 of the 435 syscalls on Linux 5.3 x86_64. The high number of available syscalls is essential to support as many containers as possible but according to Aqua Sec, most containers require only [40 to 70 syscalls](https://blog.aquasec.com/aqua-3.2-preventing-container-breakouts-with-dynamic-system-call-profiling). This means that the syscall attack surface of an average container could further be reduced by around 80 percent. But if we want to restrict more syscalls than the default filter, we face the problem of finding out which syscalls a container actually needs. That’s the problem we decided to work on and to ultimately come up with an open-source solution that users can easily use and integrate into their workflows.

Dan and I started to philosophize about how we wanted to tackle the problem of finding out which syscalls a given container needs. Statically analyzing the code is theoretically optimal as we can determine the exact set of syscalls the program needs. But we quickly run into practical issues where corner cases cannot be covered and where users need a deep understanding of the code and certainly of the limitations of the individual analyzers. Such approaches are also programming-language specific and hence not generally applicable. All in all, static analysis does not provide the level of user friendliness and automation we wanted. Hence, we decided upon runtime analysis and proposed a project for Google Summer of Code under the umbrella of the [Fedora project](https://getfedora.org/). The project proposal was to trace the processes running inside a container and to create a seccomp filter based on the set of recorded syscalls. The proposal was eventually accepted and we are thrilled how far we came thanks to Divyansh Kamboj who worked with us during this summer and who has turned into an active contributor to our [github.com/containers](https://github.com/containers) projects.

# Tracing the syscalls of a container

After some initial experiments with [ptrace](https://en.wikipedia.org/wiki/Ptrace), we were looking for an alternative tracing mechanism. Ptrace has some considerable performance impacts that we were not willing to take, so Divyansh explored the idea of using audit logging of seccomp actions. Since Linux v4.14, the actions of seccomp filters can be recorded in the audit log. Using seccomp to create a new seccomp filter was tempting and the initial experiments have shown promising results until we started to run multiple containers in parallel. We could see and track which syscalls have been used but we could not figure out which process and hence which syscall belongs to which container. The Linux kernel community is currently debating to add an [audit container ID](https://lwn.net/Articles/750313/) which identifies a container in the logs but there is no consensus yet and we do not expect a solution in the near future. We had to find another solution.

Eventually, we decided to use the [extended Berkeley Packet Filter (eBPF)](https://lwn.net/Articles/740157/) for tracing. eBPF allows for writing custom programs that can hook into various code paths in the kernel. These programs can be injected from user space into the kernel who interprets them in a special virtual machine. BPF was originally written to inspect networking packets directly in the kernel to achieve the lowest possible latency and best performance. Nowadays, with eBPF we can inspect many more aspects of the kernel. For our purpose, we hook into the sysenter tracepoint when entering the kernel from user space. This allows us to quickly inspect which syscalls are called by a given process. Although eBPF is fast, we still faced the aforementioned absence of a container concept in the kernel, so we had to find a way to know if a given process is part of the container we want to trace or not. We decided to identify a container by its PID namespace. If the PID namespace of the process we hit in our eBPF program corresponds to the container we are currently tracing, then we record the syscall. Ultimately, if a container creates a new PID namespace, we will not trace processes inside the new namespace and generate an inaccurate filter. But that is pretty much the only limitation.


# The OCI seccomp bpf hook

We implemented the syscall tracer as an Open Container Initiative (OCI) [runtime hook](https://github.com/opencontainers/runtime-spec/blob/master/config.md#posix-platform-hooks). OCI runtime hooks are called at different stages of the lifecycle of a container and are executed by OCI-compliant container runtimes, such as runc.  Runc is used to spawn and run containers, and is the default runtime of Podman, containerd, Docker and many other tools. Our syscall-tracing hook runs at the prestart stage, where the init process of the container is created but not yet started. At this point, we can extract the PID namespace of the container, compile the eBPF program and start it. All this happens before the container is started, so we do not run into a race condition and avoid losing any early syscalls of the container. Once the eBPF program is running, we detach it from the hook and the container runtime can start the container. All source code is open source and can be downloaded from [github.com/containers/oci-seccomp-bpf-hook](https://github.com/containers/oci-seccomp-bpf-hook). We are currently creating packages for Fedora and CentOS and hope to provide packages for more distributions in the near future. In the following, we go through a step-by-step example how the hook can be used in practice.

Let’s first install [Podman](https://podman.io/). Podman is a daemonless container engine for running containers and Pods and supports running [rootless containers](https://opensource.com/article/19/2/how-does-rootless-podman-work).

```
$ sudo dnf install -y podman
```

Next, we clone the git repository of the OCI seccomp bpf hook to compile and install it. Note that we need to install a few more packages in order to compile the hook.

```
$ sudo dnf install -y bcc-devel bcc-tools git golang libseccomp-devel make
$ git clone https://github.com/containers/oci-seccomp-bpf-hook.git
$ cd oci-seccomp-bpf-hook
$ make binary
$ sudo make install
```

Now, with the hook being installed we can use Podman to run a container and use the hook for tracing syscalls. eBPF requires root privileges so we cannot make use of Podman’s rootless support while tracing. However, we can use the generated seccomp profiles for running the workloads in a rootless container.

```
$ sudo podman run --annotation io.containers.trace-syscall=of:/tmp/ls.json fedora:30 ls / > /dev/null
```

In the upper example, we are running ls in a fedora:30 container. The annotation io.containers.trace-syscall is used to start our hook while its value expects a mandatory output file (short “of:”) that points to a path where we want the new seccomp filter to be written. In fact, the output file is a json file which is often referred to as a seccomp profile that container engines such as Podman and Docker will eventually parse and compile into a seccomp filter for the kernel. When inspecting the generated profile we will notice that there are more syscalls than ls executes. Those syscalls are the ones that runc invokes after having applied the seccomp profile and before starting the container, so they are essential to prevent us from getting permission errors when reusing the profile. However, we do not need to worry about that as the hook is clever enough to add these syscalls. Let’s run a few containers using the generated profile.

```
$ sudo podman run --security-opt seccomp=/tmp/ls.json fedora:30 ls / > /dev/null
$ sudo podman run --security-opt seccomp=/tmp/ls.json fedora:30 ls -l / > /dev/null
ls: cannot access '/': Operation not permitted
```

Maybe you are as surprised as we were when first running this very example. It seems that ls uses additional syscalls with the -l flag which instructs ls to use a more verbose listing format. This example shows a limitation of our approach since the quality and completeness of the generated seccomp profile depends on the exhaustiveness when tracing, and that’s clearly something to keep in mind when using the hook. To avoid rerunning everything from scratch, the hook allows for the specification of an additional input file. This input file serves as a baseline to which all traced syscalls are added. This way, we do not need to redundantly run all, potentially time-costly, previous workloads but can add new data on top. Let’s try this out and rerun ls -l.

```
$ sudo podman run --annotation io.containers.trace-syscall=”if:/tmp/ls.json;of:/tmp/lsl.json” fedora:30 ls -l / > /dev/null
$ sudo podman run --security-opt seccomp=/tmp/lsl.json fedora:30 ls -l / > /dev/null
```

As mentioned above, we need root privileges for running the eBPF hook. But now, as we have generated the new seccomp profile, we can use it for running the same workload in a rootless container.

```
$ id -u
1000
$ podman run --security-opt seccomp=/tmp/lsl.json fedora:30 ls -l / > /dev/null
```


# When can I lock down my container?

One of the issues with attempting to generate seccomp profiles this way is that we cannot always be sure of having crossed all code paths that the container can potentially run. But if we have fairly extensive tests we should be able to gather a substantial amount of the syscalls for running the container within our CI/CD system. Now when we put our container into production, we can continue tracing the syscalls in the new environment. For example, if you use Kubernetes you could send the annotation down to [CRI-O](https://github.com/cri-o/cri-o) and it would run the hook. Now, we can periodically check if the generated profile has changed over time. If we do not see new syscalls added for a given amount of time, we can feel confident to start using the profile. If a container using the profile gets blocked from using a syscall, the kernel will continue to report these in the audit.log which allows us to manually look for missing syscalls.


# Try it out!

It was essential for us to base our work on open standards, which is why we decided to use the hooks specified in the OCI runtime specification. This way, our approach works with OCI compliant container runtimes such as runc or crun. Furthermore, we did not want to tie the tracing feature to a specific container engine. We wanted different tools such as Podman, Docker, CRI-O or containerd to be able to use the hook to encourage collaboration across different communities. Hence, we chose to use an OCI runtime annotation (i.e., io.containers.trace-syscall) to trigger the hook which is a generally supported feature.

As a next step, feel free to generate your own seccomp profiles with the oci-seccomp-bpf-hook. We would love to have feedback and always welcome contributions.

