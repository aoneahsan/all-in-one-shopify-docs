---
id: merchant-api-v1
title: Merchant API v1
sidebar_label: Merchant API v1
sidebar_position: 3
description: Growthify Merchant API v1 is a read-only REST interface. Authenticate with a saio_ bearer key, read your store, usage, reviews and wishlist demand.
keywords: [growthify merchant api, shopify app rest api, bearer api key, read only api, cursor pagination, rate limit headers, api error codes]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Can the Merchant API write data back to my store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Version 1 is read-only. Every endpoint answers GET only, and any other method returns 405 with an invalid_payload error. Write scopes recorded on a key are stored but not honoured by any v1 route.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do I create a Growthify API key?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'In the Growthify account dashboard under API Keys, or in the embedded Shopify admin under Settings. The plaintext key is shown exactly once, at creation. Growthify stores only a SHA-256 hash of it, so a lost key is replaced rather than recovered.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the API return 404 instead of 403 for another store?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A 403 would confirm that the resource exists, which turns an id-guessing loop into an enumeration oracle. Anything outside the key own store is reported as not_found, so the API never reveals that something exists elsewhere.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the Merchant API rate limit?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sixty requests per minute per key. Every response carries X-RateLimit-Limit, X-RateLimit-Remaining and X-RateLimit-Reset, so a client can pace itself without first provoking a 429.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the reviews endpoint expose the reviewer email address?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The reviews response is built from an explicit column list that omits the author email and the order id. Wishlist data is aggregated per product and never names a customer.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does pagination work in the Merchant API?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cursor-based, not page numbers. Send limit between 1 and 50 (default 20), then pass the previous response meta.nextCursor value as cursor. A null nextCursor means the list is exhausted.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there a public sandbox for the Merchant API?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The API answers only once your own Growthify backend is reachable and the app is installed on your store. There is no shared demo host and no test key that returns fixture data.',
          },
        },
      ],
    })}
  </script>
</head>

# Merchant API v1

**The Growthify Merchant API is a read-only HTTP interface that lets a merchant's own systems read what Growthify holds for their store** — the store record and its modules, the metered counters for the current billing period, published review content, and wishlist demand aggregated per product. It is a server-to-server plane, authenticated by a bearer key scoped to exactly one store, and it returns JSON in the same envelope on every route.

It exists because a merchant's data should not be trapped behind an embedded admin. A warehouse dashboard that wants save counts, a business-intelligence job that wants last month's review volume, a nightly script that checks how close a store is to its plan ceiling — none of those should have to scrape a screen or hold Shopify credentials.

## Who this page is for

- **Developers integrating Growthify with another system** — a data warehouse, an internal dashboard, a reporting job, a customer-service tool.
- **Agencies** running several client stores who want one script that reads plan state and usage across all of them, one key per store.
- **Merchants evaluating data portability** before installing, who want to see exactly which fields leave the app and which deliberately do not.

If you are looking for the endpoints that storefront theme blocks call, those are a different plane entirely — see the [Storefront API](./storefront-api.md), which is signed by Shopify's app proxy rather than by a bearer key.

## Authentication

Send the key as a bearer token:

```bash
curl https://<your-growthify-backend>/api/v1/me \
  -H "Authorization: Bearer saio_xxxxxxxxxxxxxxxxxxxxxxxx"
```

Keys carry the `saio_` prefix, which names the plane: a merchant **data** key, read-only, scoped to one store. Create one in the Growthify account dashboard under **API Keys**, or in the embedded Shopify admin under **Settings**.

Three properties of the key matter more than the mechanics:

1. **The plaintext is shown exactly once, at creation.** Growthify stores only `sha256(key)`. A key you did not record is replaced, never recovered — there is no reveal endpoint and no support route that can print it back to you.
2. **The key *is* the scope.** No endpoint takes a shop parameter. There is no way to point a key at a store it was not issued for, which is why the routes need no tenancy argument and cannot be tricked by one.
3. **It is a server secret, so the API grants no CORS.** Responses carry no `Access-Control-Allow-Origin`. A browser holding a `saio_` key is already the problem; the API declines to make it convenient.

A key can be revoked at any time from the same screen that created it, and a key may carry an expiry. Both a revoked key and an expired key fail the same way — `key_revoked`, HTTP 403 — because in both cases you hold the key and telling you plainly is actionable.

## The response envelope

Every route answers in one of three shapes. A client that handles these three handles the whole API.

**Success, single object:**

```json
{
  "success": true,
  "data": { "shopDomain": "your-store.myshopify.com", "plan": "pro" }
}
```

**Success, list:**

```json
{
  "success": true,
  "data": [],
  "meta": { "nextCursor": "eyJjcmVhdGVkQXQiOiIyMDI2LTA5LTEwVDExOjIyOjMzLjAwMFoiLCJpZCI6ImNrdjEifQ", "limit": 20 }
}
```

**Failure:**

```json
{
  "success": false,
  "error": { "code": "plan_required", "message": "This endpoint needs a higher plan." }
}
```

`success` is always present and always a boolean, so a client never has to infer an outcome from the HTTP status alone.

## Error codes

| Code | HTTP | What it means |
| --- | --- | --- |
| `invalid_payload` | 400 | A query parameter failed validation, a cursor was unreadable, or a non-GET method was used |
| `unauthorized` | 401 | No `Authorization` header, or one that is not a bearer token |
| `invalid_key` | 401 | A key that Growthify did not issue, or one with the wrong prefix |
| `forbidden` | 403 | The key could reach this resource but lacks the permission |
| `key_revoked` | 403 | A key that was issued but has since been revoked or has expired |
| `plan_required` | 403 | The store's plan does not include this data |
| `not_found` | 404 | The resource does not exist — **or is outside this key's own store** |
| `rate_limited` | 429 | The per-key budget for this minute is spent |
| `unavailable` | 503 | The backend could not serve the request |

The `not_found` row is deliberate and worth reading twice. A resource belonging to a different store is reported as missing, not as forbidden. A 403 there would confirm the thing exists, which converts an id-guessing loop into an enumeration oracle. The API never confirms that something exists elsewhere.

## Rate limiting

**Sixty requests per minute, per key.** The budget is keyed on the key rather than the caller's IP address, because a merchant's integration may run from anywhere and an IP bucket would either punish a shared host or be evaded by moving.

Every response — success and failure alike — carries the budget:

| Header | Meaning |
| --- | --- |
| `X-RateLimit-Limit` | The ceiling, currently `60` |
| `X-RateLimit-Remaining` | Requests left in the current window |
| `X-RateLimit-Reset` | Unix seconds at which the window resets |

The ceiling is included as well as the remainder on purpose: a client that only ever sees `Remaining` has to infer its budget from the first 429, which is exactly the request it wanted to avoid.

## Pagination

List endpoints are **cursor-based**, never page numbers.

- `limit` — between 1 and 50. Anything absent, unparseable, zero or negative becomes the default of **20**; anything above 50 is clamped to 50 rather than rejected.
- `cursor` — the previous response's `meta.nextCursor`, passed back verbatim.
- `meta.nextCursor` is `null` when the list is exhausted. That is the loop's stop condition; do not count pages.

Cursors are keyset, not offset. On reviews the cursor encodes `(createdAt, id)` and the sort is `createdAt` descending with `id` breaking ties in the same direction — two reviews written in the same millisecond would straddle an offset page boundary and one would be silently skipped. Treat the cursor as opaque: it is a base64 blob whose internals are not part of the contract.

## Endpoints

### GET /api/v1/me

What the presented key is. Make this your first call — it removes a whole class of support question, because a caller debugging a 404 can confirm which store the key addresses before assuming data is gone.

```bash
curl https://<your-growthify-backend>/api/v1/me \
  -H "Authorization: Bearer saio_xxxxxxxxxxxxxxxxxxxxxxxx"
```

```json
{
  "success": true,
  "data": {
    "keyId": "ckv1q9x0a0001",
    "name": "Warehouse sync",
    "keyPrefix": "saio_a1b2c3",
    "scopes": ["read"],
    "shopDomain": "your-store.myshopify.com",
    "plan": "pro",
    "createdAt": "2026-08-14T09:02:11.000Z",
    "lastUsedAt": "2026-09-12T18:41:07.000Z",
    "expiresAt": null
  }
}
```

`keyPrefix` is a short identifying fragment, not the key — it exists so you can tell two keys apart in a log without printing a secret. `expiresAt` is `null` for a key with no expiry.

### GET /api/v1/store

The shop behind the key, its plan, and the status of every module.

```bash
curl https://<your-growthify-backend>/api/v1/store \
  -H "Authorization: Bearer saio_xxxxxxxxxxxxxxxxxxxxxxxx"
```

```json
{
  "success": true,
  "data": {
    "shopDomain": "your-store.myshopify.com",
    "shopName": "Your Store",
    "plan": "pro",
    "planName": "Pro",
    "isActive": true,
    "installedAt": "2026-07-02T14:20:00.000Z",
    "modules": [
      {
        "moduleId": "popup",
        "name": "Popup Builder",
        "description": "Create customizable popups for email capture, promotions, and announcements",
        "isEnabled": true,
        "hasAccess": true,
        "requiredPlan": "free"
      },
      {
        "moduleId": "reports",
        "name": "Advanced Reports",
        "description": "Detailed analytics and custom reports",
        "isEnabled": false,
        "hasAccess": false,
        "requiredPlan": "growth"
      }
    ]
  }
}
```

`isEnabled` and `hasAccess` are two different facts and are both worth reading. `hasAccess` is whether the store's plan includes the module; `isEnabled` is whether the merchant has switched it on. A module can be available and off, which is an ordinary state — not a fault.

### GET /api/v1/usage

The metered counters for the current billing period, summed by the database in one grouped query.

```bash
curl https://<your-growthify-backend>/api/v1/usage \
  -H "Authorization: Bearer saio_xxxxxxxxxxxxxxxxxxxxxxxx"
```

```json
{
  "success": true,
  "data": [
    { "moduleId": "popup", "eventType": "view", "current": 41200, "limit": 100000, "percentage": 41.2, "status": "ok" },
    { "moduleId": "reviews", "eventType": "submit", "current": 940, "limit": 1000, "percentage": 94, "status": "warning" },
    { "moduleId": "ai", "eventType": "call", "current": 0, "limit": 0, "percentage": 100, "status": "exceeded" },
    { "moduleId": "wishlist", "eventType": "add", "current": 3180, "limit": -1, "percentage": 0, "status": "ok" }
  ]
}
```

Three conventions govern this response:

- **A `limit` of `-1` means unlimited**, and such a line always reports `percentage: 0` and `status: "ok"`. Never compare against `-1` as though it were a number of things.
- **A `limit` of `0` means the feature is off for this plan.** It reports `percentage: 100` and `status: "exceeded"`, because nothing is within a limit of zero.
- `status` is `warning` from 80 % of the limit, and `exceeded` once `current` reaches it.

Counters appear only for module and event pairs the store's plan actually meters, so the array length varies by plan. Do not assume a fixed set of rows.

### GET /api/v1/reviews

Published review content for the store.

```bash
curl "https://<your-growthify-backend>/api/v1/reviews?status=approved&limit=2" \
  -H "Authorization: Bearer saio_xxxxxxxxxxxxxxxxxxxxxxxx"
```

| Parameter | Values | Default |
| --- | --- | --- |
| `status` | `pending`, `approved`, `rejected` | all statuses |
| `limit` | 1–50 | 20 |
| `cursor` | a previous `meta.nextCursor` | none |

```json
{
  "success": true,
  "data": [
    {
      "id": "ckrv0001",
      "productId": "gid://shopify/Product/1234567890",
      "variantId": null,
      "rating": 5,
      "title": "Exactly as described",
      "content": "Arrived in three days and the fit is right.",
      "authorName": "Dana R.",
      "verified": true,
      "status": "approved",
      "featured": false,
      "helpfulCount": 4,
      "replyContent": "Thanks Dana — glad it worked out.",
      "replyAt": "2026-09-02T08:15:00.000Z",
      "createdAt": "2026-09-01T19:44:02.000Z",
      "updatedAt": "2026-09-02T08:15:00.000Z"
    }
  ],
  "meta": { "nextCursor": "eyJjcmVhdGVkQXQiOiIyMDI2LTA5LTAxVDE5OjQ0OjAyLjAwMFoiLCJpZCI6ImNrcnYwMDAxIn0", "limit": 2 }
}
```

An unknown `status` value is a `400 invalid_payload`, not a silently empty list.

### GET /api/v1/wishlist

Wishlist demand, aggregated per product.

```bash
curl "https://<your-growthify-backend>/api/v1/wishlist?limit=3" \
  -H "Authorization: Bearer saio_xxxxxxxxxxxxxxxxxxxxxxxx"
```

```json
{
  "success": true,
  "data": [
    { "productId": "gid://shopify/Product/1234567890", "saves": 218, "lastAddedAt": "2026-09-12T06:11:40.000Z" },
    { "productId": "gid://shopify/Product/1234567891", "saves": 97, "lastAddedAt": "2026-09-11T22:03:09.000Z" }
  ],
  "meta": { "nextCursor": "gid://shopify/Product/1234567891", "limit": 3 }
}
```

Here the cursor is the `productId` itself, because the grouping key is unique per response row and already totally ordered. Rows are sorted by `productId` ascending.

## Privacy: what this API deliberately will not return

This is the section to read before you promise a stakeholder a field.

- **Reviews never include the reviewer's email address or the order id.** Both exist on the underlying record — the email for follow-up, the order id to verify a purchase — and neither is public review content. The response is assembled from an explicit column list rather than a whole row, so a column added later cannot start shipping on its own.
- **Wishlist data is aggregated per product and never per customer.** "Which shoppers saved this product" is buyer data a third-party integration has no claim on. The grouping happens in the database, so customer identifiers are never put on the wire on the way to a count.
- **No endpoint returns another store's data**, and the API does not confirm that another store's data exists.

## Limits — what v1 does not do

Stated plainly, so nothing here is a surprise in week three:

- **It is read-only.** Every route answers `GET`. `POST`, `PATCH`, `PUT` and `DELETE` return `405` with an `invalid_payload` error. Write scopes stored on a key are **not honoured** by any v1 route.
- **It is not a webhook feed.** There is no push, no subscription and no streaming; you poll, within the rate limit. For Shopify-driven events use the [webhooks](./webhooks.md) Growthify already consumes.
- **There are five endpoints, not a mirror of the admin.** Orders, popups, bundles, page-builder content and the feature screens are not exposed in v1.
- **There is no CORS grant**, so it cannot be called from browser JavaScript. That is a design decision, not an omission.
- **There is no public sandbox.** The API answers only once your own Growthify backend is reachable and the app is installed on your store; there is no shared demo host and no key that returns fixture data.
- **There is no bulk export endpoint.** Large reads are paginated at 50 rows maximum, against a 60-per-minute budget.

## Versioning and deprecation

The version lives in the path (`/api/v1/`). Within v1, changes are **additive**: new endpoints and new fields on existing responses may appear at any time, so parse defensively and ignore fields you do not recognise.

A change that removes a field, renames one, or alters the meaning of an existing value ships as `/api/v2/` rather than mutating v1 under you. If v1 is ever retired, the deprecation is announced on this page with a stated window, and `v1` keeps answering for that window. Nothing is removed silently.

## FAQ

### Can the Merchant API write data back to my store?

No. Version 1 is read-only. Every endpoint answers `GET` only, and any other method returns `405` with an `invalid_payload` error. Write scopes recorded on a key are stored but not honoured by any v1 route, so granting one changes nothing today.

### Where do I create a Growthify API key?

In the Growthify account dashboard under **API Keys**, or in the embedded Shopify admin under **Settings**. The plaintext key is shown exactly once, at creation. Growthify stores only a SHA-256 hash of it, so a lost key is replaced rather than recovered.

### Why does the API return 404 instead of 403 for another store?

Because a 403 would confirm that the resource exists. Anything outside the key's own store is reported as `not_found`, so an id-guessing loop learns nothing from the difference between a real id elsewhere and an invented one.

### What is the Merchant API rate limit?

Sixty requests per minute per key. Every response carries `X-RateLimit-Limit`, `X-RateLimit-Remaining` and `X-RateLimit-Reset`, so a client can pace itself without first provoking a 429.

### Does the reviews endpoint expose the reviewer's email address?

No. The reviews response is built from an explicit column list that omits the author email and the order id. Wishlist data is aggregated per product and never names a customer.

### How does pagination work?

Cursor-based. Send `limit` between 1 and 50 (default 20), then pass the previous response's `meta.nextCursor` back as `cursor`. A `null` `nextCursor` means the list is exhausted. Cursors are opaque; do not construct one.

### What happens if I lose a key?

Revoke it and mint a new one. There is no recovery path, by design — Growthify never held the plaintext after creation. Revocation takes effect immediately and returns `key_revoked` (403) to anything still presenting the old key.

### Is there a public sandbox I can test against?

No. The API answers only once your own Growthify backend is reachable and the app is installed on your store. Test against your own store with a key you minted yourself.

## Related pages

- [Storefront API](./storefront-api.md) — the app-proxy plane that theme blocks call, signed by Shopify rather than by a bearer key.
- [Webhooks](./webhooks.md) — the Shopify events Growthify consumes, including the GDPR compliance topics.
- [Entitlements](../admin/entitlements.md) — how `plan_required` is decided, and what `hasAccess` reflects.
- [Billing plans](../admin/billing-plans.md) — the tiers behind the `plan` field and the limits `usage` measures against.
