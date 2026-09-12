---
id: consent
title: GDPR cookie consent banner for Shopify — Growthify
sidebar_label: Consent
sidebar_position: 8
description: Growthify cookie consent gives you a configurable banner, category toggles, script blocking until consent, region rules, language packs and an audit log.
keywords: [gdpr cookie consent, shopify cookie banner, consent mode, consent audit log, ccpa, cookie scanner, script blocking, region targeting]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Growthify consent a full legal compliance service?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. It is a configurable banner with category toggles, script blocking, region rules, language packs and an audit log. It is tooling, not legal advice, and it does not determine what your store is obliged to do.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the banner actually block scripts before consent?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, script blocking until consent is part of the module. A banner that only records a choice while trackers already ran is the common failure this is designed to avoid, so configure the categories carefully.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which regions can I target?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The module ships region targeting for the EU, the United Kingdom, Canada, Brazil and the United States, so you can show a banner where it is required rather than everywhere.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does the consent audit log record?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Consent decisions, kept so that you can demonstrate a choice was made rather than assumed. It is the evidence half of consent, which a banner alone does not give you.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is IAB TCF 2.0 supported?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. TCF 2.0 is explicitly out of scope for the current module. If your advertising stack requires a registered TCF consent management platform, this module does not replace one.',
          },
        },
        {
          '@type': 'Question',
          name: 'How many languages does the consent copy support?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Consent copy ships as language packs covering eight languages, with automatic detection from the storefront locale, so a shopper sees accept and reject wording in their own language.',
          },
        },
      ],
    })}
  </script>
</head>

# Cookie Consent

**The consent module is a cookie consent banner with the three things a banner alone does not give you: category-level control, actual script blocking before consent is given, and an audit log that evidences the decision.** It targets GDPR and CCPA-style requirements, and it is tooling rather than legal advice.

## Who this page is for

- **Merchants selling into the EU, UK, Canada, Brazil or US states** with consent obligations.
- **Agencies** who need a consent surface they can configure per client without adding a third-party script.
- **Anyone preparing for review** — by an app store, a data protection authority, or their own counsel.

## What you get

- **A consent banner** with accept-all, reject-all and a preferences path.
- **A preferences modal** with **category toggles**, so a shopper can accept analytics and decline marketing.
- **Script blocking until consent** — the mechanism that makes the choice mean something.
- **Region targeting** for the EU, UK, Canada, Brazil and the US.
- **Language auto-detection** with **consent copy in eight languages**.
- **Consent logging** and **consent proof for audits**.
- **A cookie scanner** to find what your store actually sets.
- **Styling options** so the banner matches the theme.

## Why blocking matters more than the banner

The common failure mode of consent tooling is a banner that records a decision while the trackers it asks about have **already loaded**. The shopper clicks "reject", and the analytics script that ran on page load has long since fired. The banner is then decoration: it produces a record of a choice that was never honoured.

This module **blocks scripts until consent is given**, per category. That places the burden where it belongs — on configuring your categories correctly, so that each script is assigned to the category that governs it. A script left uncategorised is a script that is not being governed.

## The audit log

Consent has two halves: obtaining a decision, and being able to **show** you obtained it.

The module records consent decisions to an audit log, surfaced in the app's compliance view. That is what turns "we have a banner" into something demonstrable to a reviewer or a data protection authority — a banner without a log proves nothing after the fact.

## Region targeting, used deliberately

Region targeting lets you show the banner where it is required rather than to every visitor worldwide. That is a legitimate configuration choice with a real usability benefit.

It is also a choice **you** are making about your obligations. Growthify renders a banner according to the rules you set; it does not determine which regions oblige you, and getting that determination wrong is not something the tool can detect. Take the scope question to counsel and configure accordingly.

## Surfaces

- **Theme blocks:** `cookie-banner` (a body embed, so it renders site-wide) and `cart-terms` for terms acceptance.
- **Storefront API:** consent storage and consent-language endpoints, behind the [app proxy](../storefront/app-proxy.md).
- **Admin:** the Consent module configuration — banner design, categories, language, region rules.
- **Compliance view:** the consent audit log.

The consent banner is one of the few surfaces that renders without you placing a section block, because a consent banner that depends on a merchant remembering to position it is a consent banner that will sometimes be missing.

## Plan availability

The `cookie` module is available from **Free** and is **on by default** — consent is not a capability it makes sense to gate behind a paid tier. **IAB TCF 2.0 is out of scope entirely**, at every tier.

## What the consent module does not do

- **It is not legal advice**, and it does not determine your obligations, your lawful bases, or which regions apply to you.
- **It does not implement IAB TCF 2.0.** If your ad stack requires a registered TCF consent management platform, this does not replace one.
- **It cannot block a script you did not categorise.** Configuration is load-bearing.
- **It does not write your cookie policy** or your privacy notice.
- **It does not govern server-side tracking** initiated outside the storefront.
- **It does not audit your third-party apps' own data practices.** The scanner reports cookies; it does not vouch for vendors.

## FAQ

### Is this a full legal compliance service?

No. It is a configurable banner with category toggles, script blocking, region rules, language packs and an audit log — tooling, not legal advice, and it does not determine what you are obliged to do.

### Does the banner actually block scripts before consent?

Yes, script blocking until consent is part of the module. That is the difference between a consent record and a consent *mechanism* — but it depends on you categorising scripts correctly.

### Which regions can I target?

The EU, the United Kingdom, Canada, Brazil and the United States, so the banner shows where you have decided it is required.

### What does the audit log record?

Consent decisions, kept so a choice can be demonstrated rather than assumed. It is the evidence half of consent, which a banner alone does not provide.

### Is IAB TCF 2.0 supported?

No — explicitly out of scope for this module at every tier.

### How many languages does the consent copy support?

Eight, delivered as language packs with automatic detection from the storefront locale.

### Does the consent module need a paid plan?

No. It is available from Free and enabled by default.

## Related pages

- [Privacy](../legal/privacy.md) — how Growthify itself handles store and shopper data.
- [Webhooks](../api/webhooks.md) — the GDPR topics that handle data requests and erasure.
- [Theme blocks](../storefront/theme-blocks.md) — where `cookie-banner` and `cart-terms` render.
- [Entitlements](../admin/entitlements.md) — the scopes the app requests and why.
