---
title: The Podman repository has been renamed
layout: default
author: mheon
categories: [blogs]
tags: podman, containers, v2, github, rename
---
![podman logo](https://podman.io/images/podman.svg)

# The Podman repository has  been renamed
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

The [Podman](https://podman.io/) repository on Github is moving from [github.com/containers/libpod](https://github.com/containers/libpod) to [github.com/containers/podman](https://github.com/containers/podman)! Read on to find out why, and how it will affect you.
<!--readmore-->

Three years ago, we created a new Git repository to hold our new container-management tool and the library it was based on. At the time, Podman was not named Podman, but `kpod` - a name no one on the team liked, and one we’d hoped to replace quickly. Given this, we decided to name the repository after the library we’d written to manage containers - `libpod`. Four months after that, we made the first public release of the tool, and with it came a new name - Podman (POD MANager). The rest is, as they say, history. The Podman team is incredibly grateful for the success we’ve seen since then, and the way that the community has grown.

With the release of Podman 2.0, we decided it was a good time to for the rename our repository to better match how it’s used today. We’ve decided to rename our Github repository from `containers/libpod` to `containers/podman`. The `libpod` name made sense when we first made the repository, but it hasn’t been the focus of development for some time. We’ve actually been considering moving the `libpod` library into a separate repository, to make it easier to include in our other tools (and it would be very confusing for `containers/libpod` to not include `libpod`!). Given this, and the fact that there are far more users of Podman the tool than `libpod` the library, renaming the repository makes a great deal of sense.

Finally, this rename helps make the repository more discoverable - it’s hard for a new Podman user to know that issues should be filed against `containers/libpod` since they probably don’t know what `libpod` is.

We don’t expect this move will break anyone’s workflow. Github will ensure that the old URLs redirect to the new location, so access to the repo itself, as well as our issues and pull requests, should be unaffected.
