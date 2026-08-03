# Design QA

## Source of truth

- Approved direction: `C:\Users\MoePc\.codex\generated_images\019fc24d-8ce2-73d2-858a-f733de4049a2\exec-83189d63-9e9d-4a1f-928b-85067d9928da.png`
- Reference size: 946 x 1663 px
- Target state: English, dark theme, desktop hero followed by selected work

## Implementation evidence

- Desktop viewport: 1440 x 1024 CSS px
- Desktop hero: `tmp/portfolio-final-hero.png` (1425 x 1013 px including browser scrollbar)
- Desktop work: `tmp/portfolio-final-work.png` (1425 x 1013 px including browser scrollbar)
- Mobile viewport: 390 x 844 CSS px
- Mobile hero: `tmp/portfolio-cinematic-mobile.png`
- Mobile work: `tmp/portfolio-cinematic-mobile-work.png`
- Mobile project dialog: `tmp/portfolio-cinematic-dialog-mobile.png`
- Side-by-side comparison: `tmp/design-qa-comparison.png`
- Updated card layout, desktop academic group: `tmp/portfolio-cards-desktop.png` (1280 x 720 px)
- Updated card layout, desktop personal/product group: `tmp/portfolio-cards-personal.png` (1280 x 720 px)
- Updated card layout, mobile: `tmp/portfolio-cards-mobile.png` (390 x 844 px)
- Latest responsive review: desktop 1280 x 720 CSS px and mobile 390 x 844 CSS px in the in-app browser
- Content-only review: desktop 1280 x 720 CSS px and mobile 390 x 844 CSS px with zero rendered images

The full comparison places the approved hero and work frames in the left column and the corresponding implementation captures in the right column. Focused mobile captures are included because responsive composition and project-dialog behavior cannot be judged from the desktop reference alone.

## Visual review

- P0 blockers: none
- P1 major mismatches: none
- P2 visible mismatches: none
- P3 intentional differences:
  - The implementation retains language and theme controls required by the approved functional scope.
  - At the user's request, Selected Work now uses CSS-styled cards and separates three academic projects from four personal/product projects instead of the original single project index.
  - The artwork uses the separately generated production assets from the approved direction, with responsive crops rather than the exact mockup crop.
  - Arabic is intentionally removed from the current public release until its translation is ready.
  - The former artwork images and their source files were removed at the user's request.

## Comparison history

- Fixed the desktop name lockup so it stays on two lines.
- Reduced the hero statement to the approved compact introduction.
- Removed visible project-status labels from the desktop index.
- Reduced desktop hero height to improve continuity into the second image.
- Preserved a full-height mobile hero for legibility and image impact.
- Removed the "Curiosity became a direction" heading and replaced it with the direct label "About."
- Replaced the flat project rows with responsive, keyboard-accessible CSS cards.
- Added explicit Academic Work and Personal & Product Work groups without changing factual project content.
- Replaced the abbreviated first publication label with the complete published title.
- Replaced the compact header mark with the full name and exposed the three navigation tabs on mobile.
- Reduced the hero name scale, removed horizontal artwork drift, increased muted-text contrast and added restrained rounding to the project dialog and its information cards.

## Interaction and accessibility checks

- Header navigation scrolls to Selected Work, Profile, and Contact.
- Project cards open factual detail dialogs and the Close control dismisses them.
- Dark/light theme toggle works and defaults to dark on a fresh visit.
- English and Turkish routes build successfully; Arabic routes and the Arabic CV are intentionally absent.
- At 390 x 844, all three navigation tabs are visible, the page has no horizontal overflow and the hero name is 48.75 px.
- At both reviewed breakpoints, the hero and work artwork transforms have zero horizontal translation.
- The VitroMech dialog uses a 21.6 px outer radius and 13.6 px inner-card radius on mobile.
- The BSc education detail now ends with the concise wording “Ranked 3rd in my class.”
- The content-only hero and work sections render without images, horizontal overflow or missing navigation at both reviewed breakpoints.
- The mobile navigation uses a centered compact segmented control instead of edge-aligned links, and the contact/footer copy is reduced to functional content only.
- Keyboard focus styles and reduced-motion behavior are implemented.
- Browser console errors during the tested journey: 0.

## Above-the-fold copy check

The implementation contains the approved identity, professional headline, compact positioning sentence, Contact action, and CV action. No unapproved personal claims were introduced.

final result: passed
