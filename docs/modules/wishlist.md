---
id: wishlist
title: Shopify wishlist and save for later with Growthify
sidebar_label: Wishlist
sidebar_position: 5
description: Growthify wishlists let shoppers save products for later, share a list, and revisit recently viewed items, with demand readable per product via the API.
keywords: [shopify wishlist, save for later, shareable wishlist, recently viewed products, wishlist demand, guest wishlist]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do shoppers need an account to use the wishlist?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. A guest wishlist is kept in the browser so anyone can save an item immediately. A signed-in customer gets a list stored against their account, which survives clearing the browser and follows them across devices.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I see which products are saved most often?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The Merchant API wishlist endpoint returns save counts aggregated per product, with the most recent save time. It never returns which customer saved what.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the API not tell me who saved a product?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because that is buyer data a third-party integration has no claim on. The grouping happens in the database, so customer identifiers are never put on the wire on the way to producing a count.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many wishlist items can a store hold?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '500 on Free, 5,000 on Pro, 25,000 on Growth and unlimited on Scale. The ceiling is on stored items across the shop and is enforced server side.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the wishlist send back in stock alerts?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not from this module. Stock alerts are a separate capability and the wishlist does not currently trigger them. Saving an item records intent; it does not subscribe the shopper to notifications.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to a guest wishlist when the shopper signs in?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The guest list lives in the browser and the account list lives on the server. Automatic merging of the two is roadmap rather than shipped behaviour, so treat them as separate today.',
          },
        },
      ],
    })}
  </script>
</head>

# Wishlist

**The wishlist module lets a shopper save products to come back to, share that list with someone else, and pick up where they left off through a recently-viewed carousel.** For the merchant it produces something more useful than a nice feature: a per-product record of demand that has not yet converted.

## Who this page is for

- **Merchants** with considered-purchase catalogues, where a first visit rarely ends in an order.
- **Buyers and merchandisers** who want to know which products are being saved rather than bought.
- **Developers** pulling wishlist demand into forecasting or restock tooling.

## What you get

- **Save for later** from product and collection pages, with an animated heart control.
- **A wishlist page** listing saved items, with add-to-cart and remove actions.
- **Guest wishlists** kept in the browser, so saving needs no account.
- **Shareable lists**, producing a link that renders the saved items for someone else.
- **Recently viewed** — a carousel of products the shopper looked at.
- **Basic styling options** so the control matches the theme.

## Guest versus signed-in lists

These behave differently and it is worth being explicit:

| | Guest wishlist | Signed-in wishlist |
| --- | --- | --- |
| Stored | In the browser | On the server, against the customer |
| Survives clearing browser data | No | Yes |
| Available on another device | No | Yes |
| Counts toward the shop's stored-item limit | No | Yes |

A guest list removes the friction of "create an account to save this", which is the point. It is also genuinely ephemeral, and the UI should not promise otherwise.

**Automatic merging of a guest list into an account on sign-in is roadmap, not shipped.** Treat the two as separate today rather than assuming a merge that does not happen.

## Wishlist demand as a signal

Saves are a demand signal that sits between a page view and a purchase — stronger than a visit, weaker than an order, and available before you have stocked more.

`GET /api/v1/wishlist` in the [Merchant API](../api/merchant-api-v1.md) returns, per product, the **number of saves** and the **most recent save time**, cursor-paginated. That is enough to rank products by unconverted intent and to spot a rising item before it sells out.

**It never returns which customer saved what**, and that is deliberate. The count is the useful half and carries no identity; the grouping is performed in the database so customer identifiers are never transmitted on the way to producing it. A third-party integration holding a merchant's key has no claim on buyer identity.

## Surfaces

- **Theme blocks:** `wishlist-button`, `wishlist-share`, `save-for-later`, `recently-viewed`.
- **Storefront API:** wishlist add, remove and list, plus the recently-viewed endpoint, behind the [app proxy](../storefront/app-proxy.md).
- **Admin:** the Wishlist module configuration — display options and share settings.
- **Merchant API:** aggregated per-product save counts.

## Plan limits

Stored wishlist items per shop: **500 on Free, 5,000 on Pro, 25,000 on Growth, unlimited on Scale.** Wishlist additions are a metered event readable through the usage endpoint, where a limit of `-1` means unlimited.

## What the wishlist module does not do

- **No back-in-stock or price-drop alerts.** Saving records intent; it does not subscribe the shopper to notifications.
- **No automatic guest-to-account merge** on sign-in.
- **No multiple named lists** per shopper — one list, not a "birthday" and a "someday" list.
- **No per-customer export.** Wishlist data leaves the app aggregated per product, by design.
- **No social share buttons beyond a shareable link.**
- **It does not reserve inventory.** A saved item is not held for the shopper.

## FAQ

### Do shoppers need an account to use the wishlist?

No. A guest wishlist is kept in the browser, so anyone can save immediately. A signed-in customer's list is stored server-side, survives clearing the browser, and follows them across devices.

### Can I see which products are saved most often?

Yes — the Merchant API returns save counts aggregated per product with the most recent save time, cursor-paginated.

### Why does the API not tell me who saved a product?

Because buyer identity is not something a third-party integration should receive. The grouping happens in the database, so customer identifiers never reach the wire.

### How many wishlist items can a store hold?

500 on Free, 5,000 on Pro, 25,000 on Growth, unlimited on Scale — enforced server-side against stored items.

### Does the wishlist send back-in-stock alerts?

Not from this module. Saving records intent; it does not subscribe the shopper to notifications.

### What happens to a guest wishlist when the shopper signs in?

The guest list stays in the browser and the account list stays on the server. Automatic merging is roadmap, not shipped, so treat them as separate.

### Does a wishlist save reserve stock?

No. It records that someone is interested; inventory is untouched and the item can sell out.

## Related pages

- [Merchant API v1](../api/merchant-api-v1.md) — the aggregated wishlist endpoint and its cursor rules.
- [Theme blocks](../storefront/theme-blocks.md) — the wishlist and recently-viewed blocks.
- [Billing plans](../admin/billing-plans.md) — stored-item limits per tier.
- [Reviews](./reviews.md) — the other storefront submission type, with its own privacy rules.
