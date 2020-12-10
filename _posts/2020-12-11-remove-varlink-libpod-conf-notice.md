---
title: Podman API v1.0 Deprecation and Removal Notice 
layout: default
author: tsweeney 
categories: [blogs]
tags: podman, containers, v2, github, varlink, rest-api
---
![podman logo](https://podman.io/images/podman.svg)

# Podman API v1.0 and libpod.conf Removal Notice 
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

On August 1, 2020, the Podman team posted a [Podman API v1.0 Deprecation and Removal notice](https://podman.io/blogs/2020/08/01/deprecate-and-remove-varlink-notice.html).  As noted in that document, the Podman API v1.0 relied on the [varlink library](https://github.com/varlink/libvarlink) to handle the underlying client/server calls from the Podman client to the host where the Podman service was running.  The varlink library  has been deprecated in the spring of 2020.  This led the Podman team to investigate the use of other client/server technologies and it was decided to develop a RESTful API for Podman using the native Go libraries.

<!--readmore-->
This new Podman v2.0 RESTful API was released along with Podman v2.0 in June of 2020 and replaces the Podman API v1.0.   As of that time the Podman API v1.0 for Podman was considered to be deprecated.  The Podman team noted that the Podman v1.0 (varlink) API would be removed from the Podman project in a future release and that a one month notice would be sent to the community before the version of Podman without the v1.0 API was released.  This note represents that notice.

The Podman API v1.0 was just recently [removed](https://github.com/containers/podman/pull/8400) from the upstream repository on [GitHub](https://github.com/containers/podman) as work has started on the next release of Podman, v3.0.  Podman v3.0 is expected to be released on Fedora 33 in late January 2021 and then later next year in RHEL 8.4 and other distributions.

At the same time as the removal of the Podman v1.0 API, the `libpod.conf` file has also been removed and it too will no longer be included with Podman starting in Podman v3.0.  The functionality of this file has been replaced by [containers.conf](https://github.com/containers/common/blob/master/docs/containers.conf.5.md).  If there have been modifications made to the `libpod.conf` file in your environment, you should be able to make the same changes in `containers.conf` and they will be honored.
 
If you have any questions or concerns about this notification, please send a note to the Podman [mailing list](https://lists.podman.io/admin/lists/podman.lists.podman.io/) or create an issue on Podman’s [GitHub](https://github.com/containers/podman/issues) repository.
