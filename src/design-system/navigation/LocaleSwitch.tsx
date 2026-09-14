"use client";
import { useLocale, useTranslations } from "next-intl";
import { Link, usePathname } from "@/i18n/navigation";
export function LocaleSwitch() {
  const locale = useLocale();
  const pathname = usePathname();
  const t = useTranslations("navigation");
  const target = locale === "fa" ? "en" : "fa";
  return (
    <Link
      href={pathname}
      locale={target}
      aria-label={t("switchLanguage")}
      lang={target}
      className="inline-flex min-h-11 min-w-11 items-center justify-center border-b border-gold font-sans text-sm hover:text-goldLight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold"
    >
      {target.toUpperCase()}
    </Link>
  );
}
