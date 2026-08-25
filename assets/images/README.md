# Client images

Everything the site needs from the client goes here. Drop files in and the
matching slot is a one-line swap — every container below already reserves its
final dimensions, so adding a real image will not shift the layout.

```
assets/images/
├── logo/        brand mark (SVG preferred)
├── bags/        the three bag product shots
└── lifestyle/   photography for the homepage sections
```

Formats: **SVG** for the logo, **WebP or AVIF** for photography (keep a JPEG
fallback if you have one). Please supply photography at roughly **2× the
displayed size** so it stays sharp on high-density screens.

---

## 1. Logo — blocking

| | |
|---|---|
| Path | `assets/images/logo/soapbox-caddie-logo.svg` |
| Displayed | 3.1rem tall in the header, 2.7rem in the footer |
| Fit | `contain` |

Until this lands, the header and footer show a neutral **type stand-in** — it is
deliberately not an attempt to reproduce the logo. Two places reference it:

- `index.html` — replace the `.brand__mark` span with the `<img class="brand__logo">` already written in the comment beside it
- `css/layout.css` — same swap for the 14 inner pages, using `.logo-img`

A horizontal lockup works best in the header. If the mark and wordmark are
separate files, send both.

## 2. Bag product shots

Three shots, **shot identically** — same angle, same distance, same lighting,
same background — so the pricing row reads as one product family.

| Slot | Class | Subject |
|---|---|---|
| Small | `.bag-image-small` | Small bag, cream |
| Medium | `.bag-image-medium` | Medium bag, tan |
| Large | `.bag-image-large` | Large bag, sage |

Fit is **`contain`**, not `cover` — the whole bag stays visible and is never
cropped. Shoot on a plain light background, or supply them with transparency.
The fill line should be visible if possible; it is the core of the pricing story.

## 3. Lifestyle photography

| Slot | Class | Ratio | Fit | Subject direction |
|---|---|---|---|---|
| Hero | `.hero-media` | tall on desktop, 4:3 on mobile | `cover` | The emotional payoff — a calm home, folded linens, a basket. This is the largest image on the site. |
| Subscription | `.subscription-media` | 16:9 | `cover` | Folded linens, basket, soft natural textile detail |
| Gift Laundry | `.gift-media` | 16:9 | `cover` | Gift card, folded linen, envelope, subtle botanical |
| About | `.about-media` | 3:2 | `cover` | Local, human, the people behind the service |
| Business | `.business-media` | 3:2 | `cover` | Folded towels and clean linens in a hospitality setting — **not** industrial machines |

The hero is the page's primary above-the-fold visual, so it should **not** be
lazy-loaded. Everything below the fold should be.

---

## When adding an image

1. Drop the file in the right subdirectory.
2. Replace the placeholder `<p class="media-slot__label">…</p>` with:
   ```html
   <img class="media-slot__img" src="assets/images/lifestyle/hero.webp"
        alt="" width="1600" height="1200" loading="lazy" decoding="async">
   ```
   Omit `loading="lazy"` on the hero. Set `width`/`height` to the file's real
   pixel dimensions.
3. Write a real `alt` for anything that carries meaning; use `alt=""` for purely
   decorative photography.

The `object-fit` behaviour (`cover` for lifestyle, `contain` for bags) is already
set in CSS — you do not need to add it per image.
