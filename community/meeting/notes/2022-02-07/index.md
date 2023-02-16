# Podman Community Meeting notes
## February 7, 2023, 11:00 a.m. Eastern (UTC-5)

### Attendees (17 total)
Tom Sweeney, Chris Evich, Ashley Cui, Paul Holzinger, Nalin Dahyabhai, Giuseppe Scrivano, Preethi Thomas, Matt Heon, Urvashi Mohnani, Ed Santiago, Brent Baude, Stefano Brivio, Lokesh Mandvekarm, Greg Shomo, Anders Björklund, Mateo Brisi, Tom Lezotte, Stevan Le Meur, Mehdi Haghgoo, Martin Jackson

## Meeting Start: 11:02 a.m. EST
### BlueJeans [Recording](https://youtu.be/qLhf-Ae4jvo)

## Pasta in Podman Demo
### Stefano Brivio
#### (1:48 in the video)

What's Pasta?  A tool that connects the network names space of the container to the host.

#### Demo - (2:30 in the video)

Creates a tap device that allows a quasi-native network connectivity to virtual machines in user mode without requiring any capabilities or privileges.

Stefano showed two shells, one where he was running Pasta, the other slipr4netns.  He then created a device using Pasta.

Side note, Pasta shares a man page with passt (pasta (1)).  

He then ran an alpine container with --net=slirp4netns and then one with --net=pasta.  

The difference between them is the interface. Instead of tap0 from slipr4netns, it's enpp9s0.

He then showed how you could change the addresses by using the `podman run` command.  The `podman-run (1)` man page has a number of details. Search for `pasta` within it.  

Pasta gets the ipv6 addresses from the host, while sliprnetns gets a 10.0.2.100 type of address.

Why choose Pasta over slirp4netns?
	1. Performance
	2. Smaller footprint
	3. IPv6 support provided
    
He recommends setting the default for networking to Pasta from Slirp4netns.

PR: https://github.com/containers/podman/pull/16141
Project homepage: https://passt.top/
asciinema demo (Podman and stand-alone): https://passt.top/passt/about/#pasta_2
Mailing list, chat, bug tracker, weekly meetings: https://passt.top/passt/about/#contribute

What's the downside to switching the default to Pasta?  Possibly user familiarability since Pasta is a newer project.

Podman rootless network integration is still a WIP at this point.  Once that's done, then Paul suggests it changes to the default after that.

Dan would like to switch at the next full Fedora release, and he'd like it to soak for six months in Fedora before going to RHEL.  Valentin thinks good timing for RHEL 10.


## Podman v4.4 Update
### Ashley Cui
#### (26:40 in the video)

Around 125 user-facing changes, including features and bug fixes.  We introduced Quadlet, a new systemd-related generator.

A lot of new `podman kube` features.  CNI will be deprecated soon.  Advising that Netavark be used instead, and that will be the default later.

We're doing a Podman v4.4.1, probably tomorrow, to include the Quadlet man page, which was mistakenly left off, and a few bug fixes.

Several performance changes were made in this release.

We'll be doing a demo of Quadlet at an upcoming meeting.

Podman v4.4.0 should be in Fedora by default in the next few days.  We also had updates for Buildah, Skopeo, and other tools.

## Podman Desktop Update
### Stevan Le Meur
#### (31:55 in the video)

Started with Demo.  Showed "Docker Socket Compatibility" message now on the main page.

There's also a new feedback button on the main page to share feedback directly with the team.

When creating a new machine, you can customize its path.

In the registries section, you can configure the ones that you have defined.

In the proxy, you can toggle on/off the configuration.

UI changes have improved the alignments through out for better readability.

You can press the three dots icon within the pods to get further actions.

You can select the namespace so you can deploy where you want to.

Windows and Mac installations have been added to the GitHub page.

New documentation to help with the transition from Docker to Podman Desktop.

Showed a demo on creating two containers and pushing them into a Pod on OpenShift.  He created an OpenShift cluster.  He chose two containers and put them into a new pod.  He then opened a browser and showed a webpage being run from within the pod.  He later deployed it on the OpenShift cluster.  Back on Podman Desktop, it showed the status of the pod on OpenShift.


## Open Forum/Questions?
#### (47:45 in the video)

1) Martin ran with the new Podman 4.4 and noticed a speed improvement.  Folks were very happy with Quadlet to date.  Dan thinks the speed improvement is due to Kubernetes not being part of the equation, about a 30% gain in CPU.

## Topics for Next Meeting

1) Quadlet demo.


## Next Meeting: Tuesday, April 4, 2023, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday, February 16, 2023, 11:00 a.m. Eastern (UTC-5)

### Meeting End: 11:52 a.m. Eastern (UTC-5)


## BlueJeans Chat copy/paste:
```
Me10:58 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me10:59 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me11:01 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Mehdi Haghgoo11:17 AM
sorry I joined late. Is pasta a new container networking type?
Me11:19 AM
Mehdi, I'll ask your question shortly.
Mehdi Haghgoo11:19 AM
Thanks
Brent Baude11:21 AM
i would also agree about switching it to become the default as well
Stefano Brivio11:21 AM
https://github.com/containers/podman/pull/16141
Valentin Rothberg11:27 AM
Good timing for RHEL 10
Brent Baude11:28 AM
imho, switching would be transparent to customers and it is feature complete, unlink the network stack for example
Stefano Brivio11:28 AM
https://passt.top/
CI-based demo: https://passt.top/passt/about/#pasta_2
Mailing list, chat, bug tracker, weekly meetings: https://passt.top/passt/about/#contribute
Stefano Brivio11:30 AM
Pull request, listing differences with slirp4netns: https://github.com/containers/podman/pull/16141
(I'll add those to hackmd in a moment)
Mehdi Haghgoo11:31 AM
Is quadlet a subcommand of podman?
Valentin Rothberg11:32 AM
Quadlet docs: https://github.com/containers/podman/blob/main/docs/source/markdown/podman-systemd.unit.5.md
Mehdi Haghgoo11:36 AM
Can one systemd unit file manage several containers? Or is it one to one?
In your screen of PD, why podman is not emulating /var/run/docker.sock? It was very handy
Valentin Rothberg11:36 AM
It's 1:1 for ordinary container and 1:N when using the Kubernetes integration.
Mehdi Haghgoo11:40 AM
Valentin, so can I migrate a docker-compose project to a systemd unit?
Valentin Rothberg11:43 AM
@Mehdi: yes, that is a nice use case. Instead of using docker-compose, you can use Podman and systemd.
Markus Eisele11:44 AM
It might be BlueJeans blocking the port locally.
Stefano Brivio11:46 AM
Valentin, by the way, passt/pasta will be available in RHEL starting from 9.2 -- just for information, not advocating to switch the default "too early" :)
Mehdi Haghgoo11:47 AM
Thanks Valentin
Lokesh Mandvekar11:49 AM
gotta drop, thanks all.. later..
Mehdi Haghgoo11:52 AM
How does PD remove the need for DOCKER_SOCK env var?
Greg Shomo (Northeastern)11:52 AM
thank you, everyone, for all the updates and glimpses into the future. much appreciated !
```
