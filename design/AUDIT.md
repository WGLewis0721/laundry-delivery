# Soapbox Caddie — brand, UI and asset audit

**Audit date:** 2026-11-13 | **Baseline:** `main` (last observed merged commit `e121013`) | **Scope:** source inspection only, not browser QA.

| Area | Status | Evidence | Missing or corrective work |
| --- | --- | --- | --- |
| Business/voice | **Present; approval unverified** | [README](../README.md) + [index.html](../index.html): campaign copy, pricing/ZIP messaging | Sync inaccessible client sources; confirm current approved brand voice/prices |
| Logo | **Partial** | `assets/img/soapbox-caddie-logo-header.png`, `assets/img/soapbox-caddie-logo-footer.png` | Client-approved editable logo master, sizes, horizontal/reverse/monochrome/favicon exports and usage rules not evidenced as a production package |
| Palette | **Present in code; no complete board proof** | `index.html` inline tokens; `css/tokens.css`; README explanations | Standalone rendered board, contrast matrix and authority across duplicate CSS sources |
| Typography | **Assets present; approval incomplete** | `css/fonts.css`; `assets/fonts/cormorant-garamond/`, `inter/`, `oswald/` | Typeface specimen, role/weight map, font licensing/usage ledger; OKANA and ENRIQ named by repo but licensed files absent |
| Imagery | **Present** | `assets/img/`: product bags, textiles, lifestyle, hero and logo; `Archives/unused-assets/` retired images | Asset inventory linking source/rights, canonical vs archived, crops and mobile/desktop use. Do not repurpose archives without review |
| Iconography | **Partial** | Existing inline SVG/decor `assets/img/decor-olive-sprig.svg`; `assets/icons/.gitkeep` is the only entry there | Canonical utility-icon registry, consistent stroke/fill geometry, icon names and visual gallery; separate branded olive sprig from action icons |
| Shared UI code | **Present** | `css/components.css` contains buttons, forms, cards, plans, steps, tracker, toast etc.; `css/chrome.css` and `css/layout.css` | Complete UI kit document/gallery, states, behavioral contracts, accessible status patterns and mapping to code |
| Cross-page consistency | **Partial** | `index.html` self-contained inline CSS; interior pages use `css/fonts.css` → `tokens.css` → shared styles | Token parity checks and regression plan; avoid blind stylesheet unification |
| Responsive behavior | **Reported; new proof needed** | README records 375–1440px checks and homepage source order | Fresh dated mobile/tablet/desktop captures of all 15 pages and state coverage |
| Wireframes | **Missing from active design package** | No current top-level `design/` screen/wireframe package was found in inspected `main` tree | Page-by-page grayscale SVG + PNG wireframes, screen map and interaction sequence |
| Formal brand board and kit | **Missing as active deliverables** | Branding is described in README/tokens, not in reviewable `design/BRAND_BOARD.md` and rendered proofs | Genuine board and exportable client brand kit |
| Design verification | **Partial** | README reports past responsive and color checks; previous Claude/Notion booking smoke tests | Repeatable design token/icon/style checks, current screenshots/contrast/keyboard/focus tests |
| Live customer request flow | **Not production-connected** | `CLAUDE.md`, README, Notion log describe client-side booking/session and unresolved delivery | Do not claim real business receipt/charge; coordinate integration separately |

## Specific conflicts and risks

1. **Outdated Copilot guidance:** `.github/copilot-instructions.md` says Playfair Display and work on `main`; current source uses Cormorant/Inter/Oswald and `CLAUDE.md` + Notion require a branch and draft PR. Plan to update guidance after owner review; **do not** follow its obsolete font or Git directions.
2. **Two token authorities:** `index.html` defines visual tokens and component CSS inline; inner pages use `css/tokens.css` and shared files. Both use similar palette but can drift on future changes. First inventory actual computed tokens and screenshots; then build a parity check and a reversible migration proposal if needed.
3. **No central icon package:** utility icons live in markup and decorative sprigs have a distinct art direction; `assets/icons/` has no actual icons. Extract from real usage and normalize with a small consistent system rather than inventing 40 generic icons.
4. **Font licensing gap:** repo says external board specifies OKANA/ENRIQ yet they are not supplied. Keep current accessible self-hosted fallbacks until verified rights and approval are obtained.
5. **README mixed history:** it documents completed rebrand but still includes older 'redesign Phase 2/3 not started' wording, legacy token/booking references. Update status only with verified evidence; archive superseded text without silently changing active prices/flows.
6. **Client Google context unavailable:** linked Doc is 403, Drive folder 404; branding approval and client direction cannot be asserted from those sources.
7. **Checkout/status language:** Notion documents browser-only request state and some legacy payment statements. Design QA must distinguish demo, request sent and paid, but payment functionality is a separate blocked integration track.

## What should be reused

- Current Soapbox identity and photography, SVG olive motif, local fonts, variables and components.
- Existing homepage information hierarchy and 15 routed pages.
- Existing booking/ZIP components as they actually work in preview.
- Gray Matter reusable design contracts and WD's *process* (tokens, icons, 3 approval gates, clear limitations), **not** WD's aesthetic or tech stack.

See [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) for proposed artifacts, sequencing and acceptance.
