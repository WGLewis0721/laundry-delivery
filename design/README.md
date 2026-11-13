# Soapbox Caddie — Design System

A single starting point for Soapbox Caddie's visual identity, responsive layouts and component changes. Built from the **existing website**, not a replacement design.

**Status:** Review package completed; client approvals, font licensing and live browser checks remain separate.
**Website stack:** Existing static HTML/CSS/JavaScript, unchanged by this design package.
**Method reference:** [Gray Matter Design Library](https://github.com/WGLewis0721/Graymattertechllc-/tree/main/app-design).

## Open the visual references

| Artifact | Open | Source / exports |
| --- | --- | --- |
| Brand board | [Visual brand board](brand/brand-board.html) | [SVG](evidence/brand-board/brand-board.svg) · [PNG](evidence/brand-board/brand-board.png) |
| UI kit | [Interactive component gallery](ui-kit/gallery.html) | [Component specification](UI_KIT.md) · [SVG](evidence/ui-kit/component-sheet.svg) · [PNG](evidence/ui-kit/component-sheet.png) |
| Icon system | [Utility icon gallery](icons/index.html) | [Icon guidelines](brand/ICONOGRAPHY.md) · [SVG catalog](evidence/icons/icon-sheet.svg) · [PNG catalog](evidence/icons/icon-sheet.png) · [14 SVG sources](brand/assets/icons/) |
| Page wireframes | [All 15 pages](SCREEN_MAP.md) | [Wireframe index](wireframes/index.md) · 30 editable SVGs and 30 PNG previews |
| Developer handoff | [Implementation guide](IMPLEMENTATION_HANDOFF.md) | [Change request](CHANGE_REQUEST.md) · [QA gate](QA.md) |

## Source-of-truth documentation

- [Brief](BRIEF.md): audience, identity, conversion path and constraints.
- [Brand kit](brand/BRAND_KIT.md): existing logo assets, asset provenance and pending masters.
- [Colors and tokens](brand/COLORS_AND_TOKENS.md): six live brand colors, component usage, drift inventory.
- [Typography](brand/TYPOGRAPHY.md): requested OKANA/ENRIQ, current Cormorant/Inter/Oswald, licensing gates.
- [Iconography](brand/ICONOGRAPHY.md): reusable 24px reference family, aria/size rules and source inventory.
- [Page map](SCREEN_MAP.md): all 15 production pages with individual specs and desktop/mobile exports.
- [References](REFERENCES.md): inspected source files and professional methodology.
- [QA](QA.md): automated structural checks and pending browser/client review.
- [Implementation status](IMPLEMENTATION_PLAN.md): completed deliverables and prerequisites for future changes.

## How to request a website change

1. Open [CHANGE_REQUEST.md](CHANGE_REQUEST.md) and describe the client feedback and exact page/section.
2. Review the [brand board](brand/brand-board.html), [UI gallery](ui-kit/gallery.html), and matching [page specification](screens/).
3. Prepare updated desktop/mobile visuals; review **before implementation**. Keep unrelated sections unchanged.
4. Build approved differences in a separate PR. Compare real running-site screenshots; test responsiveness, keyboard, accessibility and the booking journey.
5. Update the affected visual assets and implementation docs with the approved result.

## Distinguish reference from approval

The site already includes working fonts, logos, imagery and many components. This package documents them and adds **review-ready** references; it does not certify new brand approval or backend behavior.

- OKANA and ENRIQ are client-requested but no licensed web font files are present. Do not replace current fonts without approval.
- Utility icon SVGs are **reference exports**, not silently installed live-page icons.
- The wireframes depict structure, not actual browser screenshots.
- Booking, payments, authentication, service eligibility and legal promises must be validated independently.

Previous evidence: [original audit](AUDIT.md) · [second-pass source audit](DEEP_BRAND_AUDIT.md).
