---
id: intro
title: Introduction to Growthify for Shopify merchants
sidebar_label: Introduction
sidebar_position: 1
description: Growthify is a growth and conversion suite for Shopify, delivered as one embedded app plus a theme extension. Learn what it includes and how it is built.
keywords: [growthify, shopify app, conversion suite, all in one shopify, shopify popups, product reviews, bundle discounts, cart upsell, theme app extension]
slug: /intro
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Growthify one app or several?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'One. A single embedded Shopify app plus one theme app extension. Every module shares the same install, the same billing subscription, the same database and the same admin, which is what makes disabling a module actually remove its cost.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does enabling every module slow down my storefront?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only enabled modules ship JavaScript. One app embed loads two small scripts totalling roughly 5 KB, and that loader fetches a module runtime only when the merchant has switched that module on. Theme blocks themselves are server-rendered Liquid.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do some pages say 16 modules and others say 15?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'They are two different lists. The app gates access with 16 entitlement module ids. The engineering specifications are numbered 00 to 14, which is 15 documents. Neither number is wrong and they are not the same set, so never treat one as a recount of the other.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a free plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Free costs 0 US dollars per month and includes one active popup, a 10,000 view allowance, 100 reviews, 500 wishlist items and 3 bundles. Pro is 29 dollars, Growth 79 and Scale 199, each with a 14-day trial.',
          },
        },
        {
          '@type': 'Question',
          name: 'What database does Growthify use?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Supabase PostgreSQL, reached through Prisma. The companion web app also uses Supabase Auth for sign-in. Firebase is used for static hosting of the web app only, not for authentication or data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I read my Growthify data from my own systems?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, through the read-only Merchant API v1. A per-store bearer key gives you the store record, current-period usage counters, published review content and wishlist demand aggregated per product.',
          },
        },
      ],
    })}
  </script>
</head>

# Introduction

**Growthify is a growth and conversion suite for Shopify merchants, delivered as one embedded Shopify app plus one theme app extension.** It brings popups, product reviews, wishlists, bundle discounts, cart tools, GDPR cookie consent, post-purchase upsells, reports, analytics, OTP/COD verification, a landing-page builder and product sourcing under a single install, a single subscription and a single admin.

The premise is narrow and worth stating plainly: most stores running six conversion apps are paying six subscriptions, carrying six vendors' JavaScript, and reconciling six dashboards that disagree. Growthify's answer is one install where each capability toggles independently, and **only the JavaScript for the modules you enable ever reaches the storefront**.

## Who Growthify is for

- **Shopify merchants** who want conversion tooling without juggling several apps, several invoices and several support queues — and who would rather turn a feature off than uninstall a vendor.
- **Agencies and theme developers** managing client stores, who want one app to install per client, configured through the Theme Editor and the embedded admin rather than through theme code edits.
- **Stores with compliance obligations** that need a cookie consent banner with language packs and an inspectable consent audit log rather than a third-party script they cannot account for.
- **Technical teams** who want their store's data reachable from their own systems — see the read-only [Merchant API v1](./api/merchant-api-v1.md).

Growthify is a poor fit if you need a single best-in-class tool for one job and nothing else, or if your store is on a plan whose checkout surfaces you cannot extend. It is designed for breadth at a shared cost, not for depth in one category.

## How the product is built

Growthify is a monorepo of deployable surfaces plus shared packages. Understanding the split makes the rest of this documentation much easier to navigate.

| Surface | What it is | Stack |
| --- | --- | --- |
| Embedded Shopify app + backend | OAuth, billing, webhooks, the merchant admin, and the storefront API | Remix 2, Prisma, Polaris, Supabase PostgreSQL |
| Theme app extension | 72 Liquid app blocks plus the `Growthify Embed` app-embed | Shopify Theme App Extension |
| Shopify Functions + checkout UI extensions | BOGO and quantity-break discount functions; order-status and thank-you-page blocks | JS Functions, React UI extensions |
| Web app (marketing + account) | The public site and the merchant account area at growthify.aoneahsan.com | React 19, Vite, Supabase Auth + PostgreSQL |
| Documentation site | This site | Docusaurus 3, GitHub Pages |
| Shared packages | Types, and the canonical plan registry every price and limit derives from | TypeScript |

**The backend is Supabase.** One hosted PostgreSQL project serves both development and production, reached through Prisma from the Remix app and through Supabase Auth for the web app's sign-in. **Firebase is used for static hosting of the web app and nothing else** — not authentication, not the database, not file storage, not server functions.

As audited on 2026-09-12, the Remix app comprises **263 route files**. Of those, **55 are storefront API routes** under `/api/storefront/*`, **51 are admin feature screens**, and the remainder are admin API routes, embedded admin pages, webhook receivers and health endpoints. Those are file counts from the source tree, not marketing figures.

## The two module lists, and why they differ

This is the single most common source of confusion in this documentation, so it is worth settling up front.

- **16 entitlement module ids** — the access-control list the app actually gates on: `popup`, `reviews`, `wishlist`, `bundles`, `cart`, `cookie`, `reports`, `ai`, `marketing`, `merchandising`, `fulfillment`, `b2b`, `i18n`, `seo`, `loyalty`, `compliance`. Each has a required plan and a default on/off state, and each becomes an `Entitlement` row when a shop installs.
- **15 numbered module specifications** — the engineering documents numbered 00 through 14 (platform, loader, analytics-errors, popup, reviews, wishlist, bundles, cart, consent, upsells, reports, analytics, OTP/COD, page builder, sourcing). They describe how things were built.

**These are different sets, not two counts of one thing.** The specs include infrastructure that is not gateable (the platform and the loader are not features a plan can withhold). The entitlement list includes capability groups such as `marketing`, `merchandising` and `b2b` that no single numbered spec covers. Where this site quotes a number, it names which list it means.

## How a feature reaches a shopper

1. The merchant **enables a module** in the Growthify admin. The [entitlement](./admin/entitlements.md) system checks their plan allows it.
2. The merchant **turns on the `Growthify Embed`** app embed in the Theme Editor. This is required once, theme-wide; without it no block can reach the server.
3. The merchant **adds the blocks they want** to the sections where they want them — a reviews carousel on the product page, a cookie banner site-wide, a cart drawer.
4. On the storefront, the embed defines `window.gfConfig` and boots the loader, which lazy-loads the runtime for each enabled module.
5. That runtime calls the server through the **Shopify App Proxy** at `/apps/growthify/api/storefront/*`. The route verifies the proxy signature, resolves the shop, re-checks the entitlement, and answers with JSON.

The re-check at step 5 matters: gating is enforced on the server at the request that performs the action, not merely hidden in the admin UI.

## Plans

Growthify bills through Shopify App Subscriptions only — there are no license keys and Growthify never sees card details.

| Plan | Price / month | Trial |
| --- | --- | --- |
| Free | $0 | — |
| Pro | $29 | 14 days |
| Growth | $79 | 14 days |
| Scale | $199 | 14 days |

Every number on the [Billing plans](./admin/billing-plans.md) page derives from one shared plan registry in code, so the pricing page, the server's enforcement and the Shopify billing configuration cannot drift apart.

## What Growthify does not do

Honest limits, stated where you will read them rather than discovered later:

- **It does not replace your theme.** Blocks are added alongside your theme's own sections; the native cart and product page keep working.
- **It is not a legal compliance service.** The consent module gives you a configurable banner, language packs and an audit log. It is not legal advice and does not determine your obligations.
- **It does not guarantee outcomes.** No conversion tool can. OTP verification reduces fraudulent cash-on-delivery orders; it does not eliminate them.
- **The Merchant API is read-only in v1.** It reads your data out; it does not write data in.
- **It does not host your storefront** or alter checkout beyond the extension points Shopify provides.
- **Some capabilities depend on your Shopify plan**, particularly checkout-level surfaces.

## Current status

Growthify's documentation describes the product as it is built, not as it is imagined. Two of its surfaces are live today: the marketing site and this documentation site. The Shopify app itself has not yet been published to the Shopify App Store — the listing does not exist, so no App Store URL appears anywhere on this site. Where a page describes an install flow, it describes the flow that will apply, and says so.

## FAQ

### Is Growthify one app or several?

One. A single embedded Shopify app plus one theme app extension. Every module shares the same install, the same billing subscription, the same database and the same admin — which is exactly what makes disabling a module genuinely remove its cost rather than merely hiding it.

### Does enabling every module slow down my storefront?

Only enabled modules ship JavaScript. The app embed loads two small scripts totalling roughly 5 KB, and that loader fetches a module's runtime only when the merchant has switched the module on. The theme blocks themselves are server-rendered Liquid, so above-the-fold content needs no JavaScript at all.

### Why do some pages say 16 modules and others say 15?

Because they are two different lists — 16 entitlement module ids that the app gates on, and 15 numbered engineering specifications. Neither number is wrong, and neither is a recount of the other. The section above sets out both lists in full.

### Is there a free plan?

Yes. Free costs $0 per month and includes one active popup, a 10,000-view allowance, 100 reviews, 500 wishlist items and 3 bundles. Pro, Growth and Scale are $29, $79 and $199 per month, each with a 14-day trial.

### What database does Growthify use?

Supabase PostgreSQL, reached through Prisma from the Remix app. The companion web app uses Supabase Auth for sign-in and the same PostgreSQL project for its own tables. Firebase provides static hosting for the web app and nothing more.

### Can I read my Growthify data from my own systems?

Yes, through the read-only [Merchant API v1](./api/merchant-api-v1.md). A per-store bearer key returns the store record and module states, current-period usage counters, published review content, and wishlist demand aggregated per product.

### Where do I start?

[Installation](./getting-started/installation.md) if you are setting the app up, [Architecture](./getting-started/architecture.md) if you want to understand how the pieces talk to each other, or [Modules overview](./modules/overview.md) if you want to see the full capability map first.

## Related pages

- [Installation](./getting-started/installation.md) — install, enable the app embed, add blocks.
- [Architecture](./getting-started/architecture.md) — how the surfaces fit together and what talks to what.
- [Modules overview](./modules/overview.md) — the full module map and both module lists.
- [Billing plans](./admin/billing-plans.md) — every tier, limit and trial.
