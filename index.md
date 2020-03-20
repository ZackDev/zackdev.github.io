---
layout: default
title: homepage
---

{% include chart.html %}

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>

build date: {{ site.time }}
