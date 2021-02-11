---
title: This Blog Is
layout: default
permalink: /
published: true
---
for any topic that I stumble upon.

an online reference.

a personal playground.

<p id="tacho"></p>

# links show up here:
<ul class="index_menu">
  {% for post in site.posts limit:5 %}
  <li>
    <a href="{{ post.permalink }}">{{ post.title | downcase }}</a>
    <div class="post_info">
      <span class="publish_date">{{ post.date | date: "%Y-%m-%d" }}</span>
      {% assign tags = post.tags | sort_natural %}
      {% for tag in tags %}
      <span class="tag">{{ tag }}</span>
      {% endfor %}
    </div>
  </li>
  {% endfor %}
</ul>
{% if site.posts.size > 5 %}
  [archive ({{ site.posts.size | minus: 5 }})](/archive.html)
{% endif %}


<script>
  tacho(1, {{ site.posts.size }}, 1, 1000, 0.9, '#tacho', 'total posts: ', '.');
</script>
