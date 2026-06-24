---
id: bundles
title: Bundles
sidebar_label: Bundles
sidebar_position: 6
description: Growthify bundles — quantity breaks, BOGO, mix-and-match, and frequently-bought-together, with conditional discount stacking.
keywords: [shopify bundles, quantity breaks, bogo, mix and match, frequently bought together, bundle discounts]
---

# Bundles

The bundles module (06) raises average order value with discount-driven bundles.

## What you get

- **Quantity breaks** — tiered pricing such as "Buy 2, save 10%".
- **BOGO** — buy-one-get-one rules (delivered as a Shopify discount function).
- **Mix-and-match** bundles with conditional discount stacking.
- **Frequently bought together (FBT)** suggestions on product pages.
- **Customer-facing savings labels** showing the discount on product pages.

## Surfaces

- **Theme blocks:** `bundles-widget`, `quantity-breaks`, `bogo-badge`, `mix-match-bundle`, `fbt-widget`.
- **Storefront API:** bundle config plus `POST /apps/growthify/api/bundles/free-gift/evaluate` and `.../redeem` for free-gift logic.
- **Shopify Functions:** `bogo-discount` and `quantity-discount` are compiled discount functions in the app's `extensions/`.
- **Admin:** the Bundles module config (rules, stacking, labels).

## FAQ

**How are discounts applied at checkout?**
Quantity-break and BOGO logic ship as Shopify discount **functions** (wasm), so the discount is applied natively at checkout rather than by fragile cart scripts.

**Can discounts stack?**
Mix-and-match supports conditional stacking; you control which combinations are allowed in the admin.
