---
id: app-embed
title: "Growthify app embed — window.gfConfig and the loader"
sidebar_label: App embed
sidebar_position: 1
description: "The Growthify Embed injects window.gfConfig and boots the storefront loader, giving every theme block a base URL, a shop identity and a module runtime."
keywords: [shopify app embed, window.gfConfig, theme app extension embed, storefront loader, growthify ready event, lazy load modules]
---

<head>
  <script type="application/ld+json">
    {JSON.stringify({
      '@context': 'https://schema.org',
      '@type': 'FAQPage',
      mainEntity: [
        {
          '@type': 'Question',
          name: 'Do I have to add the app embed to every template?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. An app embed is theme-wide rather than a section block, so you enable it once per theme and it applies across the storefront.',
          },
        },
        {
          '@type': 'Question',
          name: 'What happens if the Growthify app embed is switched off?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'window.gfConfig is never defined and the loader never boots, so no module runtime is fetched. Blocks still render their Liquid markup and then sit there with no server to talk to and no visible error.',
          },
        },
        {
          '@type': 'Question',
          name: 'Why does the app embed have to read Liquid?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Shopify renders Liquid inside extension blocks but not inside static asset files, so the embed is the only place that can resolve shop.permanent_domain, shop.secure_url and the asset CDN base. That is exactly the set of values it injects.',
          },
        },
        {
          '@type': 'Question',
          name: 'Which modules does the loader fetch?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Eight runtimes exist: popup, reviews, wishlist, bundles, cart, cookie consent, upsells and OTP verification. The loader asks the backend which of them the merchant has enabled and downloads only those.',
          },
        },
        {
          '@type': 'Question',
          name: 'How much does the embed add to page weight?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Two files always load: growthify-embed.js at 1,095 bytes and loader.js at 4,034 bytes, roughly 5 KB together. Module runtimes are fetched on demand and only for enabled modules.',
          },
        },
        {
          '@type': 'Question',
          name: 'Is there an event I can hook into once Growthify is ready?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'Yes. The loader dispatches a growthify:ready CustomEvent on the document once the storefront configuration has resolved, with that configuration as the event detail.',
          },
        },
        {
          '@type': 'Question',
          name: 'Should I leave debug logging on?',
          acceptedAnswer: {
            '@type': 'Answer',
            text: 'No. Debug logging is a checkbox on the embed that writes Growthify activity to the browser console. It is useful while placing blocks and should be off on a live storefront.',
          },
        },
      ],
    })}
  </script>
</head>

# App embed

**The Growthify app embed is a theme-wide block that injects the `window.gfConfig` configuration object into your storefront and boots the script that lazy-loads Growthify's module runtimes.** It is the one piece of the storefront half that is not optional: enable it under **Theme editor → App embeds → Growthify**, and every other Growthify block becomes able to reach the server.

## Who this page is for

- **Merchants** at step three of [installation](../getting-started/installation.md), or troubleshooting blocks that render and do nothing.
- **Developers** who want the exact shape of `window.gfConfig` and a hook to run code once Growthify has initialised.

## Six embeds, one that matters

Growthify's theme extension contains six blocks that appear under **App embeds** — five targeting the document body and one targeting the head. Five of them are ordinary features you may never enable. The sixth is infrastructure:

| Embed | Theme editor name | Role |
| --- | --- | --- |
| `growthify-embed` | **Growthify** | 🔴 Required. Injects `window.gfConfig`, boots the loader. |
| `popup-widget` | Popup Widget | A feature embed; behaviour arrives with the popup runtime. |
| `cart-drawer` | Smart Cart Drawer | A feature embed; behaviour arrives with the cart runtime. |
| `cookie-banner` | Cookie Consent Banner | A feature embed; behaviour arrives with the consent runtime. |
| `age-verification` | Age Verification | A feature embed with its own script asset. |
| `seo-meta-tags` | SEO Meta Tags & Schema | Head-target; emits markup rather than visible UI. |

The other five depend on the first. Enabling **Popup Widget** while **Growthify** is off gives you markup with no runtime behind it.

## What the embed does

It is the only place in the extension that can read Liquid — Shopify renders Liquid in an extension's blocks but not in its static `assets/*.js` files — so it does the two jobs that need Liquid-resolved values.

### 1. It injects `window.gfConfig`

```js
window.gfConfig = {
  appUrl: '/apps/growthify',                     // app-proxy base, from the embed setting
  shop: 'your-store.myshopify.com',              // shop.permanent_domain
  secureUrl: 'https://your-store.com',           // shop.secure_url
  assetBase: 'https://cdn.shopify.com/.../assets/', // derived from this embed's own asset URL
  debug: false,                                  // the embed's debug checkbox
};
```

It also sets `window.Growthify.debug` and points `window.Growthify.config` at the same object, so code can read either name.

Two of those values are worth a second look. **`appUrl`** is the single source of the app-proxy base: every block builds its `fetch()` URLs from it, so the prefix lives in one place rather than in 66 blocks. **`assetBase`** is derived from the CDN URL of the embed's own script by trimming the filename off the end — which means module runtimes are fetched from Shopify's CDN, not from the app's host.

### 2. It boots the loader

The embed loads `growthify-embed.js` with `defer`, which in turn brings in `loader.js`. The loader then:

1. Waits for `DOMContentLoaded`, or starts immediately if the document is already parsed.
2. Publishes `window.Growthify.loadModule` and `window.Growthify.config`.
3. Requests the storefront configuration: `GET /apps/growthify/api/config?shop=...`.
4. Downloads a runtime for each module that came back enabled, and calls that runtime's `init()` with the configuration.
5. Dispatches a `growthify:ready` `CustomEvent` on `document`, with the configuration as `detail`.

Eight runtimes exist — popup, reviews, wishlist, bundles, cart, cookie consent, upsells and OTP verification — and a disabled module's runtime is never requested. If the configuration call fails, the loader logs it only in debug mode and continues with an empty module set: nothing loads, nothing throws, and checkout is never blocked.

## Settings

| Setting | Default | Notes |
| --- | --- | --- |
| **App proxy prefix** | `growthify` | Must match the subpath the app's proxy is configured with. See [App proxy](./app-proxy.md). |
| **Enable debug logging** | off | Writes Growthify activity to the browser console. Leave off in production. |

Two settings is the whole surface, deliberately. Everything else a module needs comes from the admin at runtime through the configuration call, so a settings change in the app does not require a theme edit.

## Page weight

Two files always load on every storefront page:

| File | Size | Role |
| --- | ---: | --- |
| `growthify-embed.js` | 1,095 B | Bootstraps the loader. |
| `loader.js` | 4,034 B | Reads the config, fetches enabled module runtimes. |

Roughly **5 KB** in total, before compression, and that is the fixed cost of having Growthify installed. The loader is written against a 15 KB budget and is well inside it. Everything beyond those two files is conditional: one runtime per enabled module, one asset per placed block.

## Hooking into `growthify:ready`

Because the loader announces itself, theme code can wait for Growthify rather than poll for it:

```js
document.addEventListener('growthify:ready', (event) => {
  // event.detail is the resolved storefront configuration
  console.log('enabled modules', Object.keys(event.detail.modules || {}));
});
```

`window.Growthify.loadModule('reviews')` is also public, for the case where a module's runtime is wanted on a page the configuration did not pre-empt.

## What the app embed does not do

- **It does not enable any module.** Modules are switched on in the embedded admin, gated by [entitlements](../admin/entitlements.md). The embed only reports what the server says.
- **It does not place blocks.** Enabling it adds no visible UI at all. Section blocks are still placed one at a time in the Theme Editor — see [Theme blocks](./theme-blocks.md).
- **It does not carry across themes.** App embed state is stored with the theme, so duplicating a theme or publishing a different one means enabling **Growthify** again there. A storefront that "stopped working after a theme change" is usually this.
- **It cannot fix a mismatched proxy prefix.** If the setting and the app's subpath disagree, the embed will happily inject a base URL that resolves to nothing, and every block 404s together.
- **It does not surface errors to shoppers.** A failed configuration call degrades to no modules. That is the correct behaviour on a live storefront and the reason a misconfiguration is silent until you look at the network tab or switch debug logging on.
- **It does not make Liquid available to module scripts.** Static assets never see Liquid; anything shop-specific has to arrive through `window.gfConfig` or through the configuration call.
- **It does not replace the app proxy.** The embed supplies the base URL; the proxy is what actually carries a request to the server, with the signature and the guards described on its own page.

## FAQ

### Do I have to add the embed to every template?

No — an app embed is theme-wide, not a section block. Enable it once per theme.

### What happens if the embed is switched off?

`window.gfConfig` is never defined and the loader never boots, so no runtime is fetched. Blocks render their markup and then sit there, with no error shown to a shopper.

### Why does the embed have to read Liquid?

Shopify renders Liquid inside extension blocks but not inside static asset files. The embed is therefore the only place that can resolve the shop domain, the secure URL and the asset CDN base — which is exactly what it injects.

### Which modules does the loader fetch?

Eight runtimes exist: popup, reviews, wishlist, bundles, cart, cookie consent, upsells and OTP verification. The loader downloads only the ones the merchant has enabled.

### How much does the embed add to page weight?

`growthify-embed.js` is 1,095 bytes and `loader.js` is 4,034 bytes — roughly 5 KB together, uncompressed.

### Is there an event I can hook into?

Yes: `growthify:ready` on `document`, dispatched once the storefront configuration resolves, with that configuration as `event.detail`.

### Should I leave debug logging on?

No. It writes to the browser console and is meant for placing and diagnosing blocks, not for a live storefront.

## Related pages

- [App proxy](./app-proxy.md) — where `appUrl` points, and what happens to a request there.
- [Theme blocks](./theme-blocks.md) — the 72 blocks this embed powers.
- [Platform and loader](../modules/platform.md) — the module-gating side of the same mechanism.
- [Installation](../getting-started/installation.md) — where enabling the embed sits in the setup order.
