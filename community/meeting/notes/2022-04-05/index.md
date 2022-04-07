# Podman Community Meeting
## April 5, 2022 11:00 a.m. Eastern (UTC-5)

### Attendees (17 total)
Tom Sweeney, Jhon Honce, Chris Evich, Matt Heon, Chris Evich, Ashley Cui, Eduardo Santiago, Valentin Rothberg, Paul Holzinger, Nalin Dahyabhai, Giuseppe Scrivano, Preethi Thomas, Lokesh Mandvekar, Niall Crowe

## Meeting Start: 11:02 a.m. EST
### BlueJeans [Recording](https://t.co/FUPhuBAE7l)

## Docker Compose v2 and Podman v4.0.2 update
### Matt Heon
#### (1:39 in the video)

Compose v2 just came out and will be supported in Podman v4.1 or higher.  (Currently upstream).  Matt shared [Demo](https://asciinema.org/a/onBRxqPs9bpyvbbdeJOYXHvj5).  It showed two running web servers that were brought up and then down.  It was cleaned up as appropriately and Compose v2 is working rather well at this point.

Just released Podman 4.0.3, including a minor CVE fix.  No plan for 4.0.4 yet, but we will likely go to 4.1 next.  Also cutting a 3.4.5 for distributions that want to stay in Podman 3.

## Ubuntu 22.04 LTS and Stopping Kubic support
### Lokesh Mandvekar
#### (6:14 in the video)

First LTS release with Podman, Skopeo and Buildah in the default repositories.  Podman 3.4. Buildah 1.23, and Skopeo 1.4.

If you're using packages from the Kubic repos, you should uninstall those before upgrading Ubuntu to 22.04 LTS and use packages from the default repositories going forward.

Announcement on podman.io: https://podman.io/blogs/2022/04/05/ubuntu-2204-lts-kubic.html

## Podman Desktop Update
### Ashley Cui
#### (14:30 in the video)

Abandoned the UI built with swift for another UI.  We're working with another group that is more web ui oriented.  

Showed how to manage a podman machine in theory, but it is broken at the moment.  You can create containers from a Dockerfile or a Containerfile or an image.  Once created, the image shows in the GUI, then you can create the container from the image.

This GUI does a lot more than the previous.  The old one worked with podman machines mostly, this one deals with images and containers too.  The new GUI is also expandable, lots of work ongoing.

https://github/containers/Desktop is the project.  Happy to have contributors.

## Podman Volume Mounts on Mac Demo
### Brent Baude
#### (18:45 in the video)

Demo

Shows how to get a volume mount on a mac.  He started a machine prior.   The `-v` option with the init command sets up the volume.

Many thanks to Anders Björklund for the work on the volumes on the mac. 

## Open Forum/Questions?
#### (22:46 in the video)

1) What happens with std out/in with journald?  Logs, stderr and stdout in the journal?  If you're running journald logging, the output doesn't get into the host journal.  Could you volume map /dev/log into the container from the log to make sure it gets in the hosts journal. (10:54 in the video)

Matt thinks systemd should be run into the container to help make that work.  Valentin thinks you should see the output of journalctl.  He's not sure if journalctl will do that by default.  Further discussions to happen in Discord/IRC.

2) Brent said that 4.1 should bring some notable enhancements including a `podman inspect` command, liveness probes, and more.

## Topics for Next Meeting

1) Podman on Windows Demo/Update - Jason Green


## Next Meeting: Tuesday June 7, 2021, 11:00 a.m. Eastern (UTC-5)
## Next Cabal Meeting: Thursday April 21, 2021, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:27 a.m. Eastern (UTC-5)


## BlueJeans Chat copy/paste:
```
Me11:01 AM
Please Sign in at: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Matthew Heon11:04 AM
https://asciinema.org/a/onBRxqPs9bpyvbbdeJOYXHvj5
Valentin Rothberg11:18 AM
@Lance, can you run the following commands to test?
1) podman run --name=test --replace ubi8 echo Hello World!
2) journalctl --user -b CONTAINER_NAME=test
Ashley Cui11:21 AM
https://github.com/containers/desktop
```
