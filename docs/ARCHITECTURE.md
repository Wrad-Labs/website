# Architecture & tech reference

Technical structure of the Wrad Labs website. Companion to
[`../CLAUDE.md`](../CLAUDE.md) (governance) and
[`WORKPLAN.md`](WORKPLAN.md) (backlog).

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
├── index.html            # Entire page: nav, hero, vision, model, build,
│                         #   principles, closing, contact, footer
├── CNAME                 # GitHub Pages custom domain (www.wradlabs.com)
├── .nojekyll             # Serve files as-is (no Jekyll processing)
├── .gitignore
├── CLAUDE.md             # Operating manual / governance (PUBLIC)
├── README.md             # Public overview (PUBLIC)
├── SECURITY.md           # Security posture & disclosure (PUBLIC)
├── OPERATIONS.local.md   # DNS/email runbook — UNTRACKED, never committed
├── docs/
│   ├── ARCHITECTURE.md   # This file
│   └── WORKPLAN.md       # Prioritized improvement backlog
└── assets/
    ├── css/style.css     # All styles; design tokens at top of file
    ├── js/script.js      # Nav, scroll reveal, tree-stage sync, hero canvas
    └── images/           # logo.png, tree-backdrop.png
```

## Design tokens

Defined once in `:root` at the top of `assets/css/style.css`. **Always reference
these; never hardcode.**

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

The blue→green gradient encodes the brand metaphor: **roots (blue) → canopy
(green)**. Keep that semantic when adding accent color.

## Page sections (in order)

`#home` (hero + canvas) → `#vision` → `#model` (the Wrad tree, 3 stages) →
`#build` (card grid) → `#principles` → closing statement → `#contact` (form).

## JavaScript modules (`assets/js/script.js`)

All plain DOM, no framework. Four independent blocks:

1. **Nav** — adds `.solid` to the header past 40px scroll; mobile hamburger toggle.
2. **Scroll reveal** — `IntersectionObserver` adds `.in-view` to `.reveal` elements once.
3. **Wrad model sync** — `IntersectionObserver` on `.model-block` swaps
   `.stage-roots/trunk/canopy` on the tree visual as each block scrolls into view.
4. **Hero canvas** — drifting "circuit" particle field with connecting lines;
   honors `prefers-reduced-motion` (renders one static frame instead of animating).
5. **Contact form** — `submit` handler is a **placeholder**; it `preventDefault`s
   and shows a note. No network call. See [`WORKPLAN.md`](WORKPLAN.md) P0.

## Conventions

- **Progressive enhancement:** the page must be readable and navigable with JS
  off. JS only enhances (animation, reveal, mobile menu).
- **Accessibility:** decorative elements use `aria-hidden`; interactive controls
  carry `aria-label`/`aria-expanded`; form inputs have `<label>`s.
- **Responsiveness:** mobile-first; verify at ~375px and ~1280px.
- **Browser support:** modern evergreen browsers (uses `IntersectionObserver`,
  `matchMedia`, canvas, CSS custom properties).

## Deploy

Push/merge to `main` → GitHub Pages rebuilds (~1–2 min) → live behind Fastly
CDN (`Cache-Control: max-age=600`, so hard-refresh when verifying). No CI, no
tests, no artifact — the repo *is* the deploy.
