from pathlib import Path
import hashlib
import re

ROOT = Path('.')
INDEX = ROOT / 'index.html'
INDEX_HASH = hashlib.sha256(INDEX.read_bytes()).hexdigest()

KEY_PAGES = [
    'schedule.html', 'plans.html', 'about.html', 'how-it-works.html',
    'faq.html', 'services.html', 'service-area.html'
]

for page in KEY_PAGES:
    if not Path(page).exists():
        raise SystemExit(f'Missing required page: {page}')


def read(page):
    return Path(page).read_text(encoding='utf-8')


def write(page, text):
    Path(page).write_text(text, encoding='utf-8')


def remove_generic_banner(text):
    return re.sub(
        r'\n\s*<figure class="interior-page-banner[^\"]*">.*?</figure>\s*\n',
        '\n', text, flags=re.S
    )


def remove_picture_with(text, needle, count=1):
    pattern = re.compile(
        r'\s*<picture\b[^>]*>(?:(?!</picture>).)*?' + re.escape(needle) +
        r'(?:(?!</picture>).)*?</picture>\s*', re.S
    )
    return pattern.sub('\n', text, count=count)


def bag_figure(asset, alt):
    return f'''          <figure class="bag-product-visual" aria-hidden="true">
            <img src="assets/img/{asset}" alt="{alt}" loading="lazy" decoding="async">
          </figure>\n'''

# ---------------------------------------------------------------------
# CSS: source of truth for the mockup-inspired interior decoration system
# ---------------------------------------------------------------------
css = r'''/* ============================================================
   SOAPBOX CADDIE — MOCKUP-MATCHED INTERIOR DECORATION
   index.html intentionally does NOT load this file.
   ============================================================ */

:root {
  --decor-cream: #F7F2F0;
  --decor-olive: #1E2509;
  --decor-taupe: #CFC5B8;
  --decor-shadow: 0 14px 34px rgba(14, 14, 16, .07);
  --decor-shadow-soft: 0 8px 24px rgba(14, 14, 16, .055);
}

/* Existing utility-page banners stay restrained instead of becoming giant posters. */
.interior-page-banner {
  width: min(720px, calc(100% - 2 * var(--space-6)));
  margin: var(--space-7) auto var(--space-10);
  overflow: hidden;
  border: 1px solid color-mix(in srgb, var(--decor-taupe) 62%, transparent);
  border-radius: var(--radius-2xl);
  background: var(--decor-cream);
  aspect-ratio: 16 / 5;
  box-shadow: var(--decor-shadow-soft);
}
.interior-page-banner img {
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
  image-rendering: auto;
}

.mockup-photo,
.interior-photo {
  position: relative;
  overflow: hidden;
  border-radius: var(--radius-2xl);
  border: 1px solid color-mix(in srgb, var(--decor-taupe) 58%, transparent);
  background: var(--decor-cream);
  box-shadow: var(--decor-shadow);
}
.mockup-photo img,
.interior-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  image-rendering: auto;
}
.mockup-fade-left::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, var(--decor-cream) 0%, rgba(247,242,240,.82) 8%, rgba(247,242,240,.18) 30%, transparent 54%);
}

/* Photo olive sprigs: intentionally soft and edge-faded so they feel printed into the layout. */
.decor-olive-photo {
  position: absolute;
  pointer-events: none;
  z-index: 0;
  background: url("../assets/img/decor-olive-branches.webp") center / cover no-repeat;
  opacity: .22;
  filter: saturate(.82) contrast(.92);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 48%, transparent 78%);
  mask-image: radial-gradient(ellipse at center, #000 48%, transparent 78%);
}

/* ------------------------------------------------------------------
   BOOKING / SCHEDULE — decorative edges, product-first cards, clear UI
   ------------------------------------------------------------------ */
body[data-page="schedule"] #booking-main {
  position: relative;
  isolation: isolate;
  overflow: hidden;
}
body[data-page="schedule"] #booking-main::before {
  content: "";
  position: absolute;
  top: 1.2rem;
  right: -5.5rem;
  width: 25rem;
  height: 18rem;
  pointer-events: none;
  z-index: -1;
  background: url("../assets/img/decor-olive-branches.webp") center / cover no-repeat;
  opacity: .18;
  transform: rotate(-9deg);
  -webkit-mask-image: radial-gradient(ellipse at center, #000 42%, transparent 76%);
  mask-image: radial-gradient(ellipse at center, #000 42%, transparent 76%);
}
body[data-page="schedule"] .booking-wrap {
  position: relative;
  background: color-mix(in srgb, var(--white) 94%, var(--decor-cream));
  box-shadow: 0 18px 48px rgba(14,14,16,.055);
}
body[data-page="schedule"] .step2-header .step2-accent { display: none; }
body[data-page="schedule"] #step-2 { position: relative; }
body[data-page="schedule"] #step-2 .plans-grid {
  position: relative;
  z-index: 2;
  align-items: stretch;
}
.bag-product-visual {
  display: grid;
  place-items: center;
  height: clamp(8.5rem, 13vw, 11.5rem);
  margin: -0.25rem auto var(--space-3);
  padding: var(--space-2);
  border-radius: var(--radius-xl);
  background: linear-gradient(180deg, rgba(247,242,240,.55), rgba(247,242,240,.12));
}
.bag-product-visual img {
  width: 100%;
  height: 100%;
  object-fit: contain;
  filter: drop-shadow(0 9px 13px rgba(14,14,16,.08));
}
body[data-page="schedule"] .plan-card {
  overflow: visible;
}
.schedule-side-basket {
  width: min(31rem, 58%);
  aspect-ratio: 16 / 10;
  margin: -1rem 0 var(--space-4) auto;
}
.schedule-side-basket img { object-position: center right; }
.schedule-side-basket::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, var(--white) 0%, rgba(255,255,255,.9) 8%, rgba(255,255,255,.12) 34%, transparent 58%);
}

/* ------------------------------------------------------------------
   PRICING — bag cards supported by one strong basket scene
   ------------------------------------------------------------------ */
.pricing-bags-section {
  position: relative;
  overflow: hidden;
}
.pricing-bags-section::before,
.pricing-bags-section::after {
  content: "";
  position: absolute;
  width: 17rem;
  height: 20rem;
  pointer-events: none;
  background: url("../assets/img/decor-olive-branches.webp") center / cover no-repeat;
  opacity: .15;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 38%, transparent 76%);
  mask-image: radial-gradient(ellipse at center, #000 38%, transparent 76%);
}
.pricing-bags-section::before { left: -7rem; top: 1rem; transform: rotate(14deg); }
.pricing-bags-section::after { right: -7rem; bottom: 0; transform: rotate(-12deg) scaleX(-1); }
.pricing-bag-wrap {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, 1fr) minmax(250px, 330px);
  gap: clamp(var(--space-6), 4vw, var(--space-10));
  align-items: center;
}
.pricing-bag-wrap > #bags-heading { grid-column: 1 / -1; }
.pricing-bag-wrap .plans-grid { min-width: 0; }
.pricing-side-basket {
  width: 100%;
  aspect-ratio: 4 / 5;
  align-self: stretch;
  min-height: 30rem;
}
.pricing-side-basket img { object-position: 58% center; }
body[data-page="plans"] .bag-product-visual {
  height: clamp(7.25rem, 10vw, 9.5rem);
}
body[data-page="plans"] #subscription .brand-media { display: none; }

/* ------------------------------------------------------------------
   ABOUT — editorial two-column hero + lower-left lifestyle scene
   ------------------------------------------------------------------ */
.about-hero-section {
  position: relative;
  overflow: hidden;
}
.about-hero-section::after {
  content: "";
  position: absolute;
  top: -3rem;
  right: -8rem;
  width: 24rem;
  height: 28rem;
  background: url("../assets/img/decor-olive-branches.webp") center / cover no-repeat;
  opacity: .12;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 40%, transparent 76%);
  mask-image: radial-gradient(ellipse at center, #000 40%, transparent 76%);
}
.about-hero-grid {
  position: relative;
  z-index: 1;
  display: grid;
  grid-template-columns: minmax(0, .9fr) minmax(340px, 1.1fr);
  gap: clamp(var(--space-8), 6vw, var(--space-16));
  align-items: center;
}
.about-hero-copy { max-width: 37rem; }
.about-hero-photo {
  min-height: clamp(31rem, 48vw, 43rem);
  border-radius: 0 0 var(--radius-2xl) var(--radius-2xl);
}
.about-hero-photo img {
  object-position: 68% center;
  transform: scale(1.015);
}
.about-hero-photo::after {
  content: "";
  position: absolute;
  inset: 0;
  pointer-events: none;
  background: linear-gradient(90deg, var(--decor-cream) 0%, rgba(247,242,240,.7) 10%, transparent 37%);
}
.about-lower-scene {
  width: min(640px, 62%);
  margin-right: auto;
  box-shadow: var(--decor-shadow-soft);
}
.about-lower-scene .brand-media { margin: 0; border: 0; box-shadow: none; }
.about-lower-scene img { aspect-ratio: 16 / 9; object-fit: cover; object-position: center right; }

/* ------------------------------------------------------------------
   HOW IT WORKS — one hero-support image + one small trust accent
   ------------------------------------------------------------------ */
body[data-page="how-it-works"] .hiw-feature-photo {
  min-height: 22rem;
  max-height: 31rem;
}
body[data-page="how-it-works"] .hiw-feature-photo img { object-position: 64% center; }
body[data-page="how-it-works"] .hiw-single {
  grid-template-columns: minmax(0, 760px);
  justify-content: center;
}
.hiw-trust-accent {
  width: min(300px, 42%);
  aspect-ratio: 4 / 3;
  margin: 0 0 var(--space-6) auto;
}

/* ------------------------------------------------------------------
   FAQ / SERVICES / SERVICE AREA — restrained supporting imagery only
   ------------------------------------------------------------------ */
body[data-page="faq"] main,
body[data-page="services"] main,
body[data-page="service-area"] main {
  position: relative;
  overflow: hidden;
}
body[data-page="faq"] main::before,
body[data-page="services"] main::before,
body[data-page="service-area"] main::before {
  content: "";
  position: absolute;
  top: 3.5rem;
  right: -6rem;
  width: 19rem;
  height: 20rem;
  background: url("../assets/img/decor-olive-branches.webp") center / cover no-repeat;
  opacity: .13;
  pointer-events: none;
  -webkit-mask-image: radial-gradient(ellipse at center, #000 38%, transparent 74%);
  mask-image: radial-gradient(ellipse at center, #000 38%, transparent 74%);
}
.faq-support-photo,
.services-support-photo,
.service-area-support-photo {
  width: min(330px, 44%);
  aspect-ratio: 4 / 3;
  margin: var(--space-8) 0 var(--space-4) auto;
}
.services-support-photo { margin-top: var(--space-8); }
.service-area-support-photo { width: min(360px, 100%); margin: var(--space-5) 0 var(--space-5); }

/* Utility pages that still use the earlier generic banner should remain calm. */
body[data-page="legal"] .interior-page-banner,
body[data-page="login"] .interior-page-banner,
body[data-page="account"] .interior-page-banner,
body[data-page="status"] .interior-page-banner,
body[data-page="estimate"] .interior-page-banner,
body[data-page="confirmation"] .interior-page-banner {
  opacity: .96;
  box-shadow: var(--decor-shadow-soft);
}

@media (max-width: 1050px) {
  .pricing-bag-wrap { grid-template-columns: 1fr; }
  .pricing-side-basket {
    width: min(560px, 100%);
    min-height: 0;
    aspect-ratio: 16 / 9;
    justify-self: end;
  }
  .about-hero-grid { grid-template-columns: 1fr 1fr; gap: var(--space-8); }
}

@media (max-width: 800px) {
  .interior-page-banner {
    width: min(100% - 2 * var(--space-4), 680px);
    aspect-ratio: 16 / 7;
    margin-block: var(--space-5) var(--space-8);
  }
  body[data-page="schedule"] #booking-main::before,
  .pricing-bags-section::before,
  .pricing-bags-section::after,
  .about-hero-section::after,
  body[data-page="faq"] main::before,
  body[data-page="services"] main::before,
  body[data-page="service-area"] main::before { opacity: .08; }

  .about-hero-grid { grid-template-columns: 1fr; }
  .about-hero-photo {
    min-height: 24rem;
    width: 100%;
    aspect-ratio: 4 / 3;
  }
  .about-lower-scene { width: 100%; }
  .schedule-side-basket { width: min(520px, 100%); margin-top: var(--space-4); }
  .faq-support-photo,
  .services-support-photo { width: min(420px, 100%); }
}

@media (max-width: 540px) {
  .mockup-photo,
  .interior-photo,
  .interior-page-banner { border-radius: var(--radius-xl); }
  .interior-page-banner { aspect-ratio: 3 / 2; }
  .bag-product-visual { height: 8.5rem; }
  .pricing-side-basket { aspect-ratio: 4 / 3; }
  .about-hero-photo { min-height: 21rem; }
  .hiw-trust-accent { width: 100%; }
}
'''
Path('css/interior-decor.css').write_text(css, encoding='utf-8')

# ------------------------- schedule.html ----------------------------
t = remove_generic_banner(read('schedule.html'))
t = t.replace('<section class="booking-step" id="step-2"', '<section class="booking-step schedule-step2-decor" id="step-2"', 1)
t = re.sub(r'\s*<img class="step2-accent"[^>]*>\s*', '\n', t, count=1, flags=re.S)

schedule_cards = [
    ('<article class="plan-card plan-card--text-only" aria-label="Small Bag">\n<p class="plan-name">',
     '<article class="plan-card" aria-label="Small Bag">\n' + bag_figure('bag-small.png', 'Soapbox Caddie small cream laundry bag.') + '<p class="plan-name">'),
    ('<article class="plan-card plan-card--featured plan-card--text-only" aria-label="Medium Bag">',
     '<article class="plan-card plan-card--featured" aria-label="Medium Bag">'),
    ('<span class="plan-badge">Most popular</span>\n<p class="plan-name">Medium Bag</p>',
     '<span class="plan-badge">Most popular</span>\n' + bag_figure('bag-medium.png', 'Soapbox Caddie medium tan laundry bag.') + '<p class="plan-name">Medium Bag</p>'),
    ('<article class="plan-card plan-card--text-only" aria-label="Large Bag">\n<p class="plan-name">',
     '<article class="plan-card" aria-label="Large Bag">\n' + bag_figure('bag-large.png', 'Soapbox Caddie large sage laundry bag.') + '<p class="plan-name">'),
]
for old, new in schedule_cards:
    if old not in t:
        raise SystemExit(f'schedule marker missing: {old[:70]}')
    t = t.replace(old, new, 1)

marker = '        </div>\n\n        <div class="plan-card" aria-label="Subscription"'
side = '''        </div>\n\n        <figure class="schedule-side-basket mockup-photo" aria-label="Fresh folded laundry in a wicker basket">\n          <img src="assets/img/decor-wide-basket-vase.webp" alt="Wicker laundry basket filled with cream towels beside folded linens and a ceramic vase." loading="lazy" decoding="async">\n        </figure>\n\n        <div class="plan-card" aria-label="Subscription"'''
if marker not in t:
    raise SystemExit('schedule basket insertion marker missing')
t = t.replace(marker, side, 1)
write('schedule.html', t)

# --------------------------- plans.html ------------------------------
t = remove_generic_banner(read('plans.html'))
t = t.replace('<section class="section" aria-labelledby="bags-heading">', '<section class="section pricing-bags-section" aria-labelledby="bags-heading">', 1)
sec = '<section class="section pricing-bags-section" aria-labelledby="bags-heading">\n    <div class="wrap">'
if sec not in t:
    raise SystemExit('plans pricing wrap marker missing')
t = t.replace(sec, '<section class="section pricing-bags-section" aria-labelledby="bags-heading">\n    <div class="wrap pricing-bag-wrap">', 1)

plans_cards = [
    ('<article class="plan-card plan-card--text-only" id="small" aria-label="Small bag">\n<p class="plan-name">',
     '<article class="plan-card" id="small" aria-label="Small bag">\n' + bag_figure('bag-small.png', 'Soapbox Caddie small cream laundry bag.') + '<p class="plan-name">'),
    ('<article class="plan-card plan-card--featured plan-card--text-only" id="medium" aria-label="Medium bag, most popular">\n<p class="plan-name">',
     '<article class="plan-card plan-card--featured" id="medium" aria-label="Medium bag, most popular">\n' + bag_figure('bag-medium.png', 'Soapbox Caddie medium tan laundry bag.') + '<p class="plan-name">'),
    ('<article class="plan-card plan-card--text-only" id="large" aria-label="Large bag">\n<p class="plan-name">',
     '<article class="plan-card" id="large" aria-label="Large bag">\n' + bag_figure('bag-large.png', 'Soapbox Caddie large sage laundry bag.') + '<p class="plan-name">'),
]
for old, new in plans_cards:
    if old not in t:
        raise SystemExit(f'plans card marker missing: {old[:70]}')
    t = t.replace(old, new, 1)

marker = '      </div>\n    </div>\n  </section>\n\n  <!-- Subscription -->'
side = '''      </div>\n\n      <figure class="pricing-side-basket mockup-photo mockup-fade-left">\n        <img src="assets/img/decor-towels-basket.webp" alt="Neat stack of folded cream and beige towels resting in a light wicker basket." loading="lazy" decoding="async">\n      </figure>\n    </div>\n  </section>\n\n  <!-- Subscription -->'''
if marker not in t:
    raise SystemExit('plans basket insertion marker missing')
t = t.replace(marker, side, 1)
# Keep subscription section visually clean: remove the oversized supporting photo.
t = remove_picture_with(t, 'assets/img/decor-towels-pitcher.webp', count=1)
write('plans.html', t)

# --------------------------- about.html ------------------------------
t = remove_generic_banner(read('about.html'))
t = t.replace('<section class="section deco-context" style="background: var(--off-white);">', '<section class="section deco-context about-hero-section" style="background: var(--off-white);">', 1)
start = '<div class="wrap" style="max-width: 720px; margin-inline: auto;">'
if start not in t:
    raise SystemExit('about hero wrap marker missing')
t = t.replace(start, '<div class="wrap about-hero-grid">\n      <div class="about-hero-copy">', 1)
# The first hero wrap contains no nested divs, so this closes copy + grid safely.
hero_close = '      </p>\n    </div>\n  </section>'
hero_new = '''      </p>\n      </div>\n      <figure class="about-hero-photo mockup-photo">\n        <img src="assets/img/decor-towels-pitcher.webp" alt="Tall stack of folded cream and gray towels on marble beside a white pitcher with olive branches." loading="eager" fetchpriority="high" decoding="async">\n      </figure>\n    </div>\n  </section>'''
if hero_close not in t:
    raise SystemExit('about hero closing marker missing')
t = t.replace(hero_close, hero_new, 1)
t = t.replace('<div class="photo-frame">', '<div class="photo-frame about-lower-scene">', 1)
write('about.html', t)

# ---------------------- how-it-works.html ----------------------------
t = remove_generic_banner(read('how-it-works.html'))
# Step 1: one deliberately prominent upper-right image.
pattern = re.compile(r'<picture class="brand-media brand-media--wide interior-photo">\s*<img src="assets/img/decor-teddy-basket\.webp".*?</picture>', re.S)
replacement = '''<picture class="brand-media brand-media--wide interior-photo hiw-feature-photo">\n          <img src="assets/img/decor-towels-pitcher.webp" alt="Folded premium cream and gray towels beside a white pitcher with olive branches." loading="lazy" decoding="async">\n        </picture>'''
t, n = pattern.subn(replacement, t, count=1)
if n != 1:
    raise SystemExit('how-it-works step 1 image not found')
# Steps 2 and 3 become text-first so the page does not feel like a gallery.
t = t.replace('<!-- Step 2 -->\n      <div class="grid-2"', '<!-- Step 2 -->\n      <div class="grid-2 hiw-single"', 1)
t = remove_picture_with(t, 'assets/img/decor-wide-basket-vase.webp', count=1)
t = t.replace('<!-- Step 3 -->\n      <div class="grid-2"', '<!-- Step 3 -->\n      <div class="grid-2 hiw-single"', 1)
t = remove_picture_with(t, 'assets/img/decor-towels-pitcher.webp', count=1)
trust_marker = '      <div class="bento">'
trust_art = '''      <figure class="hiw-trust-accent mockup-photo">\n        <img src="assets/img/decor-towels-basket.webp" alt="Folded cream and beige towels arranged neatly in a wicker basket." loading="lazy" decoding="async">\n      </figure>\n      <div class="bento">'''
if trust_marker not in t:
    raise SystemExit('how-it-works trust marker missing')
t = t.replace(trust_marker, trust_art, 1)
write('how-it-works.html', t)

# ----------------------------- faq.html ------------------------------
t = remove_generic_banner(read('faq.html'))
t = remove_picture_with(t, 'assets/img/decor-gift-cards-eucalyptus.webp', count=1)
faq_marker = '      <p class="text-center mt-10"'
faq_art = '''      <figure class="faq-support-photo mockup-photo">\n        <img src="assets/img/decor-towels-basket.webp" alt="Folded cream and beige towels arranged in a light wicker basket." loading="lazy" decoding="async">\n      </figure>\n\n      <p class="text-center mt-10"'''
if faq_marker not in t:
    raise SystemExit('faq support marker missing')
t = t.replace(faq_marker, faq_art, 1)
write('faq.html', t)

# --------------------------- services.html ---------------------------
t = remove_generic_banner(read('services.html'))
# Remove the three card photos; icons and copy stay primary.
service_picture = re.compile(r'\s*<picture class="brand-media brand-media--wide interior-photo">.*?</picture>\s*', re.S)
t, n = service_picture.subn('\n', t, count=3)
if n != 3:
    raise SystemExit(f'expected 3 service card photos, removed {n}')
services_marker = '      </div>\n\n      <div class="booking-notice"'
services_art = '''      </div>\n\n      <figure class="services-support-photo mockup-photo">\n        <img src="assets/img/decor-towels-pitcher.webp" alt="Premium cream and gray towels stacked beside a white pitcher with olive branches." loading="lazy" decoding="async">\n      </figure>\n\n      <div class="booking-notice"'''
if services_marker not in t:
    raise SystemExit('services support marker missing')
t = t.replace(services_marker, services_art, 1)
write('services.html', t)

# ------------------------ service-area.html --------------------------
t = remove_generic_banner(read('service-area.html'))
pattern = re.compile(r'<picture class="brand-media brand-media--wide interior-photo">.*?decor-wide-basket-vase\.webp.*?</picture>', re.S)
replacement = '''<figure class="service-area-support-photo mockup-photo">\n              <img src="assets/img/decor-wide-basket-vase.webp" alt="Wicker laundry basket with cream towels beside folded linens and a ceramic vase." loading="lazy" decoding="async">\n            </figure>'''
t, n = pattern.subn(replacement, t, count=1)
if n != 1:
    raise SystemExit('service-area supporting image marker missing')
write('service-area.html', t)

# --------------------------- validation ------------------------------
for page in KEY_PAGES:
    text = read(page)
    if 'css/interior-decor.css' not in text:
        raise SystemExit(f'{page} lost interior-decor.css link')
    if 'interior-page-banner--' in text:
        raise SystemExit(f'{page} still has an oversized generic banner')

required = {
    'schedule.html': ['bag-small.png', 'bag-medium.png', 'bag-large.png', 'schedule-side-basket'],
    'plans.html': ['bag-small.png', 'bag-medium.png', 'bag-large.png', 'pricing-side-basket'],
    'about.html': ['about-hero-photo', 'about-lower-scene'],
    'how-it-works.html': ['hiw-feature-photo', 'hiw-trust-accent'],
    'faq.html': ['faq-support-photo'],
    'services.html': ['services-support-photo'],
    'service-area.html': ['service-area-support-photo'],
}
for page, needles in required.items():
    text = read(page)
    for needle in needles:
        if needle not in text:
            raise SystemExit(f'{needle} missing from {page}')

if hashlib.sha256(INDEX.read_bytes()).hexdigest() != INDEX_HASH:
    raise SystemExit('index.html changed — aborting')

print('OK: mockup-matched interior decoration applied; index.html unchanged')
