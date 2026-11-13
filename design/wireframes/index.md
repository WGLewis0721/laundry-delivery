# Responsive Wireframes

**Coverage:** 15 existing site pages × desktop and mobile = **30 SVG wireframes + 30 PNG previews**.  
**Size:** Desktop 1200 × 900; mobile 390 × 1120.  
**Purpose:** Grayscale structural sketches for discussing content order, layout and page completeness. These are not final graphic mockups or screenshots of a running website.

Use [SCREEN_MAP.md](../SCREEN_MAP.md) to open each page's specification, SVG source and PNG preview.

## Interpretation

- Dark blocks represent hierarchy/primary actions; light blocks represent content or media.
- Shapes, headings and illustrations are simplified. Exact web content and interaction behavior remain governed by the existing HTML/JS.
- Any visual redesign request must show a proposal alongside a screenshot of the existing website before implementation.
- Booking, account, privacy/terms, estimate and status wireframes do not establish any backend functionality.

## Editing and exports

1. Update the corresponding `<slug>-desktop.svg` and `<slug>-mobile.svg`.
2. Run `python3 scripts/render-design-assets.py` from repository root (requires CairoSVG); review exported PNGs under `exports/`.
3. Update `design/screens/<slug>.md` with any approved new behavior/layout and include browser screenshot evidence when implementation happens.

**Do not overwrite** the authentic logo source images or live website styling while adjusting these drafts.
