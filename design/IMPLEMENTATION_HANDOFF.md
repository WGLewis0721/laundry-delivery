# Developer Handoff

1. Start with [BRIEF.md](BRIEF.md), [BRAND_BOARD.md](BRAND_BOARD.md), [UI_KIT.md](UI_KIT.md) and [SCREEN_MAP.md](SCREEN_MAP.md).
2. For a change, open [CHANGE_REQUEST.md](CHANGE_REQUEST.md), locate the exact [screen specification](screens/) and its desktop/mobile wireframes, and identify real source files.
3. Check the existing code and current approved assets. Do not assume the gallery or wireframes describe running backend behavior.
4. Prepare and approve an updated visual before changing production styles or content. Preserve existing client identity, pricing and working flows.
5. Implement narrowly in a feature branch. Prefer semantic tokens, existing shared components and accessible SVG icons.
6. Capture actual before/after screenshots and record regressions, keyboard/mobile checks and correct business states.
7. Open a reviewable PR with changed paths, tested behavior, risks, and rollback. Only the owner approves merging.

**Current known gaps:** licensed OKANA and ENRIQ, original brand-board editable master, logo source variants and favicon approval. The current site uses approved fallback implementation until resolved.

**Included design materials are not a payment, order management or customer data implementation.**
