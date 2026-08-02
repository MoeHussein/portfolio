# Portfolio CompositionPlan v1

Date: 2026-08-02

Status: Approved by user on 2026-08-02

## Recommendation

Adopt exactly one primary application scaffold: the official Astro 7.1.6 minimal starter at commit `9865d1c03af6d1a1f15c9811858778cc952ca4e4`.

This choice scored 96.35/100. It fits the approved site because Astro produces static HTML by default, supports locale-specific file routes and built-in internationalization, provides schema-validated content collections, supports image processing during the build, and has an official GitHub Pages workflow. It also allows the portfolio to ship with almost no client JavaScript beyond the small theme and case-study interactions.

Next.js remains a strong application framework in general, but it does not improve this static, read-only portfolio. Its static-export mode adds image and routing constraints, while the official Pages starter candidates had missing licenses or outdated dependencies. Choosing Astro here is a requirements decision, not a popularity decision.

## Candidate comparison

Popularity is log-normalized within candidate class and contributes only 5% of the total score.

| Candidate | Class | Score | Disposition | Main reason |
| --- | --- | ---: | --- | --- |
| Official Astro minimal starter | Primary scaffold | 96.35 | Strong, approval required | Current official static-first shell with i18n, content, and Pages alignment |
| BartoszJarocki/cv | Pattern reference | 77.30 | Conditional concept only | Useful print-density reference; no code, styling, or analytics adopted |
| RyanFitzgerald/devportfolio | Primary scaffold | 66.61 | Rejected | Old Astro dependency, published high-severity exposure, no tests/CI, generic Tailwind foundation |
| Once UI Magic Portfolio | Primary scaffold | 62.57 | Rejected | Noncommercial license, unpinned dependency, competing UI foundation |
| Astro Nano | Primary scaffold | 60.54 | Rejected | Old dependencies, unnecessary blog/RSS/MDX, no tests/CI |
| Official Next.js GitHub Pages template | Primary scaffold | 52.99 | Rejected | Missing license, older Next.js, extra static-export constraints |
| Vercel Next.js Portfolio Starter | Primary scaffold | 34.54 | Rejected | Missing license, Next.js 13/Nextra 2, critical advisory range, no tests/CI |

The full scored output is in `evaluation.v1.json`.

## Primary scaffold

- Source: [withastro/astro official minimal example](https://github.com/withastro/astro/tree/astro%407.1.6/examples/minimal)
- Commit: `9865d1c03af6d1a1f15c9811858778cc952ca4e4`
- Package: `astro@7.1.6`
- License: MIT
- Intake mode: copied official starter source, then fully adapted
- Sole contribution: application shell, Astro file router, content collections, build pipeline, and static output
- Modification boundary: replace the example page with the approved portfolio. No design or personal content comes from the starter.

Astro's official documentation supports the key architectural decisions:

- [Internationalization routing](https://docs.astro.build/en/guides/internationalization/) supports configured locales, a default locale, locale folders, route helpers, and non-prefixed default-language URLs.
- [Content collections](https://docs.astro.build/en/guides/content-collections/) provide schemas, validation, editor type safety, and queryable structured content.
- [GitHub Pages deployment](https://docs.astro.build/en/guides/deploy/github/) documents the official action, repository base paths, and later custom-domain migration.

## Fixed architecture foundations

| Foundation | Selection |
| --- | --- |
| Application shell | Astro minimal starter only |
| Framework | Astro 7.1.6 |
| Router | Astro file-based routing only |
| Content | Astro content collections with one schema-validated factual source |
| Styling | Project-owned vanilla CSS, custom properties, cascade layers, and no utility framework |
| Client behavior | Small framework-free TypeScript modules for theme, language preference, and accessible dialogs |
| Localization | English at `/`, Arabic at `/ar/`, Turkish at `/tr/`; Arabic sets `dir="rtl"` |
| Rendering | Fully static output; no server routes, middleware, actions, authentication, or database |
| Deployment | GitHub Actions to GitHub Pages only |
| CV/resume output | Six static print documents generated from the same approved content source |

No React runtime, Next.js router, Tailwind, Nextra, Once UI, CMS, analytics, contact backend, or second content/deployment foundation will be introduced.

## Exact package pins

### Runtime and build

| Package | Version | License | Contribution |
| --- | ---: | --- | --- |
| `astro` | 7.1.6 | MIT | Static framework, routing, content, and assets |
| `@astrojs/sitemap` | 3.7.3 | MIT | Locale-aware sitemap generation only |
| `sharp` | 0.35.3 | Apache-2.0 | Build-time responsive AVIF/WebP generation only |
| `@fontsource-variable/space-grotesk` | 5.3.0 | OFL-1.1 | Local Latin/Turkish display font only |
| `@fontsource-variable/noto-sans` | 5.3.0 | OFL-1.1 | Local Latin/Turkish body font only |
| `@fontsource-variable/noto-sans-arabic` | 5.3.0 | OFL-1.1 | Local Arabic interface/body font only |

The font packages are used unmodified and will ship with OFL notices. Their approval is included in this CompositionPlan because OFL-1.1 is outside the workflow's automatic code-license list.

### Development and validation

| Package | Version | License | Contribution |
| --- | ---: | --- | --- |
| `@astrojs/check` | 0.9.10 | MIT | Astro and TypeScript diagnostics |
| `typescript` | 6.0.3 | Apache-2.0 | Strict typing |
| `@types/node` | 24.13.3 | MIT | Node 24 build-script types |
| `eslint` | 10.8.0 | MIT | Lint orchestration |
| `eslint-plugin-astro` | 3.1.0 | MIT | Astro template linting |
| `typescript-eslint` | 8.65.0 | MIT | Type-aware TypeScript linting |
| `prettier` | 3.9.6 | MIT | Formatting |
| `prettier-plugin-astro` | 0.14.1 | MIT | Astro formatting |
| `vitest` | 4.1.10 | MIT | Content, locale, metadata, and pure-logic tests |
| `@playwright/test` | 1.62.1 | Apache-2.0 | Browser, keyboard, RTL, responsive, download, and PDF checks |
| `lighthouse` | 13.4.1 | Apache-2.0 | Accessibility, SEO, best-practice, and performance budgets |
| `html-validate` | 11.6.1 | MIT | Generated semantic HTML and accessible-name validation |

Runtime is pinned to Node 24.11.1 and pnpm 11.9.0. The lockfile will be committed.

## Immutable workflow pins

| Source | Commit | Contribution |
| --- | --- | --- |
| `actions/checkout` | `fbc6f3992d24b796d5a048ff273f7fcc4a7b6c09` | CI/deployment checkout |
| `actions/setup-node` | `a0853c24544627f65ddf259abe73b1d18a591444` | Pinned Node setup |
| `pnpm/action-setup` | `0ebf47130e4866e96fce0953f49152a61190b271` | Pinned pnpm setup |
| `withastro/action` | `e84f40bd8d2caa9e768ec82ad30dd81f0b280853` | Build Pages artifact |
| `actions/deploy-pages` | `cd2ce8fcbc39b97be8ca5fce6e763baed58fa128` | Publish Pages artifact |
| `actions/dependency-review-action` | `a1d282b36b6f3519aa1f3fc636f609c47dddb294` | Pull-request dependency review |
| `github/codeql-action` | `f205ea1c3313d32999d8d6a48b4f6530d4437b38` | CodeQL analysis |

All workflow sources are used as packages by immutable commit. None provides an application architecture.

## Bounded secondary repository

[BartoszJarocki/cv](https://github.com/BartoszJarocki/cv/tree/b9c9c2bacf539d6bbab13714fa1c39a1afd0ad08) at commit `b9c9c2bacf539d6bbab13714fa1c39a1afd0ad08`, MIT license, is used as a concept reference only.

Its sole contribution is the principle of compact, print-friendly information hierarchy for the six CV/resume documents. No source, component, visual styling, content, dependency, or Vercel Analytics code will be copied.

## Security and verification boundary

The selected Astro release has a published advisory history. The reviewed high-severity items either affect older version ranges or server/adapter/image-endpoint behavior that will not exist in this static GitHub Pages build. This is still partial evidence rather than final clearance.

Before adopting the scaffold, verification must confirm:

1. The tagged repository commit and MIT license still match this plan.
2. Every exact npm version exists and retains the recorded license.
3. Installation with lifecycle scripts disabled succeeds or each required script is manually reviewed before enabling it.
4. The generated lockfile receives a clean production and development dependency audit, or any finding is resolved before adoption.
5. The final dependency-license inventory matches the permissive policy plus the explicitly approved OFL fonts.
6. No framework, router, styling, content, analytics, server, or deployment conflict enters the graph.

## Remaining release gates

- Repository name and temporary GitHub Pages base path.
- Future custom domain.
- Headshot and additional approved media.
- Paper-figure reuse rights and attribution.
- User review of Arabic and Turkish translations.
- One unapproved client project remains excluded pending naming and screenshot permission.
- MSc and second-manuscript status updates.
- Final review of all six career documents.

## Approval requested

Approval of this CompositionPlan authorizes:

1. The official Astro minimal starter at the pinned commit as the sole scaffold.
2. The exact packages and immutable workflow commits listed above.
3. Project-owned vanilla CSS and framework-free client interaction code.
4. The three unmodified OFL Fontsource packages with bundled notices.
5. Concept-only use of the pinned CV reference with no source copying.

It does not authorize any rejected template, competing architectural foundation, unpinned dependency, or additional personal claim.
