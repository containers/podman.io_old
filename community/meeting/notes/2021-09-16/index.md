# Podman Community Cabal Meeting Notes 

One-hour meeting on the third Thursday of every month at 10:00 a.m. US/Eastern (UTC-4) to deep dive into topics on the agenda. Please add your name at the end of the topic so we know who the topic owner is.
Meeting ID: https://meet.google.com/ieq-pxhy-jbh

Try out [WorldTimeBuddy](https://www.worldtimebuddy.com/?pl=1&amp;lid=5,0&amp;h=5&amp;date=9/16/2021%7C3&amp;hf=1)

Attendees: Tom Sweeney, Brent Baude, Christopher Fergeau, Chris Evich, Matej Vasek, Mehul Arora, Miloslav Trmac, Nalin Dahyabhai, Scott McCarty, Urvashi Mohnani, Eduardo Santiago, Guillaume Rose, Hugh Campbell (Riot Games in a personal capacity), Dan Walsh, Anders Björklund, Ashley Cui, Matt Heon, Paul Holzinger, Praveen Kumar, Gerard Braad, Giuseppe Scrivano, Lokesh Mandvekar, Kerry Zamore

## September 16, 2021 Topics
1. Podman Desktop
2. Podman machine volume mounts
3. Open Discussion

### Meeting Notes
Video [Recording](https://drive.google.com/file/d/1kCm-AK0Gqpk5Eua3m26agzxIp8NLR73x/view?usp=drive_web)

Meeting start:10:04 a.m. Thursday, September 16, 2021


#### Build an Image with a Template File (0:42 in video)

Topic for next month from: https://github.com/stellarpower
Proposal here: https://github.com/containers/buildah/issues/3479

#### Podman Desktop (1:30 in video)

The topic has gotten very hot over the past few weeks.  People want some form of desktop presence.  The big focus is on stop/start and status of things running.  The maintainers wanted to solicit the community to find out what they think.  If we just do what Docker does, then it might not be enough.  We want to make it better if possible.

https://github.com/containers/podman/issues/11494 - Discussion in play online.

Dan would like Podman to remain as a CLI tool, with the Desktop as an optional wrapper that could be used.

Gerard - people want a desktop application that integrates well and can be considered a first-class citizen.  In addition to start/stop/status, also reinitialization.  Will it be a tray application or something that supplements your view?

Dan - we're hearing that compose doesn't work on Mac due to the socket not being set up.  Do we want to expose registry.conf and how to handle the sockets.

What is the initial goal?  Is it a windows tray application, but that might be very information-dense with many containers.  Want to be able to query logs on a container.

Brent's take is that knowing what users want will help us make decisions and that's part of our current process.  

Gerard - you have to watch the scale, so there may not be a single solution.  So we need to identify what it looks like at the start.

Scott would like to ensure functionality.  He'd like to be able to run docker compose and it would just work.  He also wants to be able to serve a super user along with a novice user.

Dan sees the desktop as managing connections.  The podman that runs on a mac, is podman remote.  Cockpit might be a player in this space when you're trying to look at the containers.  One of our pain points on the mac was figuring out how to connect to your linux server.  Most of that was solved with podman machine.  So that's why he sees this as more of a management system.  

In the future, we might have podman machine that could handle different VM types (Ubuntu, RHEL, SUSE) either local or remote to the system.

Anders with docker machine you could have many machines going at once, but with Docker desktop has only one machine running in the background.  He anticipates the machine concept in Podman will be almost hidden, something most users wouldn't have to be aware of.

In chat, Gerard noted: Podman Dekstop might not be the right name, as the desktop (local VM) is just a small part of the puzzle. The key point seems the connectivity and view/status of these connections.

Anders thinks there might be one desktop to handle the machines, and another to handle the containers.

Brent asked about brew in the enterprise as we've gotten some push back from folks on its use.

Gerard doesn't think it will be much of a concern, but Dan noted that some enterprise customers are blocking the use.

We will package in brew, the question outstanding is whether or not to provide another "more trusted" place to get a hold of the podman and/or desktop software.  This would be used by enterprise customers who need to load only software with more verification than brew provides.

Hugh struggles with keeping his folks from running with root in containers.  If he could get Podman Desktop to be like 80% of what Docker Desktop does.  It would help people understand that more container tech than just Docker.  At Riot, they want to get stuff done as quickly as possible, so it needs to be easy/fast.

For Riot, the Docker announcement caught them by surprise.

Is not running root in a container the most important point of interest?  Hugh would like it to be there, at very least made the people aware of the badness of running as root as they started to do that.  Perhaps some kind of slider to select root/non-root, eg. setting the compatibility level (security settings?).

Dan can't envision why you'd need root inside most containers in a game devel environment.  He thinks they might not be aware of security.

Will write up a Product Specification document for what Podman will provide.

For the tray, Brent wants to know if “shift” is the only way to provide it.  Gerard create a tray app in go but ran into a lack of options while developing.  So it held them back from being integrated with the system.  

Their issue with not using a native application, then the product wasn't as crisp-looking and deeply integrated with the OS. Eg. Minishift tried to use Golang with a library from lantern, but this lead to issues around integration. [Electron](https://www.electronjs.org/) is a development environment that creates desktop applications in JavaScript and web pages.  you can you CSS to make the look and feel just right. The output is usable in Linux, Mac, and Windows. GitHub Desktop, VSCode, Discord, and the Slack desktop app are based on Electron for instance. The advantage might be that some of the Cockpit components might be (re)used.

#### Podman machine volume mounts (39:10 in video)

For mac volumes, no native support.  Using a reverse mount with ssh to the host.  Matt Heon would like to get to using a flag to the mount from the machine command.  He would like to get something out quickly.

His target would be native support in about a year (Fall 2022).

Anders has a use case where a home directory can be mounted on a root directory in the VM, but you need to add a prefix.  Anders [PR](https://github.com/containers/podman/pull/11454)

Does Docker Desktop do what Podman should do?  Per what Matt has seen, it does, but he's not sure about the performance issues.  However, that's probably the same or similar issue in Docker and Podman.

Podman remote client will need to be a lot smarter than it is now.  Anders PR is a quick startup solution, but further work will be needed from there.

Some of the stuff that Anders has seen in Desktop, is a little less secure than he thinks it should be.  

SSHfs is what Gerard has used and it seems to have worked well for his environment.  Something that Matt is looking into using.

Dan doesn't think we want mounting storage for an image from the mac to the VM.

The advantage of using ssh, it's ubiquitous.  

The first pass should be using SSHfs.

#### Open discussion (50:20 in video)

1.) What's the WSL2 status?

Brent said there's a document or a script to make it less painful.  Dan noted that the Podman team is working with Microsoft.  Gerard would like to see a document.  Brent noted it should be here very soon, but the person working on it is not part of Red Hat, not in the meeting, and he doesn't want to promise things.

2.) Cost of Podman Desktop?  

We're targeting free open-source.

3.)  What is ETA for the Desktop?

Brent hopes to solve the volume, needs M1 support for qemu.  Those need to be done first, then we would look at Desktop.  If nodejs, we'll need help or will have to learn it.

We need to have an initial release by January 1, 2022.   Then build from there.  A full-bodied release later in 2022.

4.) Has anyone run into Podman Machine Build is a lot slower than Docker.  

Matt has a link to someone reporting the issue.
   
   
### Next Meeting: Thursday October 21, 2021 10:00 a.m. EDT (UTC-4)

### Possible Topics:
1. Build an Image with a Template File
2. How to handle weekly releases of Desktop, circleCI, appveyor? Desktop builds (like Electron based), install package generation, or signing on macOS required more than the usual offers that are available.

Raw BlueJeans:

```
You10:01 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Hugh Campbell10:02 AM
Hi everyone
Praveen Kumar10:02 AM
Hello everyone
Gerard Braad10:03 AM
@Praveen if you have connection issuesyou can also ping me on Slack if more is needed
Daniel Walsh10:03 AM
Agenda doc: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Gerard Braad10:06 AM
Some form:
  * status indication (VM)
  * controls (start, stop)
Praveen Kumar10:06 AM
need to rejoin, not able to hear anything :(
Gerard Braad10:13 AM
This is actually the same I wanna know ;-)
Gerard Braad10:15 AM
This means a easy switch between configurations
and a springboard to a developer prompt for this
Gerard Braad10:17 AM
^^ @dan @scott ^^
Gerard Braad10:20 AM
Podman Dekstop might not be right name, as the desktop (local VM) is just a small part of the puzzle. The key point seems the connecitivity and view/status of these conections
Scott McCarty10:22 AM
BRB
Gerard Braad10:23 AM
the VM is just another endpoint/another podman you can connect to.
the tray and/or app might have very different tasks. the application (dialogs) will show the details of the connection and the containers
while the tray might show the lifecycle management and the possible connections
Hugh Campbell10:27 AM
We use brew here at Riot with our Macs and brew is a good solution but knowing developers here - it doesn't have to be an exact 1:1 but if 80% of Podman Desktop for Mac can be like Docker Desktop for Mac it's would help make transition so much easier
Gerard Braad10:28 AM
^^ :+1 right. but I believe for Brew and Choco there is a docker-desktop and docker-cli package, right?
Hugh Campbell10:28 AM
I believe so but don't quote me on that
Gerard Braad10:30 AM
I believe on mac you have the two kinds of users; those that want a dmg/pkg, and those that want brew
Brent Baude10:30 AM
correct
Gerard Braad10:30 AM
and on Windows you start to see the same with wanting and .exe msi or using choco inst
Anders F Björklund10:30 AM
I dunno, I wanted rpm and port :-)
Gerard Braad10:30 AM
;-)
Gerard Braad10:31 AM
is that PNAELV ?
Gerard Braad10:34 AM
Pretty much like the Firewall/Internet Security slider in Windows :-)
setting a 'compatibility level'
Anders F Björklund10:39 AM
here is my quick last night poc for doing a cross-platform (Qt) systray in a cross-platform language (C++):
https://github.com/afbjorklund/podman-systray
so far it has the icon :-)
Hugh Campbell10:39 AM
VSCode
Gerard Braad10:40 AM
^^ VS Code is developeed using electron
Erik Bernoth10:40 AM
Slack and Discord might be written in Electron, iirc
Hugh Campbell10:41 AM
I believe they are as well for Mac
Gerard Braad10:43 AM
@Dan the advatnage of Electron is that the Cockpit components can most likely can be reused
Gerard Braad10:44 AM
^^^ can I add this reference to the doc?
@Tom
You10:45 AM
Gerard, please and thank you!
Anders F Björklund10:48 AM
https://github.com/containers/podman/pull/11454
You10:48 AM
ty Anders!
Hugh Campbell10:49 AM
Native would be awesome but 80-85% of what is there currently in Docker Desktop for Podman Desktop would be great for my devs
Anders F Björklund10:54 AM
a lot of interesting things happening with "macOS subsystem for Linux" (lima)
might be on par with WSL, although unofficial (Apple never supports other OS)
Gerard Braad11:00 AM
@Tom https://github.com/gbraad
Mehul Arora11:03 AM
yes, it is
Hugh Campbell11:04 AM
Thanks everyone!
Kherry Zamore11:05 AM
thanks
ieq-pxhy-jbh
```
