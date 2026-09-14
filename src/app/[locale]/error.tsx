"use client";
import { useTranslations } from "next-intl";
import { Button } from "@/design-system/primitives/Button";
export default function ErrorPage({ reset }: { reset: () => void }) {
  const t = useTranslations("error");
  return (
    <section className="flex min-h-svh flex-col items-center justify-center gap-8 p-6 text-center">
      <h1 className="text-3xl">{t("title")}</h1>
      <p className="text-mutedText">{t("description")}</p>
      <Button onClick={reset}>{t("retry")}</Button>
    </section>
  );
}
