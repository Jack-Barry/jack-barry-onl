---
title: AirPrint Across VLANs with Avahi
description: Getting AirPrint and AirPlay to work across VLANs can be a bit tricky to set up, but is a nice addition to one's home network
published: 2023-02-12T18:11:26+0000
updated: 2023-11-08T04:53:10+0000
tags: ['Home Server & Network']
---

When I first set up my home network to segment different players into their own VLANs,
it ended up blocking AirPrint (and AirPlay) from working if my phone or laptop was
in one VLAN, and the printer or other device was in another. When I went looking
up info on how to allow this functionality to work across VLANs, it looked like I
was in for more effort than I wanted to put in at the time. For a while I've just
gotten around this by hopping onto whatever subnet was needed, printing stuff, then
switching back to our standard subnet. Lately I've been trying to do better about
scratching home projects off of my ToDo list, and finally got around to "Set up printer
sharing across VLANs." ✅

## Background

Before jumping in, just some light background on how our network is set up:

- We use a Mikrotik router
- The relevant VLANs for our use case are for Standard (my wife's and my devices)
  and IoT (the printer, an Epson EcoTank that supports AirPrint)
- We have a server running Proxmox for all home services to run in containers/VMs

### What is Avahi?

AirPrint/AirPlay uses Bonjour, which is basically Apple-ese for mDNS (Multicast DNS).
Avahi is open source software that allows for mDNS based service discovery on your
network. In particular for this use case, it allows you to \"reflect\" traffic from
various interfaces, so that devices in one subnet can be seen by devices in other
subnets.

Note that just because they can "see" each other does not mean they can actually
interact.

## Set Up Avahi in an LXC Container in Proxmox

In Proxmox, create a new container. The template I used for ours is `debian-11-standard_11.6-1_amd64.tar.zst`,
and the following settings (aside from defaults) have been working well for our setup:

- Memory: 128Mb
- Network interface for each VLAN of concern, with DHCP for IPv4
- Start at boot: Yes

Here's an example of the network interface config for a VLAN. I like to give them
each a Name that corresponds to the VLAN tag

![Screenshot of Proxmox config for a network device for the Avahi
container](../../static/images/blog/airprint-across-vlans-with-avahi/proxmox-network-config.png)

Once the container has started, install Avahi:

```shell
apt-get update && apt-get upgrade
apt-get install avahi-daemon avahi-utils
```

Next, edit the Avahi config. I use `vi`, but whatever editor floats your boat, here's
the path to the file:

```shell
vi /etc/avahi/avahi-daemon.conf
```

The key thing here is to set `enable-reflector=yes` under the `[reflector]` section.

```shell
[reflector]
enable-reflector=yes
```

You may also want to limit which interfaces it uses, but since I only set up network
interfaces for the VLANs we're allowing anyway, I left everything else in here at
their default settings.

Finally, edit the service config to allow Avahi to run in the LXC container without
issues

```shell
systemctl edit avahi-daemon.service
```

The key things in this config are to include the blank `ExecStart=` line (it failed
to start for us if I left that out), and to ensure the `--no-rlimits` flag is getting
passed to Avahi

```shell
[Service]
ExecStart=
ExecStart=/usr/sbin/avahi-daemon -s --no-rlimits
```

Once that's all set up, go ahead and reboot the container or run

```shell
systemctl start avahi-daemon
```

Now, to test that the expected devices are broadcasting and being picked up by Avahi,
run

```shell
avahi-browse -a
```

You should get a list of all the broadcasted devices/services, and should be able
to see the stuff from the VLANs you configured. If you don't see anything yet, you
may need to adjust your firewall, then retry this command. Here's some example of
some relevant output from ours for the printer we have

```shell
root@avahi:~# avahi-browse -a
+   eth4 IPv6 Home                                          _hap._tcp            local
+   eth4 IPv4 Home                                          _hap._tcp            local
+   eth4 IPv4 EPSON ET-8550 Series                          UNIX Printer         local
+   eth4 IPv4 EPSON ET-8550 Series                          PDL Printer          local
+   eth4 IPv4 EPSON ET-8550 Series                          Web Site             local
+   eth4 IPv4 EPSON ET-8550 Series                          _scanner._tcp        local
+   eth4 IPv4 EPSON ET-8550 Series                          Internet Printer     local
+   eth4 IPv4 EPSON ET-8550 Series                          Secure Internet Printer local
+   eth4 IPv4 EPSON ET-8550 Series                          _uscan._tcp          local
+   eth4 IPv4 EPSON ET-8550 Series                          _uscans._tcp         local
+   eth4 IPv4 EPSON ET-8550 Series                          Microsoft Windows Network local
+   eth4 IPv6 EPSON ET-8550 Series                          UNIX Printer         local
+   eth4 IPv6 EPSON ET-8550 Series                          PDL Printer          local
+   eth4 IPv6 EPSON ET-8550 Series                          Web Site             local
+   eth4 IPv6 EPSON ET-8550 Series                          _scanner._tcp        local
+   eth4 IPv6 EPSON ET-8550 Series                          Internet Printer     local
+   eth4 IPv6 EPSON ET-8550 Series                          Secure Internet Printer local
+   eth4 IPv6 EPSON ET-8550 Series                          _uscan._tcp          local
+   eth4 IPv6 EPSON ET-8550 Series                          _uscans._tcp         local
+   eth4 IPv6 EPSON ET-8550 Series                          Microsoft Windows Network local
```

With that, your Avahi service is all squared away 🎉

## Allow UDP Traffic in Firewall

Our firewall locks a lot of stuff down, particularly it blocks most IoT devices from
reaching WAN. I wouldn't say I wear a tinfoil hat, but generally don't like the idea
of stuff like my cameras, the kids' FireStick, etc. reporting back a bunch of usage
data without me knowing about it. We also don't allow much interaction _between_
VLANs, similarly because guest devices should only have WAN access but not see stuff
like our HomeAssistant service, cameras, etc. So in our setup, I needed to allow
some UDP traffic for Avahi on our Standard and IoT VLANs in order for the broadcasting
to work.

1. Under **IP** ➞ **DHCP Server** ➞ **Leases** set the IPs that got doled out to
   the Avahi container for each VLAN to static. That way we have predictable addresses
   to allow UDP broadcast for
2. Under **IP** ➞ **Firewall** ➞ **Address Lists**, create an Address List called
   "Avahi" and add each of the container IPs to it
3. Under **IP** ➞ **Firewall** ➞ **Filter Rules**, add a new rule on the _input_
   chain, for the _udp_ Protocol, Src. Address List set to "Avahi", and an Action
   of _accept_. You may also want to lock this down to only allow UDP traffic from
   specific IPs, but I didn't get that granular yet
4. Place the rule within your firewall's order wherever it will make sense for your
   network

In our case, we already have the firewall set up to allow any traffic from our Standard
subnet _to_ the IoT subnet (but not vice versa). If you don't already have that kind
of traffic allowed, you'll need to make sure to set it up. Otherwise your devices/services
being broadcast will be seen, but unreachable otherwise.

At this point, our phones and laptops are able to see the printer on our IoT VLAN,
even when we're on our Standard subnet. We're able to print from the Standard subnet
too. 🖨️ Devices on the Guest network can't even see the printer, which proves that
the firewall is doing its job.

## Conclusion

In hindsight, it wasn't a _lot_ of work to get this feature running, just kind of
over my head as far as what was needed at the onset. I had to mix-and-match a few
different articles and posts before finally getting it all to click, but am glad
I finally got around to it.

Now, my wife (who can't be bothered to learn our network topology 🤓) can easily
print stuff from her phone or laptop when she needs to, I can get more of our stuff
playing nice with HomeAssistant, and in general having AirPrint/AirPlay stuff working
is just convenient. Hopefully if you've run into a similar limitation in your home
network this guide has helped

### Sources

On a final note, here are some of the articles I referenced when figuring this all
out, in case you want some more details

- [Airplay across VLANs using Debian and Avahi](https://nateallen.co.uk/airplay-across-vlans/)
- [AirPlay, VLANs, and an Open Source Solution](https://www.packetmischief.ca/2012/09/20/airplay-vlans-and-an-open-source-solution/)
- [Avahi in LXC Containers](https://www.burgundywall.com/post/avahi-in-lxc-containers)
- [Multicast DNS (MDNS) on Home Networks](http://stevessmarthomeguide.com/multicast-dns/)
