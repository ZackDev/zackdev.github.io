---
title: Archive
layout: default
permalink: /archive.html
published: true
---
<ul class="index_menu">
  {% for post in site.posts offset:5 %}
    <li>
      <a href="{{ post.permalink }}">{{ post.title | downcase }}</a>
      <div class="post_info">
      <span class="publish_date">{{ post.date | date: "%Y-%m-%d" }}</span>
      {% assign tags = post.tags | sort %}
      {% for tag in tags %}
      <span class="tag">{{ tag }}</span>
      {% endfor %}
      </div>
    </li>
  {% endfor %}
  <div style="clear: both;"></div>
</ul>
