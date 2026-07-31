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
- **Icons and share card, one asset per slot.** `favicon.svg` (theme-adaptive: ink,
  flipping to paper in dark browser chrome — **but see OB-14: that flip misfires under a
  custom browser theme**), `favicon-48.png`, a real multi-size
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
| OB-14 | **Re-sync the brand assets to Canopy, and ship the grounded favicon — both upstream in `company/brand/`.** Two things, one root cause. **(a) Palette drift:** every derived SVG here bakes the *old* ink `#1F2937` and paper `#F9F7F3` (`mark.svg`, `logo-stacked.svg`, `favicon.svg`), and `og.png` bakes terracotta `#C2410C`. After D28 the nav mark renders `#1F2937` beside `#1E2318` headings — breaking `brand/README.md`’s own stated promise that the mark sits in the same ink as the headings beside it. It is 14 SVGs plus `build.mjs` plus the README, then a rerun of the export script. **Deliberately not started until the palette settled** — it moved twice on 2026-07-31 (D26 → D28), and re-cutting every raster against a value that then changes is the waste this entry exists to avoid. **(b) Favicon ground:** the adaptive favicon follows `prefers-color-scheme`, which does **not** track the tab-strip colour — under a custom browser theme it paints the paper glyph onto a light strip and vanishes (owner screenshot, 2026-07-31). **Already built upstream** as `mark-small-tile.svg` (paper tile, ink glyph) and `mark-small-tile-dark.svg`, merged in [company#5](https://github.com/Wrad-Labs/company/pull/5) — the owner still picks which ships. **Both must originate in `company/brand/` (R-020) — never edit the artwork here** — then `tools/build.mjs` regenerates `exports/`, and the copies land here through review. **Do this before OB-10:** `og.png` still carries the terracotta rule, so re-scraping the social caches now would publish a stale card and need doing twice. | 🔴 3 |
| OB-10 | **Force the social platforms to re-scrape the share card.** The new `og.png` is live and correct, but each platform caches the *old* image against the URL and will keep serving it — nothing in this repo can clear those caches, and they need a signed-in account. **LinkedIn:** open `https://www.linkedin.com/post-inspector/`, paste `https://www.wradlabs.com/`, click **Inspect** — it refetches on every run. **Facebook/Meta:** `https://developers.facebook.com/tools/debug/`, paste the URL, click **Scrape Again**. **X/Twitter:** no public validator remains; it refreshes on its own within about a week. **Verify:** each tool previews the card it now holds — you want the flask on off-white with a terracotta rule, not the old tree glyph. **Reverse:** nothing to undo; re-scraping only re-reads what the site already serves. | 🔴 3 |

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

- **2026-07-31** — **Swept the agent queue: five of seven closed, two escalated.** AQ-1
  (dead `YOUR_FORM_ID` guard), AQ-2 (`referrer` meta on all three pages), AQ-5 (skip link),
  AQ-7 and AQ-12 (metadata/a11y/CLS docs). **Two of the five did not survive contact with
  a browser as written, which is the useful part.** *AQ-5* was written as "add a skip
  link"; the naive version passed inspection and failed twice under test — `position:
  absolute` put it above the viewport at any scroll offset (caught rendering at viewport
  top −141 at scrollY 151, and re-entering a scrolled page is precisely when a keyboard
  user wants it), and without `tabindex="-1"` on `<main>` the browser moved the scroll but
  left focus on `BODY`, so the next Tab went back into the nav and the link skipped
  nothing. Now verified the real way: one Tab, one Enter, 4 nav stops skipped, next stop
  *"Explore our ventures"*. *AQ-7* asked to preload the hero image to cut layout shift —
  **there is no hero image**; it is an inline `<svg>`, every `<img>` carries intrinsic
  dimensions, and measured **CLS is 0**. Closed as obsolete rather than implemented, with
  its real residue (font swap) folded into AQ-9. **A backlog item can rot into describing a
  page that no longer exists** — check the premise before building the fix. AQ-3 and AQ-9
  stay open and are now sequenced: AQ-9 first, because self-hosting removes two origins
  from the CSP AQ-3 has to write, and writing it first means writing it twice.

*(Older entries evicted by the cap — see `git log`. Five went from here: the 2026-07-30
rule-centralization entry, whose durable content is Golden rule 6 in `CLAUDE.md` and the
D-008/D-009 table in `rules/active.md`; the 2026-07-30 OB-9 / email-obfuscation entry, whose
lesson lives in `SECURITY.md` and whose rule is R-019; the 2026-07-30 brand-mark entry
(D18/R-020), whose durable content is the mark bullet in **Now** and D18 itself; the
2026-07-30 nine-change site pass (D19/R-021), whose structural half is the full-viewport
bullet in **Now**; and the 2026-07-31 seven-change contact/copy pass (D20/D21), whose
outcomes are the address, contact-section and footer bullets in **Now**. All still
current.)*
