---
title: Podman v1.0.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.0.0

![podman logo](https://podman.io/images/podman.svg)

## Podman has gone 1.0!

Our original goal with Podman was to provide a fully-featured debugging experience for [CRI-O](https://github.com/kubernetes-sigs/cri-o), but it has become so much more. Podman 1.0.0 is a fully-featured container engine.  It provides a Docker-compatible command line to ease the transition from other container engines. Most Podman commands can be run as a regular user, without requiring additional privileges. Furthermore, all of this is accomplished without a daemon!

<!--readmore-->

Podman made its first public release, v0.2, a little less than a year ago. We've come a long way since then, adding new features like:

  * Rootless containers
  * Support for pods
  * Interacting with Kubernetes pod YAML
  * A Varlink API for interacting with Podman on remote machines

We've kept our eyes firmly on stability, fixing over 150 bugs. We’ve also worked on performance, making sure all common operations are optimized. While it is an iterative process, we are pleased with where we stand today. With that, we're excited to announce that Podman is ready for prime time, and it is ready for you.

A key focus of Podman is around security.  In addition to support for rootless containers, we’ve added many other security features.  Great support for [User Namespaces](https://opensource.com/article/18/12/podman-and-user-namespaces) has resulted in better container separation. The `podman top` command will tell you what security features are enabled for processes within containers. Podman’s daemonless fork/exec model preserves audit information on containers.

This is just the beginning, and we have plans for much more. For example, numerous improvements are planned for rootless Podman, pod support, the Varlink API, and automatic user namespace separation. If you find a feature missing from Podman, feel free to open an enhancement request on our [Github](https://github.com/containers/podman/issues).  We love your feedback, and many of our best ideas come from users and contributors.

Finally, the Podman team would like to thank all our contributors. Everyone who submitted code, improved documentation, or reported bugs has been a great help.

## Changes
A few of the biggest changes from Podman 1.0.0 include:

  * Added the `podman play kube` command, which creates Podman pods based on Kubernetes pod YAML.
  * The `podman run` and `podman create` commands now support the `--init` flag, to run a minimal init process in the container.
  * Added the `podman image sign` command to sign container images.
  * Image pulls are now parallelized for increased speed

As always, please visit our release notes on [GitHub](https://github.com/containers/podman/blob/master/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/podman/blob/master/install.md)
