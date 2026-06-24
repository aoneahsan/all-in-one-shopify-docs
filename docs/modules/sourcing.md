---
id: sourcing
title: Sourcing
sidebar_label: Sourcing
sidebar_position: 13
description: Growthify product sourcing and supplier sync for adding and keeping catalog products in step with suppliers.
keywords: [shopify product sourcing, supplier sync, dropshipping catalog, faire integration]
---

# Sourcing

The sourcing module (14) helps merchants add products from suppliers and keep them in sync.

## What you get

- **Product sourcing** — bring supplier products into the catalog.
- **Supplier sync** — keep sourced products aligned with supplier inventory/pricing.

## Surfaces

- **Server services:** a `sourcing-sync` service and a `faire-integration` service.
- **Admin:** the Sourcing config and the related `import-export` and `wholesale-b2b` feature pages.

## FAQ

**Which suppliers are supported?**
Sourcing includes a Faire integration and a generic supplier-sync path; the exact catalog depends on what you connect in the admin.

**Does it auto-fulfil orders?**
Sourcing manages catalog and sync; order fulfilment still flows through your normal Shopify fulfilment plus the `order-forwarding` service where configured.
