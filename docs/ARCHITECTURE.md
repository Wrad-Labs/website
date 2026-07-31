# Architecture & tech reference

Technical structure of the Wrad Labs website. **Memory kind: reference — rewrite
to stay true against the source.** Companion to [`../CLAUDE.md`](../CLAUDE.md)
(governance), [`INDEX.md`](INDEX.md) (the doc map), and
[`../status.md`](../status.md) (current state + backlog).

**Verified against source: 2026-07-31** — tokens, page sections, JS blocks, and the
file tree were checked line-by-line against `style.css`, `index.html`, and
`script.js` on this date. Re-verify and bump this line whenever you edit the doc;
if it disagrees with the source, the doc is wrong.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Markup | Hand-written HTML5 | Single page, `index.html` |
| Styling | Plain CSS, custom properties | One file, `assets/css/style.css` |
| Behavior | Vanilla JS (ES6), no deps | One file, `assets/js/script.js` |
| Fonts | **Self-hosted** (Source Serif 4, Inter) | `assets/fonts/`, `@font-face` at the top of `style.css` (D23/R-023) |
| Hosting | GitHub Pages (Fastly), behind Cloudflare | Deploy from `main`, root folder |
| DNS/domain | See `OPERATIONS.local.md` | Not in tracked docs |

**No build step. No package manager. No backend.** What is in the repo is what
ships. Edit files directly; refresh the browser.

### Stylesheet versioning

Every page links the CSS as **`style.css?v=N`**. That query is a cache-buster, and it has
to be **bumped in all three pages whenever selectors change**.

The reason is a lifetime mismatch, hit in production on 2026-07-30: the HTML is
`max-age=600` but the CSS is `max-age=14400` (Cloudflare's default for static assets), so
for up to four hours a returning visitor holds **new markup against old styles**. Any
release that renames a class then renders unstyled — that day it showed the new hero art
as a solid black shape. Changing the query changes the URL, so the browser fetches the new
CSS immediately instead of waiting out its TTL.

`script.js` is deliberately **not** versioned: under R-008 the page must work with no
JavaScript at all, so a stale copy degrades rather than breaks.

### Crawl surface

Two files, and the gap between them is the point.

**`sitemap.xml` lists what we want found:** `/` and `/privacy.html`. The policy carries a
canonical URL and `index, follow`, so omitting it was an oversight rather than a choice.

**`robots.txt` disallows `/*.md$`.** Every tracked file is served at the live domain (D2)
and there is no build step to hide one (D1), so `/CLAUDE.md`, `/status.md` and
`/decisions.md` all return 200. The rule stops crawlers **fetching** them.

**It does not make them private, and it is not a fix for OB-5.** They stay reachable to
anyone with the URL. A disallowed URL can still be listed by Google if something external
links to it — with no content, since the file is never fetched. That is the ceiling
available here: a `.md` file cannot carry a `<meta name="robots">` tag, and `X-Robots-Tag`
needs response headers we do not control on Pages. OB-5 is therefore a question for the
owner (*accept that these are reachable*), not a task an agent can close.

`*` and `$` are the Google/Bing wildcard extensions, not original robots.txt syntax.
Crawlers that ignore them fall back to `Allow: /` and fetch as before.

**This file is the only source of the site's crawler policy** (D22 / **R-022**).
Cloudflare's AI Crawl Control can *prepend* a managed policy to it — it did, until
2026-07-31 — so a change here can be true in the repo and false on the domain. Both of its
controls are now off. **If the live file ever disagrees with this one again, that is the
cause**, and it is a rule violation rather than a mystery. AI crawlers are allowed here;
the reasoning depends on this site having no user-contributed content, so do not carry it
to a property that does.

## File structure

```
website/
├── index.html            # Entire page: nav, hero, ventures, contact, footer
├── privacy.html          # Privacy policy (indexable)
├── 404.html              # Custom GitHub Pages 404
├── assets/fonts/         # Self-hosted woff2 + SIL OFL licences (D23/R-023)
├── robots.txt            # Crawl directives → sitemap; disallows /*.md$ (see below)
├── sitemap.xml           # Two URLs: / and /privacy.html
├── CNAME                 # GitHub Pages custom domain (www.wradlabs.com)
├── favicon.ico           # Multi-size (16/32/48) legacy tab icon, served from root
├── .nojekyll             # Serve files as-is (no Jekyll processing)
├── .gitignore
├── CLAUDE.md             # Operating manual / governance (PUBLIC)
├── README.md             # Public overview (PUBLIC)
├── SECURITY.md           # Security posture & disclosure (PUBLIC)
├── decisions.md          # Append-only decision log (PUBLIC)
├── status.md             # Current state + the single backlog (PUBLIC)
├── patterns.md           # Capped, expiring work observations (PUBLIC)
├── rules/
│   └── active.md         # Compiled constraints, backlinked to decisions
├── OPERATIONS.local.md   # DNS/email runbook — UNTRACKED, never committed
├── .claude/
│   ├── launch.json       # Local preview config for AI tooling (TRACKED, public)
│   └── settings.local.json  # Personal settings — UNTRACKED (gitignored)
├── docs/
│   ├── INDEX.md          # The doc map / memory-model entry point
│   └── ARCHITECTURE.md   # This file
└── assets/
    ├── css/style.css     # All styles; design tokens at top of file
    ├── js/script.js      # Nav, scroll reveal, hero canvas, contact form
    └── images/           # Brand assets — see below
```

## Brand assets

**Everything in `assets/images/` is a DERIVED COPY.** The
mark's source of truth is `brand/` in the private `company` repo, where the vector
sources and the build script live (**D18 / R-020**). Never edit the artwork here: edit it
there, re-run its build, re-copy. One asset per slot — the point of the set is that no
single file is stretched across four jobs the way the old `logo.png` was.

**Two drawings of the mark exist upstream, and the medium picks between them (C11 /
R-003):** square *raster* icons use `mark-small` — the master's own vial filled solid
with the tendrils clipped, derived from the master rather than redrawn — and everything
else uses the master itself. That is why the favicons and `mark.svg` below are not the same drawing
— it is deliberate, not drift.

| File | Slot | Notes |
| --- | --- | --- |
| `mark.svg` | nav, footer, `privacy.html`, `404.html` | The **master** mark. Referenced by `<img>`, not an inline `<symbol>` — one cached file instead of a 10.6 kB path duplicated into three pages. **512×939: size it by height, never width.** The `<img>` carries the intrinsic `width`/`height` so `width: auto` resolves without layout shift. Vector, so 30px in the nav is 60 device pixels on a 2× display and stays crisp. |
| `favicon.svg` | `<link rel="icon" type="image/svg+xml">` | The **small** mark, theme-adaptive: ink, flipping to paper under `prefers-color-scheme: dark`, so it survives a dark browser chrome. Used **only** here — an asset that changes colour on its own is a liability anywhere else. |
| `favicon-48.png` | PNG favicon fallback | Small mark. For browsers that ignore the SVG icon. |
| `apple-touch-icon.png` | `<link rel="apple-touch-icon">` | Small mark, 180², opaque; iOS applies its own corner mask. |
| `og.png` | `og:image`, `twitter:image` | 1200×630, which is why `twitter:card` is `summary_large_image`. Carries the **horizontal lockup** — mark plus "WRAD LABS" — above a terracotta rule. The wordmark is outlined, so the card needs no font. |
| `icon-512.png` | JSON-LD `Organization.logo` | Small mark, square and opaque, which is what consumers of that field expect. |
| `logo-stacked.svg` | footer lockup | Mark above wordmark as ONE asset, from `company/brand/`. Sized by height; `alt` carries the name. |
| `optants-logo.svg` | the Optants venture tile | **A different upstream:** Optants' own brand, from `Wrad-Labs/optants/brand/`. Same derived-copy rule (R-020) — never edit it here. |

## Design tokens

Defined once in `:root` at the top of `assets/css/style.css`. **Always reference
these; never hardcode** (R-004) — this discipline is locked and independent of
*which* values are chosen. The **palette below is still a working draft** (D11):
provisional pending owner sign-off, so treat this table as "what ships today," not a
fixed identity. The **mark is not** — it was signed off 2026-07-30 and locked by D18.
The mark's ink is restated inside each SVG, because a file cannot read a CSS token — so after D26 they still carry the OLD `#1F2937` against a `#131A21` `--ink`. Correcting that belongs upstream in `company/brand/` (R-020), tracked as OB-14.

Token **names are semantic, not literal** (`--ink`, not `--black`), so a future
palette change means editing the `:root` block and nothing else.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F1F3F5` | Page background (cool stone — deliberately not warm; see D26) |
| `--surface` | `#FFFFFF` | Cards, form inputs |
| `--surface-sunk` | `#E4E8EB` | Optional recessed band |
| `--ink` | `#131A21` | Headings — 15.77:1 on `--bg` |
| `--ink-body` | `#39434C` | Body copy — 9.07:1 |
| `--ink-muted` | `#56616B` | Labels, meta — 5.69:1 |
| `--stone` | `#7C8791` | **Decorative only** — 3.29:1, clears 3:1 for shapes, not 4.5:1 for text |
| `--line` / `--line-strong` | `#D5DBDF` / `#C3CBD1` | Hairlines, input borders |
| `--accent` / `--accent-hover` | `#8C2F39` / `#6E232B` | Oxblood — 7.32:1 as text |
| `--accent-soft` | `#F6E8EA` | Focus ring |
| `--on-accent` | `#FFFFFF` | Text on accent — 8.14:1 |
| `--success` / `--danger` | `#14713A` / `#CC3311` | Form feedback only. `--danger` is a **vermillion**: a dark red cannot be told from an oxblood accent by lightness (1.2–1.6:1), so hue does the work |
| `--nav-scrim` | `rgba(241,243,245,.88)` | Scrolled nav backdrop; keep in step with `--bg` |
| `--arch` / `--botanical` | `#DAE1E7` / `#C5CFD6` | Hero decorative SVG. Chosen to hold the same weight on the new ground as the warm pair held on the old |
| `--nav-h` | `72px` | Height of the fixed nav. Sections reserve it; also drives `scroll-padding-top` |
| `--font-display` | Source Serif 4 | Headings |
| `--font-body` | Inter | Body, nav, buttons, wordmark |
| `--container` | `1160px` | Max content width |
| `--radius` / `--radius-lg` | `6px` / `14px` | Controls / cards |
| `--ease` | `cubic-bezier(0.16,1,0.3,1)` | Standard easing |

Every ink/accent pair above was measured against its background and passes WCAG AA
for normal text. `--stone` is deliberately **not** an ink token for that reason.

The **palette is LOCKED** as of 2026-07-31 (D26 / **R-026**) — it is no longer the draft
D11 left open, and **D11 is now fully closed**, its mark half having been locked by D18 a
day earlier. Changing it means superseding D26, not proposing a variation.

**It is cool on purpose.** Optants ships a `#FAFAF8` ground and the same body typeface, so
the two sites read as one company's single site. The *ground* was the cause; the accents
never were — terracotta against Optants' teal `#115E59` was already a clean split. Do not
warm the neutrals back up.

**A palette change does not stop at this file.** The mark's ink is restated inside the
SVGs, because a file cannot read a CSS token — so `assets/images/*.svg` still carry the
*old* `#1F2937`. Fixing that belongs in `company/brand/` (R-020), tracked as **OB-14**.

## Metadata surface (`index.html` `<head>`)

Roughly a dozen lines that no reference doc described until now — which is how the
retired tagline once survived in four of them after the visible copy changed. **When
positioning copy changes, these change with it**; they are the same claim in machine-
readable form, and a stale one contradicts the page.

| Block | What it feeds | Notes |
|---|---|---|
| `<title>`, `<meta name="description">` | Search results | Must match the live headline and sub |
| `<link rel="canonical">` | Duplicate resolution | Absolute `https://www.` — the `www` host is the canonical one |
| `og:*` (`type`, `site_name`, `title`, `description`, `url`, `image`, `image:width/height`, `image:alt`) | Facebook, LinkedIn, Slack, iMessage | `og.png` is 1200×630; the explicit dimensions let a scraper reserve space before fetching |
| `twitter:card`, `twitter:title/description/image` | X | `summary_large_image`, valid only because a real 1200×630 card exists (D18) |
| JSON-LD `Organization` | Google knowledge panel | `name`, `url`, `logo` → `icon-512.png` (square, per schema.org), `email`, `description` |
| `<link rel="apple-touch-icon">` | iOS home screen | 180×180 PNG; iOS ignores SVG favicons |
| `<meta name="referrer">` | Outbound requests | `strict-origin-when-cross-origin` — since D23 the only cross-origin destination is Formspree, on submit |
| `<meta name="robots">` | Crawlers | Only on the other two pages: `index, follow` on `privacy.html`, `noindex` on `404.html`. `index.html` carries none, which *is* the default |

**Two traps.** The JSON-LD `logo` wants a **square** image, so it points at
`icon-512.png` and not at `mark.svg`, which is 512×939 (R-020). And **social platforms
cache the share card against the URL** — replacing `og.png` does not update what they
serve, which needs a manual re-scrape per platform (OB-10).

## Accessibility affordances

Beyond R-010's markup baseline, three things are easy to break by accident:

- **Skip link.** First tab stop on every page, jumping to `#main`. Parked at
  `left: -9999px` rather than `display: none` — **a hidden element cannot take focus**, so
  a display-hidden skip link never returns. It moves with `left`, not `transform`, so it
  is unaffected by `prefers-reduced-motion`.
- **The Optants tile is one `<a>`** wrapping the whole card: one tab stop, one hit target.
  Nesting a second interactive element inside it would break that (D19).
- **`prefers-reduced-motion`** disables the scroll-reveal transition; the `.reveal`
  default state is *visible*, so with JS off or motion reduced the content simply shows.

## Layout stability

**Measured CLS is 0.** There is no hero *image* — the hero art is an inline `<svg>` in
`index.html`, so it costs no request and reserves its own space. All three `<img>`
elements (`mark.svg`, `optants-logo.svg`, `logo-stacked.svg`) carry intrinsic
`width`/`height`, so `width: auto` and `height`-based sizing resolve without reflow.

Font swap was the one remaining theoretical source, and **D23 closed it**: the fonts come
from this origin, and the two `latin` files are preloaded in `<head>`. `font-display: swap`
is still declared, so a fallback can still paint on a cold cache — the preload is what
makes that window small rather than a network round-trip wide.

### Fonts

Four `woff2` files in `assets/fonts/`, ~348 kB total, plus both SIL OFL licences.
**Derived copies** — same rule as `assets/images/` (R-020's principle, different upstream).
To update, re-fetch the `css2` URL recorded in the CSS comment with a modern browser UA and
replace the files; never hand-edit a binary.

Two things about the shape of it:

- **One variable file per subset, not one per weight.** Google served four `@font-face`
  blocks per subset that all resolved to the *same* URL — that is how a variable font is
  delivered. Collapsed here into one block per subset declaring `font-weight: 400 700`.
- **`unicode-range` is load-bearing.** `latin` and `latin-ext` are both committed, but a
  reader who never encounters a Central European character never downloads latin-ext. That
  is why only the two `latin` files are preloaded, and why carrying both subsets costs repo
  size but not page weight.

## Page sections (in order)

`#home` (hero: left-aligned copy + decorative SVG — the brand mark under a canopy,
which replaced the arch on 2026-07-30; its vessel, liquid and root tendrils are
extracted from `brand/mark.svg` upstream rather than drawn here) → `#ventures` (two-card
grid; the Optants tile is a whole-card link to optants.com) → `#contact` (invitation,
with the direct address as its closing line, then the Formspree form). Footer follows —
lockup and copyright only. `privacy.html` is a separate page. Sections are separated by a
`--line` hairline (`section + section`).

**The hero art is centred in the whitespace beside the text column** (D21), not pinned to
the container edge: `left: var(--hero-col); right: 0; margin-inline: auto`. An absolutely
positioned replaced element resolves its width from the aspect ratio first, then the two
auto margins split what is left. **The two offsets are a pair** — overriding one at a
breakpoint and leaving the other re-pins the art to an edge, which is what the old
`right: -20px` in the 1080px query did.

**Each section is a full-viewport page** (D19 / **R-021**): `min-height: 100svh`, content
centred in the space below the fixed nav, which is reserved by `--nav-h`.

- **`min-height`, never `height`.** A section must be able to grow past the viewport
  when its content does not fit — the contact form is taller than a short laptop, and
  fixing the height would clip it rather than scroll it.
- `100svh` (small viewport height) is used over `100vh` so mobile sections don't jump as
  the browser bar collapses; `100vh` stays as the preceding fallback declaration.
- A `max-height: 620px` query drops the full-viewport rule entirely, below roughly a
  landscape phone, where forcing a viewport height only guarantees an overflow.
- `html { scroll-padding-top: var(--nav-h) }` keeps anchor jumps clear of the fixed bar.
- The footer is **not** a section and is deliberately not full-viewport: it trails the
  contact page rather than becoming a fourth one.

## JavaScript blocks (`assets/js/script.js`)

All plain DOM, no framework. **Three** independent blocks:

1. **Nav** — adds `.solid` to the header past 40px scroll; mobile hamburger toggle.
2. **Scroll reveal** — `IntersectionObserver` adds `.in-view` to `.reveal` elements once.
3. **Contact form** — submits to Formspree via `fetch` with inline success/error
   messaging; native POST fallback with JS off. Not a placeholder (see D4 in
   [`../decisions.md`](../decisions.md)).

> A dead guard in block 3 still checks `form.action` for `'YOUR_FORM_ID'` — a
> leftover from the placeholder era, unreachable now. Slated for removal (AQ-1 in
> [`../status.md`](../status.md)).

The former hero particle canvas was removed with the 2026-07-29 redesign; the hero
art is now a static, `aria-hidden` inline SVG with no scripting.

### The `html.js` gate

`index.html` adds `class="js"` to `<html>` via a small inline `<script>` in `<head>`.
`.reveal` defaults to **visible**, and only `html.js .reveal` starts hidden — so with
JavaScript disabled the page renders fully instead of blank (R-008). Before this gate
existed, `.reveal { opacity: 0 }` applied unconditionally and a no-JS visitor saw an
empty page. Keep the default-visible direction if you touch the reveal CSS.

> Note for AQ-3 (`Content-Security-Policy` meta): that inline script needs a hash or
> `'unsafe-inline'`, or it must move into a file — in which case the reveal state has
> to stay default-visible to avoid reintroducing the blank-page bug.

## Conventions

- **Progressive enhancement:** the page must be readable and navigable with JS
  off. JS only enhances (animation, reveal, mobile menu).
- **Accessibility:** decorative elements use `aria-hidden`; interactive controls
  carry `aria-label`/`aria-expanded`; form inputs have `<label>`s.
- **Responsiveness:** mobile-first; verify at ~375px and ~1280px.
- **Browser support:** modern evergreen browsers (uses `IntersectionObserver`,
  `matchMedia`, canvas, CSS custom properties).

## Local preview

Two equivalent ways to serve the folder — both are static file servers, and neither
is a build step (R-001 is about what *ships*, and nothing here produces a deploy
artifact):

- `python -m http.server 8000` — the documented default ([`../CLAUDE.md`](../CLAUDE.md) §6).
- `.claude/launch.json` — used by AI tooling that starts the preview itself; it runs
  `npx --yes http-server -p 8000 -c-1` (`-c-1` disables caching, which `python
  -m http.server` also effectively does). This file is **tracked and therefore
  public** (R-003); it holds nothing sensitive, and should stay that way.

Opening `index.html` directly also works, but relative-root paths (`/assets/...`)
resolve only when served.

## Deploy

Push/merge to `main` → GitHub Pages rebuilds (~1–2 min) → served through
**Cloudflare → Fastly** (`Cache-Control: max-age=600`). No CI, no tests, no
artifact — the repo *is* the deploy.

Two caches sit in front of a change, so when verifying on the live domain, expect
a stale response for a minute or two even after Pages reports `built`. A
cache-busting query string (`?v=$(date +%s)`) is the quickest way past them;
`gh api repos/Wrad-Labs/website/pages/builds/latest` confirms the build itself.
Cloudflare also terminates TLS and sends HSTS — see [`../SECURITY.md`](../SECURITY.md).
