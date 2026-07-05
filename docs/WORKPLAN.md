# Workplan — improvement backlog

Prioritized backlog for www.wradlabs.com, derived from the site
evaluation of **2026-07-04**. Ordered by priority; each item notes its
decision tier (see [`../CLAUDE.md`](../CLAUDE.md) §3).

Status key: ⬜ not started · 🟨 in progress · ✅ done

---

## P0 — Correctness & trust (do first)

- ✅ **Wire the contact form to a real backend.** *(Tier 2 — adds a service. 2026-07-04)*
  Formspree integration live — endpoint `mvzjloro` → support@wradlabs.com.
  `fetch` POST with honeypot (`_gotcha`), disabled-while-sending state, inline
  success/error messaging, and progressive enhancement (native POST fallback
  with JS off). **Follow-ups:** (a) first real submission triggers Formspree's
  one-time confirmation email — click to activate; (b) a privacy notice is now
  required since the form collects name/email/message (see P1).
- ⬜ **Confirm "Enforce HTTPS" is enabled** in GitHub Pages settings. *(Tier 3 —
  Pages setting.)* Live headers currently show **no HSTS**; enabling it makes
  Pages serve `Strict-Transport-Security` and forces TLS.
- ⬜ **Decide exposure of `CLAUDE.md` / `README.md` at the domain.** *(Tier 1.)*
  Both return 200 at the live URL. Sensitive ops detail has been moved to the
  untracked `OPERATIONS.local.md`; confirm nothing recon-worthy remains in
  tracked docs. (Full suppression isn't possible without a Jekyll build, which
  conflicts with `.nojekyll` — accept public docs, keep them clean.)

## P1 — SEO, discoverability, legal

- ✅ **Add `robots.txt`** allowing crawl + pointing to the sitemap. *(2026-07-04)*
- ✅ **Add `sitemap.xml`** (single URL for now). *(2026-07-04)*
- ✅ **Add a custom `404.html`.** GitHub Pages serves it automatically. *(2026-07-04)*
- ✅ **Add JSON-LD `Organization` schema** (name, url, logo, email, description). *(2026-07-04)*
- 🟨 **Complete social/meta:** `twitter:image/title/description` + `apple-touch-icon`
  added *(2026-07-04)*. **Remaining:** a proper `favicon.ico` + sized PNG icon set
  instead of reusing `logo.png` (needs generated icon assets). *(Tier 1.)*
- 🟨 **Privacy Policy page** *(Tier 2/3 — draft autonomously, publish with sign-off)*
  **Drafted 2026-07-04:** `privacy.html` (on-brand, `noindex` off / indexable),
  covering data collected, use, processors (Formspree, Google Workspace, GitHub
  Pages, Google Fonts), retention, rights. Form consent line + footer link added.
  **Remaining (human — Tier 3 to publish):** legal review of the wording, set the
  "Last updated" date (currently `[DATE ON PUBLICATION]`), then approve for deploy.

## P2 — Security hardening (within GitHub Pages limits)

> GitHub Pages can't set custom response headers, so header-based controls must
> use `<meta http-equiv>` where supported.

- ⬜ **Add `<meta http-equiv="Content-Security-Policy">`** scoped to the fonts +
  any form/analytics endpoints once known. *(Tier 2 — can break rendering; test.)*
- ⬜ **Add `<meta name="referrer" content="strict-origin-when-cross-origin">`.**
  *(Tier 1.)*
- ⬜ **Obfuscate / protect the `mailto:` addresses** or route contact through the
  form to cut email-harvesting spam. *(Tier 1.)*

## P3 — Accessibility & polish

- ⬜ **"Skip to content" link** for keyboard/screen-reader users. *(Tier 1.)*
- ⬜ **Verify color contrast** of `--medium-gray` body text on `--bg` against
  WCAG AA; bump if it fails at small sizes. *(Tier 1.)*
- ⬜ **Self-host fonts** to remove the third-party Google Fonts request (privacy
  + performance). *(Tier 2.)*
- ⬜ **Reduce layout shift / preload** the hero + tree image. *(Tier 1.)*

## P4 — Content & growth (later)

- ⬜ Replace fully-aspirational copy with proof as it exists: products, team, or
  case studies. *(Tier 2.)*
- ⬜ Consider a lightweight, privacy-respecting analytics option (e.g. Plausible)
  — requires a privacy-policy disclosure. *(Tier 2.)*

---

### Suggested sequencing
1. P0 form + HTTPS (trust & security foundation).
2. P1 SEO/legal quick wins (mostly Tier-1, batch in one PR).
3. P2 headers once the form/analytics endpoints are known (so CSP is accurate).
4. P3/P4 iteratively.
