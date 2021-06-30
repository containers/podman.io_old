---
title: Podman Troubleshooting Guide                  
layout: default
author: tsweeney
categories: [blogs]
tags: podman, containers, v2, github, varlink, rest-api
---
![podman logo](https://podman.io/images/podman.svg)

# Podman Troubleshooting Guide
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

As a kid, I was fascinated by space flight.  If I couldn't be a fireman like my father, I wanted to be an astronaut.  Of course I had to have a [Major Matt Mason](https://www.youtube.com/watch?v=4sNoiDT0BMw&list=LLTdXWmg018se8aJN4cUq6Ag&index=2934) figure so I could fly him around the house and then land him softly in a jury-rigged parachute in my wading pool.  Then of course the whole Apollo 13 drama had me riveted, and when the movie came out years later, I fell in love with this line in the movie, "Let's work the problem people. Let's not make things worse by guessing." by Ed Harris who played Gene Kranz the "vested" flight director.
<!--readmore-->

That's been a helpful creed for me and it's also helpful for the Podman world too.  Many times the community spends a fair amount of effort answering issues and questions either in GitHub's [issues](https://github.com/containers/podman/issues) or in the [Podman Mailing List](https://lists.podman.io/admin/lists/podman.lists.podman.io/).  That's really great, but sometimes the discussion finds that the problem is concerning an issue that is on the [Podman Troubleshooting Guide](https://github.com/containers/podman/blob/main/troubleshooting.md).  This page might be one of the least visited pages on the site, yet the most helpful, especially for people who are new to the Podman project.

The page contains a number of common issues and solutions for Podman.  It can help people who are running into issues find out if the issue has been encountered before.  Some of the more common ones are issues with mounts and selinux, rootless containers not being able to ping the host, rootless containers exiting with the user, and more.  A lot of the items of the page are not really issues with the Podman software, but rather that required configuration steps for use cases were not completed.  Along with the problem and typical error responses on this page, each one has a solution section that will walk you through the steps needed to correct the problem.  As common problems are encountered along the way, the community is encouraged to add them to the troubleshooting page, keeping it a fresh source of information.

Hopefully this post will help users of Podman find and discover solutions to their problems more easily in the Podman Troubleshooting Guide.  Just as importantly, it will act as a reminder for those in the community who are familiar with the page to consider adding problems and solutions that they may encounter.  As we move forward, effective use of this page will help us prove Gene Kranz right in the Podman universe, "Failure is not an option".

