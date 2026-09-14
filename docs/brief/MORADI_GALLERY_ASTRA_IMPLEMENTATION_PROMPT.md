# MORADI GALLERY — MASTER ASTRA / CODEX IMPLEMENTATION PROMPT
## Reference-fidelity luxury watch experience inspired by Moto Card, re-authored for گالری مرادی

**Project:** Moradi Gallery / گالری مرادی  
**Primary framework:** Next.js App Router + TypeScript  
**Styling:** Tailwind CSS through a reusable design system  
**3D:** Three.js through React Three Fiber + Drei  
**Scroll choreography:** GSAP + ScrollTrigger  
**Local UI motion:** Motion for React (`motion/react`) only where it is the correct tool  
**Languages:** Persian (`fa`, RTL) and English (`en`, LTR)  
**Persian typeface:** Vazirmatn  
**Brand direction:** modern, quiet luxury; obsidian/black + restrained modern gold  
**Reference experience:** https://www.moto-card.com  
**Commerce/content reference:** https://www.javaherian-gallery.com  
**Target brand name:** `گالری مرادی` / `MORADI GALLERY`

---

# 0. READ THIS FIRST — YOUR ROLE AND NON-NEGOTIABLE GOAL

You are the senior creative developer, senior frontend architect, WebGL engineer, interaction designer, performance engineer, and QA owner for this project.

Your job is **not** to make a generic luxury-watch landing page.

Your job is to build a production-quality, highly responsive, bilingual luxury-watch experience that captures the **composition, pacing, scroll choreography, cinematic 3D feeling, restraint, visual hierarchy, motion quality, and premium interaction model** of the live Moto Card reference, while translating that experience into an **original Moradi Gallery watch brand**.

The implementation must feel like one coherent creative system rather than a collection of unrelated sections.

The experience should evoke:

- quiet luxury rather than loud luxury;
- premium editorial art direction;
- controlled movement rather than constant movement;
- large negative space;
- macro product cinematography;
- real depth;
- precise typography;
- deliberate scroll timing;
- luxurious black and warm metallic gold;
- fast initial shell rendering;
- progressively enhanced 3D;
- excellent touch behavior;
- no jank;
- no layout shifts;
- no template-like card grids;
- no visually cheap glow effects;
- no generic “gold gradient everywhere” treatment.

The result must be **originally branded for Moradi Gallery**. Do not reuse Moto logos, Moto text, Moto proprietary imagery, Moto downloadable assets, or Javaherian logos. Use those websites as behavioral/content/market references only.

---

# 1. PUBLIC REFERENCE AUDIT — WHAT IS VERIFIED VS WHAT IS AN IMPLEMENTATION DECISION

This section exists so that you do not turn assumptions into facts.

## 1.1 Verified or strongly supported observations about Moto

As of the project brief date, public inspection supports the following:

1. `moto-card.com` is delivered with Webflow infrastructure/assets; public assets are served from Webflow CDN infrastructure such as `cdn.prod.website-files.com`.
2. Properly Studio publicly identifies Moto as a branding/web project and lists services including:
   - Branding
   - UX/UI
   - Design Systems
   - Web Design
   - Webflow Development
   - Motion Design
   - 3D Design
3. Moto Card is listed by Mesh3D, a curated Three.js/WebGL showcase, as a real-time 3D web experience.
4. Moto Card is also listed in Mesh3D's GSAP technology collection.
5. The current Moto homepage publicly exposes a section sequence approximately resembling:
   - compact global navigation;
   - cinematic hero with an oversized statement;
   - introductory “infrastructure” statement;
   - large visual/product transition;
   - global-spend feature section with animated distributed values;
   - concierge section;
   - repeated capability labels;
   - full-bleed lifestyle imagery;
   - a numbered category/benefits sequence;
   - partner/network section;
   - extensive FAQ;
   - final CTA;
   - restrained footer.
6. Public visual previews show an extremely dark hero, large uppercase text, a central 3D/global object and floating status-like UI callouts.

Useful reference URLs:

- https://www.moto-card.com
- https://properly.studio
- https://mesh3d.gallery/websites?tech=gsap
- https://mesh3d.gallery/websites?tags=Fintech

## 1.2 Things that are NOT confirmed from public evidence

Do **not** state these as reverse-engineered facts:

- exact original camera position/FOV values;
- exact original GLTF hierarchy;
- exact shader code;
- exact post-processing stack;
- whether the production Moto site uses React Three Fiber rather than vanilla Three.js;
- whether Moto uses Framer Motion / Motion for React;
- whether Moto uses Lenis;
- exact easing curves used internally;
- exact source-code architecture.

For Moradi Gallery, we will use a technically appropriate implementation stack that reproduces the **visible behavior**, not pretend to possess Moto's source code.

## 1.3 Required implementation choice for Moradi

Use:

- Next.js App Router;
- React + TypeScript;
- Three.js via `@react-three/fiber`;
- `@react-three/drei`;
- GSAP + ScrollTrigger for timeline-driven scroll choreography;
- `@gsap/react`;
- Motion for React (`motion/react`) for isolated React UI transitions such as:
  - mobile navigation,
  - locale switcher,
  - FAQ open/close transitions,
  - route/local UI fades,
  - tiny non-scroll UI state transitions;
- Tailwind CSS;
- `next-intl` or a comparably robust App Router-compatible i18n solution;
- `next/font`;
- `class-variance-authority`;
- `clsx`;
- `tailwind-merge`.

Optional, only if testing proves it improves rather than harms the experience:

- `lenis` for desktop precision/smoothness;
- `@react-three/postprocessing` for very restrained effects;
- Zustand for minimal shared UI/experience state.

### Important animation ownership rule

Never allow GSAP, Motion and React state to fight over the same transform or opacity.

Use this ownership model:

| Concern | Owner |
|---|---|
| scroll-linked DOM transforms | GSAP / ScrollTrigger |
| pinned storytelling timelines | GSAP / ScrollTrigger |
| 3D camera transforms | GSAP writing to refs or normalized scene state |
| 3D object transforms | GSAP/ref-based scene controller + R3F |
| shader time | R3F `useFrame` |
| menu open/close | Motion |
| FAQ micro-transition | Motion |
| button hover | Tailwind CSS first; Motion only when necessary |
| route-level loading | Next.js + component state |
| transient 60fps values | refs, never React state per frame |

---

# 2. BEFORE WRITING APPLICATION CODE — PERFORM A LIVE REFERENCE CAPTURE

Do not guess the reference composition from memory.

Before implementing the home page, use the available browser/browser-automation tooling and inspect:

- https://www.moto-card.com
- https://www.javaherian-gallery.com

Create:

```text
docs/
  reference/
    REFERENCE_AUDIT.md
    moto/
      desktop/
      mobile/
    javaherian/
      desktop/
      mobile/
```

Capture Moto at a minimum at:

- initial hero;
- approximately 25% through hero transition;
- first major 3D/product transition;
- global-values section;
- concierge section;
- transition into image/lifestyle content;
- numbered category section;
- partner/network section;
- FAQ;
- final CTA/footer.

Capture:

- desktop 1440×900;
- desktop 1920×1080 if practical;
- mobile 390×844 or closest available;
- optionally tablet 1024×1366.

For each significant section, document in `docs/reference/REFERENCE_AUDIT.md`:

```md
## Section name
- viewport:
- approximate scroll range:
- background:
- max-width/container behavior:
- heading size:
- heading line breaks:
- body copy width:
- media geometry:
- 3D/canvas behavior:
- pinned or non-pinned:
- entry animation:
- exit animation:
- overlapping elements:
- mobile changes:
- approximate timing:
- unknowns:
```

Measure visible behavior rather than attempting to copy private source implementation.

If browser tools let you inspect computed layout safely, record useful values. Do not copy proprietary scripts or protected assets.

---

# 3. MORADI BRAND SYSTEM

## 3.1 Naming

Persian:
`گالری مرادی`

English:
`MORADI GALLERY`

Optional compact English mark:
`MORADI`

Do not use “Javaherian” in visible production UI.

## 3.2 Brand positioning

Moradi Gallery should feel like:

> A curated destination for original watches, presented with the restraint and confidence of a contemporary luxury house.

Avoid overclaiming.

Claims such as “official representative”, “authorized retailer”, “official warranty”, “80+ brands”, “Swiss made”, or “100% original” must be data/config-driven and published only when the business has explicitly confirmed them.

The Javaherian reference does support useful **content categories and customer needs**, including:

- men's watches;
- women's watches;
- couples/set watches;
- classic;
- sport;
- automatic;
- digital;
- smart;
- luxury;
- Swiss;
- Japanese;
- product-finder/search;
- authenticity;
- warranty;
- invoice;
- purchase consultation.

Use those as IA inspiration, not as copied prose.

## 3.3 Brand personality

Five adjectives:

- precise;
- quiet;
- cultivated;
- modern;
- trustworthy.

Avoid:

- gaudy;
- nightclub black/gold;
- casino gold;
- fake metallic gradients;
- exaggerated luxury copy;
- excessive serif typography;
- clutter;
- glassmorphism everywhere;
- dozens of floating cards.

## 3.4 Color tokens

Start with this palette, then visually tune against actual assets.

```ts
export const colors = {
  ink: "#080907",
  obsidian: "#10110F",
  carbon: "#171814",
  graphite: "#24241F",

  ivory: "#F5F1E8",
  warmWhite: "#FBF8F2",
  mutedText: "#AAA79E",

  gold: "#C5A25D",
  goldLight: "#E1CCA0",
  goldDark: "#856A34",
  champagne: "#D7BD83",

  borderDark: "#2D2C26",
  borderLight: "#D9D1C1",

  success: "#8DAA82",
  error: "#C27A70",
} as const;
```

### Gold usage rules

Gold is an accent, not the page background.

Use gold for:

- logo mark;
- thin dividers;
- tiny active indicators;
- focus/hover accents;
- selected watch indices in graphics;
- subtle metal reflections;
- one key word or number when composition benefits;
- CTA border/foreground where contrast is valid.

Do not render entire paragraphs in gold.

## 3.5 Logo direction

Create an original Moradi identity.

Preferred concept:

- extremely simple geometric monogram derived from `M`;
- optionally combine:
  - watch crown geometry,
  - 12 o'clock index,
  - minimal circle/dial,
  - mirrored M structure;
- Persian wordmark `گالری مرادی`;
- English wordmark `MORADI GALLERY`.

The logo should survive:

- 20px navbar height;
- favicon;
- watch case engraving mockup;
- black background;
- warm ivory background;
- single-color print.

Do not imitate the Javaherian logo.

If an image-generation capability is available during implementation, generate several **original** logo explorations, select one, then recreate the final simple mark as a clean SVG.

---

# 4. TYPOGRAPHY SYSTEM

## 4.1 Persian

Use `Vazirmatn` via `next/font/google` when supported by the installed Next version.

Recommended weights:

- 300;
- 400;
- 500;
- 600;
- 700.

Use it for both Persian editorial typography and Persian UI.

Do not apply artificial letter spacing to connected Persian text.

## 4.2 English

Use a modern geometric sans for the Moto-like editorial feeling.

Preferred:
- `Manrope`

Alternative:
- `Geist`

Optional display accent only if the final visual language benefits:
- `Cormorant Garamond`

The primary experience should remain modern and clean; do not turn it into a traditional jewelry website.

## 4.3 Directionality

Set direction at the route root:

```tsx
<html lang={locale} dir={locale === "fa" ? "rtl" : "ltr"}>
```

Do not implement RTL by manually flipping every component.

Use logical layout concepts and Tailwind utilities.

For model numbers, references, Latin brand names, currencies and technical watch references inside Persian UI, isolate direction:

```tsx
<span dir="ltr" className="inline-block">
  T137.407.11.041.00
</span>
```

## 4.4 Persian text-animation rule

This is mandatory.

Do not split Persian text into arbitrary individual UTF-16 characters for entrance animations. That can damage shaping and joining behavior.

Prefer:

- line reveal;
- word reveal;
- masked block reveal;
- full-heading clip reveal.

If segmentation is needed, use word-aware/grapheme-aware segmentation and validate rendering in Safari/Chrome.

English headings may use finer SplitText-style animation if desired.

---

# 5. TAILWIND AND DESIGN-SYSTEM RULES

The user explicitly does not want custom styling dumped into `globals.css`.

## 5.1 `globals.css`

Keep `globals.css` effectively empty apart from whatever Tailwind bootstrap/import directive the selected Tailwind version requires.

Example goal:

```css
@import "tailwindcss";
```

No page-specific styles.

No animation library.

No massive `:root` variable block.

No utility classes handwritten there.

No section styling.

No `.hero`, `.container`, `.gold-button`, etc.

## 5.2 Design tokens

Keep reusable semantic styling in TypeScript/Tailwind configuration and components.

Preferred:

```text
src/design-system/
  tokens/
    colors.ts
    spacing.ts
    typography.ts
    motion.ts
    radii.ts
    z-index.ts
  utils/
    cn.ts
  primitives/
    Container.tsx
    Section.tsx
    Text.tsx
    Heading.tsx
    Button.tsx
    TextLink.tsx
    IconButton.tsx
    Divider.tsx
    Surface.tsx
  layout/
    Stack.tsx
    Cluster.tsx
    EditorialGrid.tsx
  media/
    ResponsiveImage.tsx
    CinematicImage.tsx
    VideoFrame.tsx
    CanvasShell.tsx
  motion/
    Reveal.tsx
    MaskReveal.tsx
    Fade.tsx
    MagneticLink.tsx
    ScrollMarquee.tsx
  feedback/
    SiteLoader.tsx
    ProgressIndicator.tsx
    WebGLFallback.tsx
  navigation/
    LocaleSwitch.tsx
```

Feature-specific components belong outside the design system.

Example:

```text
src/features/home/
  HomePage.tsx
  sections/
    HeroExperience.tsx
    BrandManifesto.tsx
    WatchIsBeginning.tsx
    GlobalCuration.tsx
    ConciergeSection.tsx
    LifestyleSequence.tsx
    CollectionExplorer.tsx
    BrandNetwork.tsx
    FaqSection.tsx
    FinalCta.tsx
```

## 5.3 Variant system

Use `class-variance-authority` for real variants.

Example concepts:

- `Button`: `solid`, `outline`, `quiet`, `inverted`;
- `Heading`: `hero`, `display`, `section`, `subsection`;
- `Text`: `body`, `bodyLarge`, `caption`, `label`;
- `Container`: `wide`, `content`, `narrow`.

Do not create one-off class strings across twenty sections for the same visual concept.

## 5.4 No meaningless components

Forbidden names:

- `Component1`;
- `Card2`;
- `NewSection`;
- `Thing`;
- `Wrapper`;
- `BlockA`.

Names must reflect meaning and ownership.

---

# 6. REQUIRED PROJECT ARCHITECTURE

Use an architecture similar to:

```text
.
├── AGENTS.md
├── IMPLEMENTATION_STATUS.md
├── README.md
├── docs/
│   ├── ARCHITECTURE.md
│   ├── DESIGN_SYSTEM.md
│   ├── MOTION_SPEC.md
│   ├── PERFORMANCE_BUDGET.md
│   ├── ASSET_MANIFEST.md
│   └── reference/
│       └── REFERENCE_AUDIT.md
├── public/
│   ├── brand/
│   ├── images/
│   │   ├── hero/
│   │   ├── collections/
│   │   └── lifestyle/
│   ├── models/
│   │   ├── desktop/
│   │   └── mobile/
│   ├── textures/
│   └── fallback/
├── src/
│   ├── app/
│   │   ├── [locale]/
│   │   │   ├── layout.tsx
│   │   │   ├── page.tsx
│   │   │   ├── loading.tsx
│   │   │   └── ...
│   │   ├── sitemap.ts
│   │   └── robots.ts
│   ├── design-system/
│   ├── features/
│   │   ├── home/
│   │   ├── collections/
│   │   ├── watch/
│   │   └── experience3d/
│   │       ├── WatchCanvas.tsx
│   │       ├── WatchScene.tsx
│   │       ├── SceneLighting.tsx
│   │       ├── WatchModel.tsx
│   │       ├── ExperienceController.tsx
│   │       ├── QualityController.tsx
│   │       ├── WebGLCapability.ts
│   │       └── hooks/
│   ├── i18n/
│   ├── lib/
│   ├── content/
│   └── types/
└── messages/
    ├── fa.json
    └── en.json
```

Avoid massive barrel exports.

Prefer direct imports for bundle hygiene.

---

# 7. NEXT.JS RENDERING ARCHITECTURE

## 7.1 Server-first

The page composition, translated static copy and SEO should be Server Components by default.

Only mark components as `'use client'` when they actually need:

- state;
- browser APIs;
- GSAP;
- Motion;
- R3F;
- pointer/touch interaction;
- observers.

Do not turn the entire page into a Client Component because one canvas is interactive.

## 7.2 Dynamically import expensive 3D

The WebGL experience must live behind a client-only dynamic boundary.

Conceptually:

```tsx
const WatchExperience = dynamic(
  () => import("@/features/experience3d/WatchExperience"),
  {
    ssr: false,
    loading: () => <HeroVisualFallback />,
  }
);
```

The page shell, navigation, copy and LCP-friendly fallback must not wait for the 3D JavaScript chunk.

## 7.3 Suspense boundaries

Use Suspense to prevent one secondary content/data source from blocking the entire page.

Avoid fetch waterfalls.

Parallelize independent server work.

## 7.4 Fonts

Use `next/font`.

Apply font variables/classes at layout level.

Do not download fonts through client-side JavaScript.

## 7.5 Images

Use `next/image` for normal raster assets.

For each image:

- correct `sizes`;
- explicit dimensions/aspect ratio;
- AVIF/WebP where supported;
- image quality tuned visually;
- `priority` only for true LCP image;
- lazy loading below the fold.

---

# 8. HOME PAGE EXPERIENCE — SECTION-BY-SECTION SPEC

The sequence should feel familiar to the Moto reference in rhythm but all content and visual identity should be Moradi.

## 8.1 Global header

Visual:

- transparent over hero at load;
- restrained;
- small but legible logo;
- wide horizontal breathing room;
- no oversized nav panel;
- subtle gold accent;
- no giant rounded “SaaS” button.

Desktop navigation suggestions:

English:
- Collections
- Brands
- Watch Finder
- Journal
- About
- Contact

Persian:
- مجموعه‌ها
- برندها
- انتخاب ساعت
- مجله
- درباره ما
- تماس

Actions:
- locale switch;
- “Explore Watches” / “مشاهده ساعت‌ها”.

Behavior:

- initially transparent;
- while scrolling into light/image sections, adapt foreground color if necessary;
- hide/reveal only if the behavior feels natural and tested;
- sticky/fixed;
- mobile menu becomes a full-screen editorial overlay;
- mobile menu animation owned by Motion, not GSAP.

## 8.2 Hero — the central cinematic watch

Moto inspiration:
large uppercase statement + dark atmospheric 3D focal object + floating UI cues.

Moradi adaptation:

English hero:
`BUILT FOR TIMELESS TASTE`

Persian hero candidate:
`برای سلیقه‌های ماندگار`

Support line should be short:
`Original timepieces, thoughtfully curated.`

Persian:
`ساعت‌هایی اصیل، با انتخابی دقیق.`

Do not crowd the hero.

### Hero composition

Desktop:

- heading near upper center;
- focal 3D watch centered slightly below visual center;
- large negative space;
- 2–3 small floating information callouts at most;
- dark background with barely perceptible radial lighting;
- watch metal catches gold/champagne highlights;
- CTA understated.

Candidate callouts:

- `Authenticity Checked`
- `Curated Selection`
- `Personal Consultation`

Persian:
- `بررسی اصالت`
- `انتخاب گزیده`
- `مشاوره تخصصی`

Do not claim “official warranty” globally unless confirmed.

### Hero 3D behavior

At rest:
- almost imperceptible breathing rotation;
- subtle watch-hand motion if technically appropriate;
- not a spinning product configurator.

Pointer:
- small parallax, max a few degrees;
- disable/reduce on coarse pointer.

Scroll:
- camera begins moving before DOM text fully leaves;
- watch rotates on a controlled arc;
- heading masks upward;
- callouts drift at different depth rates;
- visual continues into next section rather than abruptly disappearing.

## 8.3 Brand manifesto

Moto analogue:
“Infrastructure for how you move.”

Moradi concept:

English:
`CURATED FOR HOW YOU LIVE WITH TIME`

Persian:
`انتخابی برای شیوه‌ای که زمان را زندگی می‌کنید`

Body:
brief brand statement about curation, authenticity, consultation and design.

Keep it concise.

Layout:
- oversized heading;
- narrow body copy;
- asymmetry;
- lots of negative space;
- subtle overlap with the pinned 3D scene.

## 8.4 Signature transition — “The watch is only the beginning”

English:
`THE WATCH IS ONLY THE BEGINNING`

Persian:
`ساعت فقط آغاز ماجراست`

This section should be one of the strongest visual moments.

Possible 3D execution if the model is authored with separable named parts:

- bezel drifts;
- crown offsets;
- glass lifts;
- dial/markers separate subtly;
- case and strap open into an exploded view;
- camera moves through a macro composition;
- elements return to a resolved watch.

Do not fake an exploded view if the model topology does not support it.

If the supplied 3D model is a single mesh:
- choose a macro orbit / camera pass instead;
- never destroy geometry just to imitate the concept.

## 8.5 Global curation / categories section

Moto analogue:
global spending with distributed currency values.

Moradi adaptation:
distributed watch disciplines/heritage labels moving around the composition.

Possible words:
- AUTOMATIC
- CLASSIC
- SPORT
- SWISS
- JAPANESE
- DIVER
- DRESS
- CHRONOGRAPH

Persian equivalents can appear depending on locale.

The center content:

English:
`Original watches. Curated globally.`

Persian:
`اصالت، انتخاب‌شده از جهان ساعت`

Use subtle orbiting/scrolling type rather than a generic horizontal carousel.

Motion must be readable.

## 8.6 Personal concierge / consultation

Moto analogue:
24/7 concierge.

Moradi adaptation:
personal watch consultation.

Headline candidates:

English:
`PERSONAL WATCH CONCIERGE`

Persian:
`مشاوره شخصی انتخاب ساعت`

Supporting capabilities:
- collection guidance;
- model comparison;
- fit and style consultation;
- after-sales guidance, only if factual.

Visual:
- macro detail of crown/dial/bracelet;
- text reveal tied to scroll;
- minimal list.

## 8.7 Lifestyle cinematic sequence

Moto uses a sequence of premium lifestyle scenes.

For Moradi, create or source original/licensed assets with consistent cinematography:

1. tailored evening / dress watch;
2. architectural office / everyday luxury;
3. travel/airport / GMT or world-time context;
4. sport/outdoor / durable watch;
5. macro workshop / watchmaker detail.

Requirements:
- one coherent grading direction;
- black, charcoal, warm skin/wood/metal and restrained gold;
- no random stock-photo look;
- large full-bleed crops;
- smooth, slow image scale/parallax;
- do not animate every image identically.

For each image:
- define aspect ratio;
- desktop focal point;
- mobile focal point;
- alt text per locale where useful.

## 8.8 Collection explorer

Moto analogue:
numbered categories such as Hotels/Dining/Travel/Experiences/Wellness.

Moradi categories:

01 — Classic  
02 — Automatic  
03 — Sport  
04 — Swiss  
05 — Japanese

Optional sixth only if composition benefits:
06 — Limited / Luxury

Persian:
- کلاسیک
- اتوماتیک
- اسپرت
- سوئیسی
- ژاپنی

Interaction:
- large numbered editorial list;
- active category drives a media panel;
- desktop can update image/model preview on hover/focus/scroll;
- touch uses tap/scroll state;
- keyboard interaction must work;
- no tiny cards.

## 8.9 Brand network

Moto analogue:
“Access our network.”

Moradi:
`EXPLORE OUR BRANDS`
`برندهای منتخب`

Display a curated selection of watch brands only when the business has confirmed they are offered.

The design should remain editorial:
- text/logotype rail;
- no cluttered 8×10 logo wall;
- optional slow marquee;
- support reduced motion.

## 8.10 Watch finder

Inspired by a useful Javaherian behavior: helping users find a watch quickly.

Do not make this a generic form block.

Create a refined, compact guided selector:
- gender/use case optional;
- style;
- movement;
- budget;
- preferred origin/brand;
- result CTA.

Keep it client-side for demo data, but architect the filters so a real backend/CMS can be attached later.

On Persian locale:
- format currency appropriately;
- keep model references LTR.

## 8.11 FAQ

Use accessible semantic disclosure.

Potential questions:
- How do I know a watch is authentic?
- What warranty is included?
- Can I get help choosing a size/model?
- Do you offer in-person consultation?
- How are orders delivered?
- Can I request a specific model?

Only publish answers supported by actual business policy.

Animation:
- Motion may own height/opacity;
- keyboard accessible;
- no scroll hijacking.

## 8.12 Final CTA

English:
`WEAR TIME DIFFERENTLY.`

Persian:
`زمان را متفاوت به دست ببند.`

CTA:
`Explore the collection`
`مشاهده مجموعه`

A final strong watch silhouette or macro reflection can sit behind/alongside the copy.

Keep the footer restrained.

---

# 9. 3D WATCH ASSET REQUIREMENTS

A premium visual result depends more on a high-quality source model than on excessive effects.

Preferred GLB structure:

```text
WatchRoot
├── Case
├── Bezel
├── Crystal
├── Dial
├── HourMarkers
├── HourHand
├── MinuteHand
├── SecondHand
├── Crown
├── BraceletOrStrap
└── OptionalComplications
```

Materials:
- metal PBR;
- brushed steel/gold;
- polished metal only where physically plausible;
- dial with subtle roughness variation;
- glass/crystal with restrained transmission/refraction;
- no unrealistic mirror chrome.

Optimization:
- glTF/GLB;
- meshopt or Draco where appropriate;
- KTX2/Basis textures;
- remove unused nodes/materials;
- cap texture sizes deliberately;
- 1K/2K environment map depending on quality tier;
- mobile-specific compressed model/texture variant if needed.

Do not ship a 25MB hero model.

Suggested budgets:

Desktop hero model:
- target <= 2.5MB compressed where visually possible.

Desktop textures:
- target <= 4MB total compressed for hero-critical assets.

Mobile variant:
- model + critical textures ideally <= 2.5MB combined.

Use actual measured bundle/network values and record them in `docs/PERFORMANCE_BUDGET.md`.

---

# 10. 3D SCENE ARCHITECTURE

Use a fixed canvas for the cinematic portion and release GPU work when it is no longer needed.

Concept:

```text
WatchExperience
├── CanvasShell
├── WatchCanvas
│   ├── PerspectiveCamera
│   ├── SceneLighting
│   ├── Environment
│   ├── WatchModel
│   ├── OptionalParticlesOrDust
│   └── ExperienceController
└── HeroVisualFallback
```

## 10.1 Renderer

Set appropriate options:
- alpha if compositing is needed;
- antialias tested by tier;
- high-performance power preference;
- output color space correct;
- tone mapping chosen deliberately.

Clamp DPR.

Suggested:
- desktop high tier: 1.5 max;
- mid: 1.25;
- mobile: 1.0–1.25;
- never blindly use device DPR 3.

## 10.2 Lights

Prefer an elegant studio-light setup:

- large soft key;
- cooler/neutral fill;
- gold-edged rim;
- subtle environment reflections.

Avoid:
- many point lights;
- hard blown-out speculars;
- giant bloom.

## 10.3 Environment

Use an optimized HDR environment or custom reflection setup.

Preload only if hero WebGL is actually chosen for the device.

## 10.4 Render only when useful

When canvas is far outside the cinematic sequence:
- pause/downgrade rendering;
- remove expensive post-processing;
- optionally unmount after the final 3D story if remount cost is not problematic.

When document is hidden:
- stop unnecessary frame work.

---

# 11. CAMERA CHOREOGRAPHY — STARTING SPEC, THEN TUNE VISUALLY

These are **starting values**, not claims about Moto's private camera.

Create a normalized master progress `p` from 0 to 1 for the cinematic hero/story.

Avoid React state per frame.

Example starting camera:

```ts
camera.fov = 30;
camera.position = [0, 0.05, 5.6];
camera.lookAt(0, 0, 0);
```

Watch starting transform:

```ts
watch.position = [0, -0.45, 0];
watch.rotation = [
  degToRad(-8),
  degToRad(-18),
  degToRad(2),
];
```

## 11.1 Phase A — hero, p 0.00–0.22

Camera:
- z 5.6 -> 5.0;
- x 0 -> 0.12;
- y 0.05 -> -0.03.

Watch:
- rotate Y approximately -18° -> +6°;
- rotate X approximately -8° -> -2°;
- subtle translation upward.

DOM:
- hero title remains dominant;
- callouts drift at different rates;
- title exits late enough to preserve composition.

## 11.2 Phase B — manifesto, p 0.22–0.42

Camera:
- slight lateral orbit;
- z ~4.8;
- focus on dial/case.

Watch:
- controlled macro turn;
- no fast spin.

Background:
- black remains continuous;
- subtle gold edge light increases.

## 11.3 Phase C — signature macro/exploded view, p 0.42–0.68

If parts exist:
- crystal +0.12 z;
- bezel +0.08 z;
- crown +0.14 x;
- dial slight z separation;
- strap/case move only enough to reveal construction.

If not:
- camera performs a macro side pass;
- watch scale/rotation creates depth.

Never separate parts so far that it resembles a technical CAD explosion unless the art direction calls for it.

## 11.4 Phase D — resolve/transition, p 0.68–0.84

- reassemble;
- camera pulls back;
- watch rotates into a strong catalog silhouette;
- next section labels begin appearing.

## 11.5 Phase E — exit, p 0.84–1.00

- watch moves out or dissolves into image/media sequence;
- canvas contribution lowers;
- GPU-heavy effects stop;
- page continues as normal DOM/editorial content.

## 11.6 Camera tuning protocol

After each implementation pass:

1. capture the same viewport size as the reference;
2. compare subject scale;
3. compare top/bottom whitespace;
4. compare perspective compression;
5. compare scroll moment when the main focal object crosses visual center;
6. adjust FOV first when perspective feels wrong;
7. adjust camera distance second;
8. adjust model scale only after camera is coherent.

Do not randomly tweak all values simultaneously.

---

# 12. GSAP / SCROLLTRIGGER ARCHITECTURE

Use one clear scroll owner.

Register plugins once.

Use `gsap.context()` or `useGSAP()` and clean up correctly.

Never create a new master timeline on every render.

Prefer named timeline labels:

```ts
timeline
  .addLabel("hero")
  .addLabel("manifesto")
  .addLabel("macro")
  .addLabel("resolve")
  .addLabel("exit");
```

## 12.1 DOM transform performance

Animate:
- transform;
- opacity;
- clip/mask when tested.

Avoid repeatedly animating:
- layout-bound width/height for large scroll scenes;
- top/left;
- expensive filters across huge full-screen layers.

Use `will-change` only during relevant windows; do not apply it to the whole site.

## 12.2 Smooth scroll

Native scrolling is the default.

If Lenis materially improves desktop fidelity:
- enable only after testing;
- synchronize ScrollTrigger correctly;
- disable for `prefers-reduced-motion`;
- strongly consider native scroll on touch/mobile;
- do not interfere with browser history, anchors or keyboard navigation.

## 12.3 Reduced motion

For `prefers-reduced-motion: reduce`:
- no smooth scroll;
- no long pinned scenes;
- no aggressive parallax;
- no perpetual watch rotation;
- content remains available in normal document flow;
- use short opacity transitions only.

---

# 13. MOTION FOR REACT RULES

Use Motion sparingly.

Good use:
- mobile nav panel;
- locale control;
- FAQ content;
- small overlay transitions;
- selected collection state.

Bad use:
- duplicating ScrollTrigger;
- animating the 3D camera;
- wrapping every text element in a motion component;
- animating the same `transform` GSAP owns.

Prefer Tailwind hover/focus transitions for ordinary buttons.

---

# 14. LOADING EXPERIENCE — MUST FEEL INTENTIONAL

The user specifically requested a beautiful loading state that ensures critical components/animations are ready before the reveal.

Important:
Do not hide the entire site for an arbitrary fixed duration.

Use real readiness signals.

## 14.1 Loader concept

Visual:
- black/obsidian;
- centered Moradi monogram;
- thin circular watch-index progress indicator;
- subtle second-hand motion;
- tiny numeric real progress when available;
- warm-gold accent;
- no generic spinner.

Persian/English does not need paragraphs here.

Possible tiny label:
- EN: `Preparing the collection`
- FA: `آماده‌سازی مجموعه`

## 14.2 Critical readiness

Loader waits for:
- app hydration where required;
- hero-critical 3D model OR chosen fallback;
- critical environment texture;
- first render-ready scene;
- critical hero fonts/layout.

Do not wait for:
- FAQ assets;
- footer;
- below-the-fold lifestyle images;
- analytics;
- nonessential product data.

## 14.3 First-frame readiness

The 3D loader should not disappear the instant download hits 100%.

Sequence:
1. critical model loaded;
2. shader/material compilation warmed where practical;
3. scene renders at least one stable frame;
4. loader exits;
5. hero title and watch reveal in a coordinated transition.

## 14.4 Real progress

Use actual loader progress where available.

Never fake 0→100 while assets are still pending.

A smoothing animation may visually interpolate the real progress, but it cannot exceed real readiness in a misleading way.

## 14.5 Failsafe

The site must never get permanently stuck behind a loader.

If WebGL or a model fails:
- log the failure in development;
- fall back to premium static/video hero;
- reveal the site.

---

# 15. DEVICE QUALITY TIERS

Build a `QualityController`.

Possible tiers:

```ts
type ExperienceQuality = "high" | "medium" | "low" | "fallback";
```

Inputs can include:
- viewport;
- coarse pointer;
- DPR;
- WebGL2 availability;
- max texture size;
- sustained measured FPS;
- reduced-motion preference;
- memory hints when available.

Do not fingerprint users excessively.

## 15.1 High

- full desktop model;
- high-quality reflection;
- restrained post effects;
- DPR up to 1.5.

## 15.2 Medium

- compressed textures;
- lower DPR;
- minimal/no expensive postprocessing;
- reduced reflections.

## 15.3 Low

- mobile model;
- 1× DPR;
- simplified material;
- no bloom/DOF;
- limited particles;
- shorter 3D sequence.

## 15.4 Fallback

- high-quality static `next/image` or short optimized video;
- DOM animation only;
- fully usable content.

Never punish mobile users with a blank canvas.

---

# 16. MOBILE DESIGN — NOT A SHRUNK DESKTOP

The mobile version must be intentionally recomposed.

## 16.1 Hero

- watch remains visually dominant;
- heading line breaks intentionally;
- callouts reduce from 3 to 1–2;
- pointer parallax disabled;
- camera FOV/subject scale tuned separately;
- avoid watch being cropped by browser chrome.

## 16.2 Pinned scroll

Long desktop pin durations should be shortened on mobile.

Use `gsap.matchMedia()` or equivalent.

Do not force a 600vh scroll story on a phone if 300–380vh communicates the same idea.

## 16.3 Touch targets

Minimum practical target:
- roughly 44×44 CSS px.

## 16.4 Typography

Use responsive `clamp()` behavior through Tailwind arbitrary utilities or well-defined component variants.

Do not simply use the desktop font size divided by two.

## 16.5 Mobile section rhythm

Alternate:
- hero;
- concise manifesto;
- cinematic macro;
- category editor;
- imagery;
- finder;
- FAQ;
- CTA.

Avoid large blank scroll deserts.

---

# 17. BILINGUAL CONTENT ARCHITECTURE

Use locale routes:

```text
/fa
/en
/fa/collections
/en/collections
...
```

Default locale can be Persian if business requirements say so.

Use `next-intl` or equivalent.

Do not hardcode `locale === "fa" ? ...` across 50 components.

Messages:

```text
messages/
  fa.json
  en.json
```

Organize keys semantically:

```json
{
  "navigation": {},
  "home": {
    "hero": {},
    "manifesto": {},
    "collections": {},
    "faq": {}
  }
}
```

Localized metadata:
- title;
- description;
- OpenGraph;
- canonical/hreflang.

Route changes must preserve clean language behavior.

---

# 18. CONTENT AND DATA MODELS

Do not scatter product literals across JSX.

Example:

```ts
export interface Watch {
  id: string;
  slug: string;
  brand: string;
  model: string;
  reference?: string;
  movement?: "automatic" | "quartz" | "manual" | "smart";
  origin?: "swiss" | "japanese" | "other";
  gender?: "men" | "women" | "unisex";
  style: string[];
  price?: {
    amount: number;
    currency: string;
  };
  images: WatchImage[];
  model3d?: {
    desktop: string;
    mobile?: string;
  };
}
```

For initial implementation:
- use a clean typed mock data source;
- keep it easy to replace with CMS/API;
- no payment integration unless explicitly required.

Do not scrape product data from Javaherian and republish it automatically.

---

# 19. PERFORMANCE REQUIREMENTS

Performance is a feature, not cleanup work.

## 19.1 Bundle strategy

Critical:
- server-render as much as possible;
- dynamically import WebGL;
- dynamically import nonessential heavy widgets;
- avoid large icon libraries;
- direct-import modules;
- defer analytics;
- do not put every section behind `'use client'`.

Target:
- keep the initial non-3D application shell small;
- treat the WebGL runtime as a separate late chunk.

Record actual bundle analysis.

## 19.2 Asset loading

Critical path:
- logo;
- nav;
- hero copy;
- fallback visual;
- required hero model/environment only.

Everything else:
- lazy load;
- prefetch opportunistically when approaching viewport.

Preload on intent where appropriate:
- collection route on link hover/focus;
- heavy product model only after user expresses intent.

## 19.3 Rerender discipline

Never use React state for:
- camera position every frame;
- scroll progress every frame;
- pointer coordinates every frame.

Use refs and external animation systems.

Memoize expensive scene nodes when useful.

Keep translated/static content outside volatile client state.

## 19.4 Canvas

One hero canvas is preferable to many simultaneous canvases.

If additional 3D product previews are needed later:
- mount one at a time;
- render on demand;
- use static previews in rails.

## 19.5 Core Web Vitals targets

Aim for:

- CLS < 0.1;
- INP < 200ms in normal UI;
- LCP < 2.5s on good desktop/network conditions;
- mobile LCP as low as realistically possible for a 3D-first site, with a fast fallback/LCP image;
- no long main-thread stalls during scroll.

Visual target:
- ~60fps on modern desktop;
- stable ~45–60fps on mid-range modern mobile;
- automatically lower scene quality before accepting sustained jank.

Do not sacrifice usability to preserve a postprocessing effect.

---

# 20. ACCESSIBILITY REQUIREMENTS

Even a cinematic site must remain a website.

Required:
- semantic `header`, `nav`, `main`, `section`, `footer`;
- one meaningful H1;
- coherent heading hierarchy;
- visible focus states;
- skip link;
- keyboard-operable nav;
- keyboard-operable collection explorer;
- accessible FAQ;
- appropriate `aria-expanded`;
- image alt strategy;
- fallback content for canvas;
- no information available only through hover;
- reduced-motion variant;
- acceptable color contrast.

Canvas:
- treat it as decorative where appropriate;
- pair with semantic DOM copy;
- do not make critical product information exist only in WebGL.

---

# 21. SEO / METADATA

Implement:
- localized metadata;
- canonical URLs;
- alternate locales;
- sitemap;
- robots;
- OpenGraph;
- Twitter/X image if useful;
- JSON-LD only when truthful.

Potential later structured data:
- Organization;
- WebSite;
- Product;
- BreadcrumbList.

Do not generate fake ratings/reviews.

---

# 22. ERROR HANDLING

Create:
- route-level error UI;
- WebGL error boundary/fallback;
- model load fallback;
- image fallback;
- translation key checks in development.

A missing 3D model must not break navigation or make the site white-screen.

---

# 23. TESTING AND VISUAL QA

## 23.1 Viewports

At minimum verify:

Desktop:
- 1920×1080;
- 1440×900;
- 1366×768.

Tablet:
- 1024×1366 or similar.

Mobile:
- 430×932;
- 390×844;
- 360×800.

## 23.2 Browsers

At minimum:
- Chromium;
- Safari/WebKit where available;
- mobile Safari behavior is especially important.

## 23.3 Playwright

Automate critical checks:
- home loads;
- locale switch;
- no horizontal overflow;
- menu works;
- watch finder interaction;
- FAQ;
- collection link;
- reduced-motion variant if practical.

## 23.4 Console hygiene

Zero:
- React hydration errors;
- missing-key noise;
- uncaught WebGL errors;
- repeated ScrollTrigger setup warnings;
- image aspect-ratio warnings.

## 23.5 Visual fidelity loop

For each major section:

1. capture reference;
2. capture implementation at same viewport;
3. compare:
   - subject scale;
   - typography;
   - line breaks;
   - section height;
   - negative space;
   - focal alignment;
   - transition timing;
   - visual layering;
4. log mismatch;
5. fix;
6. capture again.

Do not call the site “done” just because it compiles.

---

# 24. REQUIRED PERFORMANCE QA

Before final delivery:

Run and record:
- production build;
- bundle analysis;
- Lighthouse or equivalent;
- network waterfall;
- desktop FPS observation through hero scroll;
- mobile FPS observation;
- model/texture transfer sizes;
- LCP element;
- CLS;
- hydration warnings;
- memory behavior after leaving 3D section.

Write results in:

`docs/PERFORMANCE_BUDGET.md`

Example:

```md
## Final measured results

| Metric | Target | Measured | Pass |
|---|---:|---:|---|
| CLS | < 0.10 | 0.02 | ✅ |
| Desktop LCP | < 2.5s | ... | ... |
| Mobile LCP | ... | ... | ... |
| Hero GLB | < 2.5MB | ... | ... |
| Hero texture payload | < 4MB | ... | ... |
| Sustained desktop FPS | ~60 | ... | ... |
| Sustained mobile FPS | >=45 target | ... | ... |
```

Never invent measurements.

---

# 25. ASSET MANIFEST

Create:
`docs/ASSET_MANIFEST.md`

Track:

| Asset | Source/Owner | License/Permission | Format | Desktop size | Mobile size | Critical? | Status |
|---|---|---|---|---:|---:|---|---|

All assets must be:
- original;
- client-provided;
- generated for the project;
- properly licensed.

Do not hotlink Moto assets.

Do not ship Javaherian branding.

---

# 26. THE PERSISTENT CODEX / ASTRA MEMORY FILE — MANDATORY

This is one of the most important project-management requirements.

Create at project root:

`IMPLEMENTATION_STATUS.md`

This file is the durable resume point for every future Codex/Astra session.

## 26.1 Startup protocol

At the beginning of every session, before editing:

1. read `IMPLEMENTATION_STATUS.md`;
2. read `AGENTS.md`;
3. inspect `git status`;
4. inspect the files listed under “Current focus”;
5. run the smallest relevant validation;
6. continue from the first incomplete item;
7. do not restart completed architecture work unless evidence says it is wrong.

## 26.2 Update protocol

Update `IMPLEMENTATION_STATUS.md`:

- after each meaningful phase;
- whenever architecture changes;
- whenever a blocker is discovered;
- before stopping;
- before handing work to another agent;
- after QA changes the next priority.

Do not merely append a vague journal.
Keep current status accurate.

## 26.3 Exact file template

Create the file with this structure:

```md
# Moradi Gallery — Implementation Status

Last updated: YYYY-MM-DD HH:mm
Current branch:
Current commit:
Current owner/agent:

## 1. Objective
One concise paragraph describing the target experience.

## 2. Architecture snapshot
- Next.js version:
- React version:
- Tailwind version:
- i18n:
- GSAP:
- Three/R3F:
- Motion:
- state:
- deployment target:
- rendering strategy:

## 3. Reference fidelity
### Moto reference captured
- [ ] Desktop hero
- [ ] Hero transition
- [ ] Product/3D section
- [ ] Mid-page motion
- [ ] Lifestyle transition
- [ ] Categories
- [ ] FAQ
- [ ] Final CTA
- [ ] Mobile

### Known implementation differences
- Difference:
  - why:
  - accepted?:

## 4. Completed
- [x] Task
  - files:
  - validation:
  - notes:

## 5. Current focus
ONE current task only.

- Task:
- Why now:
- Files:
- Expected outcome:
- Validation command:
- Visual reference:

## 6. Next tasks
Priority ordered.

1. [ ] ...
2. [ ] ...
3. [ ] ...

## 7. Blockers
- Blocker:
  - impact:
  - workaround:
  - owner/action required:

## 8. Assets
### Ready
- ...
### Missing
- ...
### Needs optimization
- ...

## 9. 3D scene status
- model:
- materials:
- lighting:
- camera:
- scroll phases:
- desktop quality:
- mobile quality:
- fallback:
- remaining issues:

## 10. Motion status
- GSAP master timeline:
- ScrollTrigger:
- Motion UI:
- reduced motion:
- mobile motion:
- remaining issues:

## 11. i18n / RTL status
- Persian:
- English:
- route direction:
- typography:
- RTL visual QA:
- bidi issues:

## 12. Responsive QA
| Viewport | Hero | Navigation | 3D | Sections | Overflow | Status |
|---|---|---|---|---|---|---|

## 13. Performance measurements
DO NOT GUESS.

- build:
- initial JS:
- 3D chunk:
- GLB:
- textures:
- desktop LCP:
- mobile LCP:
- CLS:
- INP:
- desktop FPS:
- mobile FPS:

## 14. Bugs / fidelity ledger
1. [ ] Issue
   - reference:
   - implementation:
   - planned fix:

## 15. Commands
```bash
# exact known-good commands
```

## 16. Resume here
Write 3–8 precise sentences telling the next agent exactly:
- what was just completed;
- what remains;
- which file to open first;
- which command to run;
- which screenshot/reference to compare;
- what NOT to redo.
```

## 26.4 `AGENTS.md`

Also create `AGENTS.md` with a short permanent rule:

```md
# Agent rules

1. Read `IMPLEMENTATION_STATUS.md` before making changes.
2. Treat it as the canonical resume point.
3. Update it before ending a work block.
4. Never mark visual work complete without browser screenshot comparison.
5. Never invent performance measurements.
6. Keep `globals.css` free of project-specific CSS.
7. Use the reusable design system before creating one-off UI.
8. GSAP owns scroll choreography; Motion owns isolated React UI transitions.
9. Preserve Persian RTL and English LTR on every change.
10. Do not replace production assets with permanent placeholders.
```

---

# 27. DEVELOPMENT PHASES

Work in these phases.

Do not build every section at once.

## Phase 0 — audit

- inspect live references;
- capture screenshots;
- write `REFERENCE_AUDIT.md`;
- write initial architecture docs;
- create status file.

Exit criterion:
reference structure understood.

## Phase 1 — foundation

- create Next app;
- TypeScript strict;
- Tailwind;
- lint/format;
- route locale architecture;
- fonts;
- base design-system primitives;
- tokens;
- header/footer shell.

Exit:
both `/fa` and `/en` render correctly with RTL/LTR.

## Phase 2 — static hero fidelity

Before 3D:
- implement hero DOM;
- logo;
- header;
- fallback hero image/frame;
- exact responsive composition;
- loader shell.

Exit:
hero composition is visually strong even without WebGL.

## Phase 3 — WebGL hero

- R3F;
- watch model;
- lighting;
- quality tiers;
- fallback;
- readiness loader;
- stable first frame.

Exit:
no scroll choreography yet, but hero watch looks production-quality.

## Phase 4 — scroll story

- GSAP master sequence;
- camera;
- watch transforms;
- title/callout choreography;
- manifesto transition;
- signature macro/exploded transition;
- responsive timelines;
- reduced motion.

Exit:
cinematic first half works desktop and mobile.

## Phase 5 — editorial sections

- global curation;
- concierge;
- lifestyle imagery;
- collection explorer;
- brand network.

Exit:
section rhythm matches reference quality.

## Phase 6 — utility/content

- watch finder;
- FAQ;
- final CTA;
- footer;
- SEO.

## Phase 7 — performance

- bundle split;
- model compression;
- texture compression;
- image optimization;
- render pause;
- mobile quality;
- long-task reduction.

## Phase 8 — fidelity QA

- side-by-side screenshot comparison;
- desktop/mobile;
- RTL;
- LTR;
- fix ledger.

## Phase 9 — production verification

- build;
- automated tests;
- no console errors;
- performance metrics;
- metadata;
- asset audit;
- status/documentation complete.

---

# 28. ORIGINAL COPY DIRECTION

Do not copy Moto copy.

Use a new Moradi voice.

Suggested working copy can be refined later.

## English

Hero:
`BUILT FOR TIMELESS TASTE`

Support:
`Original timepieces, thoughtfully curated.`

Manifesto:
`CURATED FOR HOW YOU LIVE WITH TIME`

Signature:
`THE WATCH IS ONLY THE BEGINNING`

Global collection:
`Original watches. Curated globally.`

Concierge:
`PERSONAL WATCH CONCIERGE`

Collections:
`MADE FOR EVERY WAY YOU MOVE THROUGH TIME`

Brands:
`EXPLORE OUR BRANDS`

Final:
`WEAR TIME DIFFERENTLY.`

## Persian

Hero:
`برای سلیقه‌های ماندگار`

Support:
`ساعت‌هایی اصیل، با انتخابی دقیق.`

Manifesto:
`انتخابی برای شیوه‌ای که زمان را زندگی می‌کنید`

Signature:
`ساعت فقط آغاز ماجراست`

Global:
`اصالت، انتخاب‌شده از جهان ساعت`

Concierge:
`مشاوره شخصی انتخاب ساعت`

Collections:
`برای هر شیوه‌ای که زمان را زندگی می‌کنید`

Brands:
`برندهای منتخب`

Final:
`زمان را متفاوت به دست ببند.`

These are starting points.
Preserve concise luxury tone.

---

# 29. INTERACTION DETAILS THAT CREATE PREMIUM FEEL

Use subtle details:

- cursor/hover state only on fine-pointer desktop;
- button arrow slides 2–4px, not 20px;
- gold border intensifies slightly on hover;
- image scale 1.00→1.035, slow;
- nav text opacity transitions;
- magnetic effect only if extremely restrained;
- active collection number tracks state;
- scroll text reveals feel weighted and slow;
- page never “bounces” through sections.

Avoid:
- cursor trails;
- excessive particles;
- glowing blobs;
- noisy grain;
- 3D card flipping;
- every word flying in different directions;
- 1-second button animations;
- large blur filters during scroll.

---

# 30. 3D / DOM COMPOSITING

The visual hierarchy should remain:

1. background;
2. 3D watch;
3. atmospheric DOM layer if any;
4. text;
5. callouts/navigation.

Use z-index tokens.

Avoid arbitrary `z-[99999]`.

Text must never become unreadable over bright specular reflections.

When necessary:
- use localized gradient masks around text;
- adjust light, not blanket dark overlays;
- keep the watch physically beautiful.

---

# 31. WATCH HAND / TIME DETAIL

If animating watch hands:

- do it subtly;
- second hand can use sweep or tick depending on displayed movement type;
- never imply a mechanical movement on a quartz product model inaccurately;
- if hero model is fictional/brand-neutral, use elegant sweep.

Stop nonessential animation when offscreen.

---

# 32. BUSINESS TRUST UX

Luxury commerce still needs confidence.

Create restrained trust moments:
- authenticity process;
- warranty policy;
- consultation;
- delivery/returns links.

Do not turn them into four generic icon cards.

Integrate them editorially into:
- FAQ;
- watch detail;
- concierge;
- footer/legal.

---

# 33. SECURITY / PRIVACY BASELINE

If forms are added:
- validate server-side;
- rate-limit public lead/contact routes;
- sanitize input;
- CSRF-safe architecture where relevant;
- no secrets in client bundle;
- privacy-consistent analytics;
- consent behavior appropriate to deployment jurisdiction.

Do not implement payment/auth flows unless scoped.

---

# 34. DEVELOPMENT COMMANDS

Use the package manager already present in the repository.

If creating new:
prefer `pnpm`.

Typical dependencies:

```bash
pnpm add three @react-three/fiber @react-three/drei
pnpm add gsap @gsap/react
pnpm add motion
pnpm add next-intl
pnpm add class-variance-authority clsx tailwind-merge
```

Optional:
```bash
pnpm add lenis
pnpm add @react-three/postprocessing
pnpm add zustand
```

Install optional packages only if actually used.

No dependency collection “just in case”.

---

# 35. CODE QUALITY RULES

Mandatory:
- TypeScript strict;
- no `any` unless documented and unavoidable;
- no giant 1000-line page component;
- no dead code;
- no copied duplicate section markup;
- stable component ownership;
- comments explain “why”, not obvious syntax;
- clean event cleanup;
- cleanup ScrollTriggers/listeners;
- no global mutable animation state leaking across route changes.

Prefer:
- pure server composition;
- small client islands;
- typed content/data;
- testable helpers.

---

# 36. WHAT MUST NOT HAPPEN

Do not:

- clone Moto logos/assets/copy;
- hotlink Moto media;
- hotlink Javaherian media without permission;
- claim exact Moto source internals you cannot verify;
- stuff all CSS into `globals.css`;
- create one giant `HomePage.tsx`;
- make whole app `'use client'`;
- run React state updates on every scroll frame;
- mount multiple expensive canvases simultaneously;
- use desktop 3D settings unchanged on phones;
- force smooth-scroll on reduced-motion users;
- fake loading progress;
- delay site reveal for cosmetic reasons after critical assets are ready;
- let Motion and GSAP animate the same transform;
- mark tasks complete without verification;
- delete `IMPLEMENTATION_STATUS.md`;
- restart from scratch next session because context was lost.

---

# 37. DEFINITION OF DONE

The project is done only when all of the following are true:

### Visual
- [ ] Moradi has an original brand identity.
- [ ] Hero feels cinematic and premium.
- [ ] Motion rhythm is convincingly reference-grade.
- [ ] Watch lighting/materials do not look like a demo.
- [ ] Gold is restrained.
- [ ] No generic template sections.
- [ ] Desktop and mobile are both intentionally composed.

### Engineering
- [ ] Next.js App Router + TypeScript.
- [ ] Server-first architecture.
- [ ] reusable design system.
- [ ] no project CSS dumped into `globals.css`.
- [ ] WebGL dynamically loaded.
- [ ] code splitting verified.
- [ ] image/font optimization verified.
- [ ] no unnecessary dependencies.

### Animation
- [ ] GSAP scroll owner is stable.
- [ ] Three.js camera motion is smooth.
- [ ] Motion only controls isolated UI.
- [ ] reduced-motion works.
- [ ] touch/mobile timelines are separate where needed.

### Language
- [ ] Persian RTL complete.
- [ ] English LTR complete.
- [ ] Vazirmatn applied correctly.
- [ ] English font applied correctly.
- [ ] Persian shaping survives animations.
- [ ] model/reference strings have correct bidi isolation.

### Loading
- [ ] loader is brand-specific.
- [ ] real critical readiness.
- [ ] first WebGL frame stable.
- [ ] fail-safe fallback.
- [ ] no permanent loader state.

### Performance
- [ ] production build passes.
- [ ] no hydration errors.
- [ ] no console errors.
- [ ] model optimized.
- [ ] textures optimized.
- [ ] mobile quality tier works.
- [ ] performance measurements documented.
- [ ] initial shell does not wait for 3D bundle.

### Accessibility
- [ ] semantic headings.
- [ ] focus states.
- [ ] keyboard navigation.
- [ ] touch targets.
- [ ] reduced motion.
- [ ] FAQ accessible.
- [ ] canvas has semantic fallback context.

### QA
- [ ] reference screenshots captured.
- [ ] implementation screenshots captured.
- [ ] fidelity ledger resolved or explicitly documented.
- [ ] 1920 desktop checked.
- [ ] 1440 desktop checked.
- [ ] tablet checked.
- [ ] 430 mobile checked.
- [ ] 390 mobile checked.
- [ ] 360 mobile checked.
- [ ] Persian checked.
- [ ] English checked.

### Continuity
- [ ] `IMPLEMENTATION_STATUS.md` is current.
- [ ] “Resume here” is precise.
- [ ] architecture docs match actual code.
- [ ] next agent can continue without reconstructing history.

---

# 38. FINAL EXECUTION INSTRUCTION TO ASTRA / CODEX

Start by reading this entire brief.

Then:

1. Create `IMPLEMENTATION_STATUS.md` immediately.
2. Create `AGENTS.md` immediately.
3. Inspect both live reference sites.
4. Capture and document the reference before coding.
5. Establish the bilingual Next.js shell and design system.
6. Build the first viewport statically to high fidelity.
7. Integrate the 3D watch only after the composition is correct.
8. Build the scroll choreography incrementally.
9. Compare browser screenshots continuously, not only at the end.
10. Profile performance on mobile as soon as WebGL is introduced.
11. Keep the progress file current after every meaningful block.
12. Do not stop a session without writing a precise “Resume here” entry.

When there is uncertainty, prefer:
- fidelity over invention;
- simplicity over unnecessary effects;
- browser measurement over guessing;
- an original Moradi asset over copied reference media;
- server rendering over needless client JavaScript;
- refs over frame-by-frame React state;
- graceful degradation over jank;
- readable Persian typography over flashy text splitting;
- one strong 3D experience over many weak canvases.

The final experience should make a user feel that **Moradi Gallery is a contemporary luxury watch house with the technical polish of a world-class creative studio**, while remaining fast, maintainable, accessible, bilingual, and production-ready.
