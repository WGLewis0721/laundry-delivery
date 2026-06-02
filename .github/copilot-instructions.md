# FOLD / 3KD — Copilot working agreement

## Git
- Work on branch `main`. Never commit, push, or create branches. The human reviews and commits.

## Match the existing inner-page system (use schedule.html as the template)
- Link these stylesheets in this order: css/tokens.css, css/base.css, css/layout.css,
  css/components.css, css/utilities.css.
- Fonts: Inter + Playfair Display (same as schedule.html).
- `<body data-page="…" class="no-js">` with the no-js removal script; the .site-nav / .wrap / .skip-link shell.
- JS is ES modules that `import` ./store.js and gate on document.body.dataset.page.
- Follow the `// TODO: TRA3` / `// TODO: 3KD` stub-comment style from booking.js.

## Do NOT
- Do NOT use Tailwind CDN on new pages. Do NOT modify index.html (it is a separate, divergent system).
- Do NOT put any API key, secret, or real external API call in client code. This phase is FRONT-END ONLY — stub everything.
- Do NOT add hardcoded hex outside css/tokens.css (extend tokens if needed).

## Quality bar (every task)
- Semantic HTML, labeled controls, visible :focus-visible, ≥44px targets, state never by color alone,
  respect prefers-reduced-motion. Mobile (360px) and desktop. Calm, premium, brand-voice copy.
- Self-verify: serve locally, open the page, check the console. Then print a post-task summary
  of every file created/changed, and STOP for review.
