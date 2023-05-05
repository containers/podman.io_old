---
layout: default
title: Podman Checkpoint
---

# Checkpointing

Checkpoints currently work with root containers only. Therefore, you have to
run the example container as root. Instead of prefixing each command with
`sudo`, you can also switch to the root user beforehand via `sudo -i`.

```console
$ sudo podman run -dt -p 8080:80/tcp docker.io/library/httpd
$ sudo podman ps
```

## Checkpointing the container

Checkpointing a container stops the container while writing the state of all
processes in the container to disk. With this a container can later be restored
and continue running at exactly the same point in time as the checkpoint.
This capability requires [CRIU 3.11]( https://www.criu.org/) or later installed
on the system.

To checkpoint the container use:

```console
$ sudo podman container checkpoint <container_id>
```

## Restoring the container

Restoring a container is only possible from a previously checkpointed container.
The restored container will continue to run at exactly the same point in time it
was checkpointed.

To restore the container use:

```console
$ sudo podman container restore <container_id>
```

After being restored, the container will answer requests again as it did before
checkpointing.

```console
$ curl http://<IP_address>:8080
```

## Migrating the container

To live migrate a container from one host to another the container is
checkpointed on the source system of the migration, transferred to the
destination system and then restored on the destination system. When
transferring the checkpoint, it is possible to specify an output-file.

On the source system:

```console
$ sudo podman container checkpoint <container_id> -e /tmp/checkpoint.tar.gz
$ scp /tmp/checkpoint.tar.gz <destination_system>:/tmp
```

On the destination system:

```console
$ sudo podman container restore -i /tmp/checkpoint.tar.gz
```

After being restored, the container will answer requests again as it did before
checkpointing. This time the container will continue to run on the destination
system.

```console
$ curl http://<IP_address>:8080
```
