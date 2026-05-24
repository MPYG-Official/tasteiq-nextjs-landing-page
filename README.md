# TasteIQ Next.js Landing Page

Marketing site for [tasteiq.in](https://tasteiq.in) — Next.js 14 with static export for GitHub Pages.

## Quick start

```bash
cp .env.example .env.local   # optional
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Purpose |
|---------|---------|
| `npm run dev` | Local development |
| `npm run build` | Production build (Node server) |
| `npm run build:static` | Static export to `out/` (no database) |
| `npm run build:static:with-blog` | Static export including blog from DB |

## Deployment

- **GitHub Pages:** push to `main` — `.github/workflows/deploy-github-pages.yml` builds and deploys `out/`.
- **DNS / custom domain:** see [DEPLOY_DNS.md](./DEPLOY_DNS.md).
- **Static export details:** see [STATIC_EXPORT.md](./STATIC_EXPORT.md).
- **Environment variables:** see [ENV_SETUP.md](./ENV_SETUP.md).

Set **Settings → Pages → Source: GitHub Actions** and custom domain `tasteiq.in`.

Affiliate API and [foods.tasteiq.in](https://foods.tasteiq.in) are hosted separately.

## Docs

- [ENV_SETUP.md](./ENV_SETUP.md) — analytics and env vars
- [DEPLOYMENT.md](./DEPLOYMENT.md) — general deployment
- [DOCKER.md](./DOCKER.md) — container build
- [CMS_GUIDE.md](./CMS_GUIDE.md) — blog CMS

## License

Copyright © 2025 TasteIQ. All rights reserved.
