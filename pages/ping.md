---
title: http ping
layout: default
published: true
list: true
---
# A Simple Browser-Based Ping:
Since the well-known ping is not available at browser level, the script on this page retrieves a sample json file from the webserver. The time elapsed from sending the request to receiving the sample is displayed below. To minimize bandwidth usage, there is a 10 second interval.
{% include ping.html %}
