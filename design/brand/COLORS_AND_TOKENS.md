# Colors and Semantic Tokens

**Authority:** current `index.html` root values and `css/tokens.css`; inspect merged sage change history before modifying.

| Token | HEX | Current role |
| --- | --- | --- |
| `--brand-ivory` | `#F7F2F0` | Page canvas / warm white |
| `--brand-ink` | `#0E0E10` | Primary text / high contrast |
| `--brand-olive` | `#1E2509` | Headings, links and dark contrast accent |
| `--brand-taupe` | `#CFC5B8` | Decorative rules and soft borders |
| `--band-bg` / `--btn-fill` | `#D1E0D1` | Whispering Sage: section bands and primary fills |
| `--footer-bg` | `#A9BFA0` | Olive Sage footer |

**Use dark ink on sage-filled buttons and footer.** Whispering Sage is not a suitable substitute for dark olive text on ivory; the two colors serve different roles. Confirm any proposed text/surface pairing with a contrast calculation.

Additional tokens: `--text-muted`, `--border-strong`, surface aliases, spacing, radius, shadow and durations. Review `css/tokens.css` for active definitions.

## Drift inventory
Source-level comparison found these differences between homepage inline tokens and shared tokens:

| Variable | Home | Interior |
| --- | --- | --- |
| `--radius-sm` | `0.35rem` | `0.25rem` |
| `--radius-md` | `0.6rem` | `0.5rem` |
| `--radius-lg` | `0.9rem` | `0.75rem` |
| `--font-body` fallback | No explicit `BlinkMacSystemFont` | Includes `BlinkMacSystemFont` |

These are documented variances, **not automatic defects to fix blindly**. The current visual result is the design baseline. Source-level parity checking is provided by `scripts/check-design-parity.py` and should not apply production changes on its own.

State colors outside brand palette (e.g. validated errors/success) must meet contrast and accessibility requirements; avoid inline one-off colors when updating UI.
