---
title: Bioinformatics with rootless Podman
layout: default
author: bhepworth
categories: [blogs]
tags: bioinformatics, rootless, podman
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Bioinformatics with rootless podman
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

## TL;DR

Over the last 10 years I've seen machines and workflows evolve where I work. From the initial dedicated server, to hpc environments 
and now the latest instance, containers.

From an admin point of view this is great - The initial servers had to be carefully built and maintained so that everything would work nicely together. Incompatible programs at that time were run through a VM until such time as they could be folded in to the mix.

The HPC's had versioned software and environment modules and were built to load the relevant dependencies at run time..

Now we are into a new era, containers - and not just any old containers, but containers that end users can build and run up fairly 
quickly to perform what-if's, and move on quickly through iterations until they perform the required functions.

Podman has developed very rapidly and is incredibly easy to use. You can use it in conjuction with quay.io or run it on a local machine.

If you don't have a RedHat Developer Subscription now is an ideal time to get one: -

https://developers.redhat.com/articles/getting-red-hat-developer-subscription-what-rhel-users-need-know/

..and download RedHat Enterprise 8.1

<!--readmore-->

