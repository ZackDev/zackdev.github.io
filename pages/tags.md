---
title: Tags
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
<div class="flex-row vam" style="flex-wrap: wrap;">
        {% elsif foorloop.last == true %}
</div>
        {% else %}
</div>
<div class="flex-row vamcd" style="flex-wrap: wrap;">
        {% endif %}
    {% endif %}
<a class="tag-link" href="/tag/{{tag}}.html" style="padding: 0 5px;">{{ tag }}</a>
{% endfor %}
