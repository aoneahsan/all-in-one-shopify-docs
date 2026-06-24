---
id: entitlements
title: Entitlements
sidebar_label: Entitlements
sidebar_position: 3
description: How Growthify gates premium features at request time using verifySubscription and per-module Entitlement rows.
keywords: [shopify app gating, entitlements, verifysubscription, maxusage, plan gating]
---

# Entitlements

Entitlements are Growthify's single mechanism for gating premium features. Every gated request answers two questions: **is the shop subscribed to a plan that includes this?** and **has it stayed within any usage limit?**

## The model

- `verifySubscription(shopDomain)` resolves the shop's current plan from its active Shopify subscription.
- An `Entitlement(shopId, moduleId)` row records access to a module/feature.
- `Entitlement.maxUsage` is enforced **at request time** for usage-metered features (for example monthly storefront views).

The gating helper lives in `apps/shopify-app/app/models/entitlement.server.ts`, and plan tier definitions live in `apps/shopify-app/app/shopify/billing-plans.ts`.

## Initialised on install

When a shop installs the app, the `afterAuth` hook calls `initializeEntitlements()` so the shop has its baseline entitlement rows before it ever toggles a module. This prevents the "missing row → 500" failure a fresh install would otherwise hit on its first module toggle.

## Scopes & why each is needed

The app requests these scopes; each is justified in the [privacy policy](../legal/privacy.md) and Terms:

| Scope | Why |
| --- | --- |
| `read_products`, `write_products` | Render product blocks; manage badges, bundles, and sourcing. |
| `read_orders`, `write_orders` | Analytics, order tracking, COD/upsell flows. |
| `read_customers` | Reviews, wishlist, loyalty, analytics segments. |
| `read_themes`, `write_themes` | Install/manage theme app blocks. |

`read_customers` and `read_orders` are Protected Customer Data, so the app completes Shopify's Protected Customer Data questionnaire (data use, retention, encryption).

## FAQ

**What happens when a shop downgrades?**
The `app_subscriptions/update` webhook updates the plan; gated features re-evaluate on the next request and lock if no longer included.

**Are usage limits hard or soft?**
Metered limits (e.g. views) are enforced at request time against `Entitlement.maxUsage`.
