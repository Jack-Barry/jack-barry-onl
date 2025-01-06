---
title: 'Adventures in Home Networking Part Two: MikroTik on EVE NG'
description: EVE NG is a nifty tool for you to try out your network configuration without screwing up the actual network your family is relying on
published: 2022-03-12T22:49:10+0000
updated: 2023-11-08T04:42:05+0000
tags: ['Home Server & Network']
---

After getting a server up and running (documented in [part one](/blog/adventures-in-home-networking-part-one)
of this "series"), the next major hurdle to get through in setting up a home network
was, well, the network 🥴 I already bought the [MikroTik RB5009UG+S+IN](https://mikrotik.com/product/rb5009ug_s_in)
that will serve as our home's main router. We're currently living with my in-laws
while our house gets finished being built, so I can't set up their AT&T router in
DMZ mode to test out the real deal, but I tried tinkering a bit with my laptop connected
directly to the RB5009. This had mixed results, but it seemed less than ideal to
be messing with the actual device's config without _really_ knowing what I was doing.

There's an awesome YouTuber, [TheNetworkBerg](https://www.youtube.com/c/TheNetworkBerg),
who will likely come up if you do any searches for how to do stuff with MikroTik.
In his tutorials, he demonstrates with virtualized equipment using a program called
[EVE-NG (Emulated Virtual Environment Next Generation)](https://www.eve-ng.net),
which is really cool because it allows you to emulate a virtual network to test stuff
out and see if you've got it configured correctly, without worrying about accidentally
knocking out a home network that your family is relying on 😃 This is ideal for prototyping
your initial network config, as well as testing out any updates or changes you might
want to make later before deploying them "to production."

The trick with EVE-NG is, there wasn't any super clear, "explain it to me like I'm
5" docs around setup for laymen like myself. So that's what I'll be covering here
today. This will cover how I got it set up on MacOS, but the flow should be pretty
similar in Windows aside from a few details.

## Prerequisites

Before getting started you'll need to have VMWare Fusion installed on your machine.
It will also help to have an FTP client like [Cyberduck](https://cyberduck.io).

## Set Up the EVE-NG Guest Machine

First, head over to the [EVE-NG downloads page](https://www.eve-ng.net/index.php/download/#DL-COMM).
Here, you'll be looking for the section named **Free EVE Community Edition**. Download
the `.iso` image from whichever source you like. While you're there, it's a good
idea to grab their _Client Side_ tool kit for your machine's platform (MacOS or Windows).
Without the _Client Side_ toolkit it'll be difficult to connect to your EVE-NG network
nodes later.

Next, in VMWare Fusion open the dialogue to create a new VM. Drag and drop the `.iso`
you just downloaded into the window. Make sure to **_deselect_** _Use Easy Install_.
I didn't do this the first time I tried creating the VM, and it prevented my EVE-NG
guest from booting up properly because part of the EVE-NG initial boot is creating
user login credentials, vs. setting them up in VMWare Fusion 🤦🏻‍♂️ As far as I
can tell, using the _Legacy BIOS_ option is fine.

Before booting the VM, make sure you go into its settings, and under **Processors
& Memory**, toggle **Advanced Options** then ensure _Enable hypervisor applications
in this virtual machine_ is selected.

## Start the EVE-NG Guest

Now your EVE-NG guest should be ready to boot up, so go ahead and start it, then
follow the prompts to finish the installation on the VM. I don't know how important
it is for your host to function properly, but I noticed that the default settings
didn't pick up on my time zone, so I had to adjust that during setup. I also opted
for the _Install security updates automatically_ option.

After it boots up, log into it with the default credentials (username `root`, password
`eve`). Finalize the installation by following the prompts. I opted for the defaults
for pretty much everything except gave it a domain name of `eveng.housebarry.local`.
After you complete the process, you'll get a prompt in MacOS telling you that the
VM wants to see network traffic. You'll need to allow it for the software to do its
thing.

Finally, the machine will finish booting and it should display an IP address that
you can reach it at. Open a browser and navigate to that IP address, and you should
be able to start playing around with EVE-NG! (Note that username for the web UI is
`admin`, password is `eve`).

## Set Up a Lab Network with Internet

A big part of your home network will involve being able to reach the internet, so
you'll need to have "internet" represented in your lab network. In EVE-NG, add a
new lab, naming it whatever you want. Right click anywhere in the grid of your new
lab, and select **Network**. The important part here is to select a **Type** of _Management(Cloud0)_
which represents the internet. (It also might help to set the **Name** of this network
to _Internet_ to keep it clear what it represents).

## Install MikroTik's RouterOS on the EVE-NG Guest

EVE-NG offers some [instructions on how to install MikroTik's RouterOS](https://www.eve-ng.net/index.php/documentation/howtos/howto-add-mikrotik-cloud-router/),
but some details are missing that help, which I'll provide below.

When downloading a copy of RouterOS from MikroTik's downloads page, make sure to
select the section for **Cloud Hosted Router**. From there, pick a stable version
of RouterOS, and download the _Raw Disk Image_ option. Using your FTP client, connect
to your EVE-NG guest using it's IP address (use SFTP protocol). Make a folder in
your host at `/opt/unetlab/addons/qemu/mikrotik-<VERSION>/` then upload the `.img`
file there.

You don't really need to SSH into the instance if you've already got it open as a
VM, so in the window where your VM is open, run the following commands:

```shell
cd /opt/unetlab/addons/qemu/mikrotik-<VERSION>
mv chr-<VERSION>.img hda.qcow2
/opt/unetlab/wrappers/unl_wrapper -a fixpermissions
```

## Add a MikroTik Router to Your Lab Network

At this point, you should be all set to go into the EVE-NG web UI in your browser,
right click in the grid, and add a **Node**. When setting the node's options, select
_MikroTik RouterOS_ for the **Template**. Default settings should be fine. Hover
over the device, then click and drag the little plug icon up to the _Internet_ node
to establish a connection between the router and the internet. BAM! You've got a
virtual network going 🥳

## Follow TheNetworkBerg's Tutorials

Since I am admittedly not a network professional, I'll once again refer you to [TheNetworkBerg's
YouTube channel](https://www.youtube.com/c/TheNetworkBerg) for tutorials on getting
a MikroTik router set up from here on out. With your basic lab set up, you should
be ready to dive into his [Getting Started with MikroTik video series](https://www.youtube.com/watch?v=OXZAXPZce4U&list=PLJ7SGFemsLl3V7kM9a6QY-9R1jALrnZKc).

Hope this walkthrough helps anyone else trying to get started with MikroTik RouterOS
on EVE-NG, thanks for reading!
