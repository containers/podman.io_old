# Podman Community Cabal Meeting Notes 

Attendees (22): Tom Sweeney, Nalin Dahyabhai, Paul Holzinger, Dan WAlsh, Preethi Thomas, Valentin Rothberg, Matt Heon, Pavel Sosin, Chris Evich, Ashley Cui, Anders Bjorklund, Peter Hutn, Urvashi Mohnani, Brent Baude, Erik Bernoth, Giuseppe Scrivano, Ed Santiago, Guillaume Rose, Mehul Arora, Miloslav Trmac, Scott McCarty

## August 19, 2021 Topics
1. Podman v4.0 inclusions
2. Podman on Windows
3. Open Discussion

### Open Discussion
Save the last 15 minutes for an open floor discussion.

### Meeting Notes
Video [Recording](https://drive.google.com/file/d/1VOzFK0zpG4MgjQnyiGDZL3J9gMIj-msh/view)
Attendees:

Meeting start 10:05 a.m Thursday August 19, 2021



#### Podman v4.0 inclusions (1:22 in the video)

Podman 4.0-dev is now upstream.
Paul Holzinger has added a large change for Networks.
More performance analysis and attempting to lessen memory and CPU usage.  Adopting Buildkit functionality in Buildah and thus Podman build.

Giuseppe is working with supporting virtual pools to retrieve just files that are not already present in local storage, to help decrease load times.  It may not be Docker compatible, it may have to be OCI based only.

We're looking for ideas/changes that might require breaking API changes.  But are hoping not to make too many at once.

#### Podman on Windows (12:30 in the video)

Currently looking into WSL possible solutions.

Pavel talked about his use case of using Fedora directly from the Microsoft Windows Store.  Once installed, he was able to run the latest Podman on Fedora.

Erik asked if systemd is working?  (Not likely to at the moment.)  He too uses Podman on Windows and it works fine for him now.

WSL2 is installed on windows by default already in the latest, and then install Fedora from Microsoft store, and then Podman ran from there.

Docker has a GUI interface that can be used from Windows, we would probably not provide a similar out of the box.

If you create a container currently in Windows using the Fedora, you can't talk to the container outside of that Windows host.  Something that will need looking at.

Fedora costs $10 for Fedora 34 distribution from the Microsoft Store.

Dan would like to default to just click a button somewhere once to install Podman.  The issue with that is keeping it updated over time.  The best case is to get the Fedora team to provide Fedora with Podman preinstalled in the Microsoft Store.

What should the experience be for when the podman-machine needs to be updated?  What is the best case scenario?  TBD.

Two upgrade paths in Windows per Pavel.  We'd like to know how the upgrade could happen seamlessly for the end-user.

Docker checks the version at starti-up and then asks the user to do update.  Information is stored in a small json file.  They apparently do an update in a separate VM.

On Docker, can you do a volume mount on a Windows directory?  Giuillaume says it does work.

#### Open discussion (39:45 in the video)

When's Podman v3.3 coming out?  Hopefully Monday, Aug 23, 2021.  Then we will likely be creating a Podman 3.4 for sometime later in the fall.

One thing to watch is that Podman v4.0 can not break Fedora 35.  Fedora 36 should be in April 2022 and would be the target if we break Fedora 35, but that hopefully won't be the case.

### Next Cabal Meeting: Thursday September 16, 2021 10:00 a.m. EDT (UTC-4)

Raw BlueJeans:
```
Nalin Dahyabhai10:02 AM
Agenda: https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg
Erik Bernoth10:39 AM
I have to go. If you do a podman on Windows issue on GH, please CC me. See you next time!
Brent Baude10:43 AM
https://www.redhat.com/sysadmin/podman-windows-wsl2
```
