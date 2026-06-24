---
id: configuration
title: Configuration
sidebar_label: Configuration
sidebar_position: 3
description: Growthify app-embed settings, the app-proxy prefix, and the production environment variables the Remix app reads at boot.
keywords: [growthify configuration, app proxy prefix, shopify env vars, session secret, gdpr pepper]
---

# Configuration

## App-embed settings (merchant-facing)

The **Growthify Embed** app-embed exposes two settings in the Theme Editor:

| Setting | Default | Purpose |
| --- | --- | --- |
| **App proxy prefix** | `growthify` | Must match the App proxy "subpath prefix" configured for the app. Drives `window.gfConfig.appUrl = /apps/<prefix>`. |
| **Enable debug logging** | off | Logs Growthify activity to the browser console. Leave off in production. |

Per-module behaviour (popup triggers, review display style, cart-drawer copy, consent language, and so on) is configured in the **Growthify admin**, not in the embed. The embed only wires the storefront to the server.

## App proxy

The app's `shopify.app.toml` declares the proxy:

```toml
[app_proxy]
url = "https://growthify-shopify-app.fly.dev"
subpath = "apps"
prefix = "growthify"
```

So storefront calls resolve at `https://<store>/apps/growthify/api/storefront/*` and are forwarded (signed) to the Remix app. See [App proxy](../storefront/app-proxy.md).

## Production environment variables

The Remix app validates the first four in production at boot (`apps/shopify-app/app/shopify.server.ts`). Set these as host secrets — never commit real values.

| Variable | Required | Purpose |
| --- | --- | --- |
| `SHOPIFY_API_KEY` | yes | App client id from the Partner Dashboard |
| `SHOPIFY_API_SECRET` | yes | App client secret |
| `SHOPIFY_APP_URL` | yes | The deployed app host (e.g. the Fly.io URL) |
| `SESSION_SECRET` | yes | 48+ random bytes for session signing |
| `SHOPIFY_SCOPES` | yes | `read_products,write_products,read_orders,write_orders,read_customers,read_themes,write_themes` |
| `DATABASE_URL` + `DIRECT_URL` | yes | Neon Postgres pooled + direct connection strings |
| `GDPR_AUDIT_PEPPER` | yes | Secret used to hash customer emails in the GDPR audit log |
| `VAPID_PUBLIC_KEY` + `VAPID_PRIVATE_KEY` | for push | Web Push keys |
| `SENTRY_DSN` / `VITE_SENTRY_DSN` | optional | Server + client error reporting |

Messaging-provider credentials (Twilio, SendGrid, Mailgun, Klaviyo, etc.) are entered by the merchant in the admin and stored **encrypted at rest** (`providers/crypto.server.ts`), decrypted only at send time — they are never environment variables.

:::tip
The full, copy-paste list of production secrets, hosting steps, and Partner Dashboard fields lives in the app repo's `docs/MANUAL-TASKS.md`. Those are human-only operational steps.
:::
