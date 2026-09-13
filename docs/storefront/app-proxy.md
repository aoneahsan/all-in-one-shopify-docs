---
id: app-proxy
title: "Shopify App Proxy routing for Growthify storefronts"
sidebar_label: App proxy
sidebar_position: 3
description: "How Growthify storefront blocks reach the backend through the Shopify App Proxy at /apps/growthify, and which guards run before any data is read."
keywords:
  [
    shopify app proxy,
    app proxy signature,
    apps growthify path,
    storefront same origin,
    proxy prefix subpath,
    hmac sha256 signature,
  ]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Why do storefront blocks not call the Growthify backend directly?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because a direct call is cross-origin and carries no Shopify context. The app proxy gives the same request a same-origin path on the shop domain and a signed query string the server can verify, so no CORS grant is needed and the app host never appears in storefront markup.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between the app proxy prefix and the subpath?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The prefix is the first path segment and Shopify accepts only a, apps, community or tools. The subpath is the second segment and is yours to choose. Growthify uses the prefix apps and the subpath growthify, which produces /apps/growthify.',
          },
        },
        {
          '@type': 'Question',
          name: 'My storefront calls return 404 — what is wrong?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Check three things in order: the Growthify app embed is enabled, the embed App proxy prefix setting matches the subpath the app is configured with, and an app proxy exists in the Partner Dashboard pointing at the app root rather than a sub-path.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the app proxy verify that a request really came from Shopify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shopify signs a proxied request with HMAC-SHA256 over the sorted query parameters using the app secret. Growthify recomputes that signature and compares it in constant time, rejecting a request whose signature is present but wrong with HTTP 401.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the app proxy work for a shop that has not installed Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The proxy is created by the app installation, and every handler resolves the shop from the request before reading anything. With no shop record the endpoints answer with an empty result rather than data.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are proxied requests rate-limited?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The default budget is 60 requests per minute per shop, IP and route, and write paths set tighter limits such as 10 per minute. A refusal is HTTP 429 with X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset headers.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I use the app proxy as a public API for my own scripts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is not built for that. For reading your own store data from your own systems, use the Merchant API v1 with a saio_ bearer key, which is a separate, read-only plane with its own error codes and pagination.',
          },
        },
      ],
    })}
  </script>
</head>

# App proxy

**The Shopify App Proxy is a forwarding path Shopify creates on your own storefront domain: a shopper's browser calls a path on your shop, and Shopify forwards that request to the Growthify backend with a signed query string identifying the shop.** It is the only route Growthify's storefront blocks use, because a block loaded on a shop domain cannot call the app's own host without becoming cross-origin and losing every piece of Shopify context that makes the request trustworthy.

## Who this page is for

- **Merchants and agencies** debugging blocks that render but never fill with data — this page and [App embed](./app-embed.md) cover the two causes between them.
- **Developers** who need to know what a proxied request is allowed to do, and what the server checks before doing it.

## The path, and the two segments people mix up

A proxy path has exactly two configurable segments, and they are not interchangeable:

| Part                             | Value       | Who decides it                                                  |
| -------------------------------- | ----------- | --------------------------------------------------------------- |
| **Prefix** — the first segment   | `apps`      | Shopify. Only `a`, `apps`, `community` or `tools` are accepted. |
| **Subpath** — the second segment | `growthify` | You. Any label.                                                 |

Together they produce the base every block calls:

```text
https://your-store.com/apps/growthify/...
```

The distinction matters because the words invite the wrong reading: "app proxy prefix" sounds like it should hold `growthify`, and Shopify's own admin labels the second segment **subpath prefix**. Put `growthify` in the actual `prefix` field and the configuration is invalid — `growthify` is not one of the four values Shopify accepts there — while every asset in the theme extension keeps requesting `/apps/growthify/...`. The result is a proxy that cannot be created at all, and blocks that 404 with nothing obviously wrong anywhere.

## What the round trip looks like

A storefront request to:

```text
https://your-store.com/apps/growthify/api/storefront/badges?shop=your-store.myshopify.com&productId=123
```

is forwarded by Shopify to the matching Remix route at `/api/storefront/badges`, with these parameters appended to the query string:

- `shop` — the shop's permanent `.myshopify.com` domain.
- `path_prefix` — the proxy base the request came in on, for example `/apps/growthify`.
- `logged_in_customer_id` — present only when the shopper is signed in to the store.
- `signature` — an HMAC-SHA256 digest over the other parameters, keyed with the app's secret.

The app's proxy is registered at the **app root**, not at a `/proxy` sub-path. That is deliberate: it means the proxy path maps one-to-one onto the app's own route tree, so `/apps/growthify/api/storefront/reviews` reaches `/api/storefront/reviews` with no rewriting. The handful of merchant-facing proxy pages — a status page and an email unsubscribe page — sit under `/apps/growthify/proxy` for the same reason.

## What runs before your data is touched

Every storefront route is wrapped in one shared guard rather than each one improvising. In order:

1. **`OPTIONS` short-circuits** with `204` and an `Allow` header, and no CORS grant. A proxied call is same-origin and never preflights, so a preflight is by definition not one.
2. **Signature verification, when a signature is present.** The digest is recomputed from the sorted non-signature parameters and compared with `timingSafeEqual`. A present-but-wrong signature is `401 Invalid proxy signature.`
3. **Shop resolution.** The shop comes from the query string, or from the JSON body on the older endpoints that only ever sent it there.
4. **Rate limiting**, keyed on route, shop and client IP together: 60 requests per minute by default, tighter on writes. A refusal is `429` carrying `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset`.
5. **Origin validation on writes.** Twenty-five of the endpoints check the `Origin` or `Referer` host against the shop's canonical domain plus the custom-domain allowlist the merchant set in settings. A mismatch is `403 Invalid origin.`
6. **Usage metering.** Every storefront route declares a module and an event type, so the call counts against the plan's allowance and the shop's own ceiling. Over the limit is `429` with `X-Usage-Limit-Exceeded`, `X-Usage-Current` and `X-Usage-Limit`.
7. **The handler runs**, and on the way out any wildcard `Access-Control-Allow-Origin` the handler set is stripped, security headers are added, and the rate-limit headers are attached to the successful response too.

Two more limits apply to the body rather than the request: a JSON payload above **32 KB** is refused with `Payload too large`, and list reads are capped at **100 rows** regardless of what a caller asks for.

## How a buyer-scoped endpoint knows who is asking

Some endpoints answer for one shopper rather than for the shop: a customer's own orders and addresses, their loyalty balance, their subscriptions, their saved items, the B2B pricing negotiated for their account.

For those, the shopper's identity comes from `logged_in_customer_id` — the parameter **Shopify itself appends and signs**. It is never taken from the request. A caller may still send a customer id of its own, and it is read for exactly one purpose: to be compared with the signed value. If the two disagree the request is refused with `403`. If there is no signed shopper at all, a buyer-scoped endpoint answers `401` rather than guessing.

That distinction is the whole point, and it is easy to miss: **the signature and the shopper are two different facts.** A valid signature proves a request arrived through your storefront. It says nothing about which shopper is browsing, so an endpoint that trusted a `customerId` parameter from the page would be trusting a value any visitor can edit in their browser's devtools — on a request that is otherwise perfectly signed.

Endpoints that serve a genuine anonymous visitor keep working without a signed shopper: storefront search, delivery-date selection, guest returns, publicly-visible B2B pricing, guest save-for-later, and the attribution writes behind cart and upsell reporting. They treat the visitor as anonymous rather than as whoever the request happens to name. Whether a given feature allows a guest is a property of that feature, not of the proxy.

Merchant-facing analytics are a separate plane again. Those endpoints authenticate a Shopify admin session and are not reachable from a storefront page at all, however the request is shaped.

## The base URL contract

The [app embed](./app-embed.md) sets one value that every block reads:

```js
window.gfConfig.appUrl = "/apps/" + "<the embed App proxy prefix setting>";
```

The `/apps/` part is fixed by the app's Shopify configuration; the setting supplies the second segment, and its default is `growthify`. So the embed setting must equal the **subpath** the app is configured with — not the literal `prefix`, which is always `apps`. If the two drift, every block builds a URL Shopify has no proxy for, and the whole storefront half of the app 404s at once.

A single source for that base is why there is one place to change it. Blocks never hardcode the path; the only fallback in the loader is `/apps/growthify`, which matches the shipped default.

## The loader's first call

Before any block fetches anything, the loader makes one request of its own:

```text
GET /apps/growthify/api/config?shop=your-store.myshopify.com
```

The response says which modules are enabled and carries their storefront settings, and the loader fetches a runtime only for the modules that came back enabled. If that call fails, the loader falls back to an empty module set: nothing loads, nothing throws, and no shopper sees an error. Quiet degradation is the intended behaviour on the storefront, which is also why a misconfigured proxy is invisible until you open the network tab.

## What the app proxy does not do

- **It does not authenticate the shopper.** A valid signature proves the request came through your storefront, not who is browsing. Shopify does append `logged_in_customer_id` for a signed-in customer, but the proxy itself does not act on it — a feature that must be safe per shopper needs its own check on top. Growthify's buyer-scoped endpoints make exactly that check; see [how a buyer-scoped endpoint knows who is asking](#how-a-buyer-scoped-endpoint-knows-who-is-asking) above.
- **It does not answer for a shop that has not installed the app.** The proxy exists because the installation created it, and every handler resolves the shop before reading. No shop record means an empty result, not somebody else's data.
- **It does not expose the backend host.** Storefront markup contains only the relative `/apps/...` path. The app's own origin never appears in the theme, which is part of why blocks keep working if that origin changes.
- **It is not a general-purpose API.** There is no bearer key, no CORS and no documented envelope here. To read your own store's data from your own systems, use the [Merchant API v1](../api/merchant-api-v1.md).
- **It does not reach the embedded admin.** Admin routes authenticate a Shopify session; a proxied storefront request has none, and the two planes share no auth.
- **It does not retry for you.** A `429` is a signal to back off, and the reset timestamp is in the response headers precisely so a caller does not have to guess.
- **It does not work against a placeholder backend.** In production the app refuses to boot against a placeholder or loopback application URL, so a proxy pointed at an unconfigured host fails loudly at startup rather than half-working.

## FAQ

### Why do storefront blocks not call the Growthify backend directly?

A direct call is cross-origin and carries no Shopify context. The proxy gives the same request a same-origin path on the shop domain and a signed query string the server can verify — so no CORS grant is needed, and the app host stays out of the theme.

### What is the difference between the prefix and the subpath?

The prefix is the first path segment and Shopify accepts only `a`, `apps`, `community` or `tools`. The subpath is the second segment and is yours to choose. Growthify uses `apps` and `growthify`.

### My storefront calls return 404 — what is wrong?

In order: the **Growthify** app embed is enabled; the embed's **App proxy prefix** setting matches the app's subpath; and an app proxy exists in the Partner Dashboard pointing at the app root.

### Does the proxy verify that a request really came from Shopify?

Shopify signs the request with HMAC-SHA256 over the sorted query parameters using the app secret. Growthify recomputes it and compares in constant time; a present-but-wrong signature is rejected with `401`.

### Does the proxy work for a shop that has not installed Growthify?

No. The shop is resolved from the request before anything is read, and an unknown shop gets an empty result.

### Are proxied requests rate-limited?

Yes — 60 per minute per shop, IP and route by default, tighter on writes, refused with `429` and the three `X-RateLimit-*` headers.

### Can I use the app proxy as a public API for my own scripts?

It is not built for that. Use the [Merchant API v1](../api/merchant-api-v1.md), which is read-only, keyed and documented for exactly that purpose.

## Related pages

- [App embed](./app-embed.md) — the block that defines the base URL this page depends on.
- [Storefront API](../api/storefront-api.md) — the 55 endpoints reachable through this path.
- [Theme blocks](./theme-blocks.md) — which blocks call the server, and which are pure Liquid.
- [Configuration](../getting-started/configuration.md) — where the prefix, environment variables and embed settings are set.
