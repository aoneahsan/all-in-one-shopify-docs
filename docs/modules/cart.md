---
id: cart
title: Shopify cart drawer and cart upsells in Growthify
sidebar_label: Cart
sidebar_position: 7
description: Growthify turns the cart into a conversion surface with a slide-out drawer, free-shipping progress, cross-sell, add-ons, gift messages and a terms checkbox.
keywords: [shopify cart drawer, free shipping bar, cart cross sell, cart donation, gift message, cart upsell, shipping protection, cart terms]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Does the cart drawer replace my theme cart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, it augments it. You place the drawer block where you want it and your theme native cart page keeps working. Shoppers who navigate straight to the cart page are unaffected.',
          },
        },
        {
          '@type': 'Question',
          name: 'How does the free shipping bar know the threshold?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You set the threshold in the admin and the bar renders progress toward it. The bar is a display of your configured number; it does not create the shipping rate itself, which stays in Shopify shipping settings.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I collect donations in the cart?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The donation add-on collects a configurable amount as part of the order. Growthify does not disburse the money or handle any charity relationship; the payout arrangement is entirely yours.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between cart cross sell and post purchase upsell?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Cross sell happens before checkout, inside the cart, and changes the order being placed. A post purchase upsell happens after the order is paid for, on the thank you page, and creates a separate offer. They are different modules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the cart module require a paid plan?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The smart cart module requires Pro or higher and is off by default. Order level add ons that need a checkout extension carry their own Shopify side requirements on top.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is the cart countdown a real deadline?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a display element you configure. It does not reserve inventory and it does not expire a cart. Presenting a countdown as a genuine hold when nothing is held is a claim you should avoid making.',
          },
        },
      ],
    })}
  </script>
</head>

# Cart

**The cart module turns the Shopify cart from a receipt into a conversion surface: a slide-out drawer with upsell slots, progress toward free shipping, cross-sell recommendations, purchasable add-ons, gift messaging and a terms checkbox.** It is the last place before checkout where order value can still move.

## Who this page is for

- **Merchants** whose average order value is close to a shipping threshold, or who sell natural add-ons.
- **Agencies** adding a drawer to a theme that has none, without forking the theme's cart.
- **Anyone comparing cart-stage and post-purchase offers**, which are genuinely different things.

## What you get

- **Cart drawer** — a slide-out cart with slots for upsells, so adding an item does not navigate away from the page.
- **Free-shipping progress bar** — how much more is needed to reach your configured threshold.
- **Cross-sell recommendations** inside the drawer.
- **Cart countdown** — a configurable urgency display.
- **Add-ons** — shipping protection, gift wrapping and donations, each purchasable in the cart.
- **Gift messages** — an optional message field with configurable placeholder copy.
- **Cart terms** — an acceptance checkbox where your business requires one.

## The drawer augments, it does not replace

The drawer is a block you place. Your theme's native cart page keeps working, and a shopper who navigates directly to `/cart` sees it as normal. Nothing is removed from the theme and nothing overrides it.

This matters for two reasons. A theme update cannot break a cart you did not replace, and a shopper on an unusual path — a bookmarked cart URL, a browser without the drawer's JavaScript — still reaches a working cart.

## Free shipping: the bar displays, Shopify charges

The threshold is a number you set in the admin, and the bar renders progress toward it.

**The bar does not create the shipping rate.** Whether an order actually ships free is decided by your **Shopify shipping settings**. If the bar says £50 and your shipping profile says £60, the bar is wrong and the shopper finds out at checkout — which is a worse outcome than having no bar. Keep the two in step deliberately; nothing synchronises them for you.

## Add-ons, and where the money goes

Shipping protection, gift wrapping and donations are collected as part of the order.

For **donations** specifically: Growthify collects a configurable amount alongside the purchase. **It does not disburse funds, hold a charity relationship, or provide any tax treatment.** The payout arrangement is yours to make and yours to describe honestly to the shopper.

## Cart-stage versus post-purchase

Two different modules solve two different moments:

| | Cart cross-sell (this module) | [Post-purchase upsell](./upsells.md) |
| --- | --- | --- |
| When | Before checkout | After the order is paid |
| Changes the order? | Yes — it is still being built | No — it is a separate offer |
| Risk if declined | Possible friction before conversion | None; the sale is already made |
| Surface | Cart drawer | Thank-you / order-status page |

Cart-stage offers can raise the order that is happening. Post-purchase offers cannot jeopardise it. Most stores want both, for different products.

## Surfaces

- **Theme blocks:** `cart-drawer`, `cart-addons`, `cart-crosssell`, `cart-countdown`, `cart-donation`, `cart-terms`, `free-gift-notice`, `gift-message`, `shipping-protection`.
- **Storefront API:** gift-message configuration, donation and cross-sell configuration endpoints, behind the [app proxy](../storefront/app-proxy.md).
- **Admin:** the Cart module configuration — drawer design, threshold, add-ons, countdown, gift-message copy.

## Plan requirement

The **Smart Cart module requires Pro or higher** and is off by default. **Order-level add-ons that depend on a checkout extension carry additional Shopify-side requirements**, independent of your Growthify tier.

## What the cart module does not do

- **It does not replace your theme's cart** or its cart page.
- **It does not set shipping rates.** The free-shipping bar displays a number you configure; Shopify decides what is charged.
- **It does not disburse donations** or manage a charity relationship.
- **The countdown does not reserve inventory** or expire a cart. It is a display element, and describing it as a hold would be untrue.
- **It does not modify checkout itself** beyond Shopify's supported extension points.
- **It does not personalise cross-sell with a recommendation model** trained on shopper behaviour.

## FAQ

### Does the cart drawer replace my theme's cart?

No — it augments it. The native cart page keeps working, and shoppers who navigate straight there are unaffected.

### How does the free-shipping bar know the threshold?

You set it in the admin and the bar renders progress toward it. The bar does not create the shipping rate — that stays in Shopify's shipping settings, and keeping the two in agreement is your job.

### Can I collect donations in the cart?

Yes, as a configurable add-on amount. Growthify does not disburse the money or hold any charity relationship; that arrangement is yours.

### What is the difference between cart cross-sell and post-purchase upsell?

Cross-sell happens before checkout and changes the order being built. A post-purchase upsell happens after payment and creates a separate offer. Different modules, different risk.

### Does the cart module require a paid plan?

Yes — Pro or higher, off by default. Order-level add-ons needing a checkout extension have further Shopify-side requirements.

### Is the cart countdown a real deadline?

No. It is a display element; it reserves nothing and expires nothing. Do not present it as a hold.

### Will the drawer work if the app embed is off?

No. Like every Growthify block, the drawer depends on the embed to define `window.gfConfig` and boot the loader. See [App embed](../storefront/app-embed.md).

## Related pages

- [Bundles](./bundles.md) — raising order value through discount rules applied in checkout.
- [Upsells](./upsells.md) — the post-purchase counterpart to cart cross-sell.
- [Theme blocks](../storefront/theme-blocks.md) — the nine cart-related blocks.
- [Billing plans](../admin/billing-plans.md) — the Pro requirement and what each tier includes.
