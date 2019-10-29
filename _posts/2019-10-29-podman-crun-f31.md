---
title: First Look&#58; Rootless Containers and cgroup v2 on Fedora 31 
layout: default
author: tsweeney
categories: [blogs]
tags: podman, containers, hpc, rootless, crun
---

![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# First Look&#58; Rootless Containers and cgroup v2 on Fedora 31
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

I often times stay up too late at night watching late night television and run into these crazy commercials that tell you how easy their product is to use.   If you’ve stayed up too, you know them as well.  Just put your chicken and veggies in our oven, press 3 buttons and 45 minutes later a perfectly cooked meal!   Easy!   Got a leak?  Slap on this tape and no more leak!  Easy!   Got a messy floor, just use this sweeper and you’ve the cleanest floor in the neighborhood!  Easy!

Podman runs secure rootless containers and it really is easy!  Trust me, I’m not like those other folks!  As we’ve had a number of people asking us about what’s needed to set Podman rootless containers up, I decided to run through the process myself and to blog about the steps I took.

<!--readmore-->

The first bit of the work has to be done as either the root user or someone with root privileges.  For this walkthrough I used the root user on the console and the first thing I did was to upgrade my Fedora 30 Virtual Machine (VM) to Fedora 31.  If you want to install Fedora 31 directly, the beta version just became available at the time of this writing, you could do that instead.  The steps to do the upgrade are: 

```
# dnf -y upgrade --refresh  
# dnf -y install dnf-plugin-system-upgrade  
# dnf -y system-upgrade download --releasever=31 
# dnf system-upgrade reboot
```

After the machine finished rebooting, my VM was running Fedora 31 so now I needed to install Podman with `dnf -y install podman`.  After that completes, verify that you have Podman Version 1.6.2 or higher.

```
# podman version
Version:            1.6.2
RemoteAPI Version:  1
Go Version:         go1.13.1
OS/Arch:            linux/amd64
````

Now  I’m going to follow the steps in the [Basic Setup and Use of Podman in a Rootless environments](https://github.com/containers/libpod/blob/master/docs/tutorials/rootless_tutorial.md) tutorial to do the configuration necessary to run rootless containers.  

Podman running rootless containers does have a few software dependencies.  Most if not all of these should be installed for you on Fedora 31 by default, but just to verify I did:

```
# dnf -y install slirp4netns fuse-overlayfs 
Last metadata expiration check: 0:02:26 ago on Sat 14 Sep 2019 07:56:03 PM EDT.
Package slirp4netns-0.4.0-20.1.dev.gitbbd6f25.fc31.x86_64 is already installed.
Package fuse-overlayfs-0.6.2-2.git67a4afe.fc31.x86_64 is already installed.
Dependencies resolved.
Nothing to do.
Complete!
```

Now the user namespaces need to be setup.    Rootless Podman requires the user running it to have a range of UIDs and GIDs listed in the /etc/subuid and /etc/subgid files.  These files control which UIDs and GIDs the user is allocated to use on the system.  Depending upon how your user was first created, these files may already have entries in them for your user.  If so, you don’t need to do anything else.  If not, then you can edit either file directly, or you can use `useradd` to create the user and allocate entries in both files, or you can use the `usermod` command to allocate them for a preexisting user.  In this example usermod has allocated the values from 10000 to 55537 for the local “tom” account to use in our system.

```
# usermod -v 10000-65536 -w 10000-65536 tom

# cat /etc/subuid
tom:10000:55537

# cat /etc/subgid
tom:10000:55537
```  
If you have multiple users, you’ll need to be sure that the ranges that are assigned to them in either `/etc/subuid` or `/etc/subgid` don’t overlap or they could gain control of the other persons containers in that overlap.

Now we’re done running with a privileged account.  From here on out we can run as a non-privileged user, so I next opened up a new terminal and ssh’d into the host using the non-privileged ‘tom’ account: 

```
$ ssh tom@192.168.122.228
tom@192.168.122.228's password:
```

The first thing to do is to check for the `crun` command.  
```
# whereis crun
crun: /usr/bin/crun /usr/share/man/man1/crun.1.gz
```

The `crun` command is the runtime the allows for cgroup V2 support and is supplied starting with Fedora 31.  Other container systems use the `runc` runtime.  However, runc only supports cgroup V1.  The cgroup kernel feature allows you to allocate resources such as CPU time, network bandwidth and system memory to a container.  Version 1 of cgroup only supports containers that are run by root, while version 2 supports containers that are run by root or a non-privileged user.  

A few tweaks to the ‘tom’ account config files may be needed, in most cases these files will not need tweaking, but let’s verify them.  The first up is libpod.conf and to get a default variant of that file, just run `podman info` first.

```
$ podman info
$ vi .config/containers/libpod.conf
```

And if it’s not already set, set the `runtime` option in libpod.conf to “crun”.
```
runtime = "crun"
```

Then in `.config/containers/storage.conf` make sure the `mount_program = “/usr/bin/fuse-overlayfs”` line is uncommented.

Just that easy, you’re ready to run Rootless Podman.  See I told you I’m not like those other guys!  Let’s try setting up a rootless container running httpd.  Let’s create this Dockerfile in the local directory:

```
$ cat Dockerfile
FROM registry.access.redhat.com/ubi8/ubi:8.0

MAINTAINER Podman Mailing List <podman@lists.podman.io>
ENV DOCROOT=/var/www/html

RUN yum --disableplugin=subscription-manager --nodocs -y install httpd \
  && yum --disableplugin=subscription-manager clean all \
  && echo "Hello from the httpd-parent container!" > ${DOCROOT}/index.html

EXPOSE 80

CMD httpd -D FOREGROUND
```

And now build using it:
```
$  podman build -t myhttp .
STEP 1: FROM registry.access.redhat.com/ubi8/ubi:8.0
Getting image source signatures
Copying blob 641d7cc5cbc4 done
Copying blob c65691897a4d done
Copying config 11f9dba4d1 done
Writing manifest to image destination
Storing signatures
STEP 2: MAINTAINER Podman Mailing List <podman@lists.podman.io>
bed974e664909b511f14e2cc21a59642c81fd1d958db12d7ef8fdc1e74f3d364
STEP 3: ENV DOCROOT=/var/www/html
5eee83e1e640a4aa2c5f39caa11c3a24ec22e37f99633c2ee9912e8f65a5ff81
STEP 4: RUN yum --disableplugin=subscription-manager --nodocs -y install httpd   && yum --disableplugin=subscription-manager clean all   && echo "Hello from the httpd-parent container!" > ${DOCROOT}/index.html
Red Hat Universal Base Image 8 (RPMs) - AppStre 1.0 MB/s | 2.3 MB     00:02    
Red Hat Universal Base Image 8 (RPMs) - BaseOS  769 kB/s | 754 kB     00:00    
Dependencies resolved.
{A number of normal yum output lines removed for brevity}
Installed:
  httpd-2.4.37-12.module+el8.0.0+4096+eb40e6da.x86_64                           
  apr-util-openssl-1.6.1-6.el8.x86_64                                           
  apr-util-bdb-1.6.1-6.el8.x86_64                                               
  apr-1.6.3-9.el8.x86_64                                                        
  apr-util-1.6.1-6.el8.x86_64                                                   
  httpd-tools-2.4.37-12.module+el8.0.0+4096+eb40e6da.x86_64                     
  mod_http2-1.11.3-3.module+el8.0.0+4096+eb40e6da.x86_64                        
  httpd-filesystem-2.4.37-12.module+el8.0.0+4096+eb40e6da.noarch                
  mailcap-2.1.48-3.el8.noarch                                                   
  redhat-logos-httpd-80.7-1.el8.noarch                                          

Complete!
16 files removed
45fcaaf719615e97190bf38aa9d8d06e5437f0e10741343fd318777647584d6f
STEP 5: EXPOSE 80
865abb5a809cb0ffbc63fef2def892595fe54cfeffc67013a0096a5f0fff4b27
STEP 6: CMD httpd -D FOREGROUND
STEP 7: COMMIT myhttp
f8d0bf10faa0460a111283a51d95e94421d1a46a21bca7f6f43a762469504593
```

Now to verify the myhttp image has been created:
```
$ podman images
REPOSITORY                            TAG      IMAGE ID       CREATED         SIZE
localhost/myhttp                      latest   a76baf5989a3   2 minutes ago   236 MB
registry.access.redhat.com/ubi8/ubi   8.0      11f9dba4d1bc   5 weeks ago     216 MB
```

Let’s now run our container and check that the http server is responding:
```
$ podman run --detach --name myhttp_ctr localhost/myhttp 30d8b54f63c5d2a8ecbe30b56546082e32e701a87c98df81ee0d2565ed33db72
$ curl localhost
curl: (7) Failed to connect to localhost port 80: Connection refused
```

But wait!  Why did the curl command fail rather than return our index.html output from our webserver?  That’s because we’re running a rootless container and the user running this container doesn’t have the privilege to connect to the container host’s port 80 for the webserver.  So how can we be certain that the webserver is up and running?  First let’s see if the container is up:

```
$ podman ps
CONTAINER ID  IMAGE                    COMMAND               CREATED        STATUS            PORTS  NAMES
30d8b54f63c5  localhost/myhttp:latest  /bin/sh -c httpd ...  3 minutes ago  Up 3 minutes ago         myhttp_ctr
```

The container appears to be up and running.  Let’s exec into it and see if we can resolve the web server from inside of the container:

```
$ podman exec -it myhttp_ctr /bin/bash
bash-4.4# curl localhost
Hello from the httpd-parent container!
```

We’ve made contact with our web server from within the container.  Granted this is not the most useful example from a real world side of things. However, it does show how a rootless container is able to run while the administrator of the host can build a good secure separation from the rootless container.  Rootless containers  keep unprivileged users  from running or controlling things they should not on the host.

Setting up a host to run rootless containers using Podman is a relatively painless process.  Out of the box the only thing that may need to be done is to add entries in the  /etc/subuid and /etc/subgid files for users that will be running containers.  That’s it!  We did a little more checking on the files above, but that wasn’t required.  Once the user has those entries created for them, they can run containers in their own space without controlling things on the host that they should not.  It really is just that easy, and best yet, you didn’t even have to stay up late at night so you could call now “For just $19.99 we’ll give you rootless containers and if you sign up now, you can run them safely too!”.  Instead, rootless containers are there and ready for your use starting in Podman v1.6.2 right now.  
