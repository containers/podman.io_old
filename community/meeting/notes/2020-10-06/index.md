---
layout: default
title: Podman Community Meeting 
---

![Podman logo](../images/podman.svg)

# {{ page.title }}
## October 6, 2020 11:00 a.m. Eastern

### Attendees (34 total)
Tom Sweeney, Alex Litvak, Chris Evich, Christian Felder, Douglas, Ed Santaigo, Josep Gooch, Joe Doss, Lokesh Mand, Manish, Matt Heon, Reinhard Tartler, Valentin Rothberg, Wolfgang K, Nalin Dahyabhai, Dusty Mabe, Urvashi Mohnani, Sally O'Malley, Eduardo Santiago, Anders, Miloslav Trmač, Jhon Honce, Parker Van Roy, Brent Baude, James Alt, Greg Shomo, Paul Holzinger, Ralf Haferkamp, Giuseppe Scrivano, Scott McCarty, Anders Björklund (afbjorklund), Balamurugan, Brian Smith, Drew Baily

## Introductions
Each of the attendees gave a quick introduction.

## Upcoming

Matt Heon discussed the upcoming releases and some of their content.  He said, v2.1 came out a little over a week ago, v2.1.1 coming with bug fixes in the next week or so.
Aiming v3.0 towards sometime in February, which will include the removal of the varlink api as it has been deprecated.  The big changes for v3.0  will be the removal of varlink and it will include improvements in handling short image names.

Trying to get additional commands such as `podman container clone` and other commands in as well.  Also improvements to the REST API, including new endpoints to more closely mimic what Podman locally does.

Lots of effort currently being put into fixing reported bugs and moving people from established Docker shops who want to transition.

## Podman v3.0 Planning

Dan Walsh led the discussion on Podman v3.0 planning.   Short names of images will be added.   This will help prevent spoofing of images.  `podman pull foo` will go to all the defined registries and you'll be given a choice to pick from a list.  If you pull later, it will repull that same pick.  Similar to known hosts in ssh.  Better support for Kata containers.  More documentation and enhancements in usernamespace.  Auto-selection of usernamespace is one such area of improvement.  Also kubernetes integration enhancements, currently underway from a number of community members.

## HPC

Dan talked in general about the HPC community and that the development team would like to work closely with that community.  Valentin talked about the differences in that environment.  The goal is to generalize the problems and make them more usable.

## Questions?
1. Any plans for improved systemd integration with rootless? Specifically running systemd units with the `User=` directive calling podman rootless.
(jdoss)

Podman team has talked to the systemd team and the systemd team was somewhat confused about why someone would want that.  Further talks had about ways to use it are ongoing, but no support from systemd team at the moment.  We'd like to get it in, but rely on the systemd team's help.

2. Could you elaborate on the timing of integration of podman 2.x and 3.x into certain RHEL 8.x releases? (JA)

Podman 2.0 is 8.3.0, Podman 2.1 in 8.3.1. Not sure about 3.0 yet - perhaps 8.4.0 if we make the deadline there.

3. What versions of podman/buildah/skopeo can we expect to end up in RHEL7 (RHEL8)? (R. Tartier)

RHEL7 is now frozen on 1.6.4

4. Will this go into another module stream though? (C Felder)

Yes. Nevertheless, RHEL8 stream is always rolling to the latest.

5.  Does "kind" work with Podman?

It should work now for Podman running as root in Podman 2.0.

6. Does the podman team work with the Quay team about registry interactions - access control features? ability to move older images to a different registry with different permissions? maybe these are quay questions...

We'd like to work closer with Quay, but they've been overloaded since onboarding with Red Hat.  We'd love any feedback that we can get.  The majority of the answers to this question would have to come from the Quay team. 

7. podman go api -- any updates around https://github.com/containers/podman/issues/6866

Brent Baude answered.  The best I can say is this is on the roadmap.  Brent discussed that we've been bug fixing mostly as of late, but that it is on our road map.

8. Do you folks plan on publishing a public road map that shows community and Red Hat needs/wants for features/bug?

    Scott is working on this for the RHEL side of things.  Brent is using Jira for our "internal" work.  He'd like to share the Jira cards, but he's not sure about the timing of getting them done.  Dusty suggested on grouping which are near term items vs more future items.

## Topics for Next Meeting

Is support for different logging drivers is on the road map in the future? 

What Red Hat Thinks - Design directions - Brent Baude

I could do a summary of boot2podman/podman-machine (basically a varlink post-mortem) - Anders Björklund (Sold! and thanks!)
Currently involved in a little project to make a vagrant shell wrapper similar to it.


## Next Meeting: Tuesday, November 3, 2020, 11:00 a.m. Eastern


## BlueJeans Chat raw copy/paste:
```
Christian Felder10:57 AM
Hi, this is Christian from Munich
Reinhard Tartler10:57 AM
Hi, this is Reinhard from New York!
Alex Litvak10:57 AM
Hi this is Alex from Chicago
Me10:58 AM
Howdy All! Tom from Leominster, MA. We'll be starting shortly
Lokesh S Mandvekar11:00 AM
Hello everyone
nice to put faces to some of the names finally :)
Greg Shomo11:00 AM
hello, world
Joe Doss (jdoss)11:00 AM
Hello! Joe Doss from Chicago I work for DEV Community Inc https://dev.to / forem.com
Dusty Mabe11:01 AM
hey All, I'm Dusty Mabe - work for Red Hat on Fedora CoreOS and RHCOS. Good to meet everyone.
Me11:01 AM
Meeting Notes: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
manish11:02 AM
hello , i am manish
Me11:02 AM
Please add yourself to the attendees list if I didn't get you there.
afbjorklund11:04 AM
I am Anders Björklund, and I was doing boot2podman. Might have to drop out today since I am joining from car
Balamurugan11:08 AM
yes
Dusty Mabe11:09 AM
there can be only one Dan
Lokesh S Mandvekar11:15 AM
@tom: ManIsh, not ManUsh
Scott McCarty11:15 AM
Might be worth sharing with this group. Red Hat has a community program called Red Hat Accelerators which gives you access to Red Hat engineering and leadership. I believe it was just announced today: https://access.redhat.com/accelerators#overview
Reinhard Tartler11:17 AM
Hi, I'm Reinhard, long-term Debian and Ubuntu Core Developer (13 years), and I've integrated podman 2.0.6 into the upcoming Debian 11 and Ubuntu 20.10 releases. I'm located in New York and work at Bloomberg leading a team working on a firmwide integration build system
Brent Baude11:17 AM
@Reinhard, please to meet you
Scott McCarty11:20 AM
@Reinhard, that is super exciting to hear!
Lokesh S Mandvekar11:21 AM
thanks a ton Reinhard :)
Joe Doss (jdoss)11:24 AM
Any plans for improved systemd integration with rootless?
Brent Baude11:25 AM
id encourage you to ask ... and specify what exactly you want
Joe Doss (jdoss)11:25 AM
Specifically running systemd units with the User= directive calling podman rootless.
JA11:27 AM
Could you elaborate on the timing of integration of podman 2.x and 3.x into certain RHEL 8.x releases?
mheon11:27 AM
@JA - Podman 2.0 is 8.3.0, Podman 2.1 in 8.3.1
Not sure about 3.0 yet - perhaps 8.4.0 if we make the deadline there
Reinhard Tartler11:28 AM
Q: What versions of podman/buildah/skopeo can we expect to end up in RHEL7 (RHEL8)? - I'm asking because I need to decide what version to integrate for Debian 11, and would love to hear some opinions.
Christian Felder11:29 AM
follow up on JA's question. Will this go into another module stream though?
mheon11:30 AM
@Reinhard - RHEL7 is now frozen on 1.6.4
RHEL8 has two streams, one rolling steadily to the latest release, one with long-term-support releases
Balamurugan11:30 AM
what is the latest podman stable release for rhel 8.2
Douglas11:30 AM
Hey Tom, what's the current status of running kind on top of podman?
mheon11:31 AM
Tragically, the 2.0 module does not have Podman 2.0
We may have made a naming error, there...
Christian Felder11:32 AM
alright, to get the latest stuf just stay on rhel8 stream though
mheon11:33 AM
@Douglas - RHEL 8.2 has 1.6.4 in both streams. 8.2.1 has the fast-moving stream upgraded from 1.6.4 to 1.9.3
@Christian - yes, RHEL8 stream is rolling to the latest
Christian Felder11:33 AM
thanks
Reinhard Tartler11:34 AM
I'd love to see the Debian images added to the "well-known" list :-)
Douglas11:34 AM
not sure if I follow mheon :(
my question is regarding kind - kubernetes
mheon11:35 AM
Oh, sorry, replied to the wrong person
That was re: Balamurugan
Douglas11:35 AM
no worries
Alex Litvak11:35 AM
Reinhard, is there a chance of podman backported to 20.04 LTS on ubuntu ?
Balamurugan11:35 AM
thanks @mheon
Alex Litvak11:36 AM
speaking of a package of course
Douglas11:39 AM
thanks. Going to retest in a fresh git clone.
manish11:40 AM
gvisor with podman.? is possible near future?
Brent Baude11:41 AM
@Tom, can I ask questions?
mheon11:41 AM
@manish - Should work fine as root. Rootless would require support from the gvisor folks
Just need to add it as a runtime to containers.conf
Alex Litvak11:42 AM
any comments on the future logging support similar to docker?
manish11:43 AM
thanks mheon.
JA11:43 AM
Does the podman team work with the Quay team about registry interactions - access control features? ability to move older images to a different registry with different permissions? maybe these are quay questions...
Drew Bailey11:43 AM
podman go api -- any updates around https://github.com/containers/podman/issues/6866
Brent Baude11:44 AM
Drew, let's sdiscuss now!
Joe Doss (jdoss)11:48 AM
Do you folks plan on publishing a pubic road map that shows community and Red Hat needs/wants for features/bug?
Me11:48 AM
Topics for next time? Please add to: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Drew Bailey11:52 AM
👍 awesome thanks, will help us get off varlink :D
Joe Doss (jdoss)11:57 AM
I think it would be nice for the community to have insights into what is important for the RH Podman Team and maybe the community can help. Also design direction within the roadmap would help inform community help.
help guide community help**
Joe Doss (jdoss)11:59 AM
We can help if we know what direction you folks want to go.
Sally O'Malley11:59 AM
thank you everyone! i have to drop - see you all next month
Brent Baude11:59 AM
joe you are exactly correct.
manish12:00 PM
thanks :)
Joe Doss (jdoss)12:00 PM
Great call and turnout!
Valentin Rothberg12:00 PM
Thanks for joining, all!
```
