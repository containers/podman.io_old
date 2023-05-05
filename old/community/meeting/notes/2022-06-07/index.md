# Podman Community Meeting Notes
## June 7, 2022 11:00 a.m. Eastern (UTC-5)

### Attendees (27 total)
Tom Sweeney, Jhon Honce, Chris Evich, Matt Heon, Ashley Cui, Eduardo Santiago, Valentin Rothberg, Paul Holzinger, Nalin Dahyabhai, Giuseppe Scrivano, Preethi Thomas, Lokesh Mandvekar, Niall Crowe, Charlie Doern, Dan Walsh, Brent Baude, Aditya Rajan, Dev Kumar, Florent Benoit, Gerard Braad, Ionut Stoica, Jake Correnti, Karthik Elango, Mark Russell, Miloslav Trmac, Nalin Dahyabhai,  Pavel, Preethi Thomas, Stevan Le Meur, Tim deBoer, Urvashi Mohnani

## Meeting Start: 11:02 a.m. EST
### BlueJeans [Recording](https://www.youtube.com/watch?v=lherM_ah3GU)

## Podman on Windows Update
### Jason Greene/Tom Sweeney
#### (1:04 in the video)

Jason was going to present today but had a recent COVID diagnosis and could not attend.  Instead, Tom talked briefly about his recent blog [post](https://www.redhat.com/sysadmin/run-podman-windows) talking about how to install the new Podman Windows installer, which is [here](https://github.com/containers/podman/releases/download/v4.1.0/podman-v4.1.0.msi)  The Podman YouTube [channel](https://youtube.com/c/Podman) also has a [video](https://www.youtube.com/watch?v=zHOC5QkhLVw) of the process that Tom did to do the installation on Windows.  Jason has also created a detailed [tutorial](https://github.com/containers/podman/blob/main/docs/tutorials/podman-for-windows.md) for the installer and the Podman on Windows Client.  Hopefully, Jason will be able to present at the next meeting.

## Podman Desktop Update
### Florent Benoit
#### (4:00 in the video)

The project is located [here](https://github.com/containers/podman-desktop) on GitHub.  The desktop lets you run in Windows or macOS.

Demo - 4:35 in the video

Showed Gui listing Containers, Images, and Preferences.  He was also able to do things on the command line, and they showed up in the desktop.  He showed how he could pull an image from quay.io from the desktop.  

Some Plugins are also available. He showed one for Podman, and now he can see more details of the images.

The desktop just watches the Podman Socket and is not polling all the time.  You can use either rootful or rootless.  You can't do that through the Desktop, but you can start the "podman machine" as rootful or rootless, and the Desktop will use the one available.

Currently, the desktop is using a socket, so it might be possible for it to use ssh to use a podman machine on a remote host.  A probable future enhancement.

Pods are not currently supported but are part of the future plan as a feature.  Need more requests via GitHub to get it a bit more precedence.

[Roadmap](https:/github.com/containers/podman-desktop/wiki/Roadmap) in their Wiki with the features planned.  The developers are looking for more help in the development of the tool.

Brent wonders if there was still an open issue about machine events between the Desktop and Podman development teams.  Brent will work with the Desktop team to close the loop as he thinks he has a solution.

## Podman Install on MacOS
### Gerard Braad
#### (22:00 in the video)

Working on a test release on a different repo.  Works on M1 and Intel.  The current location is [here](https://github.com/containers-contribs/podman-installer/releases).  When complete, it will be part of the regular Podman release and would be added to the assets section in Podman releases.
 

## Podman Upcoming Releases Update
### Brent Baude
#### (25:10 in the video)

The next Release is v4.2 and likely a 4.1.x prior.  Release candidates for v4.2 should be coming out in July with a target of mid-August for a final release.  Quite a number of commits already.  A lot of bug fixes due to a Red Hat internal bug squish week and "ToDo" fixes in the code.  Updates to Podman machine and other enhancements are also included.

Podman v4.1.1 sometime later this week per Matt Heon.

## Open Forum/Questions?
#### (29:00 in the video)

1)  Can you tell when podman machine has an update?  Currently no.  If you have a new Podman, it will pull machine too.  Brent hopes to update GUI later to show an update to the CoreOS image.   The dev team knows about this, but it's not a non-trivial fix to make this happen.

An issue to be created for this, Brent to create.  (Issue)[https://github.com/containers/podman/issues/14514]

2) Dan has opened a PR against qemu to break it up for different distro needs.  This slims down the footprint of the binary.  The size went from 40 MB to 4 MB.  Bugzilla concerning this [here](https://bugzilla.redhat.com/show_bug.cgi?id=2061584)

3) Pavel is having problems with Syslog from Podman. The issue isn't showing errors, and it isn't working.  So it's very hard to debug.  The issue is in crun and we'll have Giuseppe look into the problem.

Pavel to update his (discussion](https://github.com/containers/podman/discussions/12693).

## Topics for Next Meeting

1) Podman on Mac installer.

2) Podman on Windows


## Next Meeting: Tuesday August 2, 2021, 11:00 a.m. Eastern (UTC-5)
## Next Cabal Meeting: Thursday June 16, 2021, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:46 a.m. Eastern (UTC-5)


## BlueJeans Chat copy/paste:
```
Me11:00 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Stevan Le Meur11:05 AM
sorry!
Stevan Le Meur11:11 AM
Feel free to share feedback, issues, ideas on the repository: https://github.com/containers/podman-desktop
Florent Benoit11:20 AM
https://github.com/containers/podman-desktop/wiki/Roadmap
Gerard Braad11:21 AM
it sounbsd like the wrong mic is used
much better!
Gerard Braad11:22 AM
Would it be possible to also plug something?
baude11:23 AM
plug?
Gerard Braad11:23 AM
We have been working on a test release of the Podman installer for macOS (Intel and M1), and would like feedback
Stevan Le Meur11:23 AM
👍
Me11:23 AM
Sure thing Gerard, do you want to do a quick update after this wraps?
Gerard Braad11:23 AM
Please
baude11:23 AM
yes please
Gerard Braad11:24 AM
https://github.com/containers-contribs/podman-installer/releases

We will propose it this week as a PR, but have experienced some delays on our end.
Gerard Braad11:28 AM
Thank you guys
ionut stoica11:31 AM
I do have a Q
Can you know preemptively when a podman machine has update ?
Microphone dead! :(
Gerard Braad11:32 AM
So this is about a 'Update notification' ?
ionut stoica11:33 AM
Yes, some users wanted to know as they certify their envs and analyze all they bring in
Gerard Braad11:34 AM
Does an issue exist to track this?
Let's create?
ionut stoica11:34 AM
:) Awesome!
Gerard Braad11:35 AM
We have the same issue around CRC for the image. So le's create this and I'll ping you Ionut
Gerard Braad11:38 AM
@ionut @baude I added an issue for this: https://github.com/containers/podman/issues/14514
Daniel (rhatdan) Walsh11:39 AM
tom https://bugzilla.redhat.com/show_bug.cgi?id=2061584
Me11:39 AM
thx dan
Me11:41 AM
Thx Gerard, added it and the BZ to the mtg notes
Gerard Braad11:41 AM
:+1 Thanks. I remember Baude and I also talked about this particular issue in February or so. It is not an easy problem to solve, but it is worthwhile to collect the issues and possible solutions.
baude11:44 AM
i have to step away
Me11:44 AM
github.com/podman/discussions
Florent Benoit11:44 AM
https://github.com/containers/podman/discussions
Me11:44 AM
https://github.com/containers/podman/discussions
Mark Russell11:46 AM
thanks, Tom!
```
