---
title: Podman Alpha version 0.7.1 Release Announcement
author: bbaude 
date: 2018-07-09 00:00:00 UTC
categories: [releases]
tags: community, open source, podman
comments: false
published: true
---
<img src="../images/podman.png" alt="podman logo">

# Podman release 0.7.1
Last week was a busy holiday week here in the United States, but we still managed a nice release full of interesting merges.

Many of the significant merges are going to be less than noticeable to users. A lot of updated vendor code was added as well as the removal of unused functions due to cgroups and platform changes.

<!--readmore-->
Speaking of platform changes, one thing I have been working on the last few weeks is to cross-compile for Darwin from Linux. This was really our first need to deal with other platforms and was rather invasive at times. It took several merges over the last few weeks to complete but we have are able to *build* a Darwin binary. I must emphasize *build* because the binary is known to not run — as there is a lengthy list of things that would need to be fixed or implemented first. Nevertheless, my goal here was to implement a CI test that would always perform the build so we can protect against subsequent regressions for Darwin should someone decide to work on that platform.

## Other significant changes include:

    * several changes to the makefile to make it more effecient
    * fix parsing of short options by vendoring in a new urfave/cli
    * tutorial fixes
    * revert back to a shared cgroup for conmon processes
    * remove buildah requirement for the libpod image library
    * block use of /proc/acpi from inside containers
    * factor pkg/ctime into a separate package
