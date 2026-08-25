# Soapbox Caddie — Laundry Pickup & Delivery Website

Static marketing-and-booking website for **Soapbox Caddie**, a laundry pickup, wash, dry, fold and return-delivery service in the **River Region** (Montgomery, AL and surrounding areas).

Live site: [https://wglewis0721.github.io/laundry-delivery/index.html](https://wglewis0721.github.io/laundry-delivery/index.html)

Hosted on **GitHub Pages** — no build step, no framework, no bundler. Backend integration points are marked `// TODO: TRA3` (serverless backend) and `// TODO: 3KD` (Vision Engine estimator); both are separate specs.

> **Current state:** every page is Soapbox Caddie. The homepage is the fully realised design; the inner pages share the same palette, typography, iconography and chrome through the `css/*` token system. See [Design systems](#css-architecture) for how the two builds relate.

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

`index.html` is a **fully self-contained page with zero external runtime dependencies**: an inline `<style>` block owning the reset, design tokens, layout and components; three small inline IIFEs; and self-hosted fonts from `assets/fonts/`. It renders correctly with the network disabled. It does **not** use `css/*` or `js/*`.

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
| Shape | `--radius-sm`, `--radius-md`, `--radius-lg`, `--radius-pill` |
| Surfaces | `--surface`, `--surface-muted`, `--surface-warm`, `--line`, `--line-strong` |
| Text | `--ink`, `--ink-soft` |

Structural conventions:

- `.shell` is the single container (max-width + fluid gutters). Every band aligns to it.
- `.section` / `.section--tight` own vertical rhythm — don't add one-off margins.
- Card grids use `repeat(auto-fit, minmax(min(100%, Xrem), 1fr))` so they reflow without breakpoint cliffs.
- The hero is a full-bleed named-line grid: copy aligns to `.shell` while the media runs to the right viewport edge.
- Every image region is a `.media-slot` with an explicit `aspect-ratio` (or a `min-height` at desktop) so real photography drops in without layout shift.
- Component styles live in the inline stylesheet. There is no utility framework, so the cascade is entirely yours - a rule wins or loses purely on specificity and order.

### Colour and typography

The palette lives as custom properties in the same `:root` block; **no hex value
appears anywhere else in the file**, so a rebrand is a token edit.

| Group | Tokens |
|---|---|
| Light surfaces (~60%) | `--color-linen`, `--color-warm-white`, `--color-white` |
| Sage (~30% with tans) | `--color-sage`, `--color-sage-light`, `--color-sage-dark` |
| Natural tans | `--color-camel`, `--color-sand`, `--color-oatmeal` |
| Brand greens (~10%) | `--color-olive`, `--color-olive-soft` |
| Text | `--color-charcoal`, `--color-text-muted` |
| On dark | `--color-on-dark`, `--color-on-dark-muted`, `--color-on-dark-line` |

Semantic aliases (`--surface`, `--line`, `--ink`, `--accent`) sit on top, so
components never name a palette colour directly.

**Contrast rules that are not negotiable** — these were measured, not guessed:

- `--color-sage-dark` is 3.5:1 on warm white: **icons and borders only, never text.**
- `--color-camel` is 3.0:1: **decoration only, never text and never a control boundary.**
- `--color-text-muted` is only 4.0:1 on oatmeal, so the gift band uses charcoal.
- `--color-border` is 1.4:1: decorative hairlines only. Interactive boundaries use `--line-strong`.
- On-dark muted text must stay at `#DBDCD4` or lighter; darker values fail AA on the subscription band.

### Fonts

Three variable fonts are **self-hosted from `assets/fonts/`** — no CDN, no
`@import`, no runtime third-party requests.

| Token | Family | Used for | Source |
|---|---|---|---|
| `--font-display` | Cormorant Garamond (roman + italic) | h1, h2, prices | [google/fonts](https://github.com/google/fonts/tree/main/ofl/cormorantgaramond) |
| `--font-body` | Inter | body, nav, forms, buttons, footer | [rsms/inter](https://github.com/rsms/inter) |
| `--font-condensed` | Oswald | uppercase micro-labels only | [google/fonts](https://github.com/google/fonts/tree/main/ofl/oswald) |

All three are variable fonts with real `wght` ranges (Cormorant 300–700, Inter
100–900, Oswald 200–700), so every weight is a genuine instance rather than a
synthesised one. Total payload is ~758 KB; the two Cormorant faces are preloaded
because they render the above-the-fold headline, and everything uses
`font-display: swap`.

Inter and Oswald came as official WOFF2 / were converted from the official
variable TTFs with `fonttools`. To cut the payload to ~232 KB, subset to latin:

```bash
pip install fonttools brotli
pyftsubset assets/fonts/inter/InterVariable.woff2 --flavor=woff2 --layout-features='*' \
  --unicodes='U+0000-00FF,U+0131,U+0152-0153,U+2000-206F,U+20AC,U+2122' \
  --output-file=assets/fonts/inter/InterVariable.woff2
```

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

## Two builds, one design system

| | Homepage (`index.html`) | Inner pages (14) |
|---|---|---|
| CSS | Inline `<style>`, self-contained | `css/*` cascade |
| Palette | Inline tokens | `css/tokens.css` |
| Fonts | Inline `@font-face` | `css/fonts.css` |
| Runtime deps | None | None, except the Leaflet map |

Both builds use the **same palette values, the same three fonts and the same
line-icon family**, so they read as one site. No page loads fonts, CSS or a
framework from a CDN. The one external runtime dependency left anywhere on the
site is `service-area.html`, which pulls Leaflet from unpkg and map tiles from
OpenStreetMap — inherent to showing a map, and it fails gracefully to the ZIP
checker beside it. The duplication is in *where the
declarations live*, not in what they say — changing a brand colour means editing
two token blocks, and both are labelled.

Consolidating them (promoting the homepage tokens into `css/tokens.css` and
migrating the homepage onto the shared cascade) is a worthwhile follow-up, but
it is a refactor with no visual payoff, so it has been left until the branding
is final.

**Known gaps:**

- The **3KD estimator** (`estimate.html`) still runs on the retired weight-and-tier
  model — it computes a weight range and maps it to plans that no longer exist. The
  page now says so and points at `plans.html` as the pricing authority. Recalibrating
  it needs client-confirmed bag capacities, which do not exist yet.
- `account.html` carries two `h1`s because it holds the signed-out and signed-in
  views in one document, toggled by JS. Pre-existing, and only one is ever visible.
- The header and footer brand mark is a type stand-in, not the logo.

## Pages

| File | URL | Description |
|---|---|---|
| `index.html` | `/` | **Homepage — the fully realised design** |
| `how-it-works.html` | `/how-it-works` | Three-step explainer |
| `plans.html` | `/plans` | Bag pricing ($45/$60/$80) + the subscription |
| `services.html` | `/services` | Service detail (Wash & Fold, Hang-Dry, Delicates) |
| `service-area.html` | `/service-area` | ZIP checker + Leaflet map |
| `about.html` | `/about` | Brand story and values |
| `faq.html` | `/faq` | FAQ accordion + JSON-LD FAQPage |
| `estimate.html` | `/estimate` | Photo-based laundry estimator (3KD Vision Engine) |
| `schedule.html` | `/schedule` | 5-step booking wizard |
| `confirmation.html` | `/confirmation` | Post-booking confirmation |
| `status.html` | `/status` | Order tracking + order summary |
| `account.html` | `/account` | Member dashboard |
| `login.html` | `/login` | Sign-in entry point |
| `privacy.html` | `/privacy` | Privacy policy (pre-launch placeholder) |
| `terms.html` | `/terms` | Terms of service (pre-launch placeholder) |

---

## Folder structure

```
laundry-delivery/
├── index.html               Homepage (fully self-contained: inline CSS/JS, no CDN)
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
│   ├── images/              Client branding, logo and photography (see its README)
│   │   ├── logo/            Brand mark
│   │   ├── bags/            The three bag product shots
│   │   └── lifestyle/       Homepage photography
│   ├── icons/               Inline-able SVGs
│   └── fonts/               Self-hosted variable fonts (served by every page)
│       ├── cormorant-garamond/  Roman + Italic woff2
│       ├── inter/               InterVariable.woff2
│       └── oswald/              Oswald-Variable.woff2
├── css/                     Token-first system — used by every page EXCEPT index.html
│   ├── fonts.css            @font-face for the three self-hosted variable fonts
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

1. **`index.html`** — a single inline `<style>` block owning a minimal reset, the colour/type/radius tokens, the layout system and every component. No CSS framework and no CDN.
2. **Every other page** — token-first ITCSS cascade: `fonts.css` → `tokens.css` → `base.css` → `layout.css` → `components.css` → `utilities.css`.

`css/tokens.css` now carries the same Soapbox Caddie palette as the homepage. The
brand values are declared once under "Brand palette"; everything else in that file
is a **semantic alias** (`--ink`, `--border`, `--green-btn` and friends), which is
why the rebrand did not require touching a single component rule.

**Accessibility note:** the decorative aliases (`--gold`, `--green`, `--sky`, `--blush`)
map to camel, sage, sage-light and oatmeal. They are fills only — camel is 3.0:1 and
sage-dark 3.5:1 on white, so neither may be used for text. Body text uses `--ink`
(charcoal, 14.8:1); interactive fills use `--green-btn` (olive, 12.3:1 with warm-white).
Every translucent-white text colour on dark surfaces was replaced with
`--color-on-dark-muted`, because at 35–75% alpha they measured 2.9–4.2:1 on the new
olive surfaces.

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
- Check the console is clean. The homepage makes **zero external requests** - if you see one, something regressed.

---

## Pre-launch checklist

- [ ] Apply Phase 3 branding, photography and the final icon set
- [ ] Recalibrate the 3KD estimator for bag pricing (needs confirmed bag capacities)
- [ ] Consolidate the homepage tokens into `css/tokens.css` once branding is final
- [ ] Supply real footer contact details and social links
- [ ] Confirm bag capacity wording (currently `TODO` in each bag card)
- [ ] Build dedicated Protections and Waivers pages; repoint the reassurance band
- [ ] Build the Gift Laundry purchase flow and the Business & Contracting page
- [ ] Replace all four hard-coded ZIP sets with the TRA3 service-area API
- [ ] Integrate Acuity for booking
- [ ] Review and finalise `privacy.html` and `terms.html` with legal counsel
- [ ] Supply the official Soapbox Caddie logo asset (the header/footer mark is a type stand-in) &mdash; drop it in `assets/images/logo/`
- [ ] Supply bag product shots and lifestyle photography &mdash; see `assets/images/README.md` for the slot list, ratios and crop behaviour
- [ ] Add a favicon (none exists in the repo)
- [ ] Refresh `docs/project-overview.md` for the Soapbox Caddie build
- [ ] Run Lighthouse (target: 95+ Performance, 100 Accessibility / Best Practices / SEO) and an axe or WAVE audit

---

*Market: River Region. Backend: TRA3 (serverless, separate spec). Estimator: 3KD Vision Engine (separate spec). Homepage design: Soapbox Caddie approved mockup, Phase 1-B.*
