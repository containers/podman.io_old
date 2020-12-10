---
title: Using Podman and Systemd to manage container lifecycle
layout: default
author: ehaynes
categories: [blogs]
tags: containers, podman, api, kubernetes, linux
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Using Podman and Systemd to manage container lifecycle
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

My background is in industrial automation, and in most cases, the edge devices in the factory are too underpowered to run Kubernetes as a method to manage the lifecycle of containers. The workloads have a very long lifecycle, and generally are "tied" to the edge device. There is a lot of value in containerizing applications on these edge devices, however, as it decouples the application dependencies from the OS and provides a level of isolation between applications. This demo will show how using Podman in conjunction with systemd provides an elegant solution for this sort of use case. In addition, this will be done as a "rootless" user - a key benefit of Podman that helps keep the device secure.
<!--readmore-->

For my demo, I used a minimal Fedora33 install with Podman installed. To simplify my lifecycle (which in industrial can be 10+ years) I want to keep the base OS as minimal and clean as possible and keep all application dependencies in the containers. I will be creating a redis in-memory keystore database as my containerized application and use the "podman generate systemd" utility to generate the systemd unit file. This file lets systemd know what your policies are for your application - whether it should start at boot or restart when it fails. In my case I want my application available at boot and also want it to restart in case of failure. I enable and start the systemd service with the --user flag, again I don't want root access for security reasons on this device.

I provide a test script to test the redis container API. While I could have installed the redis-cli on my base Fedora33 OS to do this testing this would violate my desire to keep the base OS as minimal as possible. I pass values to the redis container's port via "nc" to set a key index of "frog" to 56. I then show via getting that index that the value is properly set. Now for the interesting part. I use pkill to kill the redis database and then show how systemd restarts the failed container. You can also reboot the OS and find your application running at startup.

To tidy things up I provide a cleanup script which stops the service and cleans up the container so you can start the demo from the top if you like.

To run this demo yourself (I've tested on Fedora33, Red Hat 8.3, and Ubuntu 20.10) ensure Podman and git are installed on your OS

Also remember this is all done as a standard user - no root!

git clone https://github.com/edhaynes/podman_systemd_usermode_demo.git

```console
cd podman_systemd_usermode_demo

./launch_redis_container.sh
```

"launch_redis_container.sh" launches redis container, adds usermode systemd entry, enables and starts it. You will need to hit "q" to get out of the shown status.

You should see something like:
```console
redis_server.service - Podman container-redis_ Loaded: loaded

 Active: active (running) since Wed 2020-12-09 09:22:40 EST; 1h 58min ago
 ```
Now that redis is running you can run the test script that sets a key value, retrieves it, and then kills the redis container. Systemd will then restart the container and you can see all is working again. Do this with:

```console
./test_redis_container.sh
```

Once you are done experimenting with it you can run the cleanup script to stop the systemd service, remove it and stop / remove the container.

```console
./cleanup.sh
```

Hope you enjoyed this demo and any comments or suggestions please make them in the [GitHub](https://github.com/edhaynes/podman_systemd_usermode_demo.git) repository.
