---
title: Announcement&#58; Support for Older Distros on Kubic Project/OBS
layout: default
author: lsm5
categories: [blogs]
tags: containers, podman, distro, linux, centos, ubuntu, debian
---
![podman logo](https://podman.io/images/podman.svg)

# Announcement&#58; Support for Older Distros on Kubic Project/OBS
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

The Podman Community [builds and supports packages](https://podman.io/getting-started/installation)
for a wide variety of Linux distributions and operating systems. These builds are
provided in the public Open Build Service hosted by openSUSE.
[These pre-built packages](https://download.opensuse.org/repositories/devel:/kubic:/libcontainers:/stable/)
have made it easier for new users to test the latest-greatest
versions of Podman and allow for using it on distributions that do not yet provide
it in their main repositories.

<!--readmore-->
As Podman matures, we are constantly looking for ways to focus on improvement to
the project versus just maintenance. One area of focus is around trimming down the
matrix of packages we build for different Linux distros. This is made easier by the
fact that Podman is now supported natively in many major Linux distributions.
For instance, Podman is in the main repositories in Ubuntu 20.10 and future versions.
Also, Podman is going to be released with Debian 11.

With the launch of Podman 3.0, we will be trimming support for the latest builds of
Podman for a number of older distributions. There are technical reasons that make it
barely possible to support a modern container engine such as Podman on too old
systems, where the kernel and certain core libraries may be too old.

Podman 3.0 will be the last major build on CentOS 7, Debian 10 and Ubuntu 18.04.
After this release, we recommend users who need the latest versions of Podman to move
to newer versions of their Linux distribution.
