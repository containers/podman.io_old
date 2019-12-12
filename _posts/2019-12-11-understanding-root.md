---
title: Understanding root inside and outside a container 
layout: default
author: tsweeney
categories: [blogs]
tags: containers, images, docker, buildah, podman, oci
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Understanding root inside and outside a container 
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Do you run containers as root, or as a regular user?  Scott McCarty has a blog post on the [Red Hat Blog](https://www.redhat.com/en/blog) about this very subject,  [Understanding root inside and outside a container](https://www.redhat.com/en/blog/understanding-root-inside-and-outside-container).  In the post Scott walks you through what a rootless container does and how it can be a safer alternative to a container run by root.
