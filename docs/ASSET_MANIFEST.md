# Asset manifest

| Asset                                | Source / owner                              | Permission / provenance                              | Format    | Critical | Status              |
| ------------------------------------ | ------------------------------------------- | ---------------------------------------------------- | --------- | -------- | ------------------- |
| docs/design/hero-concept.png         | Generated for Moradi                        | Built-in image generation, original fictional design | PNG       | No       | Visual reference    |
| public/images/hero/moradi-watch.webp | Generated for Moradi, edited from concept   | Original fictional watch, not a real stock item      | WebP      | Yes      | Static fallback     |
| public/brand/monogram.svg            | Original simplified M geometry from concept | Created for this project                             | SVG       | Yes      | First-pass identity |
| docs/reference/*                     | Screenshots of public reference sites       | Internal comparison only, never served as app media  | PNG       | No       | Audit evidence      |
| Future watch GLB                     | Not supplied                                | Ownership/license must be confirmed                  | GLB       | Future   | Missing             |
| Lifestyle sequence                   | Not supplied                                | Original/generated/licensed assets required          | WebP/AVIF | No       | Missing             |

No Moto/Javaherian assets or logos are imported into the app. Font licensing follows the Google Fonts distributions consumed by next/font. Exact file sizes are recorded after image optimization. Build-time Google Fonts availability must be verified.

## Generation prompts

Built-in image generation was used. Initial prompt: a 1440 × 900 modern Moradi Gallery opening viewport, flat #080907, ivory Manrope-like title, restrained #C5A25D mark, original black-dial/gold-case/leather-strap dress watch at lower center; exact navigation, heading, support and CTA are listed in DESIGN_SYSTEM.md. Output was 1586 × 992.

Edit prompt: retain the exact watch, lighting, scale, perspective and dark background; remove all page UI and large text. Only the tiny MORADI text engraved on the fictional dial remains. Output copied into the repository, then converted to WebP without changing the image composition.

Optimized hero: 1585 × 992, 44,990 bytes (~44 KiB) WebP at quality 90. Source PNG is kept under docs/design, outside public assets.
