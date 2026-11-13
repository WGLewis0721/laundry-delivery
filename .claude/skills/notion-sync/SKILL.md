---
name: notion-sync
description: Record verified Claude work on the Soapbox Caddie Notion coordination page. Use only when the user's message starts with the keyword "NOTION_SYNC" (case-insensitive). Do the requested task first, then append one dated entry with verified changes, commit/PR, tests, blockers and next steps.
---

# NOTION_SYNC: Claude changes → Notion

## When to run

Run only when the user's message **starts with** `NOTION_SYNC` (case-insensitive, leading spaces ignored).
Without the keyword, do not write to Notion for this work.

Example: `NOTION_SYNC Implement the Square Catalog mapping in a sandbox, run tests, and record the results.`

## Steps

1. **Do the task first.** Everything after the keyword is the request. Carry it out in the repo as usual.
2. **Verify before reporting.** Check the real repo state: `git status`, the commit SHA, the branch, and any PR URL. Record the test commands you ran and their actual output. Anything you did not verify goes under "unverified".
3. **Read the destination page** before writing: `https://app.notion.com/p/41706d5325758132a86ef29a440c8218` (Soapbox Caddie — Square Integration & Claude Coordination). Note its existing sections so nothing is removed.
4. **Append one entry** under **"Working notes and decision log"**, after the existing dated entries. Format:

   ```
   Claude — NOTION_SYNC | YYYY-MM-DD
   Request: <the request, as written>
   Status: completed | partial | blocked
   Verified changes: <what the repo actually shows>
   Files/pages touched: <paths>
   Commit / PR: <SHA and branch, PR URL if one exists>
   Tests: <command → result>
   Blockers: <or "none">
   Decisions needing approval: <or "none">
   Next action: <one line>
   Unverified: <anything claimed but not checked>
   ```

5. **Task status.** Change a task's status on the page only if the evidence supports it. A plan is never "completed".
6. **Confirm the write.** Re-read the page and check the entry is there. Reply with the page link and a short summary. If the write fails, or Notion is unavailable, say **"not synced"** and paste the exact entry so it can be added by hand.

## Rules

- Never store API keys, tokens, passwords, card data or customer personal data in Notion.
- Never replace or delete existing page content. Only append.
- If an entry for the same commit or task already exists, update that entry instead of adding a duplicate.
- No destructive edits, sharing-permission changes, or production Square charges as part of logging.
- Do not mark anything complete because a plan was written. Mark it complete only after the work and tests are verified.
- This skill is not passive monitoring. It runs only when the keyword is present.
