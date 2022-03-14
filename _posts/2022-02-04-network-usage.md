---
title: Testing Podman 4 with the new network stack
layout: default
author: baude
categories: [blogs]
tags: containers, podman, networking, pod, api, kubernetes, kube, v2, hpc, windows, mac, rootless, sudo, network, netavark, aardvark, aardvark-dns
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Testing Podman 4 with the new network stack
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})


Podman 4.0 will implement a new network stack instead of CNI plugins.  There are two components to the new stack:

<!--readmore-->
* Netavark performs interface setup, IP address/etc assignment, NAT, and port mapping.
* Aardvark-dns that replaces the previous DNS name custom plugin.  Aardvark-dns is a DNS server that provides name resolution and forwarding for container networks.

> **Warning**: Before testing Podman 4 and the new network stack, you will have to destroy all your current containers, images, and network.  Consider exporting/saving any import containers or images.

If you have run Podman 3.x before upgrading to Podman 4, Podman will continue to use CNI plugins as it had before.  There is a marker in Podman's local storage that indicates this.  In order to begin using Podman 4, you need to destroy that marker with podman system reset.  This will destroy the marker, all of the images, all of the networks, and all of the containers.

## Setting up Podman 4 with netavark and aardvark-dns on Fedora

If this is an upgrade to a current Podman install, destroy all current images, containers, and defined networks.
>$  podman system reset --force

Ensure you have the DNF copr extension.
>$ sudo dnf install 'dnf-command(copr)'

Add the podman4 test COPR to your system
>$ sudo dnf copr enable rhcontainerbot/podman4

If you have never installed Podman, replace `upgrade` with `install` in the following command.
> $ sudo dnf upgrade podman

If Podman was upgraded, you may have to install netavark explicitly. Otherwise, the Podman package will continue to use  CNI.
> $ sudo dnf install netavark aardvark-dns

If you find bugs, please report them to our [github issues page](https://github.com/containers/podman/issues).
