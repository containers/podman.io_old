---
title: Podman container|image exists
layout: default
author: baude
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Podman container|image exists
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

We are seeing a proliferation of Podman usage in users' daily workflows.  As such, these workflows are often scripted -- in something like bash -- and clear exit codes from the applications being run are paramount.  One of the tasks we often see is a user wanting to verify if an image or a container exists in local storage.  We saw several different approaches approaches to solving this including running `podman ps` or `podman images` with filters or complex uses of grep.

<!--readmore-->

### Solution

After a bit of discussion with our users, recorded in [issue #1845] (https://github.com/containers/podman/issues/1845), a plan was hatched to have a specific command that satisfies this use case.  It was implemented for both containers and images; and I suppose if users wish, we could implement it for pods as well. If the image or container exists, Podman will return an exit code of `0`. If it does not exist, Podman will return an exit code of `1`. Any other exit code can be attributed to non-verification failures like permissions or failure in reading local storage.

### Check on an images
To verify the existence of an image in your local storage, you can use the command `podman image exists <IMAGE_NAME>`. Let's clarify through the use of an example.

The images we have in our local storage are as follows:
```
$ sudo podman images
REPOSITORY                   TAG      IMAGE ID       CREATED        SIZE
docker.io/library/alpine     latest   196d12cf6ab1   2 months ago   4.67 MB
```
If we wanted to verify the existence of the image `docker.io/library/alpine:latest`, we would:
```
$ sudo podman image exists docker.io/library/alpine:latest
$ echo $?
0
```
You can also verify by short-name if preferable:
```
$ sudo podman image exists alpine
$ echo $?
0
```

You can also verify an image by an image's full or shortened ID.
```
$ sudo podman image exists 196d12cf6ab1
$ echo $?
0
```

And finally, a failure to verify example would look like:
```
$ sudo podman image exists busybox
$ echo $?
1
```
### Check on a container
We can verify the existence of a container in much the same way as an image.  The grammar differs slightly.

My system has the following container:
```
$ sudo podman ps --format "{{.ID}} {{.Names}}"
472fde2f48c7 foobar
```

And I can verify the existence of the container with `podman container exists <CONTAINER_NAME>`.
```
$ sudo podman container exists foobar
$ echo $?
0
```
Like images, you can also verify a container using its full or partial container ID.
