# Podman Community Meeting
## February 1, 2021 11:00 a.m. Eastern (UTC-5)

### Attendees (26 total)
Tom Sweeney, Jhon Honce, Chris Evich, Urvashi Mohnani, Matt Heon, Chris Evich, Anders Björklund, Ashley Cui, Aditya Rajan, Eduardo Santiago, Valentin Rothberg, Paul Holzinger, Nalin Dahyabhai, Ionut Stoica, Jason Greene, Giuseppe Scrivano, Chris Evich, Lokesh Mandvekar, Niall Crowe

## Meeting Start: 11:02 a.m. EST
### BlueJeans [Recording](https://youtu.be/-dVK9CfqeNM)

## Container Plumbing Days
### Tom Sweeney
#### (1:23 in the video)
We are looking for speakers for the [Container Plumbing days](https://containerplumbing.org/speakers).  It is occurring on March 22 and 23, 2022, in the morning through early afternoon Eastern time. They are looking for all kinds of container-related topics.  Check the website for more details.

## Podman on Windows Demo
### Jason Greene
#### (2:14 in the video)

API event forwarding is working and demonstrated that.

Jason started a machine on Windows under WSL.  If you're using typical Docker, it expects a pipe to be opened, and Podman can now talk to that same pipe.  

He did a number of Docker commands that ran under Podman.  

The `podman machine start other` will allow for multiple instances of podman to run on the Windows machine.  If you do `podman ps`, it will show only the "other machine" instances, but you can hop back to the original and see the ones running under that machine.

Podman machine is starting a separate API forwarding service, and it's hooked into the windows event logging system.  It's not running using .NET, but some of the .NET tools.

The proxy is called win-sshproxy by default.

He's exporting the root socket to pull this off to allow the Docker APIs to work with this.  WSL is running under the user's identity, so not a security vulnerability.

This is all running in WSL running in the shared WSL VM.  Similar to a privilged container image.  It is just mapping Docker to the Podman socket.  

Do volume mounts outside of /mnt work?  i.e. /home/user/projects.  That should work withing the WSL Linux environment.

Extend podman-py to integration with WSL podman machine windows socket.

## Podman Network
### Matt Heon
#### (19:15 in the video)

A new update to the network stack.  The new stack is created by [netavark](https://github.com/containers/netavark) and [aardvark-dns](https://github.com/containers/aardvark-dns).  The aardvark-dns project handles DNS, netavark takes care of the rest of the stack.  It is undergoing extensive testing as of now.

Blog post soon on how to use the new stack.

If you upgrade from Podman v3 to Podman v4, you will continue to use CNI so you won't break.  But you can configure up to the new stack as you wish.

Multiple IPs per container and IPv6 support will be provided.

Netavark is based on similar kernel facilities as CNI.  It is going to be eventually be working in the firewald framework soon.


## Open Forum/Questions?
#### (26:53) in the video)

1) For people using Fedora, Podman v4 will be on Fedora 36, but not Fedora 35 as it's a breaking change there.  If you want Podman v4.0 on Fedora 35, you will need to install it.  We're leaning towards not doing a parallel stream due to the connection issues with the Podman socket in that scenario.

## Podman Desktop Companion Demo
### Ionut Stoicia
#### (34:27 in the video)

Slides - [here](https://podman.io/community/meeting/notes/2022-02-01/Podman_Desktop_Companion.pdf)

* Target - People wanting to learn about containers (Podman) and full-stack developers.

* Goals - Look and feel the same on all operating systems with a familiar UI.  
  * This project supports Windows and macOS.

* Trials - Native trial using Lazarus, GTK4, and QT.  
  * All looked good, but each had its hurdles.

At the end, Ionut went with the  Electron Web APP and is still exploring.  It's easy to develop/share ownership using it.  Electron also handles many major OSs for an end product.

Immediate Goals: Windows and Mac binaries ASAP, then on to GitHub issues.  Then need to advertise.  Wants to take the 10 most useful scenarios in Podman and convert them to desktop demos.

Demo (41:50 in the video)

Showed inspecting a container, secrets management space, and volumes.  All were GUI driven.

Question: Are you looking to add build/pull images?  Eventually, build functionality is not yet available though.

He's using the Podman API after talking with Anders.  After seeing Jason's demo, Ionut thinks he can make progress there.  It is handing only rootless there now.  Anders had an update for Lima that will help.  

Ionut aims for the main Podman functions to start, and he wants the project to handle as many functions as possible.  Ionut intends to create a GUI that's very useful to the CI.

Ionut would like to include this project under [containers](https://github.com/containers).  He will work with Brent and Dan to make that happen in the near future.

## Easter Egg

`podman run quay.io/podman/hello`


## Topics for Next Meeting

1) Sparsefile handling with Podman - Giuseppe Scrivano

## Next Meeting: Tuesday April 5, 2021, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday February 17, 2021, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:51 a.m. Eastern (UTC-5)


## BlueJeans Chat copy/paste:
```
Me11:02 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Scott McCarty11:07 AM
I always love Jason's videos. I'm so jealous LOL
jhonce11:14 AM
w00t!
Ionut Stoica11:18 AM
I have one, do volume mounts that are not from /mnt work ? Let's say /home/user/Projects
Jason Greene11:21 AM
thanks guys!
Ionut Stoica11:21 AM
Can you guys hear me ?
Matthew Heon11:26 AM
We can't, sorry
Jason Greene11:26 AM
is netavark based on similar kernel facilities as cni?
Paul Holzinger11:26 AM
yes
Ionut Stoica11:26 AM
switching browsers
Paul Holzinger11:27 AM
hopefully better firewalld support soon
Jason Greene11:27 AM
awesome thats great
ionut stoica11:28 AM
I can see myself / test works, but you guys cannot
I am in firefox
Adi11:29 AM
try to open in a private tab of firefox
Eduardo Santiago11:29 AM
I thought the reason for BJ was ease of publishing recordings?
ionut stoica11:30 AM
I've created a google meeting, there it works https://meet.google.com/uvv-dzzg-cxa but wont be recorded
baude11:31 AM
@Anders, can you stick behind after the meeting?
Me11:32 AM
Ionut, let me try to stream that
Jason Greene11:37 AM
woohoo
jhonce11:47 AM
:+1:
👍
Jason Greene11:48 AM
very cool
Adi11:49 AM
👍
Jason Greene11:50 AM
are you aiming for parity with the command line or just main tasks?
Me11:51 AM
dwalsh@redhat.com
baude11:52 AM
please include
bbaude@redhat.com
bc Dan is just going to fw it to me :)
Anders11:53 AM
Will stay
```
