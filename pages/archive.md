---
title: Archive
layout: default
permalink: /archive.html
published: true
---
<ul class="index_menu">
  {% for post in site.posts offset:5 %}
    <li>
      <a href="{{ post.permalink }}">{{ post.date | date_to_string }} - {{ post.title }}</a>
    </li>
  {% endfor %}
  <div style="clear: both;"></div>
</ul>
