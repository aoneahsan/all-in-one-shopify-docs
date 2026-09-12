---
id: upsells
title: Post-purchase and thank-you page upsells for Shopify
sidebar_label: Upsells
sidebar_position: 9
description: Growthify upsells add offers after the sale through Shopify checkout UI extensions, on the thank-you and order-status pages, without risking the original order.
keywords: [shopify upsell, post purchase upsell, thank you page upsell, checkout extension, order status block, one click offer, shopify plus]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where do post-purchase upsells appear?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'On Shopify thank you and order status pages, through checkout UI extensions. Nothing edits checkout.liquid, and the offer appears after the original order is already placed and paid for.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can an upsell put my original order at risk?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, and that is the point of offering after the sale. The first order is complete before the offer is shown, so a shopper declining or abandoning the upsell keeps the purchase you already made.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need Shopify Plus for this module?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Checkout upsells inside the checkout itself require Shopify Plus. Thank you page and order status extensions are available more widely, so a non Plus store can use those surfaces but not in checkout ones.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the current state of this module?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The checkout UI extensions exist and are fixture tested offline. The broader offer engine, including rules, targeting, funnel analytics and A/B testing, is specified but not built, so treat this page as describing the shipped extensions plus a stated roadmap.',
          },
        },
        {
          '@type': 'Question',
          name: 'How is a post-purchase upsell different from a cart cross-sell?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A cart cross-sell changes the order being built, before checkout. A post-purchase upsell is a separate offer made after payment. One can increase or jeopardise the current order; the other cannot affect it at all.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the order status block only show offers?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It is a general content surface on the post checkout page. Offers are one use; shipping expectations, care instructions or a support pointer are equally valid content for it.',
          },
        },
      ],
    })}
  </script>
</head>

# Upsells

**The upsells module places offers after the sale — on Shopify's thank-you and order-status pages — using checkout UI extensions rather than theme or checkout code.** Its defining property is timing: the original order is already placed and paid for before the shopper sees anything, so an offer cannot cost you the sale you just made.

## Who this page is for

- **Merchants** with a natural second product — a refill, an accessory, an extended warranty, a larger size.
- **Agencies** advising on where an offer belongs, and what a store's Shopify plan actually allows.
- **Anyone weighing cart-stage against post-purchase offers**, which carry very different risk.

## The case for offering after the sale

A cart-stage offer competes with the checkout button. Every additional decision placed before payment is a chance for the shopper to reconsider the whole basket — which is why aggressive pre-checkout upselling sometimes lowers revenue while raising average order value on the orders that survive.

A post-purchase offer has no such cost. The order is complete. A shopper who ignores the offer, closes the tab or declines has still bought what they came for. The downside is bounded at zero, and the upside is a second purchase from someone who has just demonstrated they trust you enough to pay.

That asymmetry is the entire argument for this module, and it is why the surfaces it uses are the ones after checkout.

## What ships today

- **Thank-you page upsell** — an offer rendered on the post-checkout page.
- **Order-status block** — additional content on the order-status page.

Both are **checkout UI extensions**, built with Shopify's own extension framework and deployed with the app. Nothing edits `checkout.liquid`, which is both a Shopify requirement on modern plans and a reason the module survives checkout changes.

The order-status block is a general content surface, not exclusively an offer slot. Shipping expectations, care instructions, a support pointer or a referral prompt are all reasonable uses.

## Honest status of this module

This is the module where the gap between specification and shipped code is widest, and saying so is more useful than implying otherwise.

**Built:** the two checkout UI extensions, fixture-tested offline.

**Specified but not built:** the one-click post-purchase offer flow, a rules engine keyed on product, cart contents and tags, UTM and language targeting, in-checkout upsells, A/B testing of offers, funnel analytics and conversion tracking for the upsell path.

Treat the roadmap items as roadmap. If your decision to install depends on a rules engine or funnel analytics for upsells, that decision should wait.

## Shopify plan constraints

These are Shopify's constraints, not Growthify's, and no Growthify tier changes them:

| Surface | Requirement |
| --- | --- |
| Thank-you page extension | Available on standard Shopify plans |
| Order-status page extension | Available on standard Shopify plans |
| Upsells **inside checkout** | **Shopify Plus only** |

A non-Plus store can use the thank-you and order-status surfaces. In-checkout upselling is not available to it at any Growthify tier, because Shopify does not expose the surface.

## Surfaces

- **Checkout UI extensions:** the thank-you upsell and the order-status block.
- **Admin:** offer configuration in the Upsells module.
- **Related Shopify Functions:** discounting for bundle-style offers lives in the [bundles module](./bundles.md), not here.

## Cart-stage versus post-purchase, side by side

| | [Cart cross-sell](./cart.md) | Post-purchase upsell |
| --- | --- | --- |
| When | Before checkout | After payment |
| Affects the original order | Yes | No |
| Risk if declined | Possible friction before conversion | None |
| Shopify plan constraint | None beyond app blocks | In-checkout needs Plus |

## What the upsells module does not do

- **No rules engine today** — product, cart and tag targeting are specified, not shipped.
- **No UTM or language targeting** of offers.
- **No A/B testing** with automatic winner selection.
- **No funnel analytics** for the upsell path specifically.
- **No in-checkout upsells on non-Plus stores**, which is a Shopify constraint.
- **It does not edit `checkout.liquid`**, by design and by Shopify's rules.

## FAQ

### Where do post-purchase upsells appear?

On Shopify's thank-you and order-status pages, through checkout UI extensions. Nothing edits `checkout.liquid`, and the offer appears after the original order is placed and paid.

### Can an upsell put my original order at risk?

No — that is the point of offering after the sale. Declining or abandoning the offer leaves the completed purchase untouched.

### Do I need Shopify Plus?

For upsells *inside* checkout, yes. Thank-you and order-status extensions are available more widely, so a non-Plus store can use those surfaces.

### What is the current state of this module?

The two checkout UI extensions exist and are fixture-tested. The offer engine — rules, targeting, funnel analytics, A/B testing — is specified but not built. This page states both.

### How is this different from a cart cross-sell?

A cart cross-sell changes the order being built, before checkout. A post-purchase upsell is a separate offer after payment. One can jeopardise the current order; the other cannot.

### Does the order-status block only show offers?

No — it is a general content surface. Shipping expectations, care instructions or a support pointer are equally valid.

### Will an upsell purchase appear as a separate order?

A post-purchase offer is a separate transaction from the original order by nature, so plan your fulfilment and reporting on that basis rather than assuming a single combined order.

## Related pages

- [Cart](./cart.md) — the pre-checkout counterpart and its different risk profile.
- [Bundles](./bundles.md) — discount logic applied inside checkout by Shopify Functions.
- [Billing plans](../admin/billing-plans.md) — Growthify tiers, which do not change Shopify's plan constraints.
- [Architecture](../getting-started/architecture.md) — where checkout extensions sit among the surfaces.
