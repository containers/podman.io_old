---
title: Podman 4 is not in Fedora 35
layout: default
author: baude
categories: [blogs]
tags: containers, podman
---


![podman logo](https://podman.io/images/podman.svg)

# Podman 4 is not in Fedora 35

Podman 4 will not officially ship in Fedora 35 because it has breaking changes from Podman 3.  Fedora has well-founded
policies that forbid updating a package in a Fedora release, like 35, that has breaking changes.  This is true for
most Linux distributions that are dependent on release versions.

<!--readmore-->

However, the Podman team has set up a COPR (Cool Other Package Repo) so that you can still install Podman and its
dependencies on Fedora 35.  It is called [rhcontainerbot/podman4](https://copr.fedorainfracloud.org/coprs/rhcontainerbot/podman4/).
COPRs are not officially supported by Fedora or its infrastructure.  The podman4 COPR also has builds for
Fedora 36 and CentOS 9 stream. There are even Fedora 36 builds as well.

## Using podman4 COPR

Adding the podman4 COPR is very easy.  Instructions for doing so can be found on the
[rhcontainerbot/podman4](https://copr.fedorainfracloud.org/coprs/rhcontainerbot/podman4/) project site.  But for
a quick start, it is simply:

```
    $ sudo dnf copr enable rhcontainerbot/podman4
```

Once that command completes, you can install Podman.

```
    $ sudo dnf install podman
```

*Note*: If you are upgrading an existing Podman 3 install and wish to run Podman 4's new network stack, be certain
you that the aardvark and netavark packages are also installed (they are part of the same COPR).  You will also
need to then run `podman system reset --force` before running any new containers.
