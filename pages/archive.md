---
title: Archive
layout: default
permalink: /archive.html
published: true
---
<ul class="index_menu">
  {% for post in site.posts offset:5 %}
    <li>
      {{ post.date | date: "%Y-%m-%d" }} <a href="{{ post.permalink }}">{{ post.title }}</a>
    </li>
  {% endfor %}
  <div style="clear: both;"></div>
</ul>
