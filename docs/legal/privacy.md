---
id: privacy
title: "Growthify privacy summary for Shopify app merchants"
sidebar_label: Privacy
sidebar_position: 1
description: "A documentation summary of what Growthify processes, where it is stored, how long it is kept, and how the three GDPR webhooks export and erase it."
keywords: [growthify privacy, shopify app privacy, protected customer data, gdpr data processor, data retention, byok data flow]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Is Growthify a data controller or a data processor?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A processor. The merchant is the controller of their store and customer data; Growthify processes it to provide the features the merchant has enabled.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does Growthify store my customers personal data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes, where the features you enable collect it: popup and SMS subscribers, review authors, stock alert requests, loyalty members, contact form messages and similar. Which models and columns hold buyer data is declared in a registry inside the app, and a build check fails if a new column of that kind is not classified.',
          },
        },
        {
          '@type': 'Question',
          name: 'What does Growthify explicitly not collect?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Payment card details, government identifiers, biometric data and precise geolocation. The published policy also states that Growthify does not sell data or share it with third parties for their own marketing.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long is data kept after I uninstall?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Processing stops at uninstall. Shopify sends the shop/redact webhook about 48 hours later and the handler deletes the shop record and everything keyed to it. The published policy states an outer commitment of deletion within 30 days of uninstallation.',
          },
        },
        {
          '@type': 'Question',
          name: 'Where do the credentials I enter for email and SMS go?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'They are encrypted with AES-256 before being stored, with a fresh initialisation vector per value, and decrypted only when a send is performed.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to data when I use a bring-your-own-key feature?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'It goes to the provider you configured, under that provider terms. The published policy is explicit that you are responsible for checking a provider you choose meets your requirements.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does the age verification feature store dates of birth?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. The published policy states that the age verification feature helps a merchant comply with age restrictions and does not collect or store birthdates.',
          },
        },
      ],
    })}
  </script>
</head>

# Privacy (summary)

**This page is a documentation summary of how Growthify handles data. It is not the policy.** The canonical, legally binding privacy policy is published on the marketing site at **https://growthify.aoneahsan.com/privacy-policy**, and that document governs wherever the two differ. This summary reflects the policy last updated 12 September 2026, effective 1 June 2026.

## Who this page is for

- **Merchants** deciding whether to install, and what they will need to tell their own customers.
- **Compliance reviewers** who want the mechanism rather than the prose.
- **Developers** who need to know which fields cross which boundary.

## Roles: you are the controller

Growthify acts as a **data processor**. Your store's data and your customers' data are yours; Growthify processes them to deliver the features you have switched on. A Data Processing Agreement is available to merchants on request, as the published policy states.

That division is the reason several answers on this page are "it depends what you enabled": a module you never turn on collects nothing.

## What Growthify processes

**Store data, under the granted scopes.** Products, orders, customers and themes — seven scopes in all, each justified per scope on the [Entitlements](../admin/entitlements.md) page. Two of them, `read_orders` and `read_customers`, are **Protected Customer Data** under Shopify's rules, which is why the app completes Shopify's Protected Customer Data questionnaire covering use, retention and encryption.

**Storefront submissions, created by your shoppers.** Popup and newsletter captures, review submissions, wishlist items, stock-alert requests, contact-form messages, live-chat messages, loyalty enrolment, returns requests and product-customisation input, depending entirely on which modules you enable.

**Operational metadata.** Plan and subscription status from Shopify App Subscriptions, and the logs that record a webhook was processed.

### Buyer personal data is stored, and that is stated plainly

An earlier version of this app claimed it stored no customer personal data. That claim was false — the schema holds buyer emails, phone numbers, names and IP addresses across many models — and it had been shown to merchants before it was corrected in August 2026. It is worth naming because it explains the mechanism that replaced it:

- A single **PII registry** inside the app declares which models and which columns hold buyer-identifying data.
- The GDPR handlers act through that registry rather than through a list somebody maintains by hand.
- A **build-time parity check fails** when a model gains a buyer-identifying column without being classified in the registry.

So the erasure path cannot quietly fall behind the schema, which is the failure mode that produced the original false claim.

## What Growthify does not collect

The published policy is explicit on four categories, and they are worth repeating because their absence is a design decision rather than an omission:

- **Payment card details.** Billing runs through Shopify App Subscriptions; card data never reaches the app.
- **Government identifiers** of any kind.
- **Biometric data.**
- **Precise geolocation.** Country or region inferred from an IP address is used where a feature needs it — currency and age gating — and nothing finer.

The policy also states that Growthify does not sell customer data, does not share it with third parties for their own marketing purposes, and does not use third-party advertising or tracking cookies.

## Where it is stored

- **Store and submission data** live in the app's managed **PostgreSQL** database, scoped per shop.
- **Provider credentials you enter** — for email, SMS, social posting and AI features — are encrypted with **AES-256** before storage, with a fresh initialisation vector per value, and decrypted only at the moment a send or a call is made.
- **Error reporting** processes error metadata to diagnose faults. It is not customer analytics.
- **Some storefront state stays in the shopper's browser**, not on a server: recently-viewed products and comparison selections are local storage by design.

## Retention

These are the periods the published policy commits to. Where a feature is configurable, the policy states the default.

| Data | Retention |
| --- | --- |
| Social proof events | 24 to 48 hours |
| Chat messages | Configurable; default 90 days |
| Returns documentation | 90 days |
| Order tracking data | Until delivered, plus 30 days |
| Analytics data | Aggregated and anonymised after 13 months |
| Affiliate tracking cookies | 30 to 90 days, configurable |
| Import and export temporary files | Deleted immediately after processing |
| Everything, after uninstall | Within 30 days |

## Deletion, and how it actually runs

Three Shopify webhooks implement the GDPR contract, and each writes an evidence row rather than a fixed acknowledgement:

| Request | Effect |
| --- | --- |
| `customers/data_request` | Collects everything held for that customer in that shop and records the export with a count of the rows found. |
| `customers/redact` | Deletes that customer's stored rows in that shop and records how many were affected. |
| `shop/redact` | Deletes the shop record and every row keyed to it. Shopify sends it roughly 48 hours after uninstall. |

Two details are worth knowing because they are what make the log trustworthy. The outcome is recorded as what actually happened — a customer who had no rows is logged differently from a request that was never processed — and the email in that log is **hashed**, with a digest of the payload stored instead of the payload. And if one of these handlers fails, it re-raises so Shopify retries: an erasure that silently did not happen is the one outcome the design refuses to allow.

Deletion works by removing the shop record and letting the schema's declared cascades take everything below it, which is what makes coverage complete as the schema grows. The mechanism, and the test that proves it, are on [Webhooks](../api/webhooks.md).

## Your rights

The published policy sets out the GDPR rights — access, rectification, erasure, restriction, portability, objection, withdrawal of consent, and lodging a complaint with a supervisory authority — together with the legal basis it relies on for each kind of processing: consent for marketing messages, contract for providing the service, legitimate interest for fraud prevention and service improvement, and legal obligation where one applies.

For California residents the policy sets out the CCPA rights, including the right to know, delete and opt out, states that Growthify does not sell personal information, and commits to responding within 45 days.

Do Not Track browser signals are honoured. The Services are not intended for children under 13, or under 16 in the EEA.

Data requests go to **support@growthify.aoneahsan.com**. The canonical policy carries the full contact list.

## Bring your own key: data that leaves

Several features run on credentials you supply, and when they do, data goes where you pointed it:

| Feature | Destination |
| --- | --- |
| AI-assisted screens | Your AI provider |
| Email marketing | Your email service provider |
| SMS marketing | Your SMS provider |
| Social auto-posting | Your connected social accounts |
| Shipping estimates | Carrier APIs |
| Tax estimates | Your tax service |

The policy is explicit that a provider you choose is yours to evaluate, and that Growthify is not liable for how that provider handles data. This is the honest trade for BYOK: the account, the costs and the data-protection assessment stay with you.

## What this page does not do

- **It does not govern.** The published policy does, and it is the document to cite.
- **It is not legal advice**, and it is not a substitute for your own assessment of your obligations to your customers.
- **It does not enumerate every model or column.** The PII registry inside the app is the exhaustive list, and it is not a public document.
- **It does not cover the Growthify marketing site or account app** as a separate matter. That is the same published policy's scope, not this page's.
- **It does not make compliance claims on your behalf.** The app provides consent, age-gating and erasure mechanisms; whether your use of them satisfies a given regulation is yours to determine.
- **It does not state company identity, postal address or jurisdiction.** Those belong to the canonical documents.

:::warning Not legal advice
This is a documentation convenience. The published privacy policy governs, and nothing here is legal advice.
:::

## FAQ

### Is Growthify a controller or a processor?

A processor. You are the controller of your store and customer data.

### Does Growthify store my customers' personal data?

Yes, where the features you enable collect it. A registry inside the app declares exactly which models and columns, and a build check fails when a new buyer-identifying column is not classified.

### What does Growthify explicitly not collect?

Payment card details, government identifiers, biometric data and precise geolocation — and it does not sell data or use third-party advertising cookies.

### How long is data kept after I uninstall?

Processing stops at uninstall; `shop/redact` arrives about 48 hours later and deletes the shop record and everything keyed to it. The published policy's outer commitment is 30 days.

### Where do the credentials I enter go?

Encrypted with AES-256 before storage, with a per-value initialisation vector, and decrypted only at send time.

### What happens to data in a bring-your-own-key feature?

It goes to the provider you configured, under that provider's terms, which the policy makes explicitly your responsibility to evaluate.

### Does age verification store dates of birth?

No — the published policy states the feature does not collect or store birthdates.

## Related pages

- [Webhooks](../api/webhooks.md) — the three GDPR handlers, their logs and their retry behaviour.
- [Entitlements](../admin/entitlements.md) — the seven scopes and the reason each is requested.
- [Terms](./terms.md) — billing, acceptable use and liability.
- [Merchant API v1](../api/merchant-api-v1.md) — which fields a read-only integration can and cannot receive.
