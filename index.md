---
layout: default
title: Podman
---
<head>
<!-- Global site tag (gtag.js) - Google Analytics -->
<script async src="https://www.googletagmanager.com/gtag/js?id=UA-132755160-1"></script>
<script>
  window.dataLayer = window.dataLayer || [];
  function gtag(){dataLayer.push(arguments);}
  gtag('js', new Date());

  gtag('config', 'UA-132755160-1');
</script>
<link rel="shortcut icon" type="image/x-icon" href="/images/favicon.ico">
</head>

![podman logo](/images/podman.svg)

### Welcome to the website for the Pod Manager tool ([podman](https://github.com/containers/podman)). This site features announcements and news around Podman, and occasionally other [container tooling](https://github.com/containers/) news.

### What is Podman? Podman is a daemonless container engine for developing, managing, and running OCI Containers on your Linux System. Containers can either be run as root or in rootless mode. Simply put: \`alias docker=podman\`. More details [here](whatis.html).

# What's New!

<section class="posts">
  {% for post in site.categories.new %}
    <p><span>{{ post.date | date_to_string }}</span> »
      <a href="{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a></p>
    <p>{{ post.excerpt }}</p><hr>
  {% endfor %}
</section>

#### Now where is that Container Commandos [Coloring Book](https://github.com/mairin/coloringbook-container-commandos/blob/master/Web.pdf)?
