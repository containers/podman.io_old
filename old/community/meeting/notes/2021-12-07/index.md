# Podman Community Meeting Notes
## December 7, 2021 11:00 a.m. Eastern (UTC-5)

### Attendees (18 total)
Tom Sweeney, Jhon Honce, Chris Evich, Urvashi Mohnani, Matt Heon, Chris Evich, Anders Björklund, Ashley Cui, Aditya Rajan, Rudolf Vesely, Shion Tanaka, Eduardo Santiago, Valentin Rothberg, Paul Holzinger, Nalin Dahyabhai, Martin Jackson, Preethi Thomas, Ionut Stoica

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://youtu.be/WUk_ZzVThd8)


## Netavark Status
### Matt Heon
#### (1:52 in the video)
[netavark](https://github.com/containers/netavark)


Dumping the network stack for a new one in Podman 4.0, one that we will own and control.  Netavark is mostly working for IPv4 and a firewall driver is close to being completed.

Podman with netavark GitHub repo: https://copr.fedorainfracloud.org/coprs/rhcontainerbot/podman-next/

Looking to replece DNS Server within Podman too with this change.  The goal is to have a container with as many networks as you'd want.  Testers are very welcomed.  Bug reports to the netavark for network issues, against Podman in it's GitHub if more Podman related.


## Podman on Windows Demo
### Jason Greene via Tom Sweeney
#### (10:12 in the video)

(We had trouble with the video sharing, Tom Sweeney narrated badly...)

Jason's first video showed how to run Podman on a Windows machine using WSL.  It basically has the same look, feel as the macOS variant does.  Jason talked about the architecutre under the covers and things he wants to improve upon.  The direct [Video](https://youtu.be/KIGeWpd91Z0) can be found on YouTube along with Jason's Update [Video](https://youtu.be/ub2m15yW-fg) which was not shown in the meeting.  The update shows his progress and how Podman can be installed on a Windows machine that doesn't have WSL.

The quality is much better there than in the meetings recording.

## Meeting Announcement

Going to hold this meeting every other month on the first Tuesday of the month starting in Feburary (even numbered months).  The Cabal meeting will remain a monthly meeting on the third Thursday of each month.

## Open Forum/Questions?
#### (26:00) in the video) 

1) Podman on Fedora32 on Windows doesn't go easy.
    Matt thinks this is a systemd issue and more invesigation is needed.

2) Ionut Stoica is working on a project to add tools for front end work.  https://iongion.github.io/podman-desktop-companion/ It's kind of Cockpit like.  Hopes to add more in the future.  Looking at Windows and mac, but needs to work on compilation issues.  Easier on the Mac, but needs to use Lima.  Will check in with Jason Greene

## Topics for Next Meeting

None specified.

## Next Meeting: Tuesday February 1, 2021, 11:00 a.m. Eastern (UTC-5)
## Next Cabal Meeting: Thursday December 16, 2021, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:37 a.m. Eastern (UTC-5)


## BlueJeans Chat copy/paste:
```
Me10:53 AM
Please sign in https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Matt Heon11:06 AM
https://copr.fedorainfracloud.org/coprs/rhcontainerbot/podman-next/
Matt Heon11:08 AM
https://github.com/containers/netavark
Me11:09 AM
Did I share anything?
Me11:25 AM
Oh good, I can see people talking, but I can't hear anything
Pavel11:26 AM
I'm trying to run Podman on Fedora35 WS and it doesn't go easy: the home area concept conflicts with podman storge conf
Chris Evich11:26 AM
Tom, if you're talking we can't hear you :(
Pavel11:27 AM
User's home is not static - it is mounted dynamically
Me11:27 AM
I've lost my audio, I can't hear, trying to get it bak.
Christian Felder11:27 AM
I think Marin Jackson's Audio isn't working either
(Martin Jackson) - sorry typo
iongion11:32 AM
https://iongion.github.io/podman-desktop-companion/
iongion11:33 AM
https://github.com/iongion/podman-desktop-companion
Me11:35 AM
tsweeney@redhat.com
iongion11:37 AM
Ionut Stoica
```
