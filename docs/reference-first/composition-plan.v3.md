# CompositionPlan v3

The approved Astro scaffold remains unchanged. React Bits is used only for two bounded visual contributions at commit `d26ed7a476148f1253cca3f5bc9f679fda53e1f5`:

- `SideRays`: extended orange and blue rays behind the hero, with separate dark and light theme color tuning and clamped shader output.
- `SoftAurora`: original shader structure with the portfolio's orange and blue colors at the Work-to-Profile transition.

Both sources were ported to framework-native Astro components using the already pinned `ogl@1.0.11`. React, a second styling system, mouse interaction, and an additional page section were not introduced. Animation pauses off-screen or when the document is hidden, respects reduced motion, and releases WebGL contexts on page exit.

React Bits uses the MIT + Commons Clause License Condition v1.0. The required notice and restriction are preserved in `THIRD_PARTY_NOTICES.md`.
