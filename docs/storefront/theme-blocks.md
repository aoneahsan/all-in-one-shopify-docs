---
id: theme-blocks
title: Theme blocks
sidebar_label: Theme blocks
sidebar_position: 2
description: The 72 Growthify Liquid app blocks you can add through the Shopify Theme Editor, grouped by where they render.
keywords: [shopify app blocks, theme app extension blocks, liquid blocks, growthify blocks]
---

# Theme blocks

Growthify ships **72 Liquid app blocks**. You add them through the Theme Editor wherever you want them; each block is server-rendered Liquid that talks to the server through the [app proxy](./app-proxy.md). The build verifies that all 72 blocks have matching assets and valid schemas.

## The one required block

- **`growthify-embed`** — the [app embed](./app-embed.md). Required; powers every other block.

## Product page

`product-badge`, `review-badges`, `review-form`, `reviews-carousel`, `all-reviews-page`, `size-chart`, `variant-swatches`, `quick-view`, `product-360`, `product-videos`, `product-comparison`, `product-customizer`, `quantity-breaks`, `bogo-badge`, `bundles-widget`, `mix-match-bundle`, `fbt-widget`, `preorder-badge`, `stock-scarcity`, `stock-alert`, `delivery-date`, `wishlist-button`, `wishlist-share`, `save-for-later`, `sticky-atc`, `subscriptions`.

## Cart

`cart-drawer`, `cart-addons`, `cart-crosssell`, `cart-countdown`, `cart-donation`, `cart-terms`, `free-gift-notice`, `gift-message`, `shipping-protection`, `shipping-calculator`, `tax-estimate`.

## Collection & search

`collection-sort`, `product-filters`, `storefront-search`, `recently-viewed`, `social-proof-notifications`.

## Site-wide / navigation

`announcement-bar`, `countdown-timer`, `popup-widget`, `cookie-banner`, `age-verification`, `mega-menu`, `language-switcher`, `currency-converter`, `live-chat`, `loyalty-widget`, `referral`, `integration-widget`, `custom-code`, `seo-meta-tags`, `store-locator`, `order-tracking`, `returns`, `customer-account`, `contact-form-builder`, `faq-accordion`, `push-subscribe`, `wholesale-pricing`.

## Page-builder sections

`page-hero`, `page-countdown`, `page-features`, `page-testimonials`, `page-faq`, `page-comparison`, `page-cta`.

## Block manifest

The build emits `apps/theme-extension/blocks-manifest.md` listing every block and its target group. Use it with the in-browser theme-editor smoke test (see the app repo's `docs/app-store/THEME-EDITOR-SMOKE.md`).

## FAQ

**Do I need all 72 blocks?**
No. Add only the blocks for the modules you use. Disabled-module blocks simply have nothing to render.

**Are blocks slow?**
Blocks are server-rendered Liquid; their JavaScript (when any) is lazy-loaded by the single loader, so unused modules cost nothing on the storefront.
