---
layout: default
title: Podman Release Announcements
---

![Podman logo](../images/podman.svg)

# {{ page.title }}

### Release Notes on [GitHub](https://github.com/containers/podman/blob/master/RELEASE_NOTES.md)

<section class="posts">
  {% for post in site.categories.releases %}
    <p><span>{{ post.date | date_to_string }}</span> » <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">{{ post.title }}</a> by {{ post.author }}</p>
    <p>{{ post.excerpt }}</p>
    <a href="{{ site.baseurl }}{{post.url}}"> Read More </a><hr>
  {% endfor %}
</section>
