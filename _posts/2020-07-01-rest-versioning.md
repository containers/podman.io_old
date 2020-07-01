---
title: Podman REST API and Docker compatibility
layout: default
author: mheon
categories: [blogs]
tags: podman, containers, api, rest-api, hpc, rest, v2
---
![podman logo](https://podman.io/images/podman.svg)

# Podman REST API and Docker compatibility
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})


## Versioning the REST API
Podman v2.0.0 launched recently, and with it the REST API. We’ve seen a great deal of excitement with this new API because of what it will enable - enabling applications and automation to use Podman when the could previously only use Docker. As you may know, Podman’s REST API is split into two halves: one providing a Docker-compatible API, and a Libpod API providing support for Podman’s unique features such as pods. We would love for all projects to eventually grow to support for our native Libpod API, but this will take time (and may be impossible for older, no longer maintained projects). As such, we need to talk about the Compatibility API and how it can be used.
<!--readmore-->

When we developed the compatibility API layer, we targeted the latest released version of the Docker API, v1.40. Within this version, we aimed to implement all endpoints, with the exception of those used for Swarm([^1]). Podman is not a tool for managing clusters, and does not intend to become one. We recognize that many existing tools do not target this specific Docker API version, and these are occasionally breaking changes in the Docker API that may make using the newest API impossible. The core Podman team cannot commit to being bug-for-bug compatible with every version of the Docker API. The Podman team commits to fixing bugs related to the latest version of Docker API. We may fix bugs with older versions that affect many users. As a community project, we gladly accept help here - if you find bugs that prevent Podman from working with a specific API version you use and are willing to fix them, we’re always happy to accept patches!

We’re very excited by the possibilities the new Podman API offers, and encourage everyone to try it out. Question and bug reports are always welcome at our [Github page](https://github.com/containers/libpod) or our [email list](https://lists.podman.io/admin/lists/podman.lists.podman.io/).

[^1]: The Podman team believes the best tool for container orchestration is [Kubernetes](https://kubernetes.io/). The `podman generate kube` and `podman play kube` ease developer transitioning from single node containers/pods to full Kubernetes workloads.
