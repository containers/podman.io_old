# Podman Community Cabal Meeting Notes 

Attendees: Tom Sweeney, Aditya Rajan, Matt Heon, Brent Baude, Ashley Cui, Chris Evich, Christian Felder, Urvashi Mohnani, Eduardo Santiago, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Walsh, Valentin Rothberg, Jhon Honce, Chris Evich, Miloslav Trmac, Reinhard Tarter, Eric Van Norman, Castedo Ellerman, Charlie Doern, Urvashi Mohnani, Lokesh Mandvekar, Navid Yaghoobi, Marcin Skarbek

## January 20, 2022 Topics
1. Volume Storage on a Mac - Brent/Ashley
2. New Network Rollout - Paul/Matt
3. Podman v4.0 Rollout - Matt/Brent
4. Podman TUI (https://github.com/navidys/podman-tui) - Navid

### Meeting Notes
Video [Recording](https://www.youtube.com/watch?v=bwhDnwYyiJY&t=2729s)

Meeting start 11:02 a.m. Thursday January 20, 2022

### Volume Storage on a Mac (1:15 in video) - Brent/Ashley

Just a chat on how to handle storage for the Mac, especially since Anders is present.  Docker has an advantage due ot the daemon to be able to handle the volumes.  When containers closes, the daemon can umount if necessary.

Asking for opinions on the direction we should take here.

Compared to Docker machine to Podman, VM mounts are totally unrelated to container mounts in Docker machine.  VM mounts stays for an entire session, not umounted when the container goes away.  Problems trying to mount high level directories such as `/` or `/tmp`.  

Note: currently mounts are defined when machine is _created_ (not started), so needs to be deleted to change mounts

In podman machine, we use the user core, so you don't get into trouble unless there's a user "core" on the host.   We could then just set the root of the container to the homedir of the user on the VM.

Have to make sure the volume provided is not outside of the home dir.

We need to chase this down further, and the thought is to support mounting from homedir only.


Some previous discussions in [https://github.com/containers/podman/issues/8016](https://github.com/containers/podman/issues/8016)

The virtfs implementation was in [https://github.com/containers/podman/pull/11454](https://github.com/containers/podman/pull/11454)


###  New Network Rollout (13:01 in video) - Paul/Matt

Lots of chatter on IRC about netavark and aardvark. It’s the new network stack that's being put together for Podman v4.0.  It will replace the CNI plugins.

This will allow more complex networks, as has been requested in the past.  This new stack will do what CNI currently does, plus the requested functionality.  It's called netavark and is written in rust.  It works like the current network stack as far as the user sees.  It's working well for CNI but is missing DHCP on mac VLAN.  IPv6 is better than the prior offering and is faster.  Believe we can optimize further.  DNS resolution is handled by aardvark and replaces DNS mask and DNS name.

Many of the use cases that could not be done in Podman in the past but in Docker will be enabled.  If you're running Podman v3.* and you upgrade to Podman v4.0, your network will be CNI by default.  If you're running a Podman v4.0 and no storage is around, then it will default to netavark.  An entry in containers.conf will be settable to allow choosing between CNI and netavark.

DNS resolution has not been used by default in CNI but will be turned on for netavark.  

Reinhard asked from a packager’s perspective, what considerations do they need to take into account?  We tried to set the network stack up such that nothing should be required for packaging.  You will have to package netavark and aardvark, but you shouldn't need any configuration manipulation.

There are database changes such that if you create a container in Podman v4.0, it won't be    usable in Podman v3.0 space.  The database is internal to Podman.

Also there's a subid tag in the Makefile that should be turned on for Podman v3.0.  It brings in libsubuid via shadow-utils.

Also, it is suggested to use `podman --remote` instead of `podman-remote`.

For those interested in the network, please test!  Reach out and talk to the Podman maintainers.  Please used Podman v4.0 RC2 and later.

### Podman v4.0 Rollout (32:52 in video) - Matt/Brent

Database changes and network changes.  A number of API changes that will break things.  

THe API has been migrated.  The more interesting things is doing things on a Mac.  Podman v3.0 will not work with Podman v4.0 and vice versa.  Podman v4.0 is sloted for Fedora 36, due in May (Dan thinks).  We don't have forward/backward compatibility.

RHCOS will have Fedora 35, but with Podman v4.0 not included. We are working with the RHCOS team to smooth this out.  

There have been 459 commits into Podman v4.0, about twice as many as Podman v3.4.  Lots of changes, we'd love to get people trying it earlier before final release.

### Podman TUI (https://github.com/navidys/podman-tui) (38:11 in video) - Navid

[https://github.com/navidys/podman-tui](https://github.com/navidys/podman-tui)

Terminal User Interface for Podman.

Demo - (38:40 in video)
Navid gave a demo showing pods, containers, images.  Many of the commands are available to use.  Can't exec into a container yet.  Uses the Go bindings from Podman.  Shows events, disk usage.

It's 100% Go.  

#### Open discussion (44:57 in video)

1) Castedo writing a guide on [cnest.readthedocs.org](https://cnest.readthedocs.org).  He's put together scripts and explanation on how to use Podman.  Aimed at new to Podman/containers folks.  Part of his work was to look at Toolbox, but looked for a simpler solution by using just Buildah and Podman with a little glue.  He's packaged this up.  Wonders if for his intial work, if it makes sense to have a Toolbox type tool or guides that are aimed at first-time users.
 
He wanted to share only a bit of his directory in his containers and worked through things like that.

The rootless offering was very useful in his case, and he did virtual python environments in a rootless container.

2) Anders asked if podman compose is compatible.  It's a separate project from Podman run by others, but the Podman maintainers monitor it.  Podman compose doesn't use the API but execs Podman under the covers.  The podman compose project has revived over the past six months in popularity after looking like it was dead over the summer.

3) Will Podman v3.0 be removed from distros once Podman v4.0 comes out?  That's a distro decision.  In Debian Podman, v3 and v4 will not be coinstallable.  They could choose to install older versions on their own, but the stable versions of Debian will have their specific version.   Branches on Podman with a `-rhel` ending tag are backports for older versions.  Usable for long-term support of older versions.  RHEL even releases such as RHEL 8.6 are supported for two years.

### Next Meeting: Thursday February 17, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
None suggested.

Meeting finished 12:02

Raw Meeting Chat:

```
You10:59 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Reinhard Tartler11:00 AM
thanks for adding me!
You11:01 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You11:03 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Reinhard Tartler11:04 AM
thanks for thinking of me, nothing from me, I'm most intereted in the podman 4.0 rollout from a packager's perspective
Lokesh Mandvekar11:09 AM
Hello Reinhard, fwiw, I plan to not build 4.0 on the Kubic repos, just in case 4.0 takes a while to land on debian and ubuntu
Christopher Evich11:10 AM
remember aardvark and netavark too
Lokesh Mandvekar11:10 AM
also, would be nice to look at debian packaging for: https://github.com/containers/netavark and https://github.com/containers/aardvark-dns
yup
Valentin Rothberg11:10 AM
Who's rejecting the user from entering?
Christopher Evich11:11 AM
those of us trying to chat :(
Lokesh Mandvekar11:11 AM
really?
chatting interferes with letting the user in?
Christopher Evich11:11 AM
<space> picks default "deny" choice :(
Lokesh Mandvekar11:11 AM
that's weird
Valentin Rothberg11:11 AM
Please be careful to click on "admit" :)
You11:11 AM
I think keyboard focus timimg
Lokesh Mandvekar11:11 AM
ohh
Christopher Evich11:11 AM
bad GUI design
You11:12 AM
Marcin, sorry about the rejects, we'd some gmeet gui issues.
Christian F11:14 AM
can't you mount on the VM in below a well-defined path. /home e.g. ends up with /podman-mounts/home ?
Anders F Björklund11:20 AM
it is possible to mount host /home under /mnt/home or something, think docker-machine used like /hosthome.
but normally host uses /Users and machine uses /home, so then there is no conflict
Christian F11:22 AM
considering DHCP on Macvlan: it would be nice if the systemd unit file for the CNI DHCP daemon would be shipped with podman (may disabled by default, but a systemctl enable --now should be enough)
Brent Baude11:30 AM
@Christian, this IS something we are considering.  And also of note, the CNI packages will not change.
Reinhard Tartler11:31 AM
it was requested here: https://bugs.debian.org/cgi-bin/bugreport.cgi?bug=1000521 -- happy to close it :-)
Valentin Rothberg11:31 AM
`podman --remote`
Jhon Honce11:32 AM
podman-remote is a smaller binary if that is a concern
Anders F Björklund11:33 AM
the documentation in minikube and lima currently use "podman-remote", but then again it also uses podman2 so is lost anyway
I guess podman4 will delete the podman3 packages, so same story again
Anders F Björklund11:39 AM
maybe it would be easier to always run podman --remote, also on mac. oh well.
Brent Baude11:42 AM
color me impressed!
@anders, it wont build
Anders F Björklund11:43 AM
I guess that would actually be "podman-remote --remote" that is run on the Mac
Aditya Rajan11:44 AM
@Navid So cool !!! Could you share repo link plz
Ed Santiago11:44 AM
Very impressive indeed
Christian F11:45 AM
:+1:
Brent Baude11:47 AM
could adi,paul, and matt stick behind
E. Castedo Ellerman11:53 AM
cnest.readthedocs.org
Navid Yaghoobi11:53 AM
https://github.com/navidys/podman-tui
Valentin Rothberg11:59 AM
-rhel suffixed branches
Christian F12:00 PM
will there be different module streams in RHEL for podman 3 vs 4?
Matt Heon12:03 PM
Yes
Well
ieq-pxhy-jbh
```
