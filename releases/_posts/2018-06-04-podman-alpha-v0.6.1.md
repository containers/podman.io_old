---
title: Podman Alpha version 0.6.1 Release Announcement
author: bbaude 
date: 2018-06-04 00:00:00 UTC
categories: [releases]
tags: community, open source, podman
comments: false
published: true
---
<img src="../images/podman.png" alt="podman logo">

# Podman release 0.6.1

It seems that when we have a short work week here in the US, we have rather large releases. To me, that flies in the face of logic. Speaking of which, one particular milestone was reached this week …
We had our 1000th commit in Podman!

That is particularly special, because prior to this repository, all libpod work was being done within the CRI-O repository. So the 1000 commits is in actuality since we broke apart from CRI-O. I want to recognize all the contributors who have been helping us along way. Great job!
##Other notable items in the release:

<!--readmore-->
## Improvements to podman Remote API

    * Example usage for the Podman python API
    * Correct issue with varlink container inspect where not all information was being parsed
    * varlink build added to the varlink API
    * Python API now can attach to a container

## Improvements to podman build

    * OnBuild support for podman build

## General Improvements

    * Correctly drop security capabilities when running containers with — user
    * Fix edge case of pulling images with shortnames and no registries defined
    * Lots of changes with the hooks command
    * Make some run options exclusive when using an existing container network namespace
    * Podman ps and images now sorts containers and images by their created time.
