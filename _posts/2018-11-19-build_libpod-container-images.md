---
title: Build Podman RPMs with a container image
layout: default
author: baude
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Build Podman RPMs with a container image
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Libpod development is still very much active and on-going.  We often have folks who are looking
to test out the latest libpod and Podman for either new features or bug fixes.  We typically
build RPMs for distributions like Fedora on a release cadence, which used to be weekly but now
has slowed down as libpod has stabilized.  Building libpod from source is not difficult, but
sometimes the user's environment will not allow them to install all the packages needed; or
perhaps the user is intimidated by building from source; or perhaps the user would prefer
the RPM package because it will make the upgrade process easier down the road.

To solve this problem, I have created a series of container images for CentOS7, Fedora 28, and Fedora 29 that are capable of building a development Podman RPM and associated packages.

<!--readmore-->
#### A bit about the images themselves
The image that can used to build the RPMs is called *quay.io/libpod/build_libpod*.  You simply
alter the tag to build for the various distributions.  The *latest* tag will build CentOS7
RPMs.  Two other tags exist: *fedora28* and *fedora29*.

### Create the temporary directory
Create a directory for where the RPMs will be volume mounted.  It **must** be */tmp/rpms*.
```
$ mkdir /tmp/rpms
```
### Build the RPMs
Building the RPMs is a simple Podman command that leverages the `container runlabel` function in Podman. Once the image is pulled by Podman, it will install the required packages for building the RPMs.  After the build is complete, the container will also test to make sure the RPMs install correctly.

```
$ sudo podman container runlabel -p run quay.io/libpod/build_libpod:fedora29
Trying to pull quay.io/libpod/build_libpod:fedora29...Getting image source signatures
Skipping fetch of repeat blob sha256:7692efc5f81cadc73ca1afde08b1a5ea126749fd7520537ceea1a9871329efde
Copying blob sha256:af79f3045c1f7e253b5952752ae4ecabb15f5ee1e2c7e4148132ed37ea7e0091
 24.70 MB / 24.70 MB [======================================================] 2s
Copying blob sha256:ff2caf91b3889620d64f6fa5529531c3fed78222ce33a89ac85318e410d302fb
 206 B / 206 B [============================================================] 0s
Copying blob sha256:dd6fe2d1ef4e4ca5252881a6ab2db0eecc1166486af08384eab121512fd8e1dd
 253 B / 253 B [============================================================] 0s
Copying blob sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
 32 B / 32 B [==============================================================] 0s
Skipping fetch of repeat blob sha256:a3ed95caeb02ffe68cdd9fd84406680ae93d633cb16422d00e8a7c22955b46d4
Writing manifest to image destination
Storing signatures
Command: /proc/self/exe run -it --rm --net=host -v /tmp/rpms:/root/rpmbuild/RPMS/x86_64/:Z quay.io/libpod/build_libpod:fedora29
Cloning into '/go/src/github.com/containers/libpod'...
warning: redirecting to https://github.com/containers/podman/
remote: Enumerating objects: 34, done.
remote: Counting objects: 100% (34/34), done.
remote: Compressing objects: 100% (31/31), done.
remote: Total 23112 (delta 12), reused 12 (delta 3), pack-reused 23078
Receiving objects: 100% (23112/23112), 15.96 MiB | 10.16 MiB/s, done.
Resolving deltas: 100% (13753/13753), done.
/go/src/github.com/containers/libpod
++ command -v dnf
+ pkg_manager=/usr/bin/dnf

... ** SHORTENED FOR BREVITY ***

Installed:
  python3-podman-0.11.2-1542207420.git2b911b0c.fc29.noarch            python3-pypodman-0.11.2-1542207420.git2b911b0c.fc29.noarch           
  python3-dateutil-1:2.7.0-3.fc29.noarch                              python3-humanize-0.5.1-14.fc29.noarch                                
  python3-psutil-5.4.3-6.fc29.x86_64                                 

Complete!
```

The resulting RPMs will end up in your temporary directory of */tmp/rpms*.
```
$ find /tmp/rpms/
/tmp/rpms/
/tmp/rpms/noarch
/tmp/rpms/noarch/python3-pypodman-0.11.2-1542210510.git2b911b0c.fc29.noarch.rpm
/tmp/rpms/noarch/python3-podman-0.11.2-1542210510.git2b911b0c.fc29.noarch.rpm
/tmp/rpms/x86_64
/tmp/rpms/x86_64/podman-debuginfo-0.11.2-1542210510.git2b911b0c.fc29.x86_64.rpm
/tmp/rpms/x86_64/podman-debugsource-0.11.2-1542210510.git2b911b0c.fc29.x86_64.rpm
/tmp/rpms/x86_64/podman-0.11.2-1542210510.git2b911b0c.fc29.x86_64.rpm
```

### Future
If folks like this, I'll consider adding the ability to pass in a specific git commit to build.
