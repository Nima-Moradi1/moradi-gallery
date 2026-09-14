# Moradi Gallery / گالری مرادی

A bilingual luxury watch-gallery experience, started locally on the Desktop from the supplied brief.

## Current scope

The repository contains the Next.js foundation, Persian/English routes, reusable Tailwind primitives, an original static hero, and initial reference captures. This is a local design preview. WebGL, the full editorial sequence, watch finder, stock data, business policies, and production QA remain future phases. Read [IMPLEMENTATION_STATUS.md](IMPLEMENTATION_STATUS.md) first when resuming.

## Run locally

```sh
cd /Users/nima/Desktop/moradi-gallery
pnpm install
pnpm dev
```

Open http://localhost:3000/fa or http://localhost:3000/en. The default route redirects to Persian. Node.js 22 or newer and pnpm 11.24.0 are declared in package.json.

```sh
pnpm check
pnpm build
pnpm start
```

Dependencies are pinned in package.json and pnpm-lock.yaml. Local dev and preview bind to the loopback interface. No credentials are needed for this first phase.

## Architecture

- Server-rendered page sections in src/features/home/sections.
- Locale validation, localized metadata, and font direction in src/app/[locale]/layout.tsx.
- next-intl messages in messages/fa.json and messages/en.json.
- Design tokens and reusable component variants in src/design-system.
- Tailwind bootstrap only in globals.css; TypeScript tokens configured through tailwind.config.ts.
- UI interaction isolated to locale switching and the mobile menu.
- Future 3D dependencies are installed but are not imported by the initial shell.

## Assets and publication

The illustrated watch is an original generated design concept, not confirmed inventory. No third-party product data or reference-site media is served by the application. See docs/ASSET_MANIFEST.md. Search indexing is disabled for this preview. Configure confirmed business content, canonical origin, metadata, and robots before publishing. There is no remote repository or deployment yet.
