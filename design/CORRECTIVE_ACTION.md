# Controlled correction protocol

1. **Record the observation:** client quote, reference screenshot, route, viewport, precise element and current state. Do not generalize a local correction into a site-wide redesign.
2. **Compare with brand sources:** latest owner-approved board/logo/type rights, existing token values, UI kit and previous approved design proof.
3. **Propose a small diff:** screenshot/annotated wireframe showing changed/unchanged areas; identify tokens/components and risk.
4. **Get approval:** review aesthetic change before writing production HTML/CSS. Approval must identify exact proposed image/version.
5. **Implement in branch:** edit only affected components, preserve booking flow and user data, avoid price/legal changes unless explicitly approved.
6. **Test:** check expected state, desktop/mobile, keyboard/focus/reduced-motion, responsive overflow, icon paths, fonts and no broken links; capture real browser before/after.
7. **Review PR and rollback:** attach evidence, test commands, limitations, and a simple revert plan; merge only after owner review.

**Example:** Client: “The booking button is too quiet.” Compare current `--btn-fill` and sage header, show 2 variants, approve one, change only relevant CTA, test hover/contrast, then PR. No unrelated card/typography changes.
