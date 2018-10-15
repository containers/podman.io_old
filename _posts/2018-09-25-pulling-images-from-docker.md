---
title: Cool thing&#58; Pulling content directly from the Docker Daemon...
layout: default
author: dwalsh
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Pulling content directly from the Docker Daemon...
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

## Cool things you can do with Podman.

I recently received a bug report about some huge container images not working correctly in Docker.  So I suggested to the reporter that they try them with Podman.  He responded that he saw the images with docker images, but did not see them with podman images.

I explained to him that the Docker image and container database are separate from the Podman image and container database.  I told him he would have to pull the images into Podman.  Then I decided to try a cool feature of Podman, where I could pull images directly out of the Docker daemon.

<!--readmore-->
### First I look for the Centos Image inside of Docker.
```
# docker images | grep centos
docker.io/centos                  	7               	49f7960eb7e4    	2 months ago    	200 MB
```
Podman has the ability through its use of containers/image to pull images using many different transports other than just pulling from Container Registries.  It supports pulling directly from the Docker daemon, using the docker-daemon transport.
```
# podman pull docker-daemon:docker.io/centos:7
Getting image source signatures
Copying blob sha256:bcc97fbfc9e1a709f0eb78c1da59caeb65f43dc32cd5deeb12b8c1784e5b8237
 198.59 MB / 198.59 MB [====================================================] 1s
Copying config sha256:49f7960eb7e4cb46f1a02c1f8174c6fac07ebf1eb6d8deffbcb5c695f1c9edd5
 2.15 KB / 2.15 KB [========================================================] 0s
Writing manifest to image destination
Storing signatures
49f7960eb7e4cb46f1a02c1f8174c6fac07ebf1eb6d8deffbcb5c695f1c9edd5
```

Now you have the Centos 7 image in Podman containers/storage datastore.

```
#podman images | grep centos
docker.io/library/centos        	7    	49f7960eb7e4   2 months ago   .com208MB
```
Now you can start using the image with Podman, Buildah and CRI-O.
You can even create new images and push them back into the Docker daemon.

### Try it out…

