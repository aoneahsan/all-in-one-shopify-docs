---
id: storefront-api
title: "Growthify Storefront API — 55 app-proxy JSON endpoints"
sidebar_label: Storefront API
sidebar_position: 1
description: "The Growthify storefront endpoints served behind the Shopify App Proxy, the guards every one of them runs, and the response headers that report rate and usage."
keywords: [growthify storefront api, app proxy endpoints, shopify storefront api routes, storefront rate limit headers, usage limit 429, row cap]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can I call the Growthify storefront endpoints from outside a storefront?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'They are not built for that. They exist to serve Growthify theme blocks through the Shopify app proxy, they grant no CORS and they carry no versioning promise. To read your own store data from your own systems, use Merchant API v1 with a bearer key.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why are some storefront endpoints not under the /api/storefront path?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'History rather than design. Fifty-five endpoints sit under /api/storefront and another 53 sit under sibling paths such as /api/reviews and /api/wishlist. All of them run the same guard wrapper, so the path prefix tells you nothing about how protected a route is.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are the storefront write endpoints rate-limited?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, and more tightly than reads. The default budget is 60 requests per minute keyed on route, shop and client IP; submission endpoints set their own lower ceilings, such as 10 per minute.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much data can one storefront request return?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'List reads are capped at 100 rows regardless of what a caller asks for, and every response is assembled from an explicit field list rather than a whole database row.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does a usage limit look like on the wire?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'HTTP 429 with a usage_limit_exceeded body naming the module and event type, the current count, the limit and an upgrade path, plus X-Usage-Limit-Exceeded, X-Usage-Current and X-Usage-Limit headers. At 80 percent of the allowance a successful response carries X-Usage-Warning instead.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does a storefront endpoint work if the module is switched off?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Every endpoint declares the module it belongs to, and a module the shop plan does not include has a zero allowance, so the call is refused rather than answered with empty data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I POST a large payload to a storefront endpoint?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Up to 32 KB. Storefront payloads are a handful of ids and short strings, so anything larger is refused with a payload-too-large response before it is parsed.',
          },
        },
      ],
    })}
  </script>
</head>

# Storefront API

**The Growthify Storefront API is the set of JSON endpoints that the app's theme blocks call through the Shopify App Proxy — same-origin to the shop, identified by the shop rather than by a key, and metered against the shop's plan on every call.** It is an internal contract between Growthify's own blocks and Growthify's own backend, not a public API, and the distinction governs everything below.

## Who this page is for

- **Developers** debugging a block's network traffic, or extending a theme with a call of their own.
- **Agencies** checking what a storefront request can and cannot return before recommending the app.
- **Anyone who arrived looking for an integration API** — you want [Merchant API v1](./merchant-api-v1.md) instead, and the difference is set out below.

## Conventions

- **Base:** `window.gfConfig.appUrl`, which resolves to `/apps/growthify`. See [App embed](../storefront/app-embed.md).
- **Path:** `/apps/growthify/api/storefront/<name>` for most endpoints, `/apps/growthify/api/<name>` for the rest.
- **Auth:** the Shopify app-proxy query string. No API key appears in a theme block, ever.
- **Format:** JSON in, JSON out. `GET` for reads, `POST` for writes, `OPTIONS` answered with `204` and no CORS grant.
- **Shop identity:** the `shop` query parameter, or the JSON body on the older endpoints that only ever sent it there.

## The 55 endpoints under `/api/storefront/`

### Catalogue and merchandising

`badges`, `filters`, `sort`, `search`, `mega-menu`, `recently-viewed`, `product-360`, `product-videos`, `product-comparison`, `product-customizer`, `variant-swatches`, `size-chart`, `preorder`.

### Urgency and social proof

`announcements`, `countdown`, `scarcity`, `social-proof`, `stock-alerts`, `stock-alert-count`.

### Bundles and pricing

`bogo`, `mix-match`, `quantity-breaks`, `wholesale-pricing`.

### Cart, shipping and delivery

`gift-message`, `shipping-calculator`, `tax-estimate`, `delivery-date`.

### Capture and messaging

`popups`, `email-subscribe`, `sms-subscribe`, `push-subscribe`, `contact-form`, `contact-form/submit`, `live-chat`, `faq`, `faq/view`, `faq/helpful`.

### Loyalty and referral

`loyalty`, `loyalty/settings`, `referral`.

### Subscriptions

`subscriptions`, `product-subscribe`.

### Customer and fulfilment

`customer-account`, `order-tracking`, `returns`, `store-locator`.

### Localisation

`currency`, `translations`.

### SEO surfaces

`meta-tags`, `seo-render`, `sitemap`, `blog-rss`.

### Compliance

`age-verification`.

### Attribution

`affiliate-track`, `conversion-track`.

## The other 53, and why the path is not the boundary

Fifty-three more endpoints serve storefront blocks from sibling paths — `/apps/growthify/api/reviews`, `/apps/growthify/api/wishlist` and so on — and they run **the same guard wrapper** as the 55 above. That is 108 storefront-reachable endpoints in total.

| Prefix | Routes | Serves |
| --- | ---: | --- |
| `cart/*` | 8 | Cart drawer add-ons, cross-sell, donation, gift message, abandonment, A/B tests. |
| `upsells/*` | 7 | Offers, funnels, rules, post-purchase and thank-you surfaces. |
| `consent/*` | 6 | Banner language, regions, styling, accessibility, geo and the consent log. |
| `reviews/*` | 5 | Fetch, submission, helpful votes, media and upload. |
| `wishlist/*` | 5 | List and mutate, save-for-later, share, stock alerts. |
| `otp/*` | 5 | Verification, regions, WhatsApp, fraud signals. |
| `pages/*` | 4 | Page-builder blocks, versions, SEO and integrations. |
| `popup/*` | 3 | Submission, targeting, templates. |
| `bundles/*` | 3 | Bundle detail and the free-gift evaluate and redeem pair. |
| `analytics/*` | 3 | Events, journeys, UTM attribution. |
| `config`, `ab-tests`, `quantity-breaks`, `integrations/subscribe` | 4 | The loader's configuration call and three singles. |

The practical consequence: **do not infer protection from the path.** A route under `/api/reviews` is as guarded as one under `/api/storefront/reviews` would be, because the guard is a wrapper the route opts into rather than a rule applied to a URL prefix.

## What every endpoint runs before answering

The wrapper is shared, which is what makes the behaviour uniform. In order: `OPTIONS` short-circuits; a proxy signature is verified when one is present and rejected with `401` when it is present and wrong; the shop is resolved; the rate limit is checked; writes validate the request origin against the shop's own domains; the call is metered; and on the way out the wildcard CORS header is stripped, security headers are added and the rate-limit headers are attached even to a success. The full sequence, with the failure bodies, is on [App proxy](../storefront/app-proxy.md).

Three numbers are worth memorising because they shape what a client can do:

| Limit | Value | On breach |
| --- | --- | --- |
| Rate | 60 requests per minute per route, shop and IP; lower on writes | `429` with `X-RateLimit-Limit`, `-Remaining`, `-Reset` |
| Request body | 32 KB | Refused as payload-too-large before parsing |
| Rows per list read | 100 | Truncated to the cap; not an error |

## Usage headers, on every response

Every endpoint declares a module and an event type, so each call lands in the shop's monthly allowance for that module. That surfaces on the wire rather than silently:

- **Under 80%** of the allowance — nothing extra.
- **At or over 80%** — a successful response carries `X-Usage-Warning`, `X-Usage-Current` and `X-Usage-Limit`.
- **At 100%** — `429`, with a `usage_limit_exceeded` body naming the module, the event type, the current count, the limit and an upgrade path, and the same `X-Usage-*` headers plus `X-Usage-Limit-Exceeded`.

A module the shop's plan does not include has an allowance of zero, so its endpoints refuse from the first call rather than answering with empty data. The thresholds and the monthly period are on [Entitlements](../admin/entitlements.md).

## Example

```js
// Inside a Growthify storefront block
const base = window.gfConfig?.appUrl || '/apps/growthify';
const url = `${base}/api/storefront/badges?shop=${shop}&productId=${productId}`;

const res = await fetch(url);
if (res.status === 429) {
  // Back off. X-RateLimit-Reset is unix seconds; X-Usage-Limit-Exceeded
  // distinguishes a plan allowance from a rate budget.
  return;
}
const { badges } = await res.json();
```

## What the Storefront API does not do

- **It is not a public API.** No bearer key, no CORS grant, no documented envelope and no versioning promise. These paths exist to serve Growthify's own blocks, and they may change when the theme extension does. For integration work use [Merchant API v1](./merchant-api-v1.md), which is read-only, keyed, versioned and has a stable error table.
- **It does not authenticate the shopper.** The proxy signature establishes the shop, not the person browsing. Anything that must be safe per shopper needs its own check.
- **It does not answer for a shop that has not installed the app.** The shop is resolved before anything is read.
- **It does not return database rows.** Responses are assembled from explicit field lists, so a column added to a model later cannot start leaking through on its own.
- **It does not write to your Shopify catalogue.** Products, orders and customers stay Shopify's. These endpoints read Shopify data the app already holds and write only app-owned records.
- **It does not page.** Storefront reads are capped, not paginated — an interface that needs to walk a dataset is an admin or Merchant API job.
- **It does not retry.** A `429` carries a reset timestamp so a caller can back off deliberately instead of hammering.

## FAQ

### Can I call these endpoints from outside a storefront?

They are not built for it — no CORS, no key, no stability promise. Use [Merchant API v1](./merchant-api-v1.md).

### Why are some storefront endpoints not under `/api/storefront`?

History rather than design: 55 sit there and 53 sit under sibling prefixes, all running the same guards. The prefix tells you nothing about how protected a route is.

### Are the write endpoints rate-limited?

Yes, more tightly than reads — 60 per minute by default, and as low as 10 per minute on submissions.

### How much data can one request return?

Up to 100 rows, from an explicit field list.

### What does a usage limit look like on the wire?

`429` with a `usage_limit_exceeded` body and the `X-Usage-*` headers. At 80% of the allowance you get `X-Usage-Warning` on a success instead.

### Does an endpoint work if its module is off?

No — a module the plan does not include has a zero allowance, so the call is refused rather than answered emptily.

### Can I POST a large payload?

Up to 32 KB, after which the request is refused before parsing.

## Related pages

- [App proxy](../storefront/app-proxy.md) — the transport, the signature and the full guard sequence.
- [Merchant API v1](./merchant-api-v1.md) — the keyed, read-only API for your own systems.
- [Entitlements](../admin/entitlements.md) — where the allowances in the usage headers come from.
- [Theme blocks](../storefront/theme-blocks.md) — the callers.
