# Podman Community Meeting
## October 5, 2021 11:00 a.m. Eastern (UTC-4)

### Attendees (23 total)
Tom Sweeney, Jhon Honce, Dan Walsh, Chris Evich, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Matt Heon, Paul Holzinger, Erik Bernoth, Chris Evich, Scott McCarty, Anders Björklund, Lokesh Mandvekar, Valentin Rothberg, Guillaume Rose, Rudolf Vesely, Ashley Cui, Brent Baude, Shion Tanaka, Marcin Skarbek, Aditya Rajan, Giuseppe Scrivan, Rudolf Vesely

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/X3NY6qgSlKQ)

## Podman on M1 Mac Status
### Ashley Cui
#### (6:30 in the video)

Patch for M1 in qemu upstream, but not merged.  However, it is available on homebrew at the moment.  If you install qemu using homebrew, you can use Podman correctly.

Demo (started at 7:30)

What works on an Intel Mac should now work on an M1.  Now working on volumes and also trying to get a GUI together.  Looking at putting together a window-bar.

## DIY Networking in rootless containers
### Paul Holzinger
#### (10:09 in the video)

[Slides](https://podman.io/community/meeting/notes/2021-10-05/Podman-Rootless-Networking.pdf)

Talking rootless network without extra privileges.
Proxy into rootless is done via Slirp4netns.  It uses this stack to tap into the interface in the container namespace.  Supports port forwarding.

A few settings are used for rootless users.  Can use allow_host_loopback to reach the 10.0.2.2 loopback.  Off by default as it's a security hole.

You can also enable_ipv6 and specify the port_handler.

Rootless CNI networking uses an extra network namespace to execute the CNI plugins.  Only works for bridge networks.  Inter container communication works out of the box.  The IP address assigned to the container is not reachable from the host network namespace. You need to use port forwarding.

DIY Networking.  You can set up your own interfaces, but first, you need to create network interfaces on the host, which requires root priv.  Once done, Podman can talk to them using `--network=none` option with the `podman container init` command.

Rudolf to work with Paul to update the tutorial and possibly do a demo next time.


## Podman Security Bench
### Dan Walsh
#### (24:00 in the video) 27

Based on the security bench from Docker.  Doesn't yet have all the same functionality.

Demo (Started at 24:54)

It needs to run at root, not yet available on rootless.

CLI does a whole bunch of security checks.  At the end, it gives you a security score.  It shows where you're having trouble with each of the checks.  It's now available upstream.  

Dan would like to get it to run in rootless mode and look at containers.conf.  Would love community help.


## Podman v3.4 Announcement
### Matt Heon
#### (29:45 in the video)

New 3.4 release that came out last week.  We are switching focus on v4.0.  Network working, pointing at January 2022 release.  There will not be a 3.5.0 in between.

In 3.4, changes to Podman play and generate cube.  Init containers are now available to run in a pod.

We can now build images with `podman play kube`.  This makes it act more like `docker compose`.  You can use a Containerfile to build an image with this command.

Yaml file can now tear down pod or pods with the `--down` command, plus a number of new pod related commands.  See the [release notes](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md) for more info.

## Support –format tables in ps output
### Jhon Honce
#### (35:40 in the video)

Podman uses golang tab writer and formatter for all the commands.

Demo (started at 36:00)

Showed a number of different ways to remove headings, so you can now use table to show which fields you want.


## Podman build –platform lists
### Nalin Dahyabhai
#### (37:44 in the video)
The `--platform` option in the `podman build` command to specify other platforms.  

DEMO 37:47 in demo.

The `podman build` command now takes multiple values for its `--platform` option.  The platform option lets you build for machines other than what you are currently running Podman on.

The `--manifest` target is used too.  Allow you to build a manifest list and then add the image to the list.  A number of cleanups have been done on internal libraries to make this work.  

When building multiple architectures in one build, the "STEP" output in the build will show which architecture.

The `podman manifest list` command will show the multiple platforms used.

## Volume Demos
### Aditya Rajan
#### (44:16 in the video)

Demo (Started at 44:27)

First demonstrated adding an overlay over rootfs.  Exported alpine and created dir for rootfs and tarred it out to a directory.  So tried running with `--rootfs rootfs/:0` and created a file in the container.  On the host, the file is not there.

A new option for volumes to create overlay over Podman's volume. It created the test volume.  Again made a file and found it was created on the container but not on the host due to the `:0` specification.

These are temp volumes and last only as long as the container lasts and you can't commit the data.

## Open Forum/Questions?
#### (51:10) in the video) 55

Are there any plans for an arm-on-intel/intel-on-arm for Podman machine?  Not at this time, but we are willing to see if there's enough push for that.  Nalin asked if you could run using a multi-platform build maybe?  Brent will note it for possible futures.  If the community wants to do it, we'd be happy to merge it, but not currently in the plan by the maintainers to do it themselves.

Will Podman support OpenZFS?  Willing to take a PR.

## Topics for Next Meeting

* DIY Networking Part II

## Next Meeting: Tuesday November 2, 2021, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday October 21, 2021, 10:00 a.m. Eastern (UTC-4)

### Meeting End: 11:59 a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:
```
Lokesh Mandvekar10:58 AM
ed, is this the right link ?
Me11:00 AM
Please sign in on the meeting notes: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w?both
Aditya11:02 AM
we can hear you dan
Dan Walsh11:03 AM
Gret
Great
Lokesh Mandvekar11:09 AM
do people wanna try switching to google meet if everyone's having problems?
Erik Bernoth11:10 AM
Good idea Lokesh
Anders Björklund11:11 AM
Can you run amd64 containers on the arm64, like OOTB ?
Matt Heon11:12 AM
We were discussing that, and I think the answer is not OOTB but it only requires one package to be installed
Erik Bernoth11:12 AM
Dan‘s screenshots seems to work. Paul, can you also try for a sec?
Anders Björklund11:13 AM
Sounds good! I guess it is not related the to the VM itself, but user qemu
Matt Heon11:15 AM
The perf is a little questionable, because it's nested virt, and the inner virt is also virtualizing the architecture
But it is definitely doable
Anders Björklund11:16 AM
oh, it's like 10x slower (at least)
but sometimes useful
Dan Walsh11:18 AM
Paul I can set these fields in containers.conf correct?
Aditya11:21 AM
@tom i can go next switched to chromium
Paul Holzinger11:27 AM
have to drop now, bye
Anders Björklund11:46 AM
Was there any update on volumes in podman machine ?
baude11:47 AM
no updates
Anders Björklund11:47 AM
:-)
baude11:48 AM
we are making progress on the whole thing, but it is a slow march
Anders Björklund11:48 AM
lima is taking this samba detour
Marcin Skarbek11:49 AM
OpenZFS started working on the user/mount nanespaces support with LXC in mind, but that could be interesting in rootless context https://github.com/openzfs/zfs/pull/12263
Shion Tanaka11:54 AM
Are there any plans for an arm-on-Intel/Intel-on-arm for the Podman machine?
baude11:54 AM
no
Shion Tanaka11:54 AM
Ok, thanks
Anders Björklund11:55 AM
you can use podman-on-fedora-on-lima, if you want to run cross-arch VM
```
