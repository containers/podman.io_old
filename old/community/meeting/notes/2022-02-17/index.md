# Podman Community Cabal Meeting Notes

Attendees: Tom Sweeney, Aditya Rajan, Matt Heon, Brent Baude, Ashley Cui, Chris Evich, Urvashi Mohnani, Giuseppe Scrivano, Nalin Dahyabhai, Paul Holzinger, Anders Björklund, Dan Walsh, Valentin Rothberg, Jhon Honce, Miloslav Trmač, Charlie Doern, Lokesh Mandvekar, Oleg Bulatov, Flavian Missi, Niall Crowe, F. Poirotte,

## February 17, 2022 Topics
1. Meta package for manpages, config files - Valentin Rothberg

### Meeting Notes
Video [Recording](https://youtu.be/ysFO1s7h-YE)

The meeting started at 11:02 a.m. Thursday, February 17, 2022

### Meta package for manpages, config files - (0:50 in video) - Valentin Rothberg

[Issue discussed](https://github.com/containers/common/issues/925)

The [https://github.com/containers/common](https://github.com/containers/common) project is used for man pages, config files, and common files.  Used by containers/storage, containers/image, containers/buildah, containers/podman.  The containers/common package is pushed out in the containers-common package.

First issue:  Hard for downstream packagers to know what and when to package.  The common package should only ship with Podman, but it's not transparent to downstream packagers.  For them, it's hard to know when to ship, especially since there are four projects of note: c/storage, c/image, c/common, c/crun.

Second issue: We have a high frequency of releases.  I.e., recently 5 RC's of Podman.  Which caused a lot of churn and problems for an arch-linux packager.  The issue is [here](https://github.com/containers/common/issues/925).

Dan wonders if there's a way to add links to GitHub repos to tie them together.   Valentin doesn't think there's a way to do this via GitHub, but possibly via Git itself, and he thinks it might be hairy.

Chris Evich mentioned [git-subtree](https://blog.developer.atlassian.com/the-power-of-git-subtree/?_ga=2-71978451-1385799339-1568044055-1068396449-1567112770)

The problem remains if there's a Buildah or Podman that can use a particular version of the files in containers-common.  It would be nice to have a packager grab version X of Podman, and that would then get all of the associated packages at the right versions.

Miloslav Trmac suggested adding something to Podman update/create the containers-common package when Podman creates its package.  This would require some Makefile work.

Chris thinks there's an option in GitHub to create a tarball, but others pointed out it's only suitable for files in the physical repository.

Currently, we're grabbing things from the main branch, but we should grab from what is listed in the go.mod file.  

Dan thinks putting Fedora's script into Podman and then working that back into the Fedora release cycles.  It won't fix the issue but will at least make it obvious.

This is something that needs to happen for Buildah and Podman.  We don't need to worry about CRI-O as they have a different setup and config files.

Dan and Lokesh will work together to try and make some progress in this space.  This will mean moving update.sh, which will be renamed, into Podman.

Another concern has been the number of release candidates we had for Podman v4.0 (5 RC's).  This has worked well for the development team but has caused packagers massive headaches.

Ideally, it would be nice if we could create a containers bundle.  Lokesh has an upcoming blog that will talk about this too.

Tom would like to make sure we can do an RC release as it helped QE.  Valentin pointed out the issue lies in that we're moving along RCs for Podman, but also point releases, rather than RCs for Buildah, Skopeo, etc., which is where the churn is.


#### Open discussion (25:30 in video)

1.  4.0 close to releasing.  We are waiting on one last set of tests to finish successfully.  Lokesh is working on documentation for netavark and aardvark-dns.

The network stack will remain on CNI if Podman already exists on a system that Podman v4.0 is installed/upgraded on.  If the host has no Podman presence, they will run with the new netavark stack.

The `podman system reset --force` command should be used if moving up to Podman 4.0 with a host that used Podman v3.0 in the past.

Podman v4.0 will not be in Fedora 35 as it's a breaking change but will be available with Fedora 36.  On Fedora 35, you will be able to update from [Copr](https://copr.fedorainfracloud.org/coprs/rhcontainerbot/podman4/) if you decide to.

Looking at a week delay until the Mac and Windows versions are available.  

A discussion was had on how to handle a downgrade.  Most likely, containers and images would have to be removed.

2. Podman desktop update (38:37 in the video)
Dan noted that we're working with the developer on that.  Potentially will merge CRC with the desktop.  Meetings are coming up next week.  Podman Desktop will not be released as part of Podman v4.0.  Likely to be synchronized in the Fedora 36 release.  The desktop the team is working on in Red Hat is Mac only via a Brew install on the side.  This will pull in qemu as well.

Anders noted that qemu (from brew) has a lot of architectures within it, but that's making it close to a Gigabyte in size.

Virtio-fs has been re-written in rust and can now be run on a Mac.  There are two virtio-fs daemons, one in C, the other in Rust.  The C version will be going away over time.  Looking at Podman 4.2 or 4.3


### Next Meeting: Thursday March 17, 2022 11:00 a.m. EDT (UTC-5)

### Possible Topics:
1.

Meeting finished 11:49

Raw Meeting Chat:

```
You11:00 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
You11:02 AM
https://hackmd.io/gQCfskDuRLm7iOsWgH2yrg?both
Valentin Rothberg11:03 AM
https://github.com/containers/common/issues/925
Valentin Rothberg11:10 AM
https://git-scm.com/docs/git-submodule
Christopher Evich11:11 AM
This seems to be the "new" way:
Giuseppe Scrivano11:11 AM
crun is using submodules to track changes to libocispec, and libocispec uses submodules for tracking runtime-spec and image-spec
Christopher Evich11:11 AM
https://blog.developer.atlassian.com/the-power-of-git-subtree/?_ga=2-71978451-1385799339-1568044055-1068396449-1567112770
(git subtree)
Anders F Björklund11:14 AM
wouldn't this use versions ? (tags)
or is packages building from git these days ?
Lokesh Mandvekar11:15 AM
usually from tags, but sometimes from git commits
Anders F Björklund11:16 AM
but still tarballs, rather than git clones
Lokesh Mandvekar11:16 AM
yup, fedora buildsys doesn't allow network access
Lokesh Mandvekar11:32 AM
`rhcontainerbot/podman4`
https://copr.fedorainfracloud.org/coprs/rhcontainerbot/podman4/
Lokesh Mandvekar11:34 AM
Fedora 35 and CentOS 9 Stream users should prefer that if they want the latest podman releases (will include RCs)
Anders F Björklund11:36 AM
yup, fedora-coreos-35.20220216.dev.0-qemu.x86_64.qcow2.xz has a "dev" in it
Anders F Björklund11:39 AM
and it does have 4.0.0-rc5 in it
ieq-pxhy-jbh
```
