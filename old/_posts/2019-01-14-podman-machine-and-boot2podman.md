---
title: Podman Machine and Boot2podman
layout: default
author: afbjorklund
categories: [blogs]
tags: boot2podman, podman+machine
---
![boot2podman logo](https://raw.githubusercontent.com/boot2podman/boot2podman/master/logo.png)

{% assign author = site.authors[page.author] %}
#  Podman Machine and Boot2podman
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

### Update: September 9, 2021 - Tom Sweeney
This post initially discussed the boot2podman/machine project, which Anders has since deprecated.  Starting with Podman v3.3, the `podman machine` command now does that same function and is part of the Podman project.  Please see Brent Baude's [update](https://podman.io/blogs/2021/09/06/podman-on-macs.html) or the [podman machine](https://docs.podman.io/en/latest/machine.html) man page on [docs.podman.io](https://docs.podman.io/) for more information on how to run Podman machine.  The `podman-machine` command has been deprecated.

In addition, the Podman team is investigating the possibility of creating `Podman Desktop`. Please see the issue on [GitHub](https://github.com/containers/podman/issues/11494), and please add your comments or thoughts to that issue.

More updates are coming, and please keep your eye on the [Podman Mailing List](https://podman.io/community/#mailing-list) and [podman.io](https://podman.io) for further information and developments.

Finally, a very big thank you to Anders for his many contributions to Podman, particularly for his work in getting Podman to work smoothly on macOS.

## Original Post

By using `podman-machine` and indirectly `boot2podman`, it is easy to get started with podman even if your local host does not support it...

It will start a virtual machine, with everything to run containers. This includes `podman` and `buildah`, and remote access over `varlink`.

<!--readmore-->

The command-line tool `podman-machine` is a simple way to create virtual machines running `boot2podman.iso`.
It will create a "machine" with Linux prepared for running Linux containers, with [Podman](https://podman.io) and [Buildah](https://buildah.io) (and their dependencies) pre-installed.

This way any client will be able to run containers, even though not possible on their operating system.
Whether their Linux distribution is too old or too unprivileged, or if they are running Windows or OS X operating systems without native Linux support.

## Podman Machine

Machine lets you create servers with Podman, then configures the Podman clients.

``` console
$ podman-machine create box
$ podman-machine ssh box

tc@box:~$ sudo podman
```

Will automatically download the latest version of the ISO, if not available in the cache.

_See:_ [https://github.com/boot2podman/machine](https://github.com/boot2podman/machine)

## Boot2Podman ISO

Boot2podman is a lightweight Linux distribution made specifically to run Linux containers.

* Tiny Core Linux 9.x (x86_64)
* Buildah / Varlink / Podman

The distribution runs entirely from RAM, while persisting the containers and ssh keys.

_See:_ [https://github.com/boot2podman/boot2podman](https://github.com/boot2podman/boot2podman)

## Remote Access

It is possible to use the `pypodman` command-line tool, to control podman remotely:

``` console
$ eval $(podman-machine env box)
$ pypodman version
```

[https://github.com/containers/python-podman](https://github.com/containers/python-podman)

Or alternatively to use the `varlink-go` command-line tool, to access the podman API:

``` console
$ eval $(podman-machine env box --varlink)
$ varlink-go call io.podman.GetVersion
```
[https://github.com/boot2podman/varlink-go](https://github.com/boot2podman/varlink-go)


Both methods use SSH, in order to access the podman varlink socket of the VM.

The SSH keys and other configuration is automatically created with the machine.

## Tiny Core

The regular `boot2podman.iso` is based on [Tiny Core Linux](http://tinycorelinux.net):

[https://github.com/boot2podman/boot2podman/releases](https://github.com/boot2podman/boot2podman/releases)

This is a minimal system, that runs entirely from RAM and uses `init(1)`.

The package manager uses TCZ packages, handled by the `tce-load` program.

_See:_ [https://en.wikipedia.org/wiki/Tiny_Core_Linux](https://en.wikipedia.org/wiki/Tiny_Core_Linux)

## Fedora

There is also an alternative version, based on [Fedora Linux](https://getfedora.org/):

[https://github.com/boot2podman/boot2podman-fedora-iso/releases](https://github.com/boot2podman/boot2podman-fedora-iso/releases)

This is a full system, that boots a regular image and uses `systemd(1)`.

The package manager uses RPM packages, handled by the `dnf` program.

_See:_ [https://en.wikipedia.org/wiki/Fedora_(operating_system)](https://en.wikipedia.org/wiki/Fedora_(operating_system))


Both versions will do the same thing, in that they will both offer the Podman varlink socket.

The Podman Machine can set up virtual machines for either, by using the "url" parameters.


---

For more posts about boot2podman, see: [https://boot2podman.github.io/](https://boot2podman.github.io/)

