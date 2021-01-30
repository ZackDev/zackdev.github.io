---
title: Archive
layout: default
permalink: /archive.html
published: true
---
<ul class="index_menu">
  {% for post in site.posts offset:5 %}
    <li>
      <a href="{{ post.permalink }}">{{ post.date | date: "%Y-%m-%d" }} {{ post.title }}</a>
    </li>
  {% endfor %}
  <div style="clear: both;"></div>
</ul>
