# Podman Community Meeting
## November 2, 2021 11:00 a.m. Eastern (UTC-4)

### Attendees (21 total)
Tom Sweeney, Jhon Honce, Chris Evich, Urvashi Mohnani, Matt Heon,  Erik Bernoth, Chris Evich, Scott McCarty, Anders Björklund, Lokesh Mandvekar, Ashley Cui, Brent Baude, Aditya Rajan, Giuseppe Scrivan, Miloslav Trmač, Rudolf Vesely, Shion Tanaka, Christian Felder

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/bhRBWYOh02V)

## Buildah buildkit update
### Aditya Rajan
#### (2:10 in the video)

There are features in buildkit that are not in Buildah.   New features added include --mount=type-bind, which allows performing a bind mount and scoped to current RUN statements.
You can also mount by stages if you would like.  This is in upstream now and will be in Podman in the near future.

The other feature added is --mount=type=cache.  This adds support for persistent caching across builds.  So it could be used by other images other than the one being built.

Another is --mount=type=tmpfs which allows a user to mount a chunk of volatile memory instead of a persistent storage device.  It looks like an actual disk for the build, but it's only temporary and doesn't persist after the build completes.

This is upstream in Buildah now, will likely be in Buildah v1.24.* and higher and Podman v4.0.  Both will be out by early next year.

Demo (7:11 in the video)

A feature to skip stages is underway but not complete.

Is it possible by using --mount-type=cache to prevent a rogue/misguided Containerfile from using a cache that it should not use?  We have the option to segregate cache but no way to avoid other builds from using it.  Something Aditya will look into it.



## Podman on Mac Status
### Ashley Cui/Brent Baude
#### (13:45 in the video)

DEMO (14:00 in the video)

Ashley showed several mockups for the new Mac interface.  They show the machines available and then the ability to start/stop them.  She's been looking into doing this with Swift.

Brent noted that we're working on volumes, the Docker socket, and other sockets.  In addition, rootful and rootless.  The big issue with the volume mount is if you use a bind mount, it's mounted in the VM rather than the host machine itself.

Would it make sense to implement the GUI with Qt? Isn’t Swift just available for the Mac?  Yes, for now, looking at POC, then thinking about figuring out what to do with Windows.  Things work well on WSL there now, and it runs in Linux there.

## netavark update
### Matt Heon/Brent Baude
#### (15:44 in the video) 23

The [netavark](https://github.com/containers/netavark) project is a new project and replaces CNI plugins.  Podman would call this with JSON input, and it would handle network setup, firewalls, etc.  Being written in RUST and have a basic piece of code running today for a typical setup except the JSON response and firewall rules.

We're doing this mainly to get the ipv6 support and DNS in play.  The DNS piece will not be in place for the initial Podman v4.0 release but a later release.  The team feels this will be a more supportable layer for the network.

The team is happy to have RUST experts come in and contribute.

How to understand netavark?  Take a look at what CNI is doing under the covers, and that's being emulated/replaced?  Also, a decent understanding of network concepts.  

We will be supporting firewalld as a backend to support firewall tables.


## Open Forum/Questions?
#### (18:15) in the video)

1) Podman on Windows priority?  Lower on the priority list as the WSL solution is pretty solid now.  But something we're looking into.

2) IRC slack connections: https://podman.io/community/#slack-irc-matrix-and-discord

3) We should use an interface approach for the volume drivers work per Anders.  The issue now is the machine configuration is in containers/common, and that can be a bit of a dance.  Brent and Anders have been looking into a few options, including ssh.  There are other things they're looking at that have better speed but not as much functionality.  For the ssh solution, playing with the crypto levels might help with speed.



## Topics for Next Meeting


## Next Meeting: Tuesday December 7, 2021, 11:00 a.m. Eastern (UTC-5)
## Next Cabal Meeting: Thursday November 18, 2021, 10:00 a.m. Eastern (UTC-5)

### Meeting End: 11: a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:
```
Me11:01 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?both
Miloslav Trmac11:13 AM
Is there some scoping mechanism to the --mount-type=cache, so that a rogue/misguided Containerfile can't use a cache it shouldn't be using?
Matt Heon11:19 AM
Mounting the Docker socket?
Christian Felder11:21 AM
Wouldn't it make sense to implement the GUI with e.g. Qt? Isn't Swift just available for Mac?
Anders Björklund11:21 AM
I halted the Qt GUI fo rnow
https://github.com/afbjorklund/podman-systray
Christian Felder11:22 AM
Ok, I just thought about having the same GUI for Windows... So you wouldn't need to reimplement it
Anders Björklund11:23 AM
Podman doesn't really work on Windows, only on WSL (Linux)
Christian Felder11:23 AM
Ok, thanks
Anders Björklund11:23 AM
but I suppose you could run `wsl podman` or something
baude11:23 AM
https://github.com/containers/netavark
Shion Tanaka11:27 AM
Is there any other knowledge I should know to understand netavark?
Shion Tanaka11:29 AM
OK,thanks!
baude11:30 AM
catching us on irc or the matrix bridge is probably the best approach for that
Lokesh Mandvekar11:31 AM
https://podman.io/community/#slack-irc-matrix-and-discord

```
