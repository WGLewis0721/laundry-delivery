# Design QA and Release Gates

**Current status:** Design exports and repository checks verified on 2026-11-13. No running-site browser QA or client approval is claimed. [View successful design checks](https://github.com/WGLewis0721/laundry-delivery/actions/runs/43495556938).

## Structural checks
- [x] `python3 scripts/check-design-parity.py`: brand values and aliases match; four known non-brand variances documented (three radii and one font fallback).
- [x] `python3 scripts/check-icon-registry.py`: 14 valid SVG reference icons.
- [x] `python3 scripts/render-design-assets.py`: 33 PNGs rendered from source SVG files and committed.
- [x] `python3 scripts/check-design-assets.py`: 15 page specifications, 30 desktop/mobile SVG and PNG pairs, 3 additional proof sheets; zero missing/dimension errors.

## Brand review
- [ ] Compare brand-board palette to actual site tokens.
- [ ] Confirm logo source, variant usage and legal asset rights.
- [ ] Obtain OKANA/ENRIQ files and web-embedding licenses before replacement.
- [ ] Check contrast: ink on sage and pale/taupe dividers not used as legibility-critical text.
- [ ] Review icon family for duplicates, label semantics, decorative handling and currentColor support.

## Browser validation (future implementation)
- [ ] Capture and compare actual rendered pages at 375, 390, 430, 768, 1024, 1280, 1440 px.
- [ ] Navigate by keyboard; verify focus, accordions, menus, forms and error announcements.
- [ ] Test invalid/served/unserved ZIP branches and all five schedule steps with no false successful submission.
- [ ] Check image crop/load, responsive assets, font loading, reduced-motion and contrast.
- [ ] Run Lighthouse and an accessibility audit; record actual outputs.
- [ ] Verify external booking/payment/auth/legal claims against the operational system.

## Defect / correction workflow
Document the page, reproduction steps, expected result, actual result, screenshot, severity, scope and proposed fix. Repair the smallest affected unit, recheck neighboring states and add before/after evidence. Do not broaden a visual correction into an unrequested full redesign.

## Approval
Source of approval: not yet recorded. Review status: pending. Owner merges only after accepting scope and test evidence.
