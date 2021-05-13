# Podman Community Meeting
## February 2, 2021 11:00 a.m. Eastern (UTC-5)

### Attendees (49 total)
Tom Sweeney, Brent Baude, Jhon Honce, Dan Walsh, Chris Evich, Lokesh Mandvekar, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Valentin Rothberg,  Giuseppe Scrivano, Miloslav Trmac, Parker Van Roy, Preethi Thomas, JJ Asghar, Hendrik Haddorp, Dan Walsh, Eric The IT Guy, Ashley Cui, Greg Shomo, Lee Whitty, Anders Björklund, Jacob Lindgren, Christian Felder, Alex Litvak, Paul Holzinger, Rodrique Heron

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/UNt8jSU7IH2)


## Podman v3.0 Overview
### Matt Heon
#### (1:50 in the video)

Podman 3.0 will be the largest ever.  Expecting an RC3 later this week, 3.0 final by Wednesday of next week.  Docker Compose support is a large one, along with podman rename.  Copy support for remote clieantadded for copying in and out of containers using the http API.  A number of network changes added by Paul Holzinger such as network reload, network ls, network create, and more.  Networks now have ID's and labels.  Podman checkpoint now supports with previous and checkpoint. Full details [here](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md).

#### Breaking changes.  

Shortnames for CI now prompts for which image you want by default.  This is only on a TTY, will not break any scripts.  A security feature.  In the future if shortnames are set to strict in Podman, scripts will break too, but you will be able set an alias.  More info [here](https://www.redhat.com/sysadmin/container-image-short-names).

The podman load command no longer accepts a NAME[:TAG], this was incompatible with Docker prior.

The legacy Varlink API has been removed.

#### Demo    
Matt started the demo (8:00 in the video):  

Showed how to rename a container.  The functionality works on rootful and rootless.
    
Release notes for v3.0:[here](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md)


##  Podman with Docker Compose Demo
### Brent Baude
#### (11:20 in the video)

A number of folks told us they had not moved to Podman from Docker due to a lack of "podman compose".

Docker-compose is a tool that talks to the docker.sock or podman.sock talking Docker API

Podman-compose is a wrapper around podman that translates docker-compose yaml files into podman commands.

Now Docker-compose will just talk to podman.sock now.

Brent did demo (13:42 in the video):

Using a yaml from Docker directly.

"Not terribly exciting, it just does what it does."

We've had requests for Docker compoese and changes.  The initial goal is to make it work rootful with Podman.  it does so now.  We've had requests for rootless which is feasible, but more work is necessary.  It is only rootful for v3.0.

Docker Compose articles:
 * [https://www.redhat.com/sysadmin/podman-docker-compose](https://www.redhat.com/sysadmin/podman-docker-compose)
 * [https://www.redhat.com/sysadmin/compose-kubernetes-podman](https://www.redhat.com/sysadmin/compose-kubernetes-podman)
    
That second article is where Podman is heading.


    
## Misc Demos
### Tom Sweeney
#### (18:10 in the video)

Tom ran a demo to show some small new addtions that might have been lost in the shuffle.  He showed the new `--from` and `--stdin` options for the `buildah bud` and `podman build` commands, plus the new `--list-tags` option for the `podman search` command.

Demo Started (18:30 in the video)

## GitHub Discussions

Podman has turned on the GitHub Discussions platform for the use of the community.  Ask any questions you want there, make announcements of interest, or just drop in and say hi!  It's under the "Discussions" link on the top of Podman's GitHub page, or directly at: [https://github.com/containers/podman/discussions](https://github.com/containers/podman/discussions)

    
## Questions?
#### (24:50 in the video)

1.  When will v3.0 be available.  Next week upstream, should be available in Fedora shortly after that.  Hoping to have it in Ubuntu or Debian a bet after that.  Centos streams soon after we release and in RHEL 8.4 which is scheduled sometime at the end of May.

    Goal is to make things seamless as possible.
    
2. Red Hat team is working on stabilization changes in the next few weeks.  Focus on Mac developments.  We think we're feature complete with Docker with the Podman v3.0 release.  Work going on for refactoring Podman to hopefully decrease the size of the Podman library.  Work continues on getting along with Kubernetest

3. Static binaries will be added for v3.0, as there have been some breakage with the nixpackage.  Chris has just added a fix for the nix issue.

4. Containers Plumbing Conferene coming up in March, March 9 and 10 for four hours each day. Sign up here: https://containerplumbing.org/

5. Difference between Podman Compose and Docker Compose.  Podman compose was written by the community which Dan believes was used to wrap docker yaml files and translate them to direct Podman commands.

6. Can you elaborate on the issue with renaming infra-containers ?  Matt did something quickly and it has some limitations that will be removed in v3.1.  But should work fine for v3.0.

7. New Podman discussions on GitHub: https://github.com/containers/podman/discussions

8. Journald support.  We thought it was working fine with k8s file system.  Should be fixed completey in v3.1.

9. Brent asked for any missing features that have not been added to GitHub.  Anders talked about next generation of boot2docker/boot2podman (and docker-machine/podman-machine), see https://boot2podman.github.io/ for details.

10. Dan pointed out that we've moved our default run time library from runc to crun.  We should still support both.

## Topics for Next Meeting

## Next Meeting: Tuesday March 2, 2021, 11:00 a.m. Eastern (UTC-5)

Setting goal to make April meeting in the evening East Coast, 8 to 10 pm.

### Meeting End: 11:51 a.m. Eastern (UTC-5)

## BlueJeans Chat copy/paste:
```
SETTINGS
EVERYONEDIRECT MESSAGES
Me10:47 AM
Please Sign in using the meeting notes and/or add questions at the end for the Q&A
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Rodrique Heron11:00 AM
will this be recorded?
awesome
Valentin Rothberg11:09 AM
More on short-name aliasing here: https://www.redhat.com/sysadmin/container-image-short-names
Christian Felder11:12 AM
does podman rename work with rootless as well?
thanks
Matt Heon11:13 AM
FYI, release notes for 3.0 live at https://github.com/containers/podman/blob/main/RELEASE_NOTES.md
Expect a few more bugfixes to trickle in before final release
Edward Haynes11:13 AM
is it called Podman Compose?
Daniel (rhatdan) Walsh11:13 AM
No that is a different thing.
Edward Haynes11:13 AM
ok
Daniel (rhatdan) Walsh11:14 AM
Docker-compose is a tool that talks to the docker.sock or podman.sock talking Docker API
Podman-compose is a wrapper around podman that translates docker-compose yaml files into podman commands.
Edward Haynes11:14 AM
So Docker-compose will just talk to podman.sock now
Daniel (rhatdan) Walsh11:14 AM
yes
Edward Haynes11:14 AM
gotcha
Daniel (rhatdan) Walsh11:15 AM
As well as docker-py.
Jacob Lindgren11:18 AM
boring is good!
Scott McCarty11:18 AM
Very nice!
Edward Haynes11:18 AM
We don't want things TOO boring or we'd all be out of a job
Brent Baude11:22 AM
re: docker-compose, here are a couple of articles ...
https://www.redhat.com/sysadmin/podman-docker-compose
https://www.redhat.com/sysadmin/compose-kubernetes-podman
the latter is really a glimpse into where Podman is heading.
Jacob Lindgren11:23 AM
oh i like this. I used skopeo inspect for this before.
Brent Baude11:25 AM
cool, i missed tht one dan/tom
GShomo (Northeastern)11:27 AM
which distribution/releases can expect to see podman-3.0 ?
Matt Heon11:28 AM
@GShomo Fedora should see it quickly. We actually disabled autobuilds for Ubuntu/Debian/CentOS in OBS, though
We will reenable them once we have verified the release is stable
OBS doesn't have a real process for verifying the builds are functional so we sometimes end up shipping broken packages
And we'd like to avoid this
Lokesh Mandvekar11:31 AM
@gshomo: if you can spare some resources, newer packages will be available quicker on the testing project. See: https://podman.io/getting-started/installation#installing-development-versions-of-podman
Christian Felder11:35 AM
on our own OBS appliance we've two projects, stable and testing, and we first build in testing and our CI does something once the package has been built in testing, at the moment for our rpm packages just installing them... But basically you could run several steps afterwards in your CI if you want to ingetrate OBS into your release pipeline
Valentin Rothberg11:36 AM
https://containerplumbing.org/
GShomo (Northeastern)11:36 AM
can you elaborate on the issue with renaming infra-containers ?
Anders Björklund11:38 AM
"Registration will open on February 1, 2021."
Matt Heon11:40 AM
@GShomo - I did things the quick way, instead of the right way, to get things landed in time for 3.0
I will have this fixed for 3.1
It's a silly limitation from my doing things quickly :-)
Alex Litvak11:41 AM
what are the changes for journald support?
GShomo (Northeastern)11:41 AM
thank you !
Alex Litvak11:44 AM
thank you
Ludovic Cavajani11:44 AM
Thanks !
Me11:45 AM
Fun Fact: In 1976 an LA secretary named Jannene Swift officially married a 50 pound rock in a ceremony witnessed by more than 20 people. Perhaps the first "Pet Rock"?
JJ Asghar11:47 AM
fyi: https://containerplumbing.org/register seems to say it's going to open on the 1st.... :'(
Christian Felder11:48 AM
I had to adjust some kernel settings in the past when I started some more containers (around 40)... - user.max_inotify_instances, fs.inotify.max_user_watches
would be nice to have some guidelines on that settings, although this might be not a podman only issiue...
Devin Parrish11:49 AM
Thanks!
James Cassell11:49 AM
where do we find recordings of this and past meetings?
(Tom Sweeney responded verbally, podman.io under https://podman.io/community/meeting/.  A link on each set of notes.)
Christian Felder11:49 AM
Ok. I'll open an issue
Thanks
James Cassell11:50 AM
thanks
Lokesh Mandvekar11:50 AM
Christian Felder: RE: OBS, I'll be working on a change which will allow building debian packages from the rpm spec files, (thanks to Neal Gompa) ..maybe migrate that to upstream repos as well
```
