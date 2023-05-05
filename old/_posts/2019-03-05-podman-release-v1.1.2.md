---
title: Podman v1.1.2 Released
layout: default
author: tsweeney
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.1.2

![podman logo](https://podman.io/images/podman.svg)

## Podman has gone 1.1.2!

After releasing Podman v1.1.1 a number of bug fixes
focusing on command line options and parsing were added. 
All the details follow!

<!--readmore-->

## Changes

### Bugfixes

 * Fixed a bug where the podman image list, podman image rm, and podman container list had broken global storage options
 * Fixed a bug where the --label option to podman create and podman run was missing the -l alias
 * Fixed a bug where running Podman with the --config flag would not set an appropriate default value for tmp_dir [#2408](https://github.com/containers/podman/issues/2408)
 * Fixed a bug where the podman logs command with the --timestamps flag produced unreadable output [#2500](https://github.com/containers/podman/issues/2500)
 * Fixed a bug where the podman cp command would automatically extract .tar files copied into the container [#2509](https://github.com/containers/podman/issues/2509)

### Misc

 * The podman container stop command is now usable with the Podman remote client

As always, please visit our release notes on [GitHub](https://github.com/containers/podman/blob/main/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/podman/blob/main/install.md)
