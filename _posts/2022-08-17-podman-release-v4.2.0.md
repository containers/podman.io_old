---
title: Podman v4.2.0 Released
layout: default
author: mheon
categories: [releases]
tags: community, open source, podman, hpc, kubernetes
---

# Podman Release v4.2.0

![podman logo](https://podman.io/images/podman.svg)


## Podman v4.2.0 has been released!

Podman 4.2.0, our latest release, is now available. Featuring dozens of new features, including support for the GitLab Runner, significant improvements to `podman play kube`, and pods in general. We’ve also been working on running Podman on Mac and Windows, with a number of major bug fixes and several new features for `podman machine` landing. We are also happy to announce an early release of Podman Desktop, a GUI tool for Podman. Read on for more details!

<!--readmore-->

Our new release now supports being used with the GitLab Runner as part of GitLab CI platforms, using the Docker executor. This has been the culmination of months of effort, and required squashing a number of bugs in our REST API. GitLab Runner has been a much-requested feature, and we’re eager to see what users do with it!

As part of the 4.2.0 release, we have made many changes to both Podman pods and the `podman play kube` command. Pods now have early support for resource limits, allowing CPU and memory use for a pod to be limited. All containers in the pod will share this limit but can still set their own limits. Pods can also be cloned now via the new `podman pod clone` command. Support for YAML in `play kube` has also been improved, with additional support for security context settings and the ability to use `BlockDevice` and `CharDevice` volumes.

Systemd integration with `podman play kube` has been introduced. Pods launched by `podman play kube` can be managed by systemd, using the new `podman-kube@.service` service - e.g. `systemctl --user start podman-play-kube@$(systemd-escape my.yaml).service` will run the `my.yaml` file managed by systemd.

Several other features and changes also landed in Podman v4.2.0. Early support for Sigstore signatures is now available in `podman push` and `podman manifest push` - expect more in this area in the future as we further integrate Sigstore and Podman. Podman networks can now be isolated (preventing traffic from being sent to other Podman-managed networks) with the `--opt isolate=` option to `podman network create`.

These are just a few of the 40 new features and 50 bug fixes included in Podman 4.2.0. Be sure to check out the [release notes](https://github.com/containers/podman/releases/tag/v4.2.0) for more details!

Along with the release of Podman 4.2.0, a new version of Podman Desktop is available. If you are not yet aware of [Podman Desktop](https://podman-desktop.io/), it’s a new project under the container organization to help developers work with containers in their local environment with a desktop UI. Podman Desktop is still in its early days. Still, it already provides capabilities to list your images, interact with containers (access logs, get a terminal), connect to registries (pull private images, push your images) and configure podman settings (proxies).
An early adopter program has also been set up. Feel free to [sign up](https://forms.gle/ow73dV7Ce3YLzoXH7) if you are interested in testing Podman Desktop, providing feedback, and speaking about your ideas, experiences, and pain points! If you are interested in contributing to the tool, your help would also be appreciated. Feel free to investigate the project’s [Github](https://github.com/containers/podman-desktop).
