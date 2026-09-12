---
id: popups
title: Shopify popups and lead capture with Growthify
sidebar_label: Popups
sidebar_position: 3
description: Growthify popups cover email capture, spin-to-win, exit intent and announcement bars, with a field builder, targeting rules and frequency capping.
keywords: [shopify popups, email capture popup, spin to win, exit intent popup, announcement bar, popup targeting, frequency capping]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Where do captured email addresses go?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'They persist in the app database against your shop. When you connect an email provider in the admin, submissions sync to it as well. Provider credentials are stored encrypted at rest and decrypted only at send time.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many popups can I run at once?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Free plan allows one active popup. Pro, Growth and Scale all allow unlimited active popups. The limit is enforced by the server at the request that creates or activates a popup, not only in the admin interface.',
          },
        },
        {
          '@type': 'Question',
          name: 'Will a popup slow my store down?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The popup runtime loads only when the module is enabled, and the announcement bar is server-rendered Liquid that needs no JavaScript to appear. A store with popups disabled downloads none of this code.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I show different popups on different pages?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. Page targeting matches URL patterns with wildcards, and device targeting can restrict a popup to mobile, tablet or desktop. Both are set per popup in the admin.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the popup module handle consent for marketing email?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A popup can include a consent checkbox and the submission records it, but the popup module is not a consent management platform. Cookie and tracking consent is the separate consent module.',
          },
        },
        {
          '@type': 'Question',
          name: 'How do I stop a popup reappearing on every page view?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Frequency capping controls how often a given shopper sees a popup after dismissing or submitting it. Set it per popup rather than relying on the trigger alone.',
          },
        },
      ],
    })}
  </script>
</head>

# Popups

**The popups module is Growthify's lead-capture and announcement surface: a configurable set of popup types with their own trigger rules, targeting, form fields and frequency caps, plus a lightweight site-wide announcement bar.** It covers the job most stores hire a dedicated email-capture app for.

## Who this page is for

- **Merchants** building an email list, running a promotion, or announcing shipping cut-offs and sales.
- **Agencies** who need targeting and frequency rules they can reason about rather than a single global toggle.
- **Anyone auditing storefront weight** who wants to know what a popup actually costs a page.

## Popup types

| Type | Typical use |
| --- | --- |
| Modal | A centred overlay for email capture or a headline offer |
| Slide-in | A corner panel that is less interruptive than a modal |
| Top / bottom bar | Persistent site-wide messaging |
| Spin-to-win | A gamified wheel that trades engagement for an email address |
| Welcome | First-visit introduction or discount |
| Free-shipping | Threshold messaging tied to a promotion |

The **announcement bar** is a separate, simpler block for site-wide messages, rendered as Liquid rather than as a JavaScript popup.

## Triggers

A popup opens on one of:

- **Time delay** — after a set number of seconds on the page.
- **Scroll percentage** — once the shopper has read a proportion of the page.
- **Exit intent** — when pointer movement suggests the visitor is leaving.

Exit intent depends on a pointer, so on touch devices a time or scroll trigger is the practical choice. Pair triggers with device targeting rather than assuming exit intent works everywhere.

## Targeting and frequency

- **Page targeting** matches URL patterns with wildcards, so a popup can be scoped to a collection, a product range or a single landing page.
- **Device targeting** restricts a popup to mobile, tablet or desktop.
- **Frequency capping** controls how often a shopper sees a popup again after dismissing or submitting it.

Frequency capping is the setting most often skipped and most often regretted. A trigger decides *when* a popup may open; the cap decides whether a returning visitor sees it for the fifth time.

## The form-field builder

Each popup defines its own fields rather than taking a fixed shape:

- Field types for email, name, phone and custom values.
- Per-field **label**, **placeholder** and **required** flag.
- An optional **consent checkbox**, recorded with the submission.

Submissions persist server-side against your shop. When you connect an email or ESP provider in the admin, they sync there as well — and those provider credentials are stored **encrypted at rest**, decrypted only at send time, never as deployment configuration.

## Surfaces

- **Theme blocks:** `popup-widget` (a body embed) and `announcement-bar` (a section block).
- **Storefront API:** popup configuration, announcement configuration, and the submission endpoint — all behind the [app proxy](../storefront/app-proxy.md).
- **Admin:** the Popup module configuration — types, triggers, design, fields, targeting and capping.

## Plan limits

The Free plan allows **one active popup**; Pro, Growth and Scale allow **unlimited**. The monthly **view allowance** is also plan-dependent — 10,000 on Free, 100,000 on Pro, 500,000 on Growth and unlimited on Scale — and popup views are one of the metered counters you can read through the [Merchant API](../api/merchant-api-v1.md).

Limits are enforced by the server at the request that creates or activates a popup. The admin reflects them; it is not the thing that imposes them.

## What the popups module does not do

- **It is not an email marketing platform.** It captures addresses and syncs them to a provider you connect. It does not send campaigns, build sequences or manage deliverability.
- **It is not a consent management platform.** A popup can carry a consent checkbox, but cookie and tracking consent belongs to the [consent module](./consent.md).
- **It does not A/B test popups** with automatic winner selection.
- **Exit intent cannot work without a pointer**, so it is unreliable on touch devices by nature rather than by omission.
- **It does not guarantee conversion.** A popup is an interruption; whether it earns its place is a question about your offer.
- **It does not deduplicate against your existing subscriber list** held in another system.

## FAQ

### Where do captured email addresses go?

They persist in the app database against your shop. If you connect an email provider in the admin, submissions sync there too. Provider credentials are stored encrypted at rest and decrypted only at send time.

### How many popups can I run at once?

One active popup on Free; unlimited on Pro, Growth and Scale. The limit is enforced server-side at the request that creates or activates a popup.

### Will a popup slow my store down?

The popup runtime loads only when the module is enabled, and the announcement bar is server-rendered Liquid needing no JavaScript. With popups disabled, none of this code is downloaded.

### Can I show different popups on different pages?

Yes — page targeting matches URL patterns with wildcards, and device targeting restricts by mobile, tablet or desktop. Both are per popup.

### Does the popup module handle consent for marketing email?

A popup can include a consent checkbox and the submission records it, but cookie and tracking consent is the separate [consent module](./consent.md).

### How do I stop a popup reappearing constantly?

Set frequency capping per popup. The trigger decides when a popup may open; the cap decides whether a returning visitor sees it again.

### Does exit intent work on phones?

Not reliably — it infers departure from pointer movement, which touch devices do not provide. Use a time or scroll trigger for mobile, scoped with device targeting.

## Related pages

- [Theme blocks](../storefront/theme-blocks.md) — where `popup-widget` and `announcement-bar` render.
- [Billing plans](../admin/billing-plans.md) — popup and view allowances per tier.
- [Consent](./consent.md) — the module that actually governs tracking consent.
- [Merchant API v1](../api/merchant-api-v1.md) — reading popup view counters from your own systems.
