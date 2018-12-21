---
title: Adding checkpoint/restore support to Podman
layout: default
author: Adrian Reber
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

# Adding checkpoint/restore support to Podman
## By Adrian Reber

With the help of [Checkpoint/Restore In Userspace (CRIU)](https://criu.org) I
was able to add initial checkpoint/restore support to Podman. Using
checkpoint/restore it is now possible to resume a container after a reboot at
exactly the same point in time it was checkpointed.

<!--readmore-->

In January 2018 I started to think about bringing checkpoint/restore support to
Podman. After a few initial discussions I started to actually look at the
necessary code changes. As Podman uses
[runc](https://github.com/opencontainers/runc) to run containers the initial
support for checkpointing containers was implemented pretty fast. Restoring was
a bit more complicated as it required additional changes to
[conmon](https://github.com/kubernetes-sigs/cri-o/pull/1427).

At that point I was able to checkpoint and restore a simple container.

To make checkpointing and restoring containers actually useful the restored
container needs to have the same IP address as the checkpointed container. That
was the point where the implementation got a bit complicated.

Although having worked on and with different container runtime's
checkpoint/restore support I never had a closer look at the networking setup.
It always worked. With Podman it did not at the beginning. The biggest
difference is, as far as I understand it right now, is that Podman uses
[Container Network Interface (CNI)](https://github.com/containernetworking/cni)
to configure the container's network. CNI creates a network namespace and after
configuring it tells `runc` to use that network namespace for the container.

The difference with this setup is that other container runtimes did not really
care about the actual name of the network namespace and CRIU just created on
restore a **new** network namespace with the same properties as during checkpoint.
So a new network namespace was created. For Podman this needs to be different.
CRIU needs to ignore/skip the network namespace and to handle this correctly I
had to adapt runc
([Add support to checkpoint and restore into external network namespaces](https://github.com/opencontainers/runc/pull/1849))
as well as CRIU
([criu: add support for external net namespaces ](https://github.com/checkpoint-restore/criu/commit/a8a3eb902305f0af603afa4c95b1b632fe7bd149)).

So after spending time on `runc` and CRIU I was able to return to Podman and
implement the [necessary changes](https://github.com/containers/libpod/pull/469)
which have been merged into Podman at the beginning of October 2018.

With all the background information out of the way, now finally some examples
how checkpoint/restore can be used in Podman. In my example I am using a
container running [Apache Tomcat](http://tomcat.apache.org/) with a slightly
modified HelloWorldExample.  The HelloWorldExample has been modified to return
a single integer which is is incremented after each request.

The following starts my test container:
```shell
# podman run --security-opt="seccomp=unconfined" --tmpfs /tmp --name podman-criu-test -d docker://docker.io/yovfiatbeb/podman-criu-test
```

As I am running my tests on a RHEL7 system I have to add
`--security-opt="seccomp=unconfined"` because CRIU cannot correctly handle
`seccomp` on RHEL7. The option `--tmpfs /tmp` is necessary as `tomcat` creates
temporary files in `/tmp` which are only correctly restored by CRIU if `/tmp`
is a `tmpfs`.

Once the container is up and running I can use `curl` to make requests to `tomcat`:

```shell
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
1
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
2
```

I can now checkpoint the container:
```shell
# podman container checkpoint podman-criu-test
```

Now the container is no longer running and could be restored. If I would
restore the container now the result would basically be the same as pausing and
unpausing the container. To make checkpointing useful I am now rebooting the
system before restoring the container. Once the system is up again I can
restore the container:

```shell
# podman container restore --keep podman-criu-test
```

Using `curl` to make requests to the container the result will now **not** start at
'1' again, but continue at the previous value:

```shell
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
3
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
4
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
5
```

As I have been using the `--keep` flag during restore, Podman has not deleted
the checkpoint after the restore, which would be the normal operation. If I
reboot the system again I can restore the container again:

```shell
$ podman container restore --keep podman-criu-test
```
And now the result from `curl` is the same as before:
```shell
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
3
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
4
$ curl 10.22.0.53:8080/examples/servlets/servlet/HelloWorldExample
5
```

So right now checkpointing and restoring can be used as either a stateful
pause/unpause between reboots or as way to go back in time of the container's
life.

I recorded all those steps in the demo below:

<a href="https://asciinema.org/a/FsTbx9mZkzeuhCM2pFOr1tujM" target="_blank"><img src="https://asciinema.org/a/FsTbx9mZkzeuhCM2pFOr1tujM.png" width="650"/></a>

The checkpoint/restore support in Podman is still very new and requires a git
checkout of CRIU using the `criu-dev` branch to work right now. The necessary
CRIU changes will be in the upcoming CRIU 3.11 release. `runc` and `conmon`
also need to be new enough for checkpoint/restore to work.

Currently only checkpoint/restore on the same system is supported, but to
make this feature really interesting it would be nice to be able to
migrate containers. To make container migration easy I want to offer
the possibility to easily export the checkpoint and appropriate container
state from one Podman instance to another Podman instance to be able to
restore the checkpointed container.
