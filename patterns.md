# Patterns — tentative observations

**Memory kind: patterns (tentative).** Observations about how work on *this
project* actually goes. Everything here is a hypothesis, not a fact — nothing in
this file is a rule, and nothing here is authoritative. Rules live in
[`rules/active.md`](rules/active.md) and come only from locked decisions.

## Guardrails — enforced, not aspirational

1. **Hard cap: 7 active entries.** Adding an eighth requires *dropping* one in the
   same edit — the oldest, or the lowest-confidence. Never raise the cap. A
   dropped entry is deleted, not archived; if it mattered it will recur.
2. **Every entry carries an expiry date** (default: 90 days from last touch). Past
   expiry the entry auto-downgrades one confidence tier; a `single-instance` entry
   past expiry is removed.
3. **Confidence tiers:** `single-instance` → `recurring` → `durable`. Nothing is
   created above `single-instance`. Promotion requires a *new, separately dated*
   observation of the same pattern, noted in Evidence — not a re-reading of the
   original one.
4. **Observations describe the work, never the person.** An entry states something
   observable about how a task went. It never asserts a motive, a trait, a skill
   level, or a judgment about the owner. If an entry cannot be written without
   one, it does not go in this file.
5. **Nothing is promoted to `owner.md` automatically.** A durable pattern may be
   *proposed* to the owner in conversation; only the owner edits `owner.md`.
6. **Not a backlog.** Patterns never carry action items — those go to `status.md`
   (R-014).

## Format

```
### P-nn — <short observable pattern, phrased as behavior of the work>
- Confidence: single-instance | recurring | durable
- First seen: YYYY-MM-DD · Last touched: YYYY-MM-DD · Expires: YYYY-MM-DD
- Evidence: dated, specific instances — one line each
- So what: what a future session might do differently. Suggestion only.
```

## Active entries

*None yet (0 / 7).* Created empty on 2026-07-24 — entries are earned by
observation, not seeded.
