---
id: overview
title: Modules overview
sidebar_label: Overview
sidebar_position: 1
description: The 16 runtime modules that make up Growthify and how they map to the storefront and admin.
keywords: [growthify modules, shopify modules, popups reviews bundles cart consent analytics]
---

# Modules overview

Growthify is built from **16 runtime modules**. Each toggles independently in the admin, and the storefront loader only fetches the runtime for modules you have enabled.

| # | Module | What it does | Primary surface |
| --- | --- | --- | --- |
| 00 | [Platform](./platform.md) | OAuth, billing, webhooks, sessions, the entitlement system | Admin + server |
| 01 | Loader | The lazy module loader booted by the app embed | Storefront |
| 02 | Analytics-Errors | Event tracking + error reporting plumbing | Cross-cutting |
| 03 | [Popups](./popups.md) | Email-capture, spin-to-win, exit-intent, announcements | Storefront |
| 04 | [Reviews](./reviews.md) | Star ratings, moderation, verified-purchase badges | Storefront + admin |
| 05 | [Wishlist](./wishlist.md) | Save-for-later, shareable lists, recently viewed | Storefront |
| 06 | [Bundles](./bundles.md) | Quantity breaks, BOGO, mix-and-match, FBT | Storefront |
| 07 | [Cart](./cart.md) | Cart drawer, free-shipping bar, cross-sell, donations, gift messages | Storefront |
| 08 | [Consent](./consent.md) | GDPR cookie banner, consent language packs, audit log | Storefront + compliance |
| 09 | [Upsells](./upsells.md) | Post-purchase and thank-you-page upsells | Checkout extension |
| 10 | [Reports](./analytics-reports.md) | The report engine (cohorts, exports) | Admin |
| 11 | [Analytics](./analytics-reports.md) | LTV, UTM attribution, P&L | Admin |
| 12 | [OTP / COD](./otp-cod.md) | Phone-OTP verification + cash-on-delivery controls | Storefront + checkout |
| 13 | [Page Builder](./page-builder.md) | Section-based landing pages | Storefront |
| 14 | [Sourcing](./sourcing.md) | Product sourcing + supplier sync | Admin |

## How a module reaches the storefront

1. The merchant enables the module in the admin (gated by [entitlements](../admin/entitlements.md)).
2. The merchant adds the module's **theme block** in the Theme Editor (and keeps the **Growthify Embed** app-embed on).
3. On the storefront, the [loader](./platform.md) fetches that module's runtime, which calls the [storefront API](../api/storefront-api.md) through the [app proxy](../storefront/app-proxy.md).

## Beyond the 16 modules

The admin also ships **52 feature pages** (`admin.features.*`) covering SEO, marketing, merchandising, fulfilment, and operations — for example `seo-optimizer`, `email-marketing`, `sms-marketing`, `loyalty-rewards`, `subscriptions`, `wholesale-b2b`, `store-locator`, `tax-calculator`, and `sales-forecasting`. Many of these are surfaced by one or more of the 72 [theme blocks](../storefront/theme-blocks.md). See [Admin features](../admin/features.md) for the full list.
