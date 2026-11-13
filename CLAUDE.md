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

## Notion coordination hub

Project status, decisions and handoffs live on the Soapbox Caddie Notion page:
https://app.notion.com/p/41706d5325758132a86ef29a440c8218

Before starting any task:
1. Read the page's "Operating rules (read first)" section, the task tracker and the "Decisions needed" list.
2. If the task depends on an open decision or a Blocked task, stop and add a one-line note under "Decisions needed". Do not proceed.
3. If the page says to plan before changing code, do the plan first.

When finishing a task:
- Append one entry under "Working notes and decision log" in the format given on the page. Never overwrite existing content.
- Mark a task complete only when there is evidence. A plan is never "completed."
- Work on the designated branch and open a draft PR. Never push to `main`.
- If Notion is unavailable, say "not synced" and print the entry.

Never put secrets, tokens, card data or customer personal data in Notion, commits or replies.
The `NOTION_SYNC` keyword is optional. These rules apply to every task.
