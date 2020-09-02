---
title: The podman play kube command now supports deployments 
layout: default
author: mheon
categories: [blogs]
tags: podman, containers, v2, github, kubernetes, kube 
---
![podman logo](https://podman.io/images/podman.svg)

# The podman play kube command now supports deployments 
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

In a recent blog post on the [Red Hat Enable Sysadmin](https://www.redhat.com/sysadmin/) site, [The podman play kube command now supports deployments](https://www.redhat.com/sysadmin/podman-play-kube), you can now learn all about the recent features added to Podman to interact with Kubernetes objects.  The `podman generate kube` command allows you to export your existing containers into Kubernetes Pod YAML.  This YAML can then be imported into OpenShift or a Kubernetes cluster.  The `podman play kube` does the opposite, it allows you to take a Kubernetes YAML and run it in Podman.  Learn all of the details and more in the blog post!
