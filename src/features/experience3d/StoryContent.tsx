import { getTranslations } from "next-intl/server";
import type { ReactNode } from "react";
import { MoradiWatchExperience } from "./MoradiWatchExperience";
import { finishes } from "./materials/finishes";
function Beat({
  id,
  start,
  end,
  children,
  className = "",
  behind = false,
}: {
  id: string;
  start: number;
  end: number;
  children: ReactNode;
  className?: string;
  behind?: boolean;
}) {
  return (
    <section
      id={
        id === "finishes"
          ? "collections"
          : id === "manifesto-copy"
            ? "approach"
            : id === "assembly"
              ? "mechanism"
              : id === "dial-macro"
                ? "details"
                : undefined
      }
      data-beat={id}
      data-start={start}
      data-end={end}
      className={`${behind ? "z-[5]" : "z-20"} pointer-events-none absolute inset-0 px-6 md:px-14 ${start === 0 ? "" : "invisible opacity-0"} group-data-[static=true]/story:visible group-data-[static=true]/story:relative group-data-[static=true]/story:min-h-[60svh] group-data-[static=true]/story:py-20 group-data-[static=true]/story:opacity-100 ${className}`}
    >
      {children}
    </section>
  );
}
function Eyebrow({ children }: { children: ReactNode }) {
  return (
    <p className="mb-5 text-[10px] uppercase ltr:tracking-[.22em] rtl:text-xs opacity-55 md:text-xs">
      {children}
    </p>
  );
}
function Title({
  children,
  className = "",
}: {
  children: ReactNode;
  className?: string;
}) {
  return (
    <h2
      className={`text-[clamp(2.2rem,5.4vw,6rem)] font-normal leading-[1.02] ltr:tracking-[-.055em] rtl:leading-[1.4] ${className}`}
    >
      {children}
    </h2>
  );
}
function Copy({ label, body }: { label: string; body: string }) {
  return (
    <div>
      <h3 className="mb-3 text-xs opacity-55 md:text-sm">{label}</h3>
      <p className="max-w-64 text-xs leading-relaxed md:text-sm">{body}</p>
    </div>
  );
}
export async function WatchStory({ locale }: { locale: string }) {
  const t = await getTranslations("story");
  const fa = locale === "fa";
  const parts = [
    "dial",
    "hands",
    "crystal",
    "bezel",
    "case",
    "strap",
    "crown",
    "caseback",
    "movement",
  ] as const;
  return (
    <MoradiWatchExperience
      locale={locale}
      staticContent={
        <>
          <section
            data-static-section="top"
            className="flex min-h-svh flex-col justify-end px-6 pb-14 pt-32 md:px-14"
          >
            <Eyebrow>{t("edition")}</Eyebrow>
            <h1 className="max-w-2xl text-[clamp(2.3rem,5vw,5rem)] leading-tight">
              {t("heroOne")}
              <br />
              {t("heroTwo")}
            </h1>
            <a
              href="#approach"
              className="mt-7 flex min-h-11 w-fit items-center gap-5 text-xs"
            >
              {t("scroll")} ↓
            </a>
          </section>
          <div className="bg-ink px-6 py-20 text-ivory md:px-14 md:py-32">
            <section
              data-static-section="approach"
              className="mx-auto max-w-6xl border-b border-ivory/15 pb-20"
            >
              <Eyebrow>01 — {t("perspective")}</Eyebrow>
              <Title>
                {t("manifestoOne")}
                <br />
                {t("manifestoTwo")}
                <br />
                {t("manifestoThree")}
              </Title>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted">
                {t("manifestoBody")}
              </p>
            </section>
            <section
              data-static-section="mechanism"
              className="mx-auto max-w-6xl border-b border-ivory/15 py-20"
            >
              <Eyebrow>02 — {t("movement")}</Eyebrow>
              <Title>{t("anatomyTitle")}</Title>
              <p className="mt-8 max-w-lg text-sm leading-relaxed text-muted">
                {t("heartBody")}
              </p>
              <p className="mt-8 text-4xl" dir="ltr">
                28,800
              </p>
              <p className="mt-2 text-xs text-muted">{t("rhythm")}</p>
            </section>
            <section
              data-static-section="details"
              className="mx-auto max-w-6xl py-20"
            >
              <Eyebrow>03 — {t("details")}</Eyebrow>
              <Title>{t("completeTitle")}</Title>
              <div className="mt-12 grid gap-12 sm:grid-cols-2 lg:grid-cols-3">
                <Copy label={t("caseTitle")} body={t("caseBody")} />
                <Copy label={t("dialTitle")} body={t("macroDialBody")} />
                <Copy label={t("handsTitle")} body={t("handsBody")} />
                <Copy label={t("bezelTitle")} body={t("bezelBody")} />
                <Copy label={t("profileTitle")} body={t("profileBody")} />
                <Copy label={t("strapTitle")} body={t("strapBody")} />
              </div>
            </section>
            <section
              data-static-section="collections"
              className="mx-auto max-w-6xl border-t border-ivory/15 pt-20"
            >
              <Eyebrow>04 — {t("expressions")}</Eyebrow>
              <Title>
                {t("personalOne")}
                <br />
                {t("personalTwo")}
              </Title>
              <p className="mt-6 max-w-lg text-sm text-muted">
                {t("finishBody")}
              </p>
              <ul className="mt-10 grid grid-cols-2 gap-8 md:grid-cols-4">
                {finishes.map((f) => (
                  <li key={f.id} className="flex items-center gap-4 text-xs">
                    <span
                      aria-hidden="true"
                      className="size-7 shrink-0 rounded-full"
                      style={{ backgroundColor: f.case }}
                    />
                    {fa ? f.fa : f.name}
                  </li>
                ))}
              </ul>
            </section>
          </div>
        </>
      }
    >
      <Beat
        id="hero-type"
        start={0}
        end={0.033}
        behind
        className="flex items-center justify-center"
      >
        <span
          aria-hidden="true"
          dir="ltr"
          className="block font-sans text-[22.6vw] font-light leading-none tracking-[-.07em] text-ivory/85"
        >
          MORADI
        </span>
      </Beat>
      <Beat
        id="hero"
        start={0}
        end={0.028}
        className="flex flex-col justify-end pb-10 md:pb-14"
      >
        <div className="flex items-end justify-between gap-6">
          <div>
            <Eyebrow>{t("edition")}</Eyebrow>
            <h1 className="text-[clamp(1.6rem,3.2vw,3.5rem)] leading-[1.05] ltr:tracking-[-.04em] rtl:leading-[1.5]">
              {t("heroOne")}
              <br />
              {t("heroTwo")}
            </h1>
          </div>
          <a
            href="#approach"
            className="pointer-events-auto flex min-h-12 items-center gap-5 text-xs transition-opacity hover:opacity-60 focus-visible:outline-2 focus-visible:outline-gold"
          >
            <span className="hidden md:block">{t("scroll")}</span>
            <span
              className="flex size-12 items-center justify-center rounded-full border border-current/30"
              aria-label={t("scroll")}
            >
              ↓
            </span>
          </a>
        </div>
      </Beat>
      <Beat
        id="manifesto-type"
        start={0.022}
        end={0.09}
        behind
        className="flex items-center"
      >
        <p className="max-w-[90%] text-[clamp(3.4rem,10vw,10rem)] leading-[.98] ltr:tracking-[-.06em] rtl:leading-[1.35]">
          {t("manifestoOne")}
          <br />
          <span className="opacity-35">{t("manifestoTwo")}</span>
          <br />
          {t("manifestoThree")}
        </p>
      </Beat>
      <Beat
        id="manifesto-copy"
        start={0.041}
        end={0.095}
        className="flex items-end pb-16 md:items-center md:pb-0"
      >
        <div className="max-w-64 md:ms-auto md:w-1/5">
          <Eyebrow>01 — {t("perspective")}</Eyebrow>
          <p className="text-xs leading-relaxed md:text-sm">
            {t("manifestoBody")}
          </p>
        </div>
      </Beat>
      <Beat
        id="craft"
        start={0.095}
        end={0.183}
        className="flex flex-col justify-between py-[12svh] md:flex-row md:items-center md:py-0"
      >
        <div className="w-[70%] md:w-1/4">
          <Eyebrow>02 — {t("details")}</Eyebrow>
          <Copy label={t("caseTitle")} body={t("caseBody")} />
        </div>
        <div className="w-[65%] self-end md:w-1/4 md:self-auto">
          <Copy label={t("dialTitle")} body={t("dialBody")} />
        </div>
      </Beat>
      <Beat
        id="vertical-type"
        start={0.102}
        end={0.184}
        behind
        className="flex items-center justify-center"
      >
        <span
          aria-hidden="true"
          className="rotate-90 whitespace-nowrap font-sans text-[22vh] tracking-[-.07em] opacity-15"
          dir="ltr"
        >
          CALIBRE M
        </span>
      </Beat>
      <Beat
        id="assembly"
        start={0.182}
        end={0.244}
        className="pt-[9svh] text-center"
      >
        <Eyebrow>03 — {t("anatomy")}</Eyebrow>
        <Title className="text-[clamp(1.7rem,3.3vw,3.4rem)]">
          {t("anatomyTitle")}
        </Title>
        <button
          data-action="explore"
          className="pointer-events-auto mt-5 min-h-11 rounded-full border border-current/25 px-5 text-[10px] transition-colors hover:bg-current/10 focus-visible:outline-2 focus-visible:outline-gold"
        >
          ⊕ &nbsp; {t("explore")}
        </button>
        <div className="absolute inset-x-6 bottom-[12svh] flex justify-center gap-4 text-[9px] opacity-60 md:gap-16 md:text-xs">
          {["crystal", "bezel", "hands", "dial", "movement", "caseback"].map(
            (p) => (
              <span
                key={p}
                className="relative before:absolute before:-top-14 before:start-1/2 before:h-10 before:w-px before:bg-current/30"
              >
                {t(`parts.${p}` as "parts.dial")}
              </span>
            ),
          )}
        </div>
      </Beat>
      <Beat
        id="heart"
        start={0.239}
        end={0.337}
        className="pt-[12svh] md:pt-[25svh]"
      >
        <div className="md:ms-[7%] md:max-w-[33%]">
          <Eyebrow>04 — {t("movement")}</Eyebrow>
          <Title>
            {t("heartOne")}
            <br />
            {t("heartTwo")}
          </Title>
          <p className="mt-8 max-w-64 text-xs leading-relaxed opacity-65 md:text-sm">
            {t("heartBody")}
          </p>
        </div>
        <div className="absolute bottom-12 end-6 md:end-14">
          <span
            className="font-sans text-[clamp(3rem,7vw,7rem)] font-light leading-none tracking-[-.06em]"
            dir="ltr"
          >
            28,800
          </span>
          <p className="mt-2 text-[10px] opacity-45">{t("rhythm")}</p>
        </div>
      </Beat>
      <Beat
        id="reassembly"
        start={0.332}
        end={0.408}
        behind
        className="flex items-center"
      >
        <p className="text-[clamp(3.2rem,10.4vw,11rem)] leading-[.99] ltr:tracking-[-.06em] rtl:leading-[1.35] opacity-70">
          {t("togetherOne")}
          <br />
          <span className="opacity-40">{t("togetherTwo")}</span>
          <br />
          {t("togetherThree")}
        </p>
      </Beat>
      <Beat
        id="contours"
        start={0.43}
        end={0.515}
        className="pt-[12svh] text-center"
      >
        <Eyebrow>05 — {t("form")}</Eyebrow>
        <Title>{t("contours")}</Title>
        <p className="mx-auto mt-5 max-w-72 text-xs leading-relaxed opacity-60">
          {t("contoursBody")}
        </p>
      </Beat>
      <Beat
        id="dial-macro"
        start={0.505}
        end={0.596}
        className="flex items-center"
      >
        <div className="absolute left-6 top-1/2 w-[34%] -translate-y-1/2 space-y-7 md:left-[16%] md:w-[22%] md:space-y-10">
          <Copy label={t("dialTitle")} body={t("macroDialBody")} />
          <Copy label={t("handsTitle")} body={t("handsBody")} />
          <Copy label={t("bezelTitle")} body={t("bezelBody")} />
        </div>
      </Beat>
      <Beat
        id="profile"
        start={0.594}
        end={0.669}
        className="pt-[12svh] text-center"
      >
        <Eyebrow>06 — {t("profileLabel")}</Eyebrow>
        <Title>{t("profileTitle")}</Title>
        <p className="mx-auto mt-5 max-w-64 text-xs leading-relaxed opacity-60">
          {t("profileBody")}
        </p>
      </Beat>
      <Beat
        id="strap"
        start={0.67}
        end={0.782}
        className="pt-[12svh] text-center"
      >
        <Eyebrow>07 — {t("material")}</Eyebrow>
        <Title>{t("strapTitle")}</Title>
        <p className="mx-auto mt-5 max-w-64 text-xs leading-relaxed opacity-60">
          {t("strapBody")}
        </p>
      </Beat>
      <Beat
        id="perspective"
        start={0.773}
        end={0.818}
        behind
        className="flex items-center"
      >
        <p className="text-[clamp(3.2rem,9.7vw,10rem)] leading-[1.02] ltr:tracking-[-.06em] rtl:leading-[1.4]">
          {t("personalOne")}
          <br />
          <span className="opacity-40">{t("personalTwo")}</span>
        </p>
      </Beat>
      <Beat
        id="finish-type"
        start={0.816}
        end={0.912}
        behind
        className="flex items-center justify-center"
      >
        <p
          data-finish-name
          className="max-w-5xl text-center text-[clamp(3.4rem,11vw,12rem)] leading-[.92] ltr:tracking-[-.06em] rtl:leading-[1.4] opacity-25"
        >
          {fa ? finishes[0].fa : finishes[0].name}
        </p>
      </Beat>
      <Beat
        id="finishes"
        start={0.812}
        end={0.914}
        className="flex flex-col justify-between pb-10 pt-12 md:pb-14 md:pt-16"
      >
        <div className="text-center">
          <Eyebrow>08 — {t("expressions")}</Eyebrow>
          <p className="text-xs opacity-70">{t("finishBody")}</p>
        </div>
        <div className="flex items-end justify-between gap-3">
          <div>
            <p data-finish-name className="mb-4 text-xs">
              {fa ? finishes[0].fa : finishes[0].name}
            </p>
            <div
              className="pointer-events-auto flex gap-2"
              role="group"
              aria-label={t("selectFinish")}
            >
              {finishes.map((f, i) => (
                <button
                  data-finish={i}
                  key={f.id}
                  aria-label={fa ? f.fa : f.name}
                  aria-pressed={i === 0}
                  className="flex size-11 items-center justify-center rounded-full border border-transparent transition-colors hover:border-current/40 focus-visible:outline-2 focus-visible:outline-gold aria-pressed:border-current/70"
                >
                  <span
                    className="size-5 rounded-full shadow-inner"
                    style={{ backgroundColor: f.case }}
                  />
                </button>
              ))}
            </div>
          </div>
          <div className="pointer-events-auto flex gap-2">
            <button
              data-action="previous-finish"
              aria-label={t("previousFinish")}
              className="size-11 rounded-full border border-current/25 hover:bg-current/10"
            >
              ←
            </button>
            <button
              data-action="next-finish"
              aria-label={t("nextFinish")}
              className="size-11 rounded-full border border-current/25 hover:bg-current/10"
            >
              →
            </button>
          </div>
        </div>
      </Beat>
      <Beat
        id="specs"
        start={0.94}
        end={0.978}
        className="flex flex-col justify-center md:items-end"
      >
        <div className="w-full md:absolute md:right-14 md:top-1/2 md:w-[51%] md:-translate-y-1/2">
          <Eyebrow>09 — {t("composition")}</Eyebrow>
          <Title className="mb-6 text-[clamp(2rem,4vw,4rem)]">
            {t("completeTitle")}
          </Title>
          <div className="pointer-events-auto border-t border-current/20">
            {parts.map((p, i) => (
              <button
                key={p}
                data-part={p}
                data-pose={
                  p === "strap"
                    ? 0.72
                    : p === "crown"
                      ? 0.63
                      : p === "movement" || p === "caseback"
                        ? 0.28
                        : p === "dial" || p === "hands" || p === "bezel"
                          ? 0.535
                          : 0.221
                }
                className="group flex min-h-11 w-full items-center justify-between gap-3 border-b border-current/15 py-2 text-start text-xs transition-colors hover:bg-current/5 focus-visible:outline-2 focus-visible:outline-gold md:min-h-12"
              >
                <span className="w-8 font-sans text-[10px] opacity-35">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <span className="flex-1">{t(`parts.${p}`)}</span>
                <span className="text-[9px] opacity-40">{t("viewDetail")}</span>
                <span className="transition-transform group-hover:translate-x-1">
                  ↗
                </span>
              </button>
            ))}
          </div>
        </div>
      </Beat>
      <Beat
        id="finale"
        start={0.973}
        end={1}
        behind
        className="pt-[10svh] text-center"
      >
        <p
          className="font-sans text-[19vw] leading-none tracking-[-.07em]"
          dir="ltr"
        >
          MORADI
        </p>
      </Beat>
      <Beat
        id="finale-controls"
        start={0.977}
        end={1}
        className="flex items-end justify-center pb-10"
      >
        <a
          href="#collections"
          className="pointer-events-auto min-h-11 rounded-full border border-current/25 px-7 py-4 text-xs hover:bg-current/10"
        >
          {t("chooseExpression")} ↗
        </a>
      </Beat>
    </MoradiWatchExperience>
  );
}
