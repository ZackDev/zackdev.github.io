---
title: This Blog Is
layout: default
permalink: /
published: true
---
for any topic that I stumble upon.

an online reference.

a personal playground.

# Links Show Up Here:

{% include listposts.html archived=false %}

{% assign archived_posts = site.posts | where: "archived", true %}

{% if archived_posts.size > 0 %}
  [archived posts](/archive.html)
{% endif %}
