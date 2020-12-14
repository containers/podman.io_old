---
title: Podman v2.2.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release 2.2.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 2.2 has been released!

Podman v2.2.0 has been released! Featuring numerous new features and over 80 bugfixes, the new Podman offers a number of often-requested features and improved stability. Read on for more details!
<!--readmore-->

Some of our most exciting new features include support for network aliases and the `network connect` and `network disconnect` commands. Network aliases are additional names that containers can be accessed through when using DNS.  The `network connect` and `network disconnect` commands allow running containers to be added to and removed from networks. These have been frequent requests from users, and significantly improve our compatibility with Docker in networking.

Podman 2.2 also comes with initial support for short name aliasing. This feature, explained more fully [here](https://www.redhat.com/sysadmin/container-image-short-names), enhances the security of short names in the `podman pull` and `podman run` commands (e.g. `podman pull ubi8`) by ensuring that that the image we pull is actually the image the user wanted. This feature is purely opt-in for now but will be enabled by default in Podman 3.0.

The `podman generate kube` and `podman play kube` commands also saw numerous improvements, most of which were provided by the community. Both `generate kube` and `play kube` now support resource limits for containers. We’ve also gained support for Kubernetes’ persistent volume claims and configmaps in `podman play kube`. We now offer increased control over the containers created by `play kube` as well, with a `--start` option (defaulting to true) controlling whether they are started immediately after being created, and the ability to set what log driver they use to improve the ability of `podman play kube` to integrate with systemd unit files.

We’ve also added several other improvements. The `--mount` option to `podman create` and `podman run` can now mount a container image into a container using the `type=image` argument. Additionally, the `podman inspect` command now works with more objects (networks, pods, and volumes) instead of just containers and images. Finally, more Podman commands (`podman mount`, `podman diff`, `podman container exists`) can now work with Buildah and CRI-O containers, in addition to Podman containers.

Numerous bug fixes to APIV2 to better support docker-compose and docker-py.
