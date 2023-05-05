---
title: Podman Alpha version 0.8.3 Release Announcement
layout: default
author: bbaude
categories: [releases]
tags: community, open source, podman
---

<img src="https://podman.io/images/podman.svg" alt="podman logo">

# Podman release 0.8.3
Our release this week was very smooth. It seems like between CI infrastructure stability, last minute pull requests, and sometimes just plain bad luck, something always gives us trouble on Friday’s. The Fedora packages are created and I see that they are getting their karma and working through the process already.

By the way, we moved! Our new upstream location is [https://github.com/containers/podman](https://github.com/containers/podman). It seems to be a more natural fit for our project and more closely associates us with some of our sister projects.

<!--readmore-->
Some of the more obvious changes in this release are:

    * Updated documentation to mention that systemd is now the default cgroup manager.
    * The create|run switch of — uts-host now works correctly.
    * Add pod stats as a sub-command. Similar to podman stats, it allows you to see statistics about running pods and their containers.
    * Varlink API endpoints for many of the pod subcommands were added.
    * Support format for the varlink API endpoint Commit (OCI or docker)
    * Fix handling of the container’s hostname when using — host=net
    * When searching multiple registries, do not make an error from one registry be fatal.
    * Create and Pull commands were added to the python client.

Our IRC channel has not moved. Much of the development team can be found on Freenode in #podman. Come by and introduce yourself!
