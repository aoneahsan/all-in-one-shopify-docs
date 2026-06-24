---
id: app-embed
title: App embed
sidebar_label: App embed
sidebar_position: 1
description: The single Growthify Embed app-embed injects window.gfConfig and boots the storefront loader — every Growthify block depends on it.
keywords: [shopify app embed, window.gfConfig, theme app extension embed, storefront loader]
---

# App embed

Growthify ships **one** app-embed — **Growthify Embed** — and every storefront block depends on it. Enable it under **Theme editor → App embeds → Growthify**.

## What the embed does

It is the only place that can read Liquid (`{{ shop.* }}`, `{{ '...' | asset_url }}`), so it does two jobs the rest of the storefront relies on:

1. **Injects `window.gfConfig`** — the single source of the app-proxy base URL (`/apps/<prefix>`), the shop domain, the secure URL, and the asset CDN base. Every Growthify block reads `window.gfConfig.appUrl` to build its `fetch()` calls.
2. **Boots `growthify-embed.js` → the loader**, which lazy-loads the runtimes for the modules the merchant has enabled.

The rendered config looks like:

```js
window.gfConfig = {
  appUrl: "/apps/growthify",            // app-proxy base
  shop: "your-store.myshopify.com",
  secureUrl: "https://your-store.com",
  assetBase: "https://cdn.shopify.com/.../assets/",
};
```

## Settings

| Setting | Default | Notes |
| --- | --- | --- |
| App proxy prefix | `growthify` | Must match the app's App-proxy prefix. |
| Enable debug logging | off | Logs Growthify activity to the console. |

## Why this matters

If the embed is **off**, `window.gfConfig` is never defined and storefront blocks have no server to talk to — they silently do nothing. Enabling the embed is step 3 of [installation](../getting-started/installation.md) for exactly this reason.

## FAQ

**Do I add the embed to every template?**
No — it is an **app embed** (theme-wide), not a section block. Enable it once and it applies across the storefront.

**The blocks render but don't load data — why?**
Almost always the embed is off or the proxy prefix in the embed doesn't match the app's App-proxy prefix. See [App proxy](./app-proxy.md).
