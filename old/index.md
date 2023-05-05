---
layout: default
title: Podman
---
![podman logo](/images/podman.svg)

## This site has been archived, please see https://podman.io for the new website!

### Welcome to the website for the Pod Manager tool ([podman](https://github.com/containers/podman)). This site features announcements and news around Podman, and occasionally other [container tooling](https://github.com/containers/) news.

### What is Podman? Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode. Simply put: **alias docker=podman**. More details [here](whatis.html).

# What's New!

<section class="posts">
  {% for post in site.categories.new %}
    <p><span>{{ post.date | date_to_string }}</span> »
      <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></p>
    <p>{{ post.excerpt }}</p><hr>
  {% endfor %}
</section>

#### Now where is that Container Commandos [Coloring Book](https://github.com/mairin/coloringbook-container-commandos/blob/master/Web.pdf)?
