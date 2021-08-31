---
title: Podman v3.3.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v3.3.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 3.3 has been released!

A new Podman release is available, featuring a number of exciting new features, including improved support for running Podman on OS X, support for restarting containers after a system restart, improved support for checkpointing and restoring containers, and 60 bug fixes and stability improvements. Read on for more details!

<!--readmore-->

Podman’s support for running on non-Linux operating systems via the `podman machine` command continues to improve in v3.3.0. When containers are run inside a virtual machine created by `podman machine`, port forwarding from the host to the container is now supported - that is, a container that forwards port 8080 on the host to port 80 in the container will now be accessible not just from port 8080 in the Podman-managed virtual machine, but also from port 8080 on the host system. Stability also continues to improve, with many fixes being made to both `podman machine` itself and the remote Podman client.

Podman now supports restarting containers created with the `--restart` option after the system is rebooted. Containers created with `--restart=always` can be automatically started when the system boots if the `podman-restart.service` systemd unit is enabled. Our main focus continues to be on managing containers directly with systemd via `podman generate systemd`, which has always allowed containers to be automatically started after boot and provides greater flexibility than the `--restart` option, but the addition of `podman-restart.service` will be useful for those seeking improved compatibility with Docker. The `podman generate systemd` command also saw several improvements, and will not default to using SDNotify instead of PID files, producing smaller and easier-to-understand unit files.

Support for checkpoint and restoring containers has seen several new additions, most notably the ability to checkpoint and restore containers that are part of pods. Additionally, when restoring containers, you can now alter what ports the container publishes via the `--publish` option. Together, these greatly increase the flexibility of checkpoint and restore.

This release also includes numerous other changes, features, and fixes. Find out more in the [release notes](https://github.com/containers/podman/releases/tag/v3.3.0).
