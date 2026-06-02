# FOLD — Laundry Pickup & Delivery Website

Premium, mobile-first, static marketing-and-booking website for **FOLD**, a subscription laundry pickup-and-delivery service in Montgomery, AL.

Live site: [https://wglewis0721.github.io/laundry-delivery/index.html](https://wglewis0721.github.io/laundry-delivery/index.html)

Hosted on **GitHub Pages** (no build step). Backend integration points are marked `// TODO:` for the TRA3 serverless backend and `// TODO: 3KD` for the 3KD Vision Engine (separate specs).

Project documentation:
- [docs/project-overview.md](docs/project-overview.md)

---

## Pages

| File | URL | Description |
|---|---|---|
| `index.html` | `/` | Homepage — all 12 blueprint sections |
| `how-it-works.html` | `/how-it-works` | Three-step explainer |
| `plans.html` | `/plans` | Pricing tiers + overage explainer |
| `services.html` | `/services` | Service detail (Wash & Fold, Hang-Dry, Delicates) |
| `service-area.html` | `/service-area` | ZIP checker + interactive map |
| `about.html` | `/about` | Brand story and values |
| `faq.html` | `/faq` | Full FAQ accordion (9 questions + JSON-LD FAQPage) |
| `estimate.html` | `/estimate` | Photo-based laundry estimator — upload photos, get a weight range + recommended plan, refine via Q&A, then book |
| `schedule.html` | `/schedule` | 5-step booking wizard |
| `confirmation.html` | `/confirmation` | Post-booking confirmation |
| `status.html` | `/status` | Live order tracking + weigh-in breakdown + SMS feed |
| `account.html` | `/account` | Sign-in + member dashboard |
| `login.html` | `/login` | Sign-in entry point |
| `privacy.html` | `/privacy` | Privacy policy (pre-launch placeholder) |
| `terms.html` | `/terms` | Terms of service (pre-launch placeholder) |

---

## Folder structure

```
fold-website/
├── index.html               Homepage
├── how-it-works.html
├── plans.html
├── services.html
├── service-area.html
├── about.html
├── faq.html
├── estimate.html            Photo-based laundry estimator (3KD Vision Engine)
├── schedule.html            Booking wizard
├── confirmation.html        Post-booking confirmation
├── status.html              Live order tracking
├── account.html             Member dashboard
├── login.html
├── privacy.html
├── terms.html
├── .github/
│   └── copilot-instructions.md   Copilot working agreement for this repo
├── assets/
│   ├── img/                 WebP/AVIF images (add here, reference in HTML)
│   ├── icons/               Inline-able SVGs
│   └── fonts/               Self-hosted fonts (optional)
├── css/
│   ├── tokens.css           CSS custom properties — palette, type, spacing
│   ├── base.css             Reset, typography, focus styles
│   ├── layout.css           Nav, footer, section rhythm, grid, mobile CTA bar
│   ├── components.css       All UI components
│   └── utilities.css        Helper classes
├── docs/
│   └── project-overview.md
├── js/
│   ├── store.js             SessionStorage wrapper (ES module)
│   ├── reveal.js            Scroll-reveal via IntersectionObserver (IIFE)
│   ├── booking.js           5-step booking wizard (ES module)
│   ├── map.js               Lazy-init Leaflet map (IIFE)
│   ├── estimate.js          Photo estimator — upload, mock recognition, quote, Q&A (ES module)
│   └── estimate-data.js     Garment weights, plan definitions, billing config + pure helpers (ES module)
└── prompts/
    └── results/             Agent build reports
```

---

## CSS architecture

Token-first (ITCSS-style cascade): `tokens.css` → `base.css` → `layout.css` → `components.css` → `utilities.css`.

All colour, spacing, and type values live in `css/tokens.css` as CSS custom properties.

**Accessibility note:** the accent palette (`--gold`, `--green`, `--sky`, `--blush`) is for fills and decoration only — they do not meet WCAG AA contrast for text. Body text uses `--ink: #2D3748`. Button fills use `--green-btn: #2E7D32` (5.0:1 on white, AA-compliant).

---

## JavaScript architecture

- Progressive enhancement — pages work without JS; JS adds reveals, selection logic, and the booking wizard.
- `store.js`, `booking.js`, `estimate.js`, and `estimate-data.js` are ES modules — load with `<script type="module">`.
- `reveal.js` and `map.js` are IIFEs — load with plain `<script src>`.
- Booking state is stored in `sessionStorage` under key `fold_booking`.
- Estimate state is stored in `sessionStorage` under key `fold_estimate`.
- ZIP → schedule handoff via URL param: `schedule.html?zip=36106`.
- Plan → schedule handoff: `schedule.html?plan=household` or via `fold_booking.plan` (set by estimate flow).
- All TRA3 integration points are marked `// TODO: TRA3`.
- All 3KD Vision Engine stubs are marked `// TODO: 3KD`.

### Estimate flow (`estimate.html`)

1. User uploads 1–3 photos → `recognizeLaundry()` returns a blend/fill fixture (mocked behind `USE_MOCK = true`).
2. `estimateWeightRange()` + `recommendPlan()` + `estimateQuote()` in `estimate-data.js` produce an initial weight range and plan.
3. Four Q&A questions refine the blend/fill in real time; the displayed range narrows as answers are given.
4. "Book a pickup" persists `fold_estimate` and merges `fold_booking.plan`, then routes to `schedule.html`.

To wire the real vision backend: set `USE_MOCK = false` in `js/estimate.js` and implement the POST inside `recognizeLaundry()` (the expected request/response shape is documented in the function's JSDoc).

---

## Local development

No build step required. Open any HTML file directly in a browser, or serve with:

```bash
npx serve .
# or
python3 -m http.server 8080
```

---

## Pre-launch checklist

- [ ] Replace placeholder prices with confirmed launch pricing
- [ ] Review and finalise `privacy.html` and `terms.html` with legal counsel
- [ ] Replace demo TRA3 `// TODO:` stubs with real API calls
- [ ] Add real photos to `assets/img/`
- [ ] Verify Montgomery, AL ZIP code set in `booking.js` and `service-area.html` against TRA3
- [ ] Configure Square production credentials (see TRA3 runbook)
- [ ] Set up Google Business Profile and enable review schema (`AggregateRating`)
- [ ] Run Lighthouse audit (target: 95+ Performance, 100 Accessibility, 100 Best Practices, 100 SEO)
- [ ] Run WAVE or axe accessibility audit
- [ ] Enable GitHub Pages on the repository

---

*Market: Montgomery, AL. Backend: TRA3 (serverless, separate spec). Design system: FOLD Website Design Blueprint Phase 1.*
