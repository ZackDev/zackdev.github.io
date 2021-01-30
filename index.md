---
title: Index Page
layout: default
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
      <a href="{{ post.permalink }}">{{ post.date | date_to_string }} | {{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
{% if site.posts.size > 5 %}
  [Archive ({{ site.posts.size | minus: 5 }})](/archive.html)
{% endif %}
