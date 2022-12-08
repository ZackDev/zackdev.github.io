---
title: followup a technique using DNS for blocking webcontent
tags: [linux, dns, block-content]
published: true
archived: false
---
This post shows how to further take control of the name resolution process. In addition to the setup introduced [in this post]({% post_url 2022-11-24-a-technique-using-DNS-for-blocking-webcontent %}), which was used to block certain domains from getting passed to a public recursive DNS-resolver, the public funtionality gets realized in the local network by setting up a self-hosted DNS-resolver, which recursively queries DNS-servers starting at the DNS-root-servers as listed by the [Internet Assigned Numbers Authority](https://www.iana.org/domains/root/servers), while preserving the blocking functionality.

{% include image.html url="/assets/img/dns-resolver.png" description="" %}

The chart above shows the hosts and paths involved which emerge from the different setups (A.* (default) and B.* (intended)). The main purpose of setup B is to replace the public recursive DNS-resolver with a self-hosted, private one. The motivation is derived from the fact that a query for the name `example.com` in setup A can be logged and manipulated by the operator of the public recursive DNS-resolver. Further enhancements are to block certain domain resolutions and to provide a zone for the local network.

Resolving a *Fully Qualified Domain Name (FQDN)* by the Domain Name System starts at the root zone, followed by the *Top Level Domain (TLD)* and subsequent subdomains separated by dots, each answering queries specified for their domain. This explains the recursive nature of the DNS-resolver as implied by the steps A.2.* and B.3.*.

# Setting up unbound

Debian provides the unbound package, a caching, recursive DNS resolver, which additionally can be configured as DNS server for specific names, without the need for querying the domain name system.

``` terminal
apt install unbound
```

Unbound reads it's configuration from `/etc/unbound/unbound.conf` and from `<anyname>.conf` in the `/etc/unbound/undbound.conf.d/` directory. For segregation, unbound.conf holds basic parameters, details about the local network are defined in local.conf and block.conf finally defines domain-names for which `NXDOMAIN` is to be returned.

# /etc/unbound/unbound.conf:

{% highlight config linenos %}
server:
        root-hints: "/etc/unbound/named.root" 

        interface: 10.0.0.11
        interface: 127.0.0.1

        access-control: 10.0.0.0/8 allow
        access-control: 127.0.0.0/8 allow
{% endhighlight %}

Line 2: by default, unbound has hardcoded information about the root zone. Servers in the zone might change, so by [downloading](https://www.internic.net/domain/named.root) and adding the file as `root-hints` to the config is a good practice.

Line 4-5: specifies network interfaces, unbound operates on. In this setup, queries from the localhost and the local network are answered.

Line 7-8: limit access to the server by IP, CIDR notation.

# /etc/unbound/unbound.conf.d/local.conf:

Names and IPs for which the public Domain Name System is not responsible can be added and served like this. Assume that the local domain is named `sol`, that there are two entities, a client (10.0.0.1) called `mars` and a server (10.0.0.11) going by the name of `saturn`.

{% highlight config %}
server:
        local-zone: "sol." static
        local-data: "mars.sol.      IN A 10.0.0.1"
        local-data: "saturn.sol.    IN A 10.0.0.11"
        local-data-ptr: "10.0.0.1   mars.sol."
        local-data-ptr: "10.0.0.11  saturn.sol."
{% endhighlight %}

`local-zone: "sol." static` defines the local zone `sol.`. Queries for this zone don't get recursively queried, but rather looked up locally by searching for entries of type `local-data: "<resource record string>"`. There are numerous types of RRs, for this usecase, the A (IPv4 address) type is sufficient. A query for `mars.sol` is answered with `10.0.0.1`. The `local-data-ptr: "<IPaddr> <name>"` is an entry for reverse lookups, which delivers a name for an IP-address.

# /etc/unbound/unbound.conf.d/block.conf:

Entries defined by `local-zone: "<domain>" always_nxdomain` get answered with the NXDOMAIN status.

{% highlight config %}
server:
        local-zone: "blocked.domain" always_nxdomain
        local-zone: "another-blocked.domain" always_nxdomain
{% endhighlight %}

The following bash script fetches a list of ip-name-pairs and converts it to the config file format unbound expects, and saves the result to the block.conf. The new entries get read by reloading unbound while conserving the cache of resolved entries.

{% highlight bash %}
#!/bin/bash

# ds: url of the hosts file to download
# dt: target to save <ds> to
# ll: file to save the list of blocked domains to
# cl: file to save the unbound cache to
# hs: hosts file size

ds='https://raw.githubusercontent.com/StevenBlack/hosts/master/hosts'
dt='/etc/unbound/hoststoblock'
ll='/etc/unbound/unbound.conf.d/block.conf'
cl='/etc/unbound/cache.dump'

wget $ds -O $dt

hs=$(du $dt | cut -f 1)

if [[ -f $dt && $hs -gt 4 ]]; then
    echo "server:" > $ll
    cat $dt | awk '/^0.0.0.0/ {print "\tlocal-zone: "$2" always_nxdomain"}' >> $ll
    unbound-control dump_cache > $cl
    unbound-control reload
    cat $cl | unbound-control load_cache
    rm $dt $cl
fi
{% endhighlight %}

# Testing the setup

Some examples to query unbound using dig. 

{% highlight terminal %}
dig @127.0.0.1 -p 53 example.com

dig @127.0.0.1 -p 53 blocked.domain

dig @127.0.0.1 -p 53 mars.sol

dig @127.0.0.1 -p 53 invalid.sol

dig @127.0.0.1 -p 53 -x 10.0.0.1
{% endhighlight %}

# Hardening unbound

Don't leak private IPs to upstream DNS-servers when performing reverse lookups:

{% highlight config %}
server:
        private-address: 10.0.0.0/8
        private-address: 192.168.0.0/16
{% endhighlight %}

Minimize the QNAME sent to upstream DNS-servers:

{% highlight config %}
server:
        qname-minimization: yes
{% endhighlight %}

# Allowlisting domain-names

Is it possible to build a config which allows resolving specific domains while dropping the unspecified?

Define the root zone as a local-zone, which gets answered with NXDOMAIN. Then subsequently define transparent local-zones for domains that should get resolved normally. Note that this also allows subdomains of example.com resolved but not relative superdomains like .com. This does not mean that the process of resolving example.com doesn't include querying the com. domain for the example. subdomain.

{% highlight config %}
server:
        local-zone: "." always_nxdomain
        local-zone: "example.com" transparent
{% endhighlight %}

# Links found on the way:
* [unbound homepage](https://nlnetlabs.nl/projects/unbound/about/)
* a [complete list of TLDs](https://data.iana.org/TLD/tlds-alpha-by-domain.txt) as served by the IANA root zone.