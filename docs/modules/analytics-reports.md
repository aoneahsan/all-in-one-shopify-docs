---
id: analytics-reports
title: Analytics & Reports
sidebar_label: Analytics & Reports
sidebar_position: 10
description: Growthify analytics and reporting — cohorts, lifetime value, UTM attribution, profit and loss, sales forecasting, and a report engine.
keywords: [shopify analytics, customer ltv, cohort analysis, utm attribution, profit and loss, sales forecasting]
---

# Analytics & Reports

The reports module (10) and analytics module (11) turn store activity into decisions, with an error-tracking layer (module 02) underneath.

## What you get

- **Cohorts & retention** — group customers by first-purchase period and track repeat behaviour.
- **Lifetime value (LTV)** per customer and segment.
- **UTM attribution** — tie orders back to campaigns.
- **Profit & loss** — revenue minus cost inputs.
- **Sales forecasting** — projected sales from historical baselines.
- **Report engine** — build and export reports.

## Surfaces

- **Admin:** the Reports and Analytics dashboards, plus the `sales-forecasting` and `import-export` feature pages.
- **Server services:** a `report-engine` and a `forecasting` service.
- **Storefront API:** `conversion-track` records storefront conversion events.

## FAQ

**Where does the data come from?**
Order and product webhooks (`orders/create`, `orders/fulfilled`, `products/*`) plus storefront conversion events feed the analytics tables; the report engine reads from them.

**Can I export?**
Yes — the report engine and the `import-export` feature support exports.

**Is my analytics data shared with third parties?**
No. Analytics are computed in your app database. Optional error reporting (Sentry) only sees error metadata, not customer analytics. See the [privacy policy](../legal/privacy.md).
