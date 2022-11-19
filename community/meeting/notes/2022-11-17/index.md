# Podman Community Cabal Meeting Notes

Attendees: Matt Heon, Dan Walsh, Nalin Dahyabhai, Paul Holzinger, Lokesh Mandvekar, Valentin Rothberg, Mohan Boddu, Eduardo Santiago, Giuseppe Scrivano, Aditya Rajan, Urvashi Mohnani, Preethi Thomas, Ashley Cui, Florent Benoit, Martin Jackson, Charlie Drage, Lorenzo Prosseda, Luca Fuse, Steven Le Meur, 

## November 17, 2022 Topics
1. Docker Compose Support from the Command Line - Dan Walsh

2. Docker Socket helper on macOS enabled by default - Florent Benoit
    * (It is enabled by default on Windows but needs an extra step on macOS

### Meeting Notes
Video [Recording](https://youtu.be/HIzZYPpE304)

Meeting start: 11:02 a.m. Thursday, November 17, 2022

###  Docker Compose Support from the Command Line - (0:55 in the video) - Dan Walsh

Podman Desktop is asking to add Docker Compose.  The Desktop folks are getting a lot of pull from the community about using Docker Compose from the Desktop.

Stevan believes Rancher supports this based on the container type.

We could do either Podman Compose or vendor in Docker Compose from Docker.  We'd need to go to the latest version of Docker Compose with the highest available Golang to make it work with Podman.

Since we have to use client/server services, Dan thinks Docker Compose would be the way to go.  Plus, it has good usage by the community.  Podman Compose needs further work.   Either way, a lot of work is necessary to make it happen.

Martin has been involved with Docker Compose and uses it outside of Podman.  He thinks having Docker Compose would be useful.  He thinks Kube support would be upgraded for Podman, too, with Docker Compose.

Let's say `podman kube` does 75% of Docker Compose, but Docker Compose has become the deFacto standard.  It's also an easy-to-understand format.  Martin prefers it over Kube YAML for ease of use.  He feels there would be value in having Docker Compose work under Podman.

The latest Docker Compose has a few new commands that aren't in the Python library.  You can run the Docker Compose v2 as standalone, and you don't need Docker to run also.  This makes it more likely it could be used by Podman.

Dan would be happiest if we could exec to Docker Compose rather than having to vendor or ingrain it into Podman.  Brent is concerned about the reaction of this by our community when we note that Podman claims "Docker Compose" support, and we're only shipping the client.  This is where the idea of using a plugin for him has come from.

A plugin would just be a CLI, and Dan is worried about increasing the size of the Podman binary if we do this.  

Matt thinks we need to ship the Docker Compose v2 client within the image, and it doesn't need to be integrated into Podman.  

We will need to figure out how to make a supported version for RHEL/Red Hat.  Currently, if there's a problem with Docker Compose, we report it upstream but don't fix it.  Once we ingrain it, the onus comes onto the Red Hat team for RHEL support.

Dan has heard from customers is they are waiting to move to Podman Desktop until Docker Compose functionality is available.

Stevan is documenting these kinds of requests from customers. 

Florent wondered which socket, Docker Compose or Podman, would be called.  Matt suggests using a symlink from Podman to Docker, but this could be a problem if both were installed.

From a Red Hat perspective, we'll need to get “buy-in” from our product management team.  We'll need to build a case, but that shouldn't be too hard to do.  Florent has opened an [issue](https://github.com/containers/podman/issues/16548) to address this socket problem.

This is a similar situation to Dockerfile.  We need to support all of the functionality there, and once we take on Docker Compose, we'll need to do that there too.

Docker Compose is the last piece of the Docker-controlled container world that Podman does not handle well currently. 

Brent thinks that if we can provide Docker Compose support, the community will love it.  The hard part will be finding the time to do the work and then support it over time.

###  Docker Socket helper on macOS enabled by default - (28:50 in the video) - Florent Benoit

We have a number of people studying Podman and how it's attached to the Podman Socket.  It's not working all the time with the Podman Machine in Mac.  By default, the Podman socket is mounted for Windows.

In Windows, if it's not finding Docker being mounted, then it mounts the Podman socket.  Florent would like to do similar on the mac.

Paul is concerned that the Mac would require root, which is not enabled by default.  

Ashley doesn't think root will be needed for this.  Homebrew doesn't, so she thinks opt might not need root-level privileges.

Dan suggests that we talk to Gerard to figure out a workaround.  We could make the change such that at installation, it would optionally ask for a root password.  Florent to open up an [issue](https://github.com/containers/podman/issues/16547) against Podman to see if we can move this forward. 

On Linux, we shipped Podman-Docker, which takes care of this issue.  Docker has a new change in this area, and it may not require root for the socket.  Further investigation/study is to be done.

#### Open discussion (35:30 in the video)

1.  Issue Triage on Podman. (35:30 in the video)

Paul has noted an increase of issues reported against much older versions of Podman and issues that are incomplete.  In addition, bugs reported against RHEL are being logged as issues rather than Bugzillas, as they should be.

Brent thinks anything against Podman v1 and v2 should just be closed, and the people told to move up to a newer version.

We might add a "unable to reproduce" flag that would close an issue if it was around for 30+ days.

A robot to ask for the `podman info` output in an issue would also be nice.

Reporters don't always report the information that's needed to resolve the issue.

It would be nice to have AI that could move GitHub issues that should be discussions automatically.

It would also be nice to block comments on issues that have been closed for several months or more.

Podman Desktop has fields that they use in their issue template.  The Podman team will look at what they're doing and see if we can align a bit better.  The document is [here](https://docs.github.com/en/communities/using-templates-to-encourage-useful-issues-and-pull-requests/configuring-issue-templates-for-your-repository#creating-issue-forms).  Brent and Mohan will poke at this further.

2.  Podman 4.3 update (47:08 in the video)
    About three weeks old at this point.  A new Podman v4.3.2 will come out sometime in December after an upcoming bug week.
    
    Then Podman v4.4 RCs are likely to come out in late January.
    
3. `podman kube play` volume issue (48:30 in the video) 
    Martin asked about the volume [issue](https://github.com/containers/podman/pull/16420) with the `kube play` command.  Podman Kube Play doesn't work with volumes that are associated with the Kube YAML.  On restart, the volumes don't work.   Team to look at this for Podman v4.4 at the latest.
    
    Also upcoming in Podman v4.4 is a focus on performance, updates to podman machine, network improvements, podman Kube fixes, quadlet changes, a new `--dns` selector option, and pasta support.
    
    
### Next Meeting: Thursday, December 15, 2022, 11:00 a.m. EDT (UTC-5)
## December 15, 2022 Topics
1. None Suggested

### Next Community Meeting: Tuesday, December 6, 2022, 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1. MinIO Demo - Will Dinyes
2. Kubernetes Demo - 

Meeting finished at 11:57 a.m.
