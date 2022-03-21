---
title: this blog is
layout: default
permalink: /
published: true
---
for any topic that I stumble upon.

an online reference.

a personal playground.

# links show up here:

{% include listposts.html archived=false %}

{% assign archived_posts = site.posts | where: "archived", true %}

{% if archived_posts.size > 0 %}
  [archived posts](/archive.html)
{% endif %}
