---
title: tags
permalink: /tags.html
published: true
---
{% assign tags = "" | split: ", " %}
{% for tag in site.tags %}
    {% assign tags = tags | push: tag[0] %}
{% endfor %}
{% assign tags = tags | sort_natural %}
{% assign schar = "" %}
{% for tag in tags %}
    {% assign tchar = tag | slice: 0 | upcase %}
    {% if schar != tchar %}
        {% assign schar = tchar %}
        {% if forloop.first == true %}
<h1>{{ schar }}</h1>
<div class="flex-row; vam;" style="flex-wrap: wrap;">
        {% elsif foorloop.last == true %}
</div>
        {% else %}
</div>
<h1>{{ schar }}</h1>
<div class="flex-row; vam;" style="flex-wrap: wrap;">
        {% endif %}
    {% endif %}
<a href="/tag/{{tag}}.html" style="padding: 0 5px;">#{{ tag }}</a>
{% endfor %}