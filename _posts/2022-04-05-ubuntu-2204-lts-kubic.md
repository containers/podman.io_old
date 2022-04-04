---
title: Podman, Buildah and Skopeo on Ubuntu 22.04 LTS
layout: default
author: lsm5
categories: [blogs]
tags: containers, podman, buildah, skopeo, ubuntu, kubic
---


![podman logo](https://podman.io/images/podman.svg)

# Podman, Buildah and Skopeo on Ubuntu 22.04 LTS

[Ubuntu 22.04 LTS Beta](https://releases.ubuntu.com/jammy/) is available for testing as of March 31st.
This is the first LTS release with [Podman](https://packages.ubuntu.com/jammy/podman),
[Buildah](https://packages.ubuntu.com/jammy/buildah) and [Skopeo](https://packages.ubuntu.com/jammy/buildah) in
the default repos, thanks to the amazing work of Reinhard Tartler and team.

The package versions available currently are: Podman 3.4, Buildah 1.23 and Skopeo 1.4.

There won't be any further updates to the Kubic repos as far as Podman, Buildah and Skopeo are concerned,
so users are recommended to use the default repos on 22.04 LTS.

If you're currently using packages from the Kubic repos, it’s highly recommended to uninstall the Kubic
packages prior to upgrading to 22.04 LTS.
