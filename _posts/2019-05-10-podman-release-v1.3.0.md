---
title: Podman v1.3.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.3.0

![podman logo](https://podman.io/images/podman.svg)

## Welcome to Podman 1.3.0!

Podman 1.3.0 has been released! We've focused firmly on stability with 1.3.0, fixing over 25 bugs and making major changes to improve the stability of rootless Podman and Podman volumes. This release also includes a number of new features, including the `podman generate systemd` command to generate unit files to manage Podman containers, and the `--restart` flag for `podman run` and `podman create` to restart containers on error. We also picked up a fresh version of Buildah, 1.8.2, including numerous fixes and improvements for `podman build`.

<!--readmore-->

The biggest new features in Podman 1.3.0 are for managing container restart. The `--restart` flag allows Podman to restart containers when they exit, and the `podman generate systemd` command makes unit files so you can leverage systemd to manage container lifecycle. These commands seem very similar, but are very different in practice. The `--restart` flag is much simpler, but more limited - it restarts containers when they exit, but cannot deal with a system restart or dependencies between containers. If you need access to these more advanced features, `podman generate systemd` will allow you to manage your containers via Systemd, leveraging all of its service management capabilities.

As always, please visit our release notes on [GitHub](https://github.com/containers/podman/blob/master/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/podman/blob/master/install.md)
