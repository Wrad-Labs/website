# CLAUDE.md — Wrad Labs website

Operating manual for the **www.wradlabs.com** static site. **This file is a stub.**
The full manual, the decision log, the compiled rules and the current status live in
the private **`Wrad-Labs/company`** repo, under **`website/`**.

Everything below is here on purpose rather than behind that pointer: this file is
auto-loaded when you open the repo, and a guardrail one fetch away is a guardrail some
session will skip. **Read these six lines even if you read nothing else.**

## Non-negotiables

1. **Every tracked file in this repo is served at the live domain.** `.nojekyll` is set
   and there is no build step, so committing a file publishes it. No secrets, keys,
   tokens, personal data, financial figures, or DNS/registrar/email detail — ever.
   Operational specifics go in `OPERATIONS.local.md`, which is gitignored and stays that
   way.
2. **`main` is production.** Every push redeploys the live site. There is no staging.
3. **Branch and open a PR.** Never commit to `main` directly. `feat/…`, `fix/…`,
   `docs/…`, `chore/…`.
4. **Do not touch `CNAME`, DNS, or email records.** They keep the domain and the
   company mailbox alive. Human-only, on explicit request.
5. **`assets/images/` and `assets/fonts/` are derived copies.** Their sources are
   upstream — the brand mark in `company/brand/`, the fonts from Google's `css2`
   endpoint. Never edit the artwork or the binaries here.
6. **Don't add another markdown file to this repo.** It holds what the site serves plus
   exactly three stubs — this one, `README.md`, `SECURITY.md`. A fourth needs a recorded
   decision.

## The three tiers

- 🟢 **Tier 1 — do it, then summarize.** Copy edits, CSS tweaks within the existing
  tokens, accessibility and SEO markup, behavior-preserving JS refactors.
- 🟡 **Tier 2 — propose first, PR, wait for approval.** New sections or pages, nav
  changes, any third-party service, design-token or brand changes, anything that
  collects or transmits visitor data.
- 🔴 **Tier 3 — human-only, never autonomous.** DNS and email records, `CNAME` and Pages
  settings, publishing legal text as final, registering anything, spending money,
  force-pushing or rewriting history.

**When unsure, escalate a tier.**

## Before you change anything

Read the real manual. It is not optional — it carries the locked decisions, the compiled
rules you must not break, and the current state of the site:

```
Wrad-Labs/company → website/CLAUDE.md         ← the manual and the doc map, start here
                    website/status.md         ← where the site is right now
                    website/rules.md          ← the constraints
```

The two repos are cloned side by side, so from here that is `../company/website/`. If it
is not on disk:

```bash
gh api repos/Wrad-Labs/company/contents/website/CLAUDE.md --jq '.content' | tr -d '\n' | base64 -d
```

**A site change and its documentation land as paired PRs in the same session** — the
markup here, the memory there, cross-linked in both bodies. An undocumented change didn't
happen.

Also read **Rootstock** — the operating framework, one file (`README.md`) — before any
collaboration-style call. It is the private **`Wrad-Labs/rootstock`**, a **sibling clone
read at HEAD, never pinned**:

```bash
git -C ../rootstock pull
```

It is deliberately **not** a submodule of this repo and is never cloned into it: every
tracked file here is served, so that would publish it (`WS-R015`). If the clone is not on
disk, fetch by URL from this working copy.

## Local preview

```bash
python -m http.server 8000
```

Or start it from the tracked `.claude/launch.json`. Check the affected sections at mobile
and desktop widths and confirm the console is clean before opening a PR.
