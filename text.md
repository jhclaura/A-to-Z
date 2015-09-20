---
layout: page
permalink: /text/
title: text
description: ☞ resources / data / inspiration
---

<ul class="post-list">
{% for poem in site.text reversed %}
    <li>
        <h2><a class="poem-title" href="{{ poem.url | prepend: site.baseurl }}">{{ poem.title }}</a></h2>
        <p class="post-meta">{{ poem.date | date: '%B %-d, %Y — %H:%M' }}</p>
      </li>
{% endfor %}
</ul>