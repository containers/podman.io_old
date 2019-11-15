---
title: Leasing routable IP addresses with Podman containers
layout: default
author: baude
categories: [blogs]
tags: containers, images, docker, buildah, podman, hpc, oci, networking, runtime
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Leasing routable IP addresses with Podman containers  
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

{{ author.display_name }} has another blog post on the [Red Hat Enable Sysadmin](https://www.redhat.com/sysadmin/) site this time about [Leasing routable IP addresses with Podman containers](https://www.redhat.com/sysadmin/leasing-ips-podman).  In the post Brent talks about using the macvlan and the dhcp plugins that ship with the container-networking project in order to lease ip addresses for your containers.
