---
title: Set Up Coral PCIe for Frigate Running on Proxmox LXC
description: If you're already running Frigate on a Docker container inside an LXC container on Proxmox and want to use a Google Coral PCIe device as the detector, it takes a few steps to get there. This tutorial covers the steps I took to get mine working.
published: 2023-04-15T17:49:18+0000
updated: 2023-11-08T04:43:01+0000
tags: ['Home Server & Network']
---

About a year ago, I ordered a [Google Coral Mini PCIe Accelerator](https://coral.ai/products/pcie-accelerator)
to use with my installation of [Frigate](https://frigate.video) for our PoE cameras.
Due to chip shortages, it didn't arrive until about a week ago, and when it did arrive
I realized I should have ordered one of the M.2 versions to fit my mobo's regular
PCIe slots 🤦🏻‍♂️ Luckily, I was able to snag a [Mini PCIe → PCIe x1 adapter](https://www.amazon.com/dp/B0B6HYW2CB)
for pretty cheap and get the physical device installed. I removed the antennae connectors
on the adapter since I wasn't using the adapter for WiFi or Bluetooth. After the
physical install, I had to jump through a few hoops to get it set up for use with
Frigate.

## Driver Setup

For the most part, [Coral's docs on setup](https://coral.ai/docs/m2/get-started/)
were pretty much all that was needed to get the drivers set up on my machine. I just
logged into my Proxmox node and ran the commands in the shell. However, I did hit
a couple of snags, and here's how I resolved them.

Everything went fine until I went to `run ls /dev/apex_0` to verify that the PCIe
driver was loaded after rebooting, and got a response of:

```shell
ls: cannot access '/dev/apex_0': No such file or directory
```

Searching around, I found [this thread](https://forum.proxmox.com/threads/install-of-pcie-drivers-for-coral-tpu.95503/#post-478721)
explaining a workaround to get it going. For my case, I had to run the following
to update/upgrade everything and get the necessary packages installed correctly:

```shell
apt update
apt upgrade
apt install pve-headers
apt install --reinstall gasket-dkms
```

After rebooting, all was well, and `ls /dev/apex_0` resulted in the expected output
per the Coral docs. I was then able to continue on to install the PyCoral library.

## Configuration for Frigate on Docker in LXC Container

I have a bit of an "Inception" situation for Frigate on Proxmox; it runs on a Docker
container, and Docker itself is running inside of an LXC container. I also use Portainer
installed on the LXC container to make Docker management a little easier. In order
to get the PCIe Coral available to the Frigate Docker container, and to get the Frigate
config set up to use it, I took the following steps.

### Make the Device Available to the LXC Container

In order for the device to be available to the Frigate Docker container, first we
need to make `/dev/apex_0` available to the LXC container. Thanks to [this comment
on Reddit](https://www.reddit.com/r/homeassistant/comments/xzajo0/comment/jcqipzp/?utm_source=share&utm_medium=web2x&context=3),
I was able to figure this part out. In the Proxmox node shell, open `/etc/pve/lxc/<CONTAINER_ID>.conf`
for editing. I use `vi` for editing, but use whatever you like. Also, note that my
container ID in the example is `102`, but replace that value with the ID of yours
to edit the correct config.

```shell
vi /etc/pve/lxc/102.conf
```

Add the following lines to the config:

```shell
lxc.cgroup2.devices.allow: c 120:* rwm
lxc.mount.entry: /dev/apex_0 dev/apex_0 none bind,optional,create=file
lxc.mount.auto: cgroup:rw
```

### Add the Device to Docker Config

I have our Docker container for Frigate set up using compose via Portainer, so this
part was as easy as going to **Stacks** → **frigate** → **Editor**, and adding the
`devices` section to the compose config. If you're not running Portainer, why not?
😛 And if you're not using Docker compose... really... why not? 😳

```yaml
version: '3.9'
services:
  frigate:
    # other config settings
    devices:
      - /dev/apex_0:/dev/apex_0
```

After adding the lines, I just clicked Update the stack to redeploy it.

### Update Frigate Config

In the `config.yml` for Frigate, update the `detectors` options to use the Coral:

```yaml
detectors:
  coral:
    type: edgetpu
    device: pci
```

Restart the Frigate Docker container, and check the logs to make sure it doesn't
throw any errors about not being able to see the device. You're good to go if no
errors are thrown 🎉

## Conclusion

It could just be placebo effect, but I feel like our Frigate setup is a lot faster
to determine what types of objects are being detected on camera ever since getting
the Coral installed and set up. If you were trying to get a Coral installed on your
home server for use with Frigate in a similar setup, I hope this tutorial has helped
you along the way to getting it going. Cheers 🍻
