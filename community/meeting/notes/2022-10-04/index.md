# Podman Community Meeting Notes
## October 4, 2022, 11:00 a.m. Eastern (UTC-5)

### Attendees (24 total)
Tom Sweeney, Alex Scheel, Luca Di Maio Chris Evich, Ashley Cui, Paul Holzinger, Nalin Dahyabhai, Giuseppe Scrivano, Preethi Thomas, Lokesh Mandvekar, Charlie Doern, Matt Heon, Mark Russell, Miloslav Trmac, Urvashi Mohnani, Mohan Boddu, Mohan Bodu, Eduardo Santiago, Christian Felder, Marcin Skarbek, Lokesh Mandvekar, Marcin Skarbek, Puvi Ganeshar, Stevan Le Meur, Steve Clark, Tim deBoer,

## Meeting Start: 11:02 a.m. EDT
### BlueJeans [Recording](https://www.youtube.com/watch?v=JNijOHL4_Ko)

## Distrobox Demo
### Luca Di Maio
#### (1:37 in the video)

Distrobox is a simple Posix Shell that wrap around Docker and Podman.  It helps to remove the complexity of container runtimes.  It is your entire userspace unbound and integrated with the base operating system

Why not chroot over Podman?
  * Simpler to use than pure chroot
  * Battle-tested container engines
  * Easy to use image management
  * Healthy ecosystem of container images ready to use

Host Integration:
  * Wayland an X programs
  * Audio
  * SSH and GPG Agent
  * Automatically Generate Desktop Entries
  * Launch host's command from container and vice versa

Usage
  * Intuitive management commands:
    * create, enter, list, rm and stop
  * Utilities
    * Upgrade will keep all containers up to date
    * ephemeral create, enter, destroy a temporary container
    * generate-entry - create a desktop icon

Useful for "pet" containers that you don't want to remove/recreate all the time.

Use Cases
  * Immutable Desktop
    * Endless OS (https://endlessos.com)
    * Fedora Silverblue/Kinoite (https:getfedora.org/it/silverblue/, https://kinoite.fedoraproject.org)
    * OpenSuse MicroOS (https://microos.opensuse.org)
    * SteamOS 3 (https:github.com/ValveSoftware/SteamOS/)
  * Minimize base operating system
    * Less moving parts that can break
    * Userland can be easily replaced
    * Easier to make reproducible
  * Sudoless setups
    * Enterprise setups where you can't be sudo, but you need a package manager.  Easy to use Podman rootless containers here.
  * Mix and Match Distro
    * Custom kernel for abandoned hardware stuck on ancient distribution
    * Access to the latest software on an LTS/Stable release distribution
    * Access old software on a bleeding edge distribution:  Distrobox ensures compatibility almost 10 years back in time.

Diversity
  * Host compatiblity with all the major distributions
  * Container compatibility with over 60 combinations of distributions and major versions
  * Mix and match distributions and version to enhance software availability.

Demo - (8:45 in the video)

Using Distrobox, quickly setup a container and he showed what was going on within the container.  Including the local system user getting to their systemctl.

The distrobox daemon starts in user space and can easily be used by the user who owns it.

Distrobox also supports rootful containers with the `--root` option.

Flexibility  comes from the Podman side and Distrobox simiplifies the Podman command line for those that don't want to fully invest, but want the container experience.  It also includes a `--dry-run` option to try the commands in advance.

Heavily inspired from containers tool box on SilverBlue, but he needed more than that offered and that was where Distrobox was born.  Core concept is the same he thought it might be easier to do at the entrypoints and a few other options that have caused a divergence.  Toolbox is Fedora oriented with a dedicated image for it to work, Distrobox works with a number of cloud images.  Currently about 65 different images work with it, Debian, ClearLinux, Gentoo and more.

Running ClearLinux under Distrobox turned out to be faster than the host machine due to the ClearLinux optimizations.

## Vault Test Suite
### Alex Scheel
#### (23:01 in the video)

Working for Hashicorp and working on the Vault project there.

Demo - (25:26 in the video)

He had problems running Podman on a test suite and dove into it.

He uses Podman on Ubuntu currently, had run on Fedora and noticed that Docker was being run so, enabled the podman.socket in the test suite.

Some of his containers in Docker used a lot of memory and sometimes failed, yet when he changed to Podman that was no longer an issue.

He ran into timeouts with Podman due to networks that Podman were trying to use but docker-radius in the environment was ignoring the requests.  He added a PR to docker-radius, but it has yet to be accepted.

His CI was spinning up Docker processes and that was failing in the environment too.

He used a big hammer and changed the entrypoing to docker-radius to sleep.  Probably not optimal, but it does work.

He wanted to change Podman api calls to cli calls and the answer was to build a tarball.  He built a way to create a context from code within the test case .  Build the tarball, set it ups and send it along.  So that removed the hack of doing the echo to the container writing the sleep.

He can spin up a Vault test cluster, issue certs, and drop it into an nginx container.  That spawns a container with the particular info that Vault needs.

He's then able to copy the files that he needs into the containers, so they don't have to build the image each time.  Especially so for certificates.  Guven, they're on containers, they can run in parallel.

He'd like to expose the vault cluster to talk to the test containers.  Future work for Alex.  He's thinking that he may need to use another container to do that communication.


## Podman on Mac Installer Update
### Ashley Cui
#### (42:50 in the video)

We have a packages installer and our building packages on GitHub.  Signed for all of our releases and unsigned for RCs.  So no need for Brew. It's all in GitHub.

## Open Forum/Questions?
#### (44:34 in the video)

 1) Puvi running Jenkin builds daily.  Spins up containers on a cluster.  Trying to move to Podman from Docker due to the Dockershim being deprecated.  They're using the DOcker.socket and want to use Podman, as the socket isn't secure.  They tried rootless, but it's much slower due to the network.  Worked much better in rootful and dropped fuse.

    Luca suggested using a mount point which should help, but you have to watch if concurrent builds are in play.

    Puvi is trying NFS mounts, but in Amazon, he'd have to use AFS, which is slow and costly.

    Luca and Puvi discussed a number of configs to try, and that have been tried.  Work ongoing.


## Topics for Next Meeting

1) NA


## Next Meeting: Tuesday December 6, 2022, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday November 17, 2022, 11:00 a.m. Eastern (UTC-4)

### Meeting End: 11:56 a.m. Eastern (UTC-4)

## BlueJeans Chat copy/paste:
```
Me11:00 AM
https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Me11:06 AM
hack md, please sign in: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w
Mark Russell11:23 AM
This is super cool
alegrey9111:23 AM
Great too!
Lokesh Mandvekar11:29 AM
is it just me hearing choppy audio ?
Mark Russell11:29 AM
seems ok here
Lokesh Mandvekar11:29 AM
ack, thanks
Ashley Cui11:47 AM
https://github.com/containers/podman/releases/tag/v4.2.1
Christian Felder11:49 AM
aarch64 is meant to be used on Apple Silicon M1?
Matt Heon11:51 AM
@Christian Felder Yes
Christian Felder11:57 AM
Thanks!
Alex Scheel - HCP11:57 AM
Thank you!
Mohan Boddu11:58 AM
Thanks!
```
