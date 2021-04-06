---
title: Podman and NFS
layout: default
author: adrianr
categories: [blogs]
tags: podman, containers, hpc, nfs
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Podman and NFS
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

In my previous [Podman in HPC
environments](https://podman.io/blogs/2019/09/26/podman-in-hpc.html) article I
introduced how Podman can be used to run containers under the control of Open
MPI. In this article I want to extend my HPC environment to use a shared NFS
home directory.

<!--readmore-->

The following examples are running on CentOS 7.7 and are
configuring Podman for rootless usage based on [the official
documentation](https://access.redhat.com/documentation/en-us/red_hat_enterprise_linux_atomic_host/7/html-single/managing_containers/index#running_containers_as_root_or_rootless).

The user in my examples is named *centos*.

```shell
$ sudo sh -c "echo 'user.max_user_namespaces=28633' > /etc/sysctl.d/userns.conf"
$ sudo sysctl -p /etc/sysctl.d/userns.conf
$ sudo sh -c "echo 'centos:200000:65536' >> /etc/subuid"
$ sudo sh -c "echo 'centos:200000:65536' >> /etc/subgid"
```

With this the system should be ready to run rootless containers. As I am focussing
on containers running under Open MPI's control I am using Podman with *--net=host*,
as mentioned in my [previous article](https://podman.io/blogs/2019/09/26/podman-in-hpc.html).

During system setup I am also configuring Podman to be ready to run on a NFS
based home directory because, as far as I know, it is not possible for Podman
to correctly setup the necessary [user
namespaces](https://man7.org/linux/man-pages/man7/user_namespaces.7.html) when
the storage backend is running on NFS.

The following commands are necessary on my system to tell Podman to use
*/tmp/centos/containers* as the storage backend:

```shell
$ podman info
$ sed -e "s,graphroot.*$,graphroot = \"/tmp/centos/containers\",g" -i .config/containers/storage.conf
$ rm -f ./.local/share/containers/storage/libpod/bolt_state.db ./.local/share/containers/cache/blob-info-cache-v1.boltdb
```

The first command lets Podman create an initial configuration for the current
system. As the home directory is on a NFS mounted directory it is necessary to
tell Podman to use a non NFS directory for backend storage
(*/tmp/centos/containers* in this example). As this happens during initial
system (or user) configuration and no container has yet been run by Podman I
can easily delete Podman's local database which contains reference to the home
directory as the storage backend. With these 3 steps Podman is ready to be used
on a NFS based home directory once the user logs in for the first time.

I am now running the same Open MPI based container example as in my
[previous article](https://podman.io/blogs/2019/09/26/podman-in-hpc.html).

```shell
$ mpirun --hostfile hostfile \
   --mca orte_tmpdir_base /tmp/podman-mpirun \
   podman run --env-host \
     -v /tmp/podman-mpirun:/tmp/podman-mpirun \
     --userns=keep-id \
     --net=host --pid=host --ipc=host \
     quay.io/adrianreber/mpi-test:30 /home/ring
Rank 2 has cleared MPI_Init
Rank 2 has completed ring
Rank 2 has completed MPI_Barrier
Rank 3 has cleared MPI_Init
Rank 3 has completed ring
Rank 3 has completed MPI_Barrier
Rank 1 has cleared MPI_Init
Rank 1 has completed ring
Rank 1 has completed MPI_Barrier
Rank 0 has cleared MPI_Init
Rank 0 has completed ring
Rank 0 has completed MPI_Barrier
```

The difference to the previous article is that my home directory is now NFS
based. Podman will now go to the specified registry (*quay.io*) to download for
each host involved in the MPI job the specified container to
*/tmp/centos/containers*.

This enables me to use Podman in a even more HPC like environment where shared
home directories are very common to share input and output data.
