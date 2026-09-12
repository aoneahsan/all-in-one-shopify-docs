---
id: sourcing
title: Product sourcing and supplier sync for Shopify stores
sidebar_label: Sourcing
sidebar_position: 13
description: Growthify sourcing brings supplier products into your catalogue and keeps them aligned on inventory and pricing, with honest limits on partnership-gated links.
keywords: [shopify product sourcing, supplier sync, dropshipping catalog, faire integration, inventory sync, supplier pricing, catalog import]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which suppliers can I connect?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A generic supplier sync path plus a Faire integration. Faire order sync and a Syncee integration both require partnership agreements that are not in place, so treat those specific links as unavailable rather than merely unconfigured.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does sourcing fulfil orders automatically?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Sourcing manages catalogue and synchronisation. Fulfilment still flows through your normal Shopify process, with order forwarding where you have configured it.',
          },
        },
        {
          '@type': 'Question',
          name: 'What exactly stays in sync?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Inventory levels and pricing for products you sourced, so a supplier going out of stock does not leave you selling something you cannot ship. Sync covers the fields the connected supplier exposes.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which plan includes sourcing?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sourcing relates to the fulfillment module, which requires Pro or higher, and to B2B and wholesale capabilities that require Growth. Check the entitlement your specific workflow touches rather than assuming one tier covers all of it.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I import a supplier catalogue from a spreadsheet?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The import and export feature screen is the surface for bulk catalogue movement. The sourcing module itself is about connected supplier relationships rather than one off file imports.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if a supplier changes a price?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Sync updates the sourced product according to how you configured it. Your retail pricing strategy is yours to set; the module aligns the supplier side rather than deciding what you charge.',
          },
        },
      ],
    })}
  </script>
</head>

# Sourcing

**The sourcing module brings supplier products into a Shopify catalogue and keeps the sourced items aligned with the supplier on inventory and pricing.** It addresses the part of running a sourced or dropshipped catalogue that goes wrong quietly: a product that is still listed and purchasable after the supplier stopped stocking it.

## Who this page is for

- **Merchants** whose catalogue comes wholly or partly from third-party suppliers.
- **Buyers** managing supplier relationships across a range that changes often.
- **Anyone evaluating sourcing tooling** who wants a clear statement of which supplier connections genuinely exist.

## What you get

- **Product sourcing** — bringing supplier products into your Shopify catalogue.
- **Supplier sync** — keeping sourced products aligned with the supplier's inventory and pricing.
- **A Faire integration** alongside a generic supplier-sync path.
- **Order forwarding**, where you have configured it.

## The problem it addresses

Sourced catalogues fail in a specific way. You list a supplier's product; the supplier's stock moves; your listing does not. A shopper buys something that cannot be shipped, and you discover it at fulfilment — after you have taken the money and set an expectation.

Synchronisation is what closes that gap. Keeping inventory and pricing aligned means your storefront reflects what can actually be supplied, which is less visible than a feature that adds revenue and considerably cheaper than the alternative.

## Supplier connections — the honest position

This is the part of the module where a vague answer would be misleading, so here is the precise one:

| Connection | State |
| --- | --- |
| Generic supplier sync | Available |
| Faire integration | Available |
| **Faire order sync** | **Requires a Faire API partnership that is not in place** |
| **Syncee integration** | **Requires a partnership agreement that is not in place** |

The two blocked items are **not configuration you have missed**. They depend on commercial partnership agreements with those platforms, and until those exist the integrations cannot function regardless of what you enter in the admin. If your workflow depends on Faire order sync or Syncee, this module does not serve it today.

## What sourcing does and does not own

The boundary is worth drawing clearly, because "sourcing" is sometimes sold as end-to-end dropshipping automation.

**Sourcing owns:** which supplier products are in your catalogue, and whether their inventory and pricing reflect the supplier.

**Sourcing does not own:** fulfilment. An order for a sourced product flows through your normal Shopify fulfilment process, with order forwarding where configured. The module does not place supplier orders on your behalf, track shipments, or manage returns.

**You own:** your retail pricing. Sync aligns the supplier side; what you charge is a commercial decision the module does not make for you.

## Surfaces

- **Server services:** a sourcing-sync service and a Faire integration service.
- **Admin:** the Sourcing configuration, plus the related `import-export` and `wholesale-b2b` feature screens.
- **Related:** order forwarding for sourced products where configured.

## Plan availability

Sourcing touches more than one entitlement, so check the one your workflow actually uses rather than assuming a single tier covers everything:

- **`fulfillment`** — shipping, order tracking and returns capabilities: **Pro or higher**.
- **`b2b`** — wholesale pricing tiers and B2B customer groups: **Growth or higher**.

## What the sourcing module does not do

- **It does not automate fulfilment** or place orders with your suppliers.
- **It does not provide a supplier marketplace.** You bring the relationships; it syncs them.
- **Faire order sync and Syncee are unavailable**, pending partnership agreements.
- **It does not set your retail prices** or calculate margin for you.
- **It does not guarantee supplier data quality.** Descriptions and images arrive as the supplier publishes them.
- **It does not handle customs, duties or cross-border compliance** for sourced goods.

## FAQ

### Which suppliers can I connect?

A generic supplier-sync path plus a Faire integration. Faire *order* sync and Syncee both require partnership agreements that are not in place, so treat those as unavailable rather than unconfigured.

### Does sourcing fulfil orders automatically?

No. It manages catalogue and synchronisation; fulfilment flows through your normal Shopify process, with order forwarding where configured.

### What exactly stays in sync?

Inventory levels and pricing for sourced products, covering the fields the connected supplier exposes — so a supplier stock-out does not leave you selling what you cannot ship.

### Which plan includes sourcing?

It spans entitlements: `fulfillment` capabilities need Pro or higher, `b2b` capabilities need Growth. Check the one your workflow touches.

### Can I import a supplier catalogue from a spreadsheet?

Bulk catalogue movement is the `import-export` feature screen. The sourcing module is about connected supplier relationships rather than one-off file imports.

### What happens if a supplier changes a price?

Sync updates the sourced product as you configured it. Your retail pricing remains your decision — the module aligns the supplier side, not your margin.

### Is sourced product data guaranteed accurate?

No. Descriptions, images and specifications arrive as the supplier publishes them. Review what you list; the sync moves data, it does not vouch for it.

## Related pages

- [Admin features](../admin/features.md) — the `import-export` and `wholesale-b2b` screens.
- [Billing plans](../admin/billing-plans.md) — which tier includes `fulfillment` and `b2b`.
- [Entitlements](../admin/entitlements.md) — how module access is decided per request.
- [Modules overview](./overview.md) — where sourcing sits among the sixteen entitlement modules.
