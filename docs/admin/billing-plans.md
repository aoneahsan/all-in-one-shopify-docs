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
            text: 'Yes, from Growthify\'s billing page, any time. Your plan runs to the end of the period you paid for. Your data is not deleted by a downgrade.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does BYOK mean on the Growthify plans?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Bring your own key. AI runs on Growthify\'s free AI credit on every plan. Your own OpenAI or Anthropic key is optional; its AI requests aren\'t counted. The same idea covers email, SMS, and social features. Provider costs stay yours.',
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
            text: 'No. Scale is unlimited on popups, storefront views, reviews, wishlist items, and bundles. It adds multi-store. On Growthify\'s free AI credit, Scale covers 50,000 AI requests a month.',
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

**A Growthify plan is a Shopify App Subscription: four tiers, one price each, charged on your Shopify invoice and enforced by the server at the request that spends an allowance.** There are no licence keys, no separate checkout and no card details held by Growthify. Cancel from Growthify's billing page any time. Your plan runs to the end of the period you paid for.

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
| AI requests per month | 100 | 1,000 | 10,000 | 50,000 |
| AI level | Spark | Pulse → Surge | Pulse → Surge | Surge |
| Bring your own AI key | yes | yes | yes | yes |
| Team roles | — | — | yes | yes |
| Multi-store | — | — | — | yes |
| Priority support | — | — | yes | yes |

Each level is capped by what Growthify's free AI credit allows.

Prices are in USD and every tier bills on a 30-day interval. All of these figures come from one file — a single plan registry that the pricing page, the billing screen, the gating code and the usage meter all read, rather than four copies that happen to agree.

## Reading the limits correctly

Three of the rows above mean something more specific than they look.

**"Monthly views, per metered module"** is not one pooled number. The allowance applies to each metered module separately for the calendar month, so a Free store that has spent 10,000 popup views has not spent its review views. Two modules — **cookie consent** and **compliance gating** — are unmetered on views at every tier, Free included, because a consent banner or an age gate that stops appearing when an allowance runs out would be worse than useless.

**"Modules included"** counts access, not activation. Free includes seven modules and starts with all seven switched on. Pro adds five and Growth adds four, and those nine arrive switched **off**, so an upgrade never changes your storefront until you enable something. The full list is on [Entitlements](./entitlements.md).

**"unlimited"** is a real value in the plan data rather than a marketing word, stored as a sentinel that the limit checks understand. It is also not a synonym for "everything": Scale is unlimited on popups, views, reviews, wishlist items and bundles. On Growthify's free AI credit, Scale covers 50,000 AI requests a month. The pricing copy used to say "unlimited everything" and was corrected for precisely that reason.

## AI: one monthly allowance, or your own key

Every plan runs AI on Growthify's free AI credit. Free includes 100 AI requests a month, Pro 1,000, Growth 10,000, and Scale 50,000. Every AI feature shares one shop-wide allowance.

Free runs at Spark, Scale at Surge. Pro and Growth run at Pulse. They move to Surge after 3 paid months in a row. Trial days don't count toward Surge.

When neither the free credit nor your own key is available, AI pauses. It says when to try again.

With your own OpenAI or Anthropic key, AI requests aren't counted.

## How the subscription actually works

1. You choose a tier in the embedded admin. The app creates a Shopify app subscription named `Growthify - <Plan>` at that tier's price, on a 30-day interval, with the trial the tier carries.
2. Shopify handles approval, the charge and the invoice.
3. Shopify sends `app_subscriptions/update`. The app maps the subscription name back to a plan id and the Shopify status to its own billing status, then rewrites the shop's entitlement set in the same transaction.
4. Gated requests re-check two things from then on: that the plan includes the module, and that the billing status is active.

Statuses map as you would expect and with no ambiguity left in the middle: `ACTIVE` becomes active; `CANCELLED`, `DECLINED` and `EXPIRED` all become cancelled; `FROZEN` becomes frozen; anything unrecognised becomes pending rather than being treated as paid.

A subscription that is not active is not entitlement, even on a paid plan. A plan canceled from Growthify's billing page stays active until its paid period ends. Free is the exception — it needs no subscription and is always treated as active.

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

Yes, from Growthify's billing page, any time. Your plan runs to the end of the period you paid for. Your data is not deleted by a downgrade.

### What does BYOK mean on the Growthify plans?

Bring your own key. AI runs on Growthify's free AI credit on every plan. Your own OpenAI or Anthropic key is optional; its AI requests aren't counted. The same idea covers email, SMS, and social features. Provider costs stay yours.

### Does Growthify charge for going over a limit?

No. The action is refused for the remainder of the calendar month instead.

### Is Scale unlimited on everything?

No. Scale is unlimited on popups, storefront views, reviews, wishlist items, and bundles. It adds multi-store. On Growthify's free AI credit, Scale covers 50,000 AI requests a month.

### Is annual billing available?

Not currently; every paid tier is a 30-day interval.

## Related pages

- [Entitlements](./entitlements.md) — how a plan becomes an enforced permission, and what happens at 80% and 100% of an allowance.
- [Admin features](./features.md) — the screens a tier unlocks.
- [Merchant API v1](../api/merchant-api-v1.md) — reading your plan and current usage programmatically.
- [Terms](../legal/terms.md) — billing and cancellation as the Terms state them.
