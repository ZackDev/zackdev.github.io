---
title: A Simple Browser-Based Ping
layout: default
tags: [coding, ping]
published: true
archived: true
---
Since the well-known ping is not available at browser level, the script on this page retrieves a sample json file from the webserver. The time elapsed from sending the request to receiving the sample is displayed below.

{% include div.html name="ping_chart" %}

{% include javascript.html src="/assets/js/ping.js" %}
