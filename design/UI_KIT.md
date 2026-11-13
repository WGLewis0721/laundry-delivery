# Soapbox Caddie — visual UI kit

**Actual previews:** [Interactive HTML component gallery](gallery/index.html) · [SVG component board](evidence/ui-kit/component-gallery.svg).

The HTML gallery uses current live CSS font files and displays the actual shipped PNG logos, while styles in the gallery are isolated from the deployed website. It demonstrates **visual states only**; it intentionally does not submit forms, create bookings or initiate payments.

| Component | Existing source | States and validation |
|---|---|---|
| Site header/nav/footer | `css/chrome.css` and `index.html` | desktop/mobile nav, logo, menu keyboard/focus |
| Primary, outline, dark action | `css/components.css`; homepage inline | normal/hover/focus/disabled, contrast on ivory/sages |
| ZIP input / validation | `index.html`, `service-area.html`, booking JS | valid/invalid/unserved, status text, keyboard |
| Bag / subscription cards | `index.html`, `plans.html` | default, CTA, price verification, narrow width |
| Five-step wizard / summary | `schedule.html`, `js/booking.js` | progress, required fields, back/continue, mobile summary |
| Confirmation/status | `confirmation.html`, `status.html` | browser-local preview vs actually delivered/paid must stay distinct |
| Disclosure/FAQ | `faq.html` | closed/open, focus, ARIA state |
| Login and account | `login.html`, `account.html` | required/invalid, demo signed-in/empty |
| Feedback/alerts | current tokens and page rules | success/error/warning; semantic role + AA contrast |

## Rules for future changes
1. Produce annotated prebuild and before/after visual comparison before editing production components.
2. Use semantic palette/type tokens, not new one-off colors; preserve current valid URL flows and booking preview disclaimer.
3. Visual approval and runtime QA are separate gates. No UI gallery screenshot proves a working Square integration.
4. Review [all 15 page wireframes](SCREEN_MAP.md) and [corrections protocol](CORRECTIVE_ACTION.md).
