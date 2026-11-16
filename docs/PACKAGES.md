# Packages — Growthify docs

Last Updated: 2026-11-16

Node 26.13.1 LTS (`.nvmrc`, `engines.node >=26.13.1`), Yarn 4 (`packageManager`), `npmMinimalAgeGate: 0`. Upgraded with
`npx -y npm-check-updates -u`, latest stable. This file is excluded from the published site (`docusaurus.config.ts` →
docs `exclude`).

| Package | Range | Kind | Purpose |
|---|---|---|---|
| `@docusaurus/core`, `@docusaurus/preset-classic` | ^3.10.2 | runtime | Site generator, docs plugin and classic theme |
| `@mdx-js/react` | ^3.1.1 | runtime | MDX rendering |
| `clsx` | ^2.1.1 | runtime | Class names in custom components |
| `prism-react-renderer` | ^2.4.1 | runtime | Code highlighting themes |
| `react`, `react-dom` | ^19.3.1 | runtime | UI runtime |
| `@docusaurus/module-type-aliases`, `@docusaurus/types` | ^3.10.2 | dev | Types for `@site/*`, `@theme/*` and the config |
| `@types/react`, `@types/react-dom` | ^19.3.0 | dev | React types |
| `typescript` | ~7.0.2 | dev | `yarn typecheck`; Docusaurus runs on TS 7 and this site has no typescript-eslint, so the fleet's 6.0 pin does not apply |

## Notes

- Build script keeps `NODE_OPTIONS=--no-experimental-webstorage`: Docusaurus' SSG loads through the `eval` package,
  which copies every global and touches Node 26's disabled `localStorage`. Re-check on each Docusaurus minor; drop the
  flag when a build without it prints nothing.

## History

- 2026-11-16: Node pin 24 → 26.13.1 (`.nvmrc`, `engines.node` was `>=24 <25`). `ncu -u` found every dependency
  already at latest stable.
