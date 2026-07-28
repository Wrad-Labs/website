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
- **Transport:** served over HTTPS via GitHub Pages / Fastly. "Enforce HTTPS"
  should be enabled in Pages settings so HSTS is sent (see the backlog in
  [`status.md`](status.md), OB-3).
- **Third-party surface:** Google Fonts (CSS/font requests) and **Formspree**
  (the contact form posts submissions to it client-side). Email runs on Google
  Workspace, off-repo. Any further service (analytics, embeds) is a new exposure,
  reviewed as a Tier-2 change (see [`CLAUDE.md`](CLAUDE.md) §3) and reflected in
  `privacy.html`.

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
Known gap: `privacy.html` does not yet name its processors or state a retention
period — tracked as OB-1 in [`status.md`](status.md). Email (`@wradlabs.com`,
Google Workspace) is managed at the DNS provider and is independent of this repo.
