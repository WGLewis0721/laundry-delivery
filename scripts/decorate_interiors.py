from pathlib import Path
import hashlib
import re

PAGES = [
    "about.html", "account.html", "confirmation.html", "estimate.html",
    "faq.html", "how-it-works.html", "login.html", "plans.html",
    "privacy.html", "schedule.html", "service-area.html", "services.html",
    "status.html", "terms.html"
]

ASSET_FOR = {
    "about.html": ("decor-towels-pitcher.webp", "Folded cream and gray towels beside a white pitcher filled with olive branches."),
    "account.html": ("decor-towels-pitcher.webp", "Freshly folded cream and gray towels beside a white pitcher with olive branches."),
    "confirmation.html": ("decor-teddy-basket.webp", "Teddy bear resting on fresh cream linens in a light wicker laundry basket."),
    "estimate.html": ("decor-towels-basket.webp", "Folded cream and beige towels arranged neatly in a light wicker basket."),
    "faq.html": ("decor-gift-cards-eucalyptus.webp", "Soapbox Caddie gift cards with the official client branding arranged beside fresh eucalyptus leaves."),
    "how-it-works.html": ("decor-wide-basket-vase.webp", "Wicker laundry basket filled with cream towels beside folded linens and a ceramic vase."),
    "login.html": ("decor-towels-pitcher.webp", "Freshly folded cream and gray towels beside a white pitcher with olive branches."),
    "plans.html": ("decor-towels-basket.webp", "Premium cream and beige towels arranged neatly in a light wicker basket."),
    "privacy.html": ("decor-olive-branches.webp", "Fresh olive branches arranged against a soft cream background."),
    "schedule.html": ("decor-teddy-basket.webp", "Light wicker laundry basket filled with cream linens with a teddy bear resting on top."),
    "service-area.html": ("decor-wide-basket-vase.webp", "Wicker laundry basket filled with cream towels beside a ceramic vase and folded linens."),
    "services.html": ("decor-towels-pitcher.webp", "Premium folded cream and gray towels beside a white pitcher with olive branches."),
    "status.html": ("decor-towels-pitcher.webp", "Freshly folded premium towels beside a white pitcher with olive branches."),
    "terms.html": ("decor-olive-branches.webp", "Fresh olive branches arranged against a soft cream background."),
}

INDEX = Path("index.html")
INDEX_HASH = hashlib.sha256(INDEX.read_bytes()).hexdigest()

for page in PAGES:
    if not Path(page).exists():
        raise SystemExit(f"Missing page: {page}")
for asset, _ in ASSET_FOR.values():
    if not Path("assets/img", asset).exists():
        raise SystemExit(f"Missing generated asset: assets/img/{asset}")

CSS = '''/* Soapbox Caddie interior-page decoration. index.html is intentionally not targeted. */
.interior-page-banner {
  width: min(1180px, calc(100% - 2 * var(--space-6)));
  margin: var(--space-8) auto var(--space-10);
  overflow: hidden;
  border: 1px solid var(--border);
  border-radius: var(--radius-2xl);
  background: var(--off-white);
  aspect-ratio: 16 / 5;
}
.interior-page-banner img { width: 100%; height: 100%; display: block; object-fit: cover; }
.interior-page-banner--confirmation img,
.interior-page-banner--schedule img,
.interior-page-banner--service-area img,
.interior-page-banner--how-it-works img { object-position: center right; }
.plan-card--text-only { padding-top: var(--space-8); }
.plan-card--text-only::before {
  content: ""; display: block; width: 2.5rem; height: 2px;
  margin-bottom: var(--space-5); background: var(--brand-olive); border-radius: var(--radius-full);
}
.plan-card--text-only .plan-name { margin-top: 0; }
.interior-photo {
  overflow: hidden; border: 1px solid var(--border); border-radius: var(--radius-xl); background: var(--off-white);
}
.interior-photo img { width: 100%; height: 100%; display: block; object-fit: cover; }
.brand-media.interior-photo { margin-bottom: var(--space-5); }
body[data-page="faq"] main,
body[data-page="service-area"] main,
body[data-page="legal"] main,
body[data-page="login"] main,
body[data-page="account"] main,
body[data-page="status"] main { position: relative; isolation: isolate; }
body[data-page="faq"] main::after,
body[data-page="service-area"] main::after,
body[data-page="legal"] main::after,
body[data-page="login"] main::after,
body[data-page="account"] main::after,
body[data-page="status"] main::after {
  content: ""; position: absolute; z-index: -1; pointer-events: none;
  width: min(30rem, 34vw); height: min(34rem, 44vw); right: -10rem; top: 5rem;
  background: linear-gradient(to left, rgba(247,242,240,.12), rgba(247,242,240,.97)), url("../assets/img/decor-olive-branches.webp");
  background-size: cover; background-position: center; opacity: .12;
}
@media (max-width: 800px) {
  .interior-page-banner { width: min(100% - 2 * var(--space-4), 760px); aspect-ratio: 4 / 3; margin-block: var(--space-5) var(--space-8); }
  body[data-page] main::after { display: none; }
}
@media (max-width: 540px) {
  .interior-page-banner { aspect-ratio: 1 / 1; border-radius: var(--radius-xl); }
}
'''
Path("css/interior-decor.css").write_text(CSS, encoding="utf-8")

UTILITIES = '<link rel="stylesheet" href="css/utilities.css">'
DECOR_LINK = '<link rel="stylesheet" href="css/interior-decor.css">'

def banner(page):
    asset, alt = ASSET_FOR[page]
    key = page[:-5]
    return f'''  <figure class="interior-page-banner interior-page-banner--{key}">\n    <img src="assets/img/{asset}" alt="{alt}" loading="lazy" decoding="async">\n  </figure>\n'''

def add_banner(text, page):
    if "interior-page-banner" in text:
        return text
    marketing = {"about.html", "faq.html", "how-it-works.html", "plans.html", "service-area.html", "services.html"}
    if page in marketing:
        match = re.search(r'<main\\b[^>]*>.*?</section>', text, re.S)
        if not match:
            raise SystemExit(f"Could not place banner in {page}")
        return text[:match.end()] + "\n\n" + banner(page) + text[match.end():]
    match = re.search(r'<main\\b[^>]*>', text)
    if not match:
        raise SystemExit(f"Could not find main in {page}")
    return text[:match.end()] + "\n" + banner(page) + text[match.end():]

def replace_picture(text, needle, asset, alt):
    pattern = re.compile(r'<picture\\b[^>]*>(?:(?!</picture>).)*?' + re.escape(needle) + r'(?:(?!</picture>).)*?</picture>', re.S)
    replacement = f'''<picture class="brand-media brand-media--wide interior-photo">\n          <img src="assets/img/{asset}" alt="{alt}" loading="lazy" decoding="async">\n        </picture>'''
    return pattern.sub(replacement, text)

for page in PAGES:
    path = Path(page)
    text = path.read_text(encoding="utf-8")
    if DECOR_LINK not in text:
        if UTILITIES not in text:
            raise SystemExit(f"Missing utilities stylesheet in {page}")
        text = text.replace(UTILITIES, UTILITIES + "\n  " + DECOR_LINK, 1)
    text = add_banner(text, page)

    mapping = {
        "hero-soapbox-caddie": ("decor-teddy-basket.webp", "Teddy bear resting on fresh cream linens in a light wicker laundry basket."),
        "about-soapbox-caddie": ("decor-wide-basket-vase.webp", "Wicker laundry basket with cream towels beside folded linens and a ceramic vase."),
        "subscription-folded-laundry": ("decor-towels-pitcher.webp", "Premium folded cream and gray towels beside a white pitcher with olive branches."),
        "gift-laundry-pile": (("decor-gift-cards-eucalyptus.webp", "Soapbox Caddie gift cards with official branding beside eucalyptus leaves.") if page == "faq.html" else ("decor-wide-basket-vase.webp", "Wicker laundry basket filled with soft cream towels beside folded linens and greenery.")),
        "business-commercial-linens": ("decor-towels-basket.webp", "Neatly folded premium cream and beige towels arranged in a light wicker basket."),
    }
    for needle, (asset, alt) in mapping.items():
        if needle in text:
            text = replace_picture(text, needle, asset, alt)

    text = re.sub(
        r'<img class="step2-accent"[^>]*subscription-folded-laundry\\.webp[^>]*>',
        '<img class="step2-accent" src="assets/img/decor-towels-basket.webp" alt="Folded cream and beige towels arranged neatly in a light wicker basket." loading="lazy" decoding="async">',
        text,
        count=1,
    )

    if page in ("plans.html", "schedule.html"):
        bag_pattern = re.compile(r'\\s*<picture class="brand-media brand-media--product">(?:(?!</picture>).)*?assets/img/bag-(?:small|medium|large)(?:(?!</picture>).)*?</picture>\\s*', re.S)
        text, count = bag_pattern.subn("\n", text)
        if count != 3:
            raise SystemExit(f"Expected 3 bag images in {page}, removed {count}")
        if page == "plans.html":
            text = text.replace('<article class="plan-card" id="small"', '<article class="plan-card plan-card--text-only" id="small"', 1)
            text = text.replace('<article class="plan-card plan-card--featured" id="medium"', '<article class="plan-card plan-card--featured plan-card--text-only" id="medium"', 1)
            text = text.replace('<article class="plan-card" id="large"', '<article class="plan-card plan-card--text-only" id="large"', 1)
        else:
            text = text.replace('<article class="plan-card" aria-label="Small Bag">', '<article class="plan-card plan-card--text-only" aria-label="Small Bag">', 1)
            text = text.replace('<article class="plan-card plan-card--featured" aria-label="Medium Bag">', '<article class="plan-card plan-card--featured plan-card--text-only" aria-label="Medium Bag">', 1)
            text = text.replace('<article class="plan-card" aria-label="Large Bag">', '<article class="plan-card plan-card--text-only" aria-label="Large Bag">', 1)

    path.write_text(text, encoding="utf-8")

# Services: deliberately use three distinct generated scenes.
text = Path("services.html").read_text(encoding="utf-8")
service_pictures = list(re.finditer(r'<picture class="brand-media brand-media--wide interior-photo">.*?</picture>', text, re.S))
service_assets = [
    ("decor-towels-basket.webp", "Folded cream and beige towels arranged neatly in a light wicker basket."),
    ("decor-wide-basket-vase.webp", "Fresh cream towels in a wicker basket beside folded linens and a ceramic vase."),
    ("decor-towels-pitcher.webp", "Premium folded cream and gray towels beside a white pitcher with olive branches."),
]
if len(service_pictures) >= 3:
    chunks, pos = [], 0
    for match, (asset, alt) in zip(service_pictures[:3], service_assets):
        chunks.append(text[pos:match.start()])
        chunks.append(f'''<picture class="brand-media brand-media--wide interior-photo">\n          <img src="assets/img/{asset}" alt="{alt}" loading="lazy" decoding="async">\n        </picture>''')
        pos = match.end()
    chunks.append(text[pos:])
    Path("services.html").write_text("".join(chunks), encoding="utf-8")

BANNED = [
    "assets/img/bag-small", "assets/img/bag-medium", "assets/img/bag-large",
    "assets/img/about-soapbox-caddie", "assets/img/subscription-folded-laundry",
    "assets/img/gift-laundry-pile", "assets/img/business-commercial-linens",
    "assets/img/hero-soapbox-caddie",
]
for page in PAGES:
    text = Path(page).read_text(encoding="utf-8")
    leftovers = [item for item in BANNED if item in text]
    if leftovers:
        raise SystemExit(f"Banned image references remain in {page}: {leftovers}")
    if DECOR_LINK not in text or "interior-page-banner" not in text:
        raise SystemExit(f"Decoration missing from {page}")

if hashlib.sha256(INDEX.read_bytes()).hexdigest() != INDEX_HASH:
    raise SystemExit("index.html changed")

print("OK: all interior pages decorated; index.html unchanged")
