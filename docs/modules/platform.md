---
id: platform
title: Growthify platform and loader — OAuth, billing, webhooks
sidebar_label: Platform & Loader
sidebar_position: 2
description: The Growthify foundation — Shopify OAuth and sessions, App Subscriptions billing, GDPR and lifecycle webhooks, entitlements, and the lazy storefront loader.
keywords: [shopify oauth, app subscriptions billing, gdpr webhooks, prisma sessions, storefront loader, entitlement initialisation, lazy loading]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does Growthify use license keys?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. All gating runs through Shopify App Subscriptions. There is no key to enter, nothing to lose, and no separate payment processor. Removing the app removes access.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to my data when I uninstall?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The app/uninstalled webhook marks the shop inactive and stops processing immediately. Shopify later sends shop/redact, which erases shop-scoped data across 254 tables while retaining a hashed audit record for compliance.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why do entitlements exist before I touch anything?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because the install hook creates all sixteen entitlement rows in one transaction. Without that, the first module toggle would hit a missing row. Doing it in one transaction also means an install cannot leave a shop half provisioned.',
          },
        },
        {
          '@type': 'Question',
          name: 'How large is the always-loaded storefront JavaScript?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Roughly 5 KB in total across the two scripts that always load: the embed script at about 1,095 bytes and the loader at about 4,034 bytes. Everything else loads only for modules you enabled.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are webhooks verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every webhook request is HMAC-verified by the Shopify Remix adapter before any handler runs, and payloads are validated again at runtime. An unverified request never reaches business logic.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if my subscription changes?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The app_subscriptions/update webhook records the new plan. Gated features re-evaluate on the next request, so an upgrade takes effect immediately and a downgrade locks what the lower tier no longer includes.',
          },
        },
      ],
    })}
  </script>
</head>

# Platform & Loader

**The platform module is the foundation layer that owns everything shared: Shopify OAuth and session storage, App Subscriptions billing, the webhook receivers, and the entitlement system every other module is gated by. The loader is its storefront counterpart — the small runtime that decides which module code a shopper's browser actually downloads.**

Neither is a feature a merchant configures. They are the things that make the other modules possible, which is also why neither appears in the entitlement list: a plan cannot withhold them.

## Who this page is for

- **Developers** who need to understand install, billing and webhook flow before working on any module.
- **Merchants and reviewers** asking what happens at install, at upgrade and at uninstall.
- **Anyone auditing storefront performance**, since the loader determines the baseline cost of having Growthify installed at all.

## What the platform owns

### OAuth and sessions

Shopify OAuth runs through the official Remix adapter, with sessions persisted in PostgreSQL through the Prisma session-storage adapter rather than in memory. Persisted sessions mean a backend restart does not sign every merchant out, and a multi-instance deployment does not depend on sticky routing.

### Entitlement initialisation at install

On install, the `afterAuth` hook calls `initializeEntitlements()`, which creates the shop's rows for **all sixteen entitlement modules in a single database transaction**.

Two deliberate properties are worth naming:

- **The rows exist before the merchant touches anything.** Without this, the first module toggle would look up a row that does not exist and fail on a fresh install — the worst possible moment.
- **It is one transaction, not sixteen sequential writes.** Sixteen awaited round trips made every install wait, and gave sixteen chances to leave a shop half-provisioned if one failed partway. Batched, the writes are all-or-nothing.

Each row records the module, whether it is enabled, and a `maxUsage` ceiling for metered modules.

### Billing

Billing is **Shopify App Subscriptions** across four tiers. There are no license keys, no separate checkout and no card details reaching Growthify. Plan numbers derive from one shared registry, so the pricing page, the server's enforcement and the Shopify billing configuration are the same numbers rather than three copies that agree today. See [Billing plans](../admin/billing-plans.md).

### Webhooks

The platform receives ten webhook topics and verifies every one.

**GDPR compliance topics** — `customers/data_request`, `customers/redact`, `shop/redact`. The redaction path erases shop-scoped data across **254 tables** and keeps a hashed audit row so the erasure itself is evidenced.

**Lifecycle topics** — `app/uninstalled`, `app_subscriptions/update`, `orders/create`, `orders/fulfilled`, `products/create`, `products/update`, `inventory_levels/update`.

Every request is HMAC-verified before a handler runs. See [Webhooks](../api/webhooks.md).

### Background work

Scheduled and deferred work runs through an **in-database job queue with a worker tick** rather than an external broker — the report scheduler and cart-recovery mail both ride on it. Keeping the queue in the same database as the data keeps a job's state transactional with the work it describes.

### Health

The backend exposes `/health` and `/ready`, and **refuses to boot in production against a placeholder or loopback application URL**. A misconfigured deploy fails at startup rather than serving an OAuth flow that redirects nowhere.

## The loader

The loader is the storefront runtime booted by the [Growthify Embed](../storefront/app-embed.md). Its whole job is to make an unused module cost nothing.

1. It reads `window.gfConfig` — the proxy base URL, the shop domain, the asset base.
2. It determines which modules the merchant enabled.
3. It lazy-loads **only those** module runtimes from the extension's asset bundle.

**The always-loaded cost is roughly 5 KB**: the embed script at about 1,095 bytes and the loader at about 4,034 bytes. A store using only reviews never downloads the cart, bundles or consent runtime.

This is why Growthify does not inject a script tag per feature. Sixteen modules' worth of tags on every page view would damage Core Web Vitals for a store using two of them, and the shopper would pay for capability the merchant never switched on.

## What the platform and loader do not do

- **They are not configurable.** There is no platform settings page; the loader has no options beyond the embed's debug toggle.
- **They cannot be disabled or withheld by plan.** They are infrastructure, not entitlements.
- **The loader does not render anything.** Visible output comes from theme blocks; the loader only fetches runtimes.
- **The platform does not process payments.** Shopify does, through App Subscriptions.
- **Sessions are not shared with the web app account area**, which uses separate authentication entirely.
- **The job queue is not a real-time system.** It ticks; it is not a millisecond-latency event bus.

## FAQ

### Does Growthify use license keys?

No. All gating runs through Shopify App Subscriptions — no key to enter, nothing to lose, no separate processor. Removing the app removes access.

### What happens to my data when I uninstall?

`app/uninstalled` marks the shop inactive and stops processing immediately. Shopify later sends `shop/redact`, which erases shop-scoped data across 254 tables while retaining a hashed audit record for compliance.

### Why do entitlements exist before I touch anything?

Because the install hook creates all sixteen rows in one transaction. Without it the first module toggle would hit a missing row; without the transaction, a partial failure could leave a shop half-provisioned.

### How large is the always-loaded storefront JavaScript?

Roughly 5 KB across the two always-loaded scripts — about 1,095 bytes for the embed and about 4,034 bytes for the loader. Everything else loads only for enabled modules.

### Are webhooks verified?

Yes. Every request is HMAC-verified by the Shopify Remix adapter before any handler runs, and payloads are validated again at runtime.

### What happens if my subscription changes?

`app_subscriptions/update` records the new plan; gated features re-evaluate on the next request. Upgrades take effect immediately; downgrades lock what the lower tier no longer includes.

### Why store sessions in PostgreSQL rather than memory?

So a restart does not sign merchants out and a multi-instance deployment needs no sticky routing. It also means session state is backed up with everything else.

## Related pages

- [Entitlements](../admin/entitlements.md) — how the rows this module creates are enforced.
- [Webhooks](../api/webhooks.md) — every topic, its route and its purpose.
- [App embed](../storefront/app-embed.md) — what boots the loader.
- [Architecture](../getting-started/architecture.md) — where the platform sits among the surfaces.
