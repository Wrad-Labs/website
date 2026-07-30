# Security posture

Security notes for the Wrad Labs website (**www.wradlabs.com**), a static site
on GitHub Pages.

## Reporting a vulnerability

Email **support@wradlabs.com** with details and reproduction steps. This is a
static marketing site with a small attack surface; please allow a few business
days for a response. Do not open public issues for security reports.

## Threat model & posture

- **Public repository.** The GitHub repo is public (required for free Pages).
  **Everything committed is public**, including `CLAUDE.md`, `README.md`, and
  these docs — several are also served at the live domain (`/CLAUDE.md` → 200).
  Never commit secrets, keys, personal data, or internal infrastructure detail.
- **Sensitive operational detail** (DNS records, registrar, email routing) lives
  in the **untracked** `OPERATIONS.local.md`, excluded via `.gitignore`.
- **No backend, no secrets, no server code.** The site is fully static, so there
  is no server-side execution to exploit and no credentials to leak.
- **Transport:** HTTPS end to end. GitHub Pages "Enforce HTTPS" is enabled
  (`http://` returns a 301), and **HSTS is live at the Cloudflare edge** as of
  2026-07-29: `Strict-Transport-Security: max-age=15552000` on both the apex and
  `www`, without `includeSubDomains` or preload. Subdomains are deliberately
  unaffected, and the absence of preload keeps the policy reversible after the
  max-age window. GitHub Pages alone cannot send HSTS on a custom domain.
- **Edge path:** requests traverse **Cloudflare → Fastly (GitHub Pages)**.
  Cloudflare terminates TLS, so it observes visitor IPs; it is a processor and must
  be named in `privacy.html` (open as OB-9 in [`status.md`](status.md) — the policy
  text does not yet name it).
- **Third-party surface:** Cloudflare (edge/TLS), Google Fonts (CSS/font requests),
  and **Formspree** (the contact form posts submissions to it client-side). Email
  runs on Google Workspace, off-repo. Any further service (analytics, embeds) is a
  new exposure, reviewed as a Tier-2 change (see [`CLAUDE.md`](CLAUDE.md) §3) and
  reflected in `privacy.html`.

## Known limitations (GitHub Pages)

- Custom **HTTP response headers cannot be set** (no CSP/Referrer/Permissions
  headers server-side). Header-style controls are applied via `<meta http-equiv>`
  where supported — see the backlog in [`status.md`](status.md) (AQ-2, AQ-3).
- Tracked files cannot be hidden from the served site without switching to a
  Jekyll build (which conflicts with `.nojekyll`). Mitigation: keep tracked docs
  free of anything sensitive. Indexing — as distinct from reachability — can be
  suppressed via `robots.txt` (AQ-10 in [`status.md`](status.md)).

## User data

The contact form **collects and transmits** the visitor's name, email, message,
and optional organization, posting them client-side to Formspree
(`mvzjloro` → support@wradlabs.com) with a honeypot field for spam. A privacy
policy (`privacy.html`, indexable) and a consent line on the form are published.
The policy names every processor in the chain — Formspree, Google Workspace,
GitHub Pages/Fastly, and Google Fonts — and states a retention period, satisfying
R-007. The site sets **no cookies** and uses no analytics or tracking.

Two copies of every submission exist, with different lifetimes: Formspree's, which
expires after **30 days** on our plan, and the notification email in the support
mailbox, which is governed by the published **24-month** retention commitment and
deleted by manual sweep (D15/R-018, tracked as OB-8 in [`status.md`](status.md)).
The mailbox copy is the one that needs acting on; Formspree's expires by itself.

Adding any new form field or processor requires updating `privacy.html` **before**
the change ships (R-007). Email (`@wradlabs.com`, Google Workspace) is configured
off-repo and is independent of this repository.
