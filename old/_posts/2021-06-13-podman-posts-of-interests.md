---
title: Podman Posts of Interest 
layout: default
author: tsweeney  
categories: [blogs]
tags: containers, podman, networking, pod, api, kubernetes, kube, v2, hpc, windows, mac
---
![podman logo](https://podman.io/images/podman.svg)

# Podman Posts of Interest 
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

A number of blog posts have flung by and I have not had a chance to get individual
link posts to them, so thought I would add a few here that have popped up recently,
links after the break!.

<!--readmore-->
  * [Ashley Cui](https://twitter.com/cuicodes) - [Exploring the new Podman secret command](https://www.redhat.com/sysadmin/new-podman-secrets-command) - Ashely strikes again with another great article.  This time she's talking all about the new Podman secret command and how you can store sensitive information in your image, yet not have it be exposed without your container.
  * [cfillekes](https://cfillekes-25575.medium.com) - [Building and Publishing Multi-Arch Images and Image Manifests with Red Hat Buildah and Podman](https://medium.com/qiskit-openshift-multi-arch/building-and-publishing-multi-arch-images-and-image-manifests-with-red-hat-buildah-and-podman-927c717adaf3) - Want to learn how to use the `--platform` flag in Podman and Buildah to build Multi-Arch images?  Then this is the post for you!
  * [Dan Walsh](https://twitter.com/rhatdan) - [New container feature: Volatile overlay mounts](https://www.redhat.com/sysadmin/container-volatile-overlay-mounts) - How to use volatile mounts in a container to increase performance and clean up unnecessary clutter.
  * [James Walker](https://www.cloudsavvyit.com/author/jameswalker/) - [What Is Podman and How Does It Differ from Docker?](https://www.cloudsavvyit.com/11575/what-is-podman-and-how-does-it-differ-from-docker/) - James walks you through the differences between the two container tools.
  * [Dan Walsh](https://twitter.com/rhatdan) - [Using files and devices in Podman rootless containers](https://www.redhat.com/sysadmin/files-devices-podman) - Dan talks about the `k--group-add keep-groups` feature and how it allows rootless containers to maintain the groups of its parent process.
  * [Sarthak Jain](https://www.redhat.com/sysadmin/users/sarthak-jain) - [How to automate Podman installation and deployment using Ansible](https://www.redhat.com/sysadmin/automate-podman-ansible) - Sarthak shows you how to automate Podman with Ansible.
  * [Eduardo Medeiros](https://twitter.com/xedux) - [How to create container images with ansible-bender](https://blog.emedeiros.me/archives/2021/05/05/how-to-create-container-images-with-ansible-bender.html) - Eduardo shows how to use Ansible Bender along with Podman and Buildah to build container images.
  * [Daniel Schier](https://twitter.com/daniel_wtd) - [Podman Networking - Part 2](https://blog.while-true-do.io/podman-networking-2/) - Daniel shows how the `podman network` command can be used for external and internal networks.
  * [Thomas Tuffin](https://www.redhat.com/sysadmin/users/thomas-tuffin) - [Home automation: Running Home Assistant with Podman](https://www.redhat.com/sysadmin/automate-your-home) - An intro to the Home Assistant open source project, what it can do, and a basic setup using a container.

