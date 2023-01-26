---
title: Announcing Podman v2.0
layout: default
author: baude
categories: [blogs]
tags: containers, docker-compose, podman, networking, pod, api, rest, rest-api, v2, hpc
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Announcing Podman v2
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

If you have been following the upstream development of Podman, you have undoubtedly seen us refer to “2.0” or “Podman 2”. Today, we have made the first release of Podman 2 upstream.  The release notes highlight many of the newest features but we wanted to call out some specific things in this blog and expand on them.

<!--readmore-->
## “Pay no attention to the man behind the curtain”
Most of the changes to the new Podman should be transparent to end users.  We did a significant amount of replumbing in our internals to allow for future enhancements and more closely align many of the code paths.  There are some subtle changes to the outputs of some commands and fields within JSON formatted responses.  They were largely done to create more consistency amongst our commands as well as driven by user feedback.

## RESTful API
The biggest change in Podman 2 is our introduction of a RESTful API to interact with our libraries.  In actuality, the RESTful service was present in earlier versions but was tagged experimental.  We have also deprecated the previous API implementation based on varlink.  We will publish more specific blogs and tutorials on how to use the API but consider this a little introduction.

The API was designed to have two layers: libpod and compatibility.  The libpod layer allows you to interact directly with the libpod libraries.  The compatibility layer is designed to emulate the Docker RESTful API to assist in migration of tools, applications, and services long-term to libpod.  This can be made clearer with an example.  Consider inspecting a container called ‘foobar’ with each layer.  The endpoint paths would differ depending on the layers.

```
/v1.24/containers/foobar   ← compatibility call
/v1.0/libpod/containers/foobar  ← libpod call
```
Furthermore, the results of each call will differ.  The compatibility result will closely emulate the response from Docker.

Our preference is that people writing new code to interact with Podman should use the libpod layer only.  This is a more sound long term strategy.  But for people that need to migrate to Podman, the compatibility layer allows for a quick on-boarding.  There are of course Docker endpoints we cannot or choose not to emulate due to incompatibities between Docker and Podman. Nevertheless, we have already seen some field success in migration of applications.

In keeping with Podman’s history the restful API will work in both rootless and rootful mode.  If you run in rootful mode, the podman service will listen on `/run/podman/podman.sock` and rootless is `$XDG_RUNTIME_DIR/podman/podman.sock` (for example: `/run/user/1000/podman/podman.sock`).  If you install the podman-docker package, the package will set up a link between `run/docker/docker.sock` and `/run/podman/podman.sock`.

## Remote clients
One of the consequences of our re-plumbing work is that our remote clients for Windows, Mac, and Linux are significantly smaller in size.  The interface for the remote client connection has also changed to more of a URI format.  As a matter of process, we attach a binary version of the remote clients to each release.

It is also worth noting that a ‘--remote’ flag has been added to the Podman binary to allow it to act as a remote client.

## Auto-update
The `podman auto-update` command allows for updating systemd-managed running containers when their images have been updated on the container registry. While it is still a tech preview in Podman v2.0, we added a number of improvements to better support authentication and to select the correct images on ARM. If you’re interested in auto updates, please check them out and let us know what you think.

## systemd Integration Improvements
A major improvement for Podman’s systemd support is that `podman generate systemd` now supports using the `--new` flag on pods. This allows for creating shareable systemd units not only for containers but also for pods. Additionally, we added a number of changes to make the systemd units more robust and reliable, such as cleanly starting after a system crash and clean shutdowns even when conmon has been killed. The names of generated files can further be altered with the new `--container-prefix` and `--pod-prefix` flags.

## Conclusion
This is a major new version of Podman with the goal to support all of your local container engine needs.  We sincerely hope that the new features meet your needs.  We continue to develop new content based on the API including new bits to the API itself.  Before making too many more changes, we will let Podman “bake” for a while before the next radical functions are added.

We would love to hear your feedback and look forward to working with the community on giving Podman users and developers the best container experience.  Remember upstream Podman development usually hangs out on **#podman** on **Freenode** and on the Podman [mailing list](https://lists.podman.io/admin/lists/podman.lists.podman.io/).
