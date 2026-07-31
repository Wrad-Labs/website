# Wrad Labs Inc. — Corporate Website

Static corporate site for [www.wradlabs.com](https://www.wradlabs.com), hosted on GitHub Pages.

> "Wrad" is an ancient word meaning "root." Like a tree's roots, Wrad Labs provides
> the foundation from which commercial ventures grow to support meaningful social,
> environmental, and ethical initiatives.

## Structure

```
website/
├── index.html              # Single-page site (hero, ventures, contact)
├── privacy.html            # Privacy policy
├── 404.html · robots.txt · sitemap.xml
├── CNAME                   # Custom domain for GitHub Pages (www.wradlabs.com)
├── .nojekyll               # Serve files as-is (skip Jekyll processing)
├── docs/INDEX.md           # Doc map / memory-model entry point (start here)
└── assets/
    ├── css/style.css       # All styles (design tokens at the top)
    ├── js/script.js        # Nav, scroll reveal, hero canvas, contact form
    └── images/             # Logo + tree backdrop
```

Working in this repo? Read [`docs/INDEX.md`](docs/INDEX.md) first — it maps every
doc and explains the docs-as-memory model this project runs on.

## Hosting

- **GitHub Pages**, deploying from the `main` branch, root folder.
- Custom domain `www.wradlabs.com` (see `CNAME`); apex `wradlabs.com` redirects to `www`.
  DNS and registrar detail is deliberately not in tracked files (R-003) — it lives in
  the untracked `OPERATIONS.local.md`.
- Pushing to `main` redeploys the site automatically (allow a minute or two).

## Local preview

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Notes

- The published contact address is hello@wradlabs.com.
- The contact form is live, posting to Formspree (client-side, no backend). Its
  recipient is set in Formspree's dashboard, not in this repo — the `mailto:` links
  here do not route it. See the handler at the bottom of `assets/js/script.js` and
  the privacy disclosure in `privacy.html`.
- Email on `@wradlabs.com` runs on Google Workspace and is configured off-repo;
  nothing in this repository affects it.
