---
name: chatgpt-notion-log
description: Log a change that ChatGPT made to the Soapbox Caddie Notion coordination page. Use only when the user's message starts with the keyword "CHATGPT:" (case-insensitive). Appends a dated entry to the page's Working notes and decision log.
---

# ChatGPT change log → Notion

## When to run

Run only when the user's message **starts with** `CHATGPT:` (case-insensitive, leading spaces ignored).
Anything after the keyword is the change to log. If the message does not start with the keyword, do not use this skill.

Example: `CHATGPT: Changed the Square task status to Blocked and added the webhook question.`

## Steps

1. **Read the entry.** Take the text after `CHATGPT:` and trim it. If it is empty, ask the user for the change in one line and stop.
2. **Refuse secrets.** If the text contains an access token, API key, password, card number or customer personal data, do not log it. Tell the user to remove it and resend. Never write secrets to Notion.
3. **Build the entry** in this format:
   `- YYYY-MM-DD · ChatGPT · <change text>`
   Use today's date. Keep the text as the user wrote it, with no added claims.
4. **Find the target.** Target page: `https://app.notion.com/p/41706d5325758132a86ef29a440c8218`
   (Soapbox Caddie — Square Integration & Claude Coordination). Fetch it with `notion-fetch` first, so the append goes under the right heading.
5. **Append** the entry under the heading **"Working notes and decision log"**, directly after the existing dated entries. Do not edit or delete any other content on the page.
6. **Confirm.** Reply with the entry as written and the page link. If the Notion write fails, say so plainly and do not claim it saved.

## Rules

- Write only when the keyword is present. Never log Claude's own changes with this skill.
- Log what ChatGPT reportedly did. This skill cannot detect edits on its own.
- One entry per message. Do not batch several messages into one write.
- Do not use Notion Memory or the About page for these entries.
