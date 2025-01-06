---
title: 'Adventures in Home Networking: Part One'
description: With little hardware or network experience, setting up my first legitimate home network and server came with a steep learning curve. The process has been incredibly rewarding so far though
published: 2022-02-27T03:26:12+0000
updated: 2023-11-08T04:42:23+0000
tags: ['Home Server & Network']
---

Most of what I'll cover in this "series" is pretty much just reminders for future
me on how to get things back up and running if/when shit hits the fan and something
in my home network breaks. It might come in handy for others though, if you're like
me: inexperienced with hardware and networking. Let me provide a little more context
before diving in... I write code for a living, but I have never built my own PC nor
have I ever dealt much with the nitty gritty details of networks. I write code that
submits requests to APIs, and let the really smart people figure out how all the
black magic underneath the hood works.

Recently though, my family had an opportunity to move into a house where we got to
request where to drop the ethernet lines, and I decided to capitalize on that to
ensure my family's network was more robust than the standard "throw the ISP's router
somewhere and call it a day approach. I wanted to set up a server that could do some
neat stuff like provide a Pi-Hole service, handle our PoE cameras, segregate IoT/guest
network/office network traffic, etc. So I had to start navigating some new territory
for my pea-brain: how do I build a server, and how do I build a network? 🤔

## The Hardware

### Network

For the hardware, I decided that I'd go with MikroTik for the network side. Their
hardware has a steep learning curve, but allows for an insane amount of customization
and configuration. I looked at TP-Link and Ubiquiti too, and though they seemed a
little more "entry-level friendly, I decided that the price to feature ratio provided
by MikroTik was better. I might be completely wrong on that 😬 I went for an [RB5009UG+S+IN
router](https://mikrotik.com/product/rb5009ug_s_in) to be the backbone of our network,
and the [hAP ac3](https://mikrotik.com/product/hap_ac3) as the wireless access point.
One of the big selling points on the hAP ac3 was that it seemed like we'd have a
lot of flexibility for setting up a few SSIDs to segregate WiFi traffic, and it also
provides a few ethernet ports to hook up our TV and stereo in the living room. We
may end up needing a second wireless AP for WiFi coverage, but I figured that'd get
us started. (Plus I happen to think the hAP ac3 design is pretty slick and will look
nice in our living room 🥴)

### Server

For the server - I probably made some mistakes, and anyone who knows their stuff
about hardware would likely scream at me, but at least the machine is usable and
I can upgrade/change things as I go along should the need arise. I trolled through
[ServerBuilds.net](https://forums.serverbuilds.net) to get some ideas from people
who know way more about this stuff than I do. I ended up with a server composed
of:

- Supermicro X10SLM-F motherboard
- SR150 Intel Xeon E3-1280 v3 Quad Core CPU
- 32GB (4x8GB) DDR3 PC3-10600E ECC RAM
- ADATA Ultimate Series SU750 1TB SATA III SDD
- Two Hitachi HUH728080AL4200 8TB SAS HDDs
- LSI 9207-8i (IBM M5110) PCI-E Card

Full disclosure, no friggin' clue how far that'll get me, but it seems like it'll
do the trick for a server that's primarily supposed to serve as a NAS device.

## Getting the Hardware Put Together

After ordering all the server components off of eBay, and a chassis/fans/power supplies
from Amazon, I got to work piecing together what's sure to be considered an atrocity
to good nerds everywhere. Excitement rushed over me as I finally got everything connected
and flipped the power switch for the first time. Of course, it didn't go as smoothly
as I'd hoped. I kept hearing a sequence of beeps when powering on the machine, and
thought that they corresponded to the motherboard manual's reference to a "5 beeps
on startup" code that indicated a memory missing error. I ordered a new set of memory
cards and tried swapping out the original RAM I had installed with those, but still
got the beeps. I soon learned that the indication of "Okayness" I was expecting in
the form of output to my monitor wasn't reliable in my case.

I don't have a VGA monitor (I mean, who tf does anymore unless it's lying around
in a shed somewhere?), but the only video output on the motherboard I went with is
VGA. I tried a VGA to HDMI adapter, but nothing was output to my monitor. So a little
internet sleuthing later and I learned about Supermicro's IPMI option. At this point,
I had the server and my MacBook bridged using the MikroTik router, took a look into
the router's DHCP leases, and figured out that the server was indeed connected to
the network. So I tried connecting to it directly in MacOS, but the Java client to
use KVM via IPMI kept shitting the bed. I don't want to have to keep track of what
Java version is compatible with the IPMI tools or tie my main OS to it, so I opted
for setting up an Ubuntu VM as my "server administration machine."

In my Ubuntu VM, I downloaded [IPMIView for Linux from Supermicro's website](https://www.supermicro.com/SwDownload/SwSelect_Free.aspx?cat=IPMI).
After downloading it and seeing if it worked or not, I added an alias in my `.bashrc`
file so that I can just run `ipmi` when I want to pull up the GUI to interact with
the server through IPMI. To connect to it, I used the IP address listed under the
router's DHCP leases.

Once I got connected to the motherboard through IPMI, I was able to get a KVM session
opened up to see what the hell I was doing in there with a mouse and keyboard connected
via USB to the server. I rebooted the machine, then held down `DEL` while it booted
to boot into the BIOS menu. From there, I told it to boot up from my USB stick with
the ISO on it for ProxMox. (I decided ProxMox was a good choice for the server OS
so that I can virtualize workloads)

## Getting the Server Software Set Up

Now came the frustrating part for someone with no networking background - how do
I get ProxMox set up so that I can actually connect to it on my network? Several
reinstalls and configuration trials-and-errors later, I figured out that for my clumsy
network setup the following seemed to do the trick:

- I used an IP address of `192.168.88.10/24` (`192.168.88.10` was the first unreserved
  IP address in the DHCP pool on my router. Mikrotik doles out the IP addresses from
  highest value to lowest, so I opted for the lowest value just to keep the mental
  model of static vs. dynamic IPs simple)
- Used a gateway of `192.168.88.1`. I found the gateway value from looking at my
  MacBook's network settings, as well as the gateway value in my Mikrotik router
  for the corresponding DHCP network
- Last but not least, I had to make sure to _switch the cable from the IPMI-specific
  port over to a standard port_. For whatever reason, the ProxMox server would not
  show up on my network while still connected via the IPMI-specific port on the server.
  (Once again, anybody who knows fuck about shit about hardware and/or networking
  is probably screaming right now)

Some things that helped me when troubleshooting the connection:

- Logging in to the ProxMox server requires using `root` as username, and whatever
  password was configured during ProxMox setup
- Attempting ping `192.168.88.1` confirmed whether I could reach the router from
  the ProxMox server
- Loading `https://192.168.88.10:8006` in a browser on my MacBook let me know if
  the ProxMox web GUI was accessible from my computer

## Conclusion

Finally after all of that, I got the server up and running, logged into ProxMox,
and am now ready to start virtualizing some home server workloads 🤟

By that point it was already evening time so I called it a night. Perfect place to
conclude this entry in the series. Goodnight!

## Epilogue

I will, in all likelihood, update the network to use some different IPs than what
I mentioned in this post, if only to add a little security via obfuscation. However,
I think that the notes provided will be helpful in future troubleshooting for myself
and others when implementing a similar setup 🙂
