---
id: billing-plans
title: "Growthify pricing — Free, Pro, Growth and Scale tiers"
sidebar_label: Billing plans
sidebar_position: 2
description: "Growthify bills through Shopify App Subscriptions: Free at $0, Pro at $29, Growth at $79 and Scale at $199 a month, with a 14-day trial on every paid tier."
keywords: [growthify pricing, shopify app subscriptions, app billing tiers, 14 day trial, plan limits, unlimited plan sentinel]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is there a free Growthify plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Free costs nothing and includes seven of the sixteen modules, one active popup, 100 stored reviews, 500 wishlist items, three bundles and a 10,000 monthly view allowance per metered module. Paid tiers raise those numbers and unlock the rest.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I give Growthify my card details?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Billing runs entirely through Shopify App Subscriptions, so a charge appears on your Shopify invoice and Growthify never sees or stores payment details. There are no licence keys and no separate checkout.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long is the Growthify trial?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fourteen days on Pro, Growth and Scale. Free has no trial because there is nothing to trial, and it does not expire.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I cancel Growthify at any time?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, from your Shopify admin. Shopify sends an app_subscriptions/update webhook, the app writes the new plan, and access follows it on the next request. Your data is not deleted by a downgrade.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does BYOK mean on the Growthify plans?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bring your own key. For AI, email, SMS and social features you supply the provider credentials, so the provider account, its terms and its costs stay yours. Every tier can work this way.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Growthify charge for going over a plan limit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. There is no usage-based billing and no overage. A metered action over the allowance is refused for the rest of the calendar month rather than charged for.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is Scale unlimited on everything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, and the distinction matters. Scale is unlimited on popups, views, stored reviews, wishlist items and bundles, and it adds multi-store. Its managed AI allowance is a finite monthly number.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is annual billing available?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not currently. Every paid tier is defined on a 30-day interval in the plan registry, so the only billing period Growthify offers is monthly.',
          },
        },
      ],
    })}
  </script>
</head>

# Billing plans

**A Growthify plan is a Shopify App Subscription: four tiers, one price each, charged on your Shopify invoice and enforced by the server at the request that spends an allowance.** There are no licence keys, no separate checkout and no card details held by Growthify — cancelling in Shopify is what cancels the plan.

## Who this page is for

- **Merchants** choosing a tier, or working out which limit they have hit.
- **Agencies** budgeting a client build across several stores.
- **Developers** reading plan state out of the app and needing to know what the numbers mean.

## The four tiers

| | **Free** | **Pro** | **Growth** | **Scale** |
| --- | --- | --- | --- | --- |
| Price per month | $0 | $29 | $79 | $199 |
| Trial | — | 14 days | 14 days | 14 days |
| Modules included | 7 | 12 | 16 | 16 |
| Active popups | 1 | unlimited | unlimited | unlimited |
| Monthly views, per metered module | 10,000 | 100,000 | 500,000 | unlimited |
| Stored reviews | 100 | 1,000 | 5,000 | unlimited |
| Wishlist items | 500 | 5,000 | 25,000 | unlimited |
| Bundles | 3 | 20 | 100 | unlimited |
| Managed AI calls per month | — | — | 10,000 | 50,000 |
| Bring your own AI key | yes | yes | yes | yes |
| Team roles | — | — | yes | yes |
| Multi-store | — | — | — | yes |
| Priority support | — | — | yes | yes |

Prices are in USD and every tier bills on a 30-day interval. All of these figures come from one file — a single plan registry that the pricing page, the billing screen, the gating code and the usage meter all read, rather than four copies that happen to agree.

## Reading the limits correctly

Three of the rows above mean something more specific than they look.

**"Monthly views, per metered module"** is not one pooled number. The allowance applies to each metered module separately for the calendar month, so a Free store that has spent 10,000 popup views has not spent its review views. Two modules — **cookie consent** and **compliance gating** — are unmetered on views at every tier, Free included, because a consent banner or an age gate that stops appearing when an allowance runs out would be worse than useless.

**"Modules included"** counts access, not activation. Free includes seven modules and starts with all seven switched on. Pro adds five and Growth adds four, and those nine arrive switched **off**, so an upgrade never changes your storefront until you enable something. The full list is on [Entitlements](./entitlements.md).

**"unlimited"** is a real value in the plan data rather than a marketing word, stored as a sentinel that the limit checks understand. It is also not a synonym for "everything": Scale is unlimited on popups, views, reviews, wishlist items and bundles, and its managed AI allowance is a finite monthly number. The pricing copy used to say "unlimited everything" and was corrected for precisely that reason.

## AI: your key, or the plan's allowance

Every tier can use the AI-assisted features with **your own provider key**. What the paid tiers add is a managed option — Growthify's own capacity — as a monthly allowance on Growth and Scale. Free and Pro have no managed allowance, so AI features there run on your key or not at all.

AI generation is also metered **per module**, at a ceiling below the plan total, so no single module can consume a whole month's allowance on its own.

## How the subscription actually works

1. You choose a tier in the embedded admin. The app creates a Shopify app subscription named `Growthify - <Plan>` at that tier's price, on a 30-day interval, with the trial the tier carries.
2. Shopify handles approval, the charge and the invoice.
3. Shopify sends `app_subscriptions/update`. The app maps the subscription name back to a plan id and the Shopify status to its own billing status, then rewrites the shop's entitlement set in the same transaction.
4. Gated requests re-check two things from then on: that the plan includes the module, and that the billing status is active.

Statuses map as you would expect and with no ambiguity left in the middle: `ACTIVE` becomes active; `CANCELLED`, `DECLINED` and `EXPIRED` all become cancelled; `FROZEN` becomes frozen; anything unrecognised becomes pending rather than being treated as paid.

A subscription that is not active is not entitlement, even on a paid plan. Free is the exception — it needs no subscription and is always treated as active.

## Pricing parity is a build gate

The plan registry is the single source, and a check in the repository parses it and compares it against the Shopify billing configuration and the Partner Dashboard configuration document. A consumer that re-declares a number instead of deriving it from the registry fails that check.

This exists because the numbers were once written out independently in four places — the billing code, the public pricing constants, the usage limits and the module definitions. They agreed by luck, and only one of the four was covered by a test, so the copy the pricing page rendered was the one nobody verified.

## What the billing system does not do

- **It does not take payment details.** Everything goes through Shopify App Subscriptions. Growthify holds no card data and cannot charge you outside your Shopify invoice.
- **It does not sell licence keys.** There is nothing to enter, nothing to activate and no offline unlock.
- **It does not bill for usage.** No overage, no per-event charge, no metered invoice. Exceeding an allowance refuses the action for the rest of the month — see [Entitlements](./entitlements.md).
- **It does not price per seat.** Team roles is a capability included with Growth and Scale, not a quantity you buy.
- **It does not offer annual billing.** Each paid tier is a 30-day interval.
- **It does not delete data on downgrade.** Access locks; records remain, and re-upgrading restores access to what was already there.
- **It does not charge in a merchant's local currency.** Plan prices are defined in USD; Shopify handles what appears on your invoice.
- **It does not make Free a trial.** Free has no expiry and no trial period, because it is a tier rather than a sample.

## FAQ

### Is there a free plan?

Yes. Free costs nothing, includes seven of the sixteen modules, and carries one active popup, 100 stored reviews, 500 wishlist items, three bundles and a 10,000 monthly view allowance per metered module.

### Do I give Growthify my card details?

No. Billing runs through Shopify App Subscriptions and appears on your Shopify invoice.

### How long is the trial?

Fourteen days on Pro, Growth and Scale. Free has no trial and does not expire.

### Can I cancel at any time?

Yes, from your Shopify admin. The `app_subscriptions/update` [webhook](../api/webhooks.md) writes the new plan and access follows on the next request.

### What does BYOK mean here?

Bring your own key: for AI, email, SMS and social features you supply the provider credentials, so that account and its costs stay yours. Available on every tier.

### Does Growthify charge for going over a limit?

No. The action is refused for the remainder of the calendar month instead.

### Is Scale unlimited on everything?

No. Unlimited on popups, views, reviews, wishlist items and bundles, plus multi-store — but its managed AI allowance is a finite monthly number.

### Is annual billing available?

Not currently; every paid tier is a 30-day interval.

## Related pages

- [Entitlements](./entitlements.md) — how a plan becomes an enforced permission, and what happens at 80% and 100% of an allowance.
- [Admin features](./features.md) — the screens a tier unlocks.
- [Merchant API v1](../api/merchant-api-v1.md) — reading your plan and current usage programmatically.
- [Terms](../legal/terms.md) — billing, refunds and cancellation as the Terms state them.
