---
id: theme-blocks
title: "Growthify theme blocks — 72 Shopify app blocks by target"
sidebar_label: Theme blocks
sidebar_position: 2
description: "Growthify ships 72 Liquid app blocks for Shopify themes: five body embeds, one head embed and 66 section blocks, each grouped by where it renders."
keywords: [shopify app blocks, theme app extension blocks, liquid app blocks, growthify blocks, app embed vs app block, theme editor blocks]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I need to add all 72 theme blocks?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Only the Growthify Embed is required. Everything else is added block by block, so a store that uses three modules places a handful of blocks and ignores the rest.',
          },
        },
        {
          '@type': 'Question',
          name: 'What is the difference between an app embed and an app block?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'An app embed targets the theme document rather than a position in a template, so it applies theme-wide once enabled. An app block is placed inside a section, so you choose the template and the position. Growthify has six embeds and 66 section blocks.',
          },
        },
        {
          '@type': 'Question',
          name: 'Does adding a block edit my theme code?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Theme app extension blocks are served from the app rather than written into your theme files, so uninstalling the app removes their output and leaves no orphaned Liquid behind.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much JavaScript does a Growthify block add to my storefront?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Only two files always load, and together they are roughly 5 KB. Everything else is per block or per module and loads on demand, so an unused block costs nothing.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does my block render but show no data?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Almost always because the Growthify Embed is off, or because its app proxy prefix does not match the one the app is configured with. A block with no base URL has no server to ask.',
          },
        },
        {
          '@type': 'Question',
          name: 'Are the theme blocks translated?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'The extension ships 15 locale files covering the block interface strings. Content you write yourself, such as a popup headline or an FAQ answer, is not translated for you.',
          },
        },
        {
          '@type': 'Question',
          name: 'Can a Growthify block appear in Shopify checkout?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Checkout is closed to theme blocks. Growthify reaches the post-purchase surfaces with separate checkout UI extensions instead.',
          },
        },
      ],
    })}
  </script>
</head>

# Theme blocks

**A Growthify theme block is a Liquid app block, served from the app's theme app extension, that a merchant adds to a Shopify theme through the Theme Editor — no theme code is edited and nothing is copied into the theme's files.** Growthify ships **72** of them, and that number is not a marketing figure: the extension's build regenerates a block manifest on every run, and the count comes from that file.

## Who this page is for

- **Merchants** deciding which blocks to place, and where.
- **Agencies** rebuilding a storefront on a new theme and needing the placement list up front.
- **Developers** auditing what the extension can inject before approving an install.

## The three targets, and why the distinction matters

Every block declares a `target`, and that one word decides how a merchant reaches it in the Theme Editor. Getting it wrong is the most common reason someone cannot find a block they have read about.

| Target | Count | Where it appears | Behaviour |
| --- | ---: | --- | --- |
| `body` | 5 | **App embeds** | Applies theme-wide once enabled. No position to choose. |
| `head` | 1 | **App embeds** | Injected into the document head; emits markup, not visible UI. |
| `section` | 66 | **Add block**, inside a section | You choose the template and the position. |

So the Theme Editor shows **six Growthify entries under App embeds** and 66 blocks available for placement. The five body embeds are `age-verification`, `cart-drawer`, `cookie-banner`, `growthify-embed` and `popup-widget`; the single head embed is `seo-meta-tags`.

## The one embed that is not optional

- **`growthify-embed`** — listed in the Theme Editor as **Growthify**. It injects `window.gfConfig` and boots the loader. See [App embed](./app-embed.md) for what it defines and why every data-driven block depends on it.

The other four body embeds render their own markup and settings, but their behaviour arrives with a module runtime that the loader fetches. Turning them on while **Growthify** is off produces markup that never wakes up.

## Product page

`product-badge`, `review-badges`, `review-form`, `reviews-carousel`, `all-reviews-page`, `size-chart`, `variant-swatches`, `quick-view`, `product-360`, `product-videos`, `product-comparison`, `product-customizer`, `quantity-breaks`, `bogo-badge`, `bundles-widget`, `mix-match-bundle`, `fbt-widget`, `preorder-badge`, `stock-scarcity`, `stock-alert`, `delivery-date`, `wishlist-button`, `wishlist-share`, `save-for-later`, `sticky-atc`, `subscriptions`.

## Cart

`cart-drawer`, `cart-addons`, `cart-crosssell`, `cart-countdown`, `cart-donation`, `cart-terms`, `free-gift-notice`, `gift-message`, `shipping-protection`, `shipping-calculator`, `tax-estimate`.

## Collection and search

`collection-sort`, `product-filters`, `storefront-search`, `recently-viewed`, `social-proof-notifications`.

## Site-wide and navigation

`announcement-bar`, `countdown-timer`, `popup-widget`, `cookie-banner`, `age-verification`, `mega-menu`, `language-switcher`, `currency-converter`, `live-chat`, `loyalty-widget`, `referral`, `integration-widget`, `custom-code`, `seo-meta-tags`, `store-locator`, `order-tracking`, `returns`, `customer-account`, `contact-form-builder`, `faq-accordion`, `push-subscribe`, `wholesale-pricing`.

## Page-builder sections

`page-hero`, `page-countdown`, `page-features`, `page-testimonials`, `page-faq`, `page-comparison`, `page-cta` — the seven sections the [page builder](../modules/page-builder.md) composes a landing page from.

## How a block gets its data

A block is Liquid, so its markup is rendered by Shopify and is present in the HTML a crawler reads. Anything dynamic follows a second step:

1. The block renders its container and its merchant settings.
2. Its JavaScript, where it has any, reads `window.gfConfig.appUrl` for a base URL.
3. It calls the backend through the [app proxy](./app-proxy.md), which makes the request same-origin to the shop and signs it on the way through.
4. The response fills the container.

That ordering explains a block that looks correct and stays empty: step 1 does not depend on Growthify being reachable, and steps 2 to 4 do.

## Weight, and what actually loads

The manifest totals the extension's assets at **377.1 KB of JavaScript and 165.4 KB of CSS before minification** — across all 72 blocks, which is not what any storefront downloads.

What a real page loads is much narrower:

- **Always:** `growthify-embed.js` and `loader.js`, together roughly **5 KB**.
- **Per enabled module:** one runtime file, fetched by the loader only for a module the admin has switched on.
- **Per placed block:** that block's own asset, where it has one. A block you never place is never requested.

Several section blocks ship no JavaScript at all — `bundles-widget`, `free-gift-notice`, `custom-code`, `integration-widget`, `reviews-carousel` and the seven `page-*` sections among them — because their output is entirely Liquid and settings.

## Localisation

The extension carries **15 locale files**: `en.default.json` plus Arabic, German, Spanish, French, Italian, Japanese, Korean, Dutch, Polish, Portuguese, Brazilian Portuguese, Russian, Turkish and Chinese. They cover the strings the blocks themselves render — labels, buttons, validation messages. They do not translate content you author.

## What theme blocks do not do

- **They do not place themselves.** Installing the app adds nothing to your theme. Every section block is a deliberate placement, which is why [installation](../getting-started/installation.md) treats enabling the embed as its own numbered step.
- **They do not work without the embed.** A data-driven block with no `window.gfConfig` has no base URL, and it fails quietly rather than showing a shopper an error.
- **They do not render for a disabled module.** A block whose module is off is inert rather than broken, and nothing warns you about it in the Theme Editor.
- **They cannot enter checkout.** Shopify does not accept theme blocks there. Post-purchase surfaces use checkout UI extensions, which are a different extension type entirely.
- **They are not a visual builder.** Each block exposes a settings schema — the largest is `all-reviews-page`, with 23 settings — and you configure within it. There is no free-form layout editing inside a block.
- **They do not adapt to an unusual theme DOM.** A block that attaches near an add-to-cart form assumes conventional Shopify markup; a heavily customised theme may need it repositioned by hand.
- **They do not guarantee zero layout shift by themselves.** The loader is written to avoid it and never to block checkout, but a block placed where your theme sizes content late can still move the page.

## FAQ

### Do I need to add all 72 theme blocks?

No. Only **Growthify** is required. Everything else is opt-in, block by block — a store using three modules places a handful and ignores the rest.

### What is the difference between an app embed and an app block?

An app embed targets the document rather than a position in a template, so it applies theme-wide as soon as it is enabled and offers no placement choice. An app block lives inside a section, so you choose the template and the position. Growthify has six embeds and 66 section blocks.

### Does adding a block edit my theme code?

No. The blocks are served from the app, so your theme files are untouched and uninstalling leaves no orphaned Liquid behind.

### How much JavaScript does a Growthify block add?

Two files always load, together roughly 5 KB. Everything beyond that is per module or per block and loads on demand.

### Why does my block render but show no data?

Check the [app embed](./app-embed.md) first: if **Growthify** is off, or its app proxy prefix does not match the app's, the block has no server to ask. That single cause covers most reports.

### Are the theme blocks translated?

Fifteen locale files cover the block interface strings. Content you write yourself is not translated for you.

### Can a Growthify block appear in Shopify checkout?

No — checkout is closed to theme blocks. Growthify uses separate checkout UI extensions for the post-purchase surfaces.

## Related pages

- [App embed](./app-embed.md) — the required block, and the config object it injects.
- [App proxy](./app-proxy.md) — the path every data-driven block calls.
- [Modules overview](../modules/overview.md) — which module must be on for a given block to do anything.
- [Storefront API](../api/storefront-api.md) — the endpoints behind the blocks.
