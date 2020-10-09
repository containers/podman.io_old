---
title: Podman v2.1.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 2.1.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 2.1 has been released!


Podman v2.1.0 has just been released! This is one of our largest releases ever, and features numerous new features, over 50 bugs fixed, and extensive work on the REST API. Read on for more details!
<!--readmore-->

Our biggest announcement is that rootless Podman now supports inter-container networking. Previously, it was impossible for rootless Podman containers to communicate directly with each other without using pods. Now, by joining rootless containers to a network, they can communicate with other containers in the same network in the same manner as containers running with full root privileges. This is a major improvement to rootless networking, and addresses one of the largest gaps between running Podman with and without root.

We’ve also enabled a number of new features for images. Podman can now mount images (read-only) so their contents can be viewed without creating a container based on the image, using the `podman image mount` command. Additionally, `podman save` and `podman load` can now work with archives containing multiple images, instead of only one at a time. Finally, Podman’s pull logic has been reworked to retry pulling images when a pull fails due to network issues.

The `podman play kube` command has also been a focus of attention. It now handles many additional options from Kubernetes YAML. These include support for new volume types (mounting sockets into your pods and setting volumes as read-only), setting restart policy for pods, adding entries to `/etc/hosts`, and many more. These features are available to anyone using `podman generate kube` as well.

In addition, there are numerous small improvements. Volume mounts can now use the `:O` option to be created as overlay mounts - mounts where changes made by the container will not be propagated back to the host. Podman now supports setting the timezone of containers (using the `--tz` flag). The `podman ps` command now supports a `--storage` option which will display all containers on the system, even those not managed by Podman (e.g. Buildah and CRI-O containers).

