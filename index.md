---
layout: default
title: index page
---
{% for page in site.pages %}
  * [{{ page.title }}]({{ page.url }})
{% endfor %}

[corona chart]({{ site.url }}/pages/corona)
