# Project Overview

FOLD is a premium, mobile-first laundry pickup-and-delivery marketing and booking site for Montgomery, Alabama. The homepage is designed to feel more like a logistics app than a traditional service brochure while preserving the brand voice around transparency, local focus, and convenience.

## Live Site

- [Homepage](https://wglewis0721.github.io/laundry-delivery/index.html)

## Core Brand Messages

- Drop the bags. Keep the weekend.
- Weighed by the bag transparency.
- SMS tracking at each milestone.
- Receipt-before-charge billing.
- Montgomery-first service positioning.

## Page Inventory

| Page | Purpose |
|------|---------|
| `index.html` | Homepage — hero, ZIP check, pricing, testimonials, FAQ |
| `how-it-works.html` | Three-step service explainer |
| `plans.html` | Subscription tiers + overage explainer |
| `services.html` | Service detail (Wash & Fold, Hang-Dry, Delicates) |
| `service-area.html` | ZIP checker + Leaflet map |
| `about.html` | Brand story and values |
| `faq.html` | FAQ accordion + JSON-LD FAQPage schema |
| `estimate.html` | Photo-based laundry estimator (3KD Vision Engine — see below) |
| `schedule.html` | 5-step booking wizard |
| `confirmation.html` | Post-booking confirmation |
| `status.html` | Live order tracking + weigh-in breakdown |
| `account.html` | Member dashboard |
| `login.html` | Authentication entry point |

## 3KD Vision Engine — Estimate Flow

`estimate.html` is the first implementation of the **3KD Vision Engine**, a photo-based laundry estimator. The current build is **front-end only** — recognition is mocked locally. The flow:

1. **Upload** — visitor uploads 1–3 photos of their laundry bag.
2. **Recognition** — `recognizeLaundry()` in `js/estimate.js` returns a blend + fill level (mocked behind `USE_MOCK = true`). The result card shows the detected mix (light/medium/heavy %), fill level, and any heavy outliers.
3. **Quote** — `js/estimate-data.js` pure helpers convert blend + fill into a weight range (lb) and map it to the best-fit plan. The quote card shows the range, recommended plan, expected overage, and a transparent breakdown.
4. **Q&A refinement** — four questions (clothing type, towels/sheets count, heavy items, fill level) recompute the estimate live. The range visibly tightens with each answer.
5. **Book** — CTA persists `fold_estimate` to sessionStorage, merges `fold_booking.plan`, and routes to `schedule.html`.

**Wiring the real backend:** set `USE_MOCK = false` in `js/estimate.js` and implement the `fetch` POST inside `recognizeLaundry()`. The JSDoc in that function documents the expected request/response shape. API credentials must be injected server-side only — never in client code.

**Calibrating weights:** `js/estimate-data.js` exports `GARMENTS` (approximate dry weights) and `PLANS`. Replace the placeholder weights with empirical median values from real pickup-scale data over time.

## Technical Notes

- Static HTML — no build step. Hosted on GitHub Pages.
- Token-first CSS: `tokens.css` → `base.css` → `layout.css` → `components.css` → `utilities.css`. All colour/spacing/type values are CSS custom properties.
- `index.html` uses Tailwind CDN and is a divergent system from the inner pages. All other pages use the token-first CSS system.
- ES module scripts (`store.js`, `booking.js`, `estimate.js`, `estimate-data.js`) load with `<script type="module">`. IIFE scripts (`reveal.js`, `map.js`) load with plain `<script>`.
- Copilot working agreement is at `.github/copilot-instructions.md`.
- All TRA3 backend stubs are marked `// TODO: TRA3`. All 3KD Vision Engine stubs are marked `// TODO: 3KD`.

## Suggested Next Steps

- Replace placeholder imagery with final brand photography.
- Wire the ZIP checker and booking wizard to the TRA3 serverless backend.
- Wire `recognizeLaundry()` to the real 3KD vision backend (flip `USE_MOCK = false`).
- Calibrate `js/estimate-data.js` garment weights from real pickup-scale data.
- Reconcile `index.html` onto the token-first CSS system to eliminate the Tailwind divergence.
- Run a Lighthouse audit after deployment.