---
title: index page
layout: default
published: true
---
<ul class="index_menu">
  {% for page in site.pages %}
    {% if page.list == true %}
      <li>
        <a href="{{ page.url }}">{{ page.title }}</a>
      </li>
    {% endif %}
  {% endfor %}
  <div style="clear: both;"></div>
</ul>

<ul class="index_menu">
  {% for post in site.posts %}
    <li>
      <a href="{{ post.url }}">{{ post.title }}</a>
    </li>
  {% endfor %}
</ul>
