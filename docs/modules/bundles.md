---
id: bundles
title: Shopify bundles and quantity break discounts in Growthify
sidebar_label: Bundles
sidebar_position: 6
description: Growthify bundles cover quantity breaks, BOGO and mix-and-match, applied at checkout through Shopify Functions rather than fragile cart scripts.
keywords: [shopify bundles, quantity breaks, bogo discount, mix and match, frequently bought together, shopify functions, tiered pricing]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How are bundle discounts applied at checkout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Through Shopify Functions. Quantity break and BOGO logic run as discount functions inside Shopify checkout, which means the price a shopper sees at checkout is calculated by Shopify rather than by a cart script that a theme change could break.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why not use cart scripts or line item hacks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Because they run outside checkout and can disagree with the price actually charged. A discount function is evaluated by Shopify in the checkout itself, so the displayed saving and the charged total come from the same place.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can discounts stack?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Mix and match supports conditional stacking and you control which combinations are allowed in the admin. Stacking with Shopify native discount codes is governed by your store discount combination settings, not by Growthify.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many bundles can I create?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: '3 on Free, 20 on Pro, 100 on Growth and unlimited on Scale. The bundles module itself requires Pro or higher, so the Free allowance applies to the ceiling rather than to day to day use.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do quantity breaks show on the product page?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, through the quantity breaks block, which renders the tier table with a best value badge and a savings figure. The block displays the offer; the function applies it at checkout.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are fixed predefined bundles supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Quantity breaks, BOGO and mix and match are what ships. Fixed bundles that combine specific products into one purchasable unit, and variant level bundles, are roadmap rather than current behaviour.',
          },
        },
      ],
    })}
  </script>
</head>

# Bundles

**The bundles module raises average order value with discount rules that Shopify itself applies at checkout: tiered quantity breaks, buy-one-get-one offers, and mix-and-match combinations, each surfaced on the product page and enforced by a Shopify Function.** The distinction between *showing* an offer and *applying* it runs through this whole module.

## Who this page is for

- **Merchants** trying to lift units per order rather than traffic.
- **Agencies** who have been burned by cart-script discounting that disagreed with the checkout total.
- **Developers** who want to know where the discount logic actually executes.

## What you get

- **Quantity breaks** — tiered pricing such as "buy 2, save 10%", set globally or per product.
- **Tiered pricing display** with a **best-value badge** and a **savings calculator** showing what the shopper saves.
- **BOGO** — buy X, get Y rules.
- **Mix-and-match** bundles with conditional stacking.
- **Percentage and fixed-amount** discount types.
- **Frequently-bought-together** suggestions on the product page.

## Where the discount is actually applied

This is the part worth understanding before choosing any bundling app.

Quantity-break and BOGO logic ship as **Shopify Functions** — discount functions that Shopify evaluates inside its own checkout. The consequence is that **the price charged is computed by Shopify**, not by JavaScript running in your theme.

The alternative approach, used by many apps, manipulates the cart from the storefront: adding hidden line items, rewriting quantities, or applying a discount code client-side. That approach breaks in predictable ways — a theme update changes a selector, a shopper reaches checkout by another path, or the displayed saving and the charged total simply disagree. Discounting a cart is not the same as discounting an order.

The product-page blocks **display** the offer. The function **applies** it. Those are two separate mechanisms on purpose, and the second one is the one the shopper is charged by.

## Surfaces

- **Theme blocks:** `bundles-widget`, `quantity-breaks`, `bogo-badge`, `mix-match-bundle`, `fbt-widget`.
- **Shopify Functions:** a BOGO discount function and a quantity-break discount function.
- **Storefront API:** bundle configuration, plus free-gift evaluation and redemption endpoints.
- **Admin:** the Bundles module configuration — rules, tiers, stacking permissions, badge and label copy.

## Plan limits

The bundles module requires **Pro or higher**. Bundle counts are **3 on Free, 20 on Pro, 100 on Growth and unlimited on Scale** — the Free figure being a registry ceiling rather than a usable allowance, since the module is not included at that tier.

**Checkout-level discount application requires Shopify Functions**, which carries its own plan considerations on the Shopify side independent of your Growthify tier.

## Stacking, honestly

Mix-and-match supports **conditional stacking**, and you decide which combinations are permitted in the admin.

What Growthify does not control is how its function interacts with **Shopify's own discount codes and automatic discounts**. Whether a Growthify discount combines with a store-wide code is governed by your store's discount combination settings in Shopify. Test the combinations you intend to run before a sale rather than during one.

## What the bundles module does not do

- **No fixed predefined bundles** that combine specific products into a single purchasable unit, and **no variant-level bundles**. Quantity breaks, BOGO and mix-and-match are what ships.
- **No free-gift-with-purchase campaign builder**, though free-gift evaluation and redemption endpoints exist.
- **It does not override Shopify's discount combination rules.**
- **It does not create Shopify discount codes** for you to share externally.
- **It does not manage inventory implications** — a BOGO offer can outrun stock if you let it.
- **It does not A/B test bundle offers** with automatic winner selection.

## FAQ

### How are bundle discounts applied at checkout?

Through Shopify Functions. The discount is evaluated by Shopify inside checkout, so the price charged and the saving displayed come from the same calculation rather than from a theme script.

### Why not use cart scripts?

Because they run outside checkout and can disagree with what is actually charged. A theme change, or a shopper arriving by another route, is enough to break them.

### Can discounts stack?

Mix-and-match supports conditional stacking, controlled in the admin. Combination with Shopify's own codes is governed by your store's discount settings, not by Growthify — test it before relying on it.

### How many bundles can I create?

3 on Free, 20 on Pro, 100 on Growth, unlimited on Scale. The module itself requires Pro or higher.

### Do quantity breaks show on the product page?

Yes — the quantity-breaks block renders the tier table with a best-value badge and a savings figure. The block displays; the function applies.

### Are fixed predefined bundles supported?

Not today. Quantity breaks, BOGO and mix-and-match ship; fixed and variant-level bundles are roadmap.

### What happens if a shopper reaches checkout without seeing the block?

The function still applies, because it runs in checkout on the cart contents rather than on whether a block was rendered. That is precisely the failure mode this design avoids.

## Related pages

- [Cart](./cart.md) — the other AOV surface, and how the two differ.
- [Theme blocks](../storefront/theme-blocks.md) — the five bundle-related blocks.
- [Billing plans](../admin/billing-plans.md) — bundle limits and the Pro requirement.
- [Upsells](./upsells.md) — post-purchase offers, which run after checkout rather than in it.
