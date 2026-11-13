# Soapbox Caddie — design system

**Status:** Actual design deliverables created for review; production website unchanged. This design kit includes a [rendered SVG brand board](evidence/brand-board/soapbox-brand-board.svg), an [interactive visual UI component gallery](gallery/index.html), [21 SVG utility icons](brand/ICONOGRAPHY.md), [30 responsive SVG wireframes and 15 screen specs](SCREEN_MAP.md), along with PNG raster exports and [QA](QA.md).

## Start here

- [Visual brand board](BRAND_BOARD.md), [brand kit](BRAND_KIT.md) and [live HTML gallery](gallery/index.html).
- [Typography guide](brand/TYPOGRAPHY.md): requested **OKANA/ENRIQ**; installed **Cormorant Garamond / Inter / Oswald**. Licensed request fonts pending.
- [Color/tokens guide](brand/COLORS_AND_TOKENS.md): existing six-color palette, including Whispering Sage / Olive Sage.
- [Icon gallery](evidence/icons/soapbox-utility-icon-sheet.svg) and 21 source SVG assets in `assets/icons/`.
- [UI kit](UI_KIT.md) with [SVG component board](evidence/ui-kit/component-gallery.svg) and interactive real-font HTML proof.
- [Screen map](SCREEN_MAP.md), [desktop/mobile wireframes](wireframes/index.md) and [15 screen specifications](screens/).
- [Corrections workflow](CORRECTIVE_ACTION.md), [design QA](QA.md), [deep audit](DEEP_BRAND_AUDIT.md).

## Regenerate PNG previews

```bash
python -m pip install cairosvg==2.8.2
python scripts/design/render-png.py
python scripts/design/check-assets.py
```

GitHub Actions automatically renders 33 SVG previews as PNG on this branch when the workflow runs. SVGs are editable originals and PNGs are generated viewable copies.

## Boundaries

This design package does **not** change site HTML/CSS/JS, live customer booking or Square. Original shipped logo PNGs are displayed in the HTML gallery and linked from the brand kit; the board's illustrated wordmark is not a replacement logo. Wireframes are **structural studies, not live browser screenshots**. Client approval, authentic font licenses, original logo master and actual browser QA remain future gates.
