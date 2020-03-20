---
layout: default
title: homepage
---

<script type="text/javascript" src="/scripts/Chart.min.js"></script>

<ul>
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
