# Design system

Reading: contemporary luxury watch gallery for design-conscious watch buyers. Modern geometric typography, generous spacing, matte obsidian and restrained warm gold. Custom Tailwind aesthetic; no external branded design system.

## Stage-specific dials

- DESIGN_VARIANCE: 7 (editorial, spacious).
- MOTION_INTENSITY: 3 for the static foundation; target 7 after the WebGL/scroll phases.
- VISUAL_DENSITY: 3.

The brief explicitly chooses black/gold and a centered cinematic hero. Those requirements take precedence over generic skill defaults about centering and palette. The generated concept is an agent-selected first-pass reference, not a user-approved final identity.

## Tokens

colors.ts contains the brief's semantic palette. Font variables use Manrope for English and Vazirmatn for Persian via next/font. English title tracking is tight; Persian has no letter spacing. Spacing uses 24px mobile and 56px desktop gutters, 96px mobile and 128px desktop section spacing. Controls use square outlines and 44px minimum targets. z-index separates media, content, navigation, dialog, and skip link.

## Primitives

Container has wide/content/narrow variants. Heading has hero/section/subsection variants. Text has body/lead/caption variants. Button has solid/outline/quiet variants. TextLink uses the same arrow weight, focus treatment, and hover motion. All variants use CVA where meaningful. No page-specific CSS belongs in globals.css.

## Opening viewport contract

Reference: docs/design/hero-concept.png, native 1586 × 992.

- Header: M mark, MORADI GALLERY, Collections, Our approach, FA.
- H1: BUILT FOR / TIMELESS TASTE.
- Support: A considered perspective on time.
- CTA: Discover the gallery.
- Watch: original generated dress-watch design with black strap and gold case, lower center.
- No image color wash; original background and studio lighting retained.
- Mobile: smaller header, modal menu, two-line heading, larger central crop, stacked bottom copy/action.

Concept image is an implementation reference only. Text and navigation must remain real HTML. Product image contains only the watch and its small fictional dial engraving.
