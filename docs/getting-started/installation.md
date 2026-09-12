---
id: installation
title: Install Growthify and enable the storefront embed
sidebar_label: Installation
sidebar_position: 1
description: How to install Growthify on a Shopify store, enable the required Growthify Embed app embed, add theme blocks, and verify the install actually works.
keywords: [growthify installation, shopify app install, theme app extension, app embed, shopify theme editor, install verification]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I have to enable the Growthify app embed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. It is the only step that is not optional. All 67 non-embed theme blocks depend on it, because the embed is what defines window.gfConfig and boots the loader. With the embed off, blocks render markup but have no server to talk to.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does installing Growthify edit my theme files?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Growthify ships as a theme app extension, so its blocks are added through the Theme Editor and live outside your theme code. Nothing writes into theme.liquid or checkout.liquid, and removing the app removes the blocks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which Shopify scopes does Growthify request at install?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'read_products, write_products, read_orders, write_orders, read_customers, read_themes and write_themes. Each one is justified per feature on the Entitlements page, and read_orders with read_customers are Protected Customer Data.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I check that the install actually worked?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Three checks: the App embeds panel shows Growthify switched on, a storefront page source contains a window.gfConfig object whose appUrl is /apps/growthify, and a request to /apps/growthify/proxy returns JSON rather than a 404.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I install Growthify from the Shopify App Store today?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not yet. The App Store listing has not been published, so there is no listing URL. This page documents the install flow that applies once the app is listed, and the developer setup that works today.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need to add all 72 theme blocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Add only the blocks for modules you use. A block whose module is disabled has nothing to render, and blocks you never place cost nothing at all.',
          },
        },
      ],
    })}
  </script>
</head>

# Installation

**Installing Growthify means three things: authorising the app on your Shopify store, switching on one required app embed in your theme, and placing the blocks you want where you want them.** Everything else — which modules run, how each behaves, which plan you are on — is configuration you change afterwards without touching the theme again.

This page covers the merchant install, the verification checks that tell you it worked, and the developer setup for running the source.

## Who this page is for

- **Merchants** setting Growthify up on their own store for the first time.
- **Agencies** rolling the app out across client stores who want a repeatable checklist and a verification step that does not rely on "it looks fine".
- **Developers** running the application source locally.

## Before you start

You need a Shopify store you can install apps on, and a theme that supports app blocks — that is, an Online Store 2.0 theme. Growthify's storefront half is delivered as a **theme app extension**, which means:

- Blocks are added through the **Theme Editor**, not by editing Liquid files.
- Nothing is written into `theme.liquid`, and nothing touches `checkout.liquid`.
- Uninstalling the app removes its blocks; it does not leave orphaned code in your theme.

A vintage theme without app-block support can still use the app embed, but cannot place section blocks.

## Merchant install

### 1. Install the app and approve scopes

Open the Growthify listing and choose **Add app**, then approve the requested access scopes:

`read_products`, `write_products`, `read_orders`, `write_orders`, `read_customers`, `read_themes`, `write_themes`.

Each scope maps to specific features, and the mapping is set out per scope on the [Entitlements](../admin/entitlements.md) page. Two of them — `read_orders` and `read_customers` — are **Protected Customer Data** under Shopify's rules, which carries extra handling obligations the app is built to meet.

:::note The App Store listing is not published yet
Growthify has not yet been submitted to the Shopify App Store, so there is no listing URL to link and none appears anywhere on this site. This section documents the flow that applies once the app is listed. Until then, installation happens through a development store.
:::

### 2. Choose a plan

Start on **Free** and change tier whenever you like. Billing runs through **Shopify App Subscriptions**, so charges appear on your Shopify invoice and Growthify never handles card details. Paid tiers carry a 14-day trial. See [Billing plans](../admin/billing-plans.md).

### 3. Enable the app embed — this step is required

In **Online Store → Themes → Customize → App embeds**, switch on **Growthify**.

This is the one step you cannot skip. The embed is the only place in the storefront that can read Liquid, so it is what defines `window.gfConfig` — the app-proxy base URL, your shop domain and the asset base — and boots the module loader. **All 67 non-embed blocks depend on it.** With the embed off, a block will render its markup and then quietly do nothing, because it has no server to call.

See [App embed](../storefront/app-embed.md) for what it injects and why.

### 4. Add the blocks you want

Still in the Theme Editor, add Growthify **app blocks** to the sections where they belong — a reviews carousel under the product description, a cookie banner site-wide, a cart drawer, an announcement bar.

There are 72 blocks in total: 5 body embeds, 1 head embed and 66 section blocks. You are not expected to use most of them. Add what your store needs; see [Theme blocks](../storefront/theme-blocks.md) for the full catalogue grouped by where each one renders.

### 5. Configure each module

Open the Growthify admin from your Shopify admin's Apps menu. The admin home links to every module's settings page — popup triggers and targeting, review moderation and display, cart drawer copy and thresholds, consent categories and regions.

Module behaviour is configured **here**, not in the Theme Editor. The embed only wires the storefront to the server; it does not hold feature settings.

## Verifying the install

Do not rely on the storefront looking right. Three checks tell you whether the plumbing is actually connected:

1. **The embed is on.** In the Theme Editor's **App embeds** panel, **Growthify** shows as enabled.
2. **The config is present.** View the page source of any storefront page and find a `window.gfConfig` object whose `appUrl` reads `/apps/growthify`. If the object is absent, the embed is off or not saved.
3. **The proxy answers.** Request `https://<your-store>/apps/growthify/proxy`. It should return JSON, not a 404. A 404 here means the app proxy is not resolving.

If check 2 passes but check 3 fails, the usual cause is a mismatch between the **App proxy prefix** setting in the embed and the proxy configured for the app. See [App proxy](../storefront/app-proxy.md) for how the two must agree.

## Developer setup

To run the application source:

```bash
git clone https://github.com/aoneahsan/all-in-one-shopify.git
cd all-in-one-shopify
yarn install
```

Copy the environment templates and fill them in with your own values. Never commit real values:

```bash
cp .env.example .env
cp apps/shopify-app/.env.example apps/shopify-app/.env
cp apps/web/.env.example apps/web/.env
```

### Database migrations

Growthify uses **Prisma against a hosted Supabase PostgreSQL project**, and one hosted project serves both development and production. That single fact drives the migration rules:

```bash
# Apply existing migrations
yarn workspace shopify-app prisma migrate deploy
```

:::warning `prisma migrate dev` is deliberately refused
Because development and production share one database, a workflow that can drop and recreate the schema is not safe here. The project's own `migrate` script exits non-zero on purpose. Migrations are **forward-only**: create a migration, read the generated SQL, save it, deploy it, then verify the database and the schema agree.
:::

### Gates

Verify with one-shot commands. No dev server is needed:

```bash
yarn typecheck   # TypeScript across the monorepo
yarn lint        # Lint every workspace
yarn build       # Build every workspace
```

## What installation does not do

- **It does not configure your Shopify Partner app.** Creating the Partner app, setting the application URL, and configuring the app proxy and compliance webhook URLs are operational steps outside this documentation.
- **It does not provision hosting.** The Remix backend must be deployed somewhere reachable before any storefront request can be answered.
- **It does not migrate data from another app.** Reviews, wishlists and popup subscribers from a previous vendor are not imported automatically.
- **It does not modify checkout** beyond Shopify's supported extension points.
- **It does not enable every module for you.** Modules have plan-dependent defaults; the rest you switch on yourself.

## FAQ

### Do I have to enable the Growthify app embed?

Yes — it is the only genuinely non-optional step. All 67 non-embed blocks depend on it, because the embed defines `window.gfConfig` and boots the loader. With it off, blocks render but never reach the server.

### Does installing Growthify edit my theme files?

No. Growthify ships as a theme app extension, so blocks are added through the Theme Editor and live outside your theme code. Nothing is written into `theme.liquid` or `checkout.liquid`, and uninstalling removes the blocks cleanly.

### Which Shopify scopes does Growthify request?

`read_products`, `write_products`, `read_orders`, `write_orders`, `read_customers`, `read_themes` and `write_themes`. Each is justified per feature on the [Entitlements](../admin/entitlements.md) page. `read_orders` and `read_customers` are Protected Customer Data.

### How do I check the install actually worked?

Three checks: the **App embeds** panel shows Growthify on; a storefront page source contains `window.gfConfig` with `appUrl` of `/apps/growthify`; and `/apps/growthify/proxy` returns JSON rather than a 404.

### Can I install from the Shopify App Store today?

Not yet — the listing has not been published, so there is no URL to give you. This page documents the flow that applies once it is listed, alongside the developer setup that works today.

### Do I need to add all 72 theme blocks?

No. Add only the blocks for the modules you use. A block whose module is disabled has nothing to render, and a block you never place costs nothing.

### My blocks render but show no data — what is wrong?

Almost always one of two things: the app embed is off, or the embed's **App proxy prefix** does not match the proxy configured for the app. Run verification checks 2 and 3 above to tell which.

## Related pages

- [App embed](../storefront/app-embed.md) — what the required embed injects, and its two settings.
- [App proxy](../storefront/app-proxy.md) — how storefront blocks reach the server, and why a prefix mismatch 404s.
- [Architecture](./architecture.md) — the surfaces and how they communicate.
- [Configuration](./configuration.md) — embed settings and the backend's environment contract.
