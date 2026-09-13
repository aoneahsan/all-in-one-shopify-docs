---
id: terms
title: "Growthify terms of service — a summary for merchants"
sidebar_label: Terms
sidebar_position: 2
description: "A documentation summary of the Growthify Terms of Service: billing, refunds, acceptable use, BYOK responsibility and the liability cap on claims."
keywords: [growthify terms, shopify app terms of service, refund window, acceptable use policy, byok responsibility, limitation of liability]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'How do I cancel Growthify, and when does access end?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Uninstalling the app terminates the agreement, and a subscription is cancelled from your Shopify admin. The Terms state that access continues until the end of the period you have paid for.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I get a refund for a Growthify charge?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Terms provide a 14-day window: contact support within 14 days of the charge. Shopify processes the refund itself, because Shopify took the payment.',
          },
        },
        {
          '@type': 'Question',
          name: 'What uptime do the Growthify Terms commit to?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A target of 99.9 percent measured monthly, with maintenance windows announced at least 24 hours in advance through the channel the Terms name.',
          },
        },
        {
          '@type': 'Question',
          name: 'Who is responsible for consent when I send marketing through Growthify?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'You are. The Terms require the merchant to obtain proper customer consent before collecting emails or phone numbers, and to comply with CAN-SPAM for email and TCPA for SMS.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Growthify guarantee results from its SEO or forecasting features?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No, and the Terms say so in four specific places: SEO results are not guaranteed, sales forecasts are estimates, tax and shipping figures are the merchant responsibility to verify, and age verification is not a substitute for legal compliance.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the limit on Growthify liability?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The Terms cap maximum liability at the fees paid in the previous 12 months, and exclude liability for problems caused by third-party services a merchant connects with their own credentials.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can I copy or reuse the Growthify source?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The product is proprietary and all rights are reserved. The Terms prohibit copying, modifying and reverse engineering the app, and the application source repository is not public.',
          },
        },
      ],
    })}
  </script>
</head>

# Terms (summary)

**This page is a documentation summary of the Growthify Terms of Service. It is not the agreement.** The canonical, legally binding Terms are published at **https://growthify.aoneahsan.com/terms**, and they govern wherever the two differ. This summary reflects the Terms last updated 23 May 2026, effective 1 June 2026. Growthify is operated by Ahsan Mahmood, referred to in the Terms as the Operator.

## Who this page is for

- **Merchants** who want the commercial shape of the agreement before reading it in full.
- **Agencies** advising a client on what obligations installing the app transfers to them.

## Acceptance

Installing, accessing or using the app is acceptance of the Terms. There is no separate signature step, which is standard for a Shopify app and worth stating plainly: the install click is the agreement.

## Billing, cancellation and refunds

Billing runs entirely through the Shopify App Subscription API. Four tiers exist — Free, Pro at $29, Growth at $79 and Scale at $199 a month — and the practical consequences of billing through Shopify are these:

- **A charge appears on your Shopify invoice.** Growthify never handles card details.
- **Cancelling is done in Shopify**, and the Terms state that access continues until the end of the period already paid for.
- **Uninstalling terminates the agreement.** That is the merchant's own termination route, stated as such.
- **Refunds run on a 14-day window.** Contact support within 14 days of a charge; Shopify processes the refund, because Shopify took the payment.

The tiers, their limits and how a plan change propagates are on [Billing plans](../admin/billing-plans.md).

## Service level

The Terms state a **target of 99.9% uptime, measured monthly**, and commit to announcing maintenance windows **at least 24 hours in advance** through the channel the Terms name.

Read that as what it says: a target and a notice commitment, not an SLA with credits attached. The Terms define no service-credit remedy, and this page will not imply one.

## Data portability

Two commitments, and they operate on different clocks:

- **While installed:** you may export your shop's Growthify configuration at any time from the admin's settings.
- **After uninstall:** configuration is retained for **48 hours** and then permanently deleted, which is Shopify's `shop/redact` webhook arriving and the deletion handler running. The Terms and the privacy policy both also carry an outer commitment that data is deleted within 30 days of uninstall.

The 48-hour figure and the 30-day figure are not in conflict — one is the mechanism, the other is the outer bound. What the mechanism actually deletes is on [Webhooks](../api/webhooks.md).

## Acceptable use: what the Terms ask of you

The Terms place specific obligations on the merchant, and every one of them is about the people on the other side of a feature:

- **Obtain proper customer consent** before collecting email addresses or phone numbers.
- **Comply with CAN-SPAM** for email marketing and **TCPA** for SMS marketing.
- **Use AI features ethically and legally.**
- **Do not use any feature for spam, fraud or illegal activity.**
- **Provide accurate product information.**

And five uses are prohibited outright: sending unsolicited email or SMS without consent; using AI to generate misleading content; **manipulating social proof with fake data**; self-referrals in the affiliate programme; and violating the policies of a platform you have connected.

The third of those deserves emphasis, because the app makes it easy. Social-proof notifications, countdown timers and scarcity indicators are tools for presenting real facts about a real store. Populating them with invented activity breaches these Terms, and it is also the category of behaviour that consumer-protection regulators act on.

## Bring your own key: what you take on

For AI, email, SMS and social features you supply your own provider credentials. The Terms assign you three things with them:

1. **The costs** the provider charges.
2. **Compliance with that provider's terms.**
3. **Responsibility for how that provider handles data.**

Growthify disclaims liability for third-party service issues. This is the deliberate trade of the BYOK model rather than fine print: the provider relationship is yours, so the account, the bill and the data-protection assessment are too. How the credentials themselves are stored is on [Privacy](./privacy.md).

## Outcomes the Terms do not promise

Four disclaimers are stated explicitly, and they map exactly onto the four features a merchant is most likely to over-read:

| Feature | What the Terms say |
| --- | --- |
| SEO tooling | SEO results are not guaranteed. |
| Sales forecasting | Forecasts are estimates only. |
| Tax and shipping calculators | You are responsible for the accuracy of the figures. |
| Age verification | Not a substitute for legal compliance. |

The [OTP and COD module](../modules/otp-cod.md) is documented in the same spirit: phone verification reduces fraudulent orders, and cannot eliminate them.

**Liability is capped** at the fees paid in the previous 12 months.

## Intellectual property

The Growthify product is **proprietary, and all rights are reserved**. The Terms prohibit copying, modifying and reverse engineering the app, and the application's source repository is not public. This documentation site exists to describe how the product works for people using it — not as a grant of any right to reuse it.

## Termination

The Operator may terminate access for a breach of the Terms, fraudulent activity, illegal use, or non-payment. You terminate by uninstalling the app, which also starts the deletion sequence described above.

## Changes to the Terms

The Terms may be updated with **30 days' notice**, and continued use after an update constitutes acceptance. Because the canonical document carries its own "Last Updated" date, that date — not this page — is the authority on which version currently applies.

## What this summary does not cover

- **It does not govern.** The published Terms do, and they are the document to cite or dispute.
- **It is not legal advice**, and reading it is not a substitute for your own review.
- **It does not restate the company identity, postal address or governing-law provisions.** Those live in the canonical documents, and this page will not paraphrase them.
- **It does not create any commitment the published Terms do not make** — no uptime credits, no response-time guarantee, no warranty of results.
- **It does not cover data handling in detail.** That is [Privacy](./privacy.md), which is a separate document with its own date.

:::warning Not legal advice
This is a convenience summary. The published Terms of Service govern.
:::

## FAQ

### How do I cancel, and when does access end?

Cancel the subscription in your Shopify admin, or uninstall to terminate the agreement. The Terms state access continues to the end of the paid period.

### Can I get a refund?

Contact support within 14 days of the charge. Shopify processes the refund.

### What uptime do the Terms commit to?

A 99.9% monthly target, with at least 24 hours' notice before maintenance.

### Who is responsible for consent when I send marketing?

You are — including CAN-SPAM for email and TCPA for SMS.

### Does Growthify guarantee SEO or forecasting results?

No. Four disclaimers name SEO, forecasting, tax and shipping figures, and age verification specifically.

### What is the liability limit?

The fees paid in the previous 12 months, with third-party provider issues excluded.

### Can I copy or reuse the source?

No. The product is proprietary, all rights are reserved, and the application repository is not public.

## Related pages

- [Privacy](./privacy.md) — what is processed, retained and erased.
- [Billing plans](../admin/billing-plans.md) — the tiers these billing terms apply to.
- [Webhooks](../api/webhooks.md) — the deletion mechanism behind the retention commitments.
- [Entitlements](../admin/entitlements.md) — how a plan becomes an enforced permission.
