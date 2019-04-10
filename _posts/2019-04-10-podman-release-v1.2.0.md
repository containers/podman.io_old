---
title: Podman v1.2.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.2.0

![podman logo](https://podman.io/images/podman.svg)

## Welcome to Podman 1.2.0!

Podman 1.2.0 has been released, featuring many exciting new features and fixes for numerous bugs. With 1.2.0, Podman added support for container healthchecks, an events system, and a way to view image layers as a tree. Over 30 bugs were fixed in this new release, including numerous issues with rootless Podman. We also upgraded the version of Buildah driving `podman build` from v1.7 to v1.7.2, picking up numerous fixes.

<!--readmore-->

Our new Podman release includes support for container healthchecks. Healthchecks provide additional information on container status, running image-defined checks to verify that the application in a container is working properly. Any containers with healthchecks defined will run them automatically, and their status can be checked with `podman inspect`. The `podman healthcheck run` command can also be used to manually trigger a healthcheck.

Podman also added a new command, `podman events`, that can be used to view major lifecycle events for containers, pods, and images as they occur. This command and its corresponding Varlink API can be used by tools which wish to check the overall status of the system, or check when a specific container starts or exits.

The `podman image tree` command was also added. This command will print a tree representation of an image's layers. This can be used to easily identify an image's dependencies.

As always, please visit our release notes on [GitHub](https://github.com/containers/libpod/blob/master/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/libpod/blob/master/install.md)
