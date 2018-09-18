---
title: Podman Alpha version 0.6.4 Release Announcement
layout: default
author: bbaude
categories: [releases]
tags: community, open source, podman
---

<img src="https://podman.io/images/podman.svg" alt="podman logo">

# Podman release 0.6.4
This afternoon we were able to overcome some last minute bugs and release a new Podman. The packages are building in Fedora and will work their way through Fedora’s bodhi system. For giggles, I looked at the number of individual contributors this week and was glad to see the number at 10.

Mainly bugfixes this week, one big one was that we do a better job cleaning up containers that run in the back ground.
<!--readmore-->

**podman container cleanup** was added to cleanup mountpoint, cgroups and network configuration when containers exit. When a container is run in background mode (-d), the podman command exits, but **conmon** continues to run and monitor the container, when the container exits, conmon executes podman container cleanup to cleanup the container.

There were a number of bug fixes and a lot of vendoring new code — Golang speak for updating the code we depend on from other projects. Interesting things are in store for podman in the upcoming weeks. Stay tuned!

I missed writing this blog the last couple of weeks, and wanted to point out a huge new feature from the **buildah project**. **podman build** now supports layering. As you may know podman build by default only adds one layer when processing a Dockerfile. This is different the **docker build**. Docker defaults to layering each line in the Dockerfile, which makes the creation of an application easier, since docker build jumps to the first line changed in the Dockerfile since the privious build. Podman build on the other hand starts at the beginning, which works better in using a Dockerfile in a build system. With the introducion of the — layers flag, you can now get the same behaviour in podman build that you have in docker build, incremental changes to the Dockerfile will start the build at the change point rather then in the begining. There is even a environment variable BUILDAH_LAYERS which can be set to default to the layers method.

## Notable features include:

    * Continued work on podman remote client. A mock up of a podman remote client went into the contrib/ section of our repository. This is not ready for anyone but Jhon Honce as the primary contributor to the python library code.
    * Continued work on running podman without requiring you to be root. Guiseppe Scrivano made a bunch of commits related to rootless containers.
    * added podman-image and podman-container man page links
    * fixed a fatal error where when a container disappeared during podman ps.
    * added an authfile option to podman search to deal with private registries.
    * fixed a bug related to container startup and attached mode.
    * building podman with varlink support is now optionional.
