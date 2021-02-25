---
title: This Blog Is
layout: default
permalink: /
published: true
---
for any topic that I stumble upon.

an online reference.

a personal playground.

<p id="tacho"></p>

# links show up here:

{% include listposts.html archived=false %}

{% assign archived_posts = site.posts | where: "archived", true %}
{% assign non_archived_posts = site.posts | where: "archived", false %}

{% if archived_posts.size > 0 %}
  [archive ({{ archived_posts.size }})](/archive.html)
{% endif %}

{% if non_archived_posts.size > 0 %}
<script>
  new Tacho(1, {{ non_archived_posts.size }}, 1, 1000, 0.9, 'tacho', 'total posts: ', '.').run();
</script>
{% endif %}
