---
title: Simplifying Podman commands with labels
layout: default
author: baude
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Simplifying Podman commands with labels
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Commands used by container runtimes to create containers have become complex.  It is on purpose of course.  When creating
containers, we want the ability to specify various security or network attributes. But if you are in the unenviable position to have to keystroke in some of these lengthy commands, it can grow tiresome.  Defining labels on the container image is a great way to define how the container should be run; however, now with Podman we can read and execute that label saving you potential command line bloat.

<!--readmore-->

### Container image Labels
Container images have had the concept of a label for quite some time. They are often used as identifiers for the image; i.e. version, release, author, etc. But you can create a container label for just about anything.  With the Atomic CLI project, we used to leverage labels such as RUN, INSTALL, and UNINSTALL.  These labels we defined for the purpose of their verbiage.

### Podman container runlabel
To mimic the Atomic CLI project, we added a sub-command called `podman container runlabel`. This command will execute the contents of a given label as defined by the container image.

Lets consider an example.  I have a simple container image based on mariab that I use for my Podman development.  The image is made like so:

```
FROM docker.io/library/mariadb:latest
LABEL RUN="podman run --name some-mariadb -P -e MYSQL_ROOT_PASSWORD=x -dt IMAGE"
RUN echo "bind-address = 0.0.0.0" >> /etc/mysql/my.cnf
```

Note the definition of the RUN label in the image.  It contains the complete command line description of how to run it.  The use of IMAGE here is a placeholder is automatically substituted by Podman to the real image name. On my system, this image exists as `quay.io/baude/demodb:latest`.

We can get a preview of what Podman would run using the `--display` switch.  In the case of my mariab image, a dry-run would show something like this:
```
$ sudo podman container runlabel --display run quay.io/baude/demodb:latest
Command: /proc/self/exe run --name some-mariadb -P -e MYSQL_ROOT_PASSWORD=x -dt quay.io/baude/demodb:latest
```
Note how the IMAGE was translated into the image name.  If we rerun the previous command and subtract the `--display` option, podman will create the container exactly as described by the run label.

So, next time you create your own image, do yourself a favor and construct labels that Podman can read and simplify your life.
