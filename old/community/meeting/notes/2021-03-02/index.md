# Podman Community Meeting
## March 2, 2021 11:00 a.m. Eastern (UTC-5)

### Attendees (35 total)
Tom Sweeney, Brent Baude, Jhon Honce, Dan Walsh, Chris Evich, Lokesh Mandvekar, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Valentin Rothberg,  Giuseppe Scrivano, Miloslav Trmac, Parker Van Roy, Preethi Thomas, Neal Gompa, Matt Heon, Greg Shomo, Dan Walsh, Mayur Shetty, Ed Haynes, Juanje Ojeda, Ashley Cui, Christian Felder, Paul Holzinger, Shion Tanaka, Alex Litvak, Divyansh Kamboj, Marcin Skarbek, Sergio Lopez, James Cassell


## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/w9MNLQGTmf3)


## Multi-arch capabilities in Podman and Buildah
### Dan Walsh
#### (1:44 in the video)

Dan started with a demo on multi-arch.  Highlited qemu-user-static which is required to be installed.  It allows a Linux kernel to run multi-arch under qemu.

He showed `podman build  --pull --manifest myimage /tmp/test`  this created a manifest image with a link to the one he's creating.

Then he specified an arch of arm64 `podman build  --pull --manifest myimage --arch arm64 /tmp/test` and then s390 `podman build  --pull --manifest myimage --arch s390 /tmp/test` and it pulled that architecture version of the image all while being on an x86 machine.

`podman manifest inspect myimage` shows it has 3 different images as part of it.

Let's you build and manipulate multi-arch images locally or through the tool.   It's a new feature as of Podman v3.0.

Linux kernel is smart enough to run it under the right architecture due to qemu and a runtime binary loader.  Applicable on X86 on a Raspberry Pi. 

Used UBI for the demo, careful doing in Fedora as it can take a long time, especially in comparision to RHEL.

Neal asked if you could build it for multi arch and then push without having to do push by hand for each.  Dan pointed out that's what the manifest flag is pointed towards.  Currently in `buildah bud`, `buildah commit` and `podman build`.  That's all in Podman v3.0 and Buildah v1.19.6


##  podman-py roadmap
### Jhon Honce
#### (13:45 in the video)

Jhon gave a road map of where we're going.

* https://github.com/containers/podman-py - Repository
• https://docker-py.readthedocs.io/en/stable/ - Document
• https://github.com/containers/podman-py/pull/53 - Committed PR1
• https://github.com/containers/podman-py/pull/55 - In flight PR2


Stubbed out ssh adapter, but not much code yet.   If you want to drive pods, you'll be able to do so via calls to libpod from Pyton.   Want to emulate success of the Podman API and hope to replicate it for Python too in this project.  Will publish to python py (Jhon verify).  Targeting Python 3.6 and Podman 3.

What's different than using docker-py?
    You have script that works with pod.  docker-py won't give you access to pods, podman-py will.  So you'll be able to move docker-py script and then add pod manipulation to it.
    
How does libpod go work from python? 
    podman-py communicates with Podman service via RESTful API between python and libpod go code.  The URL's will in essence have "/libpod" embedded within.
    
Will unprivileged access be allowed? 
    Yes, Using systemctl --user configuration.

Brent showed doc with more info:  https://podman.readthedocs.io/en/latest/_static/api.html

## Podman Packages on Kubic
### Lokesh Mandvekar
#### (23:06 in the video)

Applies to debian, ubuntu and raspberry.  Posted a link:
https://podman.io/blogs/2021/03/02/podman-support-for-older-distros.html 

Podman v3.0 won't be supported on older variants of these distributions.

1. CentOS 8 Kubic repo will be supported only as long as CentOS 8 itself is alive. 

2. CentOS Stream Kubic repo will keep going, though I highly recommend you use the packages from the default repos as they are often fairly current and are known to have passed RHEL's gating tests.

3. For Debian 11, I will not enable the Kubic repo as Debian 11 will have podman included in the default repos itself.

4. For Ubuntu, I will enable packages for Ubuntu 21.04 and 21.10 when they release. But, the 22.04 LTS release which is more than a year into the future will have podman in the base repos itself, so the plan for now is to not enable the Kubic repo for 22.04.

If support is needed for older variants, Lokesh will need volunteers to help with that.

Packaging on official repo's.

Neal suggests turning off Debian Testing and Next/Unstable, he suggests turning them off now for releases that won't be supported.

Neal might be able to help with support with Ubuntu LTS in the Kubic repo in some instances.

##  krunvm demonstration
### Sergio Lopez
#### (28:35 in the video)

Dynamic library that enables other programs to easily gain virtulization-based isolation capabilities with a minimum foot print.

Sources
* https://github.com/containers/libkrun
* https://github.com/containers/krunvm

COPR repo for Fedora
* https://copr.fedorainfracloud.org/coprs/slp/krunvm/

Included in openSUSE Virtualization project
* https://build.opensuse.org/package/show/Virtualization/krunvm

Homebrew Tap for macOS/arm64 (M1-based devices)
* https://github.com/slp/homebrew-krun

Demo started (29:43)

On ARM Mac, used `krunvm create fedora`.
`krunvm start fedora-podman`

Changed containers.conf on his linux machine and can now run the container on his Linux box.  

He then used the podman remote service `krunvm changevm fedora-podman -p 55555:55555 -p 8080:80`

Then from the container
'podman --log-level info system service -t -o tcp::55555'

He was then able to run podman commands on the mac in the minivm.


Questions: 
Can you share the host filesystem with the minivm?
    Yes, using krunvm. 
    
Does krunvm support Intel Mac?
    It does not support Intel Mac currently.

Do you plan to put libkrunvm in brew proper?
    He does, but needs to rework the PR implementing virtio-fs attributes support in Buildah.  After that's complete, he's going to try to get it accepted in brew.

Dan discussed that the Podman Mac effort is to do brew install podman and then ask if you want a vm to run it on.  Krunvm might be a part of that solution.  End goal to just do `podman run ...`

##  Tent demonstration
### Farhan Chowdury
#### (40:56 in the video)

Tent a development only dependency manager 

Solves:
    Cumbersome install process
    Unavailability in a certain platform
    Conflicts between multiple versions.
    
Demo (42:10)

Showed `tent start mysql`

It created a mysql server on the system.  He set up a sql server in the container.  Now the server can be used as if mysql was installed on the system.

With tent you can stop/start your services.

Future Plans:
    Fix Bugs
    Add More services
    Refactor the code base
    Improve ovall user experience.

Is there a way to run systemd now?  No.
Does this run as root or rootless?  It runs as rootless only at this point.

Link to the slides - https://docs.google.com/presentation/d/1BRQET4UkPyPBrhSpJuFoYzLYZe1CfLI6bmhzlEcmWcY/edit?usp=sharing
Link to the repo - https://github.com/fhsinchy/tent

## Containers Plumbing Conference - 

March 9/10, 9:30 a.m. to 2:00 p.m. Eastern (UTC -4) Free to attend, register here: https://containerplumbing.org/

## Questions?
#### (51:20) in the video)

1. Go module issue discovered by Farhan. go.mod target for Podman is requiring a full name.  Matt Heon noted it is fixed in Podman v3.0.2.
2.  How to tell which version of Buildah is in Podman?  Yes in `podman info`, also included in API headers for /version endpoint

## Topics for Next Meeting

## Next Meeting: Tuesday April 6, 2021, 8:00 p.m. Eastern (UTC-4)


### Meeting End: 12:01 p.m. Eastern (UTC-5)

## Fun Fact: 
The initial name for the Ford Mustang, "Mustang" was rejected initially as the tie in for the name was the WWII P-51 Mustang fighter plane.  The designer, John Najjar, re-pitched the name "Mustang" later, but this time with a tie in to Horses.  The second pitch was accepted.

## BlueJeans Chat copy/paste:

```
Me10:53 AM
Please sign in and ask questions in hackmd: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?both
Neal Gompa11:00 AM
hey all! :D
Sergio Lopez Pascual11:05 AM
I'm here :-)
Neal Gompa11:06 AM
yay, multiarch through qemu :D
James Cassell11:10 AM
3.0 also broke rootless overlay mounts...
Matt Heon11:10 AM
Eh? Is there a bug for that?
First I've heard of this
James Cassell11:11 AM
I didn't see one in podman, but asked in #podman this morning... maybe it exists in buildah, searching now.
Juanje Ojeda11:13 AM
We use this (with Buildah) quite a lot at the project CKI. We build a lot of multi-arch images.
We love it :-)
Matt Heon11:14 AM
@James - if you can't find one on Buildah please open a new one
jhonce11:17 AM
https://github.com/containers/podman-py
jhonce11:21 AM
• https://docker-py.readthedocs.io/en/stable/
• https://github.com/containers/podman-py/pull/53
• https://github.com/containers/podman-py/pull/55
Brent Baude11:24 AM
https://podman.readthedocs.io/en/latest/_static/api.html
^^ i think this sort of illuminates what Jhon is saying
note compat buckets
Lokesh Mandvekar11:26 AM
https://podman.io/blogs/2021/03/02/podman-support-for-older-distros.html
Brent Baude11:26 AM
also noteworthy, your milage may vary using docker-py rootless
James Cassell11:34 AM
WSL2 for Mac?
Ludo C.11:38 AM
is there is a way to share host filesystem with the mini vm ?
Shion Tanaka11:39 AM
Does krunvm support Intel Mac?
Ludo C.11:41 AM
that's great, thanks
Ashley Cui11:42 AM
Oh I'm here
Me11:42 AM
yeah!
Ludo C.11:44 AM
I find it great for Linux to have a better isolation, I will definitely try it out
Brent Baude11:46 AM
@sergio, do you plan to put libkrun in brew proper?
Sergio Lopez Pascual11:50 AM
@brent I do. I need to rework the PR implementing virtio-fs attributes support in buildah, but afterwards I'll try to get libkrun/krunvm accepted.
Christian Felder11:50 AM
is there a way to generate systemd services for your tents?
do you use the current user running the containers or how do you distinguish root-/-less?
Christian Felder11:52 AM
thanks
jhonce11:53 AM
Cool stuff!
Neal Gompa11:53 AM
nice!
Brent Baude11:55 AM
@sergio, can you stick behind so you and I can talk a little
Sergio Lopez Pascual11:55 AM
@brent sure
Neal Gompa11:56 AM
anyway folks, thanks for all this
Shion Tanaka11:56 AM
@sergio Thanks for the answer about Intel Mac!
Neal Gompa11:56 AM
I gotta go now!
but thanks :D
Lokesh Mandvekar11:56 AM
thanks Neal
Neal Gompa11:57 AM
Lokesh, we should talk offline at some point about the Kubic stuff
Lokesh Mandvekar11:57 AM
sure thing!
Greg Shomo (NU)11:59 AM
https://containerplumbing.org/schedule
Dan Walsh11:59 AM
https://containerplumbing.org/
Ludo C.11:59 AM
I'm in :)
Brent Baude12:00 PM
dan, please stick around
Me12:00 PM
Fun Fact: The initial name for the Ford Mustang, "Mustang" was rejected initially as the tie in for the name was the WWII P-51 Mustang fighter plane. The designer, John Najjar, re-pitched the name "Mustang" later, but this time with a tie in to Horses. The second pitch was accepted.
Christian Felder12:01 PM
Thanks. Have a nice day. Bye
Ed Santiago12:01 PM
thank you! nice work!
Ludo C.12:01 PM
Thanks, bye !
Marcin12:03 PM
Is switching runc/curn with krunvm to run each container in separate vm wouldn't be better than using single vm and run podman on it?
Greg Shomo (NU)12:10 PM
thank you, everyone, for your time && have a good one !
Me12:14 PM
@Matt Heon, I opened the buildah bug for broken rootless overlay mounts since podman 3.0 and buildah 1.19 https://github.com/containers/buildah/issues/3051
Sergio Lopez Pascual12:18 PM
https://github.com/containers/libkrun/blob/main/examples/chroot_vm.c

```
