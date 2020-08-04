---
layout: default
title: What is podman?
---
<head>
<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico">
</head>

![podman logo](/images/podman.svg)

## What is Podman? Simply put: \`alias docker=podman\`

Podman is an open-source project that is available on most Linux platforms and resides on [GitHub](https://github.com/containers/podman). Podman is a daemonless container engine for developing, managing, and running Open Container Initiative (OCI) containers and container images on your Linux System. Podman provides a Docker-compatible command line front end that can simply alias the Docker cli, \`alias docker=podman\`.  

Containers under the control of Podman can either be run by root or by a non-privileged user. Podman manages the entire container ecosystem which includes pods, containers, container images, and container volumes using the [libpod](https://github.com/containers/podman) library. Podman specializes in all of the commands and functions that help you to maintain and modify OCI container images, such as pulling and tagging. It allows you to create, run, and maintain those containers created from those images in a production environment.  

The Podman service runs only on Linux platforms, however a REST API and clients are currently under development which will allow Mac and Windows platforms to call the service. There is currently a Varlink based [remote client](https://github.com/containers/podman/blob/master/docs/tutorials/remote_client.md) which runs on Mac or Windows platforms that allows the remote client to talk to the Podman server on a Linux platform. In addition to those clients, there is also a [Mac client](https://github.com/containers/podman/blob/master/docs/tutorials/mac_client.md). **NOTE:** the Varlink remote client will be deprecated after the REST API is completed.

### Overview and scope

At a high level, the scope of libpod and Podman is the following:

*   Support multiple image formats including the OCI and Docker image formats.
*   Support for multiple means to securely download images including trust & image verification.
*   Container image management (managing image layers, overlay filesystems, etc).
*   Full management of container lifecycle.
*   Support for pods to manage groups of containers together.
*   Resource isolation of containers and pods.

### Roadmap

*   Allow the Podman CLI to use a REST API to connect to remote Podman services on Linux from Mac and Windows.
*   Integrate libpod into CRI-O to replace its existing container management backend.
*   Further work on the podman pod command.
*   Further improvements on rootless containers.

### Out of scope

*   Specializing in signing and pushing images to various storage backends. See [Skopeo](https://github.com/containers/skopeo/) for those tasks.
*   Container runtimes daemons for working with the Kubernetes CRI interface. [CRI-O](https://github.com/kubernetes-sigs/cri-o) specializes in that.
*   Supporting `docker-compose`. We believe that Kubernetes is the defacto standard for composing Pods and for orchestrating containers, making Kubernetes YAML a defacto standard file format. Hence, Podman allows the creation and execution of Pods from a Kubernetes YAML file (see [podman-play-kube](https://github.com/containers/podman/blob/master/docs/source/markdown/podman-play-kube.1.md)). Podman can also generate Kubernetes YAML based on a container or Pod (see [podman-generate-kube](https://github.com/containers/podman/blob/master/docs/source/markdown/podman-generate-kube.1.md)), which allows for an easy transition from a local development environment to a production Kubernetes cluster.

### Builds

This project tests all builds against each supported version of Fedora, the latest released version of Red Hat Enterprise Linux, and the latest Ubuntu Long Term Support release. The community has also reported success with other Linux flavors.

#### Last Update: Tuesday November 19, 2019
