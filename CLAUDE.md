# CLAUDE.md — Wrad Labs corporate website

Operating manual for AI assistants working on the **Wrad Labs** marketing site.
This project is **completely separate** from PopOp — different repo, different
folder, different rules. Do not pull in PopOp docs, guardrails, or context.

## What this is

A single-page static corporate site for **www.wradlabs.com**, hosted on
**GitHub Pages**. No build step, no framework, no backend — plain HTML/CSS/JS.

> "Wrad" is an ancient word meaning "root." Like a tree's roots, Wrad Labs
> provides the foundation from which commercial ventures grow.

## Structure

```
website/
├── index.html          # The whole site (hero, vision, Wrad model, build, principles, contact)
├── CNAME               # Custom domain: www.wradlabs.com — do NOT change or remove
├── .nojekyll           # Serve files as-is
└── assets/
    ├── css/style.css   # All styles; design tokens at the top of the file
    ├── js/script.js    # Nav, scroll reveal, tree-stage sync, hero canvas
    └── images/         # logo.png, tree-backdrop.png
```

## Deploy & hosting

- **Repo:** https://github.com/Wrad-Labs/website (public — required for Pages on the free plan).
- **Pages:** deploy from branch `main`, root folder. **Pushing to `main` redeploys**
  automatically (allow a minute or two). There is no staging environment.
- **DNS** is managed at **Squarespace Domains** (migrated from Google Domains).
  Apex `wradlabs.com` → GitHub Pages A records (185.199.108–111.153);
  `www` → CNAME `wrad-labs.github.io`.

## Guardrails — do NOT do these

- Do **not** touch email DNS at Squarespace: MX (`smtp.google.com` /
  `aspmx.l.google.com`), or any SPF / DKIM / DMARC / `google-site-verification`
  TXT records. Those keep Google Workspace email (`@wradlabs.com`) working.
- Do **not** change or delete the `CNAME` file, or the `www`/apex DNS records,
  without a clear reason — it breaks the custom domain and the SSL cert.
- Do **not** use AI-generated or scraped imagery of **real people or real brand
  logos**. Concepts/objects/illustrations are fine; real people & brands need
  licensed or owned assets.
- The **contact form is a placeholder** (see the handler at the bottom of
  `assets/js/script.js`) — it does not send anything until wired to Formspree /
  Getform / Basin. Don't imply it works until it's connected.
- Keep it a **static site** — no backend, no secrets in the repo (it's public).

## Local preview

Open `index.html` in a browser, or `python -m http.server 8000` from this folder.
