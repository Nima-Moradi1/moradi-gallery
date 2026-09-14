"use client";
/* eslint-disable react-hooks/immutability -- Three.js and the GSAP controller are imperative external objects; frame data deliberately never enters React state. */
import dynamic from "next/dynamic";
import Image from "next/image";
import {
  Component,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ReactNode,
} from "react";
import { gsap } from "gsap";
import {
  createNarrativeState,
  mountMasterTimeline,
} from "./narrative/masterTimeline";
import { finishes } from "./materials/finishes";
const WatchScene = dynamic(() => import("./WatchScene"), { ssr: false });
class SceneBoundary extends Component<
  { children: ReactNode; onError: () => void },
  { failed: boolean }
> {
  state = { failed: false };
  static getDerivedStateFromError() {
    return { failed: true };
  }
  componentDidCatch() {
    this.props.onError();
  }
  render() {
    return this.state.failed ? null : this.props.children;
  }
}
export function MoradiWatchExperience({
  children,
  staticContent,
  locale,
}: {
  children: ReactNode;
  staticContent: ReactNode;
  locale: string;
}) {
  const root = useRef<HTMLElement>(null),
    loader = useRef<HTMLDivElement>(null),
    drag = useRef<{ x: number; y: number; active: boolean }>({
      x: 0,
      y: 0,
      active: false,
    });
  const cleanupTimeline = useRef<() => void>(() => {});
  const state = useMemo(() => createNarrativeState(), []);
  const [enabled, setEnabled] = useState(false),
    [ready, setReady] = useState(false),
    [fallback, setFallback] = useState(false),
    [debug, setDebug] = useState(false),
    [explore, setExplore] = useState(false);
  const fa = locale === "fa";
  const onProgress = useCallback((n: number) => {
    const el = document.getElementById("load-progress");
    if (el) el.textContent = String(Math.round(n)).padStart(2, "0");
    const circle = document.getElementById("load-ring");
    if (circle) circle.style.strokeDashoffset = String(100 - n);
  }, []);
  const onReady = useCallback(() => {
    setReady(true);
    if (loader.current)
      gsap.to(loader.current, { autoAlpha: 0, duration: 0.75, delay: 0.15 });
  }, []);
  const onError = useCallback(() => {
    cleanupTimeline.current();
    if (root.current) {
      root.current.dataset.static = "true";
      const stage = root.current.querySelector<HTMLElement>("#watch-stage");
      if (stage) {
        stage.style.color = "#e5e1d7";
        stage.style.backgroundColor = "#101410";
      }
      root.current
        .querySelectorAll<HTMLElement>("[data-beat]")
        .forEach((el) => {
          el.style.removeProperty("visibility");
          el.style.removeProperty("opacity");
          el.style.removeProperty("transform");
          el.inert = false;
          el.removeAttribute("aria-hidden");
        });
    }
    state.explore = false;
    setExplore(false);
    setFallback(true);
    setEnabled(false);
    onReady();
  }, [onReady, state]);
  useEffect(() => {
    const story = root.current!;
    const reduce = matchMedia("(prefers-reduced-motion: reduce)");
    const params = new URLSearchParams(location.search);
    const canvas = document.createElement("canvas");
    const context = canvas.getContext("webgl2");
    const unsupported = !context;
    context?.getExtension("WEBGL_lose_context")?.loseContext();
    const setup = () => {
      if (
        reduce.matches ||
        (process.env.NODE_ENV === "development" &&
          params.get("motion") === "reduce") ||
        unsupported
      ) {
        onError();
        return () => {};
      }
      delete story.dataset.static;
      setFallback(false);
      setReady(false);
      state.ready = false;
      state.quality =
        innerWidth < 700
          ? "medium"
          : navigator.hardwareConcurrency <= 4
            ? "medium"
            : "high";
      if (process.env.NODE_ENV === "development") {
        const q = params.get("quality");
        if (q === "high" || q === "medium" || q === "low") state.quality = q;
        if (q === "fallback") {
          story.dataset.static = "true";
          onError();
          return () => {};
        }
        const pose = params.get("pose");
        if (pose !== null && Number.isFinite(Number(pose)))
          state.poseLock = Math.max(0, Math.min(1, Number(pose)));
        setDebug(params.get("debug3d") === "1");
      }
      setEnabled(true);
      const cleanup = mountMasterTimeline(story, state);
      cleanupTimeline.current = cleanup;
      if (state.poseLock !== null)
        window.scrollTo(
          0,
          story.offsetTop + (story.offsetHeight - innerHeight) * state.poseLock,
        );
      return cleanup;
    };
    let clean = setup();
    const media = () => {
      clean();
      clean = setup();
    };
    reduce.addEventListener("change", media);
    const timeout = window.setTimeout(() => {
      if (!state.ready) onError();
    }, 25000);
    const wake = () => {
      if (!document.hidden) window.dispatchEvent(new Event("resize"));
    };
    document.addEventListener("visibilitychange", wake);
    const navigation = (e: MouseEvent) => {
      const target = (e.target as Element).closest<HTMLAnchorElement>(
        'a[href^="#"]',
      );
      if (!target) return;
      const href = target.getAttribute("href");
      const p =
        href === "#approach"
          ? 0.045
          : href === "#collections"
            ? 0.845
            : href === "#mechanism"
              ? 0.221
              : href === "#details"
                ? 0.535
                : href === "#top"
                  ? 0
                  : null;
      if (p === null) return;
      e.preventDefault();
      if (story.dataset.static === "true") {
        if (href) {
          const destination =
            story.querySelector(`[data-static-section="${href.slice(1)}"]`) ??
            document.querySelector(href);
          destination?.scrollIntoView({ behavior: "instant" });
        }
        return;
      }
      const total = story.offsetHeight - innerHeight;
      window.scrollTo({
        top: story.offsetTop + total * p,
        behavior: reduce.matches ? "instant" : "smooth",
      });
    };
    document.addEventListener("click", navigation);
    return () => {
      clean();
      clearTimeout(timeout);
      reduce.removeEventListener("change", media);
      document.removeEventListener("click", navigation);
      document.removeEventListener("visibilitychange", wake);
    };
  }, [onError, onReady, state]);
  useEffect(() => {
    if (!explore) return;
    const before = document.activeElement;
    root.current?.querySelector<HTMLElement>('[role="application"]')?.focus();
    return () => {
      if (before instanceof HTMLElement && before.isConnected) before.focus();
    };
  }, [explore]);
  const selectFinish = (index: number) => {
    state.finish = (index + 4) % 4;
    root.current
      ?.querySelectorAll<HTMLElement>("[data-finish]")
      .forEach((el) =>
        el.setAttribute(
          "aria-pressed",
          String(Number(el.dataset.finish) === state.finish),
        ),
      );
    root.current
      ?.querySelectorAll<HTMLElement>("[data-finish-name]")
      .forEach((el) => {
        el.textContent = fa
          ? finishes[state.finish].fa
          : finishes[state.finish].name;
      });
  };
  const handleAction = (target: Element) => {
    const finish = target.closest<HTMLElement>("[data-finish]");
    if (finish) selectFinish(Number(finish.dataset.finish));
    const action = target.closest<HTMLElement>("[data-action]")?.dataset.action;
    if (action === "next-finish") selectFinish(state.finish + 1);
    if (action === "previous-finish") selectFinish(state.finish - 1);
    if (action === "explore" && root.current?.dataset.static !== "true") {
      state.explore = !state.explore;
      setExplore(state.explore);
      state.dragX = state.dragY = 0;
    }
    const part = target.closest<HTMLElement>("[data-part]");
    if (part) {
      state.poseLock = null;
      const p = Number(part.dataset.pose);
      window.scrollTo({
        top:
          root.current!.offsetTop +
          (root.current!.offsetHeight - innerHeight) * p,
        behavior: "smooth",
      });
    }
  };
  return (
    <section
      ref={root}
      id="watch-story"
      aria-label={fa ? "داستان ساعت مرادی" : "The Moradi watch story"}
      className="group/story relative h-[3800svh] data-[static=true]:h-auto"
      onPointerMove={(e) => {
        if (!state.explore) {
          state.pointerX = (e.clientX / innerWidth) * 2 - 1;
          state.pointerY = (e.clientY / innerHeight) * 2 - 1;
        }
      }}
      onClick={(e) => handleAction(e.target as Element)}
    >
      <div
        id="watch-stage"
        className="sticky top-0 h-svh min-h-[600px] overflow-hidden bg-[#101410] text-ivory group-data-[static=true]/story:relative group-data-[static=true]/story:h-auto group-data-[static=true]/story:overflow-visible"
      >
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_65%_30%,#d9c99a12,transparent_55%)]"
        />
        <div
          id="watch-orbit"
          aria-hidden="true"
          className="pointer-events-none absolute left-1/2 top-1/2 z-0 aspect-square w-[78svh] rounded-full border border-current/25 opacity-40 group-data-[static=true]/story:hidden"
        >
          <div className="absolute inset-3 rounded-full border border-dashed border-current/10" />
          <span className="absolute left-1/2 top-0 h-full w-px bg-current/10" />
          <span className="absolute left-0 top-1/2 h-px w-full bg-current/10" />
        </div>
        <div
          aria-hidden="true"
          className={`pointer-events-none absolute inset-0 z-[2] transition-opacity duration-1000 ${ready && !fallback ? "opacity-0" : "opacity-100"} group-data-[static=true]/story:h-svh`}
        >
          <Image
            src="/images/hero/moradi-watch.webp"
            alt=""
            fill
            preload
            sizes="100vw"
            className="object-cover opacity-80"
          />
        </div>
        {enabled && (
          <div
            aria-hidden="true"
            className={`absolute inset-0 z-10 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}
          >
            <SceneBoundary onError={onError}>
              <WatchScene
                state={state}
                onReady={onReady}
                onProgress={onProgress}
                onError={onError}
              />
            </SceneBoundary>
          </div>
        )}
        <div className="contents group-data-[static=true]/story:hidden">
          {children}
        </div>
        <div className="relative z-20 hidden group-data-[static=true]/story:block">
          {staticContent}
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 z-30 h-px bg-current/10 group-data-[static=true]/story:hidden">
          <div
            data-progress-line
            className="h-full origin-left scale-x-0 bg-gold"
          />
        </div>
        {explore && (
          <div
            className="absolute inset-0 z-20 cursor-grab touch-none active:cursor-grabbing"
            role="application"
            aria-label={
              fa
                ? "چرخاندن اجزای ساعت با کشیدن یا کلیدهای جهت"
                : "Rotate watch components by dragging or using arrow keys"
            }
            tabIndex={0}
            onKeyDown={(e) => {
              if (
                ![
                  "Escape",
                  "ArrowLeft",
                  "ArrowRight",
                  "ArrowUp",
                  "ArrowDown",
                ].includes(e.key)
              )
                return;
              if (e.key === "Escape") {
                state.explore = false;
                setExplore(false);
              }
              if (e.key === "ArrowLeft") state.dragX -= 0.15;
              if (e.key === "ArrowRight") state.dragX += 0.15;
              if (e.key === "ArrowUp") state.dragY -= 0.1;
              if (e.key === "ArrowDown") state.dragY += 0.1;
              e.preventDefault();
            }}
            onPointerDown={(e) => {
              drag.current = { x: e.clientX, y: e.clientY, active: true };
              e.currentTarget.setPointerCapture(e.pointerId);
            }}
            onPointerMove={(e) => {
              if (drag.current.active) {
                state.dragX += (e.clientX - drag.current.x) * 0.006;
                state.dragY = Math.max(
                  -0.75,
                  Math.min(
                    0.75,
                    state.dragY + (e.clientY - drag.current.y) * 0.005,
                  ),
                );
                drag.current.x = e.clientX;
                drag.current.y = e.clientY;
              }
            }}
            onPointerUp={() => {
              drag.current.active = false;
            }}
            onPointerCancel={() => {
              drag.current.active = false;
            }}
          >
            <button
              className="absolute right-6 top-6 z-40 min-h-11 rounded-full border border-current/30 bg-ink px-6 py-3 text-ivory"
              onClick={() => {
                state.explore = false;
                setExplore(false);
              }}
            >
              {fa ? "پایان بررسی" : "Close exploration"} ×
            </button>
          </div>
        )}
        {process.env.NODE_ENV === "development" && (
          <aside
            hidden={!debug}
            className="absolute left-3 top-3 z-50 max-h-[80vh] w-72 overflow-auto rounded bg-black/85 p-3 font-mono text-[10px] text-white"
            dir="ltr"
          >
            <label>
              Pose{" "}
              <input
                aria-label="Lock narrative pose"
                type="range"
                min="0"
                max="1"
                step=".001"
                defaultValue={state.poseLock ?? 0}
                onChange={(e) => {
                  state.poseLock = Number(e.target.value);
                  window.dispatchEvent(new Event("resize"));
                }}
              />
            </label>
            <button
              className="ms-3"
              onClick={() => {
                state.poseLock = null;
              }}
            >
              Live scroll
            </button>
            <pre id="debug-3d-data" />
          </aside>
        )}
      </div>
      <div
        ref={loader}
        role="status"
        aria-live="polite"
        className="pointer-events-none fixed inset-0 z-[90] flex flex-col items-center justify-center bg-ink text-ivory"
      >
        <svg
          className="absolute w-[min(75vw,70vh)] -rotate-90"
          viewBox="0 0 100 100"
          fill="none"
        >
          <circle
            cx="50"
            cy="50"
            r="49"
            stroke="#c5a25d"
            opacity=".12"
            strokeWidth=".15"
          />
          <circle
            id="load-ring"
            cx="50"
            cy="50"
            r="49"
            pathLength="100"
            stroke="#c5a25d"
            strokeWidth=".18"
            strokeDasharray="100"
            strokeDashoffset="100"
          />
        </svg>
        <span className="mb-5 font-sans text-xs tracking-[.4em]" dir="ltr">
          MORADI
        </span>
        <span className="text-xs text-muted">
          {fa ? "آماده‌سازی تجربه" : "Preparing the experience"}
        </span>
        <span
          id="load-progress"
          className="mt-6 font-sans text-[10px] tabular-nums text-gold"
          dir="ltr"
        >
          00
        </span>
      </div>
    </section>
  );
}
