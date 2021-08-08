# Podman Community Meeting
## August 3, 2021 11:00 a.m. Eastern (UTC-4)

### Attendees (22 total)
Tom Sweeney, Brent Baude, Jhon Honce, Dan Walsh, Chris Evich, Urvashi Mohnani, Nalin Dahyabhai, Eduardo Santiago, Matt Heon, Ashley Cui, Paul Holzinger, Erik Bernoth, Charlie Doern, Chris Evich, Greg Shomo, Scott McCarty, Anders Björklund, Lokesh Mandvekar

## Meeting Start: 11:03 a.m.
### BlueJeans [Recording](https://bluejeans.com/s/KyZqj8gBg1E)

## General Announcements
### Tom Sweeney

* Twitter Handles:  [@Podman_io](https://twitter.com/Podman_io), [@Buildah_io](https://twitter.com/Buildah_io)


## Demo: `podman run --requires`
### Matt Heon
#### (2:30 in the video)

Demo (started at 2:40)

Containers can now start other related containers.  This has been available prior, but now you can specify it yourself starting in Podman v3.3.0

Add requires flag to `podman run` command and specify another container (test1) and it started that container when (test2) started.

This only works for starting, it does not apply to stop.  You can't rm one container without rm'ing the other.

Asciinema of demo can be found at [here](https://asciinema.org/a/EBeup6xO8UDeGYYbPEYxxP3xN).

## Demo: `podman image scp`
### Charlie Doern
#### (6:57 in the video)

Use scp within the `podman image` command to copy the image to a remote machine.  It can also be used to copy from a remote host to another remote host.

Demo (started at 7:30)

Showed the scp in action to the machine fed.

He then showed how to pull an image from a remote machine and loading it onto the local machine.  It allows copying to or from.  This can also work from remote to remote.

Being able to copy from root to local is something that's not working now, but being worked. 

[First asciinema demo](https://asciinema.org/a/RuOweVQ7g4elLSyiPVS09uAxk)

Charlie then showed how to use ssh like targets, and then showed an invalid connection.

[Second asciinema demo](https://asciinema.org/a/9pinVx16gUjlrdLN5ZEmoR6SZ)

The double colon is needed for parsing, the code knows you're not using a tag.  Should help with the readablity too.

## Rootless Docker Compose Status
### Paul Holzinger
#### (17:20 in the video)

Paul showed a series of Docker Compose commands that created a wordpress window.  When connecting to a port, a rootless used can not use port 80, so port 8080 had to be specified.

Start and enable the podman user socket:
`systemctl --user enable --now podman.socket`

Export the `DOCKER_HOST` environment variable to make sure docker-compose connects to the right socket:
`export DOCKER_HOST=unix://$XDG_RUNTIME_DIR/podman/podman.sock`

Run docker-compose up in a directory with a docker-compose.yaml file.
The docker-compose.yaml file used in the video:
```
version: '3.7'
services:
  db:
    image: mysql:8.0.19
    command: '--default-authentication-plugin=mysql_native_password'
    volumes:
      - db_data:/var/lib/mysql
    restart: always
    environment:
      - MYSQL_ROOT_PASSWORD=somewordpress
      - MYSQL_DATABASE=wordpress
      - MYSQL_USER=wordpress
      - MYSQL_PASSWORD=wordpress
    expose:
      - 3306
      - 33060
  wordpress:
    image: wordpress:latest
    ports:
      - 8080:80
    restart: always
    environment:
      - WORDPRESS_DB_HOST=db
      - WORDPRESS_DB_USER=wordpress
      - WORDPRESS_DB_PASSWORD=wordpress
      - WORDPRESS_DB_NAME=wordpress
volumes:
  db_data:
```
Make sure to use a port of 1024 or higher. Rootless users are not allowed to bind ports below 1024 by default. Now run `docker-compose up -d`.

To connect with curl to a running rootles container directly via ip, you need the `podman unshare --rootless-cni` command and then it will work.


## Demo: `podman secrets --env`
### Ashley Cui
#### (22:34 in the video)

Demo (started at 22:40)

You can change uid, gid and mode of the secret.  She created an envvar and then was able to use it.  With the env option, you can get to the variable's value.  It's created during creation time of the container.  You can use the secret as an environment variable inside of the container.  If  you update the envar locally, it won't be shared.

The secret won't be saved to the image, it is only in the container.  The value of the environment variable is saved within the container when the container is created rather than when it ran.

## Demos: 
### Rootless Podman with rootless overlay
### `podman run --group-add`
### podman /etc/hosts, host.containers.internal support
### Dan Walsh
#### (25:40 in the video)

Demo (started at 25:57)

##### Rootless podman with rootless overlay

Showed how to use overlay, which is helpful as fuse-overlayfs has a lot of overhead.  This is a big "quiet" feature that people probably won't notice.

##### podman run group-add

Issues arised with suplemental group ids.  If you created a container and tried to look at a directory with these gids, you'd get an access error.

How to share the content then?  By default, containers drop all groups before you run them as a security precaution.  When a rootless container is run, the groups are dropped for security reasons.  Now you can add the groups you need with `podman run --group-add=keep-groups` which copies the groups from the host into the container, but giving access only within the container.

##### podman /etc/hosts, host.containers.internal support

A new flag, host.containers.internal, allows you to set up an entry in /etc/hosts that gives you the ip address of the host within the containers in the /etc/hosts file in the container. 



## Questions?
#### (35:10) in the video)

No questions or topics.  Tom asked Matt to talk about Podman v3.3.

Podman v3.3 rc1 early release no release notes yet.  Final realease in mid to late August.  Main branch is now at Podman 4.0.  Podman 4.0 to be out at in Fedora 35 at the earliest.

## Topics for Next Meeting



## Next Meeting: Tuesday September 7, 2021, 11:00 a.m. Eastern (UTC-4)
## Next Cabal Meeting: Thursday August 19, 2021, 10:00 a.m. Eastern (UTC-4)

### Meeting End: 11:43 a.m. Eastern (UTC-4)


## BlueJeans Chat copy/paste:
```
Tom Sweeney 10:58
Welcome! Please sign in on HackMD: https://hackmd.io/fc1zraYdS0-klJ2KJcfC7w

baude 11:10 AM
@mheon, does that work in pods?

Matt Heon 11:14 AM
Yep. Works on any container, in or out of a pod

Greg Shomo (NU) 11:42 AM
good to see everyeon && have a good one !

Erik Bernoth 11:58 AM
I'm out, see you next time!

Lokesh Mandvekar 12:04 PM
I gott bounce, later...
```
