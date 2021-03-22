---
full_width: true
layout: default
title: Podman
---
<section class="homepage-hero">
  <div class="homepage-hero-inner">
    <div class="homepage-hero-logo-container">
      <img class="homepage-hero-logo" alt="Podman logo"
        src="{{ 'assets/images/logo.svg' | relative_url }}" />
    </div>
    <div>
      <img class="homepage-hero-podman" alt="Podman"
        src="{{ 'assets/images/podman.svg' | relative_url }}" />
      <p>
        Podman is a daemonless container engine for developing, managing, and running
        OCI Containers on your Linux System. Containers can either be run as root or
        in rootless mode.
      </p>
      <p>Simply put: <strong>alias docker=podman</strong></p>
      <p>More details <a href="{{ 'whatis.html' | relative_url }}">here</a>.</p>
    </div>
  </div>
</section>

<section class="homepage-news">
  <h1>What's New!</h1>

  <div class="homepage-news-inner">
    {% for post in site.categories.new %}
      <div class="homepage-news-post">
        <a href="{{ site.baseurl }}{{ post.url }}" title="{{ post.title }}">
          <h2 class="post-title">{{ post.title }}</h2>
        </a>
        <div class="post-meta">
          <span class="post-date">{{ post.date | date_to_string }}</span>
        </div>
        <p>{{ post.excerpt }}</p>
      </div>
    {% endfor %}
  </div>
</section>

<section class="coloring-book">
  <aside>
    Now where is that Container Commandos
    <a href="https://github.com/mairin/coloringbook-container-commandos/blob/master/Web.pdf">Coloring Book</a>?
  </aside>
</section>
