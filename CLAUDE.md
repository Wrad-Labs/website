# CLAUDE.md — Wrad Labs website operating manual

Operating manual for AI assistants (and humans) working on the **Wrad Labs**
marketing site — **www.wradlabs.com**. This project is **completely separate**
from the Optants product (repo `Wrad-Labs/optants`) and from the private company
repo (`Wrad-Labs/company`): different repos, folders, and rules. Do not import
their docs, guardrails, or context. The one thing shared across all Wrad Labs
repos is the Owner Operating Model — see below.

> This file is **committed to a public repo and served at the live domain**
> (`/CLAUDE.md` returns 200). Treat everything here as public. Sensitive
> operational detail (DNS records, registrar, email) lives in the **untracked**
> `OPERATIONS.local.md`, never in a tracked file.

## 1. What this is

A single-page static corporate site. **No build step, no framework, no backend** —
plain HTML/CSS/JS hosted on **GitHub Pages**, deployed from `main`.

> "Wrad" is an ancient word meaning "root." Like a tree's roots, Wrad Labs
> provides the foundation from which commercial ventures grow.

Deeper references:
- **Doc map / where everything lives:** [`docs/INDEX.md`](docs/INDEX.md)
- **Tech / structure:** [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)
- **Current state + backlog:** [`status.md`](status.md)
- **Why things are the way they are:** [`decisions.md`](decisions.md)
- **Active constraints (compiled):** [`rules/active.md`](rules/active.md)
- **Security posture:** [`SECURITY.md`](SECURITY.md)
- **Ops runbook (local only):** `OPERATIONS.local.md`

## Owner Operating Model (cross-project)

The owner's collaboration preferences are **canonical in one place** — the private
repo **[`Wrad-Labs/owner-operating-model`](https://github.com/Wrad-Labs/owner-operating-model)**
(`owner.md`) — and referenced, never copied, by every Wrad Labs repo. Before making
implementation or collaboration-style decisions, read it there.

- It is **owner-authored and read-only to agents.** Never create a local `owner.md`
  copy in this repo, and never edit the canonical one directly — propose changes in
  conversation. (D10 / R-015.)
- This **public** repo references the model **by URL only** — it deliberately does
  *not* embed it as a git submodule (that would expose the private repo and risk
  Pages serving it). The private Optants and company repos may submodule it instead.

## 2. Golden rules (never violate)

1. **No secrets in the repo — it is public.** No API keys, tokens, private
   endpoints, personal data, or internal infra detail in any tracked file.
2. **Keep it static.** No backend, no server-side code, no build pipeline that
   introduces secrets. Third-party form/analytics services are integrated
   client-side only.
3. **Do not touch DNS or email records** without explicit human sign-off. The
   `CNAME` file, apex/`www` records, and all email records (MX / SPF / DKIM /
   DMARC / verification TXT) keep the domain and Google Workspace email alive.
   Details are in `OPERATIONS.local.md`.
4. **No unlicensed imagery of real people or brand logos.** Concepts, objects,
   and illustrations are fine; real people/brands need owned or licensed assets.
5. **Never collect user data the privacy policy doesn't describe.** The contact
   form is live (Formspree, client-side) and `privacy.html` is published — so any
   new field or processor must be reflected there before it ships. See
   [`status.md`](status.md) (OB-1) and R-007 in [`rules/active.md`](rules/active.md).

## 3. Scope of decisions & authority

Every change falls into one of three tiers. When unsure, escalate up a tier.

### 🟢 Tier 1 — Autonomous (just do it, then summarize)
Reversible, content/presentation-only, no infra or data impact:
- Copy edits, typo fixes, tightening existing wording.
- CSS/styling tweaks within the existing token system.
- Accessibility & SEO improvements to markup (alt text, aria, meta tags,
  `robots.txt`, `sitemap.xml`, `404.html`, JSON-LD).
- Refactors of `assets/js/script.js` that preserve behavior.
- Documentation under `docs/`.

### 🟡 Tier 2 — Propose first (branch + PR + human approval before merge)
Changes visitor-facing behavior, adds dependencies, or is hard to eyeball:
- New sections, page restructures, or navigation changes.
- Adding any third-party service (forms, analytics, fonts, embeds) — note the
  privacy/exposure implication in the PR.
- New pages (privacy policy, terms, product pages).
- Design-token / brand changes (colors, fonts, spacing scale).
- Anything that collects or transmits user data.

### 🔴 Tier 3 — Human-only (never do autonomously; execute only on explicit request)
Irreversible, outward-facing, or infra/legal:
- **DNS or email record changes** at the registrar (see Golden Rule 3).
- Editing/removing `CNAME`, changing the custom domain, or Pages settings.
- Registering domains, creating accounts, or signing up for paid services.
- Publishing legal text (privacy/terms) as final — draft yes, publish no.
- Force-pushing, rewriting history, or deleting branches.
- Anything that spends money or makes a public commitment on the company's behalf.

## 4. SDLC / workflow

`main` is the **production branch — every push to it redeploys the live site.**
There is no staging environment. Therefore:

1. **Branch.** Never commit Tier-2/Tier-3 work directly to `main`. Use a short
   branch: `feat/…`, `fix/…`, `docs/…`, `chore/…`.
2. **Change.** Keep commits small and focused. Match existing code style
   (see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md)).
3. **Verify locally.** `python -m http.server 8000` and check the affected
   sections at mobile + desktop widths; confirm no console errors.
4. **Self-review.** Run `/code-review` on the diff before opening a PR.
5. **PR.** Open a pull request describing *what* and *why*; call out any
   exposure/privacy/dependency impact. Tier-1 doc/copy fixes may go straight to
   `main` at the author's discretion.
6. **Human approval** for Tier 2/3, then merge.
7. **Deploy = merge to `main`.** Allow 1–2 min for Pages to rebuild, then
   verify on the live URL (hard-refresh; `Cache-Control: max-age=600`).
8. **Commit hygiene.** Commit/push **only when the user asks.** End commit
   messages with the required `Co-Authored-By` trailer.

## 5. Coding standards

- **HTML:** semantic, accessible (labels, aria, alt). One `<h1>`; logical
  heading order. Keep the single-page structure unless a Tier-2 decision changes it.
- **CSS:** all styles in `assets/css/style.css`. Use the design tokens at the
  top of the file — **do not hardcode colors/fonts**. Mobile-first; test the
  responsive breakpoints.
- **JS:** vanilla, no dependencies. Progressive enhancement — the site must read
  and function with JS disabled. Respect `prefers-reduced-motion` (already wired).
- **Assets:** optimize images before committing. No real people/brand logos
  (Golden Rule 4).
- **Performance:** no render-blocking additions; keep the page lightweight.

## 6. Local preview

Open `index.html` directly, or serve the folder:

```
python -m http.server 8000
```

AI tooling may instead start the preview from the tracked `.claude/launch.json`,
which serves the same folder via `npx http-server` on the same port. Both are plain
static file servers — see [`docs/ARCHITECTURE.md`](docs/ARCHITECTURE.md) § Local
preview.

## 7. Memory model

This repo runs on **docs-as-memory**: the documents are the memory, the chat is
scratch. An undocumented change didn't happen. The **canonical definition** of this
model lives in one place — `Wrad-Labs/company/docs-as-memory.md` (private repo) — and
is referenced, never restated (**D13 / R-016**). What follows is the short
operational summary for working here; the full method is there. If this summary ever
disagrees with the canonical file, the canonical file wins.

Four memory kinds, kept physically separate — full map in
[`docs/INDEX.md`](docs/INDEX.md):

- **reference** (`README.md`, `SECURITY.md`, `docs/*`) — what is true *now*;
  rewrite freely to keep it true.
- **decisions** ([`decisions.md`](decisions.md)) — *why*; append-only.
- **rules** ([`rules/active.md`](rules/active.md)) — current hard constraints;
  *compiled* from locked decisions, never hand-authored. Behavioral/design only —
  process rules stay in this file (§3–§4).
- **status** ([`status.md`](status.md)) — where we are now, and the **single**
  backlog; overwrite constantly. Its session history is capped at 5 entries
  (R-017) — `git log` is the real history.

Plus [`patterns.md`](patterns.md) (capped, expiring observations).

**The loop, every time you work:**

1. **Read** the doc that owns the area before building (start cold →
   `status.md` → `rules/active.md` → the one reference doc that owns it).
2. **Flag** before writing anything that contradicts a locked decision — don't
   just do it.
3. **Update** the affected doc(s) *and* `status.md` in the **same commit** as the
   work. If that commit locks or supersedes a decision, **recompile
   `rules/active.md`** in the same commit.
4. **Close** with a readout that is a *view* of the backlog in `status.md`, never
   a second list.

**Governing rule:** an undocumented change didn't happen.
