# Moradi Gallery — Implementation Status

Last updated: 2026-09-14
Current branch: moradi-gallery
Current commit: recorded in the categorized initial project history
Current owner/agent: Codex

## Active refinement — 2026-09-13

User requested the entire project be refined against the WebGL animation parity override. The prior static starter does not meet that request. Full source checkpoint: thread work/moradi-before-webgl-20260913.tar.gz. No commits existed at checkpoint.

### WebGL parity scoreboard

Reference animations observed: audit in progress
Implemented desktop: source implementation present; visual parity not yet freshly compared
Implemented mobile: source implementation present; visual parity not yet freshly compared
Reverse-scroll verified: structural assembly cycles pass; browser reverse-scroll comparison remains pending
Visually matched: 0 (no unsubstantiated parity claim)
Blocked by asset limitations: no current blocker to source validation
Remaining: reference comparison, profiling, and editorial completion
3D parity gate: INCOMPLETE
Current focus: The Watch WebGL parity

The sections below describe the preserved baseline, not the new completion state.

## 1. Objective

The user requested creation of the repository on the Desktop and starting work there. The local repository, bilingual foundation, initial reference audit, and first static hero are now implemented and verified. The supplied master brief describes the larger phased target; this initial setup is not completion of the full production website.

## 2. Architecture snapshot

- Repository: /Users/nima/Desktop/moradi-gallery
- Next.js: 16.3.5, App Router
- React / React DOM: 19.2.8
- TypeScript: 6.0.3, strict
- Tailwind: 4.3.3, @tailwindcss/postcss
- i18n: next-intl 4.14.4, /fa default and /en alternate
- Fonts: Manrope and Vazirmatn via next/font/google
- GSAP: 3.15.0, @gsap/react 2.1.2 (installed for later phases)
- Three: 0.186.0, R3F 9.7.0, Drei 10.7.8 (installed, no current canvas)
- Motion: 13.2.0 (isolated mobile navigation)
- State: local UI state only
- Rendering: server composition with small locale/menu client islands
- Deployment: none; production preview at http://127.0.0.1:3000/fa

React 19.3 and TypeScript 7 were initially resolved, then replaced with compatible versions after peer and lint failures. ESLint 9.39.5 matches the current Next.js plugin peer ranges; it is pinned and its upstream deprecation is a future toolchain maintenance item. pnpm peers check now reports no conflicts. Host validation used Node 23.10.0; Node emits an experimental type-stripping build warning. Application browser logs were clean.

## 3. Reference fidelity

### Moto reference captured

- [x] Desktop hero at 1440 × 900
- [x] Sampled hero transition / manifesto / product sequence
- [x] Sampled mid-page values / concierge / lifestyle / categories / network
- [x] FAQ and final CTA/footer
- [x] Initial mobile hero/story snapshots
- [ ] Full mobile section-by-section geometry and timing audit

Live Moto now opens with a card on a podium, unlike the globe-centered opening described in the supplied brief. See docs/reference/REFERENCE_AUDIT.md. Capture filenames indicate approximate sequence positions, not certified animation timings.

### Known implementation differences

The Moradi hero is original generated watch artwork with real HTML text and a first-pass SVG monogram. Typography uses actual Manrope/Vazirmatn metrics. Persian gets its own responsive scale. Mobile uses a centered crop with an edge fade, stacked support/action, and modal navigation. The two lower informational sections are foundation content, awaiting final editorial art direction. No exact Moto internals or completed reference-grade motion are claimed.

## 4. Completed

- [x] Local repository initialized at the requested Desktop path; categorized initial history established on moradi-gallery; no deployment.
- [x] Supplied brief preserved unmodified in docs/brief.
- [x] Initial live reference audit and screenshot folders.
- [x] Next.js strict TypeScript, pinned compatible packages, lint and formatting configuration.
- [x] Bilingual server-rendered routes, localized metadata, direction and fonts.
- [x] Reusable color/spacing/type/motion/z-index tokens and CVA primitives; globals.css has Tailwind bootstrap only.
- [x] Original concept, original standalone fictional watch artwork, SVG mark, optimized static hero.
- [x] Locale switch, native modal navigation, Escape dismissal, focus return, working section anchors.
- [x] Preview noindex metadata/robots, localized error/loading components, typed product/business boundaries.
- [x] Build, lint, types, formatting, peer compatibility, HTTP route checks, browser behavior, and initial visual comparison.
- [x] Original Calibre M GLB, node inventory, asset build/verification scripts, staged assembly, material finishes, GSAP narrative timeline, and a client-only R3F scene with quality/fallback handling.

## 5. Current focus

- Task: validate and refine the implemented WebGL watch narrative against the observed reference.
- Why now: the original model, progressive client boundary, scroll timeline, fallback, and device quality handling are present in source; visual parity and runtime behavior need fresh browser evidence.
- Files: src/features/experience3d; public/models/moradi-calibre-m.glb; docs/reference/the-watch; docs/ASSET_MANIFEST.md.
- Expected outcome: a stable first frame, graceful fallback, and measured quality tiers with independently checked desktop and mobile storytelling.
- Validation: pnpm check, pnpm verify:watch, plus browser comparison against docs/design/hero-concept.png and current QA captures.
- Visual reference: docs/qa/hero-en-1586.png and docs/qa/hero-fa-1440.png.

## 6. Next tasks

1. [ ] Compare desktop and mobile scene composition, camera travel, staging, and reverse scrolling against the documented reference sequence.
2. [ ] Run Safari/WebKit and automated end-to-end coverage; complete asset, Lighthouse, FPS/memory, and bundle profiling.
3. [ ] Complete the remaining global curation, concierge, lifestyle, interactive collection, brand, finder, FAQ, and final CTA sections.
4. [ ] Confirm real products, offered brands, business contact, warranty and delivery/returns policies before publishing claims.
5. [ ] Set the real production origin, canonical/hreflang/sitemap and launch metadata; publish only when requested.

## 7. Blockers

No blocker to the completed foundation or the current 3D source. The real product catalog, business policies/contacts, and lifestyle assets have not been supplied. Do not fabricate missing business details or represent original concept artwork as real inventory.

## 8. Assets

### Ready

- docs/design/hero-concept.png: original concept, 1586 × 992.
- docs/design/moradi-watch-source.png: original edited image source.
- public/images/hero/moradi-watch.webp: 1585 × 992, 44,990 bytes.
- public/brand/monogram.svg and src/app/icon.svg: first-pass geometric M.
- public/models/moradi-calibre-m.glb: original separable model; see docs/3d/model-metrics.json and docs/3d/WATCH_NODE_INVENTORY.md.
- docs/reference: internal comparison screenshots only.

### Missing

Additional mobile-specific art direction, final environment/texture treatment, lifestyle sequence, and confirmed stock imagery.

## 9. 3D scene status

Implemented in source: a client-only R3F canvas, original Calibre M GLB, lighting, scroll-controlled camera and staged assembly, readiness/error fallback, reduced-motion behavior, and device quality tiers. `pnpm verify:watch` passes 200 interrupted/reverse assembly cycles and keyframe checks. Fresh browser visual comparison and runtime profiling remain pending; do not claim reference parity yet.

## 10. Motion status

GSAP owns the persistent scroll choreography in the 3D watch experience; Motion owns the small menu content transition; native dialog owns focus/inertness/Escape. Quality and reduced-motion paths are implemented in source. Comprehensive browser reduced-motion and reverse-scroll visual checks remain pending.

## 11. i18n / RTL status

Persian and English routes verified. Persian uses Vazirmatn, RTL and natural shaping; English uses Manrope and LTR. Both dictionaries have the same 28 keys. H1 text includes a real separating space across its block-level lines. Locale switching verified in browser. Product reference display is not yet implemented.

## 12. Responsive QA

| Viewport    | EN                 | FA               | Horizontal overflow | Evidence                       |
| ----------- | ------------------ | ---------------- | ------------------- | ------------------------------ |
| 1920 × 1080 | Rendered           | Rendered         | None observed       | Browser geometry/capture       |
| 1586 × 992  | Concept comparison | n/a              | None observed       | Native concept-size screenshot |
| 1440 × 900  | Rendered           | Visually checked | None observed       | Desktop captures               |
| 1366 × 768  | Rendered           | Rendered         | None observed       | Browser geometry/capture       |
| 1024 × 1366 | Rendered           | Rendered         | None observed       | Browser geometry/capture       |
| 430 × 932   | Rendered           | Rendered         | None observed       | Browser geometry/capture       |
| 390 × 844   | Rendered           | Visually checked | None observed       | Mobile capture/menu check      |
| 360 × 800   | Visually checked   | Rendered         | None observed       | Mobile capture                 |

These are in-app browser checks, not physical-device or Safari certification. See docs/qa/FOUNDATION_QA.md for scope.

## 13. Performance measurements

- Production build: passed (final source).
- Lint, type checking, formatting: passed.
- Peer dependencies: no conflicts.
- Hero source WebP: 44,990 bytes (~44 KiB).
- Initial JS / 3D chunk / LCP / CLS / INP / FPS: not measured.
- GLB and 3D texture payload: included; runtime payload and memory impact not yet benchmarked.
- Browser console: no warnings/errors in inspected preview session.

## 14. Bugs / fidelity ledger

Resolved in this work block: unsupported dependency versions; anonymous PostCSS export lint warning; mobile image crop/edge seam; English title tracking/support size; Persian title-to-watch spacing; H1 text separation; image optimizer quality allowlist. Full cinematic/reference fidelity, detailed mobile reference timing, production stock, remaining sections, and performance certification remain open by phase.

## 15. Commands

```sh
cd /Users/nima/Desktop/moradi-gallery
pnpm install --frozen-lockfile
pnpm dev
pnpm check
pnpm peers check
pnpm build
pnpm start
```

The current preview was launched with pnpm start on 127.0.0.1:3000. It serves the most recent production build. For editing, stop that owned preview process and use pnpm dev, or rebuild and restart. Do not terminate unrelated services.

## 16. Resume here

The Desktop repo, categorized initial history, bilingual foundation, static fallback, and source-level WebGL watch narrative are implemented. Open this status file, then `src/features/experience3d/MoradiWatchExperience.tsx`, `src/features/experience3d/WatchScene.tsx`, and `docs/ASSET_MANIFEST.md`. Run `pnpm check` and `pnpm verify:watch` before extending the project. Compare desktop and Persian/mobile layouts separately against the documented reference frames; do not claim parity before those captures exist. Do not re-scaffold, replace the generated artwork with reference-site media, or treat the catalog preview as confirmed inventory. Editorial sections and production validation remain future phases.
