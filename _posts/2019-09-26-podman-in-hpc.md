---
title: Podman in HPC environments
layout: default
author: adrianr
categories: [blogs]
tags: podman, containers, hpc
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Podman in HPC environments
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

A *High-Performance Computing* (**HPC**) environment can mean a lot of things,
but in this article I want to focus on running *Message Passing Interface*
(**MPI**) parallelized programs with the help of Podman.

<!--readmore-->

The following is a simple MPI based example taken from Open MPI: [ring.c](https://raw.githubusercontent.com/open-mpi/ompi/master/orte/test/mpi/ring.c)

To use it on a Fedora 30 system I first installed Open MPI and then I compiled
the example:

```shell
$ sudo dnf install openmpi-devel
$ module load mpi/openmpi-x86_64
$ echo "module load mpi/openmpi-x86_64" >> .bashrc
$ mpicc -o ring ring.c
```

Running this on my test system (Fedora 30) with 4 CPUs gives me this:

```shell
$ mpirun ./ring
Rank 3 has cleared MPI_Init
Rank 1 has cleared MPI_Init
Rank 2 has cleared MPI_Init
Rank 0 has cleared MPI_Init
Rank 1 has completed ring
Rank 2 has completed ring
Rank 3 has completed ring
Rank 0 has completed ring
Rank 3 has completed MPI_Barrier
Rank 1 has completed MPI_Barrier
Rank 0 has completed MPI_Barrier
Rank 2 has completed MPI_Barrier
```

To be able to use Podman in combination with mpirun I created a container with
the following definition:

```shell
$ cat Dockerfile
FROM registry.fedoraproject.org/fedora:30

RUN dnf -y install openmpi && \
    dnf clean all

COPY ring /home/ring
```

After building the container (`podman build --tag=mpi-test:31 .`) I pushed the
container to the [quay.io](https://quay.io) container registry (`podman push
mpi-test:31 quay.io/adrianreber/mpi-test:31`) and can now pull it like this:

```shell
$ podman pull quay.io/adrianreber/mpi-test:30
```

And then I can run mpirun to start multiple containers. In my case 4 containers
are started as each of the two involved systems has 2 CPUs:

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

Now mpirun starts up 4 Podman containers and each container is running one
instance of `ring`. All 4 processes are communicating over MPI with each other.

The following mpirun options are used:

* `--hostfile hostfile`

   The `hostfile` tells Open MPI on which systems to run how many processes.
   In the case of this example it contained:  

   `host1 slots=2`  
   `host2 slots=2`

   This means to run two processes on `host1` and two processes on `host2`.

* `--mca orte_tmpdir_base /tmp/podman-mpirun`

   This tells Open MPI to create all its temporary files in `/tmp/podman-mpirun`
   and not in `/tmp`. If this is not specified Open MPI will create its temporary
   files in a directory with a host name in it in `/tmp` and if using more than one
   node this directory will be named differently on other nodes. This requires
   mounting the complete `/tmp` directory into the container which is a bit more
   complicated due to not being able to change SELinux labels of `/tmp`.

This is it for all the necessary parameters for `mpirun`, now the command is
specified that `mpirun` should start; `podman` in this case.

* `run`

   This just tells Podman to run a container.

* `--env-host`

   This copies all environment variables from the host into the container. This
   is necessary to make Open MPI work at all. When `mpirun` is started it creates a
   daemon with which all other processes in this MPI job are communicating, it
   also tells all the MPI processes how to communicate with each other. All this
   is passed from `mpirun` to the actual MPI processes using environment variables.

   Options passed from the user to `mpirun` are also communicated through
   environment variables. Now that the MPI process in the container has all the
   environment variables it can communicate with the main process (*Head Node
   Process* (**HNP**)) and all the other involved processes.

* `-v /tmp/podman-mpirun:/tmp/podman-mpirun`

   This tells Podman to mount the directory where Open MPI creates its temporary
   directories and files to be available in the container. Through the environment
   variables from above the MPI process knows where to look for this directory.

* `--userns=keep-id`

   The user ID in the container should be mapped to the same ID on the outside of
   the container. This is necessary as all processes are communicating with each
   other over shared memory and this fails if the processes have different user
   IDs. Also the access of the temporary files in `/tmp/podman-mpirun` breaks
   without this.

* `--net=host --pid=host --ipc=host`

   Do not use separate namespace for *network*, *PID* and *IPC*. Without this nothing
   works, as all processes are also communicating via TCP on `127.0.0.1` which fails
   with separate network namespaces. Shared memory communication will also not work
   if the processes are not in the same *PID* and *IPC* namespace.

* `quay.io/adrianreber/mpi-testmpi-test:30`

   This is the name of the container as downloaded previously with `podman pull`.
   If `mpirun` will spawn processes on a host which has not yet downloaded
   this container image, Podman will do it before launching this container.

* `/home/ring`

   The MPI program in the container which should be started.

Thanks to Podman's fork-exec model it is really simple to use it in combination
with Open MPI as Open MPI will start Podman just as it would start the actual
MPI application.
