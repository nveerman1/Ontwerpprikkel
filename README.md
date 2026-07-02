# OntwerpPrikkel

OntwerpPrikkel is een Next.js MVP die Nederlandstalige ontwerpuitdagingen genereert voor O&O/Technasium en techniekonderwijs.

## Scripts

```bash
npm run dev
npm run format
npm run lint
npm run typecheck
npm test
npm run build
npm run e2e
```

## MVP-functionaliteit

- Filterbalk met Type, Richting, Randvoorwaarde, Slotjes wissen, Reset filters, Nieuwe uitdaging, Maak beter, Kopieer, Bewaar.
- Grote ontwerpzin met lock- en refresh-controls per segment.
- Werkvormrail rechts op desktop, onder de zin op kleinere schermen.
- Werkvormpicker met categorieën en compacte werkvormkaart.
- Opslaan, hergebruiken, kopiëren en verwijderen van ideeën via localStorage (`ontwerpprikkel.savedIdeas.v4`).
- Clipboard-fallback en toastmeldingen.

## Deployment

OntwerpPrikkel wordt gedeployed via Vercel Hobby.

- Pull requests krijgen een Vercel Preview Deployment.
- Merges naar `main` deployen naar productie.
- GitHub Actions draaien format, lint, typecheck, unit tests en build.
- E2E tests draaien in GitHub Actions op pull requests en `workflow_dispatch`.
- Het domein blijft bij TransIP; DNS verwijst naar Vercel.

## PWA-installatie

OntwerpPrikkel is in fase 1 PWA-ready gemaakt met een App Router manifest,
app-iconen en installable metadata. De app kan daardoor door Chrome en Edge als
installeerbare app worden herkend wanneer hij via HTTPS of `localhost` draait.

Offline ondersteuning is bewust nog niet toegevoegd in deze fase. Er is dus nog
geen service worker, offline caching of push-notificatiefunctionaliteit.

Handmatig controleren:

```bash
npm run build
npm run start
```

- Open de productiebuild in Chrome of Edge.
- Controleer DevTools -> Application -> Manifest.
- Draai een Lighthouse/installability check.
- Installeer de app via de browser wanneer de install prompt beschikbaar is.

## Branch protection advies (`main`)

- Pull request verplicht vóór merge.
- Required status checks:
  - `Quality checks`
  - `E2E tests` (alleen required maken als stabiel/snel)
  - `Dependency review`
  - `Analyze JavaScript/TypeScript`
- Direct pushen naar `main` blokkeren.
- Squash merge gebruiken.
- Branch verwijderen na merge.
- Conversation resolution verplicht (indien beschikbaar).
- Require branches to be up to date before merging (indien werkbaar).
