---
title: Podman v3.0.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v3.0.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 3.0 has been released!

This new major release features several exciting new features, including support for [Docker Compose](https://www.redhat.com/sysadmin/podman-docker-compose), improved security around image pulls by short name, improved networking support, and over 100 bug fixes. Podman v3.0 also features numerous improvements to our REST API and the Podman remote client.
<!--readmore-->

The headlining feature of Podman 3.0 is the addition of support for Docker Compose which can now run against the Podman REST API. There are no changes needed as Compose won’t even realize it’s using Podman. Compose is only supported when running Podman as root; we aim to support it with rootless Podman in a future release.

Podman 3.0 also enables [secure short name aliasing](https://www.redhat.com/sysadmin/container-image-short-names) by default, a feature that debuted in experimental form in Podman 2.2. With short name aliasing enabled, every time a user-facing Podman process pulls an image by a short name for the first time (e.g. `podman pull fedora`), it will prompt to ask the user where they want to pull from. This removes several potential ways an attacker could manipulate where an image was pulled from to cause Podman to pull a malicious image.

Podman networking has seen numerous fixes as part of Podman 3.0. We have added a new command, `podman network reload`, which recreates firewall rules for Podman containers. Previously, reloading the system firewall would render all containers running as root unusable until they were restarted; `podman network reload` fixes this. Networks created by `podman network create` also now support labels, and the `podman network ls` command can filter using these labels.

Podman v3.0 includes the latest version of [Buildah](https://buildah.io) along with updates to our other container libraries. Buildah 1.19.2 includes many new features and fixes, including improved support for building multi-platform container images.

Podman v3.0 also includes a fix for CVE-2021-20199. This is a security issue where rootless Podman would rewrite the source address on traffic from published ports to `127.0.0.1`, which could cause an authentication bypass on certain images. We strongly suggest upgrading if you use rootless Podman.

As part of 3.0, Podman has dropped support for the legacy Varlink API, which we deprecated in Podman 2.0. We recommend all users of the Varlink API upgrade to the new REST API.

Dozens of other features, changes, and bug fixes are all included to improve stability, performance, and compatibility. These include numerous additional commands and options as well as API changes and fixes. You can read more [here](https://github.com/containers/podman/releases/tag/v3.0.0).
