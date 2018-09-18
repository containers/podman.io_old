---
title: Podman Alpha version 0.8.1 Release Announcement
author: bbaude 
date: 2018-08-08 00:00:00 UTC
categories: [releases]
tags: community, open source, podman
comments: false
published: true
---
<img src="../images/podman.png" alt="podman logo">

# Podman release 0.8.1
Our latest podman release turned out to be a lot of internal plumbing. We had more than 50 commits but most were tweaks that most users would not notice. So I don’t have a singular, hot feature to point you at.

<!--readmore-->
That said, if you haven’t tried the python client to for podman, I recommend you do. It allows you to interact with a remote podman instance via SSH.

## Other notable benefits of this release are:

    * Fixes to rootless containers including network support using slirp4netns written by Akihiro Suda
    * Adjustments to how images are pulled and their metadata
    * podman build now supports different isolation mechanims, to better run within a confined container.
    * Changes to our integration tests to speed them up
    * podman load now supports xz compression
    * Tidy up man pages
