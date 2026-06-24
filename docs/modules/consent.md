---
id: consent
title: Cookie Consent
sidebar_label: Consent
sidebar_position: 8
description: Growthify GDPR cookie consent — a configurable banner, multi-language consent packs, and a reviewer-friendly audit log.
keywords: [gdpr cookie consent, shopify cookie banner, consent mode, consent audit log, ccpa]
---

# Cookie Consent

The consent module (08) provides GDPR/CCPA-style cookie consent.

## What you get

- **Cookie banner** with accept-all / reject-all / preferences.
- **Consent language packs** — localized accept/reject copy (for example Spanish "Aceptar todo" / "Rechazar todo").
- **Audit log** — a record of consent decisions that App Store reviewers and DPAs can inspect.
- Integration with Shopify's Customer Privacy API where applicable.

## Surfaces

- **Theme blocks:** `cookie-banner`, `cart-terms` (for terms acceptance).
- **Storefront API:** consent storage + language endpoints.
- **Admin:** the Consent module config (banner design, categories, language, region rules).
- **Compliance:** the consent audit log is exposed in the app's compliance view.

## FAQ

**Is this a full legal consent management platform?**
It provides a configurable banner, language packs, and an audit log suitable for common GDPR/CCPA needs. It is not legal advice — confirm your obligations with counsel and the [privacy policy](../legal/privacy.md).

**Does it support multiple languages?**
Yes — consent copy is delivered through language packs keyed to the storefront locale.
