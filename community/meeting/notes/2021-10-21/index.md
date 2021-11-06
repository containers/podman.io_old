# Podman Community Cabal Notes 

Attendees: Tom Sweeney, Matt Heon, Brent Baude, Ashley Cui, Alex Larsson, Preethi Thomas, Urvashi Mohnani, Marcin Skarbek, Eduardo Santiago, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Mack, Dan Walsh, Holger Gantikow, Leon N, Marcin Skarbek, Mehul Arora, Max, Paul Holzinger.

## October 21, 2021 Topics
1. Netavark - Matt Heon and Brent Baude
2. Podman System Monitor for MAC - Ashley Cui and Brent Baude
3. quadlet - Alex Larsson
4. ARM Testing Thoughts - Preethi Thomas and Urvashi Mohnani
5. CI testing for Podman Docs if stored on a separate repo - Tom Sweeney

### Meeting Notes
Video [Recording](https://drive.google.com/drive/folders/1pDCsZFj0yDobe4OxPqAzitECGL6O0KMY)
Meeting start: 10:04 a.m. Thursday, October 21, 2021

### Podman System Monitor for Mac ( 1:30 in video) 
Ashley showed mockups of a number of possible screens for Mac GUI.  She mocked up an update, and this is not decided upon yet.  This will control the VM on the Mac that Podman runs in.

She is thinking about having a link between this and the cockpit.  This is just to manage the VM, not containers.  The Gui would launch Cockpit in a browser, and then you could do container commands from the cockpit web interface.

It will be built for Mac look/feel.  Linux and Windows designs are still up in the air.

Brent asked if anything was missing, no bites.

There is not yet an ssh button, but it could be added.

We've been talking about socket mapping from the VM into the host.  She is leaning towards having an option to do so on start.  A Boolean to leak a socket, and it would leak the default socket that Podman would define.  A message would be sent to output noting the socket use.

An issue currently with password passing is being worked on.  Possibly create a link and then pass the password.  Something like: https://getcockpit.com/documentation/api/cockpit. We are also looking into volume mount PRs.
 
### Podman netavark - Brent Baude (18:15 in video)

Rust implementation to replace CNI networking.  A bunch of work was done, but not yet in Podman's GitHub.  Looking at designing from the ground up to capture what was there, add user requests, and make it faster overall.  About six weeks into development.  In RUST  https://github.com/containers/netavark. 

Will this handle VPN?  No plans at present, a good thought, but currently focusing on basics.  Working on firewall at the moment.

passt (plug a simple socket transport) link for information from Marcin:  https://passt.top/passt/about/

RUST being used for this, thoughts were binary size, speed, availability of libraries.

### quadlet - Alex Larsson(25:41 in video)

quadlet is a pun on kubelet.  It's a systemd generator for things like fstab1.  This has a customer systemd unit file. The project lives at: https://github.com/containers/quadlet/

Demo:  (26:28 in video)

Easier for a system administrator to maintain and use.  Uses crun and split cgroup.   It always has /dev/init, standardized names, integrates with sdnotify, journald, and various security setups. 

The code is a C project that is living here:

Can/should this be part of Podman?  Dan thinks it could be a subproject of Podman that comes as part and parcel.  There is podman-systemd-generate, which is great for advanced users; quadlet is suitable for users with less systemd experience.

It's a way to specify how a system runs.  Dan would like to see auto-updates happen in containers via quadlet.

Blog post with more information:  https://blogs.gnome.org/alexl/2021/10/12/quadlet-an-easier-way-to-run-system-containers/

A question on what could or could not be in the init file.  So if you create a foo.container, it would create a foo.service for instance.

### ARM Testing Thoughts - Urvashi/Preethi (40:31 in video)

We're looking into testing for upstream for ARM, and we’d like to do it when a PR is opened.  We're looking for suggestions. Does anyone have pointers to this?  Any experience in setting up ARM support for the CI?  Cirrus which were' using now, only uses GCP, but ARM is not supported there.

### CI testing for Podman Docs if stored in a separate repo - Tom (42:37 in video)

We are thinking about moving the Podman man pages to a new repo. This way to lessen the barrier of entry for folks who have small man page changes or are more doc focused and not heavy GitHub users.  i.e. test requirements, signing requirements, git knowledge, etc.

Dan's concern is if you have a new option, you'd break bot CI's on both projects unless you did the PR's simultaneously.

Web UI might be used for the docs.   But still, have a convention.

Dan/Valentin against moving the man pages, as it would create more work for users.

Signing might not be required for docs.  Brent thought there was a way to avoid the DCO from the web browser as you were already signed in.  I.e., auto-sign in if you were coming in from the web.

#### Open discussion (49:26 in video)

1) Is there value in categorizing content in the blogs that have been posted?  Would a Yahoo like categorization of "how-tos", networking, macs, container-in-container, etc.  It would be nice to have a categorization of topics in links.
  
2) Would like to add a ZFS driver without having to rebuild Podman.  Something that is pluggable.  Docker has something like this now.  
 
### Next Meeting: Thursday November 18, 2021 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. Podman.io redesign - Mairin

Raw BlueJeans:

```
Leon N
9:53 AM
Hey Hi, Good Morning
Sorry No mic at my end
You
10:00 AM
Please sign in at the Attendees section in hackmd, https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You
10:05 AM
hackmd:  https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Anders F Björklund
10:11 AM
did you have a "ssh" button ?
Anders F Björklund
10:13 AM
otherwise the only fancy thing I added to the Qt PoC was showing the OS version of the VM
Ashley Cui
10:14 AM
Anders: Good idea! I think I can fit that in the currently running info
Leon N
10:20 AM
Is there any API that could generate a one-time link or something?
for cockpit I mean
Anders F Björklund
10:20 AM
sure thing, just at the office again
will find a room :-)
Leon N
10:21 AM
Something like https://getcockpit.com/documentation/api/cockpit
Anders F Björklund
10:22 AM
do you guys miss your shared cubicles
noice cancelling just go listen in
Brent Baude
10:22 AM
https://github.com/containers/netavark
Marcin Skarbek
10:24 AM
Regarding networking, I have found recently passta - https://passt.top/passt/about/
Max <b-m-f>
10:24 AM
any plans to include VPN stacks? Was recently asking about Wireguard on the mailing list
Marcin Skarbek
10:25 AM
Interesting idea that looks promising
Max <b-m-f>
10:26 AM
cheers
Marcin Skarbek
10:26 AM
Wireguard at least at start
Would be very appreciated
Alexander Larsson
10:27 AM
Any particular reason for picking rust?
Brent Baude
10:27 AM
binary size, speed, availability of creates (libraries)
Matt Heon
10:27 AM
And we wanted to :-)
Anders F Björklund
10:28 AM
stand out from the container crowd ?
(which seems to be mostly go)
Alexander Larsson
10:38 AM
https://blogs.gnome.org/alexl/2021/10/12/quadlet-an-easier-way-to-run-system-containers/
Anders F Björklund
10:46 AM
I earlier suggested Raspberry Pi (for ARM), bu t only works if you run it "on-prem" (on desk)
Leon N
10:50 AM
I'm not sure but is the team looking for something like this?
https://developer.arm.com/solutions/infrastructure/developer-resources/ci-cd

Some people do run those arm clusters too but yeah like Anders said its on-prem
Anders F Björklund
10:51 AM
Otherwise we had lots of fun with Equnix Metal and the bare metal arm servers
Urvashi Mohnani
10:52 AM
Thanks, will take a look
Alexander Larsson
10:54 AM
Flatpak got donated huge arm servers from cncf. Might want to ask them.
Max <b-m-f>
10:54 AM
would be helpful
Mehul Arora
10:54 AM
definitely worth
Brent Baude
10:55 AM
@tom ? -> https://github.com/scottrigby/dco-gh-ui
Alexander Larsson
10:56 AM
gotta go
Mehul Arora
10:56 AM
did anyone check the new theme i suggested for the docs?
oh so should i open a PR for that?
okay yeah ill do that
Anders F Björklund
11:00 AM
Would CSI be an option ?
Marcin Skarbek
11:00 AM
ok
Dan Mack
11:00 AM
thanks all
ieq-pxhy-jbh
```
