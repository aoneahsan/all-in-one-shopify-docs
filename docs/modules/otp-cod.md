---
id: otp-cod
title: OTP verification and cash on delivery for Shopify
sidebar_label: OTP / COD
sidebar_position: 11
description: Growthify OTP/COD reduces fake cash-on-delivery orders with phone verification, rate-limited codes, attempt caps and auto-cancel for unverified orders.
keywords: [shopify otp verification, cash on delivery, cod verification, phone otp, reduce fake orders, twilio byok, whatsapp otp, order auto cancel]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Which providers can send the OTP?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Email works as the free baseline with no provider needed. For SMS and WhatsApp you bring your own credentials for Twilio, MessageBird or the WhatsApp Business API. Credentials are stored encrypted and decrypted only at send time.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does OTP verification stop fake orders completely?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No tool can. Verification confirms the person controls the phone number or mailbox they gave, which removes the cheapest kind of fake order. It is one layer of defence, not a guarantee.',
          },
        },
        {
          '@type': 'Question',
          name: 'How long is a code valid and how many tries are allowed?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'A code expires after ten minutes. A shopper may attempt verification at most five times, and no more than three codes may be requested in any five minute window.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens to an order that is never verified?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Unverified orders are auto cancelled after a 24 hour timeout, so an unconfirmed cash on delivery order does not sit in your fulfilment queue indefinitely.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are the OTP codes stored in plain text?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Codes are six digits and stored hashed with SHA-256, so the stored value cannot be read back and replayed. Provider credentials are separately encrypted at rest.',
          },
        },
        {
          '@type': 'Question',
          name: 'Do I need Shopify Plus for this module?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Not for the storefront verification flow. Checkout UI extensions require Shopify Plus, so verification presented inside checkout itself carries that Shopify side requirement while the storefront flow does not.',
          },
        },
      ],
    })}
  </script>
</head>

# OTP / COD

**The OTP/COD module reduces fraudulent cash-on-delivery orders by requiring a shopper to prove they control the contact details they entered, before the order is treated as real.** For stores in markets where cash on delivery is the norm, unverified orders are a direct cost: goods shipped, delivery attempted, nobody home, freight paid twice.

## Who this page is for

- **Merchants offering cash on delivery**, particularly in markets where it is the dominant payment method.
- **Operations teams** carrying the cost of failed deliveries and wanting to reduce it at the source.
- **Anyone evaluating verification honestly**, including what it cannot do.

## How verification works

1. A shopper places a cash-on-delivery order.
2. Growthify generates a **six-digit code** and sends it to the contact detail provided.
3. The shopper enters the code.
4. On success the order is marked verified and proceeds normally.
5. If the code is never entered correctly, the order is **auto-cancelled after 24 hours**.

### The guard rails, stated precisely

| Control | Value |
| --- | --- |
| Code length | 6 digits |
| Code storage | SHA-256 hashed, never plaintext |
| Code expiry | 10 minutes |
| Maximum verification attempts | 5 |
| Code request rate limit | 3 per 5 minutes |
| Unverified order timeout | 24 hours, then auto-cancel |

These numbers are not decoration. **Hashing the code** means a stored value cannot be read back and replayed. **The attempt cap** makes brute-forcing six digits impractical. **The request rate limit** stops the verification channel being used to spam a phone number — an abuse path that costs you money and annoys someone who never visited your store.

## Delivery channels

- **Email** — the free baseline, requiring no provider setup at all.
- **SMS** — via Twilio or MessageBird, using **your own credentials**.
- **WhatsApp** — via the WhatsApp Business API, again with your credentials.

All provider credentials are **bring-your-own-key**, stored **encrypted at rest** and decrypted only at send time. They are per-shop values entered in the admin, never deployment configuration.

Bring-your-own-key is deliberate: SMS and WhatsApp cost money per message, and that cost belongs to the merchant sending them, on the merchant's own account, with the merchant's own sender identity and delivery rates.

## COD controls

Beyond verification, the module carries rules for **which carts and regions may use cash on delivery** — so a store can offer it where it works and withhold it where the failure rate makes it uneconomic. That is often a larger lever than verification itself.

## Surfaces

- **Storefront API:** an OTP providers endpoint and the send/verify flow, behind the [app proxy](../storefront/app-proxy.md).
- **Admin:** the OTP/COD configuration — provider selection and credentials, COD rules, message templates.
- **Checkout:** presenting verification inside checkout itself requires Shopify Plus, which is a Shopify constraint rather than a Growthify one.

## What verification actually proves

Worth being exact, because this is where honest framing matters most.

Verification proves that **someone had access to the mailbox or phone number entered at the moment the code was sent**. That is a meaningful signal and it removes the cheapest class of fake order — a made-up number typed into a form.

It does not prove the person intends to accept delivery, that the address is real, that the name is theirs, or that they will have cash when the courier arrives. A determined bad actor with a working phone passes verification.

**It is one layer, not a guarantee**, and any claim otherwise would be false.

## Current state

The verification flow, hashing, expiry, rate limiting, attempt caps, auto-cancel and the three provider interfaces are built. The module is recorded internally as partial, so expect the configuration surfaces and templating to continue developing rather than to be final.

## What the OTP/COD module does not do

- **It does not eliminate fraudulent orders**, and it does not assess creditworthiness or intent.
- **It does not supply SMS or WhatsApp credit.** Provider costs are yours, on your own account.
- **It does not verify addresses** — only the contact detail the code was sent to.
- **It does not work inside checkout without Shopify Plus.**
- **It does not replace payment capture.** A verified cash-on-delivery order is still unpaid until delivery.
- **It does not maintain a cross-store blocklist** of known bad numbers.

## FAQ

### Which providers can send the OTP?

Email is the free baseline and needs no provider. For SMS and WhatsApp you bring your own Twilio, MessageBird or WhatsApp Business credentials, stored encrypted and decrypted only at send time.

### Does OTP verification stop fake orders completely?

No tool can. It confirms control of the number or mailbox given, which removes the cheapest kind of fake order. One layer, not a guarantee.

### How long is a code valid and how many tries are allowed?

Ten minutes; five verification attempts; no more than three codes requested per five-minute window.

### What happens to an order that is never verified?

It is auto-cancelled after 24 hours, so unconfirmed orders do not accumulate in your fulfilment queue.

### Are codes stored in plain text?

No — six digits, stored SHA-256 hashed, so a stored value cannot be read back and replayed. Provider credentials are separately encrypted at rest.

### Do I need Shopify Plus?

Not for the storefront verification flow. Presenting verification inside checkout uses checkout UI extensions, which require Plus.

### Why bring-your-own-key rather than included messaging?

Because SMS and WhatsApp cost per message. The cost, the sender identity and the delivery rates belong on your own provider account.

## Related pages

- [Configuration](../getting-started/configuration.md) — why provider credentials are not environment variables.
- [Entitlements](../admin/entitlements.md) — how module access is gated and enforced.
- [Privacy](../legal/privacy.md) — how contact details and submissions are handled.
- [Webhooks](../api/webhooks.md) — the order events this module reacts to.
