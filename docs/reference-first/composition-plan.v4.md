# CompositionPlan v4

The approved Astro scaffold remains unchanged. React Bits Plasma is the only new bounded contribution, pinned to commit `d26ed7a476148f1253cca3f5bc9f679fda53e1f5` and source blob `abf74f018f51b12ce4ac39aecac0a7406236fb12`.

The existing SideRays component is removed. Plasma is ported without React as one non-interactive fixed OGL canvas behind the complete portfolio. It uses theme-specific tinting, a 30 FPS cap, reduced render resolution and quality on mobile, page-visibility pausing, reduced-motion support, and WebGL cleanup.

No router, styling foundation, content system, application scaffold, deployment model, or additional dependency is introduced. The React Bits MIT + Commons Clause notice remains in `THIRD_PARTY_NOTICES.md`.
