---
title: SELinux blocks Podman container from talking to libvirt
layout: default
author: dwalsh
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# SELinux blocks Podman container from talking to libvirt
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

I wrote a SELinux blog on running a container with Podman.  The talks explains why SELinux blocks the connection to the
libvirt socket.  It then goes on to explain how to setup the container to allow
the communication.

[Read More](https://danwalsh.livejournal.com/81143.html)
