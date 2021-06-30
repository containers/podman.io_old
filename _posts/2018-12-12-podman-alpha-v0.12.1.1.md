---
title: Podman v0.12.1.1 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

![podman logo](https://podman.io/images/podman.svg)

# Podman Release 0.12.1.1

We're happy to announce the availability of Podman 0.12.1.1, our latest version. We've been very busy over the last month, and it shows! We've merged over 150 new commits since our 0.11 releases, including major new functionality and several critical bugfixes. Pods, Kubernetes compatibility, and container volumes all saw major improvements.

We hope everyone enjoys the release, and stays with us in the future as Podman gets closer to 1.0. As always, many thanks to everyone who contributed to this release!

<!--readmore-->
## Changes
This release comes with many exciting new features. To highlight a few of our biggest changes:

  * The `podman generate kube` command was added by Brent Baude, which generates Kubernetes pod and service YAML from Podman containers and pods.
  * Initial support for named volumes using the `podman volume` set of commands was landed by Urvashi Mohnani
  * The `podman rm` and `podman rmi` commands can now prune unused containers and images with the `--prune` flag
  * Ports can now be published to the host from pods

Numerous bugs were fixed as well, including a breaking change in rootless Podman found in 0.11.x releases.

To see the full changelog, please visit our release notes on [GitHub](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md)

Some of this work, like the `podman volume` command, is still very early. We'd greatly appreciate feedback! If you have an enhancement request or a bug report, please file them on our [issue page](https://github.com/containers/podman/issues).
