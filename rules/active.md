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
| R-003 | Every tracked file is public and served at the live domain: no secrets, keys, tokens, personal data, financial figures, or DNS/registrar/email detail, and no contact address beyond hello@wradlabs.com — except inside superseded `decisions.md` entries, which R-013 forbids rewriting. Operational specifics live only in untracked `OPERATIONS.local.md`. | D2 · D20 |
| R-004 | Never hardcode colors or fonts; use the design tokens at the top of `assets/css/style.css`. | D11 |
| ~~R-005~~ | *Retired 2026-07-24 (D11). The palette is locked again as of 2026-07-31, but by **R-026** from D26 — this ID is not reused.* | ~~D5~~ |
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
| R-016 | The docs-as-memory *method* is defined once, in the private `company` repo; reference it by name and keep only a short operational summary here — never restate or copy it. | D13 |
| R-017 | Session history in `status.md` is capped at 5 entries; adding one drops the oldest in the same edit. Evicted entries are deleted, not archived — git holds the history. | D14 |
| R-018 | Inquiries and their reply threads are deleted from the contact mailbox at 24 months, by manual annual sweep. The figure published in `privacy.html` and the sweep that enforces it must change together. **One mailbox receives everything** — `hello@` and `support@` are aliases into it — so the sweep covers the whole published surface. | D15 · D20 |
| R-019 | `hello@wradlabs.com` is published as plain readable text in both link text and `href`. No JS-dependent obfuscation — every `mailto:` is wrapped in `<!--email_off-->` to opt out of Cloudflare's edge rewrite. | D17 · D20 |
| R-020 | The brand mark's source of truth is `brand/` in the private `company` repo. Everything under `assets/images/` is a derived copy — never edit the artwork here. The mark is taller than it is wide: always size it by height. | D18 |
| R-021 | Sections are full-viewport pages via **`min-height`**, never `height` — a section must always be able to grow past the viewport when its content does not fit. Reserve the fixed nav with `--nav-h`. | D19 |
| R-026 | The palette is **Cool Stone and LOCKED** (D26) — neutrals are deliberately cool, accent is oxblood. Do not warm them back up, and do not reintroduce terracotta as `--accent`, without superseding D26. `--danger` must stay in a different **hue** family from `--accent`; luminance alone cannot separate them. Every new colour is measured against the ground it will sit on before it ships. | D26 |
| R-025 | All three pages carry an **identical** `<meta>` CSP, placed first in `<head>`. `script-src` uses a hash, never `'unsafe-inline'` — editing the inline script means recomputing it. Any origin added must be shown to be genuinely cross-origin first, and every change is verified in a real browser on the live domain, because the repo does not contain everything a visitor receives. | D25 |
| R-024 | The site runs **Cloudflare Web Analytics**, injected at the edge and present in no commit. `privacy.html` must disclose it, and any CSP must allow `static.cloudflareinsights.com`. Disabling it and updating the policy happen together — the disclosure and the setting move as one. | D24 |
| R-023 | Fonts are **self-hosted from this origin** — no third-party font service, stylesheet or `preconnect`. Files in `assets/fonts/` are derived copies under SIL OFL, with the licences carried beside them; never hand-edit the binaries. Any change to the font delivery path updates `privacy.html`'s processor list in the same commit. | D23 |
| R-022 | `robots.txt` in this repo is the **only** source of this site's crawler policy — no edge-managed or dashboard-injected alternative. AI crawlers are allowed here; do not publish `ai-train=no` without a new decision. Does **not** generalize to properties carrying user-contributed content. | D22 |

## Compile log

Regenerated **2026-07-31** from `decisions.md` at D1–D27.

- **D26 (new): closes D11.** Compiles **R-026** and finally locks the palette — D18 locked
  D11's mark half on 2026-07-30, this locks its colour half, and D11 is now fully closed.
  R-004 (never hardcode) is untouched and still traces to D11. **R-005's ID stays retired
  and is not reused**, even though the palette is locked again, because the thing being
  locked is a different palette for different reasons. The `--danger` clause is the part
  that will look arbitrary later: it is there because an oxblood accent and a red error
  state cannot be told apart by lightness, only by hue.
- **D27 (new):** compiles nothing. Presentation inside the token system, recorded for the
  presentation-attribute-vs-CSS trap that silently flattened the hero branch taper.

Previous regeneration, **2026-07-31** from `decisions.md` at D1–D25.

- **D24 (new):** compiles **R-024**. The rule exists because the *thing being ruled on is
  not in the repo* — an edge-injected beacon that `curl` cannot see. Without a written
  rule, the next agent reads a repo containing no analytics, believes the site has none,
  and either writes a CSP that kills it or a privacy claim that is false. Both had already
  happened by the time it was found. Its move-together clause mirrors R-018's: a published
  claim and the mechanism behind it change in one step or the claim rots.
- **D25 (new):** compiles **R-025**. The identical-across-pages clause is the same
  failure mode as the `?v=` cache-buster — a thing that must be updated in three files at
  once. The verify-in-a-real-browser clause is the third restatement of the D17 lesson,
  and it is in the rules this time rather than only in `SECURITY.md`, because it has now
  been re-learned once per quarter of this file's existence.

Previous regeneration, **2026-07-31** from `decisions.md` at D1–D23.

- **D23 (new):** compiles **R-023**. Two clauses do real work beyond "we self-host now."
  The **derived-copy** clause makes the fonts the same kind of thing as `assets/images/`
  (R-020, different upstream) — the repo holds copies, and the way to update one is to
  re-fetch, never to edit. The **same-commit** clause exists because the failure is
  delayed and silent: re-adding a Google Fonts link would restore a processor that
  `privacy.html` no longer discloses, breaching R-007 without any visible symptom. That is
  the same shape as OB-9, where the policy claimed to name every processor while omitting
  Cloudflare.

Previous regeneration, **2026-07-31** from `decisions.md` at D1–D22.

- **D22 (new):** compiles **R-022**. It is a rule rather than a status note because the
  thing it guards against leaves no trace in the repo: a dashboard toggle re-injected a
  crawler policy nobody here authored, and the committed file kept looking correct the
  whole time. R-022 is another instance of **D-009** — `robots.txt` had two sources of
  record, and the fix was choosing one, not syncing them. Its final clause is deliberate:
  the *reasoning* for allowing AI crawlers depends on this site having no
  user-contributed content, so the rule must not be cited at a property that does.

Previous regeneration, **2026-07-30** from `decisions.md` at D1–D21.

- **D20 (new): supersedes D12.** No new rule — it changes the *value* three existing
  rules carry. **R-003**'s contact-address clause retied D12 → D20 and now names
  `hello@wradlabs.com`; **R-019** names the same address; **R-018** stops saying
  "support mailbox" and gains D20 as a joint source. D20 left the mailbox's identity open
  and named the consequence of each branch; the owner confirmed **2026-07-31** that both
  addresses are aliases into one mailbox, so R-018 compiles to D20's *unchanged* branch —
  no widening of the sweep, no change to the published figure. The *constraints* are one
  published address, plain text, 24-month deletion. Only the address moved.
- **D21 (new):** compiles **nothing**. Presentation inside the existing token system;
  recorded because each of its three parts has a quiet failure mode, not because any of
  them constrains future work hard enough to be a rule.

Previous regeneration, **2026-07-30** from `decisions.md` at D1–D19.

- **D19 (new):** compiles **R-021**. It is a rule and not a style note because the
  failure is invisible until it bites someone else: `height: 100vh` looks identical to
  `min-height: 100vh` on the laptop it was written on, and silently clips the contact
  form on a shorter screen. D19 also adds a second upstream brand — Optants' own logo —
  under the same derived-copy principle R-020 already states.

Previous regeneration, **2026-07-30** from `decisions.md` at D1–D18.

- **D18 (new):** compiles **R-020**, and **partially closes D11** — the *mark* is signed
  off and locked; the *palette* stays a working draft, so R-004 is untouched and R-005
  stays retired. R-020 is a local instance of **D-009** (one source of record), the same
  principle already behind R-014 and R-016: the mark now exists in two repos, and the rule
  names which one is the source.

Previous regeneration, **2026-07-30** from `decisions.md` at D1–D17.

- **D17 (new):** compiles **R-019**. Cloudflare's edge obfuscation was rewriting every
  `mailto:` into a JS-only decoder, breaching R-008 and — on `privacy.html`, where all
  four addresses were affected — breaking the policy's own stated route for access and
  deletion requests. Also **closes AQ-4** as not-satisfiable: any obfuscation that hides
  the address from a scraper hides it from a no-JS reader, and R-008 is locked.

Previous regeneration, **2026-07-27** from `decisions.md` at D1–D15.

- **D15 (new):** compiles **R-018**, the published 24-month retention commitment and
  the manual sweep that has to back it.

- **D12 (new):** gives R-003's contact-address clause a source. That clause had been
  authored rather than compiled — D2 never mentioned contact addresses. R-003's text
  is unchanged; its **From** is now D2 · D12.
- **D13 (new):** compiles **R-016**, backing the `CLAUDE.md` §7 pointer to the
  canonical docs-as-memory definition, which had been asserted without a decision.
- **D14 (new):** compiles **R-017**, capping `status.md` session history.

Previous regeneration, **2026-07-24** at D1–D11:

- **D11 supersedes D5:** R-004 retied from D5 → D11 (token discipline kept); **R-005
  retired** (brand palette/semantic downgraded to a working draft, no longer a hard
  constraint). R-005's ID is not reused.

Decisions that produced no rule: **D3** (three-tier authority) — process, implemented
in `CLAUDE.md` §3. **D5** — superseded by D11. **D9** — the adoption itself; its
constraints compile as R-013/R-014. **D16** (owner model read before cold start) —
process, implemented in `CLAUDE.md` §"Owner Operating Model" and §7.

> Cross-project **owner-model** decisions use hyphenated IDs (`D-001`, `D-002`) and live
> in the private `owner-operating-model` repo. They are not compiled into this table —
> they govern collaboration, not site behavior — but they still bind. See D16.
>
> **Three rules above are local instances of centralized principles** (recorded 2026-07-30,
> after the same rules were found reinvented in each repo). The R-numbers stay — they
> compile from this repo's own locked decisions — but the general form and its rationale now
> live once, upstream:
>
> | Local | Upstream | The general principle |
> |---|---|---|
> | R-013 | **D-008** | Append-only records are corrected by a new dated entry, never by editing history. Scoped: reference and status docs are *meant* to be rewritten. |
> | R-014 | **D-009** | One source of record per fact; every other copy is a pointer or a derived view. If a fact is maintained in two places, that is the bug. |
> | R-016 | **D-009** | Same principle, applied to the docs-as-memory method itself. |
> | R-020 | **D-009** | Same principle, applied to the brand mark: `company/brand/` is the source, everything here is a copy. |
>
> Do not restate the upstream rationale here — cite the `D-nnn` (**D-002**).
