---
title: How to Add an Apple TV Power Button to Home Assistant
description: Adding a power toggle switch for an Apple TV to Home Assistant turns out to be a little tricker than you might expect
published: 2023-02-16T05:06:05+0000
updated: 2023-11-08T04:38:25+0000
tags: ['Home Server & Network']
---

I recently got [AirPlay working in our home network](https://jack.barry.onl/blog/airprint-across-vlans-with-avahi)
which got me a little more fired up to tackle some home automation stuff with Home
Assistant. When I saw that our Apple TV was (mostly) playing nice with HA, I was
a bit surprised to find that the power toggle did not behave out of the box as one
might expect. The main issue was that if the Apple TV was put into standby mode,
there was no way to turn it back on from within HA. That won't do! So I dug up [some
scripts from the Home Assistant forums](https://community.home-assistant.io/t/apple-tv-power-on-off-not-working/266129/4),
tweaked them a little, and got a decent power toggle set up in Home Assistant.

## Get Your Remote Entity ID

First, find the Entity ID for your virtual Apple TV remote. Here's how to find that:

1. Go to **Settings** ➞ **Devices & Services**
2. Click on the entities link in your Apple TV integration
3. Find the Entity ID prefixed with `remote`.

## Add the Scripts

You'll need to add one script for turning the Apple TV on, and another script for
turning it off. In the following code snippets, replace any instances of `remote.appletv`
with the Entity ID that applies in your config.

The most straightforward way to add these is through the [File Editor add-on](https://github.com/home-assistant/addons/tree/master/configurator).
Find your `/config/scripts.yaml` file, and plop the following scripts into it:

```yaml
turn_apple_tv_off:
  alias: Turn Apple TV Off
  sequence:
    - service: remote.send_command
      target:
        entity_id: remote.appletv
      data:
        delay_secs: 3
        command:
          - home_hold
          - select
        num_repeats: 1
        hold_secs: 0
  mode: single
  icon: mdi:apple
turn_apple_tv_on:
  alias: Turn Apple TV On
  sequence:
    - service: remote.send_command
      target:
        entity_id: remote.appletv
      data:
        delay_secs: 3
        command:
          - home
        num_repeats: 1
        hold_secs: 1
  mode: single
  icon: mdi:apple
```

## Create the On/Off Switch

Next, we'll create a [Template Switch](https://www.home-assistant.io/integrations/switch.template/)
that can be made visible in the GUI for toggling the Apple TV on and off. For that,
we'll need to edit the `configuration.yml` file, which again is easiest to find using
the File Editor add-on.

```yaml
switch:
  - platform: template
    switches:
      apple_tv_power:
        friendly_name: 'Apple TV Power'
        value_template: "{{ not is_state('media_player.appletv', ['standby','off']) }}"
        turn_on:
          service: script.turn_apple_tv_on
        turn_off:
          service: script.turn_apple_tv_off
```

The `value_template` is how we tell the switch what state it's currently in. I have
mine configured to be "on" if the Apple TV is not in a "standby" or "off" state.

## Automatically Turn On the Apple TV Remote on Startup

When Home Assistant starts, it does not automatically turn on the virtual Apple TV
remote used by the scripts we created. Let's fix that.

1. Go to **Settings** ➞ **Automations & Scenes** ➞ **Automations**
2. Click the _Create Automation_ button
3. Click the three dots button in the top right, and select _Edit_ in YAML
4. Paste the following content in to automatically turn on the virtual Apple TV remote
   on startup

```yaml
alias: Turn Apple TV remote on at startup
description: ''
trigger:
  - platform: homeassistant
    event: start
condition: []
action:
  - service: remote.turn_on
    data: {}
    target:
      entity_id: remote.appletv
mode: single
```

Remember that similar to the scripts, `remote.appletv` may have a different entity
ID in your setup.

Now, let's restart Home Assistant so that it can pick up on the changes we made in
the config files.

## Add the Toggle to a Dashboard

1. In the **Overview** area, click the three dot button at the top right and select
   _Edit Dashboard_
2. Click _Add Card_
3. Open the _By Entity_ tab
4. Search for switch, and you should see the `switch.apple_tv_power` entity. Select
   it and click _Continue_
5. Click _Add to Dashboard_
6. Click the _Done_ button to finalize changes
7. And with that, you have a power toggle switch inside of Home Assistant for your
   Apple TV. It should even follow the state of your Apple TV if you use the physical
   remote to turn it on/off.

## Conclusion

While it was a bit more work than I thought it would be to get the power toggle set
up, it is nice to have it in HA now, and the scripts can even be used for other types
of automations, so I'm glad to have it wired up. Onward and upward 🚀
