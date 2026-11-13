# Typography and Font Licensing

## Status
The client-requested brand board lists **OKANA** for display and **ENRIQ** for accents. Neither font file or its commercial web-embedding license exists in the repository. Do **not** represent them as deployed or assume a free download is authorized.

| Role | Client-requested | Implemented production face | Source |
| --- | --- | --- | --- |
| Headlines and expressive prices | OKANA | Cormorant Garamond (roman + italic variable 300–700) | `assets/fonts/cormorant-garamond/` |
| Small uppercase accent labels | ENRIQ | Oswald (variable 200–700) | `assets/fonts/oswald/` |
| Body, buttons, navigation, forms | Not otherwise specified in accessible brand board | Inter (variable 100–900) | `assets/fonts/inter/` |

## Live usage
- Main headings, large prices and editorial emphasis: `var(--font-display)` / `var(--font-brand-display)`.
- Eyebrows and condensed uppercase labels: `var(--font-condensed)` / `var(--font-brand-accent)`.
- All interface controls, body and legal text: `var(--font-body)`.
- Self-hosted `@font-face` rules: `css/fonts.css` for inner pages and `index.html` for the homepage; `font-display:swap`.
- Preserve browser fallback fonts and typographic legibility during a replacement.

## Replacement gate
1. Obtain original font source(s), exact family/style names and explicit website embedding license.
2. Confirm weights, stylistic features, accents and size/line-height behavior on the existing homepage and at 390px.
3. Render a specimen alongside the current type hierarchy; check long headings, prices, form labels and nav wrapping.
4. Adjust both homepage and interior font registrations/tokens in a **separate implementation PR**, preserving the current fallback.
5. Verify that no unauthorized font file was added and visual diffs are approved.

**Historical conflict:** `.github/copilot-instructions.md` says Playfair Display; it predates the current Soapbox Caddie identity and is not a design authority for this package.
