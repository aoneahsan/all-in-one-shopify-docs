---
id: overview
title: Growthify modules overview — the full capability map
sidebar_label: Overview
sidebar_position: 1
description: The 16 entitlement modules and 15 numbered module specs that make up Growthify, how they differ, and how each one reaches the storefront or admin.
keywords: [growthify modules, shopify modules, entitlement modules, popups reviews bundles cart consent analytics, module gating]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why are there 16 modules in one list and 15 in another?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'They are different lists. Sixteen entitlement module ids are what the app gates plan access on. Fifteen numbered specifications, 00 through 14, are the engineering documents. The specs include infrastructure no plan can withhold, and the entitlement list includes capability groups no single spec covers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I have to use every module?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Modules toggle independently and a disabled module ships no storefront JavaScript at all. Most stores run a handful. Turning one off removes its cost rather than merely hiding its settings.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which modules are available on the Free plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Popup, reviews, wishlist, cookie consent, marketing, merchandising and compliance are available from Free and default to on. Bundles, cart, fulfillment, i18n and seo require Pro. Reports, ai, b2b and loyalty require Growth.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between a module and an admin feature screen?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A module is the unit of plan gating and of storefront runtime loading. An admin feature screen is a configuration surface. There are 51 feature screens, and several of them configure capabilities that belong to the same entitlement module.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does enabling a module immediately change my storefront?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not by itself. Enabling makes the module available and lets its runtime load, but most modules render through a theme block you still have to place in the Theme Editor. Consent and popups are the common exceptions since they render site-wide.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can a module be available but switched off?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, and it is an ordinary state. The Merchant API reports the two facts separately: hasAccess is whether your plan includes the module, isEnabled is whether you have switched it on.',
          },
        },
      ],
    })}
  </script>
</head>

# Modules overview

**A Growthify module is a unit of capability that can be independently gated by plan, switched on or off by the merchant, and — when it renders on the storefront — lazy-loaded as its own runtime.** Modules are the organising idea behind the whole product: they are what a plan grants, what the loader fetches, and what a merchant reasons about.

## Two module lists, and why both are correct

Documentation elsewhere quotes "16 modules" and "15 modules". Both are accurate, and they are not the same list.

### The 16 entitlement module ids

These are what the application actually gates on. Each becomes an `Entitlement` row when a shop installs, each has a required plan, and each has a default on/off state.

| Module id | Name | Required plan | On by default |
| --- | --- | --- | --- |
| `popup` | Popup Builder | Free | yes |
| `reviews` | Product Reviews | Free | yes |
| `wishlist` | Wishlist | Free | yes |
| `cookie` | Cookie Consent | Free | yes |
| `marketing` | Marketing & Conversion | Free | yes |
| `merchandising` | Merchandising | Free | yes |
| `compliance` | Compliance & Gating | Free | yes |
| `bundles` | Product Bundles | Pro | no |
| `cart` | Smart Cart | Pro | no |
| `fulfillment` | Fulfillment | Pro | no |
| `i18n` | Internationalization | Pro | no |
| `seo` | SEO Suite | Pro | no |
| `reports` | Advanced Reports | Growth | no |
| `ai` | AI Assistant | Growth | no |
| `b2b` | B2B & Wholesale | Growth | no |
| `loyalty` | Loyalty & Rewards | Growth | no |

### The 15 numbered module specifications

These are the engineering documents, numbered 00–14: platform, loader, analytics-errors, popup, reviews, wishlist, bundles, cart, consent, upsells, reports, analytics, OTP/COD, page builder, sourcing.

**The two lists diverge for good reasons.** The specs include infrastructure that no plan can withhold — the platform and the loader are not features you can sell or revoke. The entitlement list includes capability *groups* such as `marketing`, `merchandising` and `b2b` that span several specs and several admin screens. Whenever this site quotes a number, it names which list it means.

## Who this page is for

- **Merchants** deciding which modules to enable and what their plan includes.
- **Agencies** planning a rollout across client stores with different tiers.
- **Developers** who need to know what the gating unit is before reading the entitlement code.

## The module map

| # | Module | What it does | Primary surface |
| --- | --- | --- | --- |
| 00 | [Platform](./platform.md) | OAuth, billing, webhooks, sessions, the entitlement system | Admin + server |
| 01 | [Loader](./platform.md) | The lazy module loader booted by the app embed | Storefront |
| 02 | Analytics-Errors | Event tracking and error-reporting plumbing | Cross-cutting |
| 03 | [Popups](./popups.md) | Email capture, spin-to-win, exit intent, announcements | Storefront |
| 04 | [Reviews](./reviews.md) | Star ratings, moderation, verified-purchase badges | Storefront + admin |
| 05 | [Wishlist](./wishlist.md) | Save for later, shareable lists, recently viewed | Storefront |
| 06 | [Bundles](./bundles.md) | Quantity breaks, BOGO, mix-and-match | Storefront + checkout |
| 07 | [Cart](./cart.md) | Cart drawer, free-shipping bar, cross-sell, add-ons | Storefront |
| 08 | [Consent](./consent.md) | GDPR cookie banner, language packs, audit log | Storefront + compliance |
| 09 | [Upsells](./upsells.md) | Post-purchase and thank-you-page offers | Checkout extension |
| 10 | [Reports](./analytics-reports.md) | The report engine and exports | Admin |
| 11 | [Analytics](./analytics-reports.md) | Usage meters, funnels, trends | Admin |
| 12 | [OTP / COD](./otp-cod.md) | Phone verification and cash-on-delivery controls | Storefront + admin |
| 13 | [Page Builder](./page-builder.md) | Section-based landing pages | Storefront |
| 14 | [Sourcing](./sourcing.md) | Product sourcing and supplier sync | Admin |

## How a module becomes visible to a shopper

Four things must all be true. Missing any one is the cause of nearly every "it is not working" report:

1. **Your plan includes it** — otherwise the toggle explains which plan does.
2. **You have enabled it** in the Modules hub.
3. **The `Growthify Embed` app embed is on** in your theme.
4. **The module's theme block is placed** where you want it to render.

Steps 1 and 2 are two separate facts, and the [Merchant API](../api/merchant-api-v1.md) reports them separately as `hasAccess` and `isEnabled`. A module can legitimately be available and switched off.

## Beyond the modules: 51 admin feature screens

The embedded admin also ships **51 feature screens** covering SEO, marketing, merchandising, fulfilment and operations — `seo-optimizer`, `email-marketing`, `sms-marketing`, `loyalty-rewards`, `subscriptions`, `wholesale-b2b`, `store-locator`, `tax-calculator`, `sales-forecasting` and more. Each is a real route with a loader, an action and persistence.

A feature screen is a **configuration surface**; a module is the **gating and loading unit**. Several screens often configure capabilities belonging to one entitlement module — which is exactly why the screen count and the module count are different numbers measuring different things. See [Admin features](../admin/features.md).

## What modules do not do

- **Enabling a module does not place its block.** Except for site-wide surfaces such as consent and popups, you still add the block in the Theme Editor.
- **Modules are not separate apps.** They share one install, one subscription, one database and one admin.
- **A module cannot be bought individually.** Access follows the plan tier, not an à-la-carte purchase.
- **Disabling a module does not delete its data.** Reviews and wishlist items persist; they stop rendering.
- **Some modules depend on your Shopify plan** for their checkout-level surfaces, independently of your Growthify tier.

## FAQ

### Why are there 16 modules in one list and 15 in another?

Because they are different lists — 16 entitlement module ids the app gates on, and 15 numbered engineering specifications. The specs include ungateable infrastructure; the entitlement list includes capability groups spanning several specs. Both lists appear in full above.

### Do I have to use every module?

No. Modules toggle independently, and a disabled module ships no storefront JavaScript. Most stores run a handful. Turning one off removes its cost rather than hiding its settings.

### Which modules are available on the Free plan?

`popup`, `reviews`, `wishlist`, `cookie`, `marketing`, `merchandising` and `compliance` — all available from Free and on by default. `bundles`, `cart`, `fulfillment`, `i18n` and `seo` need Pro; `reports`, `ai`, `b2b` and `loyalty` need Growth.

### What is the difference between a module and an admin feature screen?

A module is the unit of plan gating and runtime loading. A feature screen is a configuration surface. There are 51 screens, and several often configure one module's capabilities.

### Does enabling a module immediately change my storefront?

Not by itself. Enabling makes it available and lets its runtime load, but most modules render through a theme block you still place. Consent and popups are the usual exceptions, since they render site-wide.

### Can a module be available but switched off?

Yes, and that is an ordinary state — `hasAccess` and `isEnabled` are reported as two separate facts.

### What happens to a module's data if I downgrade?

The data remains; access to the module locks on the next request after the subscription webhook updates your plan. Re-upgrading restores access to the same data.

## Related pages

- [Platform & Loader](./platform.md) — the foundation every other module sits on.
- [Entitlements](../admin/entitlements.md) — how gating is decided and enforced.
- [Billing plans](../admin/billing-plans.md) — which tier includes what.
- [Theme blocks](../storefront/theme-blocks.md) — the 72 blocks modules render through.
