---
id: webhooks
title: "Growthify Shopify webhooks — GDPR and lifecycle topics"
sidebar_label: Webhooks
sidebar_position: 2
description: "The ten Shopify webhook topics Growthify subscribes to, what each handler writes, how GDPR erasure is logged, and why a failed erasure is retried."
keywords: [shopify webhooks, gdpr compliance webhooks, customers redact, shop redact, app uninstalled, app subscriptions update, hmac verification]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which Shopify webhooks does Growthify subscribe to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Ten topics: the three mandatory GDPR compliance topics, plus app/uninstalled, app_subscriptions/update, orders/create, orders/fulfilled, products/create, products/update and inventory_levels/update.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to my data when I uninstall Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'app/uninstalled marks the shop inactive immediately and deletes its sessions. Shopify then sends shop/redact about 48 hours later, and that handler deletes the shop record and every row that hangs off it.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is a customer data-deletion request handled?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'customers/redact deletes that customer stored rows within that shop and writes a log entry recording how many records were affected. The log distinguishes a customer who had no rows from a request that was never processed.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are webhook requests verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Every request is HMAC-verified by the Shopify Remix adapter before a handler runs, and each event is recorded with its topic, shop, payload and processed flag.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if a GDPR webhook fails?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The handler re-raises the error so Shopify retries the delivery. Acknowledging an erasure or an export that did not actually happen is the failure mode these handlers are written to avoid.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Growthify send webhooks to my own endpoint?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Webhooks here are inbound only, from Shopify to the app. There is no outbound webhook subscription for merchants, and Merchant API v1 is a pull interface rather than a push one.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why is the inventory topic named differently from its URL?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Shopify topic is inventory_levels/update while the receiving route is /webhooks/inventory/update. The topic name is Shopify and the path is ours, and they do not have to match.',
          },
        },
      ],
    })}
  </script>
</head>

# Webhooks

**A webhook here is a request Shopify sends to Growthify when something changes in a merchant's store — an uninstall, a plan change, a new order, or a legally mandated data request — and every one is HMAC-verified before any handler touches it.** Growthify subscribes to **ten topics**: the three Shopify makes mandatory for GDPR, and seven lifecycle topics it needs to keep its own state true.

## Who this page is for

- **Merchants** who want to know what happens at uninstall, and when.
- **Compliance reviewers** checking how an erasure request is executed and evidenced.
- **Developers** mapping a Shopify event to the state it changes in the app.

## GDPR compliance webhooks

These three are not optional for any Shopify app, and their URLs are configured in the Partner Dashboard's compliance section rather than in the subscription list.

| Topic | What the handler does |
| --- | --- |
| `customers/data_request` | Collects everything stored for that customer in that shop, writes it to a request log with an export payload and a timestamp, and records how many rows were found. |
| `customers/redact` | Deletes that customer's stored rows within that shop, and records how many were affected. |
| `shop/redact` | Deletes the shop record and everything that hangs off it. Shopify sends this roughly 48 hours after an uninstall. |

Each writes a **GDPR request log** row: the topic, the shop, the customer id, a **hashed** customer email, a digest of the payload rather than the payload itself, the outcome and the number of records affected.

The outcome field records what actually happened, and the vocabulary is deliberately unambiguous: `exported` or `exported_empty`, `redacted` or `redacted_none`, `deleted` or `nothing_to_delete`. `redacted_none` means the app looked and this customer had no rows — which is a different fact from not having looked, and the distinction is the entire point of keeping the log.

### Erasure is retried rather than assumed

All three GDPR handlers **re-raise** on failure, so Shopify retries the delivery. That is a deliberate choice with a history behind it: an earlier version of this app acknowledged a redaction request while deleting nothing, and recorded a fixed "no PII stored" outcome that the schema contradicted. Both the behaviour and the claim were wrong, and both had been shown to merchants. Handlers now fail loudly instead of reporting success they cannot back up.

### What `shop/redact` actually deletes

It deletes the `Shop` row and lets the schema's cascade relations remove everything keyed to it, plus the two tables keyed by shop domain rather than by foreign key — sessions and the webhook log.

Deleting the root and relying on declared cascades is what makes the coverage complete. The previous implementation hand-listed eleven tables out of hundreds and silently left every other shop-scoped table behind. Cascade coverage is now asserted by a test that seeds a shop across many models, deletes it, and fails if anything survives — so a model added later is covered by the schema rather than by somebody remembering to extend a list.

## Lifecycle webhooks

| Topic | Route | What it changes |
| --- | --- | --- |
| `app/uninstalled` | `/webhooks/app/uninstalled` | Marks the shop inactive, stamps the uninstall time, deletes its sessions. |
| `app_subscriptions/update` | `/webhooks/app_subscriptions/update` | Writes the new plan and billing status, and rewrites the entitlement set. |
| `orders/create` | `/webhooks/orders/create` | Feeds analytics and the COD and upsell flows. |
| `orders/fulfilled` | `/webhooks/orders/fulfilled` | Order tracking and post-purchase triggers. |
| `products/create` | `/webhooks/products/create` | Keeps catalogue-dependent features in sync. |
| `products/update` | `/webhooks/products/update` | Refreshes badges, bundles and sourcing. |
| `inventory_levels/update` | `/webhooks/inventory/update` | Stock scarcity and back-in-stock alerts. |

The last row is worth reading twice: the **topic** is `inventory_levels/update` and the **route** is `/webhooks/inventory/update`. The topic name belongs to Shopify, the path belongs to the app, and they are not required to match — but a search for "inventory/update" in Shopify's topic list will find nothing.

### The subscription webhook is the plan

`app_subscriptions/update` is how billing becomes access. The handler maps the Shopify subscription name — which the app creates as `Growthify - <Plan>` — back to an internal plan id, maps the Shopify status, and rewrites the shop's entitlement rows **in the same transaction** as the plan change. An unrecognised status becomes pending rather than being treated as paid. See [Entitlements](../admin/entitlements.md) for what the rewrite does.

### Uninstall, and why it does not re-raise

The uninstall handler records a failure and acknowledges, rather than re-raising as the GDPR handlers do. The asymmetry is intentional. Marking a shop inactive is idempotent state that `shop/redact` supersedes 48 hours later with a complete deletion, so a retry buys nothing; an erasure that silently did not run cannot be recovered by anything.

The same reasoning governs one more piece of the uninstall path. Growthify mirrors the shop's state onto any linked web account, and that mirror is allowed to fail quietly: the authoritative write has already committed by then, and letting a mirror failure make the whole webhook non-2xx would have Shopify retry an uninstall that already applied.

## Verification and logging

- **HMAC verification** runs first, in the Shopify Remix adapter, before any handler sees the request. Payloads are validated again at runtime.
- **Every event is logged** — topic, shop domain, payload, a processed flag and an error string when one occurred — so a failed delivery is diagnosable rather than invisible.
- **Six route files receive all ten topics.** A catch-all route handles the GDPR topics, the uninstall and the subscription update by dispatching on the topic name; orders, products and inventory have dedicated routes.
- The webhook API version is pinned in the app configuration rather than floating, so a Shopify payload change arrives when the app is updated rather than unannounced.

## What buyer data exists to be redacted

The app **does** store buyer personal data, and saying otherwise was the defect described above. Which models and which columns hold it is declared in a single PII registry inside the app, and the handlers act through that registry rather than through a hand-maintained list. A build-time parity check fails when a model gains a buyer-identifying column without being classified there — so the erasure path cannot quietly fall behind the schema.

What that data is, in categories, is on the [Privacy](../legal/privacy.md) page.

## What the webhooks do not do

- **Growthify does not emit webhooks.** Everything here is inbound, from Shopify. There is no outbound subscription for merchants, and [Merchant API v1](./merchant-api-v1.md) is a pull interface.
- **They are not configurable.** The ten topics are fixed by the app's own configuration; a merchant cannot add, remove or redirect one.
- **Ten topics is the whole list.** An event outside it produces nothing in Growthify — there is no catch-all subscription to every Shopify topic, deliberately, because a subscription you do not act on is data you did not need.
- **They do not guarantee ordering.** Shopify delivers independently per topic; nothing in the app assumes that one event arrived before another.
- **`customers/redact` does not touch Shopify's own copy.** It deletes what Growthify stored for that customer in that shop. The Shopify customer record is Shopify's to erase.
- **A GDPR request does not originate in the Growthify admin.** These arrive from Shopify. The merchant-facing route for a data request is Shopify's, not a screen in this app.
- **An uninstall does not delete immediately.** Processing stops at once and sessions go, but the deletion itself waits for `shop/redact`.

## FAQ

### Which webhooks does Growthify subscribe to?

Ten topics: the three mandatory GDPR topics, plus `app/uninstalled`, `app_subscriptions/update`, `orders/create`, `orders/fulfilled`, `products/create`, `products/update` and `inventory_levels/update`.

### What happens to my data when I uninstall?

`app/uninstalled` marks the shop inactive and clears sessions immediately; `shop/redact`, about 48 hours later, deletes the shop record and everything hanging off it.

### How is a customer data-deletion request handled?

`customers/redact` deletes that customer's stored rows in that shop and logs how many were affected, distinguishing "had none" from "not processed".

### Are webhook requests verified?

Yes — HMAC-verified by the Shopify adapter before any handler runs, and each event is logged with a processed flag.

### What happens if a GDPR webhook fails?

The handler re-raises so Shopify retries. Acknowledging an erasure that did not happen is the exact failure these handlers exist to prevent.

### Does Growthify send webhooks to my endpoint?

No — inbound only.

### Why is the inventory topic named differently from its URL?

The topic is Shopify's (`inventory_levels/update`) and the path is the app's (`/webhooks/inventory/update`).

## Related pages

- [Entitlements](../admin/entitlements.md) — what the subscription webhook rewrites.
- [Billing plans](../admin/billing-plans.md) — the tiers a plan change moves between.
- [Privacy](../legal/privacy.md) — the data categories these handlers export and erase.
- [Merchant API v1](./merchant-api-v1.md) — the pull interface for reading your own data.
