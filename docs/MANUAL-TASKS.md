# Manual / User-Only Tasks — Growthify Docs

> The ONE place for everything only you (the human) can do. Fixed path: `docs/MANUAL-TASKS.md`.
> Global spec: `~/.claude/rules/manual-tasks.md`. Excluded from the published site (see
> `docusaurus.config.ts` → `docs.exclude`) because this repo is public.
> Last updated: 2026-09-13

## ⏳ Pending manual tasks

| # | Task | Why only you | Status |
|---|------|--------------|--------|
| — | None open. | — | — |

## ✅ Completed manual tasks

| # | Task | Resolution | Date |
|---|------|-----------|------|
| 1 | **Add DNS.** In Hostinger, add a `CNAME` record `growthify-docs` → `aoneahsan.github.io` on `aoneahsan.com`. | Done. `https://growthify-docs.aoneahsan.com` resolves and answers `200`. | 2026-09-12 |
| 2 | **Configure GitHub Pages.** Repo **Settings → Pages**: source = **GitHub Actions**, custom domain = `growthify-docs.aoneahsan.com`, HTTPS enforced. | Done. The custom domain serves the built site over HTTPS. | 2026-09-12 |

`static/CNAME` ships `growthify-docs.aoneahsan.com` inside `build/`, and `.github/workflows/deploy-pages.yml`
builds and publishes on every push to `main`.
