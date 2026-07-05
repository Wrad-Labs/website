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
  should be enabled in Pages settings so HSTS is sent (see
  [`docs/WORKPLAN.md`](docs/WORKPLAN.md) P0).
- **Third-party surface:** currently Google Fonts only. Any added service (form
  handler, analytics) is a new exposure and must be reviewed as a Tier-2 change
  (see [`CLAUDE.md`](CLAUDE.md) §3) and reflected in the privacy policy.

## Known limitations (GitHub Pages)

- Custom **HTTP response headers cannot be set** (no CSP/Referrer/Permissions
  headers server-side). Header-style controls are applied via `<meta http-equiv>`
  where supported — see WORKPLAN P2.
- Tracked files cannot be hidden from the served site without switching to a
  Jekyll build (which conflicts with `.nojekyll`). Mitigation: keep tracked docs
  free of anything sensitive.

## User data

The contact form is currently a **placeholder that transmits nothing**. Before
it is wired to a real backend, a privacy policy and a consent notice must be
added (WORKPLAN P0/P1). Email (`@wradlabs.com`, Google Workspace) is managed at
the DNS provider and is independent of this repo.
