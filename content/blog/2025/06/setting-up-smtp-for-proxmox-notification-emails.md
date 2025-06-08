---
title: 'Setting up SMTP for Proxmox Notification Emails'
description:
  'This guide walks through setting up email notifications in Proxmox using
  Protonmail, providing a simple but essential layer of observability for your
  home server. By generating a secure SMTP token (instead of storing your
  Protonmail password), you can safely receive alerts for critical system events
  like backup failures or replication issues.'
published: 2025-06-08T18:00:00+0000
tags: []
---

## Background

When I set up our home server, I wanted at least enough observability to know if
things were running smoothly or quietly catching fire 🔥 Luckily, Proxmox has an
easy way to add email notifications, which is a simple way to accomplish a
baseline of observability. I was able to set up our installation of Proxmox to
send alerts through Protonmail, without storing my actual account password on
the server. That way, if the box gets compromised, I can simply revoke the SMTP
token instead of being locked out of email entirely.

## Email Notifications on Proxmox with Protonmail

Out of the box, Proxmox provides us a very basic level of observability, e.g.:

> "storage replication failures, node fencing, finished/failed backups and other
> events" -
> [Proxmox Notifications Docs](https://pve.proxmox.com/wiki/Notifications)

If you're not using Protonmail, then some of the details that follow will be
different based on your email provider, but the gist should be the same.

### Step 1: Get SMTP Credentials

Go to **Settings** → **All Settings** → **IMAP/SMTP**, and click **Generate
Token**.

Name the token something memorable. For example, I went with "Anton (Proxmox)"
since our server is named Anton and this token is for Proxmox specifically.

Save the credentials somewhere safe, or just keep the tab open while you set up
Proxmox.

### Step 2: Add a _Notification Target_

Following the guide for
[Proxmox Notifications](https://pve.proxmox.com/wiki/Notifications), add an SMTP
_Notification Target_ for Protonmail.

#### Option A: Using the Web UI

Head into the Proxmox web UI and follow the Proxmox Notifications guide. Add a
new SMTP Notification Target:

- **Name**: something like `protonmail-smtp`
- **Encryption**: `STARTTLS`
- **Username** / **Password**: use the Protonmail email address and generated
  token
- **Recipient(s)**: `root@pam`

If editing the files directly, this will all mostly be the same, just slightly
different names/syntax.

#### Option B: Editing Config Files Manually

You can also configure everything via plain text. I reach for `vi` but use
whatever text editor you like. E.g.:

```shell
vi /etc/pve/notifications.cfg
```

Here’s a sample SMTP target block:

```none
smtp: protonmail-smtp
        comment Sends mails to root@pam's email address as <FROM_ADDRESS>
        from-address <FROM_ADDRESS>
        mailto-user root@pam
        mode starttls
        server smtp.protonmail.ch
        username <FROM_ADDRESS>
```

Credentials will be stored in `/etc/pve/priv/notifications.cfg`. E.g.:

```none
smtp: protonmail-smtp
        password <SMTP_TOKEN>
```

Make sure to replace `<FROM_ADDRESS>` and `<SMTP_TOKEN>` with your actual
values.

### Step 3: Add a _Notification Matcher_

#### Option A: Using the Web UI

Add a new matcher like:

- **Name**: `protonmail-matcher`
- **Description**: "Route all notifications through Protonmail"
- **Match Rules**: match all
- **Target**: Your `protonmail-smtp` target

#### Option B: Editing Config Files Manually

In `/etc/pve/notifications.cfg`, add:

```none
matcher: protonmail-matcher
        comment Route all notifications through Protonmail
        mode all
        target protonmail-smtp
```

This matcher routes all notifications to your Protonmail SMTP target. If you
want more granular control, you can match based on severity or class.

### Step 4: Test It

Now disable the default built-in targets and matchers (`mail-to-root`,
`default-matcher`), either in the GUI or by adding `disable true` to their
sections in the config file.

Then test your SMTP target from the GUI.

If everything’s working:

- ✅ No errors are thrown
- 📤 The message shows up in your Protonmail _Sent_ folder
- 📨 You receive the test email in your `root@pam` user's inbox

## Conclusion

Setting up SMTP notifications in Proxmox isn't particularly difficult, but
hopefully this all-in-one guide is helpful to avoid needing to search for all
the disparate information to get it set up.

With email alerts enabled, you’re no longer dependent on smoke signals from your
box or frustrated family members telling you something’s broken, since they seem
to think your home server comes with a 5 9's SLA.

In a future post, I'll cover how to set up more granular observability and
alarming using Prometheus and Grafana, which can also leverage SMTP tokens for
emails.
