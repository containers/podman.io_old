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

Our new Podman release includes support for container healthchecks. Healthchecks provide additional information on container status, running checks defined by the image or user to verify that the application in a container is working properly. Any containers with healthchecks defined will run them automatically, and their status can be checked with `podman inspect`. The `podman healthcheck run` command can also be used to manually trigger a healthcheck.

Podman also added a new command, `podman events`, that can be used to view major lifecycle events for containers, pods, and images as they occur. This command and its corresponding Varlink API can be used by tools which wish to check the overall status of the system, or check when a specific container starts or exits. A few example events are shown below:
```
2019-04-11 15:49:45.490227772 -0400 EDT container attach 0765d56e25939f66aed5817dd10c5cbc69f177b2b4ef94ec302b8b67475e0a1a (image=quay.io/crio/alpine:latest, name=optimistic_franklin)
2019-04-11 15:49:45.58978211 -0400 EDT container start 0765d56e25939f66aed5817dd10c5cbc69f177b2b4ef94ec302b8b67475e0a1a (image=quay.io/crio/alpine:latest, name=optimistic_franklin)
2019-04-11 15:49:45.590526456 -0400 EDT container died 0765d56e25939f66aed5817dd10c5cbc69f177b2b4ef94ec302b8b67475e0a1a (image=quay.io/crio/alpine:latest, name=optimistic_franklin)
2019-04-11 15:49:46.363842802 -0400 EDT container remove 0765d56e25939f66aed5817dd10c5cbc69f177b2b4ef94ec302b8b67475e0a1a (image=quay.io/crio/alpine:latest, name=optimistic_franklin)
```

The `podman image tree` command was also added. This command will print a tree representation of an image's layers. This can be used to easily identify an image's dependencies. An example with a simple multilayer image is shown below:
```
Image ID: 4a3e4f2db0ac
Tags:	 [localhost/buildah-ctr:latest localhost/myimage:latest]
Size:	 598.1MB
Image Layers
├──  ID: a13f3c019d29 Size: 274.9MB
├──  ID: 6ae7c90cc44a Size: 323.2MB
└──  ID: 610298fe2990 Size: 1.024kB Top Layer of: [localhost/buildah-ctr:latest localhost/myimage:latest]
```

As always, please visit our release notes on [GitHub](https://github.com/containers/libpod/blob/master/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/libpod/blob/master/install.md)
