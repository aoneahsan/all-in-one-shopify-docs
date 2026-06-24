---
id: billing-plans
title: Billing plans
sidebar_label: Billing plans
sidebar_position: 2
description: Growthify pricing — Free, Pro ($29), Growth ($79), and Scale ($199) tiers, billed through Shopify App Subscriptions.
keywords: [growthify pricing, shopify app subscriptions, free pro growth scale, billing tiers]
---

# Billing plans

Growthify bills exclusively through **Shopify App Subscriptions** (`appSubscriptionCreate`). There are no license keys. Plan definitions are the single source of truth in `apps/shopify-app/app/shopify/billing-plans.ts`.

| Plan | Price / month | Trial | Active popups | Monthly views | AI mode | Team roles | Multi-store |
| --- | --- | --- | --- | --- | --- | --- | --- |
| **Free** | $0 | — | 1 | 10,000 | BYOK | — | — |
| **Pro** | $29 | 14 days | Unlimited | 100,000 | BYOK | — | — |
| **Growth** | $79 | 14 days | Unlimited | 500,000 | Managed + BYOK | yes | — |
| **Scale** | $199 | 14 days | Unlimited | Unlimited | Managed + BYOK | yes | yes |

- **BYOK** = bring-your-own-key for any AI-assisted features (you supply the provider key).
- **Managed AI** (Growth/Scale) adds a managed option alongside BYOK.
- **Views** is the monthly storefront-impression allowance for metered surfaces.

## How billing is enforced

Each premium capability is gated by `verifySubscription(shopDomain)` plus an `Entitlement(shopId, moduleId)` row. Metered features additionally enforce `Entitlement.maxUsage` at request time. See [Entitlements](./entitlements.md).

## Pricing parity

The repo includes a `verify:pricing` check that proves the in-code plan definitions match the Partner Dashboard configuration documented in `docs/app-store/PARTNER-DASHBOARD-CONFIG.md`, so the listing and the code never drift.

## FAQ

**Is there a free plan?**
Yes — Free ($0) with one active popup and a 10,000-view allowance. Upgrade any time.

**Do I enter a credit card to Growthify?**
No. Billing runs through your Shopify invoice via App Subscriptions; Growthify never sees card details.

**Can I cancel?**
Yes — cancel from the Shopify admin; the `app_subscriptions/update` webhook flips your plan and access follows.
