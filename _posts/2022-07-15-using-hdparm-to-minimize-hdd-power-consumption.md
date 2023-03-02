---
title: Using hdparm to minimize HDD power consumption
tags: [linux, hdparm, hdd]
published: true
---
The following steps are only recommended if it fits your hard drive usage. In my case, the hard drive is only used for storing a few MB of data once a day. So most of the time it sits there in idle state.

Hard Disk Drives, like this one, generally know 3 different operating states. Each with different characteristics. HDDs stay in the active/idle state to realize fast data access times and to reduce the wear-and-tear of physically start spinning and stopping the disks.

| | active | idle | standby |
| --- | --- | --- | --- |
| read-write head | moving | resting | resting |
| disks rotating | &#10003; |  &#10003; | &#10003; or &#10007; |
| power consumption | high | medium | low |
| ST2000VN004 | 4.85W | 3.96W | 0.5W |

While the absolute reduction of consumed power `2.46W` seems negligible, it's relative value is around `62 percent`.

Regulation of the state is done by the HDD firmware in combination with the drive's settings which can be viewed and changed with tools like [https://www.smartmontools.org/](https://www.smartmontools.org/) and [https://sourceforge.net/projects/hdparm/](https://sourceforge.net/projects/hdparm/). `hdparm` can be configured with a config file which values get fed to the drive when booting the computer. This allows persisting the settings.

NOTE: *SeaGate, for example, use their own power management for some of their drives, which knows 6 states. [https://github.com/Seagate/openSeaChest](https://github.com/Seagate/openSeaChest)*

## Using hdparm

[https://www.man7.org/linux/man-pages/man8/hdparm.8.html](https://www.man7.org/linux/man-pages/man8/hdparm.8.html)

First things first, install the tool:

```console
~# apt-get install hdparm
```

Check the HDD `Advanced Power Management` value.

```console
~# hdparm -B <device>
```

Substitute &lt;device&gt; with the actual device. Use `/dev/sda` for example.

```console
~# hdparm -B /dev/sda

 /dev/sda:
 APM_level      = 254
```

This either returns a value from 1 to 254 or not supported. In short, values ranging from 1 to 127 permit the disks to spin down while values in the range of 128 to 254 indicate otherwise. 

To set the power management parameter, use the command like this.

```console
~# hdparm -B <value> <device>
```

Substitute &lt;value&gt; and &lt;device&gt;.

```console
~# hdparm -B 1 /dev/sda
 
 /dev/sda:
 setting Advanced Power Management level to (0x01) 1
 APM_level      = 1
```

Change the threshold the hard drive has to be in the idle state before it spins down the disks. `The <value> parameter is the odd one out.`

```console
~# hdparm -S <value> <device>
```

Substitute &lt;value&gt; and &lt;device&gt; to spin down /dev/sda `after 10 consecutive minutes in idle state`.

```console
~# hdparm -S 120 /dev/sda

 /dev/sda:
 setting standby to 120 (10 minutes)
```

Persist the settings over reboot by editing /etc/hdparm.conf:

```plaintext
/dev/sda {
    apm = 1
    spindown_time = 120
}
```

## Is that all?

No, unfortunately not. After some testing, by accessing files so the drive goes `active` -> `idle` -> `standby`, which yielded inconsistent results, the drive's manual provided the missing information:

{% include image.html url="/assets/img/seagate-manual.png" %}

So, this specific drive neither supports the general APM nor the vendor specific mechanism. `First thing to do should have been RTFM`.
