# Status — Wrad Labs website

**Memory kind: status — overwrite constantly.** Where things stand *right now*.
No rules (see [`rules/active.md`](rules/active.md)), no rationale (see
[`decisions.md`](decisions.md)). If a line here is out of date, it is a bug.

**The Backlog below is the single pending-work index in this repo (R-014).** It is
an *index*: one line per item, tier tag, and a pointer to detail that lives
elsewhere — never a second copy of the detail.

Last updated: **2026-07-30**

---

## Now

**Live.** www.wradlabs.com — static single page on GitHub Pages, deployed from
`main`, custom domain via `CNAME`. Edge path is **Cloudflare in front of Fastly**
(GitHub's CDN), `max-age=600`. **HTTPS enforced and HSTS live** since 2026-07-29:
`max-age=15552000` (6 months) on apex and `www`, no `includeSubDomains`, no preload.

- **Page:** `#home` (hero + decorative SVG — the brand mark under a canopy) →
  `#ventures` (2 cards) → `#contact`. Plus `privacy.html`, `404.html`, `robots.txt`,
  `sitemap.xml`.
- **Every section is a full-viewport page** (D19 / `R-021`) — `min-height: 100svh`,
  content centred below the fixed nav (`--nav-h`). **`min-height`, never `height`:** the
  contact form is taller than a short laptop and has to be able to push its section past
  the viewport rather than be clipped, so on shorter screens contact scrolls. Below
  ~620px tall the full-viewport rule drops out entirely.
- **Positioning copy, 2026-07-30:** headline *"Building technology ventures with
  purpose."*, sub *"Wrad Labs is an independent venture studio…"*, footer tagline
  *"Building things worth leaving behind."* `<title>`, description, OG/Twitter and the
  JSON-LD description were updated to match — they had carried the retired line.
- **Contact form:** live, posting to Formspree (`mvzjloro` → support@wradlabs.com)
  with honeypot and a native-POST fallback. Formspree activation **confirmed by the
  owner 2026-07-27** — submissions are being delivered.
- **Ventures section.** The **Optants** tile is now a live **whole-card link** to
  **optants.com** (verified 200), labelled *Near launch*, carrying Optants' **own logo**
  copied from its repo — a second upstream brand, under the same derived-copy rule as the
  Wrad mark. Plus a "Future Ventures" card. Product/build detail lives in the private
  `optants` repo; the corporate view lives in `company`.
- **The mark is LOCKED (D18/R-020); the palette is still a working DRAFT (D11).** The
  flask-and-roots mark replaced the placeholder tree/node glyph on 2026-07-30 and is
  signed off. It is **`assets/images/mark.svg`, referenced by `<img>`** from nav, footer,
  `privacy.html` and `404.html` — one cached file, no inline sprite. It is **taller than
  it is wide (512×939)**: size it by height, never width. Its source of truth is `brand/`
  in the private `company` repo (C10) — **the copies here are derived; never edit the
  artwork in this repo.** The palette is unchanged and still a draft: warm off-white,
  terracotta accent, Source Serif 4 / Inter. The token *system* (declare once, never
  hardcode — R-004) stays; the palette *values* remain open.
- **Icons and share card, one asset per slot.** `favicon.svg` (theme-adaptive: ink,
  flipping to paper in dark browser chrome), `favicon-48.png`, a real multi-size
  `/favicon.ico`, `apple-touch-icon.png`, `og.png` (1200×630, so `twitter:card` is now
  `summary_large_image`), and `icon-512.png` for the JSON-LD `logo`. The old 317 kB
  `logo.png` did all of those jobs at once and is deleted.
- **Two drawings of the mark, and the medium picks (upstream C11 / `R-003`).** Every
  **square raster icon** here is the **small mark** — the master's own vial filled solid
  with the tendrils clipped off, derived from the master rather than redrawn; `mark.svg` in the
  nav, footer, legal and 404 is the **master**. They are not the same drawing and that is
  deliberate — a 16px PNG gets 16 pixels, where the vector at 30px gets 60 on a 2× display.
  **`og.png` now carries the company name:** the horizontal lockup, mark plus "WRAD LABS"
  outlined from Inter 700, above a terracotta rule.
- **Third-party surface:** Cloudflare (edge/TLS), Google Fonts, Formspree, GitHub
  Pages/Fastly, Google Workspace (email, off-repo). All five are named in `privacy.html`
  as of 2026-07-30 — R-007 is met on the live site.
- **Cloudflare rewrites HTML at the edge.** Email Address Obfuscation was turning every
  `mailto:` into a JS-only decoder until 2026-07-30 (D17/R-019). Treat any zone-level
  Cloudflare feature as capable of changing what ships: **the repo is no longer the whole
  truth about what a visitor receives.** Verify rendering against the live domain, not
  just locally.

**In flight.** The **nine-change site pass** — branch `feat/full-page-sections`, PR open,
**not yet merged**. Full-viewport sections, new positioning copy, the Optants tile as a live
link, contact hierarchy, and the stacked footer lockup.

**Not here.** Accounting, company funding, corporate filings, and product
development live in the private `company` repo (D8/R-012).

---

## Backlog

### Owner-blocked — needs a decision or action only the owner can take

| # | Item | Tier |
|---|---|---|
| OB-2 | **Legal review of `privacy.html` wording.** Published and plain-English; it deliberately claims no specific regulatory framework (no GDPR/CCPA rights language) — confirm that matches the company's actual obligations. Now dated July 30, 2026 and naming all five processors. | 🔴 3 |
| OB-5 | **Confirm tracked-file exposure is acceptable.** `CLAUDE.md`, `README.md`, and now `decisions.md` / `status.md` all return 200 at the live domain. Full suppression needs a Jekyll build, which D1 rules out — but AQ-10 can stop them being *indexed*, which shrinks this to "accept that they are reachable." Carried from WORKPLAN P0. | 🔴 3 |
| OB-6 | **Content: replace aspirational copy with proof** as products, team, or case studies exist. Carried from WORKPLAN P4. | 🟡 2 |
| OB-7 | **Decide whether to add privacy-respecting analytics** (e.g. Plausible). Requires a privacy-policy disclosure. Carried from WORKPLAN P4. | 🟡 2 |
| OB-8 | **Annual inquiry sweep — delete support-mailbox mail older than 24 months (R-018).** First mandatory deletion due **2028-07** (form live since 2026-07-04); run it annually from 2027-07 so nothing ages past the published figure. Mailbox-side action only — no agent can do this. If the sweep lapses, `privacy.html` must change, not the practice. | 🔴 3 |
| OB-10 | **Force the social platforms to re-scrape the share card.** The new `og.png` is live and correct, but each platform caches the *old* image against the URL and will keep serving it — nothing in this repo can clear those caches, and they need a signed-in account. **LinkedIn:** open `https://www.linkedin.com/post-inspector/`, paste `https://www.wradlabs.com/`, click **Inspect** — it refetches on every run. **Facebook/Meta:** `https://developers.facebook.com/tools/debug/`, paste the URL, click **Scrape Again**. **X/Twitter:** no public validator remains; it refreshes on its own within about a week. **Verify:** each tool previews the card it now holds — you want the flask on off-white with a terracotta rule, not the old tree glyph. **Reverse:** nothing to undo; re-scraping only re-reads what the site already serves. | 🔴 3 |

### Agent queue — ready to pick up

| # | Item | Tier |
|---|---|---|
| AQ-1 | Remove the dead placeholder guard in `assets/js/script.js` that checks `form.action` for `'YOUR_FORM_ID'` — unreachable since D4. Separate PR. | 🟢 1 |
| AQ-2 | Add `<meta name="referrer" content="strict-origin-when-cross-origin">`. Carried from WORKPLAN P2. | 🟢 1 |
| AQ-3 | Add a `<meta http-equiv="Content-Security-Policy">` scoped to Google Fonts + Formspree. Can break rendering — test both breakpoints. Carried from WORKPLAN P2. | 🟡 2 |
| AQ-5 | Add a "skip to content" link. Carried from WORKPLAN P3. | 🟢 1 |
| AQ-7 | Reduce layout shift — preload the hero/tree image. Carried from WORKPLAN P3. | 🟢 1 |
| AQ-9 | Self-host the fonts to drop the Google Fonts request (privacy + performance). Interacts with OB-1 and AQ-3. Carried from WORKPLAN P3. | 🟡 2 |
| AQ-10 | Add `Disallow: /*.md$` to `robots.txt` so the tracked docs stop being *indexed*. They stay reachable — no build step, so D1 is untouched — but this is the only mitigation available for OB-5 and it costs nothing. | 🟢 1 |
| AQ-11 | Add `privacy.html` to `sitemap.xml`. It carries a canonical URL and `index, follow` but is absent from the single-URL sitemap. | 🟢 1 |
| AQ-14 | **Cache-bust `style.css` so an HTML/CSS skew can't ship broken styling.** The HTML is `max-age=600`, the CSS `max-age=14400`, so for up to 4 hours a returning visitor holds new HTML with old CSS — and any deploy that renames a class renders it unstyled. Seen live on 2026-07-30: the new hero art showed solid black instead of muted. Fix is a version query on the three `<link rel="stylesheet">` tags (`style.css?v=2`), bumped whenever selectors change; a new URL makes the browser fetch fresh CSS immediately. Adopting it is a small convention change, hence 🟡. | 🟡 2 |
| AQ-12 | **Document the SEO/metadata surface in `docs/ARCHITECTURE.md`** — the JSON-LD `Organization` schema, Twitter/OG meta, and `apple-touch-icon` are 11 lines of `index.html` that no reference doc describes. Surfaced when the R-017 cap evicted the only session entry that recorded them. | 🟢 1 |

Tier key: 🟢 1 autonomous · 🟡 2 propose first · 🔴 3 human-only — see
[`CLAUDE.md`](CLAUDE.md) §3.

---

## Session history

Dated one-liners, newest first. **Capped at 5 (R-017)** — adding one drops the
oldest in the same edit. This is an orientation trail for a cold session, not a
record: `git log` is the record, and evicted entries are deleted, not archived.

- **2026-07-30** — **Nine owner-directed site changes; D19 → R-021.** The structural one:
  **every section is now a full-viewport page** — `min-height: 100svh`, content centred
  below the fixed nav via a new `--nav-h` token that also drives `scroll-padding-top`. That
  also removed the gap at the top of the homepage: the hero's 190px top padding existed to
  clear the nav on a normally-scrolling page, and centring below the nav does that job now.
  **R-021 is `min-height`, never `height`** — compiled rather than left as a style note
  because the failure is invisible on the machine it is written on: the two look identical
  until a shorter screen clips the contact form. A `max-height: 620px` query drops the rule
  entirely below a landscape phone, where forcing a viewport height only guarantees an
  overflow. One layout bug caught in the process: `margin: 0 auto` on a flex item **cancels
  the default stretch**, so `.container` and `.hero-inner` collapsed to their content width
  the moment sections became flex containers — `width: 100%` restores them. The hero art is
  now sized by **height**, `min(600px, 100vh − nav − padding)`, so it fits the page by
  construction rather than by luck. **Optants** got its real entry: its **own logo** from
  its own repo (a second upstream brand here), the new copy, *Near launch*, and the whole
  tile is one `<a>` to optants.com — verified 200 before linking, since the card had been
  carrying an "In development" label precisely because there was nowhere to point. One tab
  stop, one hit target, with the affordance carried by a border-and-shadow lift, a nudging
  arrow and a focus ring matching the form fields, because there is no underlined text to
  signal it. Contact gained real hierarchy: intro, then the direct address as its own row
  set off by rules, then the form. Also: hero eyebrow removed, footer tagline is now
  *"Building things worth leaving behind."*, and the footer's mark-plus-text pair is
  replaced by the single stacked lockup. The retired tagline was also in `<title>`, the
  meta description, OG/Twitter and the JSON-LD — all updated, since leaving them would have
  contradicted the page.

- **2026-07-30** — **Replaced the placeholder mark with the real one (D18/R-020) — merged and live.** The
  owner signed off the flask-and-roots artwork; it was vectorised and built out in the
  private `company` repo (**C10**), which is now the source of truth — a mark is company IP
  and outlives any surface, so this repo holds **derived copies only**, and that repo's
  build script deliberately stops at the boundary rather than syncing here (**OOM D-005**:
  an asset that arrives without review is an asset that ships without review). This
  **partially closes D11** — the *mark* is locked, the *palette* stays a draft, so R-004 is
  untouched and R-005 stays retired. Delivery changed with it: the placeholder was a
  stroked `<symbol>` duplicated into each page's sprite, but the new mark is a single
  **10.6 kB** path, so inlining it three times would have roughly doubled an 11 kB
  `index.html` for a capability a one-colour mark does not need. It is now one cached
  `assets/images/mark.svg` referenced by `<img>`. The new mark is also **taller than wide**
  where the old one was near-square — hence R-020's size-by-height clause and the intrinsic
  `width`/`height` on every `<img>`. **Closes AQ-8**: each icon slot now has an asset built
  for it — theme-adaptive SVG favicon, 48 px PNG, a real multi-size `/favicon.ico`,
  apple-touch, a 1200×630 `og.png` (so `twitter:card` becomes `summary_large_image`), and a
  square `icon-512.png` for the JSON-LD `logo` — replacing the one 317 kB `logo.png` that
  had been doing all four jobs, now deleted. Found in passing and **not** touched, to keep
  the diff to one subject: `tree-backdrop.png`, 2 MB and referenced by nothing (**AQ-13**).

- **2026-07-30** — **Closed OB-9** and fixed a live rendering defect the owner reported.
  `privacy.html` now names **Cloudflare** as a processor (it terminates TLS and sees every
  visitor IP), so R-007 is met on the live site. Investigating why production didn't match
  the design found the cause: **Cloudflare's Email Address Obfuscation was rewriting every
  `mailto:` at the edge** into "[email protected]" behind a JS-only `/cdn-cgi/` decoder.
  Invisible in the repo, because it happens after it. That broke the two main CTAs *and*
  R-008 — on `privacy.html` all four addresses were obfuscated with **zero** plain-text
  addresses left, so the policy's own access/deletion route displayed no address and
  required JS. Opted out per-link with `<!--email_off-->` (Cloudflare's documented
  mechanism, checked against their docs rather than memory). Locked **D17 → R-019**, which
  also **closes AQ-4** as not-satisfiable: any obfuscation hiding the address from a
  scraper hides it from a no-JS reader, and R-008 is locked. Standing lesson recorded in
  `SECURITY.md` — a zone-level toggle can alter served markup without a commit.
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
*(Older entries evicted by the cap — see `git log`.)*
