# CompositionPlan v2: responsive visual refinement

The existing official Astro minimal scaffold remains the sole application foundation at commit `9865d1c03af6d1a1f15c9811858778cc952ca4e4`. Astro 7.1.6, Astro file routing, content collections, project-owned vanilla CSS, and GitHub Pages remain unchanged.

## Candidate comparison

| Candidate | Class-normalized popularity | Result | Decision |
| --- | ---: | --- | --- |
| RyanFitzgerald/devportfolio | 100.0 | Rejected by hard gate | Strong single-page shape, but no release, CI, tests, dark mode, or mobile navigation; its Astro 5 and Tailwind foundations conflict with the approved stack. |
| satnaing/astro-paper | 92.6 | Conditional, 77.03 | Selected as one concept-only visual-system reference. Current Astro 7 source, versioned release, CI, responsive behavior, accessibility, and complete light/dark theme coverage. |
| ncdai/chanhdai.com | 83.7 | Conditional, 75.13 | Rejected because its Next.js, React, Tailwind, motion, and component-registry architecture is excessive and incompatible. |
| BartoszJarocki/cv | 100.0 in its CV class | Conditional, 70.45 | Rejected for the website because it is a CV page rather than a project-led portfolio. |

## Selected composition

- Primary scaffold: official Astro minimal starter, unchanged.
- Secondary reference: AstroPaper commit `4fe3aca0e09ed8404ec2e716ac4f3b57ccc252eb`, concept only.
- Reused ideas: one coherent theme-token system, restrained maximum width, compact section spacing, readable laptop proportions, and simple responsive navigation behavior.
- Not reused: source code, Tailwind, blog routes, MDX, search, RSS, content files, components, dependencies, or deployment configuration.

## Implementation boundary

The local redesign will change only project-owned Astro markup and vanilla CSS. It will make the hero, Selected Work, cards, dialog, header, and all supporting surfaces respond to the same theme tokens; reduce the oversized laptop rhythm; simplify the mobile header; and keep academic and personal work as separate card collections without reintroducing artwork.
