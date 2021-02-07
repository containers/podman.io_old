---
title: Easy Development Dependency Management With Podman and Tent
layout: default
author: fhsinchy
categories: [blogs]
tags: <your tags here>
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Easy Development Dependency Management With Podman and Tent
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

Installing and managing development dependencies for various project is a chore and one thing that can improve your everyday workflow is the usage of containers.

[Tent](https://github.com/fhsinchy/tent/) is a CLI tool for running development dependencies such as MySQL, Mongo, ElasticSearch etc inside pre-configured containers using simple one-liners.

Running containers can be accessed via their exposed ports and can be paired with any other application on your system.

Starting a service such as `mysql` is as simple as executing `tent start mysql` and you'll never have to look back at it.

But `mysql` is not the only available service. A list of all the available services can be found on: [services.go](https://github.com/fhsinchy/tent/blob/master/store/services.go)

Tent is heavily inspired from [tighten/takeout](https://github.com/tighten/takeout) and is an experimental project. Hence, care should be taken if you're using it in a critical environment.

## Dependencies

* Linux
* [Podman](https://podman.io/getting-started/installation) Installed
* Podman System Service Running

If you have Podman installed, you can start the system service as follows:

```bash
## starts the podman system service
systemctl --user start podman.socket

## enables the podman system service, so it doesn't close on every reboot
systemctl --user enable podman.socket

## stops the podman system service
systemctl --user stop podman.socket

## disables the podman system service, so it doesn't start on every reboot
systemctl --user disable podman.socket
```

Tent assumes that you're running the service in non-root mode, hence the `--user` argument is necessary in the above commands.

## Installation

Visit the [tent release page](https://github.com/fhsinchy/tent/releases/) and download the `tent` binary to your computer. Open up your terminal where you've donwloaded the file and execute following commands:

```bash
chmod +x ./tent

sudo mv ./tent /usr/local/bin
```

Now the `tent` command should be available everywhere in your system.

## Build From Source

If you're on a Fedora system, the following command should install the necessary development dependencies.

```bash
sudo dnf groupinstall "Development Tools" -y && sudo dnf install golang btrfs-progs-devel gpgme-devel device-mapper-devel -y
```

And on a Ubuntu system, the following command should install the necessary development dependencies.

```bash
sudo apt install build-essential golang-go libbtrfs-dev libgpgme-dev libdevmapper-dev -y
```

If you're on a different system you, may look for equivalent package on the respective package repositories.

Now build and install the application as follows:

```bash
git clone https://github.com/fhsinchy/tent.git ~/tent

cd ~/tent

make install
```

## Usage

The `tent` binary has following commands:

* `tent start <service name>` - starts a container for the given service
* `tent stop <service name>` - stops and removes a container for the given service
* `tent list` - lists all running containers

Most of the services in `tent` utilizes volumes for persisting data, so even if you stop a service, it's data will be persisted in a volume for later usage. These volumes can listed by executing `podman volume ls` and can be managed like any other podman volume.

### Start a Service

The generic syntax for the `start` command is as follows:

```bash
tent start <service name>

## starts mysql and prompts you where necessary
tent start mysql

## starts redis and mongo and prompts you where necessary
tent start redis mongo
```

### Start Service with Default Configuration

The `--default` flag for the `start` command can be used to skip all the prompts and start a service with default configuration

```bash
tent start <service name> --default

## starts mysql with the default configuration
tent start mysql --default

## starts redis and mongo with default configuration
tent start redis mongo --default
```

### Stop a Service

The generic syntax for the `stop` command is as follows:

```bash
tent stop <service name>

## stops mysql and removes the container
## prompts you if multiple containers are found
tent stop mysql

## stops all mysql containers and removes them
tent stop mysql --all

## stops redis and mongo then removes the containers.
## prompts you if multiple containers are found for any of the given services.
tent stop redis mongo

## stops all redis and mongo conainers and then removes them
tent stop redis mongo --all
```

### Stop all Services

The `--all` flag for the `stop` command can be used to stop and remove all running tent containers at once

```bash
tent stop --all
```

## Running Multiple Versions

Given all the services are running inside containers, you can spin up multiple versions of the same service as long as you're keeping the port different.

Run `tent start mysql` twice; the first time, use the `--default` flag, and the second time, put `5.7` as tag and `3307` as host port.

Now, if you run `tent list`, you'll see both services running at the same time.

```bash
+--------------+----------------+---------------+---------------+
| CONTAINER              | Image               | PORTS          |
+--------------+----------------+---------------+---------------+
| tent-mysql-5.7-3307    | docker.io/mysql:5.7 | 3307->3306/tcp |
| tent-mysql-latest-3306 | docker.io/mysql:5.7 | 3306->3306/tcp |
+--------------+----------------+---------------+---------------+
```

## Container Management

Containers started by `tent` are regular containers with some pre-set configurations. So you can use regular `podman` commands such as `ls`, `inspect`, `logs` etc on them. Although `tent` comes with a `list` command, using the `podman` commands will result in more informative results. The target of `tent` is to provide plug and play containers, not to become a full-fledged `podman` cli.
