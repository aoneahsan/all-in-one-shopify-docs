---
id: api
title: "The Growthify API: addresses, examples and every resource"
sidebar_label: The API
sidebar_position: 2
description: "Read and change one store's Growthify campaigns, offers, rules, reviews and reports over HTTPS with an access key: requests, answers, errors, pages and limits."
keywords: [growthify rest api, shopify app rest api, growthify openapi, api pagination cursor, api error codes, popups api, bundles api, reviews api]
last_update:
  date: 2026-11-21
  author: The Growthify team
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'What is the Growthify API base address?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1. Every resource sits under it, such as /popups or /bundles/{id}, and the OpenAPI document is at /openapi.json.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I page through a long list in the Growthify API?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Each list answers up to 50 rows (20 unless you set limit) and a meta.next_cursor. Pass it back as cursor to get the next page; it is null on the last page. A cursor lasts 15 minutes and only fits the same filters and sort.',
          },
        },
        {
          '@type': 'Question',
          name: 'What are the Growthify API rate limits?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Each key or assistant can make 120 requests a minute. The store also has a daily number from its plan, shared by every key and assistant: 5,000 on Free, 50,000 on Pro and Growth, 100,000 on Scale. It starts again at midnight UTC.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can the API send an email campaign?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Sending stays a button in Growthify. The API reads a campaign and its results, and edits or deletes a draft; a campaign that is scheduled, sending or sent cannot be changed from outside.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the API answer not_found for something I can see in Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The key reaches one store, and only what it was ticked for. A row of another store, a row the key cannot change in its current state, and a missing row all answer the same not_found, so the API never confirms that something exists elsewhere.',
          },
        },
      ],
    })}
  </script>
</head>

# The Growthify API

**The Growthify API reads and changes one store's Growthify data over HTTPS: its settings and modules, campaigns, bundles and offers, rules, review moderation and reports, plus shopper records read only.** You sign each request with an [access key](./access-keys.md); an [assistant](./assistants.md) uses the same addresses through its own connection.

Every address on this page comes from the same list Growthify uses for its OpenAPI document and its assistant tools, so the three never disagree. The machine copy is [`openapi.json`](https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/openapi.json) (OpenAPI 3.1) and [`openapi.md`](https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1/openapi.md); both answer without a key.

## Base address and signing {#signing-requests}

```text
https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1
```

The examples below use two shell variables:

```bash
export GROWTHIFY_API="https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1"
export GROWTHIFY_KEY="<your gfy_pat_ key from Other apps>"
```

Start with `/token`. It tells you what the key is and what it can do, which settles most "why can't I see it" questions before they start:

```bash
curl "$GROWTHIFY_API/token" -H "Authorization: Bearer $GROWTHIFY_KEY"
```

```json
{
  "data": {
    "kind": "pat",
    "user_id": "6f1c2a9e-3b7d-4e0a-9c55-2d8e41f7b310",
    "client_id": null,
    "scopes": ["campaigns:read", "offers:write", "reviews:write", "subscribers:read"]
  }
}
```

`kind` is `pat` for an access key and `oauth` for an assistant. A key is a server secret: keep it out of code a browser loads.

## What comes back {#what-comes-back}

One shape for a record, one for a list, one for an error.

```json
{ "data": { "id": "cm3qk2x7b0004l708h1z9e5ra", "name": "Winter list signup", "is_active": true } }
```

```json
{
  "data": [{ "id": "cm3qk2x7b0004l708h1z9e5ra", "name": "Winter list signup" }],
  "meta": { "next_cursor": "eyJyIjoicG9wdXBzIi4uLn0.Zk3n…", "limit": 20 }
}
```

```json
{
  "error": {
    "code": "scope_required",
    "message": "This credential needs the campaigns:write permission.",
    "details": { "scope": "campaigns:write" },
    "correlation_id": "req_9b3e51c0a2f47d18"
  }
}
```

Field names are snake_case. Times are ISO 8601 in UTC. When you send a time with an offset, such as `2026-12-01T09:00:00+05:00`, Growthify turns it into UTC before saving it. Write bodies are `application/json`, a JSON object of at most 64 KB. Every answer carries `cache-control: no-store`.

## Errors {#errors}

| Code | Status | What it means | What to do |
|---|---|---|---|
| `invalid_request` | 400 | A field, filter, limit or cursor is not valid; `details.issues` names each field | Fix the request |
| `invalid_token` | 401 | The key is missing, mistyped, expired, removed, or not tied to a store | Check the key in Other apps |
| `scope_required` | 403 | The key wasn't ticked for this; `details.scope` names what it needs | Make a key with that reach |
| `not_found` | 404 | Nothing at this address for this key | See below |
| `method_not_allowed` | 405 | This address doesn't take that method, such as `POST /reviews` | Check the resource table |
| `conflict` | 409 | The change breaks a store rule, or it already exists; the message says which | Read the message |
| `payload_too_large` | 413 | The body is over 64 KB | Send less |
| `rate_limited` | 429 | Too many requests this minute, or the store's day is used up | Wait for `retry-after` |
| `internal` | 500 | Something went wrong on our side | Retry later; quote `correlation_id` to support |

**`not_found` is deliberate.** A row in another store, a row the key can't change in its current state (a campaign that is no longer a draft, a built-in report you try to delete), and a row that doesn't exist all answer the same. The API never confirms that something exists where your key can't reach.

## Pages of results {#pages-of-results}

Lists come in pages, never all at once.

- `limit`: 1 to 50. Without it, 20.
- `sort`: where a resource allows it, such as `-created_at` (newest first). The default is the first sort the resource names.
- `cursor`: the last answer's `meta.next_cursor`, passed back as it came. It is `null` on the last page; stop there.

A cursor lasts 15 minutes and fits only the same filters and sort. A cursor that is stale or was made for another query answers `invalid_request`: start again without it.

```bash
curl "$GROWTHIFY_API/email_subscribers?limit=50" -H "Authorization: Bearer $GROWTHIFY_KEY"
curl "$GROWTHIFY_API/email_subscribers?limit=50&cursor=eyJyIjoiZW1haWxfc3Vic2NyaWJlcnMi…" \
  -H "Authorization: Bearer $GROWTHIFY_KEY"
```

Filters are query parameters named after the field and the test, such as `is_active.eq=true` or `status.eq=pending`. Each resource below lists the filters it takes; others are refused rather than ignored.

## Rate limits {#rate-limits}

Two limits apply, and the tighter one answers first.

- **120 requests a minute per key or assistant.** It stops a runaway loop. Answers carry `ratelimit-limit`, `ratelimit-remaining` and `ratelimit-reset` (seconds until the window starts again).
- **Requests a day per store**, shared by every key and assistant on it: 5,000 on Free, 50,000 on Pro and Growth, 100,000 on Scale. It starts again at midnight UTC. Past it, the answer is `rate_limited` with "This store has used its requests for today", and nothing in the store is touched.

A `rate_limited` answer carries `retry-after` in seconds.

## Examples {#examples}

Turn off a popup:

```bash
curl -X PATCH "$GROWTHIFY_API/popups/cm3qk2x7b0004l708h1z9e5ra" \
  -H "Authorization: Bearer $GROWTHIFY_KEY" \
  -H "Content-Type: application/json" \
  -d '{"is_active": false}'
```

List the reviews waiting for you, newest first:

```bash
curl "$GROWTHIFY_API/reviews?status.eq=pending&sort=-created_at" \
  -H "Authorization: Bearer $GROWTHIFY_KEY"
```

Approve a review, feature it and reply in one change:

```bash
curl -X PATCH "$GROWTHIFY_API/reviews/cm3r0b9tz0011mk08q2v4c7dn" \
  -H "Authorization: Bearer $GROWTHIFY_KEY" \
  -H "Content-Type: application/json" \
  -d '{"status": "approved", "featured": true, "reply_content": "Thank you, Priya. The oat roast is back next week."}'
```

Make a bundle that runs through December:

```bash
curl -X POST "$GROWTHIFY_API/bundles" \
  -H "Authorization: Bearer $GROWTHIFY_KEY" \
  -H "Content-Type: application/json" \
  -d '{
    "title": "Brew kit",
    "products": "[{\"productId\":\"gid://shopify/Product/8123456789012\",\"quantity\":1},{\"productId\":\"gid://shopify/Product/8123456789013\",\"quantity\":1}]",
    "discount_type": "percentage",
    "discount_value": 15,
    "starts_at": "2026-12-01T00:00:00Z",
    "ends_at": "2026-12-31T23:59:00Z"
  }'
```

`products` is JSON text, the same list the bundle editor saves: one entry per product with its `productId`, an optional `variantId`, and `quantity`. Read a bundle the editor made (`GET /bundles`) and copy its shape. A new record answers `201` with the whole row. Remove it again:

```bash
curl -X DELETE "$GROWTHIFY_API/bundles/cm3s7d2kq0002jp08x1y5f9wb" \
  -H "Authorization: Bearer $GROWTHIFY_KEY"
```

A key with `offers:delete` gets `204` and the bundle is gone. An assistant gets `202` and a link instead; see [Removing](#removing).

## Removing {#removing}

A key ticked for Delete removes a row in one call and gets `204 No Content`. An assistant never does: its `DELETE` answers `202` with

```json
{
  "data": {
    "status": "pending_confirmation",
    "confirm_url": "https://growthify.aoneahsan.com/dashboard/other-apps/confirm/2b0e6d4a-91c3-4f8e-a7d2-5c1b9e0f3a66",
    "expires_at": "2026-11-21T10:24:31.000Z"
  }
}
```

and nothing goes until you open the link and choose **Delete it** within 10 minutes.

## Your store data {#your-store-data}

Each resource is `/<name>` for a list and `/<name>/{id}` for one row. Methods: `GET` lists and reads, `POST` makes, `PATCH` changes some fields, `DELETE` removes. "Changeable" lists the fields `POST` and `PATCH` take; everything else in a row is read only.

### Store settings {#store-settings}

| | |
|---|---|
| Address | `/store_settings` · `GET`, `PATCH` |
| Reach | `settings:read`, `settings:write` |
| Changeable | `email_notifications`, `low_stock_alerts`, `weekly_report`, `primary_color` (such as `#3b82f6`), `show_powered_by` |
| Also in a row | `id`, `updated_at` |

### Modules {#modules}

| | |
|---|---|
| Address | `/modules` · `GET`, `PATCH` · filter `module_id.eq` |
| Reach | `modules:read`, `modules:write` |
| Changeable | `is_active` |
| Also in a row | `id`, `module_id`, `version`, `updated_at` |

Switching a module on doesn't buy it: a paid module still checks the store's plan where it runs. What the plan includes is `/module_plan` (`GET`, `modules:read`): `module_id`, `is_enabled`, `max_usage`, `reset_period`. It is read only because the plan is a Shopify billing record.

### Campaigns {#campaigns}

All five take `campaigns:read` and `campaigns:write`, and `campaigns:delete` to remove.

| Resource | Methods | Filters, sort | Changeable |
|---|---|---|---|
| `/popups` | `GET`, `PATCH`, `DELETE` | `is_active.eq` · `-created_at` | `name`, `type` (`modal`, `slide`, `bar`), `position`, `trigger` (`exit`, `time`, `scroll`), `trigger_value` (seconds for time, percent for scroll), `frequency` (`once`, `session`, `always`), `frequency_days`, `is_active`, `priority`, `start_date`, `end_date` |
| `/email_campaigns` | `GET`, `PATCH`, `DELETE` | `-created_at` | Drafts only: `name`, `subject`, `preheader`, `html_content`, `plain_content` |
| `/sms_campaigns` | `GET`, `PATCH`, `DELETE` | `-created_at` | Drafts only: `name`, `message`, `link_url` |
| `/countdowns` | `GET`, `PATCH`, `DELETE` | `is_active.eq` · `-created_at` | `name`, `title`, `subtitle`, `expired_message`, `end_date`, `priority`, `is_active`, `starts_at`, `ends_at` |
| `/announcement_bars` | `GET`, `POST`, `PATCH`, `DELETE` | `is_active.eq` · `-created_at` | `message`, `link_text`, `link_url`, `position` (`top`, `bottom`), `is_sticky`, `is_dismissible`, `starts_at`, `ends_at`, `priority`, `is_active` |

Email and SMS campaigns also carry `status` (`draft`, `scheduled`, `sending`, `sent`), `scheduled_at`, `sent_at`, `total_recipients`, `sent_count`, the open, click, delivered, unsubscribe and bounce counts the channel has, and `revenue`, all read only. **Sending stays a button in Growthify:** only a draft can be edited or removed from outside, and the sender address and the audience never go out. A popup's content, style and targeting, its coupon code, and a countdown's or bar's colours and page targeting stay in the editors that make them.

### Bundles and offers {#bundles-and-offers}

All four take `offers:read`, `offers:write` and `offers:delete`, with every method: `GET`, `POST`, `PATCH`, `DELETE`. Filter `is_active.eq`, sort `-created_at`. A discount is `discount_type` `percentage` or `fixed` with `discount_value` (15 for 15% off, or 10 for 10.00 off).

| Resource | Changeable |
|---|---|
| `/bundles` | `title`, `description`, `products` (JSON list as the editor saves it), `discount_type`, `discount_value`, `is_active`, `priority`, `starts_at`, `ends_at` |
| `/quantity_breaks` | `product_id` or `collection_id` (Shopify gid), `min_quantity`, `max_quantity`, `discount_type`, `discount_value`, `label`, `is_best`, `is_active`, `priority` |
| `/bogo_rules` | `name`, `buy_product_ids`, `buy_quantity`, `get_product_ids`, `get_quantity` (JSON lists of product ids), `discount_type`, `discount_value` (100 for free, 50 for half price), `max_uses`, `is_active`, `starts_at`, `ends_at`; `used_count` is read only |
| `/cart_upsells` | `product_id`, `variant_id` (Shopify gids), `title`, `image_url`, `price` (cents, as shown in the cart), `trigger_type`, `trigger_ids`, `is_active`, `priority` |

A change here is the change your storefront reads.

### Rules {#rules}

`rules:read`, `rules:write`, `rules:delete`. Sort `-created_at`.

| Resource | Methods | Changeable |
|---|---|---|
| `/discount_stacking_rules` | `GET`, `POST`, `PATCH`, `DELETE` · filter `is_active.eq` | `name`, `description`, `source_type`, `source_id`, `stacking_mode`, `priority`, `can_stack_with`, `cannot_stack_with` (JSON lists), `max_stack_count`, `max_total_discount`, `max_total_discount_type`, `is_active` |
| `/price_markup_rules` | `GET`, `POST`, `PATCH`, `DELETE` | `name`, `markup_type`, `markup_value`, `min_price` (cents), `round_to`, `is_active`, `priority` |
| `/sync_rules` | `GET`, `PATCH`, `DELETE` | `name`, `is_active`, `priority`; `rule_type`, `condition` and `action` are read only |

A stacking rule's `conditions`, a markup's formula and its supplier link stay in Growthify.

### Review moderation {#review-moderation}

| | |
|---|---|
| Address | `/reviews` · `GET`, `PATCH` · filters `status.eq`, `product_id.eq` · sort `-created_at` |
| Reach | `reviews:read`, `reviews:write` |
| Changeable | `status` (`pending`, `approved`, `rejected`), `featured`, `reply_content` (your public reply) |
| Read only | `id`, `product_id`, `variant_id`, `rating` (1 to 5), `title`, `content`, `verified`, `reply_at`, `moderated_at`, `helpful_count`, `created_at`, `updated_at` |

The review is the shopper's words, so it can't be edited or removed from outside. The reviewer's name is under [Review authors](#shopper-records); their email and order id never go out.

### Reports {#reports}

`reports:read`, `reports:write`, `reports:delete`. Sort `-created_at`.

| Resource | Methods | Changeable |
|---|---|---|
| `/report_definitions` | `GET`, `PATCH`, `DELETE` | `name`, `description`, `is_active`; `type`, `config` and `is_system` are read only, and a built-in report can't be removed |
| `/report_schedules` | `GET`, `PATCH`, `DELETE` · filter `report_id.eq` | `day_of_week` (0 to 6), `day_of_month` (1 to 31), `hour` (0 to 23), `timezone`, `is_active`; `frequency`, `format`, `last_run_at`, `next_run_at` are read only |
| `/report_runs` | `GET` · filter `report_id.eq` | Read only: `report_id`, `status`, `row_count`, `started_at`, `completed_at` |

Where a finished report is emailed and the file itself stay in Growthify: a file can hold shopper rows beyond the lists below.

## Shopper records {#shopper-records}

Read only, whatever a key says: `GET` only, one `:read` tick each, and only these fields.

| Resource | Reach | Fields | Filters, sort |
|---|---|---|---|
| `/email_subscribers` | `subscribers:read` | `email`, `first_name`, `last_name`, `status`, `source`, `subscribed_at`, `unsubscribed_at`, `tags` | `-subscribed_at` |
| `/sms_subscribers` | `subscribers:read` | `phone_number`, `country_code`, `first_name`, `last_name`, `status`, `source`, `subscribed_at`, `unsubscribed_at`, `tags` | `-subscribed_at` |
| `/chat_conversations` | `chat:read` | `visitor_name`, `status`, `rating`, `created_at`, `closed_at`, `updated_at` | `status.eq` · `-updated_at` |
| `/chat_messages` | `chat:read` | `conversation_id`, `role`, `body`, `created_at` | `conversation_id.eq` · `created_at` |
| `/loyalty_members` | `loyalty:read` | `email`, `points`, `lifetime_points`, `tier`, `joined_at` | `-joined_at` |
| `/cod_orders` | `cod:read` | `order_name`, `order_total` (cents), `verification_status`, `verified_at`, `cancelled_at`, `created_at` | `verification_status.eq` · `-created_at` |
| `/saved_addresses` | `addresses:read` | `first_name`, `last_name`, `company`, `address1`, `address2`, `city`, `province`, `country`, `zip` | |
| `/wishlist_products` | `wishlists:read` | `product_id`, `wishlist_count`, `last_saved_at` | `-wishlist_count` |
| `/review_authors` | `authors:read` | `author_name`, `verified`; the id is the review's id | |

Every row also has its `id`. What never goes out: the messages you sent a subscriber, a chat visitor's email or browser id, a loyalty member's order history, a COD customer's email or phone, a saved address's phone, who saved a wishlist product, and a reviewer's email or order id.

## What the API never serves {#never-served}

Shopify sessions and tokens, billing and plan records, a module's own configuration (it can hold provider passwords and keys), provider keys, AI usage, GDPR logs, your sign-in and two-step codes, keys, webhook secrets and assistant grants, and anything of another store. There is no address for them to be asked for.

## FAQ {#faq}

### What is the base address? {#faq-base}

`https://mldbdtltrxojmqzglupg.supabase.co/functions/v1/api/v1`.

### How do I page through a long list? {#faq-pages}

Pass `meta.next_cursor` back as `cursor` until it is `null`. Up to 50 rows a page.

### What are the rate limits? {#faq-limits}

120 a minute per key or assistant, and the store's daily number from its plan.

### Can the API send a campaign? {#faq-send}

No. Sending stays a button in Growthify; the API edits and removes drafts only.

### Why `not_found` for something I can see in Growthify? {#faq-not-found}

The key reaches one store and only what it was ticked for, and some rows can't be changed in their current state. Check `/token` first.

### Is there a browser or JavaScript SDK? {#faq-sdk}

No. The API is plain HTTPS and JSON; `openapi.json` generates a client in most languages. Don't put a key in code a browser loads.

## Related pages {#related}

[Access keys](./access-keys.md) · [Assistants](./assistants.md) · [Webhooks](./webhooks.md) · [Calendar feeds](./calendar-feeds.md) · [Overview](./index.md)
