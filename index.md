---
title: index page
layout: default
published: true
---
<ul>
  {% for page in site.pages %}
    {% if page.list == true %}
      <li>
        <a href="{{ page.url}}">{{page.title}}</a>
      </li>
    {% endif %}
  {% endfor %}
</ul>
