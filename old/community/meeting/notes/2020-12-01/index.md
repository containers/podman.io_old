# Podman Community Meeting
## December 1, 2020 11:00 a.m. Eastern (UTC-5)

### Attendees (35 total)
Tom Sweeney, Brent Baude, Jhon Honce, Reinhard Tartler, Dan Walsh, Chris Evich, Lokesh Mandvekar, Anders Björklund, Greg Shomo, Urvashi Mohnani, Nalin Dahyabhai, Qi Wang, Eduardo Santiago, Ed Haynes, Sally O'Malley, James Cassell, Scott McCarty, Christian Felder, Valentin Rothberg, Christian Korneck, Neal Gompa, Brian Smith, Giuseppe Scrivano, Joe Crist, Joe Doss, Miloslav Trmac, Pablo Greco, Parker Van Roy, Peter Hunt, Preethi Thomas, James Ault

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/aOaqCoRSJB4/)

## Introducing Network Aliases
### Matt Heon
#### (1:50 in the video)

Podman v2.2 came out last night.  Network connect lets you take an existing container and will let you connect to another containers network.

Still limited, calling it initial support.

Second thing is network aliases.  Podman allows you to access other containers by its name.  Supported since v1.6.  Useful for database container and a http container that you want to talk to.  Network alias allows you to add further names to the containers to make it even easier to communicate with. 

A new `dnsname` plugin is required. Existing networks from `podman network connect` are not compatible as-is but are simple to upgrade (small change to their config).

Matt started a demo (https://asciinema.org/a/376554) **(4:59 in the video)**.

The demo showed how you can use either the name of the container or its newly established alias to do a run command against.

He then demo'd setting up a network connection.

##  Podman Split Brain API
### Jhon Honce
#### (12:33 in the video)

Community was resistant to a new API that differed greatly from Docker.   Podman v2.0 featured API v2.0.x.  Split brain comes form DNS split brain .  We have an api that is Docker compatible and one that is not.  The two trees are versioned independently.

Moving to Podman and API v3.X for both in the near future.  We needed improvements especially in newlines where we've run into issues with v2.0.  V3.0 will complete more of the compatibility resources.  It will add new commands such as network connect and disconnect.  Also removal of the varlink API which will cause the size of the binary to be slimmed down.

Brent also talked about slimming down other areas of Podman as well in v3.0.  Dan pointed out the help that the community has provided in tuning the API.

See [API tests using python requests library](https://github.com/containers/podman/tree/main/test/apiv2/rest_api) for examples.

## Demo containers.conf usage
### Dan Walsh
#### (22:34 in video)

Dan talked about containers.conf which will allow for users to change the default settings for the container engine on the host.

  * /usr/share/containers/containers.conf is the main file to use.
  * /etc/containers/containers.conf is the secondary file which an admin can use to change for all container projects (Buildah, Podman, Skopeo, etc.)
  * $HOME/.config/containers/containers.conf is used by an individual user to configure their rootless containers.

The containers.conf file allows for sysctl to be configured/toggled.  There are many options within the files.

Does rootless ignore the /etc/containers/containers.conf version?  It does not per Dan.

Neal Gompa asked if we could provide a containers.conf.d similar to registries.conf.d which makes it even easier to tailor.  Dan said it's been thought about and we'd be amiable to it being included.

Dan then did a demo.

HPC had massive amounts of containers and want to set up defaults.  A blog is in the works.

James Cassell asked about libpod.conf.  It's gone away and been replaced by containers.conf.

## Podman development update
### Brent Baude
#### (38:30 in the video)

  * Podman v2.2 was just cut yesterday Nov 30, 2020 and upstream was switched to v3.0 development.  Varlink was removed from Fedora 33 which will have Podman 3.0.  Fedora 32 will not have Podman v3.0.

  * Podman 2.1.1 will be in RHEL 8.3.1 to be released in Feb 2021, and RHEL 8.4 in May 2021 will have Podman v3.0.

  * The Debian and Ubuntu distro packages currently ship with varlink enabled at build time, and ship with systemd units.

## Discussion on a Podman forum.
#### (44:28 in the video)

Joe Doss suggested a Podman category on this forum: https://discussion.fedoraproject.org/c/server/coreos/5 like FCOS?
Tom Sweeney pointed out there is a podman wiki and the mailing list.  Thought was expanding the wiki would be useful.  Matt Heon would like a place to document what people are doing and how which would probably fit well with a forum or a Wiki.  Tom Sweeney to look into setting up a forum in the fedoraproject.org site.


## Any pain points?
#### (49:19 in the video)

Brent Baude asked the attendees if they had any pain points with Podman:

  * --cache-from on image building, huge pain not having that.
   
  *  jitsi-meet and k3d working in podman?
   
  *  we would certainly like to see integration between podman and MPI versions: e.g. mpirun podman imagename to launch a job on some HPC nodes in a rootless podman environment....
   
  *  Has cgroup functionaly matured more, especially with systemd.  This is still ongoing.
   
  * handling ``isDeaultGateway`` properly in podman network create (currenlty it is hard-coded to false in NewHostLocalBridge) - I already created an issue [#8483](https://github.com/containers/podman/issues/8483)

## systemd discussion
#### (51:19 in the video)
	
    Joe Doss asked if the interaction between Podman and systemd in regards to cgroups is in a mature state?  He's had issues with rootless Podman and systemd.  Matt Heon said work has been done, but more work needed.

    Valentin noted that "how to" run a rootless container with systemd is documented in the man pages, but it's not always the greatest place to find info.  More blogs and how-tos would be nice to have, from both Red Hat and the community.
   
    A blog post with example config files for this example (running a rootless container with systemd) would be excellent...
   
## Questions?

  * James Cassell asked about how libpod.conf is handled.  In v2.0 we swapped out the default reading order so containers.conf is now read first.  The libpod.conf file is still supported, but it is suggested to move to containers.conf which is used by more projects (Buildah, Skopeo) other than Podman.  We may drop it in v3.0, something to discuss by the development team.
  * If a containers.conf has specified a volume, but it doesn't exist? The intent of the question was a way to have a container disable parts of containers.conf (or all of it) and not obey global configuration. This is not presently possible - containers.conf is intended to be a global configuration for all containers. It is possible to override individual settings manually, or for a specific user by adding a containers.conf for the user. We may reevaluate this in the future.
  * Is there a way to send a particular option to a particular container using this (containers.conf)?  We don't currently have a way to do that specifically at this time.

## Topics for Next Meeting
### **NOTE** no January meeting.
#### (54:03 in the video)

Two Proposed Topics:
  * systemd with containers - Valentin Rothberg
  * Docker compose with Podman - Brent Baude


## Next Meeting: Tuesday February 2, 2020, 11:00 a.m. Eastern (UTC-5)
### Meeting End: 12:03 p.m. Eastern (UTC-5)

## BlueJeans Chat copy/paste:

**Note:** Many thanks to James Cassell for capturing the Bluejeans chat! 

```
Tom Sweeney10:56 AM
Please sign in at HackMD: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me11:08 AM
yes
Guest 511:14 AM
so the alias is for a hostname or networks? -- I'm confused on what exactly is aliased.
Brent Baude11:14 AM
yes
mheon11:14 AM
It's basically a DNS CNAME
Guest 511:14 AM
but it is bound to the network. So if the container gets disconnected, the alias is dangling?
mheon11:15 AM
The alias is removed from the container when we disconnect
Guest 511:15 AM
thanks!
mheon11:16 AM
https://asciinema.org/a/376554
Me11:16 AM
looks like 2.1.1 is the newest available in updates-testing on Fedora 33
Daniel (rhatdan) Walsh11:16 AM
I saw it this morning.
Brent Baude11:16 AM
podman-2.2.0-1.fc32 and fc33 just built
Daniel (rhatdan) Walsh11:17 AM
koji latest-pkg f33-updates-candidate podman
Me11:17 AM
great! probably hasn't made it to the mirrors yet
Brent Baude11:17 AM
it needs bodhi first
https://bodhi.fedoraproject.org/updates/FEDORA-2020-fd0574be76
Neal Gompa11:17 AM
hey all!
Brent Baude11:17 AM
https://bodhi.fedoraproject.org/updates/FEDORA-2020-c9a8fdbd34
afbjorklund11:17 AM
podman 2.2.0 is out for ubuntu (ironically enough)
Neal Gompa11:18 AM
well, not for stable releases :)
and not in the official repos
even hirsute still only has podman 2.0.6
afbjorklund11:18 AM
Will there be a 2.1.2 ?
Brent Baude11:19 AM
no
Daniel (rhatdan) Walsh11:19 AM
Master branch is now on 3.0-devel
Brent Baude11:19 AM
lets talk versions in wrap up?
Me11:19 AM
podman 2.2.0 has buildah 1.18?
mheon11:20 AM
Yes - 1.18.0
Joe Doss11:22 AM
100% agree Neal
Me11:29 AM
Does rootless ignore the /etc/containers/containers.conf version?
Me11:35 AM
libpod.conf?
Guest 511:35 AM
how to disable options on the command-line that are specified in the configuration file?
Joe Doss11:36 AM
Online Documentation on containers.conf?
Brent Baude11:36 AM
cmds overrule conf files
Guest 511:36 AM
Example: if containers.conf is specifying some volume, but I have a usecase where that must not exist?
ah, ok. makes sense
Me11:36 AM
thanks! containers.conf sounds great
Me11:37 AM
"WARN[0000] Found deprecated file /etc/containers/libpod.conf, please remove. Use /etc/containers/containers.conf to override defaults."
Guest 511:39 AM
aah, thanks for the clarification. the distinction between appendable and non-appendable option wasn't obvious to me
Guest 511:41 AM
for clarity, it was an explorative question, I don't have a specific use-case in mind
Guest 511:45 AM
debian does right now (for better or worse)
ubuntu is following debian
I'd love to drop it, but evidently, nomad-podman is still depending on it
Pablo Greco11:46 AM
did I understand correctly, there won't be podman 2.2.x in RHEL?
Christian Korneck11:47 AM
unrelated general question: I kind of miss an equivalent to the Docker Forum for Podman where users can exchange about their Podman usage. Stuff that can get verbose. (I think github issues are more dev related?). Would it maybe make sense to create some forum (i.e. by enabling github discussions on the gh repo)?
Brent Baude11:47 AM
good question
lets talk about it
Me11:48 AM
mailing list
afbjorklund11:48 AM
We talked about it last meeting, but podman-machine and minikube were both using varlink. Currently frozen at podman 1.9.3
Minikube now also supports podman2, so it will use whatever version is on the server (actually looks for "varlink" binary)
Christian Korneck11:49 AM
ok, let me try and jump on the mailinglist :)
Neal Gompa11:49 AM
https://lists.podman.io
Uwe11:49 AM
The list is fine
Joe Doss11:50 AM
+1 on a single source of truth for online docs.
Neal Gompa11:50 AM
gotta jump off, bye y'all
Joe Doss11:50 AM
Bye Neal
afbjorklund11:51 AM
I have three audio dials
Joe Doss11:52 AM
Regarding a forum Maybe a Podman category on https://discussion.fedoraproject.org/c/server/coreos/5 like FCOS?
mheon11:53 AM
We definitely do get questions there
Joe Doss11:53 AM
would be a fast and easy way to get community discussion going for Podman that is not a mailing list.
--cache-from on image building
huge pain not having that.
Guest 511:54 AM
jitsi-meet and k3d working in podman ? ;-)
would be my pet peeves :-)
JA11:54 AM
we would certainly like to see integration between podman and MPI versions: e.g. mpirun podman imagename to launch a job on some HPC nodes....
Pablo Greco11:55 AM
Dan, nnow that gitlab-runner works, it is for me ;)
Christian Felder11:55 AM
handling ``isDeaultGateway`` properly in podman network create (currenlty it is hard-coded to false in NewHostLocalBridge) - I already created an issue #8483
Brent Baude11:56 AM
yup got that
JA11:57 AM
in a rootless-podman environment...
Me11:57 AM
COPY between stages in multi-stage build seems to hash every file, even if neither of the previous stages changed, which slows down cached rebuilds
Pablo Greco11:57 AM
Need to go, $work meeting, thanks!
afbjorklund11:58 AM
About k3d: do have crio-in-podman running with minikube (even with podman v2)
JA12:01 PM
a blog post with example config files for this example (running a rootless container with systemd) would be excellent...
Guest 512:03 PM
I agree with Joe!
Greg Shomo (Northeastern)12:03 PM
thank you all for your time && have a good one
Joe Doss12:03 PM
Thanks folks
Christian Felder12:03 PM
Thanks!
Uwe12:04 PM
thanks, cu
Tom Sweeney12:08 PM
James Cassell if you're still on line, could you cut/paste the bluejeans chat into the bottom of the hackmd please?
Ditto anyone else who may still be here.
Me12:12 PM
yes, will do
```
