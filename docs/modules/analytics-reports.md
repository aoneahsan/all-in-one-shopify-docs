---
id: analytics-reports
title: Shopify analytics and reports inside Growthify admin
sidebar_label: Analytics & Reports
sidebar_position: 10
description: Growthify analytics covers usage meters, module funnels, period filtering and daily trends, with a report engine and error tracking underneath.
keywords: [shopify analytics, usage meters, module funnels, conversion rates, report engine, error rate tracking, sales forecasting, cohort analysis]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where does Growthify analytics data come from?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'From your own store activity: order and product webhooks, plus storefront events the modules record. It is computed in your app database rather than assembled from a third-party dataset.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is my analytics data shared with anyone?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Analytics are computed in the app database. Optional error reporting sees error metadata only, never customer analytics, and it is off entirely when no key is configured.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is actually built in the analytics dashboard today?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Usage meters, module funnels with conversion rates, period filtering across 24 hours, 7, 30 and 90 days, daily trend visualisation, per module event counts and error rate tracking. Profit and loss and product performance are partial, and the report builder is not built.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I export a report?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Export belongs to the reports module, which is specified but not yet built. What you can do today is read metered usage counters programmatically through the Merchant API usage endpoint.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which plan includes advanced reports?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The reports module requires Growth or higher and is off by default. Usage meters and module analytics in the admin are part of the platform rather than that gated module.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Growthify replace Shopify Analytics?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. It measures what Growthify modules do — popup views, review submissions, wishlist saves, module funnels and error rates. Shopify remains the authority on orders, sessions and store wide revenue.',
          },
        },
      ],
    })}
  </script>
</head>

# Analytics & Reports

**Growthify's analytics layer measures what its own modules do: how many popup views a store has spent, how a module's funnel converts, which events are trending, and where errors are occurring — with a reports module for deeper analysis and export sitting above it.** It answers "is this module earning its place?", which is a narrower and more honest question than "how is my store doing?".

## Who this page is for

- **Merchants** deciding whether a module is worth keeping enabled.
- **Merchants approaching a plan limit** who need to see usage before they hit a ceiling.
- **Developers** pulling usage counters into their own monitoring through the [Merchant API](../api/merchant-api-v1.md).

## What is built today

Being precise here is more useful than a feature list that blends shipped and planned work.

**Shipped:**

- **Usage meters** — popup views, API calls, storage and the other metered counters, against the plan's ceilings.
- **Module funnels** with conversion rates.
- **Period filtering** — 24 hours, 7 days, 30 days, 90 days.
- **Daily trend visualisation.**
- **Per-module event counts.**
- **Error-rate tracking.**
- **A tabbed Polaris dashboard** in the embedded admin.

**Partial:** a profit-and-loss view with the interface in place and the data inputs incomplete; product performance limited to basic statistics.

**Specified, not built:** the pre-built report library, a custom report builder with formula support, metafields and tags in reports, CSV, Excel, PDF and Google Sheets export, cohort and retention analysis, lifetime value, and UTM attribution.

If your decision rests on cohort analysis or scheduled exports, that decision should wait for the reports module to land.

## Usage meters, and why they matter most

The usage meter is the part of this module a merchant is most likely to need urgently, because it is what stands between them and an unexpected ceiling.

Every metered counter reports four things: the **current** count for the billing period, the **limit** from the plan, a **percentage**, and a **status**:

| Status | Meaning |
| --- | --- |
| `ok` | Below 80 % of the limit |
| `warning` | At or above 80 % |
| `exceeded` | The limit has been reached |

Two conventions are worth committing to memory. **A limit of `-1` means unlimited**, and such a line always reports `ok` at 0 % — never treat `-1` as a quantity. **A limit of `0` means the feature is off for your plan**, and reports `exceeded` at 100 %, because nothing is within a limit of zero.

The same figures are readable programmatically at `GET /api/v1/usage`, which is the supported way to alert yourself before a ceiling rather than after.

## The error-tracking layer

Underneath the dashboards sits the analytics-and-errors module, which is plumbing rather than a feature: event tracking, error capture, and the wrappers modules call to report both.

Error reporting through Sentry is **optional and key-gated**. With no key configured, the provider is skipped entirely — there is no silent fallback and no partial reporting. When it is configured, it receives **error metadata, never customer analytics**.

## Data provenance

Analytics are computed from **your own store's activity**:

- **Order webhooks** — `orders/create`, `orders/fulfilled`.
- **Product webhooks** — `products/create`, `products/update`.
- **Storefront events** recorded by the modules themselves, including conversion tracking.

Everything is computed in your app database. **Nothing is assembled from a third-party dataset, and nothing is shared with one.** See [Privacy](../legal/privacy.md).

## Plan availability

The `reports` module requires **Growth or higher** and is off by default. The usage meters and module analytics in the admin are part of the platform layer rather than that gated module, so a store on any tier can see how much of its allowance it has spent.

**Industry benchmarks require industry data** and are Scale-only by design; **external ad-platform integrations** require Growth or higher. Both are specified rather than shipped.

## Surfaces

- **Admin:** the Analytics dashboard and the Reports area, plus the `sales-forecasting` and `import-export` feature screens.
- **Server services:** a report engine and a forecasting service.
- **Storefront API:** a conversion-tracking endpoint that records storefront conversion events.
- **Merchant API:** `GET /api/v1/usage` for metered counters.

## What this module does not do

- **It does not replace Shopify Analytics.** Shopify remains the authority on orders, sessions and store-wide revenue.
- **It does not offer a custom report builder** or scheduled exports today.
- **It does not compute cohort retention, lifetime value or UTM attribution** yet.
- **It does not provide industry benchmarks.**
- **It does not track individual shoppers across stores**, and it builds no cross-merchant profile.
- **It does not send analytics to a third party.** Only optional error reporting leaves the system, and only as error metadata.

## FAQ

### Where does the analytics data come from?

From your own store activity — order and product webhooks plus storefront events the modules record — computed in your app database.

### Is my analytics data shared with anyone?

No. Optional error reporting sees error metadata only, never customer analytics, and is off entirely when no key is configured.

### What is actually built today?

Usage meters, module funnels with conversion rates, period filtering (24h/7d/30d/90d), daily trends, per-module event counts and error-rate tracking. Profit-and-loss and product performance are partial; the report builder is not built.

### Can I export a report?

Not yet — export belongs to the unbuilt reports module. You can read metered usage counters programmatically today through `GET /api/v1/usage`.

### Which plan includes advanced reports?

The `reports` module requires Growth or higher. Usage meters and module analytics are platform-level and available on any tier.

### Does Growthify replace Shopify Analytics?

No. It measures what Growthify's own modules do. Shopify stays authoritative for orders, sessions and revenue.

### How do I avoid hitting a plan limit unexpectedly?

Poll `GET /api/v1/usage` and alert on `status` reaching `warning` at 80 %, rather than waiting for `exceeded`.

## Related pages

- [Merchant API v1](../api/merchant-api-v1.md) — the usage endpoint and its `-1` and `0` conventions.
- [Billing plans](../admin/billing-plans.md) — the limits these meters measure against.
- [Entitlements](../admin/entitlements.md) — how metered ceilings are enforced at request time.
- [Privacy](../legal/privacy.md) — what leaves the system and what does not.
