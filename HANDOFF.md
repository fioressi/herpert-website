# Handoff — herpert.com Marketing-/Demo-Website

Du übernimmst eine Marketing-/Demo-Website für **HERPERT**, das ERP-System
(PDM + SolidWorks-Anbindung + Blitz Email-Client) aus dem fioressi-Ökosystem.

## Stand & Fakten
- **Projekt:** Next.js 15 (Static Export, `output: "export"`), Tailwind v4, TypeScript
- **Lokal:** `/Users/matthausunger/herpert-website`
- **Repo:** github.com/fioressi/herpert-website (Branch `main`)
- **Live:** https://delightful-sand-06386eb03.7.azurestaticapps.net
- **Hosting:** Azure Static Web App `herpert-website`, RG `resource_grp`, West Europe, Free
- **Deploy:** `./deploy.sh` (npm run build → Token via `az` → SWA CLI deploy)
  - ⚠️ GitHub Actions geht **nicht** (OAuth-Token ohne `workflow`-Scope) → Deploy nur manuell über `./deploy.sh`
- **Design:** Dark Navy Theme, Cyan-Accent `#66d9ef`, Glassmorphism, Inter Font

## Sprachen
3-sprachig **DE/EN/HU**. Alle Texte in `app/translations.ts` (`T[lang]`).
Sprachumschalter 🇩🇪🇬🇧🇭🇺 im Header. `/app` ist bewusst DE-primär (wie echtes Blitz).

## Seitenstruktur (`app/page.tsx`)
Hero → Workflow → Module → **PDM-Logik** (`app/PdmAnatomy.tsx`: PartId-Anatomie,
Class-Codes, Status-Lifecycle) → **Demo** (eingebettetes `app/BlitzDemo.tsx` =
`WorkspaceDemo` mit Views in `app/demo/*`) → Übersetzung → SolidWorks → **Preis**
(50 €/Arbeitsplatz/Monat) → CTA → Footer.

## Vollbild-App (`app/app/page.tsx`, Route `/app`)
Originalgetreuer Klon des echten HERPERT/BLITZ: Banner mit Tabs
**Post/Termine/Brett/Herpert**, 3-Spalten-Post-Layout, Herpert-Modul-Launcher +
Auftrags-Dashboard mit KPIs, Brett (6 Lanes), Termine-Kalender, Arbeitsablage-Footer.
Hero-Button „Live Demo" verlinkt hierhin.

## ⚠️ WICHTIG: Daten
**ALLE Daten sind frei erfunden** (öffentliche Seite!). Konsistente Besetzung seitenweit:
- **Firmen:** Nordmetall GmbH, Präzitec Kft., FeinTech Kft., Stahlwerk Auer AG
- **Personen:** Lena Hofer, Marek Kovács, Tobias Reiner, Sofia Brandt, Alex Berger
- **Projekte:** P26-014 Förderband V2, P26-009 Greifmodul X3, P25-103, P26-021
- **Belege:** PO-2026-0021/0018, RFQ-2026-034, R-2026-0188; Part-IDs `H-7206-14021-90`
- **PDM-Firmenbeispiel:** „Helios Werk" (NICHT echte Namen verwenden!)

KEINE echten Kunden/Personen/Projektnamen einbauen. Die **Struktur/Nomenklatur**
ist echt (aus `/tmp/group-pdm` SCHEMA.md: PartId-Aufbau, Class-Code-Ranges,
Status-Lifecycle COTS→DOV→NPD→NPI→Ramp-Up), die **Werte** sind fiktiv.

## Referenz-Repos (geklont unter `/tmp`, read-only zum Nachbauen)
`/tmp/blitz`, `/tmp/group-pdm`, `/tmp/group-pdm-solidworks-addin`
- Echtes Blitz läuft auf `blitz.herpert.com` (MSAL-Login, **nicht** iframe-bar)
- `pdm-api` (pdm-api.azurewebsites.net) braucht Bearer-Token
- Prod-DB `PDM_db` auf `neutronzenker`/RG `TRC` — **nicht** direkt abfragen (nur über Doku/Repos lesen)

## Offene Aufgaben (Auswahl, Prio frei)
1. Custom Domain `herpert.com` auf die SWA verknüpfen (`az staticwebapp hostname`,
   dann DNS-Records TXT+CNAME zum Eintragen ausgeben).
2. PO-Detail-Slide-in (rechtes Panel mit Positionen-Tabelle) in `/app` — sehr markant im echten Blitz.
3. RFQ-Lieferantenseite (öffentliche Angebots-Eingabe) als Demo nachbauen.
4. Panel-Klicks in `/app` funktional machen (Projekt klicken → Inbox filtert).
5. Feinschliff Look gegen echte Screenshots.

## Arbeitsweise
Nach Änderungen: `npm run build` (TS-Check) → `./deploy.sh` → committen+pushen.
Daten immer fiktiv halten. Bei LLM-Themen: aktuelle Claude-Modelle
(Opus 4.8 `claude-opus-4-8`, Sonnet 4.6, Haiku 4.5).
