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


## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** agent exists in
`.claude/agents/` for that job; a default `Explore`/`Plan` agent is allowed ONLY for read-only,
no-skill search/exploration. When a relevant skill is missing, **install/enable it** rather than
proceeding skill-less. (Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) for ANY work in
   this project — they cannot invoke /skills, which RULE #0 makes mandatory. Do ALL work (planning, implementation,
   review, exploration) in the MAIN context. A sub-agent is allowed ONLY when a CUSTOM agent exists in
   `.claude/agents/` for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a needed
   skill is missing, download/enable/install it (or use the nearest installed equivalent and say so) — never
   proceed skill-less.
3. **Model workflow:** PLAN and REVIEW on **Fable 5**; EXECUTE the approved plan on **Opus 4.8**. Plans in
   `~/.claude/plans/`; multi-phase features keep a resumable tracker (`docs/features/<slug>/00-tracker.json`),
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
