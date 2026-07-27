# Doc index — the map

Every document in this repo, what it **owns**, its **memory kind**, and the rule
for updating it. If two files seem to cover the same ground, one of them owns it
and the other must point at it — fix that rather than writing it twice.

Scope: the **public website** only. Company, financial, and product memory lives
in the private `company` repo (D8) and is referenced here by name only.

## Starting a session cold

Read **three files**, in this order, and stop:

1. [`../status.md`](../status.md) — where the project is right now, and the backlog.
2. [`../rules/active.md`](../rules/active.md) — the constraints you must not break.
3. **The one reference doc that owns the area you are touching** (find it in the
   table below).

**Do not read the whole tree.** `decisions.md` is a lookup, not a briefing — open
it when you need to know *why* a constraint exists, or when you are about to do
something a rule forecloses. Reading everything is how a session burns its context
before it writes a line.

## The four memory kinds

| Kind | Job | Update rule |
|---|---|---|
| **reference** | what is true **now** | Rewrite freely to stay true. No history, no rationale. If it disagrees with the source, the doc is wrong — fix it. |
| **decisions** | **why** we chose this | **Append-only.** Never rewrite an entry; supersede with a new one. |
| **rules** | the current hard constraints | **Compiled**, never authored. Regenerated in the same commit that locks or supersedes a decision. |
| **status** | where we are **right now** | Overwrite constantly. Holds the single backlog. No rules, no rationale. |

`CLAUDE.md` and `patterns.md` sit outside these four — see the table.

## The documents

| File | Owns | Kind | Update rule |
|---|---|---|---|
| [`../CLAUDE.md`](../CLAUDE.md) | **Process**: golden rules, the three authority tiers, branch→PR workflow, coding standards, the memory loop (§7) | operating manual (not a memory kind) | Edit deliberately; changes to the tier model or workflow are owner-approved. Never put design constraints here — point at `rules/active.md`. |
| [`../decisions.md`](../decisions.md) | Why the site is the way it is — D1–D11 (D5 superseded by D11), each with what it rules out | decisions | Append-only. New entry to supersede; the only edit to a past entry is flipping status + adding the pointer. |
| [`../rules/active.md`](../rules/active.md) | The compiled constraint set (R-001–R-015; R-005 retired), each backlinked to a locked decision | rules | Generated. Recompile in the same commit that locks/supersedes a decision. Never add a rule from inference. |
| [`../status.md`](../status.md) | Current live state + **the single backlog** (owner-blocked / agent queue) + session history | status | Overwrite. Updated in the *same commit* as the work it describes. |
| [`../patterns.md`](../patterns.md) | Tentative observations about how work here actually goes | patterns (capped, expiring) | Max 7 entries; every entry expires and downgrades. Never a rule, never a backlog, never about the person. |
| [`../README.md`](../README.md) | Public front door: what this repo is, structure, hosting, local preview | reference | Rewrite to stay true. |
| [`../SECURITY.md`](../SECURITY.md) | Security posture, threat model, disclosure route, GitHub Pages limits | reference | Rewrite to stay true — especially when the third-party surface changes. |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Tech structure: stack, file layout, design tokens, page sections, JS blocks, deploy | reference | Rewrite to stay true. Verify against `index.html` / `script.js` / `style.css` before trusting it. |
| [`INDEX.md`](INDEX.md) | This map | reference | Update whenever a doc is added, removed, or changes owner. |
| `../OPERATIONS.local.md` | DNS, registrar, email routing, Pages settings | reference (**untracked**) | Local only — gitignored, never committed (R-003). |

## Where things are *not*

- **Pending work** — only `status.md`. There is no `WORKPLAN.md` (folded in and
  deleted, 2026-07-24) and no second list anywhere, including chat summaries (R-014).
- **Process rules** — only `CLAUDE.md`. Not `rules/active.md`.
- **Design/behavioral constraints** — only `rules/active.md`. Not `CLAUDE.md`.
- **Rationale** — only `decisions.md`. Not the reference docs, not the rules file.
- **Anything financial, corporate, or product** — the private `company`
  repo. Never here (R-012).
- **The Owner Operating Model** (`owner.md`) — the private
  [`Wrad-Labs/owner-operating-model`](https://github.com/Wrad-Labs/owner-operating-model)
  repo, referenced by URL from `CLAUDE.md`. Cross-project governance, above the four
  memory kinds; never copied here and never submoduled into this public repo (D10/R-015).
