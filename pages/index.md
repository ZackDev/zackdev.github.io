---
title: Index Page
layout: default
permalink: /
published: true
---
# this blog is:
for any topic that I stumble upon.

an online reference.

a personal playground.

# links show up here:
<ul class="index_menu">
  {% for post in site.posts limit:5 %}
    <li>
      {{ post.date | date: "%Y-%m-%d" }} <a href="{{ post.permalink }}">{{ post.title | downcase }}</a>
    </li>
  {% endfor %}
</ul>
{% if site.posts.size > 5 %}
  [archive ({{ site.posts.size | minus: 5 }})](/archive.html)
{% endif %}
