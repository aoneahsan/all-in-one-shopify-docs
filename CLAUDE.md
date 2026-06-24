# all-in-one-shopify-docs — CLAUDE.md

Public documentation site for **Growthify** (the `all-in-one-shopify` Shopify app). Docusaurus 3 + React 19 + TypeScript. Deployed to Firebase Hosting + GitHub Pages.

## What this repo is
- A **PUBLIC** docs site. The app/code repo (`all-in-one-shopify`) is separate and **private**.
- Documents the REAL product read from the app code: 16 runtime modules, 52 admin feature pages, 72 theme blocks, 50 storefront API endpoints, billing tiers, GDPR + lifecycle webhooks.

## Hard rules
- **PUBLIC repo → ZERO secrets.** Never commit `.env`, credentials, Firebase service accounts, or keystores. `.gitignore` already excludes them. If a secret is ever needed, it is wrong — stop.
- **Honest framing.** Document only what the app actually does; state limits plainly. No fabricated stats/claims.
- **Yarn only** (local). `nvm` for Node, `npm` for globals, `yarn` for this repo. Only `yarn.lock`.
- **No dev servers auto-started.** Verify with `yarn build` + `yarn typecheck` (one-shot). The deploy (Firebase + Pages) is user-only.
- **No new automated tests** unless asked.

## Commands
```bash
yarn install
yarn build       # static build into ./build (the verify gate)
yarn typecheck   # tsc --noEmit
```

## Brand
- Indigo → violet, matching the Growthify app icon (`--ifm-color-primary: #6366f1`).
- Logo/favicon/social card in `static/img/` derived from the app's `app-publish-assets/icons/icon-512.svg`.

## SEO / AEO floor (keep intact)
- `static/robots.txt` — AI-bot allowlist (GPTBot/ClaudeBot/PerplexityBot/Google-Extended/Bingbot/CCBot/Applebot…) + `Sitemap:`.
- Docusaurus emits `sitemap.xml` on build. `static/llms.txt` per llmstxt.org. JSON-LD (WebSite + Organization + SoftwareApplication) in `docusaurus.config.ts` headTags. Per-page `description`/`keywords` front-matter + OG meta.
- Content-enrichment tracker: `docs/tracking/all-in-one-shopify-docs-content-tracker.json` (resumable SEO batches toward the 1000+ word per-page floor).

## Deployment (dual hosting — user-only)
- **GitHub Pages:** `.github/workflows/deploy.yml` on push to `main`; `static/CNAME` = `growthify-docs.aoneahsan.com`.
- **Firebase Hosting:** `firebase.json` + `.firebaserc` (set the real project id); `yarn firebase:deploy`.

## Sync rule
Every rule here is mirrored in `AGENTS.md`. Update both together.

Last updated: 2026-06-24
