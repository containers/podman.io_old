---
title: Buildah and Podman Relationship
layout: default
author: tsweeney
categories: [blogs]
tags: containers, images, docker, buildah, podman, oci
---
![podman logo](https://podman.io/images/podman.svg)
![buildah logo](https://buildah.io/images/buildah.png)

{% assign author = site.authors[page.author] %}
# Buildah and Podman Relationship
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Kubernetes installations can be complex with multiple runtime dependencies and runtime engines.  [CRI-O](https://cri-o.io/) was created to provide a lightweight runtime for Kubernetes which adds an abstraction layer between the cluster and the runtime that allows for various OCI runtime technologies.  However you still have the problem of daemon dependencies in your cluster for builds - I.e. if you are using the cluster for builds you still need a Docker daemon.

Enter Buildah.  Buildah allows you to have a Kubernetes cluster without any Docker daemon for both runtime and builds.  Excellent. But what if things go wrong? What if you want to do troubleshooting or debugging of containers in your cluster?  Buildah isn’t really built for that, what you need is a client tool for working with containers and the one that comes to mind is Docker CLI - but then you’re back to using the daemon.  

This is where Podman steps in.  Podman allows you to do all of the Docker commands without the daemon dependency.  With Podman you can run, build (it calls Buildah under the covers for this), modify and troubleshoot containers in your Kubernetes cluster.  With the two projects together, you have a well rounded solution for your OCI container image and container needs.

<!--readmore-->
Buildah and Podman are two complementary Open-source projects that are available on
most Linux platforms and both projects reside at [GitHub.com](https://github.com)
with Buildah [here](https://github.com/containers/buildah) and Podman [here](https://github.com/containers/podman).  Both Buildah and Podman are command line tools that work on OCI images and containers.  The two projects are related, but differ in their specialization.

Buildah specializes in building OCI images.  Buildah's commands replicate all
of the commands that are found in a Dockerfile. Buildah’s goal is also to provide a lower level coreutils interface to build container images, allowing people to build containers without requiring a Dockerfile.  Buildah’s other goal is to allow you to use other scripting languages to build container images without requiring a daemon.

Podman specializes in all of the commands and functions that help you to maintain and modify those OCI container images, such as pulling and tagging.  It also allows you to create, run, and maintain those containers. If you can do a command in the Docker CLI, you can do the same command in the Podman CLI.  In fact you can just alias ‘podman’ for ‘docker’ on your machine and you can then build, create and maintain container images and containers without a daemon being present, just as you always have.

Although Podman uses Buildah’s build functionality under the covers to create a container image, the two projects have differences.  The major difference between Podman and Buildah is their concept of a container. Podman allows users to create `traditional containers` and the intent of these containers is to be controlled through the entirety of a container life cycle (pause, checkpoint/restore, etc).  While Buildah containers are really created just to allow content to be added to the container *image*.  Each project has a separate internal representation of a container that is not shared.  Because of this you cannot see Podman containers from within Buildah or vice versa. However the internal representation of a container image is the same between Buildah and Podman.  Given this, any container image that has been created, pulled or modified by one can be seen and used by the other.

Some of the commands between the two projects overlap significantly but in some cases have slightly different behaviors.  The following table illustrates the commands with some overlap between the projects.

| Command  | Podman Behavior  | Buildah Behavior |
| :--------------- | :-------------------------- | :------------------------ |
| build          | Calls `buildah bud` | Provides the build-using-dockerfile (bud) command that emulates Docker’s build command. |
| commit      | Commits a Podman container into a container image.  Does not work on a Buildah container. Once committed the resulting image can be used by either Podman or Buildah. |  Commits a Buildah container into a container image. Does not work on a Podman container. Once committed, the resulting image can be used by either Buildah or Podman.|
| mount       | Mounts a Podman container.  Does not work on a Buildah container.  | Mounts a Buildah container. Does not work on a Podman container. |
| pull and push | Pull or push an image from a container  image registry. Functionally the same as Buildah. | Pull or push an image from a container  image registry. Functionally the same as Podman. |
| run             | Run a process in a new container in the same manner as `docker run`. | Runs the container in the same way as the RUN command in a Dockerfile. |
| rm              | Removes a Podman container.  Does not work on a Buildah container.  | Removes a Buildah container. Does not work on a Podman container. |
| rmi, images, tag | Equivalent on both projects. | Equivalent on both projects. |
| containers and ps | `ps` is used to list Podman containers.  The `containers` command does not exist. | containers is used to list Buildah containers.  The `ps` command does not exist. |

A quick and easy way to summarize the difference between the two projects is the `buildah run` command emulates the RUN command in a Dockerfile while the `podman run` command emulates the `docker run` command in functionality. 

Buildah is an efficient way to create OCI images while Podman allows you to manage and maintain those images and containers in a production environment using familiar container cli commands.  Together they form a strong foundation to support your OCI container image and container needs. Best yet, they are both Open-source projects and you are more than welcome to contribute to either or both projects.  Hope to see you there!
