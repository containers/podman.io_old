---
title: Podman v1.1.0 Released
layout: default
author: tsweeney
categories: [releases]
tags: community, open source, podman
---

# Podman Release 1.1.0

![podman logo](https://podman.io/images/podman.svg)

## Podman has gone 1.1!

After releasing Podman v1.0 a number of new features were added and several bug fixes
have been added.  Some of the new features include the ability to forward ports as
rootless Podman, adding short options to some of the existing command options,
added `--all-tags` to the the pull command, further changes for
rootless containers and more.  All the details follow!

<!--readmore-->

## Changes

### Features

 * Added --latest and --all flags to podman mount and podman umount
 * Rootless Podman can now forward ports into containers (using the same -p and -P flags as root Podman)
 * Rootless Podman will now pull some configuration options (for example, OCI runtime path) from the default root libpod.conf if they are not explicitly set in the user's own libpod.conf [#2174](https://github.com/containers/podman/issues/2174)
 * Added an alias -f for the --format flag of the podman info and podman version commands
 * Added an alias -s for the --size flag of the podman inspect command
 * Added the podman system info and podman system prune commands
 * Added the podman cp command to copy files between containers and the host [#613](https://github.com/containers/podman/issues/613)
 * Added the --password-stdin flag to podman login
 * Added the --all-tags flag to podman pull
 * The --rm and --detach flags can now be used together with podman run
 * The podman start and podman run commands for containers in pods will now start dependency containers if they are stopped
 * Added the podman system renumber command to handle lock changes
 * The --net=host and --dns flags for podman run and podman create no longer conflict
 * Podman now handles mounting the shared /etc/resolv.conf from network namespaces created by ip netns add when they are passed in via podman run --net=ns:

### Bugfixes

 * Fixed a bug with podman inspect where different information would be returned when the container was running versus when it was stopped
 * Fixed a bug where errors in Go templates passed to podman inspect were silently ignored instead of reported to the user [#2159](https://github.com/containers/podman/issues/2159)
 * Fixed a bug where rootless Podman with --pid=host containers was incorrectly masking paths in /proc
 * Fixed a bug where full errors starting rootless Podman were not reported when a refresh was requested
 * Fixed a bug where Podman would override the config file-specified storage driver with the driver the backing database was created with without warning users
 * Fixed a bug where podman prune would prune all images not in use by a container, as opposed to only untagged images, by default [#2192](https://github.com/containers/podman/issues/2192)
 * Fixed a bug where podman create --quiet and podman run --quiet were not properly suppressing output
 * Fixed a bug where the table keyword in Go template output of podman ps was not working [#2221](https://github.com/containers/podman/issues/2221)
 * Fixed a bug where podman inspect on images pulled by digest would double-print @sha256 in output when printing digests [#2086](https://github.com/containers/podman/issues/2086)
 * Fixed a bug where podman container runlabel will return a non-0 exit code if the label does not exist
 * Fixed a bug where container state was always reset to Created after a reboot [#1703](https://github.com/containers/podman/issues/1703)
 * Fixed a bug where /dev/pts was unconditionally overridden in rootless Podman, which was unnecessary except in very specific cases
 * Fixed a bug where Podman run as root was ignoring some options in /etc/containers/storage.conf [#2217](https://github.com/containers/podman/issues/2217)
 * Fixed a bug where Podman cleanup processes were not being given the proper OCI runtime path if a custom one was specified
 * Fixed a bug where podman images --filter dangling=true would crash if no dangling images were present [#2246](https://github.com/containers/podman/issues/2246)
 * Fixed a bug where podman ps --format {% raw %}"{{.Mounts}}"{% endraw %} would not display a container's mounts [#2238](https://github.com/containers/podman/issues/2238)
 * Fixed a bug where podman pod stats was ignoring Go templates specified by --format [#2258](https://github.com/containers/podman/issues/2258)
 * Fixed a bug where podman generate kube would fail on containers with --user specified [#2304](https://github.com/containers/podman/issues/2304)
 * Fixed a bug where podman images displayed incorrect output for images pulled by digest [#2175](https://github.com/containers/podman/issues/2175)
 * Fixed a bug where podman port and podman ps did not properly display ports if the container joined a network namespace from a pod or another container [#846](https://github.com/containers/podman/issues/846)
 * Fixed a bug where detaching from a container using the detach keys would cause Podman to hang until the container exited
 * Fixed a bug where podman create --rm did not work with podman start --attach
 * Fixed a bug where invalid named volumes specified in podman create and podman run could cause segfaults [#2301](https://github.com/containers/podman/issues/2301)
 * Fixed a bug where the runtime field in libpod.conf was being ignored. runtime is legacy and deprecated, but will continue to be respected for the forseeable future
 * Fixed a bug where podman login would sometimes report it logged in successfully when it did not
 * Fixed a bug where podman pod create would not error on receiving unused CLI argument
 * Fixed a bug where rootless podman run with the --pod argument would fail if the pod was stopped
 * Fixed a bug where podman images did not print a trailing newline when not invoked on a TTY [#2388](https://github.com/containers/podman/issues/2388)
 * Fixed a bug where the --runtime option was sometimes not overriding libpod.conf
 * Fixed a bug where podman pull and podman runlabel would sometimes exit with 0 when they should have exited with an error [#2405](https://github.com/containers/podman/issues/2405)
 * Fixed a bug where rootless podman export -o would fail [#2381](https://github.com/containers/podman/issues/2381)
 * Fixed a bug where read-only volumes would fail in rootless Podman when the volume originated on a filesystem mounted nosuid, nodev, or noexec [#2312](https://github.com/containers/podman/issues/2312)
 * Fixed a bug where some files used by checkpoint and restore received improper SELinux labels [#2334](https://github.com/containers/podman/issues/2334)
 * Fixed a bug where Podman's volume path was not properly changed when containers/storage changed location [#2395](https://github.com/containers/podman/issues/2395)

### Misc

 * Podman migrated to a new, shared memory locking model in this release. As part of this, if you are running Podman with pods or dependency containers (e.g. --net=container:), you should run the podman system renumber command to migrate your containers to the new model - please reference the podman-system-renumber(1) man page for further details
 * Podman migrated to a new command-line parsing library, and the output format of help and usage text has somewhat changed as a result
 * Updated Buildah to v1.7, picking up a number of bugfixes
 * Updated containers/image library to v1.5, picking up a number of bugfixes and performance improvements to pushing images
 * Updated containers/storage library to v1.10, picking up a number of bugfixes
 * Work on the remote Podman client for interacting with Podman remotely over Varlink is progressing steadily, and many image and pod commands are supported
 * Added path masking to mounts with the :z and :Z options, preventing users from accidentally performing an SELinux relabel of their entire home directory
 * The podman container runlabel command will not pull an image if it does not contain the requested label
 * Many commands' usage information now includes examples
 * podman rm can now delete containers in containers/storage, which can be used to resolve some situations where Podman fails to remove a container
 * The podman search command now searches multiple registries in parallel for improved performance
 * The podman build command now defaults --pull-always to true
 * Containers which share a network namespace (for example, when in a pod) will now share /etc/hosts and /etc/resolv.conf between all containers in the pod, causing changes in one container to propogate to all containers sharing their networks
 * The podman rm and podman rmi commands now return 1 (instead of 127) when all specified container or images are missing

As always, please visit our release notes on [GitHub](https://github.com/containers/podman/blob/master/RELEASE_NOTES.md) to see the full changelog.

You can find instructions for installing Podman [here](https://github.com/containers/podman/blob/master/install.md)
