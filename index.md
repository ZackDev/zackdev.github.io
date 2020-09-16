---
title: Index Page
layout: default
published: true
---
# This Blog Is:
For any topic that I stumble upon.

An online reference.

A personal playground.

# Links Show Up Here:
<ul class="index_menu">
  {% assign sorted_pages = site.pages | sort: "index" %}
  {% for page in sorted_pages %}
    {% if page.list == true %}
      <li>
        <a href="{{ page.permalink }}">{{ page.title }}</a>
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
