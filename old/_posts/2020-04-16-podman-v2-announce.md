---
title: Podman v2 development update 
layout: default
author: baude
categories: [blogs]
tags: containers, docker-compose, podman, networking, pod, api, rest, rest-api, v2
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Podman v2 development update 
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})


In the last few days, the Podman development team has been working to
release Podman-1.9.0.  This is likely to be the last Podman-1.X release
before we transition to Podman v2.x.  We have been working since
November 2019 to make a significant overhaul of Podman’s architecture.
And if we did our job correctly, most casual Podman users will not
notice a difference. We will continue to investigate and fix issues in
Podman-1.x versions but severity of the bug and priority will dictate
our response.

What some users who follow upstream development may notice is that
while we make the final push to a 2.x release, our GitHub repository
will look drastically different.  For some period of time, certain
Podman commands, if built based on upstream, may not function exactly
as expected nor even exist.  We already know we will need to disable
some of our CI testing framework as part of this final push until we
have a more complete Podman v2.x. We will not release Podman 2.0 until
we are satisfied that it is ready. While upstream development will be
impacted by the announced migration to Podman v2.x, you can still open
issues and contribute pull requests to the project.

As has been the standard with our project, we will remain transparent
in our development activities and try to keep our community appraised
of our progress.   We are excited for some of the technical
advancements that Podman v2.x will give our users.  Subsequent blog
posts will be written on those advancements and why they matter to our
users.
