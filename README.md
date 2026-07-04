# Wrad Labs Inc. — Corporate Website

Static corporate site for [www.wradlabs.com](https://www.wradlabs.com), hosted on GitHub Pages.

> "Wrad" is an ancient word meaning "root." Like a tree's roots, Wrad Labs provides
> the foundation from which commercial ventures grow to support meaningful social,
> environmental, and ethical initiatives.

## Structure

```
website/
├── index.html              # Single-page site (hero, vision, model, build, principles, contact)
├── CNAME                   # Custom domain for GitHub Pages (www.wradlabs.com)
├── .nojekyll               # Serve files as-is (skip Jekyll processing)
└── assets/
    ├── css/style.css       # All styles (design tokens at the top)
    ├── js/script.js        # Nav, scroll reveal, tree-stage sync, hero canvas
    └── images/             # Logo + tree backdrop
```

## Hosting

- **GitHub Pages**, deploying from the `main` branch, root folder.
- Custom domain `www.wradlabs.com` (see `CNAME`); apex `wradlabs.com` redirects to `www`
  via A records at the DNS provider (Squarespace Domains).
- Pushing to `main` redeploys the site automatically (allow a minute or two).

## Local preview

Open `index.html` in a browser, or serve the folder:

```
python -m http.server 8000
```

## Notes

- The contact form is a placeholder — connect it to Formspree/Getform/Basin to
  receive submissions (see the handler at the bottom of `assets/js/script.js`).
- Email (Google Workspace MX records) is managed at the DNS provider and is
  independent of this repo.
