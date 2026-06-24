---
id: webhooks
title: Webhooks
sidebar_label: Webhooks
sidebar_position: 2
description: Growthify Shopify webhooks — GDPR compliance webhooks plus app, subscription, order, product, and inventory lifecycle webhooks.
keywords: [shopify webhooks, gdpr compliance webhooks, customers redact, app uninstalled, app subscriptions update]
---

# Webhooks

Growthify subscribes to the GDPR mandatory webhooks plus the lifecycle webhooks it needs to keep state in sync. They are declared in `shopify.app.toml` and handled by Remix routes.

## GDPR compliance webhooks (mandatory)

| Topic | Route | What it does |
| --- | --- | --- |
| `customers/data_request` | `/webhooks/customers/data_request` | Returns/queues the data held for a customer. |
| `customers/redact` | `/webhooks/customers/redact` | Deletes a customer's data. |
| `shop/redact` | `/webhooks/shop/redact` | Deletes shop data 48h after uninstall, keeping a hashed audit row. |

These three URLs are configured in the Partner Dashboard's compliance section and must point at the deployed app host.

## Lifecycle webhooks

| Topic | Route | Purpose |
| --- | --- | --- |
| `app/uninstalled` | `/webhooks/app/uninstalled` | Marks the shop inactive, stops processing. |
| `app_subscriptions/update` | `/webhooks/app_subscriptions/update` | Flips the shop's plan when billing changes; logged to the compliance audit. |
| `orders/create` | `/webhooks/orders/create` | Feeds analytics, COD/upsell flows. |
| `orders/fulfilled` | `/webhooks/orders/fulfilled` | Order tracking, post-purchase triggers. |
| `products/create` | `/webhooks/products/create` | Keeps catalog-dependent features in sync. |
| `products/update` | `/webhooks/products/update` | Refreshes badges, bundles, sourcing. |
| `inventory/update` | `/webhooks/inventory/update` | Stock scarcity, back-in-stock alerts. |

## Verification

All webhook requests are HMAC-verified by the Shopify Remix adapter before the handler runs; payloads are additionally validated at runtime.

## FAQ

**What happens to data on uninstall?**
`app/uninstalled` marks the shop inactive; `shop/redact` (sent by Shopify ~48h later) deletes shop rows and entitlements while retaining a hashed audit record for compliance.

**How is a customer data-deletion request handled?**
`customers/redact` deletes that customer's stored data (reviews, wishlist, captured submissions) tied to the shop.
