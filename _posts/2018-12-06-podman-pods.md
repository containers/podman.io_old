---
title: Podman and pods
layout: default
author: baude
categories: [blogs]
tags: podman, containers
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Podman and pods
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Did you know that Podman supports running containers in Pods? It makes perfect sense given the name `Podman`.  But I think people
who run in a localized container runtime do not even think about the role pods could play. Other than using pods to naturally
group your containers, there are good reasons to consider pods locally.  For example, suppose you have multiple containers that require
the use of a MariaDB container.  But you would prefer to not bind that database to a routable network; either in your bridge or further.  Using a pod, you could bind to the `locahost` address of the pod and all containers in that pod will be able to connect to it because of the shared network name space.

<!--readmore-->

### Podman Pods: what you need to know
I think most people derive their definition of a Pod from the use of Kubernetes.  Podman pods are similar to this
definition.  Podman pods by default have an "infra" container.  The default infra container is based on the `k8s.gcr.io/pause` image.  Unless you explicitly say otherwise, all pods will have container based on the default image.  Many of the attributes that make up the Pod are actually assigned to the "infra" container as well.  This includes port bindings, cgroup-parent values, and kernel namespaces.  This is important to know because once the pod is created, these attributes are assigned to the "infra" container and cannot be changed.  So for example, if you create a pod and then later decide you want to add a container that binds new ports, Podman will not be able to do this.  You will need to recreate the pod with the additional port bindings before adding the new container.

### The CLI: podman pod
We expose most of the interaction with pods through the `podman pod` commands.  Among other actions, you can use `podman pod` to create, delete, query, and inspect pods.
```
$ sudo podman pod
NAME:
   podman pod - Manage container pods.

Pods are a group of one or more containers sharing the same network, pid and ipc namespaces.


USAGE:
   podman pod command [command options] [arguments...]

COMMANDS:
     create        Create a new empty pod
     exists        Check if a pod exists in local storage
     inspect       displays a pod configuration
     kill          Send the specified signal or SIGKILL to containers in pod
     pause         Pause one or more pods
     ps, ls, list  List pods
     restart       Restart one or more pods
     rm            Remove one or more pods
     start         Start one or more pods
     stats         Display percentage of CPU, memory, network I/O, block I/O and PIDs for containers in one or more pods
     stop          Stop one or more pods
     top           Display the running processes of containers in a pod
     unpause       Unpause one or more pods

OPTIONS:
   --help, -h  show help
```

### Create a pod
The tradition way to create a pod in Podman is using the `podman pod create` command.

```
$ sudo podman pod create --help
NAME:
   podman pod create - Create a new empty pod

USAGE:
   podman pod create [command options] [arguments...]

DESCRIPTION:
   Creates a new empty pod. The pod ID is then printed to stdout. You can then start it at any time with the podman pod start <pod_id> command. The pod will be created with the initial state 'created'.

OPTIONS:
   --cgroup-parent value      Set parent cgroup for the pod
   --infra                    Create an infra container associated with the pod to share namespaces with
   --infra-command value      The command to run on the infra container when the pod is started (default: "/pause")
   --infra-image value        The image of the infra container to associate with the pod (default: "k8s.gcr.io/pause:3.1")
   --label value, -l value    Set metadata on pod (default [])
   --label-file value         Read in a line delimited file of labels (default [])
   --name value, -n value     Assign a name to the pod
   --pod-id-file value        Write the pod ID to the file
   --publish value, -p value  Publish a container's port, or a range of ports, to the host (default [])
   --share value              A comma delimited list of kernel namespaces the pod will share (default: "cgroup,ipc,net,uts")
```
In its most basic context, you can simply issue `podman pod create` and Podman will create a pod without an extra attributes.  A random name will also be assigned.

```
$ sudo podman pod create
9e0a57248aedc453e7b466d73ef769c99e35d265d97f6fa287442083246f3762
```
We can list the pods using the `podman pod ps` command:
```
$ sudo podman pod ps
POD ID         NAME             STATUS    CREATED         # OF CONTAINERS   INFRA ID
9e0a57248aed   youthful_jones   Running   5 seconds ago   1                 6074ffd22b93
```
Note that the container has a single container in it.  The container is the "infra" command.  We can further observe this using the `podman ps` command by passing the command line switch *--pod*.

```
$ sudo podman ps -a --pod
CONTAINER ID  IMAGE                 COMMAND  CREATED        STATUS            PORTS  NAMES               POD
6074ffd22b93  k8s.gcr.io/pause:3.1           3 minutes ago  Up 3 minutes ago         9e0a57248aed-infra  9e0a57248aed
```

Here we can see that the pod ID from `podman ps` matches the pod id in `podman pod ps`.  And the container image is he same as the default "infra" container image.

### Add a container to a pod

You can add a container to pod using the *--pod* switch in the `podman create` and `podman run` commands.  For example, here we add a container running **top** to the newly created *youthful_jones* pod. Notice the use of *--pod*.
```
$ sudo podman run -dt --pod youthful_jones docker.io/library/alpine:latest top
0f62e6dcdfdbf3921a7d73353582fa56a545502c89f0dfcb8736ce7be61c9271
```
And now two containers exist in our pod.
```
$ sudo podman pod ps
POD ID         NAME             STATUS    CREATED         # OF CONTAINERS   INFRA ID
9e0a57248aed   youthful_jones   Running   7 minutes ago   2                 6074ffd22b93
```
Looking at the list of containers, we also see each container and their respective pod assignment.
```
$ sudo podman ps -a --pod
CONTAINER ID  IMAGE                            COMMAND  CREATED         STATUS             PORTS  NAMES               POD
0f62e6dcdfdb  docker.io/library/alpine:latest  top      14 seconds ago  Up 14 seconds ago         awesome_archimedes  9e0a57248aed
6074ffd22b93  k8s.gcr.io/pause:3.1                      7 minutes ago   Up 7 minutes ago          9e0a57248aed-infra  9e0a57248aed
```

### Shortcut to create a pods
We recently added the ability to create pods via the `podman run` and `podman create` commands. One upside to creating a pod with this approach is that the normal port bindings declared for the container will be assigned automatically to the "infra" container. However, if you need to specific more granular options for pod creation like kernel namespaces or different "infra" container image usage, you still need to create the pod manually as was first described. Nevertheless, for relatively basic pod creations, the short is handy.

To create a new pod with your new container, you simply pass the following to the *--pod*: `new:<name>`.  The use of **new:** indicates to Podman that you want to create a new pod rather than attempt to assign the container to an existing pod.

To create a nginx container within a pod and expose port 80 from the container to port 32597 on the host, you would:
```
$ sudo podman run -dt --pod new:nginx -p 32597:80 quay.io/libpod/alpine_nginx:latest
ac8839fc7dead8e391e7983ad8d0c27ce311d190b0a8eb72dcde535de272d537
$ curl http://localhost:32597
podman rulez
```

And here is what it looks like when listing containers:
```
$ sudo podman ps -ap
CONTAINER ID  IMAGE                               COMMAND               CREATED        STATUS            PORTS                  NAMES               POD
ac8839fc7dea  quay.io/libpod/alpine_nginx:latest  nginx -g daemon o...  4 minutes ago  Up 4 minutes ago                         happy_cray          3e4cad88f8c2
c2f7c5651275  k8s.gcr.io/pause:3.1                                      4 minutes ago  Up 4 minutes ago  0.0.0.0:32597->80/tcp  3e4cad88f8c2-infra  3e4cad88f8c2
```

### MariaDB example
The following asciinema demo shows how to create a pod via the shortcut.  The container being run is a MariaDB container image and I bind only to its 127.0.0.1.  This means only pods in the same pod will able to access it. I then run an alpine container, install the MariaDB-client package, connect to the database itself, and show defined databases.

[![asciicast](https://asciinema.org/a/Xc818xXZ7TAlP9yvHU88IPVBK.svg)](https://asciinema.org/a/Xc818xXZ7TAlP9yvHU88IPVBK)
