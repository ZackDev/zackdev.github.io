---
title: Archive
layout: default
published: true
---
<ul class="index_menu">
  {% assign sorted_pages = site.pages | where: 'list', true | sort: "index" | reverse %}
  {% for page in sorted_pages offset:5 %}
    <li>
      <a href="{{ page.permalink }}">{{ page.title }}</a>
    </li>
  {% endfor %}
  <div style="clear: both;"></div>
</ul>
