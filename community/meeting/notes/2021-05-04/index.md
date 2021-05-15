# Podman Community Meeting
## May 4, 2021 11:00 a.m. Eastern (UTC-4)

### Attendees (36 total)
Tom Sweeney, Brent Baude, Jhon Honce, Dan Walsh, Chris Evich, Lokesh Mandvekar, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Matt Heon, Ashley Cui, Giuseppe Scrivano, Anders Björklund, Paul Holzinger, Greg Shomo, Scott McCarty, Ed Haynes, Christian Felder, Eduardo Vega, Alex Litvak, Holger Gantikow

#### May the Fourth be with You! - `podman run --rm -it -e mode=stdout quay.io/tomsweeneyredhat/asciistarwars:latest`

[May the 4th Article](https://www.redhat.com/sysadmin/may-fourth-podman)

## Meeting Start: 11:05 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/Qq_IsjrnOaG)


## Podman and IPv6 Status
### Matt Heon
#### (1:49 in the video)

Working on improving Podman IPv6 support, the ability to set multiple static IP addresses for a cotainer, this will allow Podman to do --ip and --ipv6 on the same containers so you can have static IPs for both network types.  Also work ongoing for different ip's at the same time for one container on different network types (one v4 and one v6 per network).

Support being worked on to allow Podman to automatically set IPv6 as the default network.  The current default network does not support IPv6 at all.  Working on improving support IPv6 in `podman network` so via configuration options, you'll be able to automatically assign using this command.

No work on IPv6 port forwarding in the next release, but sometime in the future.  Looking at Podman v3.3 for delivery of the IPv6 improvements.  Next relase v3.2 rc1 is being cut tomorrow.

##  Running Docker, Podman, and even Kubernetes inside rootless Podman containers
### Cesar Talledo - [Nestybox](https://www.nestybox.com/)
#### (5:10 in the video)

[slides](https://github.com/containers/podman.io/blob/main/community/meeting/notes/2021-05-04/sysbox-podman-community-meeting.pdf)

Podman integrated to running system level software inside of rootless containers.

Developers of the Sysbox runtime, founders of Nestybox.

Enhance containers to run most workloads that run in VMs, seamlessly and with strong isolation.

Systemd, Docker, Podman and K8s, etc are the system workloads they're looking to run, seamlessly and with strong isolation.

A command like `podman run --userns=auto:size=65536 -it any-image` could run a container running any system, easy, powerful and secure.

They made the changes with sysbox-runc.  Strong isolation (Linux User Namespace), Runs same workloads on VMs, seamlessly.  No special images.  

OpenSource software.

Features:
    Usernamespace on all containers
    file-system ID shifting (shiftfs now, ID-mapped mounts soon)
    procfs and sysfs virtualization
    syscall interception
    Initial mount locking
    Easy preloading of inner container images
    Sharing inner container images across Sysbox containers.
        Easy to load inner container images
        Allows for shared disk space of inner container images
        
Limitations
    Linux only
    Need 5.5+, Ubuntu 5.0+
    90% OCI compatible
        Sets up container environments to enable it to run system software, for instance '--privilege' option won't work, but that makes sense.
    Some workloads don't run inside the containers
        IPvs, kernel module loading, etc.
    Sysbox is a daemon that must run as root.
    
Tries not to get in the way of the syscalls

##### Demo (20:55 in the video)

Prefers Ubuntu, but deals with other linux.

systemctl start sysbox
sudo podman run --runtime=sysbox-runc -it --rm --userns=auto:size=65536 --hostname=syscont nestybox/ubuntu-bionic-systemd-docker

Showed the inside of the container with Docker already running, all inside the container.

Solving a container with limit to cgroup with certain memory, then that's what you should see.  They want to hide as much info of the host from inside the container.


**Summary**

    Currently runing system sofware in containers requires
        Insecure (privileged) containers
        Complex container images and commands
    
    We need to change this
        Enables powerful use cases for containers (beyond micro-service deployment)

    Sysbox is a next-gen runc designed for this.

    Enterprises are using it to replace VMs in many scenarios.

[Nestybox GitHub](https://github.com/nestybox/sysbox)

##  Podman Python Client Demo
### Jhon Honce
#### (33:45 in the video)


Python bindings are modeled after Docker py.  Wanted to allow people to run their Docker py scripts.

Podman py is up on [Pypi](https://pypi.org/project/podman-py/) and [Demo](https://github.com/containers/podman-py/blob/main/contrib/examples/demo.py) on repo in GitHub.

Python Podman going through the packagin process for Fedora now, RHEL later.

##### Demo (40:32 in the video)

Created a pod, and removed containers and pods that were created.

Showed code, craete client, shows version, api and min api.  Pulled latest alpine image and created a pod and container in the pod, and then removes image, pod and containers.  Then lists the images.

Used the unix domain socket, new Pull Requests for ssh in the works and also tcp sockets.

Bindings are now on par with `podman --remote` for doing connections.

Can you run Docker py and Podman py at the same time?  Yes!  No locking preventing that.  Can even run podman --remote through the compatibiltiy layer.

## Questions?
#### (47:30 in the video)

1. No questions asked. 

## Topics for Next Meeting

## Next Meeting: Tuesday June 1, 2021, 11:00 a.m. Eastern (UTC-4)


### Meeting End: 11:55 a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:

```
Me10:55 AM
Please sign in on HackMD https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
And "May the Fourt be with you!
Edward Haynes11:19 AM
I remember a few years ago Intel was working on "clear containers" to put very lightweight virt around each container for protection ... did this ever amount to anything?
Dan Walsh (rhatdan)11:20 AM
Edward ClearContainers became Kata Containers, But they run with a virtualization layer, and their own kernel.
Rodny Molina11:21 AM
https://github.com/nestybox/sysbox
Alex Litvak11:21 AM
bad audio
Dan Walsh (rhatdan)11:22 AM
Alex it sounds fine here
Alex Litvak11:23 AM
sorry it look like a local problem
Anders Björklund11:33 AM
What is the biggest difference between this (product) and LXC ?
Rodny Molina11:34 AM
Sysbox is, by design, compatible with Docker, K8s and now Podman. LXC (and LXD) are not AFAIK.
Anders Björklund11:35 AM
So a difference for the forward-looking but similar but for the backward-looking, got it. Thanks.
Rodny Molina11:38 AM
Even for the backward-looking, Sysbox procfs/sysfs emulation goes further than what LXD is doing, so we believe you should be able to run many more system workloads in Sysbox when compared to LXD. To be fair, LXD has some features that we don't have.
manish11:39 AM
nice cesar ... great project
Cesar Talledo11:39 AM
thanks Manish!
Anders Björklund11:39 AM
We originally used OpenVZ for this, which was how I got started with containers originally
Matt Heon11:42 AM
Ah, wayland!
Lokesh Mandvekar11:43 AM
https://bugzilla.redhat.com/show_bug.cgi?id=1956841
jhonce11:45 AM
ssh ro-BRmMS9jtgcXdRW6eMRyH5zrQV@sfo2.tmate.io
Uwe11:55 AM
thanx
Me11:55 AM
https://www.redhat.com/sysadmin/may-fourth-podman
```
