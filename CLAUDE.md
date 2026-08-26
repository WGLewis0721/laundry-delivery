# Soapbox Caddie — Claude Code Project Rules

## Web Development Skill Requirement

**Before starting any web development task** — editing HTML, CSS, or JavaScript files, building UI components, reviewing layouts, or making design decisions — you MUST invoke the `frontend-design` skill first.

This applies to:
- Any edits to `*.html`, `css/*.css`, or `js/*.js` files
- UI layout, component, or styling work
- Design reviews or visual feedback requests
- Adding or modifying page sections, navigation, or responsive behavior

**How to invoke it:**

```
/frontend-design
```

or via the Skill tool:

```
Skill({ skill: "frontend-design" })
```

Do not begin implementing changes until the skill has been invoked and its guidance is active for the session.

### Other skills relevant to this project

A broader web dev/design/hosting toolkit is installed globally (see `~/.claude/CLAUDE.md`). For Soapbox Caddie specifically:

- **`wireframe`** — use before building a new page or major section (e.g. a redesigned booking flow) to explore layout options before writing HTML
- **`ui-ux-pro-max`** / **`theme-factory`** — use when picking or adjusting the color palette/typography in `tokens.css`
- **`webapp-testing`** — use to click through the live booking/estimate flow in a real browser and check console logs after JS changes
- **`web-quality-skills`** — use before pushing to `main` (which auto-deploys to GitHub Pages) to check Lighthouse/Core Web Vitals/accessibility/SEO on the static build

Note: `netlify-skills`, `vercel`, and `publishing-astro-websites` are also installed globally but don't apply here — this project is plain static HTML/CSS/JS on GitHub Pages with no build step and no Astro/Vercel/Netlify involved.

---

## Project Context

- **Project:** Soapbox Caddie — Laundry Pickup & Delivery (River Region: Montgomery, AL and surrounding areas)
- **Stack:** Static HTML/CSS/JS, hosted on GitHub Pages (no build step)
- **CSS architecture:** Token-first cascade — `tokens.css` → `base.css` → `layout.css` → `components.css` → `utilities.css`
- **JS:** ES modules for `store.js`, `booking.js`, `estimate.js`; IIFEs for `reveal.js`, `map.js`
- **Backend stubs:** TRA3 integration points marked `// TODO: TRA3`; 3KD Vision Engine stubs marked `// TODO: 3KD`
- **Live site:** https://wglewis0721.github.io/laundry-delivery/index.html
