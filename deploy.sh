#!/usr/bin/env bash
# Deploy herpert.com to Azure Static Web Apps.
# Requires: az CLI logged in, Node 20+.
set -euo pipefail

RG="resource_grp"
APP="herpert-website"

echo "→ Building static export…"
npm run build

echo "→ Fetching deployment token…"
TOKEN=$(az staticwebapp secrets list --name "$APP" --resource-group "$RG" --query "properties.apiKey" -o tsv)

echo "→ Deploying ./out to production…"
npx --yes @azure/static-web-apps-cli@latest deploy ./out --deployment-token "$TOKEN" --env production

echo "✓ Done — https://delightful-sand-06386eb03.7.azurestaticapps.net"
