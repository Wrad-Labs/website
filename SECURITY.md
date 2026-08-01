# Security Policy

## Reporting a vulnerability

Email **hello@wradlabs.com** with details and reproduction steps.

This is a static marketing site on GitHub Pages with a small attack surface — no
backend, no accounts, no server-side code. Please allow a few business days for a
response, and **do not open a public issue** for security reports.

## Scope

In scope: **www.wradlabs.com** and this repository.

Out of scope: the Optants product (`optants.com`), Google Workspace email, and any
third-party service the site depends on — report those to their own vendors.

## What this repo contains

Only the files the site serves, plus this policy, [`README.md`](README.md) and
[`CLAUDE.md`](CLAUDE.md). **Everything tracked here is public and served at the live
domain**, so it contains no secrets, credentials, or infrastructure detail by design.

The full security posture — threat model, edge behaviour, known GitHub Pages limits, and
how visitor data from the contact form is handled — is maintained privately alongside the
rest of this project's documentation. Visitor-facing data handling is published at
[`/privacy.html`](https://www.wradlabs.com/privacy.html).
