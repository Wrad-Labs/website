# Active rules — Wrad Labs website

> **This file is GENERATED, not authored.** Every line traces to a **locked**
> decision in [`../decisions.md`](../decisions.md). It is recompiled in the *same
> commit* that locks or supersedes any decision. Never add a rule from inference,
> from a `proposed` decision, or from a conversation — record the decision first,
> lock it, then recompile.
>
> **Behavioral and design constraints only.** Process rules — tiers, branch → PR →
> review, commit hygiene — live in [`../CLAUDE.md`](../CLAUDE.md) §3–§4 and are
> deliberately not duplicated here.

Current state only. No rationale, no history — follow the backlink for either.

| ID | Rule | From |
|---|---|---|
| R-001 | No build step, package manager, framework, or backend. What is committed is what ships. | D1 |
| R-002 | Site behavior is vanilla ES6 with zero runtime dependencies. | D1 |
| R-003 | Every tracked file is public and served at the live domain: no secrets, keys, tokens, personal data, financial figures, or DNS/registrar/email detail, and no contact address beyond support@wradlabs.com. Operational specifics live only in untracked `OPERATIONS.local.md`. | D2 |
| R-004 | Never hardcode colors or fonts; use the design tokens at the top of `assets/css/style.css`. | D11 |
| ~~R-005~~ | *Retired 2026-07-24 (D11): the blue→green roots→canopy palette semantic is now a working draft, not a locked constraint.* | ~~D5~~ |
| R-006 | The contact form posts to Formspree from the browser; no server-side handling and no credentials in the repo. | D4 |
| R-007 | `privacy.html` must accurately describe every field the form collects and every processor that receives it. | D4 |
| R-008 | The page must read and function with JavaScript disabled; JS only enhances. | D6 |
| R-009 | Motion honors `prefers-reduced-motion`. | D6 |
| R-010 | Markup stays semantic and accessible: one `<h1>`, logical heading order, labelled inputs, `aria` on controls, `aria-hidden` on decoration. | D6 |
| R-011 | No photographs of real people and no third-party brand logos without owned or licensed assets. | D7 |
| R-012 | No company, financial, or product-development content in this repo — it belongs to the private `company` repo and may be referred to here by name only. | D8 |
| R-013 | `decisions.md` is append-only; supersede with a new entry rather than editing a past one. | D9 |
| R-014 | Exactly one pending-work index exists: `status.md`. Never start a second backlog. | D9 |
| R-015 | The Owner Operating Model (`owner.md`) is canonical in the private `owner-operating-model` repo; reference it by URL in `CLAUDE.md`, never copy it here and never embed it as a submodule in this public repo. | D10 |

## Compile log

Regenerated **2026-07-24** from `decisions.md` at D1–D11.

- **D11 supersedes D5:** R-004 retied from D5 → D11 (token discipline kept); **R-005
  retired** (brand palette/semantic downgraded to a working draft, no longer a hard
  constraint). R-005's ID is not reused.

Decisions that produced no rule: **D3** (three-tier authority) — process, implemented
in `CLAUDE.md` §3. **D5** — superseded by D11.
