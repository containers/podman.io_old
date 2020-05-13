---
title: Update on Podman v2
layout: default
author: baude
categories: [blogs]
tags: containers, docker-compose, podman, networking, pod, api, rest, rest-api, v2
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# Update on Podman v2
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }})

A few weeks ago, we made an announcement about the development of Podman V2.  In the announcement, we mentioned that the state of upstream code would be jumbled for a while and that we would be temporarily disabling many of our CI/CD tests.  The upstream development team has been hard at work, and we are starting to see that work pay off.

Today, we are very excited to announce:

**The local Podman v2 client is complete.  It is passing all of its rootfull and rootless system and integration tests.**

The CI/CID tests have been reenabled upstream and are run with each pull request submission.  We are now hard at work finishing up some of the core podman-remote functions.  Once those functions are complete, we can then begin to run our podman-remote system and integration tests to catch any regressions.

We have re-enabled the autobuilds for Podman v2 in Fedora rawhide.  As mentioned earlier, the Podman remote client is not complete, so that binary is temporarily being removed from the RPM.  It will be re-added when the remote client is complete. As a corollary, the Windows and OS/X clients are also not being compiled or tested.  This will occur once the remote client for Linux is complete.

We encourage you to pull the latest upstream Podman code and exercise it with your use cases to help us protect against regressions from Podman v1.  We hope to make a full Podman v2.0 release in several weeks, once we are confident it is stable.  We look forward to hearing what you think, and please do not hesitate to raise issues and comments on this in our [GitHub repository](https://github.com/containers/libpod/issues), our Freenode IRC channel `#podman`,  or to the Podman mailing list.  

We’re very excited to bring Podman v2.0 to you as it offers a lot more flexibility through it’s new REST API interface and  adds several enhancements to the existing commands.  If your project builds on top of Podman, we would especially love to have you test this new version out so we can ensure complete compatibility with Podman v1.0 and address any issues found ASAP.  

**Note:** This announcement was first released to the Podman mailing list.  If you are not yet a member of that community, please join us by sending an email to [podman-join@lists.podman.io](mailto:podman-join@lists.podman.io?subject=subscribe) with the word “subscribe” as the title.
