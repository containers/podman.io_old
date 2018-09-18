---
title: Python3 support for Podman
layout: default
author: Jhon Honce
categories: [blogs]
tags: podman, containers
---

![podman logo](../images/podman.svg)

## to the rescue…

You’ve learned of Podman and all it’s coolness for running OCI-based containers, but you need a solution that is repeatable and scripted. Rather than just executing Podman commands, you want a stable API to call into and not need to screen scrape the output.

We heard you and now provide a Python package, python3-podman. This package allows you to access the facilities of a Podman service with #nobigfatdaemons.

<!--readmore-->
The python3-podman package containers a module that allows you to connect to a Podman socket activated systemd service on the same host or a remote host using a ssh tunnel. Using the python interface means you can run these commands from a MAC or Windows Box, as long as you have a Linux box with podman installed. We connect using *varlink* for the messaging protocol between client and service.

For the environment, you will need:

    * Linux host
    * podman package
    * enable the io.podman.socket systemd unit file by executing

systemctl enable --now io.podman.socket

    * Python3
    * The python3-podman rpm, or podman package from PyPi.

*Note: Currently, there is a matching rpm for each version of podman. In time, after the API stabilizes that may no longer be true.*

## Now lets start coding:

Using your favorite code editor you can copy and paste the following Python program into a file named latest_containers.py. Don’t forget Python uses whitespace to signify end-of-line and code blocks when you paste. The below python code will show all of the containers created since midnight UTC when it is run. The code comments provide a running commentary on how the module works in context.

```console
#!/usr/bin/env python3

# Python standard date/time support
from datetime import datetime, time, timezone

# the module with all the goodness
import podman

midnight = datetime.combine(datetime.today(), time.min, tzinfo=timezone.utc)

# Our client is a context manager to make resource clean up easy. No arguments implies
#   connect to a local Podman service using the default interfaces.
with podman.Client() as client:

    # Retrieve all containers in containers storage.  Each container is presented
    #   as a Namespace and dict. You determine which is easiest for you to use
    #   for your solution.
    for c in client.containers.list():

	 # A bit of sugar, convert any podman-formatted timestamp to
        #   a python datetime
        created_at = podman.datetime_parse(c.createdat)

        if created_at > midnight:

            # Now the results. We provide datetime_format() for consistent
	     #   iso format in results if you wish to use it.
            print('ID: {}\n image: {}\n createdAt: {}'.format(
c.id[:12], c.image[:33], podman.datetime_format(created_at)))
```

Once you have this code copied into the file:

    * chmod 755 latest_containers.py
    * podman run fedora sleep 300 &
    * ./latest_containers.py

```console
ID: d7337530c6d1
 image: registry.fedoraproject.org/fedora
 createdAt: 2018–08–10T09:18:09.728858–07:00
```

You can watch the whole process [here](https://asciinema.org/a/mu8Knm5dj8mII19evrF9heNCF].

The container object above supports the Namespace and dict protocols. This is our most used data structure providing you the ability to use the returned object in your code as you wish.

Connecting to a remote host, requires only changing how you create the Client() in any script:

```console
With podman.Client(uri='unix:/run/user/17945/podman/io.podman',
remote_uri='ssh://ruser@podman.example.com:22/run/podman/io.podman') as client:
```

    * uri provides the local side of the ssh tunnel
    * user is your username
    * remote_uri provides the details needed to connect to the remote host, plus the socket file for podman. A complete ssh uri is supported to allow configuration of ports etc.
    * ruser is the remote host username to be used for authentication
    * podman.example.com is the FQDN of the host you are running the podman service on
    * The port number of 22 is given above for completeness, that is the default and may be omitted.
    * An identity file may be provided via identity_file, otherwise the podman library will defer to ssh for authenticating.

All other function and method calls are the same whether they are remote or local. Note: all filesystem paths are resolved on the host running the podman service not the podman client.

## But wait there is more!

To iterate over all the images stored on the system, you only need to change containers to images like:

```console
for i in client.images.list():
```

To find podman system information, you need to use: `client.system.info()`. Or, `client.system.versions()` if you need to know the release of the podman service components.

To determine if the podman service is available and working, `client.system.ping()` will return `True` if everything is working correctly.

One of the most complex operations is creating a new container from an image, the workflow:

    * Pull image from registry
    * Instantiate image object
    * Set container options
    * Create OCI container and object

```console
with podman.Client() as client:
 ident = client.images.pull(name)
 img = client.images.get(ident)
opts = {
 'memory': '1G',
 'memory-reservation': '750M',
 'Memory-swap': '1.5G',
 }
ctnr = img.container(**opts)
```

Our calling pattern is “client.<model>.<method>(<options>)”, where the current models are:

    * Images
    * Containers
    * System

The Podman man pages provide details on the methods and options to be used for each.

What’s been shown in this blog is how easy it is to use the Python module to do Podman commands from your Linux host. These bindings can be used on the same host that Podman is running on, or they could be used on a remote host. Although there is not a complete one to one correspondence between the Podman commands and the ones available via the Python bindings — yet, the end goal for this project is to get to that point. For instance the commands for interacting with pods are currently under development and when available, the Python module will be updated to allow access. In addition to that, there’s work underway to make this Python module available on MacOS and Windows via PyPi. When these ports go live, you will be able to interact with Podman service from any Linux, MacOS or Windows host.

I hope you have found the information in this blog to be useful and gives you further insight into Podman and this Python module. If you have any questions a great place to ask them is the IRC channel *#podman* on *FREENODE*.

Better yet if you’d like to help contribute to Podman or this Python module, please feel free to join us on GitHub!

[https://github.com/containers/libpod](https://github.com/containers/libpod)
[https://github.com/containers/libpod/tree/master/contrib/python](https://github.com/containers/libpod/tree/master/contrib/python)
