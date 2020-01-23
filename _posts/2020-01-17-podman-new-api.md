---
title: New API coming for Podman 
layout: default
author: baude
categories: [blogs]
tags: community, open source, podman, hpc, api, REST, API
---

# New API coming for Podman

![podman logo](https://podman.io/images/podman.svg)

## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

If you follow the traffic on IRC (#podman on freenode) or GitHub from the developers of [libpod](https://github.com/containers/libpod/), you might have seen us referencing a new API.  We often referred to it as *apiv2* and for about a month, there has been an 'apiv2' branch for libpod on GitHub.  This week, we have begun to merge that branch but have yet to “wire it up.”

First and foremost, the Golang libpod API remains largely unchanged.  What is changing is the API we expose for automation and remote usage.  Our previous API was based on the [varlink](https://varlink.org/) protocol.  But we heard from users that varlink was a hurdle for libpod adoption especially for those who were using the Docker API and its bindings.  They simply could not or did not want to rewrite their custom applications for libpod’s new, varlink-based API.

<!--readmore-->

The new API is a simpler implementation based on HTTP/REST.  We provide two basic groups of endpoints.  The first one is for libpod; the second is for Docker compatibility, to ease adoption.  The two endpoints are namespaced to keep them separate.  Our goal with implementing a portion of the Docker API, is to be as compatible as possible; while similar calls in the libpod API might bring back additional libpod specific information.  

While these two endpoints work similarly, there are important and somewhat nuanced differences. The Docker API endpoint is useful for existing automation tied to that API and potentially tools like docker-compose.

#### Example 

If you wanted a list of images with the libpod endpoint, you would use the following endpoint:

```<endpoint_base_url>/libpod/images/json```

And if you wanted a list of images but in docker-compatibility,  you would use:

```<endpoint_base_url>/images/json```

In our proof of concepts, we have tested our endpoint with the [docker-py](https://docker-py.readthedocs.io/en/stable/) project.  There are of course subtle differences which we are still working on.  And there are compatibility endpoints that we can not support like `swarm` which Podman does not support.

We are working on a set of Golang bindings for the libpod endpoints.  Eventually these bindings will be used to rewire our remote client.  The rewire begins after all the libpod endpoints are working and have tests.  We plan on working with the upstream community on podman-python support for the new libpod API, enabling python developers fully support for using podman containers.

As for the existing varlink code, it has been in maintenance mode already.  We will continue to address bugs but no new functionality will be developed.  Once the new API is fully implemented, we plan to make a deprecation announcement.

We are hopeful these changes help our users and larger community.  We  hope that the new API helps encourage contributors to help us complete the API as well as write bindings.  Look for more information in the near future including status updates as well as how-tos.
