# Soapbox Caddie — design system completion plan

**Status:** **PROPOSED — no production UI, icons, wireframes, brand-board images or source code have been changed by this plan.**  
**Baseline:** `main` at inspected merge `e121013` (2026-11-13).  
**Deliverable:** consistent brand kit, client-approved brand board, implemented UI kit, icons, typography, complete screen coverage and design QA.  
**Method:** [Gray Matter client design audit](https://github.com/WGLewis0721/Graymattertechllc-/blob/chatgpt/wd-reference-client-design-audit-20261113/app-design/CLIENT_SITE_DESIGN_SYSTEM_AUDIT.md); [WD inspected design reference](https://github.com/WGLewis0721/WD-AutoDetailing/blob/main/Documentation/BUILD_NOTES.md). New Gray Matter docs are still in draft [PR #38](https://github.com/WGLewis0721/Graymattertechllc-/pull/38).

## Scope / constraints

Preserve the Soapbox Caddie brand, 15 HTML pages, the static HTML/CSS/JS architecture and live customer flow. Design work is separate from Square API integration, real order/request submission and policies. Only approved business facts can become production copy. Do not treat the unverified client Google resources as synchronized. Do not write to `main`; stage each phase in a draft PR. Owner/client approval precedes live visual changes.

## Proposed authoritative repository layout

```text
design/
  README.md                        [created] index/status
  AUDIT.md                         [created] exact current-state evidence and conflicts
  CONTEXT_SOURCES.md               [created] provenance/approvals/blocked client docs
  IMPLEMENTATION_PLAN.md           [created] THIS plan
  BRIEF.md                         [planned] approved message, conversion, brand scope
  PREBUILD_PLAN.md                 [planned] approved layout/resource plan and reversibility
  REFERENCES.md                    [planned] inspected references and rights
  references.json                  [planned] machine-readable source register
  BRAND_BOARD.md                   [planned] identity decisions and visual proof references
  UI_KIT.md                        [planned] component inventory, tokens, behavior/states
  SCREEN_MAP.md                    [planned] 15-page route/journey map
  QA.md                            [planned] observed browser/test/screenshot evidence
  CORRECTIVE_ACTION.md             [planned] issue-to-regression workflow
  brand/
    BRAND_KIT.md                   [planned] master assets, variants, licensing, provenance
    TYPOGRAPHY.md                  [planned] OKANA/ENRIQ approval decision + deployed fallbacks
    ICONOGRAPHY.md                 [planned] utility SVG rules and accessibility
    COLORS_AND_TOKENS.md           [planned] semantic palette & contrast/authority mapping
    assets/
      logos/                       [planned] approved master/export files (do NOT fabricate)
      icons/                       [planned] editable, approved icon gallery/source
  wireframes/
    index.md                       [planned] variant choices and review log
    <page-id>-desktop.svg          [planned] editable grayscale layout per page
    <page-id>-mobile.svg           [planned] editable grayscale layout per page
    exports/<page-id>-desktop.png  [planned] rendered preview per page
    exports/<page-id>-mobile.png   [planned] rendered preview per page
  screens/<page-id>.md             [planned] purpose/action/states/a11y per page
  evidence/
    brand-board/                   [planned] actual reviewed brandboard PNG/SVG
    ui-kit/                        [planned] component gallery PNG/SVG/HTML
    before/                        [planned] actual baseline browser screenshots
    after/                         [planned] post-change browser screenshots
    comparisons/                   [planned] real diff outputs
    qa/                            [planned] measured test reports
scripts/
  check-design-parity.py           [planned] compare duplicated core token values
  check-icon-registry.py           [planned] allowed registry/usage/aria rules
assets/icons/                      [planned] canonical utility icons used by actual site
css/tokens.css                     [existing] interior token authority; preserve behavior
css/fonts.css                      [existing] self-hosted font authority
css/components.css                 [existing] shared UI components
css/chrome.css                     [existing] cross-page header/nav layer
index.html                         [existing] standalone homepage styles, no forced migration
```

The paths above are **intended locations**, not claims that the proposed deliverables exist. A product-only template does not replace rendered visuals or working code. The approved brand kit and board live in **this client repo**, while reusable process/templates remain in **Gray Matter**.

## Implementation sequence and acceptance

### P0 — Restore client context and sign off authority (BLOCKED on Google access)

- Obtain access/approved export for the supplied Google Doc (403) and Drive folder (404). Record current title, date/revision, owner, actual content and decision authority. Do **not** change sharing or infer content.
- Validate actual approved name, palette, logo master/rights, OKANA/ENRIQ font licensing or deliberate use of Cormorant/Inter/Oswald, imagery consent and website copy.
- Compare site price/coverage/service/contract claims with client and Square source of truth; keep technical/payment questions on the separate Notion track.
- Output: `design/BRIEF.md`, `design/REFERENCES.md`, `design/references.json`, `design/PREBUILD_PLAN.md` and decisions in `design/CONTEXT_SOURCES.md`.
- **Gate:** product owner reviews the approved facts/assets; design exploration may be drafted beforehand but must not be labeled client-approved.

### P1 — Brand kit + rendered brand board

- Inventory original header/footer logos and unused imagery; identify client-licensed logo master and approved photo/art sources.
- Produce actual board: six swatches (Ivory `#F7F2F0`, Ink `#0E0E10`, Olive `#1E2509`, Taupe `#CFC5B8`, Whisper Sage `#D1E0D1`, Olive Sage `#A9BFA0`) **as current implementation hypotheses subject to client review**, clear color roles, typographic specimens, real imagery, motif usage, logo treatment and 1–2 genuine UI examples.
- Create logo variants only from authorized originals. Include file source, commercial rights, min size, negative-space and reverse-color rules.
- Document primary Cormorant, body Inter, Oswald micro-label roles; **do not** present OKANA/ENRIQ as installed or licensed.
- Output: `design/BRAND_BOARD.md`, `design/brand/{BRAND_KIT.md,TYPOGRAPHY.md,COLORS_AND_TOKENS.md}`, `design/evidence/brand-board/{soapbox-brand-board.svg,soapbox-brand-board.png}` and approved exports in `design/brand/assets/logos/`.
- **Gate:** the visual board and asset rights are reviewed by client/owner. A text-only Markdown file does not pass.

### P2 — Iconography + real UI kit

- Inventory inline SVGs/Unicode symbols/illustrations on all pages. Separate decorative olive sprigs from interaction icons.
- Standardize a small utility icon collection based on *actual usage*: ZIP/location, laundry bag, pickup, delivery, calendar, account, check/status, arrow, menu/close, info, alert, gift. Use an intentional viewBox (24×24), stroke/caps, optical sizing, `currentColor`, focus and accessible label policy; avoid copying WD's SVG paths.
- Reuse or extract actual icons into `assets/icons/`; record names, destinations, variants and migration scope in `design/brand/ICONOGRAPHY.md`. No generic icon dump.
- Build UI kit for actual page primitives: header/footer, CTA/link, ZIP input/error/success, bag and subscription cards, wizard stepper, picker, summary, accordions, tracker/confirmation, toast, validation, login/account states.
- Each component needs visual gallery **and** state table (default/hover/focus/disabled/pending/error/success), keyboard behavior, touch target, responsive behavior and the code/file owner. Base it on `css/components.css`, `css/chrome.css` and homepage equivalents; don't replace them casually.
- Output: `design/UI_KIT.md`, `design/evidence/ui-kit/` gallery SVG/PNG/HTML, registry assets `assets/icons/` and tests `scripts/check-icon-registry.py`.
- **Gate:** no unexplained font/icon styles; all meaningful icons are labeled; UI kit renders actual states and maps to the running code.

### P3 — Page coverage and responsive wireframes

- Inventory exactly these **15 current pages**; do not silently delete or combine: `index`, `how-it-works`, `plans`, `services`, `service-area`, `about`, `faq`, `estimate`, `schedule`, `confirmation`, `status`, `account`, `login`, `privacy`, `terms`.
- Prioritize **conversion journey** first: index → service-area / plans → schedule (five steps) → confirmation → status/account. Next service/education; lastly legal/support.
- Create `design/SCREEN_MAP.md`, one `design/screens/<page-id>.md` per page, editable grayscale desktop/mobile SVG and corresponding PNG. Existing complex flows need additional state/artboards where necessary (ZIP invalid/outside area, wizard validation, estimate mock result, booking pending, errors).
- Use currently shipped layout as the baseline; proposed aesthetic changes need before/after comparison and explicit owner choice. Capture real running baseline snapshots in `design/evidence/before/` before implementation.
- **Gate:** owner reviews page map, wireframes, responsive source order, buttons/navigation and labels. Wireframes alone are not a finished UI kit.

### P4 — Token parity and restrained integration

- Compare computed/color/type/spacing tokens between `index.html` and `css/tokens.css`, then add an automated drift check. A zero-JS static site can use Python/Node tests without changing its deployed runtime.
- Resolve stale `.github/copilot-instructions.md` claims (Playfair and work on main), and update historic README status only with verified source/approval. Never replace current homepage styles merely to achieve a single import file.
- If needed, migrate a *small subset* of duplicated tokens/shared components in isolated feature PRs, with same-screen captures and rollback, while preserving the exact rendered identity and booking flow.
- **Gate:** no unexplained brand-token divergence; real screenshots/functional checks match approved board and UI kit. No new analytics, forms, APIs or secrets introduced as part of this design work.

### P5 — Visual/functional QA and handoff

- Run at minimum 360/390/430px mobile, 768px tablet and 1440px desktop, keyboard/focus/tab, contrast WCAG AA on text/control boundaries, large text, reduced motion, no horizontal overflow, image loading and font fallback.
- Test each real link and primary journey; label browser-only requests as requests **not delivered to business**, and mock estimate/payment behavior as previews. Never certify a Square checkout without actual sandbox/server tests on the separate integration track.
- Save screenshots and any visual diffs, reports, test commands and results under `design/evidence/{before,after,comparisons,qa}`; maintain `design/QA.md` and `design/CORRECTIVE_ACTION.md`.
- **Gate:** owner sees artifact links, defects, non-design blockers and accepts the review PR. Production deployment and Square cutover require separate written approval.

## Phase ownership and review packages

- **Review PR A — design foundations:** P0 + P1, client licensing/fact approvals, brand board visual and kit.
- **Review PR B — component language:** P2, icon/typography registry, UI gallery, no feature expansion.
- **Review PR C — screen proofs:** P3, page map, 15 page specs + responsive wireframes.
- **Review PR D — restrained UI hardening:** P4 + P5, parity/visual regression/accessibility evidence.

Work on branches, use draft PRs, and log verified progress to [the Notion coordination hub](https://app.notion.com/p/41706d5325758132a86ef29a440c8218), append-only. Keep Square implementation in its existing workstream.

## Definition of done

- [ ] Client Google sources actually accessible and latest approvals recorded.
- [ ] Genuine master logos/font rights and approved color/type choices established.
- [ ] Rendered brand board and asset manifest, not just text.
- [ ] Complete functional UI kit/gallery with consistent accessible icons and fonts.
- [ ] Design specifications and desktop/mobile wireframes for all 15 pages and key states.
- [ ] Token parity checks, actual before/after browser screenshots and evidence-based responsive/accessibility QA.
- [ ] Booking/payment statuses represented truthfully; integration blockers explicitly separate.
- [ ] Owner reviewed all draft PRs and authorized merge. No unverified claims of a live launch.
