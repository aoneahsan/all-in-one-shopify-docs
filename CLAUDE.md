# Growthify Docs — project guidance (CLAUDE.md = AGENTS.md, byte-identical)

Public documentation site for **Growthify** (the `all-in-one-shopify` Shopify app). Docusaurus 3 + React 19 + TypeScript. Deployed to **GitHub Pages only**.

## What this repo is
- A **PUBLIC** docs site. The app/code repo (`all-in-one-shopify`) is separate and **private**.
- Documents the REAL product read from the app code. Counts verified 2026-09-12 against the app repo's `what-this-project-consists-of.md`: 263 Remix route files (51 `admin.features.*` screens, 55 `api.storefront.*` routes), 16 entitlement modules, 15 numbered module specs, 72 theme blocks, 4 billing tiers, GDPR + lifecycle webhooks, a read-only Merchant API v1.
- 🔴 **The 16 entitlement module ids and the 15 numbered module specs are DIFFERENT SETS.** Never equate the two counts or present one list as the other.

## Hard rules
- **PUBLIC repo → ZERO secrets.** Never commit `.env`, credentials, service accounts, or keystores. No internal hostnames, vault names, or local filesystem paths either. If a secret is ever needed, it is wrong — stop.
- **Honest framing.** Document only what the app actually does; state limits plainly. No fabricated stats/claims, no invented store URLs, no testimonials or customer counts. Never write "free only" or "there is no paid tier" — Growthify ships Free/Pro/Growth/Scale.
- **Yarn only** (local). `nvm` for Node, `npm` for globals, `yarn` for this repo. Only `yarn.lock`.
- **No dev servers auto-started.** Verify with `yarn build` + `yarn typecheck` (one-shot), then `yarn serve` if a real page check is needed.
- **No new automated tests** unless asked.

## Commands
```bash
yarn install
yarn build       # static build into ./build (the verify gate AND the link checker)
yarn typecheck   # tsc --noEmit
yarn serve       # serve the built output
```

`onBrokenLinks: 'throw'` means a dead internal link fails the build.

## Brand
- Indigo → violet, matching the Growthify app icon (`--ifm-color-primary: #6366f1`).
- Logo/favicon/social card in `static/img/` derived from the app's icon SVG master.

## Content floor (keep intact)
- Every page carries front matter with a distinct `title` (50–60 chars) and `description` (140–160 chars), plus `keywords`. A page without them is unsearchable.
- Per-page structure: definition-first opening sentence → who it is for → how it works → limits ("what it does not do") → FAQ (5–8 question headings) → related pages.
- **≥1000 unique words per page, no shared boilerplate between pages.**
- `FAQPage` JSON-LD on every page carrying an FAQ, declared through an MDX `<head>` block with `JSON.stringify`. Verify it survived into `build/<route>.html`, not just that the build was green.
- `static/robots.txt` — AI-bot allowlist (GPTBot/ClaudeBot/PerplexityBot/Google-Extended/Bingbot/CCBot/Applebot…) + `Sitemap:`.
- Docusaurus emits `sitemap.xml` on build. `static/llms.txt` per llmstxt.org. Site-wide JSON-LD (WebSite + Organization + SoftwareApplication) in `docusaurus.config.ts` headTags.
- Content-enrichment tracker: `docs/tracking/all-in-one-shopify-docs-content-tracker.json` (resumable, one category per batch).

## Deployment — GitHub Pages ONLY
- `.github/workflows/deploy-pages.yml` on push to `main`; `static/CNAME` = `growthify-docs.aoneahsan.com` (probed `200`, 2026-09-12).
- 🔴 **No Firebase for this site** — no `firebase.json`, no `.firebaserc`, no `firebase:deploy`. A docs site is not a Firebase app.
- DNS and the Pages custom-domain setting are owner-only; both completed 2026-09-12 (`docs/MANUAL-TASKS.md`).

## Sync rule
Every rule here is mirrored in `AGENTS.md`, byte-identical. Update both together and prove it with `cmp CLAUDE.md AGENTS.md`.

Last updated: 2026-09-13

## Sub-agents & Skills — Main-Context-First (IRON-SOLID)
Default/built-in sub-agents (`general-purpose`, `Explore`, `Plan`, `claude`, `fork`, …) do NOT have
access to `/skills`, so delegating to them silently SKIPS the skills RULE #0 requires. Do all
skill-relevant work in the **MAIN context**; use a sub-agent ONLY when a **custom** `aoneahsan-ccca-*`
agent exists for that job, and give every write dispatch an explicit `EXCLUSIVE SCOPE`. When a relevant
skill is missing, **install/enable it** rather than proceeding skill-less.
(Owner directive 2026-07-11; full text in `~/.claude/CLAUDE.md`.)

<!-- RULE:main-context-model-workflow v2026-07-16 -->
## Main-Context + Skills + Model Workflow (IRON-SOLID — CRITICAL)
1. **NO default/built-in sub-agents** for ANY work in this project — they cannot invoke /skills, which
   RULE #0 makes mandatory. Do ALL work (planning, implementation, review, exploration) in the MAIN
   context. A sub-agent is allowed ONLY when a CUSTOM `aoneahsan-ccca-*` agent exists for that exact job.
2. **Skills always:** before any task, scan the available-skills list and invoke EVERY relevant skill; if a
   needed skill is missing, download/enable/install it (or use the nearest installed equivalent and say so)
   — never proceed skill-less. For this repo that means at least `aoneahsan-cccs-docusaurus`,
   `-seo-content-writing`, `-markdown` and `-copywriting`.
3. **Model floor:** Fable 5 / Opus 5 or newer only. Multi-phase features keep a resumable tracker,
   resumed rather than re-planned from zero.

Global records (rules, policy, audit reports) live in the `ahsan-notebook` repo at
`static/assets/claude-code/`; the `~/.claude/…` paths are symlinks into it. Full text: `~/.claude/CLAUDE.md`.
(Owner directives 2026-07-11 / 2026-07-14; fleet-rolled 2026-07-16.)
