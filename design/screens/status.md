# Order Status — Screen Specification

**Source:** [status.html](../../status.html)  
**Desktop:** [Editable SVG](../wireframes/status-desktop.svg) · [PNG preview](../wireframes/exports/status-desktop.png)  
**Mobile:** [Editable SVG](../wireframes/status-mobile.svg) · [PNG preview](../wireframes/exports/status-mobile.png)  
**Status:** Existing-page structural reference, not a redesign approval.

## Visitor outcome
Make status readable and distinguish demo state from real tracking.

## Primary content
1. Header + ID
2. Progress timeline
3. Order summary
4. SMS updates

## Headline
“Order status”

## Component and interaction mapping
Order status is illustrative unless connected to live backend.

## Responsive / accessibility contract
- One clear page heading; body text stays readable; primary CTA remains visible and meaningful on narrow screens.
- Keyboard focus and field labels remain intact. Any image use retains purposeful alternative text or is decorative.
- No horizontal overflow at 375px/390px. Support 768px transition, desktop 1280px/1440px.
- Reduced motion preference is respected; never hide essential content behind animation.

## QA / business restrictions
Current HTML is source authority. Preserve working controls and navigation. The wireframe is illustrative; client approval and actual running-site tests are required before a page change. Do not invent pricing, delivery guarantees, active authentication or completed payment.
