---
id: setup
title: "Setting up a white-label Growthify copy, step by step"
sidebar_label: Setup
sidebar_position: 2
description: "The order a licensed Growthify copy goes live in: your Partner app, your domain, your name and colors, the deploy, the licence key, and your first merchant."
keywords: [white label setup, shopify partner app setup, growthify white label domain, custom domain shopify app, white label branding, licence key setup]
last_update:
  date: 2026-11-13
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        { '@type': 'Question', name: 'What do I need before a white-label copy can go live?', acceptedAnswer: { '@type': 'Answer', text: 'A Shopify Partner account you own, a domain or subdomain you control, your app name, and your logo and colors. Everything else is our side of the work.' } },
        { '@type': 'Question', name: 'Whose Shopify Partner account does the app live in?', acceptedAnswer: { '@type': 'Answer', text: 'Yours. The app is created in your Partner account under your app name, so merchants install it from you and see your name.' } },
        { '@type': 'Question', name: 'Do I need to change DNS myself?', acceptedAnswer: { '@type': 'Answer', text: 'Usually one record. We tell you the exact record to add for the domain your merchants will use, and we connect it once it resolves.' } },
        { '@type': 'Question', name: 'When does the licence key arrive?', acceptedAnswer: { '@type': 'Answer', text: 'The licence email arrives once the payment clears, with the key. The key is marked active when your copy is deployed on its domain.' } },
        { '@type': 'Question', name: 'Is a setup time guaranteed?', acceptedAnswer: { '@type': 'Answer', text: 'No. Steps that wait on you, on DNS or on Shopify set the pace, so no fixed time is promised. Each step is listed here in the order it happens.' } },
        { '@type': 'Question', name: 'Can I change my brand after launch?', acceptedAnswer: { '@type': 'Answer', text: 'Yes. A new logo, colors or app name are applied in a later deploy. A change that needs new code is custom work, quoted separately.' } },
      ],
    })}
  </script>
</head>

# Setting up a white-label copy

**Setting up a licensed copy of Growthify means creating your own Shopify app, pointing your domain at the deployment we run, and putting your name, logo and colors on both.** Most of the work is ours. A few steps need you, because they happen in accounts only you can sign in to.

This page is for the person at the buyer's company who owns the setup: often a founder, an agency's technical lead, or whoever holds the Shopify Partner login. It lists every step in the order it really happens, who does it, and what you'll be asked for.

## Before you start

You'll be asked for four things. Having them ready keeps the steps below from waiting on each other.

1. **A Shopify Partner account you own.** The app is created inside it. If you don't have one, Shopify gives them out free at partners.shopify.com. The account is yours, and so is everything Shopify asks of an account holder.
2. **A domain or subdomain for the merchant site**, like `apps.youragency.com`. You need to be able to add one DNS record to it.
3. **Your app name.** It shows in your merchants' Shopify admin, in the theme editor, and on the merchant site. Pick it before the app is created, since Shopify ties the first name to the app's records.
4. **Your brand assets.** A logo, ideally as an SVG, and your colors. If you only have a PNG logo, send the largest one you have.

## The steps

### 1. The order and the licence email

You buy the licence on the [pricing page](https://growthify.aoneahsan.com/white-label/pricing), or, while online payment isn't switched on for Growthify, you send the request form there and we reply by email. When the payment clears, the licence email arrives with your licence key and a link to start setup. A redirect back to the site or the thank-you page never issues anything by itself; the email does, after the payment provider confirms the payment.

### 2. Your app in your Partner account

We send you the exact settings the app needs: its app URL, its allowed redirection URLs, its scopes and the app proxy prefix the theme blocks call. You create the app in your Partner account with your app name and those settings, then invite us as a collaborator, or you share the app's credentials through the secure channel we give you. Either way, the app stays in your account.

The settings come from the same configuration Growthify's own app uses, described on the [configuration page](../getting-started/configuration.md). The app proxy prefix the blocks rely on is covered on the [app proxy page](../storefront/app-proxy.md).

### 3. Your domain

We tell you the one DNS record to add for the merchant site's domain. Once it resolves, we connect it to your deployment and its certificate is issued. DNS changes can take a while to reach everyone; nothing about that is in our hands or yours, so we don't promise a time.

### 4. Your name, logo and colors

We apply your name to the embedded app, the theme app extension and the merchant site, put your logo where Growthify's mark sits now, and set your colors across the merchant site and the parts of the embedded app that carry a brand color. The Shopify admin itself keeps Shopify's own look, because embedded apps follow it.

### 5. The deploy

We deploy your copy: the embedded app, the theme extension with its 72 blocks, the Shopify Functions and UI extensions, and the merchant site. The deployment carries your licence key and serves the licence file described on the [verification page](./verify.md). Your key is marked active at this point.

### 6. A test store, then your first merchant

You install your app on a development store from your Partner account and check it with us: enable a module, add a block in the theme editor, see it on the storefront. When it looks right, your merchants can install it from you.

## Who does what

| Step | You | Us |
|---|---|---|
| Order | Pay, or send the request | Reply, issue the licence email after payment |
| Partner app | Create it with your name and our settings; share access | Send the settings; check them |
| Domain | Add one DNS record | Connect it, issue the certificate |
| Branding | Send your name, logo and colors | Apply them everywhere they belong |
| Deploy | Nothing | Deploy and mark the key active |
| Test store | Install and look | Fix what you find in the setup |

## Listing on the Shopify App Store

A listing is separate from setup and isn't part of the licence. If you want one, you apply in your Partner account; Shopify reviews the app, its listing text and its compliance answers. We prepare the build and help with the technical parts of the review, but Shopify decides, so a listing is never promised. Until you have one, your merchants install your app the way Shopify lets apps outside the store be installed.

## What setup does not do

- **It doesn't move your existing merchants' data** from other apps. Each module's own page in the modules section says what moving from another app involves; the [comparison guides](../compare/index.md) list that per app.
- **It doesn't change features.** A licensed copy is Growthify as it ships. A different module or plan structure is [custom work](https://growthify.aoneahsan.com/white-label/custom-work).
- **It doesn't promise a date.** Steps that wait on you, on DNS or on Shopify set the pace.
- **It doesn't include an Android app** while the mobile group isn't offered.

## After launch

Once your copy is live, updates arrive by deploy for the months your licence includes; the [updates page](./updates.md) explains what counts. A new logo, colors or app name later are applied in a deploy too. A change that needs new code is quoted as custom work.

## FAQ

### What do I need before a white-label copy can go live?

A Shopify Partner account you own, a domain or subdomain you control, your app name, and your logo and colors. Everything else is our side of the work.

### Whose Shopify Partner account does the app live in?

Yours. The app is created in your Partner account under your app name, so merchants install it from you and see your name.

### Do I need to change DNS myself?

Usually one record. We tell you the exact record to add for the domain your merchants will use, and we connect it once it resolves.

### When does the licence key arrive?

The licence email arrives once the payment clears, with the key. The key is marked active when your copy is deployed on its domain.

### Is a setup time guaranteed?

No. Steps that wait on you, on DNS or on Shopify set the pace, so no fixed time is promised. Each step is listed here in the order it happens.

### Can I change my brand after launch?

Yes. A new logo, colors or app name are applied in a later deploy. A change that needs new code is custom work, quoted separately.

## Related pages

- [White-label overview](./index.md): what a licence is and who it suits.
- [Updates and renewals](./updates.md): the included months and renewals.
- [Verify a licence](./verify.md): the licence file each copy serves.
- [App embed](../storefront/app-embed.md): the switch every theme block depends on.
