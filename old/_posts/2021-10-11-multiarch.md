---
title: Working with container image manifest lists
layout: default
author: cevich
categories: [blogs]
tags: containers, podman, buildah, skopeo, images, multiarch
---
![podman logo](https://podman.io/images/podman.svg)

# Working with container image manifest lists
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

In this article, I will be using
[Podman](https://github.com/containers/podman),
[Buildah](https://github.com/containers/buildah),
and
[Skopeo](https://github.com/containers/skopeo)
container tools to produce an image that supports multiple architectures
under a single "name".

<!--readmore-->

Simply put, a *manifest list* is just a collection of images with some
additional metadata. While in principle any set of images can be in a
manifest list, the intended use is housing multi-platform and/or multi-arch
images.  Otherwise, manifest lists mostly look and feel like regular container
images.  You can pull, tag, and run them as you'd expect, with only a few
exceptions.

Two and a half things will likely catch you off-guard:

* Pushing manifest lists to registries
* Removing manifest lists from local storage.
* The `podman tag` command is broken for manifest lists in `v3.4`, but
  works in Buildah `v1.23.1`.

Due to the way image-name references are internally processed, you should
**not** use the usual `podman push` and `podman rmi` subcommands.
**THEY WILL NOT DO WHAT YOU EXPECT!**  Instead, you'll want to use
[`podman manifest push --all <src> <dest>`](https://docs.podman.io/en/latest/markdown/podman-manifest-push.1.html) and
[`podman manifest rm <name>`](https://docs.podman.io/en/latest/markdown/podman-manifest-rm.1.html)
(similarly for `buildah`).  These will push/remove the manifest list
itself instead of the contents.  Similarly for tagging if you're on Podman `v3.4`,
use the `buildah tag` command instead.

Great, so manifest lists sound awesome; I can pull, and run them.
I can delete them with `podman manifest rm`, push with
`podman manifest push --all <src> <dest>`, and `tag` with Buildah,
but how can I create them?

## Easy Mode

The simplest way to create a multi-arch manifest list is by enabling
emulation to support any non-native `RUN` instructions.  This is done
by installing the `qemu-user-static` package (or equivalent) for your
distribution.  Also ensure the related `systemd-binfmt.service` is
enabled/started.  Not all distributions support these, so skip to the
next sections for details on other methods if required.

Assuming emulation is in place, let’s look at this example *Containerfile*:

```Dockerfile
FROM registry.access.redhat.com/ubi8:latest
RUN uname -a
```

Building a multi-arch manifest for this can be done with one build command.
This is thanks to features of recent versions of Buildah (`v1.23` and later)
and Podman (`v3.4` and later):

```bash
$ platarch=linux/amd64,linux/ppc64le,linux/arm64,linux/s390x
$ buildah build --jobs=4 --platform=$platarch --manifest shazam .
```

The key options used here are:

* `--manifest` - Add the resulting image into the named manifest list (`shazam`),
  creating it if it doesn't already exist.
* `--platform` - Accepts a comma-separated list of `platform/architecture`
  tuples (`linux/amd64,linux/ppc64le,linux/arm64,linux/s390x`).
* `--jobs` - Optional, causes the builds to execute in parallel using
  the specified number of threads (`4`). i.e., the build finishes much
  faster.

*Note*: Even this simple `Containerfile` and build command will produce
quite a lot of output.  Assuming it's successful, you may use the following
command to examine the architectures:

```bash
$ skopeo inspect --raw containers-storage:localhost/shazam | \
      jq '.manifests[].platform.architecture'
```

Similarly,
[`skopeo inspect`](https://github.com/containers/skopeo/blob/main/docs/skopeo-inspect.1.md)
can be used to examine manifest lists on registry servers - just swap
`containers-storage:` with `docker://`.  This is very useful for
determining if a base image is a manifest list, and if it is, which
architecture the images were built for.  Querying metadata in this
way doesn't require pulling down all the data, so it's quite fast.

Lastly and as mentioned at the beginning, pushing and removing manifest
lists is special.  You **must** use `manifest push` or `manifest rm` sub-commands.
Otherwise, Podman will act on the contents rather than the manifest list
itself.  Then for push, you must specify both the source and destination.
A somewhat contrived example might be:

```bash
$ buildah tag localhost/shazam quay.io/example/shazam
$ podman manifest rm localhost/shazam
$ podman manifest push --all quay.io/example/shazam docker://quay.io/example/shazam
```

If you don't specify both the source and push destination, you'll
get an error message.  In case you're wondering, the `--all` argument is
required.  This tells Podman to push the manifest list AND the contents,
which is nearly always what you want to do. If you don’t use the `--all`
option, only the native architecture will be sent without any warning or
other indications.

## Cheat Mode

In the case of public automation services, where convenience and ease of
maintenance are essential, [there are a set of container images that will
enable and configure `qermu-user-static` for
you](https://github.com/orgs/multiarch/repositories).
These images must be run in `--privileged` mode but will make
[setting things up in the automation system very easy (docs)](https://github.com/multiarch/qemu-user-static#getting-started).
Once set up, the image-build method is precisely the same as the above section.

That said, this is not an endorsement, and you will need to perform your own due
diligence.  I only mention it in this article because if I don't, somebody is
bound to bring it up.  It's likely a fine setup for small, non-critical cases.
But this will probably be a "no-go", where provenance and security are critical.
So, if that applies to you, continue on to the next section.

## Safe Mode

In highly secure, locked-down, production environments using commercially
supported distributions, additional safety is often paramount over the
convenience of emulation. Additionally if the build is simply too complex,
emulation-slow, or involves multiple incompatible platforms (i.e., Windows
and Darwin) then it simply may not be practical.

In these cases, essentially you need to perform the builds separately,
collect the images on one system, then combine them all into a manifest
list as a separate step.

For example, let's assume that you've built the `shazam` image on several
linux hosts, tagged each of them with their architecture name, and pushed them
up to the `quay.io/example/shazam` repository.  Combining them into a
manifest list might look like this:

```bash
$ REPO=quay.io/example/shazam
$ podman manifest create $REPO:latest
$ for IMGTAG in amd64 s390x ppc64le arm64; do \
          podman manifest add $REPO:latest docker://$REPO:IMGTAG; \
      done
$ podman manifest push --all $REPO:latest docker://$REPO:latest
```

*Note:* For the
[`manifest add`](https://docs.podman.io/en/latest/markdown/podman-manifest-add.1.html)
sub-command, the **target manifest list name comes first, then the image to add**.
In the above example, the command inside the loop will pull down the
platform-tagged image (metadata) and add it into the new manifest list. There
is no need for a separate
[pull](https://docs.podman.io/en/latest/markdown/podman-pull.1.html)
operation, and Podman will automatically figure out the constituent architecture
and platform information.  If not, there are
[options to specify them manually](https://docs.podman.io/en/latest/markdown/podman-manifest-add.1.html#arch)
during the `manifest add` operation.  Lastly, in case of an accident, you'll
find a
[`manifest remove`](https://docs.podman.io/en/latest/markdown/podman-manifest-remove.1.html)
sub-command (**same argument-order as `manifest add`**).

## Conclusion

While countless additional details are available in the man pages, this basic
knowledge should cover `90%` of your needs.  With these essential tricks in
hand, producing your own multi-arch and/or multi-platform manifest lists
is just a matter of practice (or some new bash scripts).

Please also remember to pay attention to the tooling versions, as several
bugs and deficiencies are present in earlier editions.  On that same note,
if you do encounter any strange or unexpected behavior, please reach out
to the [upstream community for assistance](https://podman.io/community/#slack-irc-matrix-and-discord).
