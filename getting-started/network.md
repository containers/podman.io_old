---
layout: default
title: Podman Network
---

# Networking

In Podman, you will see differences in networking between rootless and rootfull
containers. This guide will help to understand how networking can be used in
Podman.

## Podman pods

By definition, all containers in the same Podman pod share the same network
namespace. Therefore, the containers will share the IP Address, MAC Addresses and
port mappings. You can always communicate between containers in the same pod,
using localhost.

## Rootless Networking

When using Podman as a rootless user, the network is setup automatically. The
container itself does not have an IP Address, because without root privileges,
network association is not allowed. You will also see some other limitations.

### Publishing Ports

Port publishing as rootless containers can be done for "high ports" only. All
ports below 1024 are privileged and cannot be used for publishing.

Instead of:

```console
$ podman run -dt -p 80:8080/tcp registry.fedoraproject.org/f29/httpd
```

you want to use:

```console
$ podman run -dt -p 8080:8080/tcp registry.fedoraproject.org/f29/httpd
```

**Note**: You can also use `podman -P` to automatically publish and map ports.

### Container <-> Host Communication

If you want to reach a rootless container from your localhost, you can use port
publishing (as in the example above).

You can check the ports published and occupied:

```console
$ podman port -l
8080/tcp -> 0.0.0.0:8080
```

**Note**: The `-l` is a convenience argument for **latest container**. You can
also use the container's ID or name instead of `-l` or the long argument
`--latest`.

### Container <-> Container Communication

Communicating between two rootless containers can be achieved in mutiple ways.
The easiest and most convenient way is to communicate via published ports and
the underlying host.

Check, if a "listening" container is running:

```console
$ podman ps
```

Check the published ports:

```console
$ podman port <container_id>
```

Check the address of your host:

```console
$ ip addr
```

Start a new container to contact your host + the published port:

```console
$ podman run -it --rm fedora curl <Host_IP_Address>:<Published_Port>
```

## Rootfull Networking

This section describes how networking can be used in rootfull containers.

### Publishing Ports

Port publishing works the same way as rootless containers, but you will be able
to use privileged ports, as long as they are free.

```console
$ sudo podman run -dt -p 80:8080/tcp registry.fedoraproject.org/f29/httpd
```

**Note**: You can also use `podman -P` to automatically publish and map ports.

### Container <-> Host Communication

Rootfull containers are reachable via their published ports.

You can check which ports are published:

```console
$ sudo podman port -l
8080/tcp -> 0.0.0.0:80
```

And you should be able to reach the website from your local machine:

```console
$ curl localhost
```

### Container <-> Container Communication

Rootfull containers can communicate via their IP Address in the same network.

```console
$ sudo podman inspect <container_id> | grep IPAddress
            "IPAddress": "10.88.0.83",
```

```console
$ sudo podman run -it --rm fedora curl <Container_IP_Address>:<Container_Port>
```

### Configuring Networking

The installation of Podman provides a default network configuration commonly
installed in `/etc/cni/net.d/` as `87-podman-bridge.conflist`. The default
network name is defined in `/usr/share/containers/libpod.conf`. If you want to
change the default network, you should copy the `libpod.conf` to
`/etc/containers/libpod.conf` and change the new file.

To create a new network, you can use the `podman network create` command, which
will create a new file in `/etc/cni/net.d/`.

### Using DNS in Container Networks

Podman provides a convenient way to allocate local DNS records to containers
via the [dnsname plugin](https://github.com/containers/dnsname). This can become
handy, if you want to communicate between 2 or more containers.

The feature will be automatically enabled for newly created networks via
`podman network create`. If you want to add this feature to the default
network, you can either create a new network and make it default or add the
needed lines to `cat /etc/cni/net.d/87-podman-bridge.conflist` - a reboot may
be required.

```
{
  ...

  "plugins": [

    ...

    {
      "type": "dnsname",
      "domainName": "example.com"
    }
  ]
}
```
