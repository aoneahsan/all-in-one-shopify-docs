---
id: entitlements
title: "Entitlements — how Growthify gates modules by plan"
sidebar_label: Entitlements
sidebar_position: 3
description: "How Growthify gates its 16 modules at request time: a plan rank check, an active-subscription check, a per-shop entitlement row and a monthly usage ceiling."
keywords: [shopify app gating, entitlements, plan required module, usage limit enforcement, maxusage ceiling, subscription verification]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is an entitlement in Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A row that records one shop access to one module, carrying whether it is enabled and an optional usage ceiling. It is the unit every gated request is checked against.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to my modules when I downgrade?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The app_subscriptions/update webhook writes the new plan and rewrites the entitlement set in the same transaction. Modules the lower tier does not include lock on the next request. Your data is not deleted.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can switching a module on bypass the plan requirement?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The toggle records intent; the plan check runs again on the server at every gated request, so a module that is on but not included is still refused.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are usage limits hard or soft?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Both, in sequence. At 80 percent of the allowance a response carries a warning header; at 100 percent the metered action is refused with HTTP 429 and headers stating the current count and the limit.',
          },
        },
        {
          '@type': 'Question',
          name: 'When does a usage counter reset?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On the calendar month. A period runs from the first day of the month to the last millisecond of its last day, so an allowance is monthly rather than rolling from your install date.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can a per-shop ceiling give a store more than its plan allows?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Where both a plan allowance and a shop ceiling exist, the narrower one is enforced. An override can tighten a limit but never sell more than the plan does.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does Growthify ask for the scopes it asks for?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Seven scopes cover products, orders, customers and themes. Two of them, read_orders and read_customers, are Protected Customer Data under Shopify rules and carry extra handling obligations the app is built to meet.',
          },
        },
      ],
    })}
  </script>
</head>

# Entitlements

**An entitlement is a stored row recording that one shop has access to one Growthify module, together with whether that module is switched on and what usage ceiling applies to it.** It is the single mechanism behind every paid capability in the product: there are no licence keys, no unlock codes and no client-side feature flags, and a gated request is answered by checking the shop's plan and its entitlement row rather than by trusting anything the browser sent.

## Who this page is for

- **Merchants** wanting to know what changes when they upgrade, downgrade or hit a limit.
- **Agencies** explaining to a client why a screen is visible but an action is refused.
- **Developers** integrating against the app and needing to recognise a gating response.

## The 16 modules and what unlocks them

Every gated capability belongs to one of these. **Default** is the state a newly installed shop starts in on a plan that includes the module.

| Module | Name in the admin | Required plan | Default |
| --- | --- | --- | --- |
| `popup` | Popup Builder | Free | on |
| `reviews` | Product Reviews | Free | on |
| `wishlist` | Wishlist | Free | on |
| `cookie` | Cookie Consent | Free | on |
| `marketing` | Marketing & Conversion | Free | on |
| `merchandising` | Merchandising | Free | on |
| `compliance` | Compliance & Gating | Free | on |
| `bundles` | Product Bundles | Pro | off |
| `cart` | Smart Cart | Pro | off |
| `fulfillment` | Fulfillment | Pro | off |
| `i18n` | Internationalization | Pro | off |
| `seo` | SEO Suite | Pro | off |
| `reports` | Advanced Reports | Growth | off |
| `ai` | AI Assistant | Growth | off |
| `b2b` | B2B & Wholesale | Growth | off |
| `loyalty` | Loyalty & Rewards | Growth | off |

Seven on Free, five more at Pro, four more at Growth. Scale adds no new module — it raises limits and adds multi-store, which is why a Growth store sees the whole module list already.

:::note These 16 are not the same list as the module pages
The [Modules](../modules/overview.md) section documents 15 numbered module specifications, which is a different grouping of the same product. Never read one count as the other.
:::

## What happens at install

When a shop installs, the app writes all 16 entitlement rows before the merchant can touch anything, in **one transaction** rather than sixteen sequential writes. That is a correctness decision, not a speed one: a loop that fails partway through commits the rows it already wrote and abandons the rest, leaving a shop whose first module toggle hits a missing row. All-or-nothing removes the half-provisioned state entirely.

Each row is written with access derived from the plan, and with the module's default enabled state.

## How a gated request is answered

Two questions, in order, on the server, at the request that performs the action:

1. **Does the shop's plan include this module?** The comparison is by plan **rank**, not by position in a hand-written list — so a tier added to the plan registry orders correctly without anyone editing the gate. An earlier implementation compared against a literal list of plan names, and a plan missing from that list sorted below Free.
2. **For anything above Free, is the subscription active?** A shop on a paid plan whose billing status is not active is treated as not entitled. Free needs no subscription and is always considered active.

Failing either returns an upgrade response naming the module and the plan it needs, rather than an error page or a blank screen.

## Usage ceilings

Access is one axis; volume is the other. Six kinds of event are counted — `view`, `submission`, `api_call`, `ai_generation`, `export` and `import` — and every storefront endpoint declares which module and which event type it belongs to, so metering is not something an individual route can forget to do.

The limit enforced for a given shop is the **narrower** of two numbers:

- the **plan allowance** for that module and event type, and
- the shop's own **entitlement ceiling**, where one has been set.

If the ceiling is unset, the plan's number applies. If either side is unlimited, the other side wins. An override can therefore tighten a limit but can never sell a shop more than its plan does.

Two thresholds then apply within the period:

| Point | What happens |
| --- | --- |
| **80% of the allowance** | The response still succeeds, and carries a usage-warning header with the current count and the limit. |
| **100%** | The metered action is refused with `429`, a `usage_limit_exceeded` body naming the module and event type, and headers stating the count, the limit and where to upgrade. |

Counters run on the **calendar month** — from the first day to the last millisecond of the last day — so an allowance is not rolling from the install date. Historical usage rows are pruned on a retention window rather than kept forever.

Not every module is metered the same way. `reports` and `ai` are given no per-shop ceiling at all — access to them is decided by the plan, and their generation and export volumes come from the plan's own table. Two Free modules, **cookie consent** and **compliance gating**, are deliberately unmetered on views at every tier: a consent banner or an age gate that stopped rendering because an allowance ran out would be a compliance problem, not a billing nudge.

## What happens on a plan change

Shopify sends `app_subscriptions/update` when billing changes. The handler maps the Shopify subscription name to an internal plan id, maps the status, and rewrites the entitlement set — using an upsert rather than an update, because a shop can reach a plan change with no entitlement rows at all. That case is not hypothetical: a fresh install that upgrades before anything initialised its rows would have failed the update, and the shop would have been billed for a plan with zero access.

The rewrite is issued as one batch inside a transaction for the same reason as the install path. Sixteen sequential round trips against a remote database can exceed a transaction timeout, and a plan change that cannot commit is a merchant who paid and did not get access.

Downgrades are not destructive. Locking a module leaves its data in place, so re-upgrading restores access to the records that were already there.

## Scopes, and why each one is requested

Entitlements decide what a shop may use; scopes decide what the app may read. Growthify requests seven:

| Scope | Why |
| --- | --- |
| `read_products`, `write_products` | Render product blocks; manage badges, bundles and sourcing. |
| `read_orders`, `write_orders` | Analytics, order tracking, and the COD and upsell flows. |
| `read_customers` | Reviews, wishlist, loyalty and analytics segments. |
| `read_themes`, `write_themes` | Install and manage the theme app blocks. |

`read_orders` and `read_customers` are **Protected Customer Data** under Shopify's rules, which is why the app completes Shopify's Protected Customer Data questionnaire covering data use, retention and encryption. What is stored and what is deleted is set out on the [Privacy](../legal/privacy.md) page.

## What entitlements do not do

- **They are not licence keys.** Nothing can be unlocked offline, by a code, or by editing anything the browser can reach. Removing the gate client-side changes what a screen displays and not what the server permits.
- **A toggle does not grant access.** Switching a module on records intent. The plan requirement is re-checked on the server at every gated request.
- **They do not gate a block's markup.** A theme block still renders its Liquid when its module is off — it simply has no data. Nothing in the Theme Editor warns you about that.
- **A ceiling cannot widen an allowance.** The narrower number always wins.
- **Exceeding a limit does not bill you more.** Billing is a fixed monthly subscription; the meter refuses an action rather than charging for it. There is no overage.
- **A downgrade does not delete anything.** Access locks; records stay.
- **Usage counters are not analytics.** They exist to enforce a limit for a period, are pruned on a retention window, and are not a reporting history.

## FAQ

### What is an entitlement?

A row recording one shop's access to one module, with its enabled state and an optional usage ceiling. Every gated request is checked against it.

### What happens to my modules when I downgrade?

The `app_subscriptions/update` [webhook](../api/webhooks.md) writes the new plan and rewrites the entitlement set in the same transaction. Modules the lower tier excludes lock on the next request; your data stays.

### Can switching a module on bypass the plan requirement?

No. The plan check runs again on the server at every gated request.

### Are usage limits hard or soft?

Both, in sequence: a warning header at 80% of the allowance, a `429` refusal at 100%.

### When does a usage counter reset?

On the calendar month, not on your install date.

### Can a per-shop ceiling give a store more than its plan allows?

No — the narrower of the plan allowance and the shop ceiling is what gets enforced.

### Why does Growthify ask for those scopes?

The seven scopes in the table above cover products, orders, customers and themes. Two of them are Protected Customer Data and carry extra obligations the app is built to meet.

## Related pages

- [Billing plans](./billing-plans.md) — the four tiers, their prices and their numeric limits.
- [Admin features](./features.md) — the 50 screens these gates sit in front of.
- [Webhooks](../api/webhooks.md) — the subscription webhook that drives a plan change.
- [Storefront API](../api/storefront-api.md) — where the usage headers appear on a real response.
