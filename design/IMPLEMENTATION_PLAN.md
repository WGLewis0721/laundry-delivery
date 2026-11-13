# Design System Delivery and Integration Plan

**Status:** Reference design-system materials delivered for review; no production code changes or client approval inferred.

## Delivered in the visual-system PR

| Area | Evidence | State |
| --- | --- | --- |
| Brand identity and palette | [Brand board HTML](brand/brand-board.html), [SVG/PNG](evidence/brand-board/brand-board.png), [brand kit](brand/BRAND_KIT.md), [tokens](brand/COLORS_AND_TOKENS.md) | Built · review pending |
| Typography | [Requested versus installed font guide](brand/TYPOGRAPHY.md) | Documented · OKANA/ENRIQ licenses pending |
| Utility icon references | [14 SVG icons](brand/assets/icons/), [catalog](icons/index.html) and [proof PNG](evidence/icons/icon-sheet.png) | Built as references · no live migration |
| UI kit | [Interactive component gallery](ui-kit/gallery.html), [documentation](UI_KIT.md), [proof PNG](evidence/ui-kit/component-sheet.png) | Built as visual/reference kit · no production CSS change |
| Page inventory and screens | [15-page map](SCREEN_MAP.md), [15 specs](screens/), [30 SVG and 30 PNG drafts](wireframes/index.md) | Built as low-fidelity structure references |
| Repeatable verification | [Export script](../scripts/render-design-assets.py), [icon registry check](../scripts/check-icon-registry.py), [token parity check](../scripts/check-design-parity.py), [asset inventory check](../scripts/check-design-assets.py) | Scripted · consult [QA](QA.md) for results |
| Change control | [Change request](CHANGE_REQUEST.md), [handoff](IMPLEMENTATION_HANDOFF.md) | Documented |

## Next implementation phase — only after approval

1. Obtain final client source brand board, editable logo master, and authentic OKANA/ENRIQ web-embedding licenses. Validate the current colors and photo permissions.
2. Review component/state gallery and desktop/mobile page references with the business owner. Record approved changes before editing live pages.
3. For an approved page change, generate a scoped change request and specific desktop/mobile proposal. Capture actual current-browser screenshots first.
4. Make the narrow HTML/CSS/JS changes in a separate branch. Retain current functioning navigation, pricing, account, ZIP-check and booking behavior.
5. Run targeted tests, mobile/tablet/desktop visual comparisons, accessibility/keyboard/reduced-motion checks, and integration checks where behavior is affected.
6. Update the design references and create a reviewable implementation PR. The owner decides whether to merge or deploy.

## Known limitations

The typeface approval, image/logo rights register, favicon master, final full-page visual QA screenshots and production-ready backend behavior have **not** been delivered by this reference PR. Draft wireframes are not final interface redesigns. Source-level token differences and stale historical docs should not trigger a blind visual refactor.

## Scope boundaries

This package does not alter live website markup, CSS, JavaScript, pricing, Square/payment configuration, personal data or account services. It does not add a framework or change deployment architecture.
