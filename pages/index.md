---
title: This Blog Is
permalink: /
published: true
---
{% include listposts.html archived=false %}

{% assign archived_posts = site.posts | where: "archived", true %}

{% if archived_posts.size > 0 %}
  [archived posts](/archive.html)
{% endif %}
