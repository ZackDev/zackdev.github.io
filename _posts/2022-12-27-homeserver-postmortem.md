---
title: homeserver postmortem
tags: [linux, networking]
published: true
archived: false
---
When exploring the local filesystem of my homeserver, i stumbled upon this, in my eyes, with data polluted folder /lib/modules/. Nothing stopped me from deleting a plethora of folders, the damage was done, but only manifested itself after a reboot done a few days later. Debian booted into some emergency mode, `failing to load needed kernel modules` like vfat, which is required to mount fat filesystems. Another custom module and the corresponding fallback module for providing wireless network access failed to load too.

{% include image.html url="/assets/img/server-by-craiyon.png" description="image generated with craiyon.com" %}

With no method left to manually reinstall the missing modules, neither by network nor by using a USB-stick, the time had come. Doing a fresh install seemed the inevitable move to get the machine back running. Luckily, most of the services could be restored by using backed-up configuration files. `Except /etc/network/interfaces`.

During setup, `issuing the dhclient` program provided everything for configuring the network parameters: IP-address, gateway, nameserver. Being a fan of static interface configuration, setting it manually was the way to go. Again, a few days later, it was time to see if the services run after a reboot. Great, connecting from the local network with various services worked. Unfortunately name resolutiton didn't, pinging local IPs did, `pinging public IPs didn't: Network unreachable`. Why didn't it work as after the fresh setup?

Dhclient retrieved the gateway needed for routing, but `I missed to provide it through the static configuration in /etc/network/interfaces`. Consequently, every IP packet destined for other networks than the local didn't have the proper routing information, thus breaking everything that relied on public IPs.