# Decision log — Wrad Labs website

**Memory kind: decisions — APPEND-ONLY.** This file records *why* things are the
way they are. Never rewrite a past entry. The only permitted edit to an existing
entry is flipping its **Status** to `superseded` and adding a pointer to the entry
that replaced it. Superseding is always a **new** entry.

Scope: **this repository only** — the public marketing site at www.wradlabs.com.
Company, financial, and product decisions live in the private `company`
repo (see [D8](#d8--company-financial-and-product-memory-lives-in-a-separate-private-repo)).

**Format.** Each entry: stable ID · title · date · status (`proposed` |
`locked` | `superseded`) · Context · Decision · **Rules out** (what this
forecloses) · Compiled rules (the IDs it produced in
[`rules/active.md`](rules/active.md)).

When a decision **locks** or is **superseded**, `rules/active.md` is recompiled in
the *same commit*.

---

## D1 — Static single-page site on GitHub Pages, no build step, no backend

- **Date:** 2026-07-04
- **Status:** locked
- **Source:** `CLAUDE.md` §1, `docs/ARCHITECTURE.md`

**Context.** A one-person company needed a corporate presence at
www.wradlabs.com quickly and at zero running cost. The site is marketing copy and
a contact route — it has no accounts, no sessions, and no data to persist.

**Decision.** Hand-written HTML/CSS/vanilla JS, served by GitHub Pages from the
root of `main`. No framework, no package manager, no build pipeline, no
server-side code. What is committed is what ships.

**Rules out.** A JS framework or SSG (React, Next, Astro, Jekyll, Hugo); a
`package.json` or `node_modules`; a CI build producing a deploy artifact; any
server-side rendering, API route, or database; any feature that cannot work as
static files behind a CDN.

**Compiled rules:** R-001, R-002.

---

## D2 — Public repository; sensitive operational detail stays untracked

- **Date:** 2026-07-04
- **Status:** locked
- **Source:** `CLAUDE.md` §2, `SECURITY.md`

**Context.** Free GitHub Pages requires a public repo. Because `.nojekyll` is set,
every tracked file is also *served at the live domain* — `/CLAUDE.md` returns 200.
There is no way to hide a tracked file from the web without adopting a Jekyll
build, which D1 rules out.

**Decision.** Treat every tracked file as published. DNS records, registrar
detail, email routing, and any other operational specifics live only in
`OPERATIONS.local.md`, which is gitignored and never committed.

**Rules out.** "Private-ish" tracked files; relying on obscurity for anything
sensitive; committing secrets, keys, tokens, personal data, or infrastructure
detail on the theory that nobody will look; adding a Jekyll build to hide files.

**Compiled rules:** R-003.

---

## D3 — Three-tier change authority model

- **Date:** 2026-07-04
- **Status:** locked
- **Source:** `CLAUDE.md` §3

**Context.** `main` is production — every merge redeploys the live site, and there
is no staging environment. AI agents and humans both work in this repo, so
"how much may be done without asking" needed a written answer rather than a
judgment call per change.

**Decision.** Every change is classified Tier 1 (autonomous, reversible,
presentation-only), Tier 2 (propose first — branch + PR + human approval), or
Tier 3 (human-only — irreversible, outward-facing, infra, legal, or financial).
When unsure, escalate a tier.

**Rules out.** Ad-hoc "seems fine, shipping it" judgments on infra or legal
changes; agents touching DNS, Pages settings, or the `CNAME`; publishing legal
text without sign-off; committing Tier-2/Tier-3 work directly to `main`.

**Compiled rules:** *none.* This is a **process** decision — it is implemented in
`CLAUDE.md` §3/§4, not in `rules/active.md`. Recorded here so the tier model has a
sourceable origin.

---

## D4 — Formspree as the contact-form backend, client-side only

- **Date:** 2026-07-04
- **Status:** locked
- **Source:** `docs/WORKPLAN.md` P0 (folded into `status.md` by D9), `index.html`,
  `assets/js/script.js`

**Context.** The site needed to receive inquiries, but D1 forecloses a backend.
The contact form had been a placeholder that transmitted nothing, which
misrepresented the site to visitors.

**Decision.** Post the form directly to a third-party form service (Formspree,
endpoint `mvzjloro` → support@wradlabs.com) from the browser. `fetch` with inline
success/error messaging when JS is on, native form POST as the fallback when it is
off. Honeypot field for spam. Because the form now collects and transmits
personal data, a privacy policy became mandatory and `privacy.html` was published.

**Rules out.** Handling submissions ourselves; a mail server or API key in the
repo; any form field the privacy policy does not describe; adding data collection
without a matching privacy-policy update.

**Compiled rules:** R-006, R-007.

---

## D5 — Design-token system; blue→green encodes roots→canopy

- **Date:** 2026-07-04
- **Status:** superseded by [D11](#d11--brand-look-and-feel-is-a-working-draft-not-locked) (2026-07-24)
- **Source:** `CLAUDE.md` §5, `docs/ARCHITECTURE.md` § Design tokens

> **Superseded by D11.** The *token-system discipline* below (declare once, never
> hardcode) is carried forward and still compiles R-004. The *specific look* — the
> blue/green palette and the roots→canopy accent semantic — is downgraded to a
> working draft and no longer a locked constraint; R-005 is retired. See D11.

**Context.** "Wrad" is an ancient word for *root*: the company builds commercial
ventures (roots) that fund impact (canopy). The brand needed that metaphor to be
structural rather than decorative, and a single-file stylesheet drifts fast when
values are typed inline.

**Decision.** All colors, fonts, spacing, and easing are custom properties
declared once in `:root` at the top of `assets/css/style.css`. Accent color
carries fixed meaning: **blue = roots / commercial**, **green = canopy / impact**,
and gradients run blue→green in that direction.

**Rules out.** Hardcoded hex values or font stacks anywhere in CSS or markup;
introducing an accent color with no place in the roots→canopy metaphor; reversing
the gradient direction for visual preference.

**Compiled rules:** R-004, R-005.

---

## D6 — Progressive enhancement and accessibility are baseline, not polish

- **Date:** 2026-07-04
- **Status:** locked
- **Source:** `CLAUDE.md` §5, `docs/ARCHITECTURE.md` § Conventions

**Context.** The site's entire job is to be readable by a stranger, a crawler, or
a screen reader on first load. JS exists only for animation and the mobile menu.

**Decision.** The page must read and function fully with JavaScript disabled — JS
only enhances. Markup is semantic and accessible: one `<h1>`, logical heading
order, labelled inputs, `aria` on interactive controls, `aria-hidden` on
decoration. Motion honors `prefers-reduced-motion`.

**Rules out.** Content injected by JS; navigation or form submission that only
works with JS on; unconditional animation; unlabelled controls; decorative
elements exposed to assistive tech.

**Compiled rules:** R-008, R-009, R-010.

---

## D7 — No unlicensed imagery of real people or brand logos

- **Date:** 2026-07-04
- **Status:** locked
- **Source:** `CLAUDE.md` §2 (Golden rule 4)

**Context.** Stock-looking photos of people and third-party logos are the default
filler for a young company's marketing site, and both carry licensing and
misrepresentation risk — implying customers or partners that do not exist.

**Decision.** Concepts, objects, and original illustration only. Photographs of
real people and third-party brand logos require assets we own or have licensed.

**Rules out.** Unlicensed stock photography of people; customer/partner logo
walls; testimonial headshots; any imagery implying a relationship that does not
exist.

**Compiled rules:** R-011.

---

## D8 — Company, financial, and product memory lives in a separate private repo

- **Date:** 2026-07-24
- **Status:** locked

**Context.** Wrad Labs is broadening from "a website" to a company with corporate
records, accounting, and a product in development. This repo is public *and*
served at the live domain (D2), which makes it structurally unfit to hold any of
that. Mixing the two would put the whole company's memory one `git add` away from
publication.

**Decision.** Company-level memory — accounting, how the company is funded,
corporate filings, and product development — lives in a separate **private** repo,
`company`. This repo covers the **website only**. The
company repo may be referred to here **by name**; none of its content may appear
in any tracked file, including gitignored ones.

**Rules out.** Financial figures, loan balances, bank or registrar detail, filing
content, or product roadmaps in this repo; a `finance/` or `corporate/` directory
here; "just in a gitignored file" as a workaround; a single repo covering both.

**Compiled rules:** R-012.

---

## D9 — Adopt the docs-as-memory operating model

- **Date:** 2026-07-24
- **Status:** locked

**Context.** Work here happens in AI sessions that start cold with no history.
Context that lived only in chat was lost between sessions, and the reference docs
had already drifted from the source — `docs/ARCHITECTURE.md` still described page
sections and a JS module that no longer exist, and both `README.md` and
`SECURITY.md` still called the live Formspree form a placeholder. Pending work was
also tracked in two places once chat summaries started restating it.

**Decision.** The documents are the memory; the chat is scratch. Four memory kinds,
kept physically separate and never mixed:

| Kind | File | Job |
|---|---|---|
| reference | `README.md`, `SECURITY.md`, `docs/*` | what is true **now** — rewrite freely, no history |
| decisions | `decisions.md` | **why** — append-only |
| rules | `rules/active.md` | current hard constraints — compiled from locked decisions |
| status | `status.md` | where we are **right now** — overwrite constantly |

Plus `patterns.md` (capped, expiring observations) and `docs/INDEX.md` (the map).
A fact that wants to live in two files lives in one and is **pointed at** from the
other. `docs/WORKPLAN.md` is folded into `status.md` and deleted, so exactly one
pending-work index exists. Process rules stay in `CLAUDE.md` (§7 records the
memory loop); `rules/active.md` carries behavioral constraints only.

**Rules out.** A second backlog anywhere in the repo; rewriting decision history;
authoring `rules/active.md` by hand or from inference; letting a reference doc
stay stale because "the code is the truth"; closing a session with a summary that
contains work items the backlog does not.

**Compiled rules:** R-013, R-014.

---

## D10 — Owner Operating Model is central and referenced, never copied

- **Date:** 2026-07-24
- **Status:** locked

**Context.** The owner's cross-project collaboration preferences (`owner.md`)
already live in their own private repo, `Wrad-Labs/owner-operating-model`, and the
Optants repo consumes them as a git submodule. Copying `owner.md` into each repo
would create divergent copies that drift the moment one is edited — the exact
failure the single-source design avoids. This repo, being **public** and served at
the live domain (D2), additionally must not embed a *private* submodule: that would
expose the private repo in a public `.gitmodules` and risk GitHub Pages serving its
contents.

**Decision.** There is one canonical `owner.md`, in `owner-operating-model`. This
repo **references it by URL** in `CLAUDE.md` and never holds a copy. It is
owner-authored and read-only to agents — propose edits in conversation, never
commit to it here. The website deliberately does **not** submodule it (unlike the
private Optants and company repos, which may); a public repo gets a pointer only.

**Rules out.** A local `owner.md` in this repo; a private submodule embedded in
this public repo; agents editing the owner model; treating the owner model as one
of the four project memory kinds (it is cross-project governance, above them).

**Compiled rules:** R-015.

---

## D11 — Brand look-and-feel is a working draft, not locked

- **Date:** 2026-07-24
- **Status:** locked
- **Supersedes:** [D5](#d5--design-token-system-bluegreen-encodes-rootscanopy)

**Context.** D5 locked both an engineering discipline (design tokens; never
hardcode) *and* a specific visual identity (the blue/green palette, the
roots→canopy accent semantic, and by extension the current logo mark). The owner
has decided the **visual identity is not final** — the logo and the look-and-feel
should stay open for revision until they explicitly sign off. A locked palette rule
contradicts that.

**Decision.** Two things, split apart:

1. **The token-system discipline is kept and stays locked.** Colors, fonts,
   spacing, and easing are still declared once as custom properties in `:root` at
   the top of `assets/css/style.css`; never hardcode them. This is a maintainability
   rule, independent of *which* values are chosen — and it is exactly what makes the
   look easy to change while it is still a draft. (Carries R-004 forward.)

2. **The specific visual identity is an explicit DRAFT, not a locked constraint.**
   The current blue→green palette, the roots→canopy accent meaning, and the current
   logo/brand mark are working choices the site happens to ship today — not
   decisions. Changing any of them is a normal **Tier-2** proposal, not a violation
   of a locked decision. **R-005 is retired.** No decision locks the logo.

**Rules out.** Treating the current palette, gradient direction, accent semantic, or
logo as settled; blocking a rebrand proposal by citing a locked decision; *and* (the
part D5 got right, retained) hardcoding color/font values instead of using tokens.

**Compiled rules:** R-004 (retied from D5). Retires R-005.

> When the owner signs off on a final visual identity, lock it with a new decision
> (D-nn) and recompile the palette/logo rule(s) then — not before.

---

## D12 — support@wradlabs.com is the only contact address in tracked files

- **Date:** 2026-07-27
- **Status:** **superseded by [D20](#d20--the-published-contact-address-is-hellowradlabscom)**
  (2026-07-30) — the *one address only* constraint survives verbatim; the address it
  names changed to `hello@wradlabs.com`.
- **Source:** recorded 2026-07-27 to give R-003's contact-address clause an origin;
  the constraint was already being enforced in practice.

**Context.** R-003 already carried "no contact address beyond support@wradlabs.com,"
but D2 — the decision it compiles from — says nothing about contact addresses. The
clause was authored, not compiled, which is the exact failure the generated-rules
discipline exists to prevent. The constraint itself is sound: every tracked file is
served at the live domain (D2), so any address committed here is published to
scrapers, and a one-person company has no second address to publish anyway.

**Decision.** `support@wradlabs.com` is the single contact address that may appear
in any tracked file — markup, docs, or metadata. Personal or role addresses, phone
numbers, and the physical business address stay out of the repo; if one is ever
needed operationally it lives in `OPERATIONS.local.md`.

**Rules out.** Personal `@wradlabs.com` addresses in markup or docs; a named
individual's email as the disclosure route in `SECURITY.md`; publishing a phone
number or street address in a tracked file; per-department addresses (sales@, press@)
without a new decision.

**Compiled rules:** R-003 (contact-address clause; joint source with D2).

---

## D13 — The docs-as-memory method is defined once, in the private company repo

- **Date:** 2026-07-27
- **Status:** locked

**Context.** `CLAUDE.md` §7 asserts that the canonical definition of the
docs-as-memory model lives in `company/docs-as-memory.md` and is "referenced, never
restated" — but no decision recorded that. D9 adopts the model here; it does not say
where the method itself is defined. The identical claim for the Owner Operating Model
*is* properly backed (D10/R-015), so this was a gap in wiring, not in intent. The
method is shared across every Wrad Labs repo, so restating it per-repo would produce
the same divergent copies D10 avoids.

**Decision.** The method's canonical definition lives in the private `company` repo
(`docs-as-memory.md`). This repo references it **by name only** and carries a short
operational summary sufficient to work here — never a second copy of the method. D9
remains the decision that adopts it; this decision records where it is defined.

**Rules out.** A local `docs-as-memory.md` in this repo; expanding `CLAUDE.md` §7
into a full restatement of the method; a private submodule in this public repo (same
reasoning as D10); treating the summary in §7 as authoritative when it disagrees with
the canonical file.

**Compiled rules:** R-016.

---

## D14 — `status.md` session history is capped; git is the real history

- **Date:** 2026-07-27
- **Status:** locked

**Context.** `status.md` is the *status* memory kind — "where we are right now,
overwrite constantly." Its Session-history section is the opposite: append-only,
past-tense, and unbounded. Left alone it would grow until the file a cold session
reads first is mostly archive, which is how a status doc stops being read. The
project already has a durable, complete history — `git log` — and `patterns.md`
demonstrates that a cap only works when adding an entry *forces* a drop.

**Decision.** Session history in `status.md` is capped at **5 entries**, newest
first. Adding a sixth deletes the oldest in the same edit; the deleted entry is not
archived anywhere, because the commit it describes is already in git. The section is
a short orientation trail for a cold session, not a record.

**Rules out.** An `ARCHIVE.md` or `history/` directory to hold evicted entries;
raising the cap instead of dropping an entry; using session history as a second
backlog (already forbidden by R-014); treating an evicted entry as lost memory.

**Compiled rules:** R-017.

---

## D15 — Published retention: 24 months for inquiries, enforced by a manual sweep

- **Date:** 2026-07-27
- **Status:** locked

**Context.** `privacy.html` had to state a retention period to satisfy R-007, and a
retention clause is a **commitment, not a description** — nothing in the current
setup deletes anything. A submission leaves two copies with very different lifetimes:
Formspree's, which expires on its own after 30 days on the free plan (per Formspree's
documented account limits), and the notification email in the support mailbox, which
is kept indefinitely by default. The mailbox copy is therefore the only one a
retention promise actually governs. The alternative — open-ended "as long as needed"
wording — needs no maintenance but is the posture regulators like least, and at
current volume a manual sweep costs roughly ten minutes a year.

**Decision.** Inquiries and their reply threads are kept no longer than **24 months**
from receipt, then deleted from the support mailbox. Enforcement is a **manual annual
sweep** by the owner, not automation — no Google Vault retention rule is assumed. The
first mandatory deletion falls due **2028-07** (the form went live 2026-07-04). The
published figure and the actual sweep must stay in step: if the sweep stops happening,
the policy text has to change, not the other way round.

**Rules out.** Publishing a retention number with no mechanism behind it; treating
Formspree's 30-day expiry as satisfying the commitment (it covers only one copy);
open-ended retention of inquiry mail; changing the period in practice without
updating `privacy.html` in the same change; assuming an automated deletion rule
exists.

**Compiled rules:** R-018.

---

## D16 — The Owner Operating Model is read before this repo's cold-start list

- **Date:** 2026-07-29
- **Status:** locked
- **Upstream:** owner-model **D-002** (proposed 2026-07-29) — cross-project rules live in
  the `owner-operating-model` repo, and reading that model is upstream of any project's
  onboarding.

**Context.** On 2026-07-29 a session ran a full redesign and three merged PRs — including
a published privacy policy — without once opening `owner.md`. It was not carelessness
alone: `docs/INDEX.md` said to read three named files "**and stop**," the §7 loop listed
only project docs, and the Owner Operating Model section sat above the loop with no step
that triggered it. Following this repo's onboarding *correctly* produced a session that
skipped the owner model. The cost was concrete — the owner was handed a bare "enable
Enforce HTTPS in GitHub Pages settings," which breaches owner-model **D-001** (owner
actions are step-by-step playbooks, never assumed knowledge). D-001 had been locked since
2026-07-23, but it was recorded inside the Optants repo, so nothing here could see it.

**Decision.** Reading the owner model — `owner.md` **and** its `decisions.md` — is **step
0** of the memory loop, explicitly upstream of the three-file cold start. `docs/INDEX.md`
says so at the point of the "and stop" instruction, so the two can't be read as being in
conflict. §7 step 4 is expanded to the full three-part closing readout (immediate
follow-through · backlog split owner-blocked vs agent queue · one recommendation), which
had existed only in Optants's manual. D-001 is compiled operatively into §"Owner Operating
Model" so it binds sessions here.

**Rules out.** Treating a project cold-start list as exhaustive of what must be read;
citing "read three files and stop" as grounds for skipping cross-project governance;
handing the owner a bare setting name with no click-path, verification, or reversal;
restating owner-model reasoning here instead of citing its `D-nnn` ID.

**Compiled rules:** *none.* This is a **process** decision, implemented in `CLAUDE.md`
§"Owner Operating Model" and §7 — same treatment as [D3](#d3--three-tier-change-authority-model).
`rules/active.md` stays behavioral/design only.

---

## D17 — The support address is published in plain text; no JS-dependent obfuscation

- **Date:** 2026-07-30
- **Status:** locked

**Context.** Cloudflare's **Email Address Obfuscation** was rewriting every `mailto:` link
at the edge — display text became the literal string "[email protected]" and the `href`
became `/cdn-cgi/l/email-protection#<hash>`, decodable only by an injected script. Nothing
in the repo showed this, because the rewrite happens after the repo; it was found by
diffing the live HTML against source after the owner reported the production site not
matching the design.

Two consequences, the second worse than the first. The site did not render as designed on
its two main calls to action. And with JavaScript disabled the address was **unreadable
and the link dead** — a breach of R-008, on `privacy.html` as well, where all four
addresses were obfuscated and *zero* plain-text addresses remained. The published policy
offers email as the route to exercise access and deletion rights, so the policy's own
remedy was JS-gated and displayed no address to a reader who had JS off.

This also settles a latent conflict. **AQ-4** asked to "obfuscate or protect the `mailto:`
links to cut harvesting." Any obfuscation that hides the address from a scraper hides it
from a no-JS reader too, and R-008 is locked, so on a static host with no server-side
rendering AQ-4 was never satisfiable as written. Cloudflare was providing exactly what
AQ-4 asked for, and that is precisely why it had to be switched off.

**Decision.** `support@wradlabs.com` appears in the markup as plain, readable text in both
the link text and the `href`. Cloudflare's obfuscation is disabled per-link with
`<!--email_off-->` … `<!--/email_off-->` (its documented opt-out) rather than by a
dashboard toggle, so the exemption lives in the repo, is visible in review, and survives
anyone changing zone settings. Readability wins over harvesting protection: the cost of
the address being scraped is spam into a mailbox that already has filtering; the cost of
the other choice is a visitor who cannot contact us and a privacy policy whose stated
remedy does not work.

**Rules out.** Cloudflare Email Address Obfuscation on this zone without the per-link
opt-out; JS-dependent email obfuscation of any kind; "protecting" the address by rendering
it from script; closing AQ-4 by adding an obfuscation scheme.

**Compiled rules:** R-019. **Closes AQ-4** as not-satisfiable rather than done.

---

## D18 — The flask-and-roots mark is the Wrad Labs identity; this repo holds copies, not the source

- **Date:** 2026-07-30
- **Status:** locked
- **Upstream:** `company` **C10** (locked 2026-07-30) — the corporate decision this
  implements. Sources, exports, build script and provenance live there in `brand/`;
  cited, not restated (**D-002**).
- **Partially closes:** [D11](#d11--brand-look-and-feel-is-a-working-draft-not-locked),
  which said *"When the owner signs off on a final visual identity, lock it with a new
  decision (D-nn) and recompile the palette/logo rule(s) then — not before."* This is that
  sign-off, **for the mark only**. The palette stays a working draft under D11.

**Context.** The mark shipping until now was an explicit placeholder — a circular
tree/node glyph, labelled `PLACEHOLDER pending a new identity` in the markup and called
out as a placeholder in `status.md` and the CSS. The owner supplied new artwork on
2026-07-30 and it was vectorised and built out in the private `company` repo.

That repo is the source of truth, and deliberately so: a mark is company IP and outlives
any one surface, so the marketing site cannot be the place it lives. Its build script also
stops at the repo boundary rather than syncing here — landing a change on this repo's
`main` publishes to Pages, so an asset that arrives without review is an asset that ships
without review (**OOM D-005**).

**Decision.** Three parts:

1. **Adopt the mark.** The flask-and-roots artwork replaces the placeholder everywhere it
   appeared: nav, footer, `privacy.html`, `404.html`, the favicons, the share card, and the
   JSON-LD `logo`. The mark is no longer a draft.
2. **This repo holds derived copies.** `assets/images/mark.svg` and every icon are copies
   of `company/brand/`. **Never edit the artwork here** — edit it there, rebuild, re-copy.
3. **Delivery changes from an inline sprite to one referenced file.** The placeholder was a
   4-path stroked `<symbol>` duplicated into each page's sprite. The new mark is a single
   **10.6 kB** path: inlining it three times would have roughly doubled the weight of an
   11 kB `index.html` for a capability the mark does not need — it is one flat colour, so
   nothing depends on `currentColor` or the knockout fills the old symbol needed. It is now
   `assets/images/mark.svg`, referenced by `<img>` and cached once across all three pages.

**Consequences worth stating.** The mark is **taller than it is wide** (512×939, aspect
0.545) where the placeholder was near-square — so every consumer sizes it **by height**,
and the `<img>` carries intrinsic `width`/`height` so `width: auto` resolves without a
layout shift. `twitter:card` moves from `summary` to `summary_large_image`, because there
is now a real 1200×630 card to show. `assets/images/logo.png` is **deleted**: it was the
old identity at 317 kB, doing quadruple duty as favicon, share image, apple-touch icon and
JSON-LD logo, and each of those slots now has an asset built for it.

**Rules out.** Editing the artwork in this repo; treating `assets/images/mark.svg` as a
source of truth; reintroducing the `<symbol>` sprite for the mark; sizing the mark by
width; pointing multiple icon slots at one oversized image again; restating the mark's
provenance or build here instead of citing `company` C10.

**Compiled rules:** R-020.

---

## D19 — Sections are full-viewport pages; the Optants tile is a live outbound link

- **Date:** 2026-07-30
- **Status:** locked
- **Owner-directed.** A batch of nine site changes, of which two are structural enough
  to need recording; the rest — copy, the removed hero eyebrow, spacing — are content
  and need no decision.

**Context.** The single page read as a continuous scroll with arbitrary section heights:
110px of vertical padding, a 190px top pad on the hero left over from clearing the fixed
nav, and no relationship between a section and the viewport. The owner asked for each
section to read as its own page. Separately, Optants now has a public destination
(optants.com resolves, 200), which the ventures card had been explicitly waiting for —
its markup carried a comment reserving the space for exactly this.

**Decision.** Two parts:

1. **Every `<section>` is a full-viewport page.** `min-height: 100svh` with content
   centred in the space below the fixed nav, which is reserved by a `--nav-h` token that
   also drives `scroll-padding-top` so anchor jumps don't land under the bar.

   **`min-height`, never `height`** — this is the part that matters. A section has to be
   able to grow past the viewport when its content does not fit: on a short viewport,
   with text scaled up, or in the contact form's case simply because a four-field form is
   taller than some laptops. Fixing the height would clip it. A `max-height: 620px`
   query drops the full-viewport rule entirely below roughly a landscape phone, where
   forcing a viewport height only guarantees an overflow.

2. **The Optants tile is one `<a>` to `https://optants.com`.** The whole card is the link
   — a single tab stop and a single hit target, not a card with a link buried in it.
   Because there is no underlined text to signal it, the affordance is carried by the
   border and shadow lift, a nudging arrow, and a focus ring matching the form fields.
   Its logo is **Optants' own**, copied from `Wrad-Labs/optants/brand/` — a second
   venture brand now lives in `assets/images/`, derived there exactly as the Wrad mark is
   derived from `company/brand/` (R-020's principle, a different upstream).

**Rules out.** `height: 100vh` on a section, or any rule that prevents a section growing
to its content; using `100vh` alone on mobile, where the collapsing browser bar makes it
jump; nesting interactive elements inside the card link; editing either logo in this
repo; a card-as-link with no visible hover *and* focus affordance.

**Compiled rules:** R-021.

---

## D20 — The published contact address is hello@wradlabs.com

- **Date:** 2026-07-30
- **Status:** locked
- **Owner-directed.** Part of a seven-change site pass; the other six are copy and
  layout and need no decision.
- **Supersedes:** D12 (the address only — its *one address, nothing else* constraint
  is carried forward unchanged).

**Context.** Every address in the repo was `support@wradlabs.com`: the contact section,
the footer, four places in `privacy.html`, the JSON-LD `email`, the two form-failure
strings in `script.js`, `SECURITY.md`'s disclosure route, and `README.md`. The owner
confirmed `hello@wradlabs.com` receives mail before the change was made. `support@`
framed a one-person venture studio as a help desk; `hello@` matches what the page
actually invites — collaboration and partnership inquiries, not support tickets.

**Decision.** `hello@wradlabs.com` is the single contact address that may appear in any
tracked file — markup, docs, or metadata. Everything else D12 ruled out still is:
personal or role addresses, per-department addresses, phone numbers, and the physical
business address stay out of the repo and live in `OPERATIONS.local.md` if needed.

**What this does NOT change, and the trap in it.** The site's `mailto:` links are the
*only* part of the delivery path that lives in this repo. **The contact form does not
route through them.** Its submissions go to Formspree endpoint `mvzjloro`, and the
recipient is configured in Formspree's dashboard, not here — so editing the markup
moves the visible address while form mail keeps landing wherever it landed before. Two
things follow, and neither is satisfiable from the repo:

1. **Formspree's recipient must be changed by the owner** — tracked as **OB-11**, with
   the click-path there. Until it is, the page and the form disagree.
2. **R-018's 24-month sweep names a mailbox.** If `hello@` is an alias delivering into
   the same Google Workspace mailbox, the sweep is unchanged. If it is a separate
   mailbox, the sweep must cover it or the published retention figure stops being true —
   a commitment with no mechanism behind it, which the owner model rules out. The
   distinction is mailbox-side and unknowable from here; confirming it is part of OB-11
   rather than assumed either way (**OOM D-007** — do not invent the answer).

**Rules out.** Publishing `support@` in a tracked file; keeping the two addresses live
in parallel as separate published channels; assuming a markup edit re-routes Formspree;
adjusting the published retention figure without knowing which mailbox now receives.

**Compiled rules:** R-003 (contact-address clause; source becomes D2 · D20), R-018
(mailbox naming), R-019 (address named in the plain-text rule).

---

## D21 — The direct address reads on from the invitation, not as its own channel

- **Date:** 2026-07-30
- **Status:** locked
- **Owner-directed.**

**Context.** D19 gave contact three tiers: intro, then the address as a bordered row
under an "Email us directly" eyebrow, then the form. Set off by rules top and bottom, it
read as a second, competing channel announced beside the form — on a page whose whole
job is to get one message sent. The owner asked for the label and the rules to go, with
the address sitting directly after "we'd love to hear from you."

**Decision.** Two tiers, not three. The address is the last line of the invitation,
inside `.contact-head`, at the invitation's own size with no label and no rules. The
form remains the primary path; the address is the alternative for anyone who prefers it,
not a headline. The same restraint applies to the footer: the tagline and the address
are removed there, leaving the lockup and the copyright line — the tagline had become
the third place on one page saying a version of the same sentence, and the address the
second.

**Also settled here** (layout, recorded because both were owner-directed and both have a
failure mode worth naming):

- **The hero art centres in the whitespace beside the text column, not against the
  container edge.** `left: var(--hero-col); right: 0; margin-inline: auto` — for an
  absolutely positioned replaced element the width resolves from the aspect ratio first,
  then the two auto margins split the remainder. **The two offsets are a pair:**
  overriding just one of them at a breakpoint silently re-pins the art to an edge, which
  is exactly what the old `right: -20px` in the 1080px query did.
- **Button and consent line are one group.** The consent line sat a full form row plus
  the status note's reserved line below the button — roughly 50px. Grouping them puts it
  10px under the button; the status note follows the group, because it is feedback about
  a submission rather than part of the call to action.

**Rules out.** Reintroducing a labelled, ruled-off address row; a footer that repeats the
tagline or the address; overriding `left` or `right` on `.hero-art` alone; separating the
consent line from the button by a form row.

**Compiled rules:** none — presentation, inside the existing token system and R-021.
Recorded because each part has a specific way of going wrong quietly.

---

## D22 — Crawler policy is owned by this repo; AI crawlers are allowed

- **Date:** 2026-07-31
- **Status:** locked
- **Owner-directed**, after the injected policy was found on deploy.

**Context.** Verifying the AQ-10 deploy showed the live `robots.txt` was **not** the
committed one. Cloudflare's **AI Crawl Control** was prepending a managed block: a
`Content-Signal: search=yes,ai-train=no,use=reference` line and `Disallow: /` for roughly
ten named AI crawlers (ClaudeBot, GPTBot, CCBot, Bytespider, Amazonbot,
Applebot-Extended, Google-Extended, meta-externalagent…), with the repo's own directives
served after it. No decision here chose that, and the owner had not knowingly enabled it.

Two things were wrong with it beyond authorship. **One file had two sources of record** —
this repo and a dashboard — which is the bug D-009 names. And it was **costing the site
the exact channel it wants**: the owner observed that other AI assistants could not reach
wradlabs.com. Testing showed **nothing was ever blocked at the network level** — nine user
agents including ClaudeBot, GPTBot, Googlebot and a plain browser all returned **200**. The
suppression was entirely advisory: the door was open and the sign said stay out. Worth
recording because the two failure modes look identical from the outside and have opposite
fixes.

**Decision.** `robots.txt` is owned by this repo. Cloudflare's **"Manage your robots.txt"
is disabled** and **"Block AI training bots" is set to do-not-block**. AI crawlers are
allowed — training and retrieval alike — alongside search engines.

**Why allowing is right *here*.** The content is marketing copy that exists to be
repeated. There is no paywall, no advertising revenue, no proprietary research and **no
user-contributed content** — none of the reasons to publish `ai-train=no` apply. An
assistant that can read this site can recommend the company, which is the point of having
one.

**Explicitly does not generalize to sibling properties.** Optants serves
**opinion contributed by real people**, where "may be used for training" is a promise
about someone else's words and has to match what that product's terms and privacy policy
already say. Same company, different content, different answer — and that decision belongs
in the `optants` repo, next to the policy it must agree with (D8/R-012).

**Rules out.** Managing crawler policy from a dashboard; any second source of record for
`robots.txt`; publishing `ai-train=no` here without a new decision; reading this entry as
guidance for Optants or any property carrying user content.

**Compiled rules:** R-022.

---

## D23 — Fonts are self-hosted; no third-party font service

- **Date:** 2026-07-31
- **Status:** locked
- **Owner-approved** (AQ-9), including the download and commit of font binaries.

**Context.** Both typefaces came from `fonts.googleapis.com` / `fonts.gstatic.com` on every
page load. That made Google a processor of every visitor's IP address purely to render
text — the one entry in `privacy.html`'s processor list that existed for *presentation*
rather than for a capability the site needs. It also left the last measurable source of
layout shift (a swap from the fallback face) and forced any future CSP to allow two extra
origins.

**Decision.** The two families are served from this origin. `assets/fonts/` holds four
`woff2` files — latin and latin-ext per family — with `@font-face` blocks at the top of
`assets/css/style.css`. No `fonts.googleapis.com` link, no `preconnect`, no third-party
request on load. The two **latin** files are preloaded; latin-ext deliberately is not,
because its `unicode-range` means most readers never fetch it.

**Consequences worth stating.**

- **`privacy.html` changed in the same commit** and is dated **July 31, 2026**. Google
  Fonts is no longer listed as a processor, because it no longer receives anything — and a
  policy naming a processor that receives nothing is as wrong as one omitting a processor
  that does (R-007 cuts both ways). Four processors remain: Formspree, Google Workspace,
  Cloudflare, GitHub Pages/Fastly. The policy's own promise — that a provider change
  updates the page and its date before shipping — is what made the date bump mandatory
  rather than cosmetic.
- **The files are DERIVED COPIES**, exactly as `assets/images/` is (R-020's principle, a
  different upstream). Both families are **SIL OFL**; the licences ship beside them as
  `assets/fonts/OFL-Inter.txt` and `OFL-SourceSerif4.txt`. Never hand-edit the binaries —
  re-fetch from the `css2` URL recorded in the CSS comment.
- **One variable file per subset, not one per weight.** Upstream served four `@font-face`
  blocks per subset that all resolved to the *same* URL — how Google delivers a variable
  font. Collapsed here to one block declaring `font-weight: 400 700`. **Verified, not
  assumed:** rendered widths increase monotonically across weights (Inter 400/500/600/700
  → 520.4/528.6/536.6/544.8px), which is the axis interpolating rather than the browser
  synthesizing a fake bold.
- **AQ-3 gets simpler.** The CSP it has to write drops two origins and is now `self` plus
  Formspree — plus whatever Cloudflare injects at the edge (D17), which is still the part
  that repo inspection cannot tell you.

**Rules out.** Re-adding a `fonts.googleapis.com` stylesheet or `preconnect`; adding any
third-party font, icon-font or CDN-hosted face; editing the `woff2` binaries in place;
shipping a font whose licence is not carried in `assets/fonts/`; changing the font
delivery path without updating `privacy.html`'s processor list in the same commit.

**Compiled rules:** R-023.
