---
title: Index
permalink: /
published: true
---
{% include listposts.html archive=false %}

{% if site.posts.size > site.index_post_capacity %}
  [archived posts](/archive.html)
{% endif %}
