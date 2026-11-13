# Soapbox Caddie — design system workspace

**Status: audit and implementation PLAN only (not yet a completed brand-board/UI-kit package).**  
**Audit date:** 2026-11-13. **Working branch:** `chatgpt/soapbox-brand-ui-kit-audit-plan-20261113`.  
**Source:** existing `main` site and [Gray Matter design library](https://github.com/WGLewis0721/Graymattertechllc-/tree/main/app-design). WD Auto Detailing is an **engineering/design-method reference only**, not Soapbox branding.

## Read in this order

1. [AUDIT.md](AUDIT.md) — what exists, what is partially documented, what is absent, exact source evidence and conflicts.
2. [DEEP_BRAND_AUDIT.md](DEEP_BRAND_AUDIT.md) — second-pass verification of the actual client-requested OKANA/ENRIQ fonts, sage-brand decisions, token mismatches, logo/icons, absent favicon and stale docs.
3. [CONTEXT_SOURCES.md](CONTEXT_SOURCES.md) — design reference provenance, blocked client Google sources, open approval questions.
4. [IMPLEMENTATION_PLAN.md](IMPLEMENTATION_PLAN.md) — phased plan, proposed file layout, review gates, no-code-change boundaries and acceptance.

The plan intentionally does **not** claim brand board renderings, UI kit galleries, icons, editable wireframes or QA screenshots have been produced. Those require execution and approval.

## Authority order

Client-approved artwork, copy, type licensing, service/price rules and current signed decisions > currently shipped site and tests > repo README > legacy/archived drafts > generalized design-library guidance. When authorities conflict, record it; do not guess.

## Project guardrails

- Preserve static HTML/CSS/JS and GitHub Pages; no Astro/React/Tailwind migration is implied.
- Keep the current homepage and booking interactions untouched during the documentation stage.
- Do not represent browser-only booking confirmation as an actual business-received request or pretend Square payments are wired.
- A separate design PR must not merge to `main` without owner review. Any future integration work follows its own decisions and tests.
