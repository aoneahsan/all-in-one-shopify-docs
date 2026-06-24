---
id: privacy
title: Privacy
sidebar_label: Privacy
sidebar_position: 1
description: A summary of how Growthify handles store and customer data, with a pointer to the canonical privacy policy.
keywords: [growthify privacy, shopify app privacy, gdpr, protected customer data]
---

# Privacy (summary)

This page summarises Growthify's data handling for documentation readers. The **canonical, legally binding privacy policy** is published on the marketing site at **https://growthify.aoneahsan.com/privacy-policy** and in the app repo's `docs/legal/PRIVACY-POLICY.md`.

## What data Growthify processes

- **Store data** under the granted scopes — products, orders, customers (for reviews/wishlist/analytics), and themes (to install app blocks). See [Entitlements](../admin/entitlements.md) for the per-scope justification.
- **Storefront submissions** — popup captures, reviews, wishlist items, contact-form messages, and similar, created by shoppers using the modules you enable.
- **Operational metadata** — billing/plan status from Shopify App Subscriptions.

## How it's stored and shared

- Store and submission data live in the app's **Neon Postgres** database (processor, controlled by you).
- **Messaging-provider credentials** (Twilio, SendGrid, Mailgun, Klaviyo, etc.) are stored **encrypted at rest** and decrypted only at send time.
- Optional **error reporting** (Sentry) processes error metadata, not customer analytics.
- Growthify does **not** sell customer data or transfer it to third parties acting as their own controllers.

## Customer rights & deletion

- `customers/data_request`, `customers/redact`, and `shop/redact` [webhooks](../api/webhooks.md) implement Shopify's GDPR contract.
- Uninstalling the app stops processing; `shop/redact` deletes shop data while keeping a hashed audit record for compliance.

:::warning Not legal advice
This summary is for documentation convenience only. The published privacy policy governs, and nothing here is legal advice.
:::
