---
title: followup a technique using DNS for blocking webcontent
tags: [linux, dns, block-content]
published: true
archived: false
---
This post shows how to further take control of the name resolution process. In addition to the setup introduced [in this post]({% post_url 2022-11-24-a-technique-using-DNS-for-blocking-webcontent %}), which was used to block certain domains from getting passed to a public recursive DNS-resolver, the public funtionality gets realized in the local network by setting up a self-hosted DNS-resolver, which recursively queries DNS-servers starting at the DNS-root-servers as listed by the [Internet Assigned Numbers Authority](https://www.iana.org/domains/root/servers), while preserving the blocking functionality.

{% include image.html url="/assets/img/dns-resolver.png" description="" %}

The chart above shows the different  topologies (A.* and B.*)