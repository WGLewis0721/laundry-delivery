# Typography — installed reality and client request

| Role | Client board request in repo | Installed self-hosted face | CSS token | Use |
| --- | --- | --- | --- | --- |
| Display | **OKANA** | Cormorant Garamond Roman/Italic variable | `--font-brand-display` | headings, expressive prices |
| Accent | **ENRIQ** | Oswald variable | `--font-brand-accent` | uppercased micro-labels |
| Body/UI | No different requested typeface evidenced | Inter variable | `--font-body` | text, forms, nav, controls |

Original self-hosted fonts are in `assets/fonts/{cormorant-garamond,inter,oswald}/`; font declarations in `css/fonts.css`, duplicated in homepage `index.html`. Cormorant 300–700 incl italic; Inter 100–900; Oswald 200–700.

**Important:** OKANA and ENRIQ font licenses/files are not in repo. The new gallery intentionally uses existing fonts. Do not download third-party font files or claim they are approved. When licensed assets arrive, verify weights, italics, accents, legibility and web embedding; add `@font-face` in both font declaration locations, preserve fallback stack, compare desktop/mobile screenshots, and get signoff.

Body text 16px normal, minimum helper 12px when contrast adequate; hierarchy should use site token scales `--text-xs` through `--text-6xl` and actual contrast checks. [Visual specimen](../gallery/index.html#type).
