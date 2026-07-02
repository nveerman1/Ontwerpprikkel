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
- Opslaan, hergebruiken, kopiëren en verwijderen van ideeën via localStorage (`ontwerpprikkel.savedIdeas.v5`).
- Clipboard-fallback en toastmeldingen.

## Deployment

OntwerpPrikkel wordt gedeployed via Vercel Hobby.

- Pull requests krijgen een Vercel Preview Deployment.
- Merges naar `main` deployen naar productie.
- GitHub Actions draaien format, lint, typecheck, unit tests en build.
- E2E tests draaien in GitHub Actions op pull requests en `workflow_dispatch`.
- Het domein blijft bij TransIP; DNS verwijst naar Vercel.

## PWA-installatie en offline gebruik

OntwerpPrikkel is in fase 1 PWA-ready gemaakt met een App Router manifest,
app-iconen en installable metadata. De app kan daardoor door Chrome en Edge als
installeerbare app worden herkend wanneer hij via HTTPS of `localhost` draait.

Fase 2 voegt offline ondersteuning toe met een eenvoudige service worker in
`public/sw.js`. Na minimaal één online bezoek cachet de app de startpagina,
het manifest, de PWA-iconen en benodigde Next/static assets. Daardoor kan
OntwerpPrikkel offline opnieuw openen en blijft de generator client-side
bruikbaar. Opgeslagen ideeën blijven via de bestaande localStorage-opslag
werken.

Er zijn bewust geen push notifications, background sync of externe PWA-library
toegevoegd.

Handmatig controleren:

```bash
npm run lint
npm run typecheck
npm run build
npm run start
```

- Open de productiebuild in Chrome of Edge terwijl je online bent.
- Controleer DevTools -> Application -> Manifest.
- Controleer DevTools -> Application -> Service Workers: `/sw.js` is actief.
- Controleer DevTools -> Application -> Cache Storage: `ontwerpprikkel-app-v1` is gevuld.
- Zet DevTools -> Network op Offline en herlaad de pagina.
- Controleer dat OntwerpPrikkel opent, Nieuwe uitdaging werkt en opgeslagen ideeën beschikbaar blijven.
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
