---
title: A simple browser-based ping
tags: [chart, coding, ping]
published: true
---
Since the well-known ping is not available at browser level, the script on this page retrieves a sample json file from the webserver. The time elapsed from sending the request to receiving the sample, called `Round Trip Time`, is displayed below.

<div id="ping-chart"></div>

<script type="module" src="/assets/js/ping.mjs"></script>
