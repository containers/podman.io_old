# Podman Community Cabal Meeting Notes

Attendees: Tom Sweeney, Aditya Rajan, Matt Heon, Brent Baude, Ashley Cui, Chris Evich, Preethi Thomas, Urvashi Mohnani, Eduardo Santiago, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Walsh, Valentin Rothberg, Flavian Missi, Jhon Honce, Lorenzo M. Catucci, Miloslav Trmac, Scott McCarty

## December 16, 2021 Topics
1. Lima - Anders, Matt
2. How to detect default network backend (CNI or netavark) - Paul, Matt

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=f4dXfsFmDck)

Meeting start 11:02 a.m. Thursday, December 16, 2021

### Lima (0:35 in video) - Anders, Matt 

[Lima](https://github.com/lima-vm/sshocker)

Podman machine is a way to launch virtual machines, mostly on OSX, to run Podman containers from.  Issues with Volumes.  Thinking about replacing the back end of podman machine with Lima.

Brent thinks it might not be a good match as there are some tech issues.  For instance, he couldn't find anything related to ignition.  It's a competing cloud-init tool and it doesn't play well with qemu.  It also pulls in containerd code.  The YAML support is tailored to containerd.  

On the Lima project page, motivation is to promote containerd.  Rancher has debranded and used Lima in the background on Mac.  The big hurdle is ignition.

Benefits of Lima:  Volumes and port forwarding.  Possible to use the same solution without abandoning all of the drivers. We could potentially borrow solutions, as the backend is qemu for lima.  Lima uses ssh for forwarding, so different solutions for the back end.  Potentially could use Fedora in addition to CoreOS.

Currently, we can't use Fedora due to ignition.  Cloud-init doesn't install there by default, but we could install it.  Brent found it in Fedora 35, though, so it might not be there in prior versions.

Anders made some sample YAML files* for Fedora 35.  Lima works as podman machine does.  The difference between Lima and podman machine now is volume support.  Anders has a PR for providing sshfs volume support for podman machine.

\* Examples for lima: https://github.com/afbjorklund/fedora-lima

To get parity with Lima/Docker in podman machine, we'd need to get Ander's [sshfs PR](https://github.com/containers/podman/pull/12584) (and [virtfs PR](https://github.com/containers/podman/pull/11454)) merged.

Dan likes the ssh solution.  We might be able to do virtfs later.

Brent's concern with Lima is managing mounts as the containers go up and down.  It might be problematic.  The volume work for podman machine won't be able to use the current mount code, we need to do something in podman start.

We might get push back as this wouldn't be the Docker behavior.  We are trying to make the volume handling on Mac to be as simple as possible for the end-user.  Anders thinks we might be able to have an "advanced users" solution that would allow for configuration; otherwise, you'd get a default "easy" setup.  A number of possible solutions were bantered about.

Big advantage, Lima can support all distros except CoreOS.  Podman machine could theoretically do that via cloud-init, but an engineering effort.

Currently using qemu to launch machines, Lima is a layer on ssh. It is very similar to what docker machine was a while back.  It doesn't support ignition.  The upside is we could more easily run on Ubuntu and other distros.  You might not be able to run the container on a variety of distros.  Rancher nerdctl and Lima are both trying to get into this space.

We most likely could get volumes into podman machine than getting Lima into it.  We could potentially wire Lima in later.

Scott talks about value creation.  Would Rancher/Suse collaboration help?  The other side is what the customer would get from using Lima vs. podman machine?  

Most of the solutions don't think sshfs is a good long-term solution but a stepping stone.

Dan is leaning towards doing what we're doing with sshfs.  This will be at least the short term solution, will evaluate further for a longterm

### Detect default network backend (40:40 in video) - Paul, Matt

For Podman 4.0, how to detect default network backend (CNI or netavark)

**Requirement:** existing installs should continue to use CNI, new installs use netavark.

Working on netavark and want to install it, but with the current cni, it could cause breaking changes.

On the first startup, we could check for images and containers.  If none, switch to netavark.

You can't use CNI and netavark in parallel, or things will go awry.  For new or clean installs, it should be fine.

To switch, change the setting in network.conf to netavark. By default, it's an empty value.

Should we add a "nag" for people using CNI to bump up?  Will we be getting bug reports on it?  Matt thinks long-term, it would be good to support CNI.  Matt would like to throw an error when trying to run IPv6 on CNI to let them know they're on netavark.  We need to be careful not to overload the user with suggestions.

We need to get documentation together telling folks how to convert from CNI to netavark.  Probably will need some kind of reset procedure.

#### Open discussion ( 50:10 in video)

No further discussion
 
### Next Meeting: Thursday January 20, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
None set.

Raw Meeting Chat:

```
You11:00 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You11:03 AM
Please sign in: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Aditya Rajan11:13 AM
https://github.com/qemu/qemu/blob/master/docs/specs/fw_cfg.txt
-fw_cfg
Brent Baude11:14 AM
$ rpm -qa | grep cloud
fedora-release-identity-cloud-35-33.noarch
fedora-release-cloud-35-33.noarch
cloud-init-20.4-7.fc35.noarch
cloud-utils-growpart-0.31-9.fc35.noarch
Christopher Evich11:16 AM
ya, I just double-checked too, my bad.
Ashley Cui11:20 AM
https://github.com/containers/podman/pull/12584
You11:21 AM
TY AC!
Ashley Cui11:21 AM
and i guess this too: https://github.com/containers/podman/pull/11454
Valentin Rothberg11:24 AM
brb
ieq-pxhy-jbh
```
