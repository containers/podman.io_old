# Podman Community Meeting
## June 1, 2021 11:00 a.m. Eastern (UTC-4)

### Attendees (24 total)
Tom Sweeney, Brent Baude, Jhon Honce, Dan Walsh, Chris Evich, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Matt Heon, Ashley Cui, Paul Holzinger, Greg Shomo, Tom Deseyn, Andrew Slice, Anders Björklund, Shion Tanaka, Alex Litvak, Juanje Ojeda, Deepak Bhole, Eduardo Vega, Falsal Rzzzak, Juanje Ojeda, Omair Majid, Peter Hunt, Preethi Thomas, Uwe Reh

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/3fO@uV5g9KF)

## General Announcements
### Tom Sweeney

* No July Meeting due to holiday and vacations, we meet next on Tuesday August 3rd.
* The Podman IRC channel is moving.  We've left the Freenode server and now the #podman channel lives on the Libera server. 


## Podman and TYE
### Tom Deseyn
#### (3:00 in the video)
#### [Slides](https://github.com/containers/podman.io/blob/main/community/meeting/notes/2021-06-01/tye_meets_podman.pdf)

Tom is working for Red Hat on .NET.  His team has been building and packaging .Net on Red Hat Enterprise Linux (RHEL) and OpenShift Container Platform (OCP) for about the past five years. Focus on cloud development.  TYE is from Microsoft and is meant to ease development of .NET based applications.  TYE was not originally working with Podman, but he worked with the Podman team to get it to work.  That was delivered earlier this year.   Many of these features were also needed by Docker Compose.

Two use cases, Development and Deployment. 

Development
* Run several services
  * .Net applications
  * Containers
    * Let them find one another
  * Dashboard
  * Debugging
  * Watch


Deployment
* Containerize
* Generate Kubernetes manifest
* Service binding

Demo (7:00 in the video)

TYE has a command line interface. The `tye run` command will bring up a dashboard of services.  He can then traverse through the services in the GUI.

TYE started the applications and the containers for each service including the ports.  Each service has a log that can be looked at and metrics from .NET within the GUI.

This was all done via a yaml file that defined the services.  Based on this, TYE launched the applications.

(Demo End 11:35)

Tom showed a second slide.

Blue boxes are containers, red boxes are regular applications running on the host.

TYE allows you to connect to a running application and debug it.

TYE started two containers.  For both backend and frontend proxies uses the loopback provided by Podman.   Now in .NET he can debug within the provided interface from .NET.  Under the covers it's using Podman v3.0 as it was using Docker before.  

TYE is a single host tool for developers.

## Podman v3.2.0 Updates
### Matt Heon
#### (15:50 in the video)

Currently on final RC, hoping to get final release today or in the next few days.

[Podman v3.2.0-rc3 Release Notes](https://github.com/containers/podman/releases/tag/v3.2.0-rc3)

Features:
* Docker compose is supported with rootless Podman.
* Rootless CNI networking should work on any architecture.
* Podman Machine commands to handle virtual machines, most useful for MacOS.
* Podman generate Kube updates
* podman start --all now works
* Changes made to allow Podman to work better in a container.  Blog post incoming with details.

## Podman in Kubernetes
### Urvashi Mohnani
#### (20:18 in the video)

Demos for running Podman inside a Kubernetes cluster.  Still slightly experimental.

Urvashi has a local Kubernetes cluster up and is running CRI-O as her container runtime engine.  Easiest way to run things is to have privileged set to true in the cluster and she ran a user set to 1000.

She ran a simple Podman container inside of a Kubernetes container to do a "Hello" to sysout.

She then built within the Kubernetes container.  Even though the Kubernetes container is privileged, the Podman container within is not and is using usernamespace.

Now she showed running as an unprivileged Kubernetes container, and to do that you need to set selinux to permissive mode.  That's necessary as  the containers can't mount all the file systems that they need to run.  You also need to mount the dev fuse device as that's needed for the overlayfs file system.

She then ran a nonprivileged container within a nonprivileged Kubernetes containers.  Showed doing builds, but errors can occur.  Need to change `--isolation` to chroot in the  `podman build` command.

Ran Podman in a unprivileged container, but the Podman container was run as root.

You can also run Podman service on your host and leave a socket entry to your container.  This is done with a volume mount of the socket.  You can then run `podman --remote` command against that socket.

If you use CRI-O as your runtime engine, you can add a user and a node annotation to your runtime.  But it is experimental at the moment in Kubernetes and CRI-O.  However, that tells CRI-O to create your container within your usernamespace.

A blog coming out for running Podman in Kubernetes and it will become part of the official documentation.


## Podman Machine Updates
### Brent Baude
#### (32:00 in the video)
#### [Slides](https://github.com/containers/podman.io/blob/main/community/meeting/notes/2021-06-01/podman_machine.pdf)

Why run Podman Machine on Linux rather than run it on the host?  It makes sense from a MacOS.  Would be good where you wanted to run containers and wanted to have some level of separation.  Also good for testing on a Linux machine before moving it to Windows or Mac.  Could also be good to see if Podman works with other Linux Operating Systems other than your native system.

* What's in development?
  * Working custom images for x86_64 Linux and MacOS and aarch64 Linux and aarch MacOS
  * Port forwarding on hot
  * Some buggy code that needs testing
* Remaining obstacles
  * Merge development code
  * Packaging for both Linux and Brew
  * aarch64 support for FCOS is pending (will lead with x86_64)
  * Upstream merge of qemu support for M1
* Looking forward
  * Need a reasonably performant sollution for mounting from host
  * Work with FCOS team to reduce size of base image.

It makes sense that you'd run Linux on MacOS to create a container, but why do so on Linux?  Possibly to test different archtectures, to maintain a level of separation between the host and the container, or running a separate Linux distribution.  Good for proof of concept testing to make sure the container will run on Windows or Mac in the machine.

## Questions?
#### (38:44) in the video)

1.  More general discussions during the meeting for a more general discussion?  If you have an idea that you'd like discussed, talk to Tom Sweeney to setup a meeting with folks.  Might do IRC meetings too for a set time.

2.  Kubernetes on Podman?  Running Podman on Kubernetes now (see Urvashi's demo above).  Using CRI-O in Podman basically.  It would be nice to have a Kublet that queries Podman.

3. Can you sign an image in Kubernetes then use that in Kubernetes?  We have simple signing in Podman with GPG, but Kubernetes doesn't understand this.  

## Topics for Next Meeting

Topic suggestion: Using Podman to sign images in k8s and then using signed images in k8s ?  (Focus on GPG signing.)

## Next Meeting: Tuesday August 3, 2021, 11:00 a.m. Eastern (UTC-4)


### Meeting End: 11:57 a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:

```
Me10:56 AM
Please sign in https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?edit
baude11:01 AM
you have to unmute me
it says you muted me
Matt Heon11:23 AM
https://github.com/containers/podman/releases/tag/v3.2.0-rc3
(These are marked as preliminary but they're almost-final - just a few more changes planned)
Faisal Razzak11:33 AM
Will we have documentation for podman inside k8s ?
Alex Litvak11:33 AM
podman in lxc?
Matt Heon11:35 AM
AFAIK LXC is usually run rootless, which is probably going to be problematic
Likely can be convinced to work but it's going to take effort
@Faisal the intent is for the blog to be the documentation - we're going to host a copy on the website and keep updating it as things change
Alex Litvak11:36 AM
I will give it a shot and report but most of mine lxcs are privileged
Matt Heon11:36 AM
Ah, that should be a lot easier
May have to add /dev/fuse to get fuse-overlayfs working
Faisal Razzak11:48 AM
Topic: Using podman to sign images in k8s and then using signed images in k8s ?
I want to focus on GPG signing and not notary
Me11:51 AM
 Fun Fact: A chef's tall hat (officially known as a "toque") is traditionally made with 100 pleats, meant to represent the 100 ways to cook an egg.
Faisal Razzak11:52 AM
The effort to integrate podman with codesign or any other interface. Are these meetings public or can I participate ?
Faisal Razzak11:55 AM
ok, I will
I have background in code signing using GPG and PKCS11 interfaces
Uwe Reh11:56 AM
by
```
