---
id: popups
title: Popups
sidebar_label: Popups
sidebar_position: 3
description: Growthify popups — email-capture, spin-to-win, exit-intent, and announcement bars, with a configurable form-field builder.
keywords: [shopify popups, email capture popup, spin to win, exit intent, announcement bar]
---

# Popups

The popups module (03) captures emails and announces offers without a second app.

## What you get

- **Popup types:** email capture, spin-to-win (wheel), exit-intent, welcome, free-shipping, discount, and timed/scroll triggers.
- **Form-field builder:** each popup defines its fields (email, name, phone, custom) with labels, required flags, and placeholders. Submissions persist server-side and can sync to your email provider.
- **Announcement bar:** a lightweight bar block for site-wide messages.

## Surfaces

- **Theme blocks:** `popup-widget`, `announcement-bar`.
- **Storefront API:** `POST /apps/growthify/api/popup/submit` (capture), `GET /apps/growthify/api/storefront/popups` (config), `GET /apps/growthify/api/storefront/announcements`.
- **Admin:** the Popup module config page (triggers, design, fields, targeting).

## FAQ

**Where do captured emails go?**
They persist in the app database and, when you connect an email/ESP provider in the admin, sync to that provider. Provider credentials are encrypted at rest.

**Can I run multiple popups?**
The Free plan allows one active popup; paid plans allow unlimited. See [Billing plans](../admin/billing-plans.md).

**Will popups slow my store?**
The popup runtime is lazy-loaded only when the module is enabled, and the announcement bar is server-rendered Liquid.
