# Iconography

**Gallery:** [Utility icon catalog](../icons/index.html)  
**Exports:** `brand/assets/icons/*.svg`  
**Status:** Reference collection proposed for reuse, not automatically applied to live pages.

## Icon language
- SVG `viewBox="0 0 24 24"`; `stroke="currentColor"`, `stroke-width="1.8"`, round line caps/joins, no hardcoded brand hex.
- Prefer 24px regular icons and 20px compact; 44px minimum interactive hit target where appropriate.
- Avoid heavy filled clip-art, inconsistent shadows, emoji-only controls and mixed line weights.
- Decorative icons are hidden from assistive tech; meaningful icons require surrounding visible text or an accessible label.
- Botanical illustration `assets/img/decor-olive-sprig.svg` is a **decorative motif**, not a 24px utility glyph.

## Reference set
`bag`, `calendar`, `truck`, `sparkles`, `shield-check`, `clock`, `map-pin`, `gift`, `check`, `chevron-right`, `arrow-right`, `menu`, `user`, `message-circle`.

## Migration procedure
Inventory actual inline symbols on all 15 HTML files; compare by meaning/geometry and pick client-approved variants. Then centralize reuse, check visible labels, and remove duplicates only in a separately tested implementation PR. Do not replace custom artwork simply because an icon has a similar name.
