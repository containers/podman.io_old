---
title: Podman remote clients for macOS and Windows 
layout: default
author: baude
categories: [blogs]
tags: containers, podman, networking, pod, api, kubernetes, kube, v2, hpc, windows, mac
---
![podman logo](https://podman.io/images/podman.svg)

# Podman on Macs Update 
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

The Podman team values the local development experience, and we think containers are a crucial part of that. We’ve been brainstorming, discussing, and testing solutions to bring a great Podman experience to Mac and Windows. We are constantly looking for ways to improve it. In particular, the latest release of Podman has support for Intel Macs. We have been hearing good feedback for a few weeks now, but up until this point, we haven’t published a lot of documentation.

<!--readmore-->

Recently, we have been getting an influx of questions about Podman and Podman desktop, specifically around Macs. Coincidentally, we have a really elegant solution which we’d like to introduce. In the recently released Podman-3.3.1, we now have support for Intel-based Macs. It is command-line driven and can be installed through brew (aka [Homebrew](https://brew.sh/)).

### User Experience on macOS
The user-experience is quite simple:

  1. Install brew (as it is described on their [homepage](https://brew.sh/))
  2. Install podman from brew:  `brew install podman`
  3. Initialize a podman machine: `podman machine init`
  4. Start the machine: `podman machine start`
  5. Use podman as you normally would.


It is worth running `podman machine --help` to familiarize yourself with the other commands used to manage machines.

Please note that Podman machine is still under development.  While we support port forwarding on Macs and Linux, we have not implemented a solution for file sharing and bind mounts.  We are currently researching the various technologies to do so as we want to choose a performant approach.

Podman machine is currently only supported on Linux and Intel Macs. As for the new Macs that are based on Apple Silicon, we are now waiting for two things.  First, we need some patches from upstream qemu to get merged and released. While we wait for the upstream patches, we are working on a possible work-around for qemu. If that is successful, we will re-enable the M1 support in Podman and get brew updated. The second is we need [Fedora CoreOS](https://getfedora.org/en/coreos) aarch64 images to be indexed, which should be occurring very shortly.  

### User Experience on Windows 
We currently support the Windows platform with a remote client that can be downloaded from our [GitHub releases page](https://github.com/containers/podman/releases).  That remote client requires a Linux server with Podman and its service running.  We also have user reports that running Podman in WSL is quite tenable.  Consider the WSL option if you do not have available Linux servers with Podman installed.

We intend to develop a desktop for the Mac and Windows experience for Podman.  Early design work is under consideration.  No timeline has been identified yet.

### Questions?
Remember, our development team can be found in our [Matrix room](https://matrix.to/#/#podman:matrix.org) which has been bridged to the #podman channel on [libera IRC](https://libera.chat/) as well as our [Discord server](https://discord.gg/x5GzFF6QH4). You can also get in touch with us via our [project page](https://github.com/containers/podman) by opening issues, PR’s and discussions. We love to hear from people!

Podman is an open-source project. We are always looking for contributors to help us accelerate features into the Podman and container world.

