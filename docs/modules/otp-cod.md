---
id: otp-cod
title: OTP / COD
sidebar_label: OTP / COD
sidebar_position: 11
description: Growthify phone-OTP verification and cash-on-delivery controls to reduce fake COD orders.
keywords: [shopify otp verification, cash on delivery, cod verification, phone otp, reduce fake orders]
---

# OTP / COD

The OTP/COD module (12) reduces fraudulent cash-on-delivery orders with phone verification.

## What you get

- **Phone-OTP verification** — verify a shopper's phone number before placing a COD order.
- **COD controls** — rules for which carts/regions can use cash on delivery.
- **Provider-backed OTP delivery** — send codes via a configured SMS/WhatsApp provider (Twilio).

## Surfaces

- **Storefront API:** `GET /apps/growthify/api/otp/providers` and the OTP verify flow.
- **Admin:** the OTP/COD config (provider selection, COD rules, message templates).

## FAQ

**Which SMS provider does OTP use?**
You bring your own — Twilio is supported for SMS and WhatsApp. Credentials are stored encrypted at rest and decrypted only at send time.

**Does this guarantee no fake orders?**
No tool can. Phone-OTP verification meaningfully reduces fake COD orders by confirming the shopper controls the phone number, but it is one layer, not a guarantee.
