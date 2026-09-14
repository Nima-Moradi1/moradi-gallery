# Architecture

## Current implementation

Next.js App Router renders each locale statically where possible. src/proxy.ts uses next-intl locale routing; / redirects to /fa. Invalid locale segments fail closed through notFound(). Route parameters are awaited. Translation types derive from the English message shape. Both dictionaries share keys.

The page itself remains a Server Component. Its initial composition is HeroExperience, BrandManifesto, and CollectionIntroduction. The latter two are foundational content scaffolds, not the finished cinematic sections. SiteHeader and SiteFooter are server-rendered. LocaleSwitch and MobileNavigation are client islands. The native dialog handles modal focus and Escape; Motion is reserved for UI transitions.

## Future seams

src/types/watch.ts defines the product boundary. src/content/business.ts intentionally contains no confirmed brands, warranty, or contact URL. A CMS can replace typed content without changing the presentation layer. No auth, checkout, payment, API, or data collection is in this phase.

The WebGL feature should be a client-only dynamic import behind the server hero image, never imported at layout or page scope. GSAP will write normalized progress to refs. Future SceneController owns object/camera state. R3F useFrame can consume it without React re-renders. Add one canvas, measured DPR tiers, error fallback, document-visibility handling, and an offscreen render pause.

## Sources checked

- https://nextjs.org/docs/app/getting-started/installation
- https://next-intl.dev/docs/routing/setup
- https://tailwindcss.com/docs/functions-and-directives

Versions are the installed package versions, not assumptions from the brief. See package.json and IMPLEMENTATION_STATUS.md.
