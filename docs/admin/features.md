---
id: features
title: "Growthify admin feature screens for Shopify merchants"
sidebar_label: Admin features
sidebar_position: 1
description: "The 50 Growthify feature screens in the embedded Shopify admin, grouped by SEO, marketing, merchandising, cart and pricing, and fulfilment and operations."
keywords: [shopify admin features, embedded app admin, seo optimizer, email marketing screen, bulk editor, feature configuration screens]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How many feature screens does the Growthify admin have?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Fifty feature screens plus their index, which is 51 route files in total. Each screen is a real route with a loader, an action and persistence rather than a placeholder.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are all the feature screens available on the Free plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Each screen belongs to a module, and a module has a required plan. Free covers popups, reviews, wishlist, cookie consent, marketing, merchandising and compliance; the rest need Pro, Growth or Scale.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is each feature a separate Shopify app?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. They are routes in one embedded admin, sharing the same OAuth session, billing subscription and database. One install, one subscription, one place to configure everything.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does configuring a feature make it appear on my storefront?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not by itself. A feature screen is the configuration surface; the storefront half is a theme block you place in the Theme Editor, and both are needed before a shopper sees anything.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which features need my own third-party credentials?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The messaging and AI features. Email marketing, SMS marketing, social auto-posting and the AI-assisted screens run on keys you supply, so the sending account and its costs stay yours.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do the admin screens store data outside Shopify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Configuration and the records a feature creates are stored in the app database, scoped per shop. Uninstalling triggers Shopify shop/redact, which deletes the shop record and everything hanging off it.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I read feature data out of the admin programmatically?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Partly. Merchant API v1 is read-only and covers the store record, plan usage, reviews and wishlist demand. It is not a general export of every feature screen.',
          },
        },
      ],
    })}
  </script>
</head>

# Admin features

**A Growthify feature screen is a route in the app's embedded Shopify admin where one capability is configured and its records are managed — the settings side of the product, as distinct from the theme blocks a shopper sees.** There are **50** of them, plus the index that lists them, and they sit alongside the module pages rather than replacing them.

## Who this page is for

- **Merchants** working out where a given setting lives.
- **Agencies** scoping a build and needing to know what is configurable without custom development.
- **Developers** mapping an admin screen to the storefront block and endpoint that serve it.

## Screens, modules and blocks are three different things

This trips people up, so it is worth separating before the lists:

| Layer | What it is | Where it lives |
| --- | --- | --- |
| **Module** | The unit a plan unlocks and a merchant switches on. There are 16. | [Entitlements](./entitlements.md) |
| **Feature screen** | The admin route where one capability is configured. There are 50. | This page |
| **Theme block** | The storefront surface a shopper sees. There are 72. | [Theme blocks](../storefront/theme-blocks.md) |

A capability usually has all three, but not always: `bulk-editor` and `import-export` are admin-only operations with no storefront block at all, and several theme blocks are driven by a module's own page rather than by a feature screen.

## SEO and content

`seo-optimizer`, `meta-tags`, `image-alt-text`, `sitemap`, `blog-manager`, `faq-help-center`, `search-autocomplete`, `multi-language`.

These are the screens whose output is mostly markup. `seo-optimizer` and `meta-tags` feed the `seo-meta-tags` head embed; `sitemap` and `blog-manager` are read back by storefront endpoints so a crawler gets a server-rendered response rather than one assembled in the browser.

## Marketing and growth

`email-marketing`, `sms-marketing`, `push-notifications`, `social-auto-post`, `social-proof`, `referral-program`, `affiliate-marketing`, `loyalty-rewards`, `gift-cards`.

The group with the most external dependencies. Sending email or SMS, and posting to a social account, all run on credentials you supply — which is the point: the sending reputation, the provider relationship and the bill stay with you.

## Merchandising and product

`product-badges`, `product-comparison`, `product-customizer`, `product-videos`, `product-360`, `variant-swatches`, `size-chart`, `quick-view`, `recently-viewed`, `advanced-filters`, `collection-sorter`, `mega-menu`, `countdown-timer`, `stock-scarcity`, `pre-order`.

Fifteen screens, and the ones most tightly paired with a block: each has a storefront counterpart with a near-identical name, and configuring one without placing the other is the most common "I set it up and nothing happened" report.

## Cart, checkout and pricing

`sticky-cart`, `currency-converter`, `tax-calculator`, `shipping-calculator`, `subscriptions`, `wholesale-b2b`, `age-verification`.

Three of these carry a caveat worth stating plainly rather than burying: `tax-calculator` and `shipping-calculator` produce estimates for display, and `age-verification` is a gate you configure, not a legal compliance guarantee. The [Terms](../legal/terms.md) say the same thing in the same words.

## Fulfilment and operations

`order-tracking`, `returns-exchanges`, `delivery-date`, `invoice-packing`, `store-locator`, `bulk-editor`, `import-export`, `customer-account`, `contact-form`, `live-chat`, `sales-forecasting`.

The back-office group. `bulk-editor` and `import-export` are the two screens that operate on your catalogue in bulk, and the two with no storefront surface — their whole output is the change they make.

## What a feature screen actually is

Every one of the 50 is a Remix route with a loader that reads, an action that writes, and persistence behind it. None is a placeholder or a coming-soon panel: an audit in September 2026 re-checked the screens that earlier records had labelled stubs and found the labels wrong, not the screens.

Three properties hold across all of them, because they come from shared code rather than from each screen's own discipline:

- **Every write is validated** before it reaches the database — the admin API accepts parsed and checked bodies only.
- **Every list read is bounded.** Queries carry an explicit row limit, so a screen cannot degrade into fetching a whole table because a store grew.
- **Every paid capability is checked at the request that uses it**, not at render time. A screen you can see is not a capability you can spend.

## How gating works here

A feature screen belongs to a module, and the module carries the plan requirement. Reaching a gated capability runs two checks in sequence: does the shop's plan include this module, and — for anything above Free — is the subscription actually active? Failing either returns an upgrade response rather than a broken page. The mechanism, including what happens on a downgrade, is on the [Entitlements](./entitlements.md) page; the tiers and prices are on [Billing plans](./billing-plans.md).

## What the admin features do not do

- **They do not render anything on your storefront by themselves.** Configuration and presentation are separate steps, and the second one happens in the Theme Editor.
- **They do not send anything on Growthify's account.** Email, SMS and social features use your provider credentials. No credentials, no sending — and the app does not fall back to a shared sender.
- **They do not replace Shopify admin.** Products, orders and customers still live in Shopify. These screens add configuration and app-owned records beside them.
- **They are not all exportable through the API.** [Merchant API v1](../api/merchant-api-v1.md) is read-only and deliberately narrow: the store record, plan usage, reviews and wishlist demand. It is not a dump of all 50 screens.
- **They do not guarantee an outcome.** An SEO screen changes markup, a forecasting screen produces an estimate, a tax screen produces a display figure. None of them is a warranty, and the Terms say so.
- **They do not bypass a plan limit.** A screen may be reachable while the action it performs is refused because the shop is over its allowance for the period. That is the usage meter doing its job.
- **They do not persist outside the shop's own scope.** Every record is keyed to the shop, which is what makes an uninstall deletion complete rather than best-effort.

## FAQ

### How many feature screens are there?

Fifty, plus the index that lists them — 51 route files in all. Each is a real route with a loader, an action and persistence.

### Are all of them available on the Free plan?

No. Each screen belongs to a module, and each module has a required plan. Free covers popups, reviews, wishlist, cookie consent, marketing, merchandising and compliance; the rest need Pro, Growth or Scale.

### Is each feature a separate app?

No — they are routes in one embedded admin, sharing one OAuth session, one subscription and one database.

### Does configuring a feature make it appear on my storefront?

Not by itself. Place the matching [theme block](../storefront/theme-blocks.md) as well.

### Which features need my own third-party credentials?

The messaging and AI ones: email marketing, SMS marketing, social auto-posting, and the AI-assisted screens.

### Do the admin screens store data outside Shopify?

Yes — configuration and the records a feature creates live in the app database, scoped per shop. An uninstall triggers Shopify's `shop/redact`, which deletes the shop record and everything hanging off it. See [Webhooks](../api/webhooks.md).

### Can I read feature data out programmatically?

Partly: [Merchant API v1](../api/merchant-api-v1.md) covers the store record, usage, reviews and wishlist demand, read-only.

## Related pages

- [Entitlements](./entitlements.md) — which plan unlocks which module, and how the check runs.
- [Billing plans](./billing-plans.md) — the four tiers and their limits.
- [Modules overview](../modules/overview.md) — the 16 modules, and why that list differs from this one.
- [Theme blocks](../storefront/theme-blocks.md) — the storefront half of most of these screens.
