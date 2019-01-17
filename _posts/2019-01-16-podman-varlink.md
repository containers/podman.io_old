---
title: Programmatic remote access to Podman via the varlink protocol
layout: default
author: haraldh
categories: [blogs]
tags: podman, varlink, rust, python, go, golang
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}

# Programmatic remote access to Podman via the varlink protocol
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

This guide shows how to access Podman remotely via the [varlink interface](https://varlink.org)
with CLI tools and programmatically with python, go and rust.

This should work on Linux, MacOS and Windows 10.

The [compatibility matrix](https://varlink.org/Language-Bindings) shows which feature is supported on which OS in which language.

> Note: replace `<podman-machine>` in this guide with the IP or hostname of your
> Podman machine

<!--readmore-->

## Prerequisites

### Windows ssh
If you are on a windows client machine, install the OpenSSH Client built by Microsoft in a cmd.exe in 
admin mode:

~~~cmd
> dism /online /Add-Capability /CapabilityName:OpenSSH.Client~~~~0.0.1.0
~~~

Close cmd.exe window.

> Note: Works also with other ssh clients, e.g. ssh from [Git Bash](https://gitforwindows.org/).

### Generate ssh keys

If you don't want to type your password all the time, or not use an ssh agent, set an empty password.

~~~bash
$ ssh-keygen -f ~/.ssh/podmanuser
~~~

## Set up Podman on the Fedora/RHEL machine

~~~bash
$ sudo yum install podman libvarlink-util
$ sudo groupadd podman
~~~

Copy `/lib/tmpfiles.d/podman.conf` to `/etc/tmpfiles.d/podman.conf`.
~~~bash
$ sudo cp /lib/tmpfiles.d/podman.conf /etc/tmpfiles.d/podman.conf
~~~

Edit `/etc/tmpfiles.d/podman.conf`:
~~~
d /run/podman 0750 root podman
~~~

Copy `/lib/systemd/system/io.podman.socket` to `/etc/systemd/system/io.podman.socket`.
~~~bash
$ sudo cp /lib/systemd/system/io.podman.socket /etc/systemd/system/io.podman.socket
~~~

Edit section `[Socket]` of `/etc/systemd/system/io.podman.socket`:
~~~
[Socket]
ListenStream=/run/podman/io.podman
SocketMode=0660
SocketGroup=podman
~~~

Then activate the changes:
~~~bash
$ sudo systemctl daemon-reload
$ sudo systemd-tmpfiles --create
$ sudo systemctl enable --now io.podman.socket
~~~

The directory and socket now belongs to the podman group
~~~bash
$ sudo ls -al /run/podman
drwxr-x---.  2 root podman   60 14. Jan 14:50 .
drwxr-xr-x. 51 root root   1420 14. Jan 14:36 ..
srw-rw----.  1 root podman    0 14. Jan 14:50 io.podman
~~~

> Note: Wouldn't it be nice, if there was a Podman group owning the socket already? ;-)

Now we are adding a user `podmanuser` and set a password:
~~~bash
$ sudo useradd podmanuser -G podman
$ sudo passwd podmanuser
~~~

From your client machine do
~~~bash
$ ssh-copy-id -f ~/.ssh/podmanuser podmanuser@<podman-machine>
~~~

### ssh config

Edit `.ssh/config`

~~~
Host <podman-machine>
    RequestTTY no
    IdentityFile ~/.ssh/podmanuser
    User podmanuser
    VisualHostKey no
    RemoteCommand /usr/bin/varlink bridge --connect unix:/run/podman/io.podman
    GSSAPIAuthentication no
    ForwardX11 no
~~~

### Optional Lock Down

Log into `<podman-machine>`
~~~bash
$ ssh podmanuser@<podman-machine>
~~~

Now we lock down `podmanuser` to only be used with the varlink bridge from your client machine:

Edit `.ssh/authorized-keys` so that the line begins with:
~~~
command="/usr/bin/varlink bridge --connect unix:/run/podman/io.podman",no-agent-forwarding,no-port-forwarding,no-pty,no-user-rc,no-X11-forwarding ssh-rsa […]
~~~

Log out of `<podman-machine>`

## Python

### Install Python
https://www.python.org/downloads/

### Install varlink for Python

~~~bash
$ pip install --user "varlink>=30.0.2"
~~~

### Test if the varlink cli module works

~~~bash
$ python -m varlink.cli --help
usage: cli.py [-h] [-r RESOLVER] [-A ACTIVATE] [-b BRIDGE]
              {info,help,bridge,call} ...
…
~~~

### Interfacing Podman with the python cli module

~~~bash
$ python -m varlink.cli --bridge "ssh <podman-machine>" info
info
.1:1234
Vendor: Atomic
Product: podman
Version: 0.10.1
URL: https://github.com/containers/libpod
Interfaces:
   org.varlink.service
   io.podman

$ python -m varlink.cli --bridge "ssh <podman-machine>" call io.podman.Ping {}
{
  "ping": {
    "message": "OK"
  }
}
~~~

### Python Client Example

`podmanclient.py`:
~~~python
import varlink

with varlink.Client.new_with_bridge(["ssh", "<podman-machine>"]) as client:
    with client.open("io.podman") as podman:
        print(podman.Ping())
        print(podman.GetInfo())
        print(podman.GetVersion())

        info = podman.GetInfo()
        print("Uptime:", info["info"]["host"]["uptime"])
        print("Os:", info["info"]["host"]["os"])

        try:
            podman.MountContainer("container-id")
        except varlink.error.VarlinkError as e:
            print(e.error(), e.parameters())
            print(e.as_dict())
~~~

To find out more about the Podman varlink interface read the [io.podman.varlink](https://github.com/containers/libpod/blob/master/cmd/podman/varlink/io.podman.varlink) file or
the rendered [API.md](https://github.com/containers/libpod/blob/master/API.md).

Or you can inspect, what methods your Podman version on `<podman-machine>` provides:

~~~bash
$ python -m varlink.cli --bridge "ssh <podman-machine>" help io.podman
~~~

## Go

### Installation

~~~bash
$ go get -u github.com/varlink/go/varlink
$ go install github.com/varlink/go/cmd/varlink
$ go install github.com/varlink/go/cmd/varlink-go-interface-generator
~~~

### Running the varlink CLI command

The `varlink` CLI command in `$GOPATH/bin` should output:

~~~bash
$ varlink --bridge "ssh <podman-machine>" info
Vendor: Atomic
Product: podman
Version: 0.10.1
URL: https://github.com/containers/libpod
Interfaces:
  org.varlink.service
  io.podman


$ varlink --bridge "ssh <podman-machine>" call io.podman.Ping
{
  "ping": {
    "message": "OK"
  }
}

$ varlink --bridge "ssh <podman-machine>" call io.podman.MountContainer "{\"name\": \"container-id\"}"
Error: Call failed with error: io.podman.ErrorOccurred
{
  "reason": "no container with name or ID container-id found: no such container"
}
~~~

To find out more about the Podman varlink interface read the [io.podman.varlink](https://github.com/containers/libpod/blob/master/cmd/podman/varlink/io.podman.varlink) file or
the rendered [API.md](https://github.com/containers/libpod/blob/master/API.md).

Or you can inspect, what methods your Podman version on `<podman-machine>` provides:

~~~bash
$ varlink --bridge "ssh <podman-machine>" help io.podman
~~~

### Go Client Example

Either clone this [repository](https://github.com/haraldh/podmangoexampleclient) or:

Create a new go project.
Create a sub directory `iopodman` in the project.

Create the `io.podman.varlink` either from the podman github sources or dynamically with:
~~~bash
$ varlink --bridge "ssh <podman-machine>" help io.podman > iopodman/io.podman.varlink
~~~

Create iopodman/generate.go:
~~~go
package iopodman

//go:generate $GOPATH/bin/varlink-go-interface-generator io.podman.varlink
~~~

Run `go generate`:
~~~bash
$ go generate ./...
~~~

Create your main.go:

~~~go
package main

import (
	"flag"
	"fmt"
	"github.com/haraldh/podmangoexampleclient/iopodman"
	"github.com/varlink/go/varlink"
	"io"
	"os"
)

func printError(methodname string, err error) {
	fmt.Fprintf(os.Stderr, "Error calling %s: ", methodname)
	switch e := err.(type) {
	case *iopodman.ImageNotFound:
		//error ImageNotFound (name: string)
		fmt.Fprintf(os.Stderr, "'%v' name='%s'\n", e, e.Name)

	case *iopodman.ContainerNotFound:
		//error ContainerNotFound (name: string)
		fmt.Fprintf(os.Stderr, "'%v' name='%s'\n", e, e.Name)

	case *iopodman.NoContainerRunning:
		//error NoContainerRunning ()
		fmt.Fprintf(os.Stderr, "'%v'\n", e)

	case *iopodman.PodNotFound:
		//error PodNotFound (name: string)
		fmt.Fprintf(os.Stderr, "'%v' name='%s'\n", e, e.Name)

	case *iopodman.PodContainerError:
		//error PodContainerError (podname: string, errors: []PodContainerErrorData)
		fmt.Fprintf(os.Stderr, "'%v' podname='%s' errors='%v'\n", e, e.Podname, e.Errors)

	case *iopodman.NoContainersInPod:
		//error NoContainersInPod (name: string)
		fmt.Fprintf(os.Stderr, "'%v' name='%s'\n", e, e.Name)

	case *iopodman.ErrorOccurred:
		//error ErrorOccurred (reason: string)
		fmt.Fprintf(os.Stderr, "'%v' reason='%s'\n", e, e.Reason)

	case *iopodman.RuntimeError:
		//error RuntimeError (reason: string)
		fmt.Fprintf(os.Stderr, "'%v' reason='%s'\n", e, e.Reason)

	case *varlink.InvalidParameter:
		fmt.Fprintf(os.Stderr, "'%v' parameter='%s'\n", e, e.Parameter)

	case *varlink.MethodNotFound:
		fmt.Fprintf(os.Stderr, "'%v' method='%s'\n", e, e.Method)

	case *varlink.MethodNotImplemented:
		fmt.Fprintf(os.Stderr, "'%v' method='%s'\n", e, e.Method)

	case *varlink.InterfaceNotFound:
		fmt.Fprintf(os.Stderr, "'%v' interface='%s'\n", e, e.Interface)

	case *varlink.Error:
		fmt.Fprintf(os.Stderr, "'%v' parameters='%v'\n", e, e.Parameters)

	default:
		if err == io.EOF {
			fmt.Fprintf(os.Stderr, "Connection closed\n", )
		} else if err == io.ErrUnexpectedEOF {
			fmt.Fprintf(os.Stderr, "Connection aborted\n", )
		} else {
			fmt.Fprintf(os.Stderr, "%T - '%v'\n", err, err)
		}
	}
}

func main() {
	var c *varlink.Connection
	var err error

    c, err = varlink.NewBridge("ssh <podman-machine>")
	if err != nil {
		fmt.Fprintf(os.Stderr, "Error connecting: %T - '%v'\n", err, err)
		os.Exit(1)
	}

	// Be nice and cleanup
	defer c.Close()

	info, err := iopodman.GetInfo().Call(c)

	if err != nil {
		printError("GetInfo()", err)
		os.Exit(1)
	}

	fmt.Printf("Info: %+v\n\n", info)

	fmt.Printf("Podman Version: %+v\n\n", info.Podman.Podman_version)

	containers, err := iopodman.ListContainers().Call(c)

	if err != nil {
		printError("ListContainers()", err)
		os.Exit(1)
	}

	for container := range containers {
		print(container)
	}

	mount, err := iopodman.MountContainer().Call(c, "foo")
	if err != nil {
		printError("MountContainer()", err)
	} else {
		print(mount)
	}
}
~~~

## Rust

### Install the rust toolchain

#### Windows
First install the C++ part of https://visualstudio.microsoft.com/downloads/

#### All
https://rustup.rs/

### Install varlink-cli

#### For non-Linux systems:

~~~bash
$ cargo install varlink-cli
~~~

> Note: Ensure that $HOME/.cargo/bin is in your PATH or copy $HOME/.cargo/bin/varlink
> in one of your path directories  

#### For Linux systems:

You can also use `varlink` util from [libvarlink](https://github.com/varlink/libvarlink)
or install `libvarlink-util` on Fedora/RHEL machines.

### Running the varlink CLI command

The `varlink` CLI command in `~/.cargo/bin` should output:

~~~bash
$ varlink --bridge "ssh <podman-machine>" info
Vendor: Atomic
Product: podman
Version: 0.10.1
URL: https://github.com/containers/libpod
Interfaces:
  org.varlink.service
  io.podman


$ varlink --bridge "ssh <podman-machine>" call io.podman.Ping
{
  "ping": {
    "message": "OK"
  }
}

$ varlink --bridge "ssh <podman-machine>" call io.podman.MountContainer "{\"name\": \"container-id\"}"
Error: Call failed with error: io.podman.ErrorOccurred
{
  "reason": "no container with name or ID container-id found: no such container"
}
~~~

To find out more about the Podman varlink interface read the [io.podman.varlink](https://github.com/containers/libpod/blob/master/cmd/podman/varlink/io.podman.varlink) file or
the rendered [API.md](https://github.com/containers/libpod/blob/master/API.md).

Or you can inspect, what methods your Podman version on `<podman-machine>` provides:

~~~bash
$ varlink --bridge "ssh <podman-machine>" help io.podman
~~~

### Rust Client Example

Either clone this [repository](https://github.com/haraldh/podmanrs) or:

~~~bash
$ cargo new --bin podmanrs
$ cd podmanrs
~~~

Download the varlink interface from the running Podman varlink service:
 
~~~bash
$ varlink --bridge "ssh <podman-machine>" help io.podman > src/io.podman.varlink
~~~

create `build.rs`:
~~~rust
extern crate varlink_generator;

fn main() {
   varlink_generator::cargo_build_tosource("src/io.podman.varlink", true);
}
~~~

create `Cargo.toml`:
~~~toml
[package]
name = "podmanrs"
version = "0.1.0"
authors = ["Harald Hoyer <harald@redhat.com>"]
build = "build.rs"
edition = "2018"

[dependencies]
varlink = "7"
serde = "1"
serde_derive = "1"
serde_json = "1"
chainerror = "0.4"


[build-dependencies]
varlink_generator = "7"
~~~

create `src/main.rs`:
~~~rust
mod io_podman;

use crate::io_podman::*;
use varlink::Connection;
use std::result::Result;
use std::error::Error;

fn main() -> Result<(), Box<Error>> {
    let connection = Connection::with_bridge(
        "ssh <podman-machine>",
    )?;
    let mut podman = VarlinkClient::new(connection.clone());
    let reply = podman.ping().call()?;
    println!("Ping() replied with '{}'", reply.ping.message);
    let reply = podman.get_info().call()?;
    println!("Hostname: {}", reply.info.host.hostname);
    println!("Info: {:#?}", reply.info);
    Ok(())
}
~~~

Now run it:

~~~bash
$ cargo run
~~~
