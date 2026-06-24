---
id: storefront-api
title: Storefront API
sidebar_label: Storefront API
sidebar_position: 1
description: The 50 Growthify storefront API endpoints served behind the Shopify App Proxy at /apps/growthify/api/storefront/*.
keywords: [growthify storefront api, app proxy api, shopify storefront endpoints, reviews api, cart api]
---

# Storefront API

Growthify exposes **50 storefront endpoints** behind the [app proxy](../storefront/app-proxy.md). Storefront blocks call them at `/apps/growthify/api/storefront/<name>` (a few live under `/apps/growthify/api/<name>`). Every endpoint validates the proxy signature, resolves the shop, and checks the relevant [entitlement](../admin/entitlements.md).

## Conventions

- **Base:** `window.gfConfig.appUrl` → `/apps/growthify`.
- **Auth:** Shopify-signed app-proxy query string (verified server-side). No API key in the block.
- **Format:** JSON in, JSON out.

## Endpoints by area

### Reviews & social proof
`reviews` (fetch), `reviews/helpful` (POST), `social-proof`, `badges`.

### Cart & checkout helpers
`gift-message`, `shipping-calculator`, `tax-estimate`, `bundles/free-gift/evaluate` (POST), `bundles/free-gift/redeem` (POST), `preorder`.

### Engagement
`popups`, `popup/submit` (POST), `announcements`, `countdown`, `scarcity`, `recently-viewed`, `wishlist` (add/remove/list), `referral`.

### Catalog & merchandising
`product-360`, `product-videos`, `product-comparison`, `product-customizer`, `variant-swatches`, `size-chart`, `filters`, `sort`, `search`, `mega-menu`, `recently-viewed`.

### Customer & localisation
`customer-account`, `currency`, `translations`, `meta-tags`, `seo-render`, `age-verification`.

### Loyalty, subscriptions & B2B
`loyalty`, `loyalty/settings`, `subscriptions`, `product-subscribe` (POST), `wholesale-pricing`.

### Messaging & contact
`email-subscribe` (POST), `sms-subscribe` (POST), `push-subscribe` (POST), `contact-form` + `contact-form/submit` (POST), `live-chat`, `faq` + `faq/view` + `faq/helpful`.

### Fulfilment & store
`order-tracking`, `delivery-date`, `returns`, `store-locator`, `blog-rss`, `sitemap`, `affiliate-track` (POST), `conversion-track` (POST).

### OTP
`otp/providers`, OTP send/verify.

## Example

```js
// Inside a Growthify storefront block
const base = window.gfConfig?.appUrl || '/apps/growthify';
const res = await fetch(`${base}/api/storefront/reviews?product=${productId}`);
const { reviews, average } = await res.json();
```

## FAQ

**Can I call these endpoints from outside a storefront?**
No — they require a valid Shopify app-proxy signature, which Shopify adds when forwarding storefront requests.

**Are write endpoints rate-limited?**
Yes — submission endpoints are protected and, where metered, enforce the plan's usage limits at request time.
