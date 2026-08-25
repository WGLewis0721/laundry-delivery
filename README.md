# Soapbox Caddie — Laundry Pickup & Delivery Website

Static marketing-and-booking website for **Soapbox Caddie**, a laundry pickup, wash, dry, fold and return-delivery service in the **River Region** (Montgomery, AL and surrounding areas).

Live site: [https://wglewis0721.github.io/laundry-delivery/index.html](https://wglewis0721.github.io/laundry-delivery/index.html)

Hosted on **GitHub Pages** — no build step, no framework, no bundler. Backend integration points are marked `// TODO: TRA3` (serverless backend) and `// TODO: 3KD` (Vision Engine estimator); both are separate specs.

> **Current state:** the **homepage is Soapbox Caddie**; every other page is still the **earlier "FOLD / Montgomery" build**. That inconsistency is live and intentional — the redesign is being rolled out homepage-first. See [Brand rollout status](#brand-rollout-status).

---

## Brand and service facts

These are the confirmed client details the homepage is built around. Treat them as the source of truth for copy on any new page.

| | |
|---|---|
| Brand | Soapbox Caddie |
| Market | River Region |
| Primary campaign line | *Choose peace, not laundry.* |
| Secondary campaign line | *Let us help you take a load off.* |
| Service | Pickup → wash → dry → fold → return delivery |
| Positioning | Personal, premium laundry concierge — not a laundromat, not a tech startup |

### Bag pricing

Charged **by the bag**, filled to the line printed on the bag.

| Bag | Price |
|---|---|
| Small | $45 |
| Medium | $60 |
| Large | $80 |

Bag weight capacities are **deliberately undocumented** — no weights or load counts have been confirmed by the client. Card copy carries a `TODO` where that wording belongs. Do not invent capacities.

### Subscription

| | |
|---|---|
| Startup fee | $75 (one time) |
| Included | 2 bags per week |
| Weekly | $55 |
| Each additional bag | $25 |

---

## Homepage

`index.html` is a self-contained page: Tailwind via CDN plus an inline `<style>` block that owns the layout system, and three small inline IIFEs. It does **not** use `css/*` or `js/*`.

### Section order

The composition follows the client-approved homepage mockup.

| # | Section | Anchor |
|---|---|---|
| 1 | Header / navigation | — |
| 2 | Hero — `Choose peace, not laundry.` | — |
| 3 | ZIP service-area checker (inside the hero) | `#zip-check` |
| 4 | Bag pricing — $45 / $60 / $80 | `#pricing` |
| 5 | How It Works — Book, Fill, Pickup, Clean & Return | `#how-it-works` |
| 6 | Subscription banner | `#subscriptions` |
| 7 | Gift Laundry callout | `#gift-laundry` |
| 8 | About + Business & Contracting (paired row) | `#about`, `#business` |
| 9 | FAQs / Protections / Waivers reassurance band | `#trust`, `#faq`, `#protections`, `#waivers` |
| 10 | Footer (includes a second ZIP checker) | `#footer-connect` |

Conversion path: **understand the service → check ZIP → see bag pricing → understand the process → book or subscribe.**

### Layout system

Layout is driven by CSS custom properties defined on `:root` in the homepage's inline `<style>`:

| Token group | Properties |
|---|---|
| Container | `--shell-max`, `--shell-gutter`, `--shell-content` |
| Rhythm | `--section-space`, `--section-space-tight`, `--grid-gap` |
| Shape | `--radius-card`, `--radius-pill` |
| Surfaces | `--surface`, `--surface-muted`, `--surface-warm`, `--line`, `--line-strong` |
| Text | `--ink`, `--ink-soft` |

Structural conventions:

- `.shell` is the single container (max-width + fluid gutters). Every band aligns to it.
- `.section` / `.section--tight` own vertical rhythm — don't add one-off margins.
- Card grids use `repeat(auto-fit, minmax(min(100%, Xrem), 1fr))` so they reflow without breakpoint cliffs.
- The hero is a full-bleed named-line grid: copy aligns to `.shell` while the media runs to the right viewport edge.
- Every image region is a `.media-slot` with an explicit `aspect-ratio` (or a `min-height` at desktop) so real photography drops in without layout shift.
- Component styles live in the inline stylesheet, not in utility soup. **Watch the cascade:** Tailwind's CDN injects its stylesheet at runtime, so a utility class can beat an equally-specific rule of yours. Anything that must win (for example the desktop/mobile nav swap) is owned by a single class rule with no competing utility.

### Responsive behaviour

Verified at 1440, 1280, 1024, 768, 430, 390 and 375px — no horizontal overflow, no clipped text, no overlapping bands, no console errors.

| Breakpoint | Behaviour |
|---|---|
| ≥ 1088px (68rem) | Full navigation bar |
| ≥ 992px (62rem) | Hero two-column with right-bleeding media |
| ≥ 896px (56rem) | Subscription and gift bands go side-by-side |
| ≥ 768px (48rem) | How It Works runs four across; mobile sticky CTA hides |
| < 768px | Single-column stack; How It Works becomes a vertical icon-beside-text sequence |
| ≤ 430px | Bag cards stack one per row |

Mobile source order is deliberate: header → headline → supporting copy → ZIP checker → hero image → pricing → process → subscription → gift → about → business → reassurance → footer.

### Accessibility baseline

One `h1`, no skipped heading levels, both ZIP inputs labelled, `role="status"` + `aria-live="polite"` result regions, `aria-expanded` and label kept in sync on the nav toggle (closes on link click, outside click and Escape), a visible focus ring on every interactive element, and `prefers-reduced-motion` honoured.

---

## Redesign phases

| Phase | Scope | Status |
|---|---|---|
| 1 | Homepage information architecture, section hierarchy, responsive structure | ✅ Done |
| 1-B | Mockup fidelity — proportions, density, column ratios, spacing | ✅ Done |
| 2 | Final colour palette and image placeholder treatment | ⏳ Not started |
| 3 | Real branding, logo, client photography, icon set, final polish | ⏳ Not started |

Phase 2 recolours the page by swapping the surface and ink custom properties — the markup should not need to change. The dark subscription band, the two warm surfaces and the hairline borders are all neutral stand-ins mapped to those properties.

### Homepage placeholders awaiting Phase 2/3

Hero lifestyle image · Small / Medium / Large bag images · Subscription image · Gift Laundry image · About image · Business image · 12 icon slots (4 process, 3 reassurance, 1 fill-line, 1 gift, 3 social) · logo wordmark (currently a boxed text mark) · footer email, phone and social links.

Footer contact details read "to be published" on purpose — no real phone or email has been supplied, and placeholder contact details must not ship.

---

## Brand rollout status

| Page | Brand | Design system |
|---|---|---|
| `index.html` | **Soapbox Caddie** | Tailwind CDN + inline tokens |
| all other pages | FOLD / Montgomery (pre-redesign) | `css/*` token system |

Consequences worth knowing before you touch anything:

- Navigating from the homepage to any inner page changes both the brand and the visual language.
- The homepage's `Our Story`, `View FAQs`, `Pickup & Delivery` and policy links all land on FOLD-era pages.
- `Protections` and `Waivers` both point at `terms.html` until dedicated pages exist.
- `Partner With Us` and `Gift Laundry` point at `#zip-check` until their flows exist.

---

## Pages

| File | URL | Description |
|---|---|---|
| `index.html` | `/` | **Homepage — Soapbox Caddie redesign** |
| `how-it-works.html` | `/how-it-works` | Three-step explainer |
| `plans.html` | `/plans` | Pricing tiers + overage explainer |
| `services.html` | `/services` | Service detail (Wash & Fold, Hang-Dry, Delicates) |
| `service-area.html` | `/service-area` | ZIP checker + Leaflet map |
| `about.html` | `/about` | Brand story and values |
| `faq.html` | `/faq` | FAQ accordion + JSON-LD FAQPage |
| `estimate.html` | `/estimate` | Photo-based laundry estimator (3KD Vision Engine) |
| `schedule.html` | `/schedule` | 5-step booking wizard |
| `confirmation.html` | `/confirmation` | Post-booking confirmation |
| `status.html` | `/status` | Order tracking + weigh-in breakdown |
| `account.html` | `/account` | Member dashboard |
| `login.html` | `/login` | Sign-in entry point |
| `privacy.html` | `/privacy` | Privacy policy (pre-launch placeholder) |
| `terms.html` | `/terms` | Terms of service (pre-launch placeholder) |

---

## Folder structure

```
laundry-delivery/
├── index.html               Homepage (self-contained: Tailwind CDN + inline CSS/JS)
├── how-it-works.html
├── plans.html
├── services.html
├── service-area.html
├── about.html
├── faq.html
├── estimate.html            Photo-based laundry estimator (3KD Vision Engine)
├── schedule.html            Booking wizard
├── confirmation.html        Post-booking confirmation
├── status.html              Order tracking
├── account.html             Member dashboard
├── login.html
├── privacy.html
├── terms.html
├── .github/
│   └── copilot-instructions.md   Working agreement for this repo
├── assets/
│   ├── img/                 Photography (add here, reference from HTML)
│   ├── icons/               Inline-able SVGs
│   └── fonts/               Self-hosted fonts (optional)
├── css/                     Token-first system — used by every page EXCEPT index.html
│   ├── tokens.css           Custom properties — palette, type, spacing
│   ├── base.css             Reset, typography, focus styles
│   ├── layout.css           Nav, footer, section rhythm, grid, mobile CTA bar
│   ├── components.css       UI components
│   └── utilities.css        Helper classes
├── js/                      Shared modules — NOT used by index.html
│   ├── store.js             sessionStorage wrapper (ES module)
│   ├── booking.js           5-step booking wizard (ES module)
│   ├── reveal.js            Scroll reveal via IntersectionObserver (IIFE)
│   └── map.js               Lazy-init Leaflet map (IIFE)
├── 3KD/frontend/js/
│   ├── estimate.js          Estimator flow module
│   └── estimate-data.js     Weight/pricing model + pure helpers
├── TRA3/backend-integration/  AWS serverless package (Terraform, Lambda, scripts)
├── docs/
│   └── project-overview.md  ⚠️ Still describes the FOLD-era site
└── prompts/results/         Agent build reports
```

---

## CSS architecture

**Two systems currently coexist.** This is a known divergence, not an accident:

1. **`index.html`** — Tailwind CDN for utilities plus an inline `<style>` block that owns the layout system and every component. Self-contained so the redesign could move without disturbing the rest of the site.
2. **Every other page** — token-first ITCSS cascade: `tokens.css` → `base.css` → `layout.css` → `components.css` → `utilities.css`, with all colour, spacing and type values as custom properties in `css/tokens.css`.

Reconciling the two is a post-Phase-3 task: once the Soapbox Caddie palette is final, promote the homepage tokens into `css/tokens.css` and migrate the inner pages.

**Accessibility note (`css/*` system):** the accent palette (`--gold`, `--green`, `--sky`, `--blush`) is for fills and decoration only — it does not meet WCAG AA contrast for text. Body text uses `--ink: #2D3748`; button fills use `--green-btn: #2E7D32` (5.0:1 on white).

---

## JavaScript architecture

Progressive enhancement throughout — every page works without JS; JS adds reveals, selection logic, and the booking wizard.

**Homepage** (`index.html`, three inline IIFEs, no external JS):

1. Mobile navigation toggle.
2. Reveal-on-scroll via `IntersectionObserver`, with a no-observer fallback that shows everything.
3. ZIP service-area checker, bound to every `.js-zip-form` on the page (hero and footer).

**Shared modules** (all other pages):

- `store.js`, `booking.js`, `3KD/frontend/js/estimate.js`, `estimate-data.js` are ES modules — load with `<script type="module">`.
- `reveal.js` and `map.js` are IIFEs — load with plain `<script src>`.
- Booking state: `sessionStorage` key `fold_booking`. Estimate state: `fold_estimate`. (Keys are pre-rebrand; renaming them will invalidate in-flight sessions.)

### ZIP checker

The homepage checker validates a 5-digit ZIP against a hard-coded set of Montgomery ZIPs (36101–36120) and shows one of three inline results: invalid input, served (reveals next-step CTAs), or not-yet-served.

The forms carry `novalidate` so the inline `aria-live` message is the single source of feedback rather than the browser's native bubble.

⚠️ **That ZIP set is duplicated in four places** — `index.html`, `schedule.html`, `service-area.html` and `js/booking.js`. Change one, change all four, or better: replace all four with the TRA3 service-area API (each site is marked `// TODO: TRA3`).

### Handoffs between pages

- ZIP → booking: `schedule.html?zip=36106` (appended automatically when a served ZIP is confirmed).
- Bag → booking: `schedule.html?bag=small|medium|large` (accepted, not yet consumed — wire up with Acuity).
- Plan → booking: `schedule.html?plan=…`, or via `fold_booking.plan` set by the estimate flow.

### Estimate flow (`estimate.html`)

1. Upload 1–3 photos → `recognizeLaundry()` returns a blend/fill fixture (mocked behind `USE_MOCK = true`).
2. `estimateWeightRange()` + `recommendPlan()` + `estimateQuote()` produce an initial weight range and plan.
3. Four Q&A questions refine blend/fill live; the range narrows as answers arrive.
4. "Book a pickup" persists `fold_estimate`, merges `fold_booking.plan`, and routes to `schedule.html`.

To wire the real backend: set `USE_MOCK = false` in `3KD/frontend/js/estimate.js` and implement the POST inside `recognizeLaundry()` (request/response shape is in that function's JSDoc).

---

## Local development

No build step. Open a file directly, or serve the folder:

```bash
python3 -m http.server 8080
# or
npx serve .
```

Then visit <http://localhost:8080/index.html>.

### Checking the homepage after a change

The homepage has no test suite, so verify by hand:

- Resize through **1440 / 1280 / 1024 / 768 / 430 / 390 / 375px** — no horizontal scrollbar at any width.
- Open the mobile menu and close it three ways: link click, outside click, Escape.
- Submit both ZIP forms with an invalid ZIP, an unserved ZIP (`99999`) and a served ZIP (`36106`).
- Tab through the page — focus order should follow the visual order and every stop should show a focus ring.
- Check the console is clean. (Google Fonts and Tailwind load from CDNs, so a network-restricted environment will show request failures that are environmental, not page bugs.)

---

## Pre-launch checklist

- [ ] Roll the Soapbox Caddie brand onto the remaining 14 pages
- [ ] Apply Phase 2 palette, then Phase 3 branding, photography and icons
- [ ] Supply real footer contact details and social links
- [ ] Confirm bag capacity wording (currently `TODO` in each bag card)
- [ ] Build dedicated Protections and Waivers pages; repoint the reassurance band
- [ ] Build the Gift Laundry purchase flow and the Business & Contracting page
- [ ] Replace all four hard-coded ZIP sets with the TRA3 service-area API
- [ ] Integrate Acuity for booking
- [ ] Review and finalise `privacy.html` and `terms.html` with legal counsel
- [ ] Add a favicon (none exists in the repo)
- [ ] Refresh `docs/project-overview.md` for the Soapbox Caddie build
- [ ] Run Lighthouse (target: 95+ Performance, 100 Accessibility / Best Practices / SEO) and an axe or WAVE audit

---

*Market: River Region. Backend: TRA3 (serverless, separate spec). Estimator: 3KD Vision Engine (separate spec). Homepage design: Soapbox Caddie approved mockup, Phase 1-B.*
