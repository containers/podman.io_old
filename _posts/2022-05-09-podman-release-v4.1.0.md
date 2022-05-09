---
title: Podman v4.1.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v4.1.0

![podman logo](https://podman.io/images/podman.svg)

## Podman v4.1 has been released!

The new Podman v4.1.0 release is now available. This release is all about new features, with some of the most exciting being improved support for running on Mac and Windows, and adding support for Docker Compose v2.0. These are just the beginning, though, as this release also includes the ability to clone containers, significant improvements to checkpointing, and over 25 bug fixes. Read on for more details!

<!--readmore-->

Podman’s support for running on Mac and Windows via `podman machine` has seen a number of major improvements, chief among them support for mounting the host machine’s home directory into the `podman machine` VMs by default. Also, on Windows, you can now refer to arbitrary Windows drive paths in your volume mount expressions. This allows containers run by Podman to use mounts from the host, an often-requested feature. Additionally, we’ve added a `podman machine inspect` command to inspect existing VMs, and support for modifying the CPU, memory, and disk limits of existing VMs using the `podman machine set` command. Support for non-Linux operating systems continues to be one of our main focuses, and we’re committed to improving our user experience here - stay tuned for more details!

Podman v4.1 is also our first release to support Docker Compose v2.2.0 and up. Since our v3.0 release over a year ago, Podman has supported Compose v1, but the rewritten Compose v2 required further work in Podman to support. Please note that it may be necessary to disable the use of the BuildKit API by setting the environment variable `DOCKER_BUILDKIT=0`; we’re looking into improving our Buildkit support in the future, so this is not necessary.

There are numerous other changes and improvements to all parts of Podman packed into this release. We’ve added several new commands, including `podman volume mount` and `podman volume unmount` (to allow easy copying of files to and from volumes without using them in a container) and `podman container clone` (creates a copy of an existing container, with the ability to change many settings while doing so). Checkpoint and restore have seen a major improvement with the ability to store checkpoints as OCI images, allowing them to be distributed via container registries. Finally, Podman has gone on a diet - we set out to reduce or eliminate many of our dependencies and managed to reduce our binary size by 8MB shaving off 15% of the original binary size. There are many more changes - too many to list all of them here - so be sure to check out the [release notes](https://github.com/containers/podman/releases/tag/v4.1.0)!
