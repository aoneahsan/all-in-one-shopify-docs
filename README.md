# Growthify Docs

Public documentation site for **Growthify** — a growth and conversion suite for Shopify merchants (popups, reviews, wishlist, bundles, cart upsells, cookie consent, analytics, SEO, OTP/COD, page builder, sourcing) delivered as one embedded Shopify app plus a theme app extension.

- **Live docs:** https://growthify-docs.aoneahsan.com
- **Marketing site:** https://growthify.aoneahsan.com
- **App source (private):** https://github.com/aoneahsan/all-in-one-shopify

Built with [Docusaurus 3](https://docusaurus.io/) + React 19 + TypeScript.

## Local development

```bash
yarn install
yarn build      # static build into ./build — this is the verify gate
yarn typecheck  # tsc --noEmit
yarn serve      # serve the built output for a local check
```

`onBrokenLinks` is set to `throw`, so **the build is also the link checker**: a dead internal link fails it.

> This repo is **public** and contains **no secrets**. Never commit `.env` or credentials here.

## Deployment — GitHub Pages only

The site deploys to **GitHub Pages**, and only to GitHub Pages. Pushing to `main` runs
`.github/workflows/deploy-pages.yml` (build → upload artifact → deploy). The custom domain is pinned by
`static/CNAME`, which Docusaurus copies into `build/`.

There is no Firebase project for this site, and there should never be one: no `firebase.json`, no
`.firebaserc`, no `firebase:deploy` script.

DNS and the repo's **Settings → Pages** custom-domain configuration are owner-only steps and are tracked in
`docs/MANUAL-TASKS.md` (both are complete as of 2026-09-12).

## Structure

```
docs/                 Markdown content (intro, getting-started, modules, storefront, admin, api, legal)
src/                  Homepage + theme CSS
static/               robots.txt, llms.txt, humans.txt, CNAME, img/ (logo, favicon, social card)
docusaurus.config.ts  Site config + SEO/JSON-LD head tags
sidebars.ts           Sidebar layout
docs/tracking/        SEO content-enrichment tracker
docs/MANUAL-TASKS.md  Owner-only tasks — excluded from the published build
```

## License

Documentation: MIT. The Growthify product itself is proprietary.

## Author

[Ahsan Mahmood](https://aoneahsan.com) — aoneahsan@gmail.com
