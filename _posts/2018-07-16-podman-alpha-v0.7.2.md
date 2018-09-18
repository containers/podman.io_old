---
title: Podman Alpha version 0.7.2 Release Announcement
layout: default
author: bbaude
categories: [releases]
tags: community, open source, podman
---

![podman logo](../images/podman.svg)

# Podman release 0.7.2
As most weeks are, this was fast and furious. You will see hand fulls of significant features below that have been added to podman this week. All of it is awesome work from the core team and its contributors. There were also two interesting features that users will be interested in: the ability to create a container with multiple networks and the podman remote client.

<!--readmore-->
We have heard from users that they wish to be able to create containers with multiple networks. This can now be done with a combination of CNI configurations and podman. The easiest approach is to take the default podman configuration file `/etc/cni/net.d/87-podman-bridge.conflist` and duplicate it. Within the file, change the:

    * network name
    * bridge device (cni0 -> cni1)
    * subnet

Then run podman like:
```
$ podman run -it --network=podman,podman2 fedora:28 /bin/bash
```
Jhon Honce and I have also been working on a remote client for podman, called pypodman. It is written in Python and allows users to have a podman-like front-end that accesses an actual podman backend on another node. It relies heavily on ssh and we recommend the use of ssh keys to simplify things.

Our vision is this could eventually become useful for those using Macs or Windows as a development environment. Look for more official blogs and write-ups specifically on this.

This is also the release where we start introducing pod concepts. We now have minimal support for pods. Try `podman pod — help` for further information.

# Other significant features include but are not limited to:

    * More unit tests for the varlink python client
    * Correction behavior for podman stats
    * Add — volumes-from to podman run and create
    * Fix a small regression in our opt handling
    * Add a default AppArmor profile
    * Fix path for rootless containers
    * Varlink API fixes in how we start start and attach to containers
    * Podman ps now reports containers as ‘dead’ instead of ‘unknown’
    * Correct behavior in podman rmi on how to handle parent image deletions
    * Logged output now goes to syslog as well as STDERR
    * When pulling an image by SHA1, we now set the name and tag correctly.
    * Better recording of exit codes for container exits
