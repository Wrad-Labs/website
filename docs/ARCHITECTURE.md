# Architecture & tech reference

Technical structure of the Wrad Labs website. **Memory kind: reference — rewrite
to stay true against the source.** Companion to [`../CLAUDE.md`](../CLAUDE.md)
(governance), [`INDEX.md`](INDEX.md) (the doc map), and
[`../status.md`](../status.md) (current state + backlog).

**Verified against source: 2026-07-27** — tokens, page sections, JS blocks, and the
file tree were checked line-by-line against `style.css`, `index.html`, and
`script.js` on this date. Re-verify and bump this line whenever you edit the doc;
if it disagrees with the source, the doc is wrong.

## Stack

| Layer | Choice | Notes |
|---|---|---|
| Markup | Hand-written HTML5 | Single page, `index.html` |
| Styling | Plain CSS, custom properties | One file, `assets/css/style.css` |
| Behavior | Vanilla JS (ES6), no deps | One file, `assets/js/script.js` |
| Fonts | Google Fonts (Space Grotesk, Inter) | External `<link>` in `<head>` |
| Hosting | GitHub Pages, served via Fastly | Deploy from `main`, root folder |
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
    └── images/           # logo.png, tree-backdrop.png, favicon.svg
```

## Design tokens

Defined once in `:root` at the top of `assets/css/style.css`. **Always reference
these; never hardcode** (R-004) — this discipline is locked and independent of
*which* values are chosen. The **values themselves are a working draft** (D11): the
palette and brand metaphor below are provisional pending owner sign-off, so treat
this table as "what ships today," not a fixed identity.

| Token | Value | Use |
|---|---|---|
| `--bg` | `#0F172A` | Page background (deep navy) |
| `--bg-raised` | `#131c34` | Raised surfaces / cards |
| `--green` | `#34C759` | Canopy / accent (impact) |
| `--blue` | `#246BCE` | Roots / accent (commercial) |
| `--white` | `#FFFFFF` | Headings |
| `--light-gray` | `#F8FAFC` | Body text on dark |
| `--medium-gray` | `#94A3B8` | Muted text |
| `--border` | `rgba(148,163,184,0.14)` | Hairlines |
| `--font-display` | Space Grotesk | Headings, eyebrows |
| `--font-body` | Inter | Body copy |
| `--container` | `1160px` | Max content width |
| `--ease` | `cubic-bezier(0.16,1,0.3,1)` | Standard easing |

The blue→green gradient currently encodes the brand metaphor: **roots (blue) →
canopy (green)**. This semantic is a **draft** (D11), not a locked rule — it's the
present direction, but the palette and logo are open to revision until the owner
locks a final identity. Changing them is a normal Tier-2 proposal.

## Page sections (in order)

`#home` (hero + particle canvas) → `#ventures` (two-card grid) → `#contact`
(Formspree form). Footer follows. `privacy.html` is a separate page.

## JavaScript blocks (`assets/js/script.js`)

All plain DOM, no framework. Four independent blocks:

1. **Nav** — adds `.solid` to the header past 40px scroll; mobile hamburger toggle.
2. **Scroll reveal** — `IntersectionObserver` adds `.in-view` to `.reveal` elements once.
3. **Hero canvas** — drifting "circuit" particle field with connecting lines;
   honors `prefers-reduced-motion` (renders one static frame instead of animating).
4. **Contact form** — submits to Formspree via `fetch` with inline success/error
   messaging; native POST fallback with JS off. Not a placeholder (see D4 in
   [`../decisions.md`](../decisions.md)).

> A dead guard in block 4 still checks `form.action` for `'YOUR_FORM_ID'` — a
> leftover from the placeholder era, unreachable now. Slated for removal (AQ-1 in
> [`../status.md`](../status.md)).

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

Push/merge to `main` → GitHub Pages rebuilds (~1–2 min) → live behind Fastly
CDN (`Cache-Control: max-age=600`, so hard-refresh when verifying). No CI, no
tests, no artifact — the repo *is* the deploy.
