---
title: Podman v1.9.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.9.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 1.9 has been released!

Podman 1.9.0 has been released, featuring initial support for the new `containers.conf` configuration file, the ability to dynamically allocate user namespaces, and many improvements to the HTTP API.

<!--readmore-->

The `containers.conf` configuration file (documentation [here](https://github.com/containers/common/blob/master/docs/containers.conf.5.md)) is the eventual replacement for our old configuration file, `libpod.conf`. It contains everything that file had, but also a large number of container-specific configuration settings, including the ability to add volume mounts, environment variables, DNS servers, and much more by default in new containers. As support is still in the early stages, we do not presently provide a default `containers.conf`, but expect to find one in future releases! The `containers.conf` file is also shared between Podman and Buildah, and sets defaults for both.

Podman continues to push the boundaries of containers and security.  Podman has a new experimental feature to dynamically allocate user namespaces for containers run as root with the `--userns=auto` flag. This option causes Podman to allocate unique user namespaces for each container it creates, dynamically sized based on the number of UIDs in the image. With this option, it is trivial to run containers in separate user namespaces, greatly improving isolation.

We expect that Podman 1.9.0 will be the last minor release before Podman 2.0. Podman 2.0 will feature a number of major architectural changes to better support the new HTTP API, and will allow Podman to be used locally, as it is today, or remotely, against a Podman HTTP service, with the same executable. More details [here](https://podman.io/blogs/2020/04/16/podman-v2-announce.html).
