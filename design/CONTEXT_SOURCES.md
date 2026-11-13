# Soapbox Caddie — source register and decision status

**Reviewed 2026-11-13.** Separate verified current evidence from inaccessible client inputs and historically superseded information.

| Source | Access/status | What it establishes | Caution |
| --- | --- | --- | --- |
| [Current laundry-delivery repo](https://github.com/WGLewis0721/laundry-delivery/tree/main) | GitHub source inspected | 15 HTML pages, existing brand imagery, styles, font assets, booking/session JS, placeholder integrations | Code presence does not prove live functional fulfillment |
| [Current README](https://github.com/WGLewis0721/laundry-delivery/blob/main/README.md) | Read | Voice, marketed bag prices, type/color documentation, homepage architecture, known placeholders and technical limitations | README has some old redesign-status and token wording; reconcile rather than quote as approval |
| [Current tokens](https://github.com/WGLewis0721/laundry-delivery/blob/main/css/tokens.css), [fonts](https://github.com/WGLewis0721/laundry-delivery/blob/main/css/fonts.css), [homepage](https://github.com/WGLewis0721/laundry-delivery/blob/main/index.html) | Read | Implemented palette and self-hosted font fallbacks; homepage retains its own inline style system | Two sites of token definition; exact browser parity not independently tested here |
| [Copilot instructions](https://github.com/WGLewis0721/laundry-delivery/blob/main/.github/copilot-instructions.md) and [CLAUDE.md](https://github.com/WGLewis0721/laundry-delivery/blob/main/CLAUDE.md) | Read | Conflicting historical Copilot guidance versus latest Claude/Notion branch/PR rules | Copilot says Playfair and edit main; newer code uses Cormorant and current coordination requires PR |
| [Soapbox Notion coordination hub](https://app.notion.com/p/41706d5325758132a86ef29a440c8218) | Read 2026-11-13 | Website front door, Square intended source for prices/payment/customer, PR #16 merged, browser-only booking requests remain, open business decisions | Design audit can proceed; payment/scheduling integration remains blocked on separate discovery |
| [WD Auto Detailing reference](https://github.com/WGLewis0721/WD-AutoDetailing) | Inspected docs and code | Reusable token/component/icon discipline, wireframes and 3 approval gates | Never copy WD's colors, photography, logo, booking products or claims |
| [Gray Matter library](https://github.com/WGLewis0721/Graymattertechllc-/tree/main/app-design) | Read; [upgrade proposed in PR #38](https://github.com/WGLewis0721/Graymattertechllc-/pull/38) | Existing BRAND_BOARD, UI_KIT, design contract and corrective workflow; extra existing-site/brand-kit methods on draft branch | Draft PR is not merged and its additions are not yet authoritative main-branch content |
| [Client Google Doc](https://docs.google.com/document/d/1ttXj2oH7kXPNkn_YdAgH1bL1heEK0jFCYkRujSZLV4A/edit) | **ACCESS BLOCKED**: connected Google Docs returned 403 | Nothing verified from its contents | Do not claim it was synchronized |
| [Client Google Drive folder](https://drive.google.com/drive/folders/1JsCAx-9g1Y-YMg8BaBKxiui0fPZloBVY) | **ACCESS BLOCKED**: connected Google Drive returned 404; title searches did not locate this folder | Nothing verified from folder contents | Recheck with an authorized account/share before claiming latest client approval |

## Current confirmed repo-specific facts versus pending approval

- Implemented headline: **Choose peace, not laundry.** Implemented service: pickup, wash, dry, fold and return; website markets the River Region.
- Site-advertised bag pricing is Small $45 / Medium $60 / Large $80. Site-advertised weekly offer is $75 startup, $55/week for two bags, extra bags $25. **Reconcile with live Square/client source before release.**
- Implemented palette: Ivory `#F7F2F0`; Ink `#0E0E10`; Olive `#1E2509`; Taupe `#CFC5B8`, plus Whisper Sage `#D1E0D1` and Olive Sage `#A9BFA0` in source. These are implemented values; latest client signoff is **not** verifiable from the blocked Google files.
- Repo claims the external brand board calls for **OKANA and ENRIQ**, but the licensed files are not present. Production uses Cormorant Garamond, Inter and Oswald as self-hosted fonts. Do not purchase, bundle, rename or replace anything without confirming rights and approvals.
- The Notion hub documents owner-approved merge of PR #16, with real booking request delivery still absent. Privacy/terms/payment representations, contact email and status wording remain open issues outside this design-only PR.

## Decisions to resolve before approving new artwork or shipping UI changes

1. Grant this connected Google account access to both supplied client resources or provide authorized exports. Confirm which document revision is the latest approved brand/website source.
2. Confirm logo master and approved usage; whether the two font families named in the external board have commercial rights and whether fallback families remain the launch choice.
3. Confirm semantic brand palette and icon/illustration style with the owner and client; do not approve a new visual direction based on inference alone.
4. Confirm current approved service/price/legal/ZIP rules against Square/client system (separate product/technical track).
5. Keep Square integration decisions (pickup capacity, payment flow, backend and request delivery) on the separate Notion/Square track. The design system must show honest preview/pending states until integrations are real.

No changes to live service or integrations are authorized by this source register.
