---
id: installation
title: Installation
sidebar_label: Installation
sidebar_position: 1
description: Install Growthify from the Shopify App Store, enable the Growthify Embed app embed, and add storefront blocks through the Theme Editor.
keywords: [growthify installation, shopify app install, theme app extension, app embed, shopify theme editor]
---

# Installation

Growthify is a Shopify app. For merchants, installation is a few clicks in the Shopify admin. For developers running the source, see [Architecture](./architecture.md) and the app repo's `README.md`.

## For merchants (App Store install)

1. **Install the app.** Open the Growthify listing on the Shopify App Store and click **Add app**, then approve the requested scopes (products, orders, customers, and themes — see [Entitlements](../admin/entitlements.md) for why each is needed).
2. **Choose a plan.** Pick **Free** to start; you can upgrade to Pro, Growth, or Scale at any time. Billing runs through Shopify App Subscriptions — see [Billing plans](../admin/billing-plans.md).
3. **Enable the app embed (required).** In **Online Store → Themes → Customize → App embeds**, turn on **Growthify**. This single embed injects the storefront config and boots the module loader. Without it, no storefront block can reach the server. See [App embed](../storefront/app-embed.md).
4. **Add the blocks you want.** In the Theme Editor, add Growthify **app blocks** (for example the announcement bar, reviews carousel, cart drawer, or cookie banner) to the sections where you want them. See [Theme blocks](../storefront/theme-blocks.md).
5. **Configure each module** from the Growthify admin. The admin home links to every module's settings page.

## Verifying the install

- The **App embeds** panel shows **Growthify** toggled on.
- A storefront page-source view contains a `window.gfConfig` object with an `appUrl` of `/apps/growthify`.
- An app-proxy probe — `https://<your-store>/apps/growthify/proxy` — returns JSON rather than a 404.

If any of those fail, re-check that the app embed is enabled and that the **App proxy prefix** in the embed settings matches the proxy configured for the app (default: `growthify`). See [App proxy](../storefront/app-proxy.md).

## For developers (run the source)

```bash
git clone https://github.com/aoneahsan/all-in-one-shopify.git
cd all-in-one-shopify
yarn install

# Configure secrets (never commit real values)
cp .env.example .env
cp apps/shopify-app/.env.example apps/shopify-app/.env
cp apps/web/.env.example apps/web/.env

# Migrate the database
yarn workspace shopify-app prisma migrate dev
```

Build and verify everything (no dev servers required):

```bash
yarn typecheck   # TypeScript across the monorepo
yarn build       # Build every workspace
yarn lint        # Lint every workspace
```

:::note
The Shopify Partner account, dev store, hosting, and production secrets are operational steps that live in the app repo's `docs/MANUAL-TASKS.md`. This site documents how the product works, not how to provision your hosting.
:::
