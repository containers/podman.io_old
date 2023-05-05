---
layout: default
title: Podman Blogs
---

![Podman logo](../images/podman.svg)

# {{ page.title }}

<section class="posts">
  {% for post in site.categories.blogs %}
    <p><span>{{ post.date | date_to_string }}</span> » <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> by {{ post.author }}</p>
    <p>{{ post.excerpt }}</p>
    <a href="{{ site.baseurl }}{{post.url}}"> Read More </a><hr>
  {% endfor %}
</section>
