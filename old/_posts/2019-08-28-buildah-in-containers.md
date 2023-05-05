---
title: Best practices for running Buildah in a container 
layout: default
author: dwalsh 
categories: [blogs]
tags: containers, images, docker, buildah, podman, oci
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Best practices for running Buildah in a container 
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Dan Walsh has recently posted a blog on the Red Hat Developer Blog, [Best practices for running Buildah in a container](https://developers.redhat.com/blog/2019/08/14/best-practices-for-running-buildah-in-a-container/). The post walks you through the balancing act of running a container securely using while keeping an eye on performance.  A big boost to the performance side of things is the concept of "Additional Stores".  Dan walks you through the use of those in this blog and then wraps it all up with an on-line video at the end.
