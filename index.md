---
title: index page
layout: default
published: true
---
{% for page in site.pages %}
  {% if page.list == true %}
    - [{{ page.title }}]({{ page.url }})
  {% endif %}
{% endfor %}

- [corona chart germany]({{ site.url }}/pages/corona)
- [morse code generator]({{ site.url}}/pages/morse)
- [xmlhttp ping]({{ site.url }}/pages/ping)
