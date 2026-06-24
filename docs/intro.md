---
id: intro
title: Introduction
sidebar_label: Introduction
sidebar_position: 1
description: Growthify is a 16-module growth and conversion suite for Shopify merchants — popups, reviews, bundles, cart upsells, consent, and analytics in one embedded app.
keywords: [growthify, shopify app, conversion suite, all in one shopify, shopify popups, product reviews, bundle discounts, cart upsell]
slug: /intro
---

# Introduction

**Growthify is a 16-module growth and conversion suite for Shopify merchants** — popups, product reviews, wishlist, bundle discounts, cart upsells, GDPR cookie consent, post-purchase upsells, reports, advanced analytics, OTP/COD, a landing-page builder, and product sourcing — delivered as **one embedded Shopify app** plus a theme app extension.

The goal is simple: replace a stack of single-purpose Shopify apps (and their combined monthly cost and storefront bloat) with one install where each module toggles on or off independently, and **only the JavaScript for the modules you enable ships to the storefront**.

## Who it's for

- **Shopify merchants** who want conversion tooling without juggling six apps and six subscriptions.
- **Agencies / theme developers** who want one app to enable per client and configure through the Theme Editor.
- **Stores with compliance needs** that want a built-in GDPR cookie banner, consent language packs, and an audit log.

## How the suite is organised

Growthify is one product made of three deployable surfaces plus shared packages:

| Surface | What it is | Stack |
| --- | --- | --- |
| `apps/shopify-app` | The embedded app: OAuth, billing, webhooks, admin UI, and 50+ storefront API endpoints | Remix 2, Prisma, Polaris, Neon Postgres (prod) |
| `apps/theme-extension` | 72 Liquid app blocks + one `Growthify Embed` app-embed | Shopify Theme App Extension |
| `apps/web` | The marketing site at growthify.aoneahsan.com | React 19, Vite, Radix UI, Firebase |
| `packages/shared-types`, `packages/shared-utils` | Types + pure helpers shared across the apps | TypeScript |

The **16 runtime modules** (platform, loader, analytics-errors, popup, reviews, wishlist, bundles, cart, consent, upsells, reports, analytics, OTP/COD, page builder, sourcing) are the real code layer. The "50-feature catalog" you may see in marketing material is a taxonomy folded onto those modules plus a few standalone surfaces — it is not a separate codebase.

## What to read next

- [Installation](./getting-started/installation.md) — install, enable the app embed, add blocks.
- [Architecture](./getting-started/architecture.md) — how the pieces talk to each other.
- [Modules overview](./modules/overview.md) — the full module map.

:::info Honest framing
Growthify is a real, working application with a green build (`yarn typecheck && yarn build && yarn lint`), 72 verified theme blocks, and 178 server routes. The remaining steps to go live (hosting, Shopify Partner Dashboard setup, billing-tier creation, App Store submission) are operational and live in the app repo's `docs/MANUAL-TASKS.md`. This documentation describes the product as it is built, not aspirational features.
:::
