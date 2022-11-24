---
title: a technique using DNS for blocking webcontent
tags: [linux, dns, block content]
published: true
archived: false
---
The internet offers a multitude of content to the user, which contain different user tracking and profiling mechanics like `third party cookies` or `zero sized pixels`. Utilizing freely available tools can reduce the potential chance of exposure.

# Block content at different system levels

## Program
Typical example is an AdBlocker plugin for browsers, which prevents Ads from getting inserted into the DOM. This does, however, only stop the browser from accessing certain content.

## Local System
Easiest way to block certain domain names is to modify `/etc/hosts` file which gets searched for hostnames before a request is made to an DNS resolver.

``` config
blocked.domain 0.0.0.0
```

Any program relying on the hosts file that wants to know the IP-Address of `blocked.domain` now receives the non-routable IP-address `0.0.0.0`[^1].

## Network
The most elegant solution, especially if you have several devices in your network, is to block at network level, by setting up a lightweight DNS forwarder.

Usually, clients use the DNS-resolver (A.1) assigned to them by the DHCP mechanism of your router, which in turn points to a DNS-server (A.2) designated by the ISP. Simply said, looking up `example.com` is answered by your ISP.

{% include image.html url="/assets/img/dns-forwarder.png" description="" %}

By using a DNS forwarder it is possible to control which DNS-resolver is choosen for requests and, in some cases, which requests get passed to the DNS-resolver specified. Clients send requests to the forwarder (B.1), the forwarder checks its' dataset for a matching entry (B.2) and returns the matching IP-address, or, if no entry is found, sends the request to the DNS-resolver (B.3) and returns the result obtained through the dns-server (B.4) back to the client.

As noted above, the 0.0.0.0 address is a special case where the forwarder responds with the `NXDOMAIN` message, indicating that the domain is non-existant.

# Prerequisites for a forwarder
Following the chart above, the forwarder needs a DNS-resolver to use for name resolution. Many profit and non-profit oriented organiations provide DNS-resolvers within their mode of operations. Note that DNS-resolvers can be used to censor, misdirect and track those who use it.

If there is a need to block certain domains, the forwarder needs to be able to process a list of names and domains for which it returns `NXDOMAIN`. Thankfully there are numerous maintained lists. This project here[^2] combines a plethora of lists and makes the aggregate available for download[^3].

# Setting up the forwarder
Debian provides `dnsmasq`[^4] which has the needed features. Assume that it's IP is 10.0.0.11, which is later needed to configure the clients.

Install:
``` terminal
apt install dnsmasq
```

Edit `/etc/resolv.conf` and add the loopback address as nameserver. Programs relying on the resolv.conf now use the locally running dnsmasq server:
``` config
nameserver 127.0.0.1
```

Create `/etc/dnsmasq-resolv.conf` and add your preferred DNS-resolver:
``` config
nameserver <dns-resolver-ip>
```

Download and save the hosts file to `/etc/dnsmasq-addn-hosts`:
``` bash
wget https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts -O /etc/dnsmasq-addn-hosts
```

Modify `/etc/dnsmasq.conf`:
``` config
domain-needed
bogus-priv
resolv-file=/etc/dnsmasq-resolv.conf
addn-hosts=/etc/dnsmasq-addn-hosts
```
* domain-needed: only forward domain names
* bogus-priv: don't forward private IPs when doing reverse lookups
* resolv-file: use nameserver from file other than /etc/resolv.conf
* addn-hosts: read additional ip-host-pairs from this hosts style formatted file

For the new config parameters to be read, restart the service. Check if the host uses the forwarder.
``` terminal
systemctl restart dnsmasq.service
...
dig example.com

; <<>> DiG 9.16.33-Debian <<>> example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 25182
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		79148	IN	A	93.184.216.34

;; Query time: 108 msec
;; SERVER: 127.0.0.1#53(127.0.0.1)
;; WHEN: Wed Nov 23 15:03:33 CET 2022
;; MSG SIZE  rcvd: 56
```

If the `/etc/dnsmasq-addn-hosts` file changes in the future, a `systemctl reload dnsmasq.service` is sufficient to re-read it's content.

# Setting up the clients
Tell the client to use the newly created forwarder by editing it's `/etc/resolv.conf`. Note this procedure differs if the resolv.conf is controlled by another application like the `NetworkManager.service`.
``` config
nameserver 10.0.0.11
```

Check if the client uses the forwarder with a request for an address of a non-blocked domain, yes, `example.com` is real. Looking at the output, it is expected to see that the responding server is located at 10.0.0.11 and it's answer for example.com is 93.184.216.34.
``` terminal
dig example.com

; <<>> DiG 9.16.33-Debian <<>> example.com
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 25182
;; flags: qr rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;example.com.			IN	A

;; ANSWER SECTION:
example.com.		79148	IN	A	93.184.216.34

;; Query time: 108 msec
;; SERVER: 10.0.0.11#53(10.0.0.11)
;; WHEN: Wed Nov 23 15:03:33 CET 2022
;; MSG SIZE  rcvd: 56
```

At this point the client uses the forwarder which returns an IP-Address provided by the DNS-resolver.

Repeat the above with a blocked domain. As with the previous output, the response comes from 10.0.0.11 plus the relevant answer for blocked.domain is 0.0.0.0, as defined in `/etc/dnsmasq-addn-hosts`.
``` terminal
dig blocked.domain

; <<>> DiG 9.16.33-Debian <<>> blocked.domain
;; global options: +cmd
;; Got answer:
;; ->>HEADER<<- opcode: QUERY, status: NOERROR, id: 52218
;; flags: qr aa rd ra; QUERY: 1, ANSWER: 1, AUTHORITY: 0, ADDITIONAL: 1

;; OPT PSEUDOSECTION:
; EDNS: version: 0, flags:; udp: 4096
;; QUESTION SECTION:
;blocked.domain.			IN	A

;; ANSWER SECTION:
blocked.domain.		0	IN	A	0.0.0.0

;; Query time: 96 msec
;; SERVER: 10.0.0.11#53(10.0.0.11)
;; WHEN: Wed Nov 23 15:05:41 CET 2022
;; MSG SIZE  rcvd: 56
```

# Notes
Client cashes dns?:
``` terminal
ipconfig /flushdns
```

Firewall separating clients and forwarder needs open port 53 for TCP and UDP.

dnsmasq config is invalid, check all config files:
``` terminal
dnsmasq --test
```

Test a specific config:
``` terminal
dnsmasq --test -C <your.conf>
```

Automate hosts file download and reloading dnsmasq with cron:
``` terminal
crontab -e

0 0 * * * wget https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts -O /etc/dnsmasq-addn-hosts && systemctl reload dnsmasq.service
```

[^1]: <https://en.wikipedia.org/wiki/0.0.0.0>
[^2]: <https://github.com/StevenBlack/hosts>
[^3]: <https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts>
[^4]: <https://dnsmasq.org/>
