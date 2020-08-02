---
title: Podman API v1.0 Deprecation and Removal Notice 
layout: default
author: dwalsh 
categories: [blogs]
tags: podman, containers, v2, github, varlink, rest-api
---
![podman logo](https://podman.io/images/podman.svg)

# Podman API v1.0 Deprecation and Removal Notice 
{% assign author = site.authors[page.author] %}
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

The Podman API v1.0 relied on the [varlink library](https://github.com/varlink/libvarlink) to handle the underlying client/server calls from the Podman client to the host where the Podman service was running.  About one year ago, the Podman team was notified that the varlink library was being deprecated and there would be no further development and little support for it from the varlink library team.  This led the Podman team to investigate the use of other client/server technologies and it was decided to develop a RESTful API for Podman using the native Go libraries.
<!--readmore-->

This new Podman v2.0 RESTful API was released along with Podman v2.0 in June of 2020 and replaces the Podman API v1.0.   As of that time the Podman API v1.0 for Podman is considered to be deprecated.  If there are issues with the Podman API v1.0 in versions of Podman prior to v2.0 and those versions are still under support on Red Hat Enterprise Linux (RHEL), the Podman team will make a best effort to address those issues.  However, no new feature requests for the API v1.0 will be considered and any problems found with the API v1.0 in Podman v2.0 will not be addressed.

The new Podman v2.0 RESTful API is split into two halves: one providing a Docker-compatible API, and a Libpod API providing support for Podman’s unique features such as pods.  The new API works in both a rootful and a rootless environment.  It is a much more flexible solution and Podman will not have a dependency on another project in order to supply an API.  For more information on the Podman v2.0 RESTful API please see articles on the [podman.io](https://podman.io/) site and also the documentation for the Podman v2.0 RESTful API [here](http://docs.podman.io/en/latest/Reference.html).

Distributions have to support services for the length of their support agreements. The Podman development team wants to be free to update the version of Podman during this support cycle.  Therefore, we are planning to drop support for Podman API v1.0 from distributions Red Hats is the packagers for.  The version of Podman, 2.*,  which is contained in Fedora 33, scheduled to be released around Oct 31, 2020, will ship with no varlink support.  We also plan to drop support from the RHEL8.4 release, spring 2021.  Other distributions like OpenSUSE have already disabled varlink support and we have heard that other distributions will follow suit.

This also serves as a notification that the Podman v1.0 (varlink) API will be removed from the main GitHub branch of Podman in the near future.  With the release of Podman v2.0 the Podman developers deprecated the Podman API v1.0 in favor of the new Podman v2.0 RESTful API.   The plan is to remove varlink completely from the Podman v3.0 development branch which will be created some time after September 2020.  A 30 day notification of the final removal date will be posted on the [podman.io](https://podman.io) site and also on the [Podman mailing list](https://lists.podman.io/admin/lists/podman.lists.podman.io/), along with social media once it is definitively determined.  

If you have any questions or concerns about this notification, please send a note to the Podman mailing list or create an issue on Podman’s [GitHub](https://github.com/containers/podman/issues) repository.
