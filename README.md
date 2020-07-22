# Container Tools

Welcome to the website for the Pod Manager tool [podman](https://github.com/containers/podman). This site features announcements and news around Podman, and occasionally other [container tooling](https://github.com/containers/) news.

![podman logo](https://github.com/containers/podman.io/blob/master/images/podman.svg)

## Website Contributors

The website runs on GitHub Pages via [Jekyll](https://jekyllrb.com/) to make it as convenient as possible for you to contribute. 

Before you start, please verify that you've an entry for yourself in the top level _config.yml file in the 
`authors` section.  Your entry should look like the following example.  Please note if you do not have a gravatar, a twitter account or simply don't want to share a particular field, just leave the field blank or completely remove the particular line.

```
  jsmith:
    name: Jessica Smith
    display_name: Jessica Smith
    gravatar: c69c8419c8e4d1bbedc7874281453781
    email: jsmith@mycompany.com
    web: https://mywebsite.com
    twitter: JSmithOnTwitter
    github: JSmithOnGitHub
```

You can add blog posts by adding a file to the `_posts` folder. The file must use the following naming convention: `yyyy-mm-dd-relevant-title-here.md`.  In the file itself, you will need to start with the following metadata:


```
---
title: <your title here>
layout: default
author: <author id, from the example above 'jsmith'>
categories: [blogs]
tags: <your tags here>
---
![podman logo](https://podman.io/images/podman.svg)

{% assign author = site.authors[page.author] %}
# My Blog Title
## By {{ author.display_name }} [GitHub](https://github.com/{{ author.github }}) [Twitter](https://twitter.com/{{ author.twitter }})

<yourtext in markdown format goes here, check out other blog posts if you're unsure how to proceed>
```

Please pay attention to the **`categories: [blogs]`** section. Currently, there are 4 categories available: `[blogs]`, `[releases]`, `[talks]` and `[new]`.

**NOTE:** If you want to add a ':' (colon) to your title, you will need to instead use `&#58;`, otherwise the post will not be displayed on the index page.  For example:

```
Instead of:

title: My first blog post: Can you believe it?

use:

title: My first blog post&#58; Can you believe it?
```

Finally if your blog is more than a paragraph or two long, please add this tag after the first or second paragraph:

```
<!--readmore-->
```
This will provide a preview on the blogs index page and the reader can read that first bit and then decide if they want to go in for a deeper dive.

