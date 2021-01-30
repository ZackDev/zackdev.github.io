---
title: Index Page
layout: default
permalink: /
published: true
---
# This Blog Is:
For any topic that I stumble upon.

An online reference.

A personal playground.

# Links Show Up Here:
<ul class="index_menu">
  {% for post in site.posts limit:5 %}
    <li>
      {{ post.date | date: "%Y-%m-%d" }} <a href="{{ post.permalink }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
{% if site.posts.size > 5 %}
  [Archive ({{ site.posts.size | minus: 5 }})](/archive.html)
{% endif %}
