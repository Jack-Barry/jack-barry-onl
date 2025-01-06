---
title: Add an Eject All External HDs Button in macOS
description: Make your dock-using life easier by adding an eject all external HDs button in macOS
published: 2021-07-03T17:49:21+0000
updated: 2023-11-08T04:54:04+0000
tags: ['Home Life', 'macOS']
---

## The Joy and Pain of a Docking Station

I love having a docking station to connect my power, second monitor, audio interface,
HD camera, external hard drives, etc. all through one port to my MacBook Pro. It's
super convenient and makes switching from "full-on workstation" to "lounging around
the house" mode fast and (nearly) painless.

However, one big pain in the butt that used to plague me was that if I didn't eject
the external hard drives before pulling the cable, I'd get a bunch of notifications
telling me that I hadn't ejected those. I only have two physical external hard drives,
but they're partitioned into multiple drives each so those notifications pile up
pretty quick.

That pain is a thing of the past with this nifty little Touch Bar button that I built
using _Automator_. Hopefully this "Eject All External HDs" button can help you out
if you're in a similar place. Here's how to add it to your MacBook.

## Create the Automator Quick Action

First, open the Automator app and select the Quick Action document type.

![Selecting Quick Action in Automator](../../static/images/blog/eject-all-button-for-macos/selecting-quick-action-in-automator.png)

Set the _Workflow receives_ option to _no input_ and select an _Image_ that you like.

![Workflow receives with no input and image selected](../../static/images/blog/eject-all-button-for-macos/workflow-receives-no-input-selected.png)

Use the search bar to look for the _Run Shell Script_ action, and add it to your
_Quick Action_.

![Run Shell Script
action](../../static/images/blog/eject-all-button-for-macos/run-shell-script-option.png)

Add the following line as the script to run (thanks for the script go to the author
of [this StackOverflow answer](https://stackoverflow.com/a/7222469/5072076)):

```shell
osascript -e 'tell application "Finder" to eject (every disk whose ejectable is true)'
```

![Script with content added](../../static/images/blog/eject-all-button-for-macos/script-with-content-added.png)

You could leave it at this, but then when you run the task you'd have to open _Finder_
or _Disk Utility_ to see when all the disks have been ejected. Let's fix that by
adding a second action. Select the _Display Notification_ action, and add it to your
_Quick Action_.

![Display notification action option](../../static/images/blog/eject-all-button-for-macos/display-notification-option.png)

Set a title/subtitle/message that works for you. I have mine configured like this:

![Display notification action with message](../../static/images/blog/eject-all-button-for-macos/display-notification-with-content.png)

Save the _Quick Action_ with a title that makes sense to you, I call mine _Eject
External Disks_.

## Make the Quick Action a Touch Bar Button

The most convenient way for me to fire off this task is using the Touch Bar, but
you can also access it from the Services Menu if you like, or if your MacBook doesn't
have a Touch Bar.

To add it to the Touch Bar, go to _System Preferences_ -> _Extensions_ -> _Touch
Bar_ and ensure it's selected.

![Touch Bar with new Quick Action selected](../../static/images/blog/eject-all-button-for-macos/touch-bar-with-quick-action-selected.png)

Next, click _Customize Control Strip_... and drag the _Quick Actions_ button down
onto your Touch Bar.

![Customizing the control strip](../../static/images/blog/eject-all-button-for-macos/customizing-control-strip.png)

## Enjoy the Lack of Pain When Pulling Away from Your Docking Station

Now, the next time you need to eject all the external hard drives from your MacBook
before disconnecting your docking station, just tap the _Quick Actions_ icon in your
Touch Bar and hit the _Eject External Disks_ button, then wait for the _Automator_
notification to pop up.

![Successful notification for eject all](../../static/images/blog/eject-all-button-for-macos/successful-notification.png)
