---
id: platform
title: Platform & Loader
sidebar_label: Platform & Loader
sidebar_position: 2
description: The Growthify platform foundation — OAuth, App Subscriptions billing, GDPR webhooks, sessions, and the lazy storefront loader.
keywords: [shopify oauth, app subscriptions billing, gdpr webhooks, prisma sessions, storefront loader]
---

# Platform & Loader

The platform module (00) and loader module (01) are the foundation every other module sits on.

## What the platform owns

- **OAuth + sessions.** Shopify OAuth via `@shopify/shopify-app-remix`, with sessions persisted in Postgres through the Prisma session-storage adapter. On install, `afterAuth` initialises the shop's entitlements so the first module toggle never fails.
- **Billing.** Shopify **App Subscriptions** (`appSubscriptionCreate`) with four tiers — see [Billing plans](../admin/billing-plans.md). There are no license keys.
- **GDPR compliance webhooks.** `customers/redact`, `customers/data_request`, and `shop/redact` are wired to real handlers; redaction deletes shop data while retaining a hashed audit row.
- **Lifecycle webhooks.** `app/uninstalled`, `app_subscriptions/update`, `orders/create`, `orders/fulfilled`, `products/create`, `products/update`, and `inventory/update`. See [Webhooks](../api/webhooks.md).
- **Entitlements.** The single gate for premium features; `Entitlement.maxUsage` is enforced at request time for metered features. See [Entitlements](../admin/entitlements.md).

## The loader (01)

The loader is the small storefront runtime booted by the [Growthify Embed](../storefront/app-embed.md). It:

1. Reads `window.gfConfig` (proxy base URL, shop domain, asset base).
2. Determines which modules are enabled.
3. Lazy-loads only those module runtimes from the extension's asset bundle.

This keeps the storefront fast: a store using only reviews never downloads the cart or bundles runtime.

## FAQ

**Does Growthify use license keys?**
No. All gating is through Shopify App Subscriptions, which the App Store requires for billing. Removing the app removes access.

**What happens to my data when I uninstall?**
The `app/uninstalled` webhook marks the shop inactive; a later `shop/redact` deletes shop rows and entitlements while keeping a hashed audit record for compliance.

**Why does a freshly installed store still see its modules work?**
Because `afterAuth` initialises entitlements at install time, so toggling a module never hits a missing-row error.
