# Security posture

Security notes for the Wrad Labs website (**www.wradlabs.com**), a static site
on GitHub Pages.

## Reporting a vulnerability

Email **hello@wradlabs.com** with details and reproduction steps. This is a
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
  Cloudflare terminates TLS, so it observes visitor IPs; it is a processor and **is
  named in `privacy.html`** as of 2026-07-30.
- **Cloudflare can rewrite the HTML we ship.** Its Email Address Obfuscation was
  rewriting every `mailto:` into a `/cdn-cgi/` decoder requiring injected JavaScript —
  a change no one could see by reading the repo, and a breach of R-008 that also broke
  `privacy.html`'s own stated route for access and deletion requests. Now opted out
  per-link with `<!--email_off-->` (D17/R-019). **Security consequence:** a zone-level
  toggle can alter served markup and inject script without a commit, so the repo is not
  the whole truth about what a visitor receives. Any future CSP work (AQ-3) has to
  account for Cloudflare-injected `/cdn-cgi/` scripts, and rendering claims should be
  verified against the live domain.
- **Cloudflare also rewrites files that are not HTML — confirmed on `robots.txt`,
  2026-07-31.** The live file is not the committed one: Cloudflare **prepends** its own
  `User-agent: *` group carrying a `Content-Signal:` line and a block-list of AI crawlers
  (ClaudeBot, GPTBot, CCBot, Google-Extended, Bytespider, Amazonbot, Applebot-Extended,
  meta-externalagent and others), then serves the repo's content after it. **This is
  additive injection, not a rewrite** — the committed directives survive intact, and
  because a crawler must combine every group matching its user-agent, the repo's
  `Disallow: /*.md$` still applies despite arriving in a second `User-agent: *` group
  (verified against Google's robots.txt spec, not assumed). **Security consequence:** the
  earlier lesson generalizes — it is not "Cloudflare can rewrite the HTML," it is
  **Cloudflare can change any file it serves, including ones with no markup in them.**
  **And a third time, 2026-07-31, worse than both:** an injected Web Analytics beacon that
  **`curl` cannot see even with a browser User-Agent** — it appears only in a real
  browser's DOM on the live domain. Each occurrence has evaded the check that caught the
  last one, so the standing instruction is now specific: **"verify against the live domain"
  means loading it in a real browser, not fetching it.** A `curl` diff proves only that the
  origin is serving what the repo contains, which is no longer the interesting question.
  It also means **any CSP must account for edge-injected scripts** (AQ-3/OB-13).
  **Resolved the same day (D22 / R-022):** both AI Crawl Control settings are off and the
  live file is verified identical to the committed one. The standing lesson is the point,
  not the fix — and note the diagnosis, because the two cases look alike and have opposite
  remedies: **nothing was blocked at the network level.** Nine user agents including
  ClaudeBot, GPTBot and Googlebot all returned 200. A crawler declining because
  `robots.txt` told it to is not a crawler being denied, and only one of those is visible
  in server logs.
- **Third-party surface:** Cloudflare (edge/TLS) and **Formspree** (the contact form
  posts submissions to it client-side). Email runs on Google Workspace, off-repo.
  **Google Fonts was removed 2026-07-31 (D23/R-023)** — the typefaces are served from this
  origin, so **this repo's markup requests nothing third-party**. The **served page still
  does**: Cloudflare injects a Web Analytics beacon (`static.cloudflareinsights.com`) into
  every page at the edge. Undisclosed in `privacy.html`, which denies analytics outright —
  **OB-13**. Any further
  service (analytics, embeds, a CDN-hosted font or icon set) is a new exposure, reviewed
  as a Tier-2 change (see [`CLAUDE.md`](CLAUDE.md) §3) and reflected in `privacy.html` in
  the same commit.

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
(`mvzjloro` → hello@wradlabs.com) with a honeypot field for spam. A privacy
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
