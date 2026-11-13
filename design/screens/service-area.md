# service-area — screen specification

**Current route:** [`service-area.html`](../../service-area.html)  
**Live heading in source:** Service area  
**Primary action:** Check your ZIP

## Sections / reading hierarchy
1. ZIP checker
2. Service map
3. Currently serving
4. Fallback area list

## Structural design proofs
- [Desktop SVG](../wireframes/service-area-desktop.svg) / [mobile SVG](../wireframes/service-area-mobile.svg)
- Raster previews: [wireframes/exports/](../wireframes/exports/).
- These are **grayscale structural studies** based on code headings, not actual browser screenshots or approved final compositions.

## Behaviors & states
- invalid/served/unserved ZIP
- map offline

## Implementation requirements
- Keep existing functionality, service constraints and accessibility intact.
- Use live brand tokens and currently installed Cormorant Garamond / Inter / Oswald; OKANA / ENRIQ require genuine licensed source assets.
- Preserve responsive reading order, visible focus, keyboard behavior, mobile target sizing and reduced-motion preference.
- Before changing the live page, capture real before/after screenshots, verify critical journeys and secure client/owner signoff.
