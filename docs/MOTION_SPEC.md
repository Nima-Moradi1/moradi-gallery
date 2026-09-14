# Motion specification

Current phase is intentionally static. Native browser scrolling, functional anchors, restrained Tailwind focus/hover feedback, no pinning, no canvas, no arbitrary loading delay. The localized loading route uses a static brand mark. It makes no claim about progress.

Future ownership: GSAP/ScrollTrigger owns the scroll-linked DOM and camera/object timeline; R3F consumes refs; Motion owns mobile navigation and isolated FAQ transitions; CSS owns hover. A single property must have one animation owner.

Future master labels: hero → manifesto → macro → resolve → exit. Derive progress from scroll refs, never React state per frame. Use matchMedia for mobile and reduced motion, clean up every timeline on unmount, and disable long pins/parallax for reduced motion. Add real first-frame readiness only when a real model exists.
