---
title: Podman v1.1.1 Released
layout: default
author: tsweeney
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.1.1

![podman logo](https://podman.io/images/podman.svg)

## Podman has gone 1.1.1!

After releasing Podman v1.1.0 a number of miscellaneous changes and several bug fixes
focusing on command line options and parsing were added.                             
All the details follow!

<!--readmore-->

## Changes

### Bugfixes

 * Fixed a bug where podman container restore was erroneously available as podman restore [#2191](https://github.com/containers/libpod/issues/2191)
 * Fixed a bug where the volume_path option in libpod.conf was not being respected
 * Fixed a bug where Podman failed to build when the varlink tag was not present [#2459](https://github.com/containers/libpod/issues/2459)
 * Fixed a bug where the podman image load command was listed twice in help text
 * Fixed a bug where the podman image sign command was also listed as podman sign
 * Fixed a bug where the podman image list command incorrectly had an image alias
 * Fixed a bug where the podman images command incorrectly had ls and list aliases
 * Fixed a bug where the podman image rm command was being displayed as podman image rmi
 * Fixed a bug where the podman create command would attempt to parse arguments meant for the container
 * Fixed a bug where the combination of FIPS mode and user namespaces resulted in permissions errors
 * Fixed a bug where the --time alias for --timeout for the podman restart and podman stop commands did not function
 * Fixed a bug where the default stop timeout for newly-created containers was being set to 0 seconds (resulting in an immediate SIGKILL on running podman stop)
 * Fixed a bug where the output format of podman port was incorrect, printing full container ID instead of truncated ID
 * Fixed a bug where the podman container list command did not exist
 * Fixed a bug where podman build could not build a container from images tagged locally that did not exist in a registry [#2469](https://github.com/containers/libpod/issues/2469)
 * Fixed a bug where some Podman commands that accept no arguments would not error when provided arguments
 * Fixed a bug where podman play kube could not handle cases where a pod and a container shared a name

### Misc

 * Usage text for many commands was greatly improved
 * Major cleanups were made to Podman manpages, ensuring that command lists are accurate
 * Greatly improved debugging output when the newuidmap and newgidmap binaries fail when using rootless Podman
 * The -s alias for the global --storage-driver option has been removed
 * The podman container refresh command has been deprecated, as its intended use case is no longer relevant. The command has been hidden and manpages deleted. It will be removed in a future release
 * The podman container runlabel command will now pull images not available locally even without the --pull option. The --pull option has been deprecated
 * The podman container checkpoint and podman container restore commands are now only available on OCI runtimes where they are supported (e.g. runc)

As always, please visit our release notes on [GitHub](https://github.com/containers/libpod/blob/master/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/libpod/blob/master/install.md)
