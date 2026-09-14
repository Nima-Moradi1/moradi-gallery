import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
export type NarrativeState = {
  progress: number;
  finish: number;
  explore: boolean;
  pointerX: number;
  pointerY: number;
  dragX: number;
  dragY: number;
  ready: boolean;
  quality: "high" | "medium" | "low" | "fallback";
  poseLock: number | null;
};
export function createNarrativeState(): NarrativeState {
  return {
    progress: 0,
    finish: 0,
    explore: false,
    pointerX: 0,
    pointerY: 0,
    dragX: 0,
    dragY: 0,
    ready: false,
    quality: "high",
    poseLock: null,
  };
}
export function mountMasterTimeline(story: HTMLElement, state: NarrativeState) {
  gsap.registerPlugin(ScrollTrigger);
  const panels = [...story.querySelectorAll<HTMLElement>("[data-beat]")];
  const progressLine = story.querySelector<HTMLElement>("[data-progress-line]");
  const render = () => {
    const p = state.poseLock ?? state.progress;
    for (const el of panels) {
      const start = Number(el.dataset.start),
        end = Number(el.dataset.end),
        edge = Number(el.dataset.edge || 0.012);
      const enter =
        start === 0 ? 1 : gsap.utils.clamp(0, 1, (p - start) / edge);
      const leave = end === 1 ? 1 : gsap.utils.clamp(0, 1, (end - p) / edge);
      const alpha = Math.min(enter, leave);
      el.style.opacity = String(alpha);
      el.style.visibility = alpha > 0.002 ? "visible" : "hidden";
      el.style.transform = `translate3d(0,${(1 - enter) * 35 - (1 - leave) * 22}px,0)`;
      el.inert = alpha < 0.35;
      el.setAttribute("aria-hidden", String(alpha < 0.01));
    }
    if (progressLine) progressLine.style.transform = `scaleX(${p})`;
  };
  const tween = gsap.to(state, {
    progress: 1,
    ease: "none",
    onUpdate: render,
    scrollTrigger: {
      trigger: story,
      start: "top top",
      end: "bottom bottom",
      scrub: 0.45,
      invalidateOnRefresh: true,
    },
  });
  render();
  return () => {
    tween.scrollTrigger?.kill();
    tween.kill();
  };
}
