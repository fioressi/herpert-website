@AGENTS.md

## Deploy

Die Site läuft auf **Azure Static Web Apps** (Free Tier, West Europe).

```bash
./deploy.sh   # baut → holt Token → deployed zu Azure
```

- App: `herpert-website`, Resource Group: `resource_grp`
- URL: https://herpert.com (Custom Domain) / https://delightful-sand-06386eb03.7.azurestaticapps.net
- Next.js Static Export (`output: "export"`) → kein Server nötig
- Nach jedem `./deploy.sh` ist die Site live (~1 min)

## Round Table

Der RT läuft separat auf `rt.herpert.com` — nichts davon hier anfassen.
