# josebayon

Personal portfolio of Jose Bayón: **Astro 7 + Tailwind 4**, built to `dist/` and served by
Vercel. No backend, no database, no serverless.

Generated from the `static-template` skeleton, which is where the folder layout, tooling, CI
and security headers come from. The conventions that govern the code live in `CLAUDE.md`.

## Requirements

Node 22.12+ (Astro 7 refuses to start below it). `.nvmrc` pins the version CI uses.

## Getting started

```bash
npm ci
npm run dev          # http://localhost:4321
```

## Scripts

```bash
npm run dev          # dev server
npm run sync         # regenerate .astro/types.d.ts after adding content collections
npm run typecheck    # astro check (types inside .astro included)
npm run lint         # eslint + prettier --check
npm run format       # prettier --write
npm run build        # astro check && astro build  <- what Vercel runs
npm run build:fast   # astro build only
npm run preview      # serve dist/ locally
```

## Structure

```
public/            static assets served as-is (favicon, robots, og images)
src/
├─ assets/         images processed by <Image>
├─ components/
│  ├─ ui/          reusable, knows nothing about the site
│  ├─ layout/      header, footer, theme toggle
│  └─ sections/    page blocks
├─ content/        markdown collections (add src/content.config.ts to define them)
├─ layouts/        page shells
├─ lib/            site config and helpers
├─ pages/          routes
└─ styles/         global.css with the @theme tokens
scripts/           setup-github.sh · ruleset-main.json
```

Two rules keep this from degrading:

- **All copy and links come from `src/lib/site-config.ts`**, validated with Zod when the
  module is first imported. Changing content means editing that file, not the components.
- **Pages are pure composition.** `src/pages/index.astro` imports a layout and a few
  sections and carries no markup of its own.

Folders still carrying a `.gitkeep` are empty; delete it as soon as one gets a real file.

## Deployment

Vercel builds on merge to `main` and creates a preview per PR. `vercel.json` carries the
security headers and the `cleanUrls` / `trailingSlash` settings that must stay coherent with
`astro.config.ts`.

`site` in `astro.config.ts` still points at the free Vercel subdomain. Pointing a real domain
at the project means updating that value too — it is what feeds every canonical URL.
