# ⚡ HERPERT — PDM & Email Management

Landing page for HERPERT, an enterprise PDM system with intelligent email integration.

- **Blitz** — PDM-focused email client for Microsoft 365
- **Group PDM** — Enterprise Product Data Management backend

Built with Next.js 15, TypeScript, and Tailwind CSS.

## Features

- Dark theme with cyan accent (#66d9ef)
- Glassmorphism design
- Responsive layout (mobile-first)
- Landing page with hero, features, products, and CTA sections
- Auto-deploy to Azure Static Web Apps

## Local Development

```bash
npm install
npm run dev
# Open http://localhost:3000
```

## Deployment

This repo auto-deploys to Azure Static Web Apps on every push to `main`. 

**Setup required:**
1. Create Azure Static Web App resource
2. Add `AZURE_STATIC_WEB_APPS_API_TOKEN` secret to GitHub

See `.github/workflows/deploy.yml` for details.

## Design

- **Font:** Inter (Google Fonts)
- **Colors:** Slate grays + Cyan (#66d9ef)
- **Components:** Custom Tailwind components (`.glass`, `.btn-primary`, etc.)
- **Animations:** Hover effects, gradient text, blur overlays
