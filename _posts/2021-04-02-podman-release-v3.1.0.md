---
title: Podman v3.1.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v3.1.0

![podman logo](https://podman.io/images/podman.svg)

## Podman 3.1 has been released!

The new Podman release includes a number of exciting new features, including the `podman secret` command for managing secrets, support for a volume chown option to fix permissions automatically, improved support for volumes in `podman generate kube`, and over 60 bug fixes, many to the HTTP API. Read on for more details!
<!--readmore-->

Secrets support has been a frequent request for Podman, and 3.1.0 features the first step toward fulfilling it. Secrets add a way to easily add confidential data into containers, by having Podman-managed secret files, which can easily be added to containers. We have added a suite of new commands - `podman secret create`, `podman secret ls`, `podman secret inspect`, and `podman secret rm` - to manage these secrets, and a `--secret` flag to `podman create` and `podman run` to mount secrets into containers. Please note that the initial implementation of secrets does not encrypt secrets at rest - look for this in an upcoming release.

Podman can now automatically change volume ownership to match the user a container is running as. The new `:U` mount option for volumes made with the `-v` flag to `podman create` and `podman run` will chown paths mounted into containers to ensure that the user in the container can access the volume. This is very useful with rootless containers, where the rootless user namespace can make it difficult to tell what user on the container will access a directory.

The `podman generate kube` command can now generate `PersistentVolumeClaim` volumes for Podman named volumes attached to containers. These have been supported in `podman play kube` since v2.2.0, but until now, Podman has not been able to create YAML with these volumes. This important addition restores symmetry between `generate kube` and `play kube`.

This release also includes numerous other changes, features, and fixes. Find out more in the [release notes](https://github.com/containers/podman/releases/tag/v3.1.0).
