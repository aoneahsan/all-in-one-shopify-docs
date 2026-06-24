---
id: cart
title: Cart
sidebar_label: Cart
sidebar_position: 7
description: Growthify cart — slide-out cart drawer, free-shipping bar, cross-sell, cart countdown, donations, and gift messages.
keywords: [shopify cart drawer, free shipping bar, cart cross sell, cart donation, gift message, cart upsell]
---

# Cart

The cart module (07) turns the cart into a conversion surface.

## What you get

- **Cart drawer** — a slide-out cart with upsell slots.
- **Free-shipping bar** — progress toward a free-shipping threshold.
- **Cross-sell** recommendations in the drawer.
- **Cart countdown** to create urgency.
- **Cart add-ons** — shipping protection, gift wrapping, donations.
- **Gift messages** — an optional message field with a configurable placeholder.
- **Cart terms** acceptance checkbox.

## Surfaces

- **Theme blocks:** `cart-drawer`, `cart-addons`, `cart-crosssell`, `cart-countdown`, `cart-donation`, `cart-terms`, `free-gift-notice`, `gift-message`, `shipping-protection`.
- **Storefront API:** `GET /apps/growthify/api/storefront/gift-message`, donation and cross-sell config endpoints.
- **Admin:** the Cart module config (drawer design, threshold, add-ons, gift-message copy).

## FAQ

**Does the cart drawer replace my theme's cart?**
It augments it — you add the drawer block where you want it; the native cart still works.

**Can I collect donations at checkout?**
The donation add-on collects a configurable amount in the cart; payouts are handled by your own arrangement, not by Growthify.
