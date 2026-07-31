# Status — Wrad Labs website

**Memory kind: status — overwrite constantly.** Where things stand *right now*.
No rules (see [`rules/active.md`](rules/active.md)), no rationale (see
[`decisions.md`](decisions.md)). If a line here is out of date, it is a bug.

**The Backlog below is the single pending-work index in this repo (R-014).** It is
an *index*: one line per item, tier tag, and a pointer to detail that lives
elsewhere — never a second copy of the detail.

Last updated: **2026-07-31**

---

## Now

**Live.** www.wradlabs.com — static single page on GitHub Pages, deployed from
`main`, custom domain via `CNAME`. Edge path is **Cloudflare in front of Fastly**
(GitHub's CDN), `max-age=600`. **HTTPS enforced and HSTS live** since 2026-07-29:
`max-age=15552000` (6 months) on apex and `www`, no `includeSubDomains`, no preload.

- **Page:** `#home` (hero + decorative SVG — the brand mark under a canopy, **centred in
  the whitespace beside the text column**, not pinned to the container edge; `left` and
  `right` on `.hero-art` are a pair, overriding one re-pins it) → `#ventures` (2 cards) →
  `#contact` (invitation with the address reading straight on from it, then the form;
  the consent line sits 10px under the Send button). Plus `privacy.html`, `404.html`,
  `robots.txt`, `sitemap.xml`.
- **Every section is a full-viewport page** (D19 / `R-021`) — `min-height: 100svh`,
  content centred below the fixed nav (`--nav-h`). **`min-height`, never `height`:** the
  contact form is taller than a short laptop and has to be able to push its section past
  the viewport rather than be clipped, so on shorter screens contact scrolls. Below
  ~620px tall the full-viewport rule drops out entirely.
- **Positioning copy:** headline *"Building technology ventures with purpose."*, sub
  *"Wrad Labs is an independent venture studio…"* `<title>`, description, OG/Twitter and
  the JSON-LD description match. **The footer carries the lockup and the copyright line
  and nothing else** as of 2026-07-30 — the tagline and the address were removed (D21);
  *"…worth leaving behind."* now appears once, as the contact heading.
- **The published address is `hello@wradlabs.com`** (D20, 2026-07-30), everywhere in
  markup, docs and metadata. `support@` appears in no tracked file except superseded
  decision entries. Honeypot and native-POST fallback unchanged; Formspree delivery
  **confirmed by the owner 2026-07-27**.
- **Formspree targets `hello@wradlabs.com` too**, as of 2026-07-31 — the owner re-pointed
  it in the dashboard, so the page and the form now name the same address. The setting
  lives at **Workflow → Actions → Email → 3-dot → Settings**, *not* Settings → Form
  settings, which Formspree documents as the legacy path this account does not have; a new
  target must first be a **verified Linked Email** under Account, and the free plan caps
  that at **2**. Closed OB-11. **Repo-side changes cannot affect this** — the recipient is
  dashboard config, so a `mailto:` edit here moves what the page *says* and nothing about
  where mail *goes*.
- **`hello@` and `support@` are aliases into one Google Workspace mailbox** (owner-confirmed
  2026-07-31). That is why the re-point was cosmetic rather than a fix — mail was arriving
  either way — and it is what R-018's 24-month sweep (OB-8) is scoped to. Had they been
  separate mailboxes, the published retention figure would have needed the sweep widened or
  the figure changed (D20).
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
- **CSS is cache-busted — `style.css?v=N`, and N must be bumped in all three pages when
  selectors change.** The HTML is `max-age=600` but the CSS is `max-age=14400`, so a
  returning visitor could otherwise hold new markup against four-hour-old styles, and any
  release renaming a class rendered unstyled. Seen live 2026-07-30 (the new hero art
  showed as a solid black shape). `script.js` is deliberately *not* versioned — under
  R-008 a stale copy degrades rather than breaks.
- **Crawl surface, as of 2026-07-31.** `sitemap.xml` lists **two** URLs — `/` and
  `/privacy.html`, which had been absent despite carrying a canonical URL and
  `index, follow`. `robots.txt` **disallows `/*.md$`**, so compliant crawlers stop fetching
  the tracked docs that D2 leaves served at the domain. **That is not privacy** — the files
  stay reachable to anyone with the URL, and a disallowed URL can still be listed (without
  content) if something external links to it. It is the ceiling available: no build step
  (D1), and a `.md` carries neither a robots meta tag nor an `X-Robots-Tag` on Pages.
- **Cloudflare rewrites HTML at the edge.** Email Address Obfuscation was turning every
  `mailto:` into a JS-only decoder until 2026-07-30 (D17/R-019). Treat any zone-level
  Cloudflare feature as capable of changing what ships: **the repo is no longer the whole
  truth about what a visitor receives.** Verify rendering against the live domain, not
  just locally.

**In flight.** Nothing in the repo. The seven-change contact/copy pass (D20/D21) shipped
2026-07-31 ([#15](https://github.com/Wrad-Labs/website/pull/15)) and is **verified live**:
all three pages 200, each linking `style.css?v=3`, the versioned CSS serving
`margin-inline` on the hero art and `.form-submit`, and none of the three deleted
selectors surviving anywhere. `hello@` in every published slot, `support@` in **zero**
live bytes, and — the D17 check that only the live domain can answer — **all four
`mailto:` links render plain, with no `/cdn-cgi/` decoder**: the `<!--email_off-->`
wrappers held through the address change.

**And it is finished outside the repo too.** OB-11 closed 2026-07-31: the two addresses
are aliases into one mailbox, so form mail was never mis-delivered, and the owner then
re-pointed Formspree at `hello@` as well, so the page and the form now agree. **The live
form has not been submitted end-to-end since the re-point** — the next real inquiry is the
test, unless someone sends a throwaway one first.

**Not here.** Accounting, company funding, corporate filings, and product
development live in the private `company` repo (D8/R-012).

---

## Backlog

### Owner-blocked — needs a decision or action only the owner can take

| # | Item | Tier |
|---|---|---|
| OB-2 | **Legal review of `privacy.html` wording.** Published and plain-English; it deliberately claims no specific regulatory framework (no GDPR/CCPA rights language) — confirm that matches the company's actual obligations. Now dated July 30, 2026 and naming all five processors. | 🔴 3 |
| OB-5 | **Confirm tracked-file exposure is acceptable.** `CLAUDE.md`, `README.md`, `decisions.md` and `status.md` all return 200 at the live domain. **The available mitigation has now shipped** (AQ-10, 2026-07-31): `robots.txt` disallows `/*.md$`, so compliant crawlers stop fetching them. It does **not** make them private and never could — full suppression needs a Jekyll build, which D1 rules out, and a `.md` file can carry neither a robots meta tag nor an `X-Robots-Tag` on Pages. So this is now purely the owner's question: **accept that these files are reachable to anyone with the URL, or reopen D1/D2.** Nothing further an agent can do. Carried from WORKPLAN P0. | 🔴 3 |
| OB-6 | **Content: replace aspirational copy with proof** as products, team, or case studies exist. Carried from WORKPLAN P4. | 🟡 2 |
| OB-7 | **Decide whether to add privacy-respecting analytics** (e.g. Plausible). Requires a privacy-policy disclosure. Carried from WORKPLAN P4. | 🟡 2 |
| OB-8 | **Annual inquiry sweep — delete contact-mailbox mail older than 24 months (R-018).** **One mailbox**, reached by both `hello@` and `support@` as aliases (owner-confirmed 2026-07-31), so the sweep scope is settled. First mandatory deletion due **2028-07** (form live since 2026-07-04); run it annually from 2027-07 so nothing ages past the published figure. Mailbox-side action only — no agent can do this. If the sweep lapses, `privacy.html` must change, not the practice. | 🔴 3 |
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
| AQ-12 | **Document the SEO/metadata surface in `docs/ARCHITECTURE.md`** — the JSON-LD `Organization` schema, Twitter/OG meta, and `apple-touch-icon` are 11 lines of `index.html` that no reference doc describes. Surfaced when the R-017 cap evicted the only session entry that recorded them. | 🟢 1 |

Tier key: 🟢 1 autonomous · 🟡 2 propose first · 🔴 3 human-only — see
[`CLAUDE.md`](CLAUDE.md) §3.

---

## Session history

Dated one-liners, newest first. **Capped at 5 (R-017)** — adding one drops the
oldest in the same edit. This is an orientation trail for a cold session, not a
record: `git log` is the record, and evicted entries are deleted, not archived.

- **2026-07-31** — **Seven owner-directed changes; D20 supersedes D12, D21 recorded.** The
  one with teeth: **the published address moved from `support@` to `hello@`** — markup,
  four places in `privacy.html`, the JSON-LD `email`, both form-failure strings in
  `script.js`, `SECURITY.md`'s disclosure route and `README.md`. That contradicted a
  *locked* decision (D12 named `support@` as the only permitted address), so it went in as
  D20 rather than as a find-and-replace, and R-003/R-018/R-019 recompiled around it. **The
  trap worth remembering: the markup is not the delivery path.** The contact form posts to
  Formspree `mvzjloro`, whose recipient is dashboard config — editing every `mailto:` in
  the repo moves what the page *says* and nothing about where mail *goes*. Hence **OB-11**,
  with the click-path, and the second question inside it: if `hello@` is a separate mailbox
  rather than an alias, R-018's 24-month sweep no longer covers what receives, and a
  published retention figure with no mechanism behind it is exactly what the owner model
  forbids — so the answer is asked for, not assumed (**OOM D-007**). **Answered and closed
  2026-07-31: aliases into one mailbox**, so nothing was mis-delivered and the sweep scope
  holds; the owner re-pointed Formspree at `hello@` anyway, so both now agree. The
  playbook needed correcting twice on the way — the recipient is under **Workflow**, not
  Settings, and the address must be a verified Linked Email *first* — because it was
  written from memory instead of from the vendor's docs. The rest is D21:
  contact drops from three tiers to two (the "Email us directly" label and its rules are
  gone; the address is the invitation's last line), the footer loses its tagline *and*
  address — *"…worth leaving behind."* had been on the page twice and is now only the
  contact heading — the consent line moves from ~50px below the Send button to 10px by
  grouping the two, and the hero art **centres in the whitespace** beside the text instead
  of sitting against the container edge. That last one is a `left`/`right` **pair** with
  `margin-inline: auto`; the old `right: -20px` override in the 1080px query had to go,
  because overriding one offset alone silently re-pins the art. Measured at 1400px: 38px of
  gap on each side of the art. `?v=3` in all three pages — `.contact-email-label`,
  `.footer-tagline` and `.footer-email` were deleted, which is exactly the rename case
  AQ-14 exists for. **Merged and verified live the same day** ([#15](https://github.com/Wrad-Labs/website/pull/15)),
  including the check only the live domain can make: no `/cdn-cgi/` email decoder on
  either page, so R-019 survived the address change. **Then AQ-10 and AQ-11**
  ([#16](https://github.com/Wrad-Labs/website/pull/16)): `robots.txt` disallows `/*.md$`
  and `privacy.html` joins the sitemap. AQ-10 was carried as OB-5's mitigation, and
  shipping it **does not close OB-5** — it lowers the ceiling to "reachable but not
  crawled" and hands the remaining question back to the owner, which the backlog entry now
  says outright instead of implying a fix is pending.

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
  contradicted the page. **AQ-14 shipped in the same release, deliberately:** cache-busting
  the stylesheet only protects a deploy if the new HTML points at the new CSS URL, and this
  was the largest class rename the site has had.

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
*(Older entries evicted by the cap — see `git log`.)*
