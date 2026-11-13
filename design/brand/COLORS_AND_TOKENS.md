# Colors & design token usage

| Color | Value | Primary role |
|---|---|---|
| Ivory | `#F7F2F0` | page canvas |
| Ink | `#0E0E10` | readable text, deep foreground |
| Olive | `#1E2509` | headings, high-contrast accents on ivory |
| Taupe | `#CFC5B8` | decorative dividers; **not** body text |
| Whispering Sage | `#D1E0D1` | primary buttons, soft bands (dark text) |
| Olive Sage | `#A9BFA0` | footer (dark text) |

**Original sources:** `index.html` inline `:root` and `css/tokens.css`. Merged PR #14 moved button/band/footer surfaces to sage; #15 adjusted sage outline hover behavior. Never put ivory/white text over the light sage surfaces.

Semantic states in `css/tokens.css`: success `#3F6B3A`, error `#A3342C`, warning `#8A6212`; text-muted `#6B696A`, border-strong `#8B857D`. Avoid ad hoc errors; login currently contains hard-coded older red values to reconcile with care.

**Known source drift:** homepage vs inner token radii `--radius-sm 0.35rem/0.25rem`, `md 0.6/0.5rem`, `lg 0.9/0.75rem`; font body fallback lists differ slightly. Do not normalize live site without screenshot + approval.
