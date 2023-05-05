---
title: Podman v1.7.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.7.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 1.7 has been released!

Podman v1.7.0 has been released, including many new features and numerous bugfixes. It features improvements to networking, `podman play kube`, and systemd unit file integration. We’ve also added the `podman system reset` command, to remove all existing containers, pods, images, and volumes and reset the system to its initial state. Stability has not been neglected, and this release features almost 60 bugfixes, including major fixes for `podman rm`, `podman exec`, and volumes.

<!--readmore-->

This new release features improved support for host networking via the CNI `macvlan` plugin which allows containers to connect directly to networks the host is connected to. The `podman network create` command can now create `macvlan` configs via the `--macvlan` flag. Containers can also set static MAC addresses. The `podman play kube` command has also been updated to respect security settings, including user/group, SELinux configuration, and Seccomp profiles. Podman now creates a cgroup namespace by default on systems using cgroups v2, improving container isolation. We’ve made major improvements for running Podman in a systemd service. These changes (and how to use them) are detailed elsewhere in a [blog](https://www.redhat.com/sysadmin/podman-shareable-systemd-services).

As always, please visit our page on [GitHub](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/podman/blob/main/install.md).
