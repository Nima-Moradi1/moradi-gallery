# Live reference audit

Inspected 2026-09-12/13 using the Codex in-app browser, DOM/computed-style reads, native scrolling, and screenshots. Public websites were used as visual/content references only. No scripts or product assets were extracted for reuse.

## Evidence and limits

The current https://www.moto-card.com hero shows a card upright on a low architectural podium in a dark textured environment. This differs from the globe-centered hero described in the supplied brief. The later page includes globe/card media. There is no verified evidence here for exact camera values, shader code, internal animation libraries, or source topology.

Desktop viewport: 1440 × 900. Observed document height: 11792px. Scroll ranges below are approximate section-heading positions, not reverse-engineered pin durations. Captures sampled native-scroll states; filenames describe the intended sequence position and can include transitions. This is the initial audit, not frame-by-frame timing certification. Mobile capture size requested: 390 × 844; complete mobile measurements and all mobile section captures remain follow-up work.

## Moto section observations

| Section            | Approx. heading Y | Heading size / line height | Visible structure                                                                        |
| ------------------ | ----------------: | -------------------------- | ---------------------------------------------------------------------------------------- |
| Hero               |             138px | 64 / 64px                  | Two centered uppercase lines; black stage; card/podium below; low CTA; compact fixed nav |
| Manifesto          |            1161px | 64 / 64px                  | Large statement, narrow support, large product/media transition                          |
| Product transition |            2447px | 52 / 52px                  | "Card is only the beginning" transition; cinematic media overlap                         |
| Global values      |            4423px | 52 / 52px                  | Light visual field, distributed floating currency labels                                 |
| Concierge          |            5482px | 64 / 64px                  | Dark section; large four-line left heading; capability labels                            |
| Category sequence  |            8162px | 42 / 42px                  | Lifestyle imagery leading into Hotels/Dining/Travel/Experiences/Wellness                 |
| Network            |            9028px | 64 / 64px                  | Two-line statement, concise support, CTA                                                 |
| FAQ                |            9693px | 42 / 42px                  | Large heading; grouped semantic disclosure controls                                      |
| Final CTA/footer   |           11119px | 52 / 52px                  | Large left statement and action; restrained multi-column links                           |

Hero has generous negative space, roughly 32px horizontal header gutters, a heading spanning about 550px, and a single dominant focal object. The final CTA uses a broad left text area and smaller right link columns. Body copy is narrow relative to the viewport. No exact internal timing, canvas configuration, or pinning implementation is claimed.

### Entry/exit and mobile follow-up

The page changes background/material between major sequences. Header remains available through scrolling. Caption-like values disperse around the global-spend field. Exact entry/exit easing, pinned ranges, media geometry across all breakpoints, and first-frame readiness are still unmeasured. Mobile hero and story snapshots are present; repeat the full section audit after the initial foundation.

## Javaherian content reference

https://www.javaherian-gallery.com is an RTL commerce site with a gold-toned header, product carousel, product/brand/category navigation, search, shopping cart, promotions, price bands, a guided finder, extensive brand list, and business/policy FAQs. Men/women/couples categories and the Swiss/Japanese taxonomy were visible. A phone-capture discount modal was dismissed without submitting information.

Moradi can use the customer needs behind these patterns: discovering a style, movement, fit and budget, understanding product policies, and getting consultation. Javaherian's brand availability, phone numbers, warranty statements, prices, ratings, identity and product images must not be presented as Moradi facts.

## Moradi implementation decisions

Retain the spacious cinematic hierarchy and deliberate sequence. Use original Moradi typography and photography. First build a static hero that remains usable without JavaScript or WebGL; then introduce a real model. Keep the dark brand palette consistent. Future light/image transitions require deliberate art direction. Do not fake the reference's internals.
