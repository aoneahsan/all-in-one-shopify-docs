# Growthify Docs

Public documentation site for **Growthify** — a 16-module growth & conversion suite for Shopify merchants (popups, reviews, bundles, cart upsells, cookie consent, analytics, SEO, OTP/COD, page builder, sourcing) delivered as one embedded Shopify app.

- **Live docs:** https://growthify-docs.aoneahsan.com
- **Marketing site:** https://growthify.aoneahsan.com
- **App source (private):** https://github.com/aoneahsan/all-in-one-shopify

Built with [Docusaurus 3](https://docusaurus.io/) + React 19 + TypeScript.

## Local development

```bash
yarn install
yarn start      # dev server on http://localhost:5973
yarn build      # static build into ./build
yarn typecheck  # tsc --noEmit
```

> This repo is **public** and contains **no secrets**. Never commit `.env` or credentials here.

## Deployment (dual hosting)

The site is configured to deploy to both Firebase Hosting and GitHub Pages.

- **GitHub Pages:** pushing to `main` runs `.github/workflows/deploy.yml` (build → upload → deploy). Set repo **Settings → Pages → Source = GitHub Actions**. Custom domain via `static/CNAME`.
- **Firebase Hosting:** `yarn firebase:deploy` (set the real Firebase project in `.firebaserc` first). Config in `firebase.json`.

Both deploys are run by the maintainer.

## Structure

```
docs/                 Markdown content (intro, getting-started, modules, storefront, admin, api, legal)
src/                  Homepage + theme CSS
static/               robots.txt, llms.txt, humans.txt, CNAME, img/ (logo, favicon, social card)
docusaurus.config.ts  Site config + SEO/JSON-LD head tags
sidebars.ts           Sidebar layout
docs/tracking/        SEO content-enrichment tracker
```

## License

Documentation: MIT. The Growthify product itself is proprietary.

## Author

[Ahsan Mahmood](https://aoneahsan.com) — aoneahsan@gmail.com
