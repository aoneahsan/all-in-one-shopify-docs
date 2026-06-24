---
id: features
title: Admin features
sidebar_label: Admin features
sidebar_position: 1
description: The 52 Growthify admin feature pages — SEO, marketing, merchandising, fulfilment, and operations tooling for Shopify merchants.
keywords: [shopify admin features, seo optimizer, email marketing, sms marketing, loyalty rewards, subscriptions, wholesale b2b]
---

# Admin features

Beyond the 16 runtime modules, Growthify's embedded admin ships **52 feature pages** (`admin.features.*`). Each is a real Remix route with a loader, an action, and persistence. They group as follows.

## SEO & content

`seo-optimizer`, `meta-tags`, `image-alt-text`, `sitemap`, `blog-manager`, `faq-help-center`, `search-autocomplete`, `multi-language`.

## Marketing & growth

`email-marketing`, `sms-marketing`, `push-notifications`, `social-auto-post`, `social-proof`, `referral-program`, `affiliate-marketing`, `loyalty-rewards`, `gift-cards`.

## Merchandising & product

`product-badges`, `product-comparison`, `product-customizer`, `product-videos`, `product-360`, `variant-swatches`, `size-chart`, `quick-view`, `recently-viewed`, `advanced-filters`, `collection-sorter`, `mega-menu`, `countdown-timer`, `stock-scarcity`, `pre-order`.

## Cart, checkout & pricing

`sticky-cart`, `currency-converter`, `tax-calculator`, `shipping-calculator`, `subscriptions`, `wholesale-b2b`, `age-verification`.

## Fulfilment & operations

`order-tracking`, `returns-exchanges`, `delivery-date`, `invoice-packing`, `store-locator`, `bulk-editor`, `import-export`, `customer-account`, `contact-form`, `live-chat`, `sales-forecasting`.

## How features relate to modules and blocks

A feature page is the **admin configuration surface**; many features are rendered on the storefront by one or more of the 72 [theme blocks](../storefront/theme-blocks.md) and backed by one of the 50 [storefront API](../api/storefront-api.md) endpoints. For example, `seo-optimizer` drives `seo-meta-tags` + the `seo-render` endpoint; `loyalty-rewards` drives `loyalty-widget` + the `loyalty` endpoints.

## Gating

Premium feature pages are gated by [entitlements](./entitlements.md); a module's tile in the Modules dashboard redirects to its real config route rather than dead-ending.

## FAQ

**Are all 52 features available on the Free plan?**
No — feature availability follows the plan tiers. See [Billing plans](./billing-plans.md).

**Is each feature a separate app?**
No. They are routes in the one embedded admin, sharing the same auth, billing, and database.
