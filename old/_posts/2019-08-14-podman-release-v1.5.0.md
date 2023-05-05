---
title: Podman v1.5.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.5.0

![podman logo](https://podman.io/images/podman.svg)

## Podman has gone 1.5!

Podman 1.5.0 has been released! We’ve made major improvements to `podman exec`, `podman generate kube`, and rootless containers in this release. Stability has also been a focus, and we’ve fixed over 30 bugs and several performance issues. The new 1.5.0 release is available for Fedora and Ubuntu right now!

<!--readmore-->

With this new release, Podman has picked up a number of improvements to core container functionality. The `podman exec` command has been completely reworked, including improved handling for attaching to containers. Expect to see more work on `exec` in future releases. CGroups have also seen major work, with support for CGroup namespaces via the `--cgroupns` flag to `podman create` and `podman run`, and support for CGroups v2 when using the `crun` OCI runtime - more details [here](https://www.scrivano.org/2019/05/12/rootless-resources-management-with-podman-on-fedora-30/). The `podman generate kube` command has also been improved and now includes volumes mounted into containers. Finally, we’ve addressed several memory leaks and other performance issues, and Podman should be much more responsive on systems under high load.

Rootless containers have also been improved, featuring improved handling for privileged containers and the ability to use container health checks. Podman now has experimental support for running rootless containers with a single UID and GID using the new `ignore_chown_errors` storage option. This allows Podman to be run without the `newuidmap` and `newgidmap` binaries, and removes the need for any elevated privileges to start rootless containers. This approach is more limited (but more secure) than normal rootless containers.

As always, please visit our release notes on [GitHub](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/podman/blob/main/install.md).
