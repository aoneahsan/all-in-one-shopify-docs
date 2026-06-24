---
id: app-proxy
title: App proxy
sidebar_label: App proxy
sidebar_position: 3
description: How Growthify storefront blocks reach the server through the Shopify App Proxy at /apps/growthify/api/storefront/*.
keywords: [shopify app proxy, storefront api, app proxy signature, apps growthify]
---

# App proxy

Storefront blocks can't call the Remix app directly (cross-origin, no Shopify session). Instead they call the **Shopify App Proxy**, which forwards signed requests to the app.

## How it's wired

The app declares the proxy in `shopify.app.toml`:

```toml
[app_proxy]
url = "https://growthify-shopify-app.fly.dev"
subpath = "apps"
prefix = "growthify"
```

So a storefront request to:

```
https://<store>/apps/growthify/api/storefront/reviews
```

is forwarded by Shopify (with a signed query string) to the Remix route that handles `api/storefront/reviews`. The route verifies the proxy signature, resolves the shop from the request, checks the relevant [entitlement](../admin/entitlements.md), and returns JSON.

## The base URL contract

The [app embed](./app-embed.md) sets `window.gfConfig.appUrl = "/apps/" + prefix`. Blocks build their fetch URLs from that value, with a hard fallback of `/apps/growthify`. The embed's **App proxy prefix** setting and the app's `prefix` must agree — if they drift, requests 404.

## Why a single base URL

Every block reading the **same** `window.gfConfig.appUrl` means there is one place to change the prefix and one path shape (`/apps/<prefix>/api/storefront/*`) for all 50 storefront endpoints. See the full list in [Storefront API](../api/storefront-api.md).

## FAQ

**Why not call the app's domain directly?**
The app proxy gives storefront requests a same-origin path and a Shopify-signed envelope the server can verify — without exposing the app's host or requiring CORS.

**My calls 404 — what's wrong?**
Check that (1) the app embed is enabled, (2) the embed's proxy prefix matches the app's `prefix`, and (3) the App-proxy is configured in the Partner Dashboard to point at the app root.
