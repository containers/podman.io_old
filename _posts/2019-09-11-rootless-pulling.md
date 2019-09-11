---
title: Why can’t rootless Podman pull my image?  
layout: default
author: mheon
categories: [blogs]
tags: containers, images, docker, buildah, podman, oci
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Why can’t rootless Podman pull my image? 
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

{{ author.display_name }} has a blog post on the [Red Hat Enable Sysadmin](https://www.redhat.com/sysadmin/) site about [Why can’t rootless Podman pull my image?](https://www.redhat.com/sysadmin/rootless-podman).  In the blog Matt discusses why restrictions on rootless containers can be inconvenient, but why they're necessary.  In the blog Matt covers the use of user namespace and the allocations of uid and gid's that are required to make rootless containers work securely in your environment.

