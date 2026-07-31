# Architecture & tech reference

Technical structure of the Wrad Labs website. **Memory kind: reference — rewrite
to stay true against the source.** Companion to [`../CLAUDE.md`](../CLAUDE.md)
(governance), [`INDEX.md`](INDEX.md) (the doc map), and
[`../status.md`](../status.md) (current state + backlog).

**Verified against source: 2026-07-29** — tokens, page sections, JS blocks, and the
file tree were checked line-by-line against `style.css`, `index.html`, and
`script.js` on this date. Re-verify and bump this line whenever you edit the doc;
if it disagrees with the source, the doc is wrong.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Markup | Hand-written HTML5 | Single page, `index.html` |
| Styling | Plain CSS, custom properties | One file, `assets/css/style.css` |
| Behavior | Vanilla JS (ES6), no deps | One file, `assets/js/script.js` |
| Fonts | Google Fonts (Source Serif 4, Inter) | External `<link>` in `<head>` |
| Hosting | GitHub Pages (Fastly), behind Cloudflare | Deploy from `main`, root folder |
| DNS/domain | See `OPERATIONS.local.md` | Not in tracked docs |

**No build step. No package manager. No backend.** What is in the repo is what
ships. Edit files directly; refresh the browser.

## File structure

```
website/
├── index.html            # Entire page: nav, hero, ventures, contact, footer
├── privacy.html          # Privacy policy (indexable)
├── 404.html              # Custom GitHub Pages 404
├── robots.txt            # Crawl directives → sitemap
├── sitemap.xml           # Single-URL sitemap
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

**Everything in `assets/images/` (except `tree-backdrop.png`) is a DERIVED COPY.** The
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
| `tree-backdrop.png` | *nothing* | 2 MB left over from the pre-2026-07-29 design. Referenced by no HTML, CSS or JS — pending deletion (AQ-13). |

## Design tokens

Defined once in `:root` at the top of `assets/css/style.css`. **Always reference
these; never hardcode** (R-004) — this discipline is locked and independent of
*which* values are chosen. The **palette below is still a working draft** (D11):
provisional pending owner sign-off, so treat this table as "what ships today," not a
fixed identity. The **mark is not** — it was signed off 2026-07-30 and locked by D18.
The mark's ink is `--ink` `#1F2937`, restated inside the SVG because a file cannot read
a CSS token; a palette change means changing it in the `company` repo too.

Token **names are semantic, not literal** (`--ink`, not `--black`), so a future
palette change means editing the `:root` block and nothing else.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#F9F7F3` | Page background (warm off-white) |
| `--surface` | `#FFFFFF` | Cards, form inputs |
| `--surface-sunk` | `#F3F1EC` | Optional recessed band |
| `--ink` | `#1F2937` | Headings — 13.7:1 on `--bg` |
| `--ink-body` | `#44403C` | Body copy — 9.6:1 |
| `--ink-muted` | `#57534E` | Labels, meta — 7.1:1 |
| `--stone` | `#78716C` | **Decorative only** — 4.5:1, borderline for small text |
| `--line` / `--line-strong` | `#E7E5E4` / `#D6D3D1` | Hairlines, input borders |
| `--accent` / `--accent-hover` | `#C2410C` / `#9A3412` | Terracotta — 4.8:1 as text |
| `--accent-soft` | `#FBEDE7` | Focus ring |
| `--on-accent` | `#FFFFFF` | Text on accent — 5.2:1 |
| `--success` / `--danger` | `#15803D` / `#B91C1C` | Form feedback only |
| `--nav-scrim` | `rgba(249,247,243,.88)` | Scrolled nav backdrop; keep in step with `--bg` |
| `--arch` / `--botanical` | `#E5DED2` / `#D8D0C2` | Hero decorative SVG |
| `--font-display` | Source Serif 4 | Headings |
| `--font-body` | Inter | Body, nav, buttons, wordmark |
| `--container` | `1160px` | Max content width |
| `--radius` / `--radius-lg` | `6px` / `14px` | Controls / cards |
| `--ease` | `cubic-bezier(0.16,1,0.3,1)` | Standard easing |

Every ink/accent pair above was measured against its background and passes WCAG AA
for normal text. `--stone` is deliberately **not** an ink token for that reason.

The palette and the brand mark remain an explicit **draft** (D11), not a locked
rule — the current warm-neutral/terracotta direction is what ships today, and a
further change is a normal Tier-2 proposal, not a decision violation. **No decision
locks the logo**; the mark in the SVG sprite is a placeholder pending a new identity.

## Page sections (in order)

`#home` (hero: left-aligned copy + decorative arch SVG) → `#ventures` (two-card
grid) → `#contact` (Formspree form). Footer follows. `privacy.html` is a separate
page. Sections are separated by a `--line` hairline (`section + section`).

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
