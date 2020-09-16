---
title: Archive
layout: default
published: true
---
<ul class="index_menu">
  {% assign sorted_pages = site.pages | sort: "index" | reverse %}
  {% for page in sorted_pages offset:5 %}
    {% if page.list == true %}
      <li>
        <a href="{{ page.permalink }}">{{ page.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  <div style="clear: both;"></div>
</ul>
