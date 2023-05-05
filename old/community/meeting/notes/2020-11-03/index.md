# Podman Community Meeting
## November 3, 2020 11:00 a.m. Eastern

### Attendees (36 total)
Tom Sweeney, Brent Baude, Anders Björklund (afbjorklund), Greg Shomo, sshnaidm, Jordan Christiansen (xordspar0), Ralf Haferkamp, Paul Holzinger, Giuseppe Scrivano, Shenghao Yang, Ashley Cui, Brett Tofel, Alex Litvak, Nalin Dahyabhai, Qi Wang, Scott McCarty, Lokesh Mandvekar, Ed Haynes, Valentin Rothberg, Christian Felder, Holger Gantikow, James Cassell, Dan Walsh, Peter Hunt, Urvashi Mohnani

## Meeting Start: 11:03 a.m. 
### BlueJeans [Recording](https://bluejeans.com/s/PwWkFkPIlI6)

## boot2podman/podman-machine
### Anders Björklund
#### rise and fall of boot2podman

<https://boot2podman.github.io/>

#### Basically a varlink post-mortem
##### (1:40 in the video)

Anders talked about his work in containers starting with chroot to jails, to zones, to openVZ, to LX and finally to Docker.  Slide Deck [here](https://boot2podman.github.io/assets/Boot2PodmanProject.pdf). 

Within Docker, runc, containerd and Moby project.

What was very interesting to him was the boot2docker, a lightweight distribution based on Tiny Core Linux made specifically to run Docker containers.   This was productized into the Docker toolbox.

Base.Tiny Core Linux which runs on multiple architectures.

His boot2podman project was to try and emulate boot2docker.   Used a custom kernel, add-on initrd and build tools.

When running containers from scratch you need kernel, build, packages (runc, Podman, conmon, cni-plugins, varlink Buildah, Skopeo) and others such as ssh.  Varlink was used to run remote connections for Podman.

Varlink tool and library talks to different interfaces and runs on a socket. 

Machine lets you create Podman hosts on computer, it creates servers with Podman on them, then configures the Podman client to talk to them.
*  Docker to Podman conversion
*  Drop support for Swarm
*  Add the driver for QEMU
*  Drop support for cloud

boot2docker was recently deprecated and move to unmaintained image.   boot2podman also deprecated due to varlink being replaced with REST API.

Anders then ran a [demo](https://boot2podman.github.io/2020/11/03/boot2podman-project.html) **(16:00 in video)**.  He does not yet have support for V2 Podman, but in the works.

##  What Red Hat Thinks - Design directions
### Brent Baude
##### (20:55 in the video)

Determing priorities
* Resolve migration hurdles from Docker to Podman
    * Number 1 focus of the team at the moment.
* What are we hearing?
* What do we know?

The following is not a commitment from Red Hat, but what we think and hope to do.

How we work
* Stakeholders
    * Upstream
    * Product Management
    * Distribution and OpenShfit
* Agile driven
    * 3 week sprints
* Complications
    * No easy bugs
    * Bug counts

Short Names (see next topic)

Upcoming priorities.
* Possible now with "compatibilty" RESTful interface
* CI testing to prevent regressions
    * No obvious framework for using docker-py tests
        * Problems using swarm, working through that.
    * Wrote testsuite but needs completion
* Linchpin - Opens up possibilities for other applications.
    * Grype, for example, a vulnerbality scanner that uses docker-py that ran into an issue and has been addressed.

Volume plugins
    * Ongoing requirement from users and customers
    * Compatible with Docker

Docker compose
    * Ongoing requirement from users and customers
        * podman-compose
     * Getting close
     * Podman generate and play kube is strategic future.

Network Alias
    * Longstanding upstream request
        * `podman run --network-alias foo1 ...` 
    * Wired into dnsname plugin.
    * Backend and Frontend WIP PR's exist.
    * Opens up network connect and disconnect.
    * Work is ongoing and needed for docker-compose.
    
Clone (rename) containers
    * Longstanding upstream request
    * Challenges our architecture where container description are immutable.
    
Secrets
    * Add "secrets" to a container
    * Lots of open-ended questions here yet, but design meeting pending.  Ashley Cui driving.
    
Mount image into container
    * Convenience command to allwo mounting of an image into a container in a single step.
    
Help Needed
* Keeping bugs below 200.
* Need community to help us balance bugs and new features.
        * Reproducers alone are very helpful!
        * Answer questions
        * Submit fixes
        * Blogs
* RESTful compatibilty endpoint for archive
* Secure implementation of 'cp' for podman-remote
* podman-py
    
(Note for Brent: Look into docker log drivers.)

## Short Image Name Pulling Demo
### Valentin Rothberg
##### (27:30 in the video)

Valentin took over in the middle of Brent's talk.
"debian" vs fully qualified "docker.io/library/debian:latest"

Ambiguity when completing short names, uses /etc/containers/registries.conf to determine where to pull from.

Risk of hitting a malicious repository
* Depends on order of registries in list
* registry.fedorproject.io, ..., docker.io

Solution: short name aliasing and prompting

https://github.com/containers/shortnames for more info.

Valentin ran a demo on short names.

This is to ship with Podman v2.2 along with a blog post describing it.

(A number of questions in bluejeans chat on shortnames, see below.)

## Questions?

1. Marcin Skarbek having problems starting a container in Podman v2.0.5.  New issue incoming.  Brent believes fixed by changes in upstream.
2. Jordan Christiansen asked about podman play kube volume support.  Peter Hunt said to report an issue if problem found which he suspects there is.
3. Shenghao Yang asked about fuse-overlayfs to store in a NFS use case.  The goal is to get there.  Experimental now due to the uids that come into play.  Long term goal is to get NFS to understand and use usernamespace safely.

## Topics for Next Meeting

None suggested, happy to take some! (tsweeney@redhat.com)

## Next Meeting: Tuesday December 1, 2020, 11:00 a.m. Eastern (UTC-5)

## Meeting End: 12:14 p.m.

## BlueJeans Chat copy/paste:
```
tsweeney10:56 AM
HackMD for notes and questions, please sign in there at the top! https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Scott McCarty11:05 AM
Hello everyone!
Christian Felder11:27 AM
I don't want to interrupt the current session, but I've a question regarding boot2podman: If you publish a port is it published just on box or on the host as well?
DAN (ME)11:29 AM
We connect via ssh tunnel, so no open ports on the VM by default.
Other then ssh port.
Podman v2 listens on local unix domain socket, and podman-remote uses ssh under the covers to connect to this unix domain socket.
Christian Felder11:29 AM
ok... that's a bit different from the docker experience... if you use docker run -p it is published on the host although there is this vm behind the scenes
afbjorklund11:30 AM
docker-machine opens 22 and 2376, but podman-machine does everything over 22 - although tunneled to a random local port
DAN (ME)11:30 AM
You can setup Podman to listen on random ports, but we discourage this because of the security risks.
afbjorklund11:30 AM
there is no publishing on the laptop, that is docker desktop rather than docker toolbox
(when using docker-machine that was)
mheon11:31 AM
@Christian - ports are only published on the VM now.
I think Dan is confusing port mapping and the API port
DAN (ME)11:31 AM
afbjorklund nice job on the presentation.
afbjorklund11:31 AM
thanks! it'll be on the blog site eventually
DAN (ME)11:31 AM
mheon I am talking about which port the podman socket listens on
Christian Felder11:32 AM
ok from my experience I could telnet to a port on localhost (on the host machine) when using the docker-cli, e.g. docker run -p ...
mheon11:32 AM
@Dan I'm fairly certain the question is about `-p` for podman run
@Christian - yes, that's not implemented yet
Christian Felder11:32 AM
alright thanks
mheon11:33 AM
I'd love to get it working, but there are only so many engineers on the project right now
afbjorklund11:33 AM
when you use this docker-machine/podman-machine setup, anything that you publish is available on the VM IP (rather than 127.0.0.1)
Christian Felder11:33 AM
thanks afbjorklund that was what i expected. I did a similar setup with podman-remote and a custom vm
afbjorklund11:34 AM
some details are on https://github.com/boot2podman/machine
Alex Litvak11:35 AM
missed previous speaker, will the video be posted ?
DAN (ME)11:35 AM
yes
Me11:35 AM
Alex, yes it will. At least a link on podman.io
Alex Litvak11:35 AM
thanks
Christian Felder11:37 AM
docker.io/mariadb:latest -> docker.io/library/mariadb:latest (is the first a shortname as well?)
mheon11:38 AM
@Christian - It has a repository in it explicitly, so I would say no
James Cassell11:39 AM
does it support cascading configs? can a user override only part of the system config?
mheon11:39 AM
I'll leave that one to Valentin
DAN (ME)11:40 AM
James we will leave it to distros to choose which shortnames they want to ship by default.
Valentin Rothberg11:40 AM
@Christian: Matt is right. docker.io/foo is a special case as Docker normalizes with library/
@James: the registries.conf supports drop-in config files that allow to override previous entries
DAN (ME)11:41 AM
github.com/contaiers/shortnames, is just for disto based images at this point. If fedora wants to defaul mariadb to a fedora version, then this is up to fedora.
Valentin Rothberg11:41 AM
`man containers-registries.conf.d` is the place to look
Christian Felder11:42 AM
I just stumbled accross this when using podman_image modules for ansible which checks for the image name because the code checks for the image name which changes when pulling from the shorter url which resolves to docker.io/library/...
thanks for your answers
James Cassell11:43 AM
thanks! drop-ins are great
James Cassell11:45 AM
if docker-compose compat REST API works, does it make podman-compose irrelevant, since folks can just use the docker-compose binary to talk to podman?
James Cassell11:45 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w (reposting link from start)
Christian11:46 AM
do you have an example of what won't be possible with docker-compose / docker-py ?
mheon11:46 AM
For docker-py - anything in the Swarm APIs
Renaming containers
Those are the big two
Networking will have some limits for now but I think we can work through those
Alex Litvak11:47 AM
are docker log drivers a part ofthe picture?
Christian11:48 AM
thanks!
afbjorklund11:57 AM
podman-py, not to be confused with pypodman :-)
mheon11:57 AM
Lesson here: Don't let engineers name things
Sagi Shnaidman11:59 AM
You can demonstrate podman modules for Ansible, for example :)
afbjorklund12:00 PM
it should be noted that minikube has support for podman, so you can use podman in order to run "real" kubernetes too
(both podman v1 and v2 as of lately)
`minikube start --driver=podman`
Greg Shomo (Northeastern University)12:03 PM
thank you all for your time
Erik Bernoth12:11 PM
thanks for the greet meeting, have to leave. Bye
afbjorklund12:13 PM
Posted slides and demos on the boot2podman site
Me12:13 PM
Thanks AB!
```
