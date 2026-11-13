# Soapbox Caddie — deeper brand and typography verification

**Second pass:** 2026-11-13 | **Live baseline inspected:** `main` at `e12101395ff1dd942bb387aca0d9eda0396c6e3c`  
**Method:** repository tree, source-level inspection of all 15 current HTML pages, styles, README, agent instructions and relevant merged PR histories. **No new browser visual testing or client Google approval** was performed. This is a verification report, not a completed design kit.

## 1 — Client-requested fonts versus deployed fonts (important)

The repository **explicitly says** the brand board specifies **OKANA and ENRIQ**:

- [README.md, Fonts section](../README.md) (lines 149–163): the named fonts were not supplied as licensed files; fallback mapping is documented.
- [css/tokens.css](../css/tokens.css) (lines 87–95): the same two requests and mapped fallbacks.
- [index.html](../index.html) (lines 155–164): approved-mockup comment and token references.
- [README.md, prelaunch checklist](../README.md) (line 418): specifically requires supplying licensed OKANA and ENRIQ.

| Role | Requested per repo's brandboard description | Actual deployed family | Files in this repo | What remains unknown |
| --- | --- | --- | --- | --- |
| Brand display: h1/h2, prices, expressive typography | **OKANA** | **Cormorant Garamond**, normal + italic | `assets/fonts/cormorant-garamond/CormorantGaramond-Variable.woff2`; `CormorantGaramond-Italic-Variable.woff2` | OKANA authentic source, commercial web-embedding rights, approved weights/styles, whether launch should swap |
| Brand accent: uppercase micro-labels and condensed accents | **ENRIQ** | **Oswald** variable | `assets/fonts/oswald/Oswald-Variable.woff2` | ENRIQ authentic source, commercial web-embedding rights, approved weights/styles, intended spacing, whether launch should swap |
| UI/body: paragraphs, inputs, buttons, navigation | No different requested body family confirmed in repository | **Inter** variable | `assets/fonts/inter/InterVariable.woff2` | Confirm Inter remains client approved |

The deployed face declarations in `css/fonts.css` have font-display swap and weight ranges: Cormorant 300–700 (roman/italic), Inter 100–900, Oswald 200–700. The homepage duplicates these `@font-face` rules within `index.html` for its intentionally self-contained design. **Do not silently substitute OKANA/ENRIQ with random internet downloads or assume licenses from the names.** An actual externally sourced brand board has **not been recovered from this GitHub tree**; only code/README references to it exist. The linked client Google Doc/Drive are inaccessible to the connected account, so brand-board content, revisions and legal approvals cannot be independently checked yet.

**Obsolete contradiction:** [`.github/copilot-instructions.md`](../.github/copilot-instructions.md) instructs `Inter + Playfair Display`; archived FOLD material also mentions Playfair. This is **not** the currently deployed Soapbox type system. The latest [CLAUDE.md](../CLAUDE.md) + Notion coordination require feature branches/draft PRs, contrary to that Copilot file's old `main` instructions. Update the obsolete guidance only in a separate approved change.

## 2 — Verified implemented brand colors (do not accidentally undo later changes)

- `#F7F2F0`: Ivory canvas
- `#0E0E10`: Ink
- `#1E2509`: Olive, deliberately still used as accessible dark accent/text on light backgrounds
- `#CFC5B8`: Taupe decorative divider (not small text on ivory)
- `#D1E0D1`: **Whispering Sage**, active filled-button/section-band surface
- `#A9BFA0`: **Olive Sage**, active footer surface

The two sages are **implemented changes**, not a hypothetical direction: [merged PR #14](https://github.com/WGLewis0721/laundry-delivery/pull/14) introduced the sage surfaces while retaining dark olive text, and [merged PR #15](https://github.com/WGLewis0721/laundry-delivery/pull/15) fixed outline hover states on sage bands. The homepage's inline tokens and `css/tokens.css` both contain these six values; the older README's section describing four board colors predates the sage changes.

**Token mismatch actually found by source comparison:** of 27 shared CSS variables, 4 values are not byte-identical across homepage and interior declarations:

| Token | `index.html` | `css/tokens.css` | Risk |
| --- | --- | --- | --- |
| `--radius-sm` | `0.35rem` | `0.25rem` | Shapes drift between pages |
| `--radius-md` | `0.6rem` | `0.5rem` | Shape drift |
| `--radius-lg` | `0.9rem` | `0.75rem` | Shape drift |
| `--font-body` fallback list | system-ui / -apple-system / Segoe UI etc. | additionally BlinkMacSystemFont | Minor platform fallback difference |

This is a **text/source comparison only**, not a computed-style regression. Many other tokens are unique to one page's architecture by intent. Do not broadly normalize component radii until the owner selects an intended visual style and real before/after captures exist.

**Stray color literals worth auditing** (not yet proved contrast failures): `login.html` inline error surfaces `#FEF2F2`, `#FECACA`, `#991B1B` and fallback `#DC2626`; `account.html` inline `var(--sky-light, #EBF4FF)`; `css/chrome.css` includes numerous CSS variable fallback color literals, including older fallback tones. Prefer semantic states after reviewing browser behavior, not a blind search/replace.

## 3 — Brand assets, icon evidence and outstanding genuine deliverables

- **Logo assets present:** `assets/img/soapbox-caddie-logo-header.png`, `assets/img/soapbox-caddie-logo-footer.png`. Their presence contradicts the old README sentence calling the current brand mark a mere text stand-in, at least on pages now referencing these images. However, a client-supplied **editable master**, usage/clear-space specification, approved icon-only mark and export manifest were not found in the active tree.
- **Imagery present:** optimized/PNG hero, three bag sizes, subscription, Gift Laundry, About and business images, linen/lifestyle and decor photos. Several archived/unused files exist, including `Archives/unused-assets/Soapbox Caddie Sample Graphics - 5.png`; these were **not** verified as current approved visual standards. A rights/provenance registry and approved mobile crops remain needed.
- **Icons present in markup:** source inspection of 15 HTML pages found inline SVGs on several pages (including homepage, About, How It Works, Services, Plans and others) plus a decorative olive-sprig SVG at `assets/img/decor-olive-sprig.svg`. But `assets/icons/` holds only `.gitkeep`, so the utility icons lack an exportable canonical registry/gallery. README's old '12 icon placeholders awaiting Phase 3' cannot be taken literally as today's complete icon status; review actual inline symbols first.
- **Favicon absent:** 15/15 active HTML files lack a `rel="icon"` or equivalent markup; the active tree has no favicon asset. Add a logo-derived approved favicon, SVG/PNG exports, site metadata and QA when approved.
- **UI components exist** in `css/components.css`, `css/chrome.css`, `css/layout.css` and homepage inline CSS. A documented rendered **UI kit**, reusable state matrix and responsive/keyboard test artifacts are not yet supplied.
- **Old phase checklist is stale:** README still says color/real images/icons/logo phases haven't started (lines 202–215), even though later assets/PRs implement much of that. Reconcile facts instead of redoing work.

## 4 — Priority updates to the plan (without touching live code)

1. **Typeface gate (highest priority):** recover original approved board, source and web-embedding licenses for OKANA/ENRIQ. Create visual specimens beside Cormorant/Oswald, verify legibility/weights, capture owner preference, then stage any font replacement with matching HTML and CSS `@font-face` and reliable fallback.
2. **Brand asset authority:** confirm original master for actual logo files, export favicon and consistent logo variants; verify whether archived sample is relevant; record rights and current approval.
3. **Token/semantic QA:** create a parity check for shared values; document the radius and fallback drift, the sage button/band/hover decisions from PRs #14/#15, and the error-state colors. Preserve current contrast-tested choices.
4. **Icon audit:** inventory each live icon and decorative motif before generating an SVG registry/glyph library; check semantics, line width, SVG size and accessibility labels. Do not copy generic external icons over bespoke artwork.
5. **Complete client proof:** rendered brand board, working UI kit gallery, responsive wireframes/screens and QA evidence; avoid pretending Markdown templates are renderings.
6. **Clean documentation:** replace or clearly mark stale README/Copilot guidance after approval. Do not edit production design, Square checkout, active pricing, real customer data or `main` in this design-only audit.

## Evidence and limitations

- Main commit: `e12101395ff1dd942bb387aca0d9eda0396c6e3c`, no newer main commits observed at second audit.
- File/tree search, all 15 HTML pages, relevant CSS and merged PR descriptions were inspected through GitHub. **No** live browser, Lighthouse, PNG image composition review or font license audit was performed here.
- Source claims about a previous client-approved mockup are acknowledged, but original mockup/brandboard and client Google Drive files were not available to independently corroborate them.
