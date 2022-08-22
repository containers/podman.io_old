---
layout: default
title: What is podman?
---
<head>
<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico">
</head>

![podman logo](/images/podman.svg)

## What is Podman? Simply put: **alias docker=podman**

Podman is an open-source project that is available on most Linux platforms and resides on [GitHub](https://github.com/containers/podman). Podman is a daemonless container engine for developing, managing, and running Open Container Initiative (OCI) containers and container images on your Linux System. Podman provides a Docker-compatible command line front end that can simply alias the Docker cli, **alias docker=podman**.  Podman also provides a socket activated REST API service to allow remote applications to launch on-demand containers. This REST API also supports the Docker API, allowing users of docker-py and docker-compose to interact with the Podman as a service.

Containers under the control of Podman can either be run by root or by a non-privileged user. Podman manages the entire container ecosystem which includes pods, containers, container images, and container volumes using the [libpod](https://github.com/containers/podman) library. Podman specializes in all of the commands and functions that help you to maintain and modify OCI container images, such as pulling and tagging. It allows you to create, run, and maintain those containers created from those images in a production environment.  

The Podman service runs only on Linux platforms, however the podman remote REST API client exists on Mac and Windows platforms and can communicate with the Podman service running on a Linux machine or VM via ssh. [Mac/Windows client](https://github.com/containers/podman/blob/main/docs/tutorials/mac_win_client.md).

### Overview and scope

At a high level, the scope of libpod and Podman is the following:

*   Support multiple image formats including the OCI and Docker image formats.
*   Support for multiple means to securely download images including trust & image verification.
*   Container image management (managing image layers, overlay filesystems, etc).
*   Full management of container lifecycle.
*   Support for pods to manage groups of containers together.
*   Resource isolation of containers and pods.

### Roadmap

*   Further work on the podman pod command.
*   Further improvements on rootless containers.
*   Support for rootless Podman with NFS Homedirs.
*   Support for rootless Podman on native overlayfs.
*   Enhancements to speedup pulling of images.
*   Podman machine for setting up VMs for running `podman -remote run` nativley on Mac and Linux.

### Out of scope

*   Container runtimes daemons for working with the Kubernetes CRI interface. [CRI-O](https://github.com/kubernetes-sigs/cri-o) specializes in that.
*   Supporting `docker swarm`. We believe that Kubernetes is the defacto standard for composing Pods and for orchestrating containers, making Kubernetes YAML a defacto standard file format. Hence, Podman allows the creation and execution of Pods from a Kubernetes YAML file (see [podman-play-kube](https://github.com/containers/podman/blob/main/docs/source/markdown/podman-play-kube.1.md)). Podman can also generate Kubernetes YAML based on a container or Pod (see [podman-generate-kube](https://github.com/containers/podman/blob/main/docs/source/markdown/podman-generate-kube.1.md)), which allows for an easy transition from a local development environment to a production Kubernetes cluster.

### Builds

This project tests all builds against each supported version of Fedora, the latest released version of Red Hat Enterprise Linux, and the latest Ubuntu Long Term Support release. The community has also reported success with other Linux flavors.

#### Last Update: Tuesday May 4th, 2021
