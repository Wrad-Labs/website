# Status — Wrad Labs website

**Memory kind: status — overwrite constantly.** Where things stand *right now*.
No rules (see [`rules/active.md`](rules/active.md)), no rationale (see
[`decisions.md`](decisions.md)). If a line here is out of date, it is a bug.

**The Backlog below is the single pending-work index in this repo (R-014).** It is
an *index*: one line per item, tier tag, and a pointer to detail that lives
elsewhere — never a second copy of the detail.

Last updated: **2026-07-27**

---

## Now

**Live.** www.wradlabs.com — static single page on GitHub Pages, deployed from
`main`, custom domain via `CNAME`. Edge path is **Cloudflare in front of Fastly**
(GitHub's CDN), `max-age=600`. **HTTPS enforced and HSTS live** since 2026-07-29:
`max-age=15552000` (6 months) on apex and `www`, no `includeSubDomains`, no preload.

- **Page:** `#home` (hero + decorative arch SVG) → `#ventures` (2 cards, the first
  naming **Optants**) → `#contact`. Plus `privacy.html`, `404.html`, `robots.txt`,
  `sitemap.xml`.
- **Contact form:** live, posting to Formspree (`mvzjloro` → support@wradlabs.com)
  with honeypot and a native-POST fallback. Formspree activation **confirmed by the
  owner 2026-07-27** — submissions are being delivered.
- **Ventures section** is a placeholder — "Coming soon" / "Future Ventures". The
  product it will eventually describe is tracked in the private company repo.
- **Brand / look-and-feel is a working DRAFT (D11), not locked.** The site now runs
  a warm off-white palette with a terracotta accent and a Source Serif 4 / Inter
  pairing, replacing the dark navy + blue→green scheme (2026-07-29). This is still a
  draft, not a locked identity. **The brand mark is an explicit placeholder** — a new
  logo is in progress; it lives in one `<symbol>` per page so swapping it is a
  one-block edit. The token *system* (declare once, never hardcode — R-004) stays;
  the specific *values* do not.
- **Third-party surface:** Google Fonts, Formspree, GitHub Pages, Google Workspace
  (email, off-repo).

**In flight.** Redesign on branch `feat/light-brand-redesign` — full visual rebuild
to match an owner-supplied mockup. **Tier 2: needs approval before merge**, and is
additionally blocked on the real Optants URL (the "View product" link is a `#`
placeholder).

**Not here.** Accounting, company funding, corporate filings, and product
development live in the private `company` repo (D8/R-012).

---

## Backlog

### Owner-blocked — needs a decision or action only the owner can take

| # | Item | Tier |
|---|---|---|
| OB-1 | **`privacy.html` processor disclosure — drafted 2026-07-27, awaiting publish.** Names Formspree, Google Workspace, GitHub Pages/Fastly, and Google Fonts; states 24-month retention (D15/R-018) and Formspree's 30-day expiry; confirms no cookies/analytics. Both open questions are now closed — the retention figure is decided, and Formspree is on the free plan (30-day submission history, per their documented limits). Remaining: publishing legal text is Tier 3, so this needs owner sign-off to merge. Until then R-007 is unmet on the live site. | 🔴 3 |
| OB-2 | **Legal review of `privacy.html` wording.** The draft is plain-English and deliberately claims no specific regulatory framework (no GDPR/CCPA rights language) — confirm that matches the company's actual obligations. Date now reads "July 27, 2026" to match the rewrite. | 🔴 3 |
| OB-5 | **Confirm tracked-file exposure is acceptable.** `CLAUDE.md`, `README.md`, and now `decisions.md` / `status.md` all return 200 at the live domain. Full suppression needs a Jekyll build, which D1 rules out — but AQ-10 can stop them being *indexed*, which shrinks this to "accept that they are reachable." Carried from WORKPLAN P0. | 🔴 3 |
| OB-6 | **Content: replace aspirational copy with proof** as products, team, or case studies exist. Carried from WORKPLAN P4. | 🟡 2 |
| OB-7 | **Decide whether to add privacy-respecting analytics** (e.g. Plausible). Requires a privacy-policy disclosure. Carried from WORKPLAN P4. | 🟡 2 |
| OB-8 | **Annual inquiry sweep — delete support-mailbox mail older than 24 months (R-018).** First mandatory deletion due **2028-07** (form live since 2026-07-04); run it annually from 2027-07 so nothing ages past the published figure. Mailbox-side action only — no agent can do this. If the sweep lapses, `privacy.html` must change, not the practice. | 🔴 3 |
| OB-9 | **`privacy.html` does not disclose Cloudflare — live R-007 breach.** Cloudflare fronts the site and terminates TLS, so it sees every visitor's IP, but the policy published 2026-07-29 names only Formspree, Google Workspace, GitHub Pages/Fastly, and Google Fonts. The reference docs are corrected (this file + `SECURITY.md`; `ARCHITECTURE.md` pending in PR #4) — **what remains is the policy text itself, which is Tier 3 to publish.** Add Cloudflare to the services register too. | 🔴 3 |

### Agent queue — ready to pick up

| # | Item | Tier |
|---|---|---|
| AQ-1 | Remove the dead placeholder guard in `assets/js/script.js` that checks `form.action` for `'YOUR_FORM_ID'` — unreachable since D4. Separate PR. | 🟢 1 |
| AQ-2 | Add `<meta name="referrer" content="strict-origin-when-cross-origin">`. Carried from WORKPLAN P2. | 🟢 1 |
| AQ-3 | Add a `<meta http-equiv="Content-Security-Policy">` scoped to Google Fonts + Formspree. Can break rendering — test both breakpoints. Carried from WORKPLAN P2. | 🟡 2 |
| AQ-4 | Obfuscate or protect the two `mailto:support@wradlabs.com` links in `index.html` (contact section, footer — the nav has none) to cut harvesting. Carried from WORKPLAN P2. | 🟢 1 |
| AQ-5 | Add a "skip to content" link. Carried from WORKPLAN P3. | 🟢 1 |
| AQ-7 | Reduce layout shift — preload the hero/tree image. Carried from WORKPLAN P3. | 🟢 1 |
| AQ-8 | Generate a proper `favicon.ico` + sized PNG icon set instead of reusing `logo.png`. Carried from WORKPLAN P1. | 🟢 1 |
| AQ-9 | Self-host the fonts to drop the Google Fonts request (privacy + performance). Interacts with OB-1 and AQ-3. Carried from WORKPLAN P3. | 🟡 2 |
| AQ-10 | Add `Disallow: /*.md$` to `robots.txt` so the tracked docs stop being *indexed*. They stay reachable — no build step, so D1 is untouched — but this is the only mitigation available for OB-5 and it costs nothing. | 🟢 1 |
| AQ-11 | Add `privacy.html` to `sitemap.xml`. It carries a canonical URL and `index, follow` but is absent from the single-URL sitemap. | 🟢 1 |
| AQ-12 | **Document the SEO/metadata surface in `docs/ARCHITECTURE.md`** — the JSON-LD `Organization` schema, Twitter/OG meta, and `apple-touch-icon` are 11 lines of `index.html` that no reference doc describes. Surfaced when the R-017 cap evicted the only session entry that recorded them. | 🟢 1 |

Tier key: 🟢 1 autonomous · 🟡 2 propose first · 🔴 3 human-only — see
[`CLAUDE.md`](CLAUDE.md) §3.

---

## Session history

Dated one-liners, newest first. **Capped at 5 (R-017)** — adding one drops the
oldest in the same edit. This is an orientation trail for a cold session, not a
record: `git log` is the record, and evicted entries are deleted, not archived.

- **2026-07-30** — Centralized three more rules found in the `company` repo, and compiled
  them here: **OOM D-007** (never invent a fact) is now Golden rule 6, citing this repo's own
  Cloudflare miss as the worked example; **D-008** and **D-009** are recorded in
  `rules/active.md` as the upstream general forms of **R-013**, **R-014** and **R-016**. The
  R-numbers stay — they compile from D9/D13 — but the rationale now lives once, upstream.
  D-009 is the notable one: *one source of record per fact* turns out to be the principle
  that D-002, D-003, R-014, R-016, C8 and every de-duplication this week are instances of.
  Also completed `company` adoption ([company#1](https://github.com/Wrad-Labs/company/pull/1)),
  where the submodule had the same stale-`index.lock` failure as Optants — two of three repos.
- **2026-07-30** — Compiled two newly-centralized owner-model rules into §4: **OOM D-005**
  (every change lands through the gate, whoever authored it) and **OOM D-006** (never merge
  on red or pending checks — here, with no CI, that means stating what was verified by hand).
  Both were surfaced by running the adoption prompt against Optants, where they had been
  locked into that repo's manual alone; they are cited here, never restated (D-002). Also
  completed the cross-project adoption work: Optants' submodule pointer was frozen from
  2026-07-16 behind a stale `index.lock` (fixed, [optants#85](https://github.com/Wrad-Labs/optants/pull/85)),
  its duplicate `D-001` reduced to a pointer and an unindexed live runbook found by a D-003
  orphan audit ([optants#87](https://github.com/Wrad-Labs/optants/pull/87)). Owner-model
  repo now carries D-001–D-006, a README index, and `adoption.md` tracking cross-project
  actions X-1–X-5.
- **2026-07-29** — Wired the Owner Operating Model into this repo's loop, after a session
  ran a redesign and three merged PRs without ever reading it. The root cause was local:
  `docs/INDEX.md` said read three files "and stop," and no loop step triggered the model.
  Added **D16** — owner model is step 0, upstream of the cold start; §7 step 4 expanded to
  the three-part *Next steps* readout (immediate follow-through · backlog split · one
  recommendation) that previously existed only in Optants's manual — and compiled
  owner-model **D-001** (owner actions as step-by-step playbooks) into `CLAUDE.md`. Opened
  [owner-operating-model PR #1](https://github.com/Wrad-Labs/owner-operating-model/pull/1)
  proposing a canonical `decisions.md` (D-001 relocated out of Optants, plus **D-002** for
  centralization monitoring), filled-in `owner.md` placeholders, and a per-project adoption
  prompt. Chasing one owner handoff also corrected **OB-3** (Enforce HTTPS already on; HSTS
  belongs at Cloudflare) and opened **OB-9** — Cloudflare fronts the site and is an
  undisclosed processor, a live R-007 breach. The owner then enabled HSTS at
  Cloudflare the same day; verified on apex and `www` (`max-age=15552000`, no
  `includeSubDomains`, no preload), so **OB-3 is closed and retired**. Corrected the
  edge path from "behind Fastly" to "Cloudflare in front of Fastly" here and in
  `SECURITY.md`; OB-9 now covers only the policy text, which is Tier 3 to publish.
- **2026-07-29** — Rebuilt the visual design against an owner-supplied mockup: warm
  off-white surfaces, terracotta accent, Source Serif 4 + Inter, hairline section
  rules, white cards, static hero arch replacing the particle canvas (JS blocks 4→3).
  Tokens renamed to semantic names; all ink/accent pairs measured and passing WCAG AA,
  which **closes AQ-6** (its `--medium-gray` no longer exists). Fixed a pre-existing
  **R-008 breach** found while verifying — `.reveal { opacity: 0 }` applied with no JS,
  so a JS-disabled visitor got a blank page; reveal is now default-visible behind an
  `html.js` gate. Named **Optants** on the first card per owner decision, without a
  product link — no destination exists yet. Brand mark left as a placeholder pending
  the new logo. Palette stays a D11 draft — nothing locked.
- **2026-07-27** — Owner confirmed the Formspree activation email was clicked, so
  **OB-4 is closed and retired** (its ID is not reused). Rewrote `privacy.html` to
  disclose every processor (Formspree, Google Workspace, GitHub Pages/Fastly, Google
  Fonts), state a 24-month retention period, and record that the site sets no cookies
  and runs no analytics — verified at 375px and 1280px with no console errors.
  **Not yet published:** publishing legal text is Tier 3, so OB-1/OB-2 stay open
  until the owner signs off on the retention figure and the wording. This edit also
  triggered the first **R-017 eviction** (the 2026-07-04 WORKPLAN closeout), which
  exposed that the SEO/metadata surface it described lives in no reference doc →
  **AQ-12**. Recorded the cap's compression effect as **P-1**, the first earned
  entry in `patterns.md`. Confirmed Formspree is on the free plan (30-day submission
  history) and locked **D15/R-018**: 24-month retention for inquiry mail, enforced by
  a manual annual sweep → **OB-8**. A paid/free register of company-wide services
  (Workspace, Vercel, Claude) was raised and deliberately **not** started here — it is
  company scope under D8/R-012.

*(Older entries evicted by the cap — see `git log`.)*
