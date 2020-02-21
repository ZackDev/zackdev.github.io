---
layout: default
title: homepage
---

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }} {{ post.date.year }}</a>
    </li>
  {% endfor %}
</ul>
