# Foundation QA

Verified 2026-09-13 against the local production preview, using the Codex in-app browser (no Playwright/CLI fallback needed).

## Scope

This pass verifies the repository foundation and static opening view. It does not certify the full master brief, WebGL, completed commerce behavior, Safari, Core Web Vitals, or final brand identity.

## Functional evidence

- pnpm check: lint, typegen/TypeScript, formatting passed.
- pnpm build: both /fa and /en statically rendered successfully.
- pnpm peers check: no peer dependency issues.
- HTTP: root redirects to /fa; /fa and /en return 200 with correct lang/dir and preview noindex; missing route returns 404; hero WebP returns 200.
- Browser: locale switch changes language and direction; Vazirmatn and Manrope applied; menu opens; Escape closes it and restores focus; selecting Collections closes the dialog and scrolls to its section (observed top offset 48px).
- No browser warnings/errors in the inspected session.
- No document horizontal overflow observed at the viewport sizes in responsive-results.json. Image readiness checked. Captured sizes are not physical-device certification.

## Visual comparison

Agent-selected first-pass concept: docs/design/hero-concept.png, 1586 × 992. It has not been presented as user-approved final branding. Captures use the in-app browser screenshot API. The concept and final English desktop/mobile and Persian desktop/mobile images were inspected with view_image at original detail.

| Comparison point   | Evidence / outcome                                                                                                                                                                                   |
| ------------------ | ---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| Copy               | Hero heading, navigation, support, and CTA match the concept's allowed English strings. No added hero eyebrow, claims, badges, or product metrics. Persian translations are intentional.             |
| Composition        | Centered two-line headline above the lower-center watch; bottom support/action; spacious dark field. Preserved through real HTML and a separate product image.                                       |
| Typography         | Manrope and Vazirmatn use next/font. English tracking adjusted after comparison. Persian scale and line-height reduced independently to preserve the gap above the watch. No Persian letter spacing. |
| Palette            | Brief's obsidian/ivory/gold tokens retained; no tint over the watch. Mobile edge fade blends the image bounds.                                                                                       |
| Asset              | Original generated black-dial/gold-case/leather-strap watch, matching perspective; converted to local WebP. Page text and navigation removed from the asset.                                         |
| Controls / spacing | Locale underline, thin arrow, minimum touch targets, full-screen native dialog. Mobile support and CTA stack; focus is visible.                                                                      |
| Responsiveness     | 360px English hero text and 390px Persian shaping visually checked; no document overflow in all tested dimensions.                                                                                   |

## Intentional differences / remaining work

The SVG mark simplifies the raster concept into clean geometry. Real font metrics differ slightly from generated lettering. Mobile uses an intentional crop, edge fade, alternate type scale and modal menu. Lower sections are foundational informational content, not final section concepts. The opening has been checked for faithful composition against the selected concept; no claim of completed full-site 10/10/reference-grade fidelity is made. Source model, WebGL, full scroll story, remaining sections, real catalog, production metadata and performance testing remain unfinished.

## Artifacts

- hero-en-1586.png: opening at the concept's native size.
- hero-en-360.png: English mobile.
- hero-fa-1440.png: Persian desktop.
- hero-fa-390.png: Persian mobile, including verified focus styling.
- responsive-results.json: observed viewport/language/image/overflow checks.
