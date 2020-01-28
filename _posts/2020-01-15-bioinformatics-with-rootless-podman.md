---
title: Bioinformatics with rootless Podman
layout: default
author: bhepworth
categories: [blogs]
tags: bioinformatics, rootless, podman
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Bioinformatics with rootless podman
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

## TL;DR

Over the last 10 years I've seen machines and workflows evolve where I work. From the initial dedicated server, to hpc environments 
and now the latest instance, containers.

From an admin point of view this is great - The initial servers had to be carefully built and maintained so that everything would work nicely together. Incompatible programs at that time were run through a VM until such time as they could be folded in to the mix.

The HPC's had versioned software and environment modules and were built to load the relevant dependencies at run time.

Now we are into a new era, containers - and not just any old containers, but containers that end users can build and run up fairly 
quickly to perform what-if's, and move on quickly through iterations until they perform the required functions.

Podman has developed very rapidly and is incredibly easy to use. You can use it in conjuction with quay.io or run it on a local machine.

I should add that Adrian Reber gave a [talk](https://youtu.be/TtHSNsbU24E) and has also created a Podman [article](https://podman.io/blogs/2019/09/26/podman-in-hpc.html) using openhpc; well worth a watch and a read.

If you don't have a RedHat Developer Subscription now is an ideal time to get one:

https://developers.redhat.com/articles/getting-red-hat-developer-subscription-what-rhel-users-need-know/

..and download RedHat Enterprise 8.1

<!--readmore-->

Do a Standard RedHat GUI Server default install

```
yum update
yum module install container-tools
```
RedHat 8.1 does rootless containers right out of the box. If you created a user during the setup, it'll have the details in /etc/subuid and /etc/subgid already.

Log in with your userID and you can start creating a container
```
podman pull ubi8/ubi
podman run --interactive --tty ubi8/ubi bash
```
The first command pulls down the ubi8 Universal Base Image, which is a great building block. The second command starts an interactive ubi8 image at a bash prompt. You can run any commands you like in this:
```
[nbh23@colombo ~]$ podman run --interactive --tty ubi8/ubi bash
[root@f471459c7619 /]# cat /etc/redhat-release
Red Hat Enterprise Linux release 8.1 (Ootpa)
[root@f471459c7619 /]#

```
Notice how the prompt changed from nbh23@colombo to root@f471459c7619 - the f471459c7619 is the part to remember, we'll interact with that later on in this post. It's a random allocation, so your instance will be different.

The Podman help menu's are excellent, podman -h gives you a list of subcommands, which you can then also query:
```
[nbh23@colombo ~]$ podman -h
manage pods and images

Usage:
  podman [flags]
  podman [command]

Available Commands:
  attach      Attach to a running container
  build       Build an image using instructions from Dockerfiles
  commit      Create new image based on the changed container
  container   Manage Containers
  cp          Copy files/folders between a container and the local filesystem
  create      Create but do not start a container
  diff        Inspect changes on container's file systems
  events      Show podman events
  exec        Run a process in a running container
  export      Export container's filesystem contents as a tar archive
  generate    Generated structured data
  healthcheck Manage Healthcheck
  help        Help about any command
  history     Show history of a specified image
  image       Manage images
  images      List images in local storage
  import      Import a tarball to create a filesystem image
  info        Display podman system information
  init        Initialize one or more containers
  inspect     Display the configuration of a container or image
  kill        Kill one or more running containers with a specific signal
  load        Load an image from container archive
  login       Login to a container registry
  logout      Logout of a container registry
  logs        Fetch the logs of a container
  mount       Mount a working container's root filesystem
  pause       Pause all the processes in one or more containers
  play        Play a pod
  pod         Manage pods
  port        List port mappings or a specific mapping for the container
  ps          List containers
  pull        Pull an image from a registry
  push        Push an image to a specified destination
  restart     Restart one or more containers
  rm          Remove one or more containers
  rmi         Removes one or more images from local storage
  run         Run a command in a new container
  save        Save image to an archive
  search      Search registry for image
  start       Start one or more containers
  stats       Display a live stream of container resource usage statistics
  stop        Stop one or more containers
  system      Manage podman
  tag         Add an additional name to a local image
  top         Display the running processes of a container
  umount      Unmounts working container's root filesystem
  unpause     Unpause the processes in one or more containers
  unshare     Run a command in a modified user namespace
  varlink     Run varlink interface
  version     Display the Podman Version Information
  volume      Manage volumes
  wait        Block on one or more containers

Flags:
      --cgroup-manager string        Cgroup manager to use (cgroupfs or systemd, default systemd)
      --cni-config-dir string        Path of the configuration directory for CNI networks
      --config string                Path of a libpod config file detailing container server configuration options
      --conmon string                Path of the conmon binary
      --cpu-profile string           Path for the cpu profiling results
      --default-mounts-file string   Path to default mounts file
      --events-backend string        Events backend to use
      --help                         Help for podman
      --hooks-dir strings            Set the OCI hooks directory path (may be set multiple times)
      --log-level string             Log messages above specified level: debug, info, warn, error, fatal or panic (default "error")
      --namespace string             Set the libpod namespace, used to create separate views of the containers and pods on the system
      --network-cmd-path string      Path to the command for configuring the network
      --root string                  Path to the root directory in which data, including images, is stored
      --runroot string               Path to the 'run directory' where all state information is stored
      --runtime string               Path to the OCI-compatible binary used to run containers, default is /usr/bin/runc
      --storage-driver string        Select which storage driver is used to manage storage of images and containers (default is overlay)
      --storage-opt stringArray      Used to pass an option to the storage driver
      --syslog                       Output logging information to syslog as well as the console
      --tmpdir string                Path to the tmp directory
      --trace                        Enable opentracing output
      --version                      Version for podman

Use "podman [command] --help" for more information about a command.
[nbh23@colombo ~]$ podman image -h
Manage images

Usage:
  podman image [command]

Available Commands:
  build       Build an image using instructions from Dockerfiles
  exists      Check if an image exists in local storage
  history     Show history of a specified image
  import      Import a tarball to create a filesystem image
  inspect     Display the configuration of an image
  list        List images in local storage
  load        Load an image from container archive
  prune       Remove unused images
  pull        Pull an image from a registry
  push        Push an image to a specified destination
  rm          Removes one or more images from local storage
  save        Save image to an archive
  sign        Sign an image
  tag         Add an additional name to a local image
  tree        Prints layer hierarchy of an image in a tree format
  trust       Manage container image trust policy

[nbh23@colombo ~]$
```
We can list out the images and containers as follows, which is handy if you lose track of where you are at.
```
[nbh23@colombo ~]$ podman image list
REPOSITORY                            TAG      IMAGE ID       CREATED       SIZE
registry.access.redhat.com/ubi8/ubi   latest   096cae65a207   5 weeks ago   239 MB
[nbh23@colombo ~]$ podman container list
CONTAINER ID  IMAGE                                       COMMAND  CREATED      STATUS          PORTS  NAMES
a1fc64bd8e47  registry.access.redhat.com/ubi8/ubi:latest  bash     2 hours ago  Up 2 hours ago         zen_albattani
[nbh23@colombo ~]$
```
So we created a container to interact with, but how about creating a new image?
I found that Podman is very easy to interact with and created a Dockerfile. This is a list of commands in a text file that controls what gets installed.
Create a new directory - in this case whatshap, to put the Dockerfile in:
```
[nbh23@colombo whatshap]$ cat Dockerfile
FROM registry.access.redhat.com/ubi8/ubi
RUN yum -y update \
&& yum -y install python3 \
&& yum -y install make \
&& yum -y install gcc \
&& yum -y install redhat-rpm-config \
&& yum -y install zlib-devel \
&& yum -y install bzip2-devel \
&& yum -y install xz-devel \
&& yum -y install python3-devel \
&& yum clean all
RUN pip3 install pysam && pip3 install whatshap
```
Then we build the container image - from within the whatshap directory run:
```
podman build -t whatshap .
```
Notice the '.' at the end, that's important!

You'll see the container image start to build, with notifications of where it's at. If all goes to plan you will then finally see notification that it's completed:

```
STEP 4: COMMIT whatshap
d523727fc6c297086e84e7ec99f62e8f5e6d093d9decb1b58ee8a4205d46b3dd
```
We can then check it works:
```
[nbh23@colombo whatshap]$ podman run -it whatshap
[root@ac05564bd51b /]# whatshap -h
usage: whatshap [-h] [--version] [--debug]
                {phase,stats,compare,hapcut2vcf,unphase,haplotag,genotype} ...

positional arguments:
  {phase,stats,compare,hapcut2vcf,unphase,haplotag,genotype}
    phase               Phase variants in a VCF with the WhatsHap algorithm
    stats               Print phasing statistics of a single VCF file
    compare             Compare two or more phasings
    hapcut2vcf          Convert hapCUT output format to VCF
    unphase             Remove phasing information from a VCF file
    haplotag            Tag reads by haplotype
    genotype            Genotype variants

optional arguments:
  -h, --help            show this help message and exit
  --version             show program's version number and exit
  --debug               Print debug messages
[root@ac05564bd51b /]#
```
Which all looks good - we now have our container image and can re-run that to do our whatshap analysis.

All well and good, but what happens about storage of that analysis?

We can add that to our Podman command, if we have a directory called data in /home we can map that as follows:
```
podman run -v /home/nbh23/data:/home/nbh23:z -it whatshap
```
The nice thing is that the UID and GID for files created this way all match up. The trailing :z makes selinux happy :-)
```
[nbh23@colombo whatshap]$ podman run -v /home/nbh23/data:/home/nbh23:z -it whatshap
[root@fef561d523b8 /]# ls
bin  boot  dev  etc  home  lib  lib64  lost+found  media  mnt  opt  proc  root  run  sbin  srv  sys  tmp  usr  var
[root@fef561d523b8 /]# cd /home
[root@fef561d523b8 home]# ls
nbh23
[root@fef561d523b8 home]# cd nbh23
[root@fef561d523b8 nbh23]# touch testfile
[root@fef561d523b8 nbh23]# ls -la
total 0
drwxrwxr-x. 2 root root 22 Jan 21 09:09 .
drwxr-xr-x. 3 root root 19 Jan 21 09:09 ..
-rw-r--r--. 1 root root  0 Jan 21 09:09 testfile
[root@fef561d523b8 nbh23]# exit
[nbh23@colombo ~]$ ls
Containers  data  Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos
[nbh23@colombo ~]$ cd data
[nbh23@colombo data]$ ls -la
total 4
drwxrwxr-x.  2 nbh23 nbh23   22 Jan 21 09:09 .
drwx------. 17 nbh23 nbh23 4096 Jan 21 09:07 ..
-rw-r--r--.  1 nbh23 nbh23    0 Jan 21 09:09 testfile
[nbh23@colombo data]$
```
One of the things I discovered whilst creating a more complex container image was that you can start the existing image into a bash session, doing the manipulation that you require, and then use the Podman commit command to write those changes.
For example using our whatshap container image we can run it as follows:
```
[nbh23@colombo data]$ podman run -it whatshap bash
[root@73c4742e4724 /]#
```
We can then make our alterations, and from another session commit those changes:
```
[nbh23@colombo ~]$ podman commit 73c4742e4724 whatshap-altered
Getting image source signatures
Copying blob c630f5c3e169 skipped: already exists
Copying blob 4bd7408cc1c8 skipped: already exists
Copying blob 1383f0e3c813 skipped: already exists
Copying blob a2ff5e229058 skipped: already exists
Copying blob b75bf3e68dab done
Copying config 931b7f5302 done
Writing manifest to image destination
Storing signatures
931b7f5302af9965bff14e460c19ff9e756d74095940c6d85e63f929006c35f0
[nbh23@colombo ~]$
```
Then do podman image list to see what we have:
```
[nbh23@colombo ~]$ podman image list
REPOSITORY                            TAG      IMAGE ID       CREATED              SIZE
localhost/whatshap-altered            latest   931b7f5302af   About a minute ago   545 MB
localhost/whatshap                    latest   d523727fc6c2   3 days ago           545 MB
registry.access.redhat.com/ubi8/ubi   latest   096cae65a207   5 weeks ago          239
[nbh23@colombo ~]$
```
You can make multiple changes to your original container image until you are satisfied that it's working as you'd like.

This has covered command line container image creation and usage, I'll be creating another blog post detailing graphical interactive containers as i'm aware that there are various interactive visual programs to cover too.

Feel free to contact me with any ideas or suggestions / questions.
