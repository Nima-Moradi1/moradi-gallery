# Performance budget

## Targets for the finished experience

| Metric                               | Target     | Current measurement    |
| ------------------------------------ | ---------- | ---------------------- |
| CLS                                  | < 0.10     | Not measured           |
| Desktop LCP                          | < 2.5 s    | Not measured           |
| INP                                  | < 200 ms   | Not measured           |
| Desktop compressed hero GLB          | ≤ 2.5 MB   | No GLB yet             |
| Desktop critical compressed textures | ≤ 4 MB     | No 3D textures yet     |
| Mobile GLB + textures                | ≤ 2.5 MB   | No mobile scene yet    |
| Sustained desktop FPS                | ~60        | No animation scene yet |
| Sustained mobile FPS                 | ≥45 target | No animation scene yet |

Do not conflate build success with Core Web Vitals. Lighthouse, field responsiveness, FPS, bundle analysis, and memory profiling are production-phase work. The current hero has reserved dimensions, a preloaded optimized local WebP, and server-rendered content. The installed Three/GSAP packages are not imported into the first phase.

## Foundation verification, 2026-09-13

Production build, lint, strict types, formatting, and peer checks passed. Local HTTP and browser checks passed. Hero source WebP is 44,990 bytes. LCP/CLS/INP, network waterfall, initial JS, FPS, and memory remain unmeasured. The source-image byte count is not a total page payload.
