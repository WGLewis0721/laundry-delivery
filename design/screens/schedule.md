# Schedule Pickup — Screen Specification

**Source:** [schedule.html](../../schedule.html)  
**Desktop:** [Editable SVG](../wireframes/schedule-desktop.svg) · [PNG preview](../wireframes/exports/schedule-desktop.png)  
**Mobile:** [Editable SVG](../wireframes/schedule-mobile.svg) · [PNG preview](../wireframes/exports/schedule-mobile.png)  
**Status:** Existing-page structural reference, not a redesign approval.

## Visitor outcome
Review the five-step booking request path.

## Primary content
1. Step 1 ZIP
2. Step 2 bag
3. Step 3 details
4. Step 4 pickup window
5. Step 5 confirmation

## Headline
“Check your address”

## Component and interaction mapping
Schedule → Confirmation; request transmission not established.

## Responsive / accessibility contract
- One clear page heading; body text stays readable; primary CTA remains visible and meaningful on narrow screens.
- Keyboard focus and field labels remain intact. Any image use retains purposeful alternative text or is decorative.
- No horizontal overflow at 375px/390px. Support 768px transition, desktop 1280px/1440px.
- Reduced motion preference is respected; never hide essential content behind animation.

## QA / business restrictions
Current HTML is source authority. Preserve working controls and navigation. The wireframe is illustrative; client approval and actual running-site tests are required before a page change. Do not invent pricing, delivery guarantees, active authentication or completed payment.
