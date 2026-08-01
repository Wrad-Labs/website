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
  decision entries. Honeypot and native-POST fallback unchanged. **The contact path is
  verified end-to-end as of 2026-07-31** — a live submission reached `hello@`, so markup,
  endpoint, recipient and mailbox are confirmed together rather than inferred.
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
- **The palette is CANOPY and LOCKED** (D28 / `R-026`, 2026-07-31, superseding D26 the same
  day) — warm ground `#F6F3EA`, sunk `#EBE7DA`, ink `#1E2318`, accent **leaf green
  `#3F5E18`**. **D26's diagnosis holds and is carried forward** — the *ground*, not the
  accent, is what made this site read like Optants — but its answer, cool greys and
  oxblood, was off-brand: austere and vinous for a company that builds products to fund
  public good. **A palette can pass every contrast check and still be wrong**; D26 shipped
  clean on 15 measured pairs.
- **Warm, but not warm the way Optants is warm.** On red-minus-blue: Optants `+2`
  (neutral), Cool Stone `−4`, Canopy `+12`. The accent is olive at **hue 87°**, clear of
  Optants' teal at **174°** — neighbouring green families were avoided deliberately.
- **The green accent inverted the status-token problem.** Under oxblood, `--danger` was the
  clash and became a vermillion. Now red sits 87° away and returns to `#B91C1C`; it is
  **`--success`** that needs the gap, at `#116B4A` (hue 158°, **71°** from the accent).
  `R-026` now names *whichever status token is nearest the accent*, so it survives the next
  palette change. **D11 remains fully closed**, its mark half by D18.
- **The mark is LOCKED (D18/R-020).** The
  flask-and-roots mark replaced the placeholder tree/node glyph on 2026-07-30 and is
  signed off. It is **`assets/images/mark.svg`, referenced by `<img>`** from nav, footer,
  `privacy.html` and `404.html` — one cached file, no inline sprite. It is **taller than
  it is wide (512×939)**: size it by height, never width. Its source of truth is `brand/`
  in the private `company` repo (C10) — **the copies here are derived; never edit the
  artwork in this repo.** Type is unchanged — Source Serif 4 / Inter. The token *system*
  (declare once, never hardcode — R-004) stays.
- **The hero carries the right side now** (D28). The page was left-loaded — a text column
  beside a shape too pale to register. Three changes, none of which works alone: art tones
  from **1.25/1.43 to 1.34/1.73** against the ground (and sage, because the art *is* the
  canopy); height **600 → 700px**; and **`--hero-col` narrowed 560 → 520**, which is the
  enabling one — art width follows height from the viewBox, so growing it alone would have
  pushed it into the copy. At 1400px the art is 537 wide, centred with 20px each side and
  **74px clear of the widest text**. It also closed a pre-existing 16px overlap at 960px,
  now 55px clear.
- **Hero art: tapered trunk, three asymmetric branches** (D27, 2026-07-31). The trunk is a
  **filled** path, ~28 units at the base narrowing to 6, because a uniform stroke read as a
  drawn line beside the vessel, which is a solid. Branches thin outward (12/9/7) and **all
  start above y=228, the vessel rim** — lower and they appear to grow out of the glass.
  **Their widths are CLASSES, not `stroke-width` attributes:** a presentation attribute
  loses to any CSS rule, and writing them inline silently flattened all three to 7.
- **Every brand asset is Canopy, and the derived copies match upstream** (2026-07-31,
  company **C13**). `mark.svg` now renders `#1E2318` — **the same ink as the headings beside
  it**, which is what `brand/README.md` always claimed and was briefly false while the
  palette moved. `og.png` carries a **leaf-green rule and zero terracotta pixels**
  (verified by decomposing the image, not by eye). Closed OB-14.
- **`favicon.svg` is the mark on its own ground** — ink glyph on a paper tile, 512² with a
  96 corner radius (company **C12**). It replaced a theme-adaptive glyph that flipped on
  `prefers-color-scheme`, **which is not the colour of the tab strip**: under a custom
  browser theme the two disagree and the icon vanished (owner screenshot). A tile does not
  need to contrast with the strip — the glyph contrasts with the tile, and that never
  changes. The paper tile was chosen over the ink one because it matches what the PNG
  exports have always done.
- **The rest, one asset per slot.** `favicon-48.png`, a real multi-size `/favicon.ico`,
  `apple-touch-icon.png`, `og.png` (1200×630, so `twitter:card` is `summary_large_image`),
  and `icon-512.png` for the JSON-LD `logo`. The old 317 kB `logo.png` did all of those
  jobs at once and is deleted.
- **All three pages carry an identical four-line icon block**, absolute-pathed, as of
  2026-07-31 — and it now **declares `/favicon.ico` instead of leaving it to root
  discovery**. It was always served and always current; it was simply in no `<link>`, so a
  crawler reading the homepage's markup and a crawler fetching the bare root were looking
  at the same file by coincidence rather than by statement. `index.html` had also been the
  odd page out with relative `assets/…` hrefs and its `apple-touch-icon` stranded twelve
  lines below the other icons; `404.html` declared no `apple-touch-icon` at all.
- **Every icon this site serves is verified byte-identical to `brand/` upstream**
  (2026-07-31, by hash): `favicon.svg`, `favicon-48.png`, `apple-touch-icon.png`,
  `icon-512.png`, `og.png`, `mark.svg`, `logo-stacked.svg` and the root `favicon.ico` —
  which was **also compared against the live domain** and matches. So a stale logo anywhere
  is a *remote cache*, not a stale asset here. That distinction is OB-10.
- **Two drawings of the mark, and the medium picks (upstream C11 / `R-003`).** Every
  **square raster icon** here is the **small mark** — the master's own vial filled solid
  with the tendrils clipped off, derived from the master rather than redrawn; `mark.svg` in the
  nav, footer, legal and 404 is the **master**. They are not the same drawing and that is
  deliberate — a 16px PNG gets 16 pixels, where the vector at 30px gets 60 on a 2× display.
  **`og.png` now carries the company name:** the horizontal lockup, mark plus "WRAD LABS"
  outlined from Inter 700, above a leaf-green rule.
- **Third-party surface, five processors:** Cloudflare (edge/TLS), **Cloudflare Web
  Analytics**, Formspree, GitHub Pages/Fastly, Google Workspace (email, off-repo). All five
  are named in `privacy.html`, dated **July 31, 2026**. **Google Fonts is gone**
  (D23/R-023), so this repo's markup requests nothing third-party — **the served page still
  loads the analytics beacon**, and that gap is the standing lesson, not a bug.
- **Analytics is on, and disclosed** (D24 / `R-024`, 2026-07-31). Cloudflare Web Analytics
  injects `<script data-cf-beacon>` from `static.cloudflareinsights.com` at the edge, on
  every page; it is in no commit. Found while verifying the D23 deploy, at which point
  `privacy.html` still said *"We do not use analytics… of any kind"* — **the policy page
  was loading the beacon while denying it.** The owner chose to keep it, so the policy now
  names it, describes what it reports, and claims only what is true: no advertising or
  social-media tracking, and **no cookies** (verified — `document.cookie` is empty live).
  **Closed OB-13, and closed OB-7** — which had been sitting open asking whether to *add*
  analytics that turned out to be already running. **The disclosure and the Cloudflare
  toggle move together** (R-024): switching it off without editing the policy makes the
  page wrong in the other direction.
- **D23's "no third-party request" claim is corrected here**, not by editing D23 — it holds
  for this repo's markup and not for the served page (R-013 is append-only).
- **Third time the edge changed what ships, and each time it evaded the check that caught
  the last one.** D17 was markup rewriting (caught by reading the live HTML). D22 was
  `robots.txt` injection (caught by `curl`). The D24 beacon is **invisible to `curl` even
  with a browser User-Agent** — it appeared only in a real browser's DOM on the live domain.
  Now compiled into **R-025** rather than left as prose: **"verify against the live domain"
  means a real browser, not a fetch.**
- **A CSP is live on all three pages** (D25 / `R-025`), one identical string, `script-src`
  hash-based with no `'unsafe-inline'`. `style-src` keeps `'unsafe-inline'` on purpose —
  `privacy.html` and `404.html` have inline `<style>` blocks, and hashing them means a
  silently unstyled page on every edit. **Editing the inline `js`-class script requires
  recomputing its hash**; the command is in the markup comment. The beacon origin is
  allowed in `script-src`, but **`connect-src` needed nothing**: the beacon POSTs to
  `/cdn-cgi/rum`, which is same-origin — captured by intercepting `sendBeacon` rather than
  guessed, and the guess would have been `cloudflareinsights.com`.
- **CSS is cache-busted — `style.css?v=N`, and N must be bumped in all three pages when
  selectors change.** The HTML is `max-age=600` but the CSS is `max-age=14400`, so a
  returning visitor could otherwise hold new markup against four-hour-old styles, and any
  release renaming a class rendered unstyled. Seen live 2026-07-30 (the new hero art
  showed as a solid black shape). `script.js` is deliberately *not* versioned — under
  R-008 a stale copy degrades rather than breaks.
- **Accessibility: skip link on all three pages** (2026-07-31). First tab stop, jumping to
  `#main` and skipping 4 nav stops. Two details it will not survive losing: it is
  **`position: fixed`**, because `absolute` puts it above the viewport the moment the page
  is scrolled — which is exactly when someone re-entering from the browser chrome reaches
  for it; and **`<main>` carries `tabindex="-1"`**, because without it the browser moves
  the scroll but leaves focus at the top of the document and the next Tab goes straight
  back into the nav. Both were caught in testing, not by reading.
- **Measured CLS is 0**, and there is **no hero image** — the hero art is an inline `<svg>`,
  every `<img>` carries intrinsic `width`/`height`. Closed AQ-7, which asked to preload a
  `tree-backdrop.png` that no longer exists. Font swap was the last theoretical source and
  AQ-9 removed it: the two **latin** files are preloaded from this origin, latin-ext is not
  (its `unicode-range` means most readers never fetch it).
- **Fonts are self-hosted** (D23 / `R-023`, 2026-07-31). Four `woff2` in `assets/fonts/`,
  ~348 kB, **derived copies** under SIL OFL with the licences beside them. One **variable**
  file per subset declaring `font-weight: 400 700`, not one file per weight — upstream's
  four blocks all pointed at the same URL. Verified interpolating rather than synthesizing:
  Inter 400/500/600/700 render at 520.4/528.6/536.6/544.8px. To update, re-fetch the `css2`
  URL in the CSS comment; never hand-edit the binaries.
- **`referrer` = `strict-origin-when-cross-origin`** on all three pages. Since D23 there is
  only one cross-origin destination left to protect: Formspree, on submit.
- **Crawl surface, as of 2026-07-31.** `sitemap.xml` lists **two** URLs — `/` and
  `/privacy.html`, which had been absent despite carrying a canonical URL and
  `index, follow`. `robots.txt` **disallows `/*.md$`**, so compliant crawlers stop fetching
  the tracked docs that D2 leaves served at the domain. **That is not privacy** — the files
  stay reachable to anyone with the URL, and a disallowed URL can still be listed (without
  content) if something external links to it. It is the ceiling available: no build step
  (D1), and a `.md` carries neither a robots meta tag nor an `X-Robots-Tag` on Pages.
- **`robots.txt` is the repo's again, and AI crawlers are allowed** (D22 / `R-022`,
  2026-07-31). Cloudflare's **AI Crawl Control** had been prepending a managed policy — a
  `Content-Signal: ...ai-train=no...` line and `Disallow: /` for ~10 named AI crawlers —
  ahead of the committed file, chosen by no decision here. Both dashboard controls are now
  off ("Manage your robots.txt" disabled, "Block AI training bots" set to do-not-block) and
  **the live file is verified byte-identical to the repo's**, zero injected markers. Closed
  OB-12. **What the episode taught, worth more than the setting:** nothing was ever blocked
  at the network level — nine user agents including ClaudeBot, GPTBot and Googlebot all
  returned **200**. The suppression was *advisory*; the door was open and the sign said stay
  out. A refusing crawler and a blocked one look identical from outside and have opposite
  fixes. **This does not generalize to Optants** — see D22.
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
re-pointed Formspree at `hello@` as well, so the page and the form now agree.
**End-to-end delivery is confirmed** — the owner submitted the live form 2026-07-31 and
mail arrived at `hello@wradlabs.com`. That is the whole chain tested at once: markup →
Formspree `mvzjloro` → the re-pointed recipient → the mailbox. Nothing about the contact
path now rests on configuration alone, which matters because **its failure mode is
silent**: a wrong recipient produces no bounce and no error on the page, just submissions
that quietly never arrive. Re-test after any change to the endpoint, the recipient, or the
form's field names.

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
| OB-8 | **Annual inquiry sweep — delete contact-mailbox mail older than 24 months (R-018).** **One mailbox**, reached by both `hello@` and `support@` as aliases (owner-confirmed 2026-07-31), so the sweep scope is settled. First mandatory deletion due **2028-07** (form live since 2026-07-04); run it annually from 2027-07 so nothing ages past the published figure. Mailbox-side action only — no agent can do this. If the sweep lapses, `privacy.html` must change, not the practice. | 🔴 3 |
| OB-10 | **Refresh the logo Google is still showing.** **Rescoped 2026-07-31** — this was a LinkedIn/Facebook re-scrape playbook, and there are no accounts on either, so those caches are moot and the playbook is retired. The old mark survives in exactly two places, both Google's: the favicon beside search results, and Search Console's property branding. They are **separate caches with separate lifetimes and no purge endpoint** — nothing in this repo reaches them, and every asset this site serves is already Canopy and verified byte-identical to `brand/` (see **Now**). **Do, once:** Search Console → **URL Inspection** → paste `https://www.wradlabs.com/` → **Test live URL** → **Request Indexing**. Repeating it does not speed anything up. **Verify:** run a `site:wradlabs.com` search and look at the icon beside the result — you want the flask, not the old tree glyph. **Then wait:** days to a couple of weeks on Google's own re-crawl, and Search Console's branding may lag search itself. **Reverse:** nothing to undo — requesting indexing only asks Google to re-read what the site already serves. | 🔴 3 |

### Agent queue — ready to pick up

| # | Item | Tier |
|---|---|---|

Tier key: 🟢 1 autonomous · 🟡 2 propose first · 🔴 3 human-only — see
[`CLAUDE.md`](CLAUDE.md) §3.

---

## Session history

Dated one-liners, newest first. **Capped at 5 (R-017)** — adding one drops the
oldest in the same edit. This is an orientation trail for a cold session, not a
record: `git log` is the record, and evicted entries are deleted, not archived.

- **2026-07-31** — **Finalised Canopy across every surface; closed OB-14.** The palette
  lived in four places, only one of which was the stylesheet: **16 brand SVGs**, the
  `PAPER`/`ACCENT` constants in `company`'s `build.mjs`, that repo's README, and **14 raster
  exports** — because rasters cannot read CSS tokens. Re-synced upstream in one pass
  ([company#6](https://github.com/Wrad-Labs/company/pull/6), **C13**), rebuilt, then the
  derived copies came down here through review. **The visible defect it fixed:** `mark.svg`
  had been rendering `#1F2937` beside `#1E2318` headings, breaking `brand/README.md`'s own
  promise that the brand sits in the same ink as the headings next to it — and `og.png` was
  publishing a **terracotta** rule for an accent that no longer existed. **Verified by
  sampling pixels, not by eye:** icons read paper at the corner and ink at the centre, and
  the share card decomposes to 1,008 leaf-green pixels and **zero terracotta**. The
  favicon also became the **grounded tile** (C12), retiring an adaptive glyph that keyed off
  `prefers-color-scheme` — which is not the tab-strip colour, so a custom browser theme made
  it disappear. **One property worth reusing:** running the export build *before* any edit
  reproduced the existing rasters byte-for-byte, so the build is deterministic and a diff in
  `exports/` is always a real source change.

- **2026-07-31** — **Canopy replaces Cool Stone within hours (D28 supersedes D26); the hero
  now carries the right side.** D26 shipped a palette that passed **15 measured contrast
  pairs** and was still wrong: the owner's read was "feels cold" and the oxblood "giving
  wine vibe" — austere and vinous for a company whose whole line is *build cool products,
  fund public good*. **The lesson is the entry: a palette can pass every check and still be
  off-brand, because nothing in a measurement pass asks what the colours mean.** D26's
  *diagnosis* was right and carries forward untouched — the ground, not the accent, is what
  made this site read like Optants — so only the answer changed. **Canopy** is warm paper
  with a leaf-green accent, and the trap it avoids is worth naming: "go back to warm" walks
  straight into Optants, which is also warm. Measured on red-minus-blue, Optants is **+2**,
  Cool Stone **−4**, Canopy **+12** — warm where Optants is *neutral*. Accent olive at hue
  **87°** against Optants' teal at **174°**. **The green accent inverted the status-token
  problem:** under oxblood it was `--danger` that clashed and became a vermillion; now red
  sits 87° clear and goes back to normal, while `--success` is the one needing a gap
  (`#116B4A`, 71°). R-026 was rewritten to name *whichever status token is nearest the
  accent*, so it survives the next palette instead of encoding this one's accident. **The
  hero also got its weight:** tones 1.25/1.43 → **1.34/1.73**, height 600 → **700px**, and
  `--hero-col` narrowed 560 → **520** — the enabling change, since art width follows height
  and growing it alone would have pushed it into the copy. 537 wide at 1400px, centred, 74px
  clear of text; a pre-existing 16px overlap at 960px is now 55px clear. **`?v=7`.**

- **2026-07-31** — **Cool Stone: the palette was locked (D26 → R-026), and the hero trunk
  redrawn (D27).** The owner noticed that wradlabs.com and optants.com "almost feel like
  the same site." They do, measurably: grounds one step apart (`#F9F7F3` vs `#FAFAF8`),
  sunk surfaces two apart, and the **same body typeface**. **The accents were never the
  problem** — and a first pass nearly acted on that mistake, having read Optants' stylesheet
  by hex frequency, mistaken Tailwind's stock `--color-red-*` scale for brand colour, and
  concluded Optants "owns red." Its real token is `--signal: #115E59`, teal; terracotta
  against teal was already a clean split. **The wrong diagnosis would have moved the one
  thing that was working.** Corrected by reading the semantic tokens instead of counting
  hexes. Wrad moved rather than Optants — the product has equity, this page had a draft
  palette — and every neutral lost its warmth. **Two things fell out of measuring rather
  than assuming:** `--success` was carried over at `#15803D`, which is **4.51:1** on the new
  ground, so it moved a step darker; and `--danger` had to change **hue**, not lightness,
  because every red measured 1.2–1.6:1 against an oxblood accent and an error message read
  as a link. **Closes D11 entirely.** The hero got its tapered trunk and three asymmetric
  branches (D27), all clearing the vessel rim — and its taper silently did not render at
  first, because `stroke-width` as an SVG presentation attribute loses to any CSS rule and
  all three branches flattened to 7. Widths are classes now. **`?v=6`.**

- **2026-07-31** — **Found undisclosed analytics; kept it and disclosed it (D24 → R-024),
  and shipped the CSP (D25 → R-025).** Verifying the D23 deploy **in a real browser** — not
  `curl` — surfaced an off-origin request to `static.cloudflareinsights.com`: **Cloudflare
  Web Analytics, live on every page, injected at the edge, in no commit.** `privacy.html`
  at that moment said *"We do not use analytics… of any kind."* **The policy page was
  loading the beacon while denying it.** That is OB-9's failure a second time — a published
  claim checked against the last draft instead of against what the site does — and it also
  falsified my own claim, made an hour earlier, that D23 had left the site with zero
  third-party requests. **The owner chose to keep it**, so the policy now names it,
  describes what it reports, and asserts only what holds: no advertising or social-media
  tracking, no cookies (`document.cookie` empty, verified live). Closes OB-13 **and OB-7**,
  which had been sitting in the backlog asking whether to *add* analytics that was already
  running. **AQ-3 shipped on the back of it.** One identical CSP on all three pages,
  `script-src` hash-based with no `'unsafe-inline'`; `style-src` keeps it deliberately,
  because hashing the inline `<style>` blocks in `privacy.html`/`404.html` means a silently
  unstyled page on every edit. **The detail worth keeping:** the beacon POSTs to
  `/cdn-cgi/rum`, which is **same-origin** — captured by intercepting `navigator.sendBeacon`
  rather than assumed. The documented guess, `cloudflareinsights.com` in `connect-src`,
  would have been wrong and would have widened the policy for nothing. **Third edge
  surprise, each evading the previous check** (D17 caught by reading HTML, D22 by `curl`,
  this one only by a real browser) — so it is now **compiled as R-025** instead of living
  as prose in `SECURITY.md`.

- **2026-07-31** — **AQ-9: fonts self-hosted (D23 → R-023); the page now makes zero
  third-party requests** *(true of this repo's markup; the served page loads the analytics
  beacon — see the entry above).* Four `woff2` (latin + latin-ext per family, ~348 kB) into
  `assets/fonts/` with both SIL OFL licences, `@font-face` at the top of `style.css`, and
  every `fonts.googleapis.com` link and `preconnect` removed. Verified the way that
  matters: **`offOriginRequests: []`** on all three pages — the only cross-origin traffic
  left on this site is a form submission the visitor initiates. **`privacy.html` changed in
  the same commit** and is dated July 31: Google Fonts is no longer a listed processor,
  because R-007 cuts both ways — naming a processor that receives nothing is as wrong as
  omitting one that does. Four processors remain. **The interesting technical bit:** all
  four Inter weights resolved to the *same* upstream URL, i.e. Google serves a variable
  font behind four `@font-face` blocks. Collapsed to one block per subset with
  `font-weight: 400 700` — and then *checked*, because a wrong guess here degrades to
  synthesized fake-bold that looks almost right: rendered widths climb 520.4 → 528.6 →
  536.6 → 544.8px across 400/500/600/700, so the axis is genuinely interpolating. Also
  closed the CLS residue AQ-7 handed over (the two latin files are preloaded; latin-ext
  deliberately is not, since `unicode-range` means most readers never fetch it), and
  shrank AQ-3 to `self` + Formspree.

*(Older entries evicted by the cap — see `git log`. Six went from here: the 2026-07-30
rule-centralization entry, whose durable content is Golden rule 6 in `CLAUDE.md` and the
D-008/D-009 table in `rules/active.md`; the 2026-07-30 OB-9 / email-obfuscation entry, whose
lesson lives in `SECURITY.md` and whose rule is R-019; the 2026-07-30 brand-mark entry
(D18/R-020), whose durable content is the mark bullet in **Now** and D18 itself; the
2026-07-30 nine-change site pass (D19/R-021), whose structural half is the full-viewport
bullet in **Now**; the 2026-07-31 seven-change contact/copy pass (D20/D21), whose outcomes
are the address, contact-section and footer bullets in **Now**; and the 2026-07-31
agent-queue sweep (AQ-1/2/5/7/12), whose outcomes are the skip-link, CLS and referrer
bullets in **Now**. All still current.)*
