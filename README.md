# Container Tools

Welcome to the site for [podman](https://github.com/containers/libpod). This site features announcements and news around podman, and occasionally other [container tooling](https://github.com/containers/) news.

![podman logo](https://github.com/containers/podman.io/blob/master/images/podman.svg)

## Website Contributors

The website runs on GitHub Pages via [Jekyll](https://jekyllrb.com/) to make it as convenient as possible for you to contribute. You can add blog posts by adding a file to the `_posts` folder. The file must use the following naming convention: `yyyy-mm-dd-relevant-title-here.md`.

In the file itself, you will need to start with the following metadata:

```
---
title: <your title here>
layout: default
author: <your (nick)name here>
categories: [blogs]
tags: <your tags here>
---

<yourtext in markdown format goes here, check out other blog posts if you're unsure how to proceed>
```

Please pay attention to the `categories: [blogs]` section. Currently, there are 4 categories available: `[blogs]`, `[releases]`, `[talks]` and `[new]`.

**NOTE:** If you want to add a ':' (colon) to your title, you will need to instead use `&#58;`, otherwise the post will not be displayed on the index page.  For example:

```
Instead of:

title: My first blog post: Can you believe it?

use:

title: My first blog post&#58; Can you believe it?
``` 
