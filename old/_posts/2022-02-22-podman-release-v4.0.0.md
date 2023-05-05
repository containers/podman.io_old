---
title: Podman v4.0.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v4.0.0

![podman logo](https://podman.io/images/podman.svg)

## Podman v4.0 has been released!

Podman v4.0.0, a brand-new major release, is now available. Podman 4.0 is one of our most significant releases ever, featuring over 60 new features. Headlining this release is a complete rewrite of the network stack for improved functionality and performance, but there are numerous other changes, including improvements to Podman’s Mac and Windows support, improvements to pods, over 50 bug fixes, and much, much more!

<!--readmore-->

Podman now features support for a new network stack based on [Netavark](https://github.com/containers/netavark) and [Aardvark](https://github.com/containers/aardvark-dns), in addition to the existing CNI stack. The new stack features improved support for containers in multiple networks, improved IPv6 support, and improved performance. To ensure that we don’t break existing users, the old CNI stack will remain the default on existing installations, while new installs will use Netavark. We’re planning an in-depth dive into the networking changes in a future blog, so look forward to more details there!

Support for Podman on Windows and OS X has also been a top priority, and we have made several major improvements for Podman 4.0. Chief among them is support for mounting the Podman API socket on the host system, allowing tools like Docker Compose to be used on the host system instead of inside the `podman machine` VM. Also, `podman machine` can now use WSL2 as a backend on Windows, greatly improving Podman’s support for Windows. More features, including support for volume mounts from the host, are planned for Podman v4.1, so stay tuned for more updates.

Podman Pods have seen numerous new features added to allow sharing resources between containers in the pod. The `--volume` and `--device` options to the `podman pod create` command allows volumes and devices to be mounted to every container in the pod, and the `--security-opt` and `--sysctl` options allow these configurations to be set for every container in the pod. Again, these changes are just the beginning of what we have planned - eventually, we aim to have almost every option from `podman run` available to pods to allow easy sharing of configuration options among containers within them.

These changes are just the tip of the iceberg - there’s far more packed into this release, including major updates to checkpoint and restore, improvements to `podman generate systemd` and `podman play kube`, and so much more. Find out more in the [release notes](https://github.com/containers/podman/releases/tag/v4.0.0).
