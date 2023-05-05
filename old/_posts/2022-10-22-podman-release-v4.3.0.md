---
title: Podman v4.3.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v4.3.0

![podman logo](https://podman.io/images/podman.svg)


Podman 4.3.0 is now available! There’s a lot to be excited about, including numerous new features, over 30 bug fixes, and many other improvements. A major focus of 4.3 has been on improving Docker compatibility, including the addition of many missing options and aliases to Podman’s command line to further our efforts to make transitioning to Podman a seamless change. Podman’s integration with Kubernetes has also seen many improvements, including improved integration with systemd and support for automatic updates. Read on for more details and these changes and more!
<!--readmore-->

The Podman team made improved compatibility with Docker a priority for Podman 4.3. We audited Podman’s commands against the Docker command line tool to identify missing and unsupported options and then set to work adding and fixing differences. As part of these, we added a dozen new options to various Podman commands, with many of these being missing aliases for existing options. A new set of commands, `podman context`, have been added for compatibility with `docker context`. These are also aliases (for `podman system connection` commands), and will usually be hidden as they are only required for scripts originally written to use Docker. We have also removed a known incompatibility with Docker in Podman’s volume handling. Docker compatibility remains a focus for Podman, and we will continue our efforts to make migrating to Podman effortless.

Podman’s Kubernetes integration also saw numerous changes, the biggest of which is the creation of the `podman kube` command. Previously, Kubernetes YAML was generated with `podman generate kube` and ran with `podman play kube`, but users found this confusing - it wasn’t immediately obvious from `podman help` that the commands existed. By moving the commands to `podman kube generate` and `podman kube play` and introducing a new command to tear down pods (`podman kube down`), we consolidated all Kubernetes commands in one easy-to-find place. The `podman generate kube`, and `podman play kube` commands will continue to work, but the new `podman kube` commands will be preferred.

Of course, we didn’t stop at just renaming commands. We’ve made a number of further additions to `podman kube play`, most notably improved systemd integration. In Podman 4.2, we added `podman-kube@.service` to allow pods created with `podman kube play` to be managed with systemd. With Podman 4.3, we’ve improved this in two significant ways. First, pods using `podman-kube@.service` can now use sdnotify to verify to systemd that they have started. This laid the groundwork for the following major change: Pods from `podman-kube@.service` now support Podman’s auto-updated mechanism, enabled using an annotation (`io.containers.auto-update`). Furthermore, we made several improvements to `podman kube play`, including support for `emptyDir` volumes, support for user namespaces via `HostUsers`, and support for binary data in ConfigMaps.

These are just a few of the over 30 features and bug fixes included in Podman 4.3.0. Be sure to check out the [release notes](https://github.com/containers/podman/releases/tag/v4.3.0) for more details!


