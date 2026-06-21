# HERPERT Landing Page — PRD

## Original Problem Statement
> "https://www.herpert.com und https://github.com/fioressi/herpert-website .
> wie würdest du so ein umfangreiches erp, pdm und Planungstool darstellen?"

User chose **(a)** — a marketing / landing page that presents the ERP, PDM and planning tool similar to herpert.com. UI language: German.

## Architecture
- **Frontend**: React 19 (CRA + craco), Tailwind CSS 3, lucide-react icons, framer-motion (avail.), axios.
  - Single route `/` → `<Landing />` in `/app/frontend/src/components/Landing.jsx`
  - Fonts: IBM Plex Sans (body/headings) + IBM Plex Mono (data/labels) loaded via Google Fonts
  - Design system: high-contrast Swiss / engineering aesthetic — pure white + ink black + brand orange `#FF4F00`, blueprint dark `#080C16`, strict 1 px borders, `rounded-none`, mono labels.
- **Backend**: FastAPI + Motor (Mongo)
  - `GET  /api/`         → health
  - `GET  /api/stats`    → static showcase stats
  - `POST /api/leads`    → create demo lead (validated EmailStr)
  - `GET  /api/leads`    → list leads (sorted desc, ?limit=)
- **DB**: MongoDB `demo_leads` collection.

## User Personas
- **Konstruktionsleiter / Engineering Manager** at mid-size manufacturing companies (Maschinen-/Werkzeugbau, Blechfertigung) evaluating an ERP that integrates with SolidWorks.
- **IT-Lead** scoping a unified PDM/ERP/Mail solution for Microsoft 365 environments.
- **CEO / Geschäftsleitung** of a 20–200 head fabricator wanting to retire 3 disconnected tools.

## Core Requirements (static)
- Convey the breadth of an ERP/PDM/Planung suite without overwhelming visitors.
- Showcase real-looking interactive mockups (mails, kanban, BOM, POs, dashboard, AI council) — clickable, no login.
- Explain the PartId data model (the unique selling point).
- Communicate single all-inclusive price (50 €/seat/month).
- Capture demo requests via a contact form.
- 100 % German UI.

## What's Been Implemented (2026-06-21)
- Hero with blueprint background, big "Von der Konstruktion bis zur Fertigung" headline, live PartId schema box, ticker marquee with USPs.
- Blitz-Suite Bento (Herpert featured dark, Blitz Post/Brett/Fips/Paul/Klaus/Meute + Manifest filler).
- 5-step process pipeline (Konstruktion → PDM → Stückliste → Beschaffung → Produktion).
- Interactive demo with 6 tabs:
  - **Blitz Post** — email triage with state (read/replied/starred counters + reset).
  - **Brett** — 4-column kanban with PartId, status badges.
  - **Stückliste** — BOM tree with indented PartIds & status codes.
  - **Bestellungen** — PO table with status pills (OFFEN/UNTERWEGS/ANGEKOMMEN).
  - **Dashboard** — KPI grid + manufacturing-order progress bars + machine status.
  - **Meute KI** — AI council chat mock with input.
- 12-module grid with lucide icons.
- PartId data model section (blueprint dark): segments, lifecycle status table, 8 class families.
- Auto-rotating DE / EN / HU translation showcase.
- SolidWorks Task Pane mockup.
- Pricing block with massive "50 €" typography.
- Contact form → `POST /api/leads` (axios) with success / error UI.
- Footer with columns + language indicator.

## Tests
- Backend pytest: 9/9 green (`/app/backend/tests/test_landing_api.py`).
- Frontend Playwright flows: 24/24 deterministic checks green (nav, hero, all 6 demo tabs, email actions+reset, contact submit).

## Backlog (P1 / P2)
- P1 Split `Landing.jsx` (≈ 1 240 lines) into per-section files for maintainability.
- P1 Add basic rate-limit / honeypot to `POST /api/leads` (public form).
- P2 Add a real BOM tree expand/collapse + price calculator.
- P2 Add an SEO `<Helmet>` block (title, description, OpenGraph) and a `sitemap.xml`.
- P2 Add an admin view at `/admin/leads` for the team.
- P2 i18n switch (DE/EN/HU) for the whole page, not just the showcase.
- P2 Replace static screenshots/mockups with real preview clips/lottie.

## Next Tasks
- Decide which P1/P2 to pull next, or extend to an actual clickable product demo (e.g. PDM detail view, RFQ-Portal stub).
