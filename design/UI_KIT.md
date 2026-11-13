# Soapbox Caddie UI Kit

**Browse:** [Rendered component gallery](ui-kit/gallery.html) · [SVG proof sheet](evidence/ui-kit/component-sheet.svg) · [PNG preview](evidence/ui-kit/component-sheet.png)  
**Scope:** Reference documentation; no live components changed.

| Component | Live source | Key variants | Required states |
| --- | --- | --- | --- |
| Header / mobile navigation | `css/chrome.css`, `index.html` | Desktop nav, mobile drawer, ZIP CTA | Default, open, selected, focus, Escape-dismiss |
| Buttons / links | `css/components.css`, `css/chrome.css`, `index.html` | Sage filled, outline, text, ghost | Default, hover, focus, disabled, pending |
| ZIP lookup | `index.html`, `service-area.html`, `schedule.html` | Inline input + availability message | Empty, invalid ZIP, served, unserved |
| Bag / pricing cards | `index.html`, `plans.html` | Small, medium, large, subscription | Standard, highlighted, responsive |
| Booking wizard | `schedule.html`, `js/booking.js` | Five-step flow | Active, complete, invalid, confirmation |
| Forms and account | `login.html`, `account.html` | Text, email, select, error | Default, focus, invalid, success, demo |
| FAQ accordion | `faq.html` | Row, expanded answer | Closed, open, keyboard |
| Status/timeline | `status.html`, `confirmation.html` | Order timeline, summary | Pending and informational; backend not established |
| Site chrome / footer | `css/chrome.css` | Desktop/footer/mobile | Responsive, link focus |

**Visual system:** warm ivory background, ink text, Whispering Sage filled actions, Olive Sage footer, dark olive emphasis, quiet borders and restrained motion.

**Truthfulness:** This gallery demonstrates visual styling and local control states. It does not prove server connectivity, booking transmission, payment acceptance, or account authentication.

**Touch/keyboard:** Minimum 44×44px controls where feasible, visible keyboard focus, `aria-expanded` for disclosure controls, clear form labels/error text and reduced-motion support.

**Responsive:** Validate 375, 390, 430, 768, 1024, 1280, 1440 pixels against live pages before production changes.

**Approval:** Current implementation mapped; any change of token, component pattern or hierarchy needs an approved visual comparison.
