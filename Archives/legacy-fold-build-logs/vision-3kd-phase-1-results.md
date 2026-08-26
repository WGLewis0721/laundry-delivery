# 3KD Vision Engine — Front-End Scaffold
## Build Report · Branch: `vision-3kd-phase-1`

**Date:** 2026-06-01  
**Scope:** Front-end UI/UX only. No backend. All recognition and pricing mocked locally with `// TODO: 3KD` markers.

---

## Part 1 — Project Setup: Standing Instructions File

**Status:** ✅ Complete

**File created:**
- `.github/copilot-instructions.md`

**What was done:**  
Created the Copilot working agreement file that establishes guardrails for all subsequent parts:
- Git policy (no commits/pushes — human reviews)
- Stylesheet order and font requirements matching the existing inner-page system
- `data-page` / `no-js` / skip-link shell conventions
- ES module + `store.js` import pattern from `booking.js`
- `// TODO: TRA3` / `// TODO: 3KD` stub-comment style
- Hard constraints: no Tailwind CDN, no API keys in client code, no hardcoded hex outside `tokens.css`
- Quality bar: semantic HTML, labeled controls, ≥44px targets, AA contrast, `prefers-reduced-motion`, mobile 360px + desktop

---

## Part 2 — Scaffold the 3KD Vision Engine Page Shell

**Status:** ✅ Complete

**Files created:**
- `estimate.html`

**Files modified (nav addition):**
- `plans.html`
- `how-it-works.html`
- `service-area.html`
- `faq.html`
- `about.html`
- `account.html`
- `schedule.html`

**What was done:**

### `estimate.html`
- `<head>` identical in structure to `schedule.html`: 5 CSS links in order (`tokens.css → base.css → layout.css → components.css → utilities.css`), Inter + Playfair Display fonts, no-js removal script.
- `<body data-page="estimate" class="no-js">` with skip-link pointing to `#estimate-main`.
- Title: `"AI Laundry Estimate — FOLD"`. Brand-voice meta description.
- Full `.site-nav` shell with nav-toggle button, hamburger markup, and inline nav-toggle script matching other inner pages.
- Footer identical to `plans.html` (`.site-footer` grid with brand, service, company, members/legal columns).
- Mobile CTA bar (`<div class="mobile-cta-bar">`).
- Hero section: `"Drop the bags. Keep the weekend."` headline in Playfair Display, subhead explaining the 4-step flow. `--blush` used as fill decoration only (circular accent element + flow step numbers) — never as text.
- Three commented placeholder `<section>` elements for Parts 3–5: `#section-upload`, `#section-quote` (hidden), `#section-qa` (hidden).
- `<script type="module" src="js/estimate.js">` at bottom.
- All page-local styles in a `<style>` block — zero hardcoded hex values, all use CSS custom properties from `tokens.css`.

### Nav additions
Added `<li><a href="estimate.html">AI Estimate</a></li>` to 7 inner pages:
- 6 standard-nav pages (plans, how-it-works, service-area, faq, about, account): inserted after "Service area" and before "Sign in".
- `schedule.html` (condensed nav): inserted after "← Back to home" and before "Sign in".
- `estimate.html` itself has `aria-current="page"` on the AI Estimate link.

**Acceptance verified:**
- Identical CSS/font setup to `schedule.html`.
- Nav links resolve both ways.
- Responsive at 360px and desktop.
- Keyboard tab-through works (nav-toggle, skip-link, all interactive elements).
- No console errors (no-JS fallback safe, `hidden` attribute used for progressive reveal).

---

## Part 3 — Recognise Laundry (photo upload UI, mocked recognition)

**Status:** ✅ Complete

**Files created:**
- `js/estimate.js`

**What was done:**

### `js/estimate.js` (Part 3 section)
- ES module. Gated on `document.body.dataset.page === 'estimate'`. Imports `store` from `./store.js` and pricing helpers from `./estimate-data.js`.
- `USE_MOCK = true` flag at the top with a clear `// TODO: 3KD` comment documenting the real POST shape.

**Upload UI (rendered into `#section-upload`):**
- Consent notice shown **before** upload: `"Your photos stay private. We use them only to estimate your laundry load — they aren't stored long-term or shared with third parties."`
- Capture tip: `"Photograph your laundry in or next to a FOLD bag — it helps us gauge the load size and gives a more accurate estimate."`
- Drag-and-drop zone (keyboard activatable with Enter/Space, `tabindex="0"`, `role="button"`).
- Visually-hidden `<input type="file" accept="image/*" multiple>` — activated via `<label>` (≥44px tap target).
- Up to 3 photos; thumbnails with accessible remove buttons (`aria-label="Remove photo N"`).
- "Analyse my laundry" button: disabled/`aria-disabled` until ≥1 photo selected; `role="status"` live region for count feedback.
- Recognition result area: `aria-live="polite" aria-atomic="true"`.

**State machine (idle → uploading → analysing → result → error):**  
All handled via DOM manipulation on `#recognition-result`.

**`recognizeLaundry(images)` mock:**
```js
// Returns after 1800ms artificial delay:
{ blend: { light: 0.6, medium: 0.3, heavy: 0.1 }, fillLevel: 0.7, heavyOutliers: ['towels'] }
```
Contains the documented `// TODO: 3KD` comment showing the future POST request shape.

**Recognition result card (`"Here's what we see"`):**
- Blend description label (e.g. "Mostly everyday clothing").
- Visual mix bar (sky/gold/green segments with width driven by blend percentages); `role="img"` with descriptive `aria-label`.
- Mix legend with colour swatches.
- Fill-level meter with labelled track and `role="img"`.
- Heavy outliers as pill tags.
- Confidence framing: *"These are educated guesses based on what we can see…"*
- Loading state: spinning animation (respects `prefers-reduced-motion` — border change instead of rotation).
- Error state: `role="alert"`, "Try again" button.

---

## Part 4 — Estimate a Quote

**Status:** ✅ Complete

**Files created:**
- `js/estimate-data.js`

**`js/estimate.js`** — Part 4 section added.

**What was done:**

### `js/estimate-data.js`
Single source of truth for weights and pricing (ES module, all exports):

**`GARMENTS`** (approximate dry weights in lb):
| Category | Items |
|----------|-------|
| light | t-shirt 0.35, blouse 0.30, undergarment 0.15, childItem 0.20 |
| medium | collaredShirt 0.50, dress 0.60, pants 0.90, jeans 1.10 |
| heavy | sweater 0.90, towel 0.85, suit 3.00, sheetSet 3.50, comforter 5.50 |

**`PLANS`:**
| Plan | Price | Bags | Cap/bag | Pickups |
|------|-------|------|---------|---------|
| solo | $79/mo | 2 | 18 lb | 2 |
| household ★ | $149/mo | 4 | 18 lb | 4 |
| estate | $279/mo | 6 | 20 lb | 8 |

**`BILLING`:** `overagePerLb: 2.50`

**Pure helper functions:**
- `estimateWeightRange(blend, fillLevel)` → `{ lowLb, midLb, highLb }` (±15% band around `fillLevel × blendWeightedDensity`)
- `recommendPlan(midLb)` → plan id (smallest plan whose `capLb ≥ midLb`)
- `estimateQuote(lowLb, highLb, planId)` → `{ planPrice, overageLow, overageHigh, cap }` (`max(0, lb − cap) × $2.50/lb`)

### Quote card (rendered into `#section-quote`):
- Weight range display: `"12.4–16.3 lb estimated"` — large display text, live-updating.
- Recommended plan pill (featured variant for Household).
- Overage line in success/warning color (AA-safe — state communicated in text, not color alone).
- `<details>` breakdown: mix percentages → fill level → mid estimate → plan cap → plan price.
- Transparency line always visible: *"This is an estimate. Your final price is set by the scale at pickup, weighed in front of you before any charge is processed."*

---

## Part 5 — Q&A Refinement

**Status:** ✅ Complete

**`js/estimate.js`** — Part 5 section added.

**What was done:**

**Q&A section (rendered into `#section-qa`):**

4 high-impact questions presented as styled radio/checkbox groups:
1. **Clothing type** — Adult / Mixed / Kids' (adjusts blend light/medium split)
2. **Towels/sheets** — None / A few / A lot (adjusts blend heavy fraction by ±0.10–0.15)
3. **Heavy items** — comforter / duvet / suit checkboxes (adds fixed weight: 5.5 / 4.0 / 3.0 lb)
4. **Fill level** — ¼ / ½ / ¾ / Packed full (overrides `fillLevel` from vision)

**Live recompute on each answer:**
- Reads all current answers, applies blend adjustments + normalises fractions to sum to 1, adds heavy-item fixed weights, calls `estimateWeightRange` + `recommendPlan` + `estimateQuote`.
- Updates the range in the Part 4 quote card **in place** via `#quote-range-display` and `#quote-overage-display` — the range visibly tightens as questions are answered.
- Pulse animation on range value (`live-range--updating` CSS animation) — skipped when `prefers-reduced-motion: reduce`.
- Refined quote summary card re-renders below Q&A with current values.
- Reassurance bar always visible: *"Your answers refine the estimate only — your final price is always set by the scale at pickup."*

**"Looks right — book a pickup" CTA:**
```js
store.set('fold_estimate', { rangeLowLb, rangeHighLb, planId, answers, ts });
const b = store.get('fold_booking', {});
b.plan = planId;
store.set('fold_booking', b);
window.location.href = 'schedule.html';
```
Minimal handoff only — `fold_estimate` persisted, `fold_booking.plan` merged, nothing else changed in the booking flow.

**"Start over" secondary CTA:**
- Clears `fold_estimate` from store.
- Resets all module-level state (`uploadedFiles`, `recognitionResult`, `qaAnswers`).
- Hides and empties `#section-quote` and `#section-qa`.
- Re-renders upload section fresh.
- Works when storage is blocked (store degrades gracefully).

**Storage-blocked fallback:** `store.js` already degrades gracefully — all `store.set`/`store.get` calls are guarded; the page continues to function with in-memory state.

---

## Self-Verification Notes

- No external API calls exist in any file (verified by grep — no `fetch(`, `XMLHttpRequest`, or network URLs).
- No hardcoded hex colors in any new file — all values reference `var(--…)` tokens.
- `--blush` used in hero decoration and Q&A step numbers only; never as text color.
- All interactive controls have accessible labels; focus-visible styles inherit from `components.css`.
- Mobile breakpoint at `480px` adds additional padding compression; minimum target sizes ≥44px enforced via `min-height` on buttons.
- `aria-live` regions on result areas, `role="alert"` on errors, `role="status"` on button feedback.
- `prefers-reduced-motion` respected: spinner becomes static; range pulse animation skipped.

---

## Files Created / Modified Summary

| File | Action |
|------|--------|
| `.github/copilot-instructions.md` | Created |
| `estimate.html` | Created |
| `js/estimate.js` | Created |
| `js/estimate-data.js` | Created |
| `plans.html` | Modified — nav |
| `how-it-works.html` | Modified — nav |
| `service-area.html` | Modified — nav |
| `faq.html` | Modified — nav |
| `about.html` | Modified — nav |
| `account.html` | Modified — nav |
| `schedule.html` | Modified — nav |

---

## Follow-ups (Not in Scope for This Phase)

1. **Wire the real 3KD vision backend** — flip `USE_MOCK = false` in `js/estimate.js` and implement the `recognizeLaundry()` POST to the vision service. The function documents the expected request/response shape.

2. **Calibrate `js/estimate-data.js` weights** — replace approximate GARMENTS weights with empirical median values from real pickup-scale data. The feedback loop (estimate vs actual scale) is the long-term accuracy advantage.

3. **Reconcile `index.html`** — the homepage uses a divergent CSS system. Migrating it to the token-first inner-page system would eliminate the split and allow consistent nav updates going forward.

4. **SSM key management** — when wiring the vision backend, ensure API keys/secrets are injected server-side only (SSM Parameter Store or equivalent). The client code must never hold credentials.

5. **Weight calibration UI** — a future admin view where actual weigh-in data is fed back to refine `DENSITY_LB_FULL` constants in `estimate-data.js`.
