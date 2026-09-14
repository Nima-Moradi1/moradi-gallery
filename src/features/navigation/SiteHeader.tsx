import { getTranslations } from "next-intl/server";
import type { Locale } from "@/i18n/routing";
import { Container } from "@/design-system/primitives/Container";
import { BrandMark } from "./BrandMark";
import { LocaleSwitch } from "@/design-system/navigation/LocaleSwitch";
import { MobileNavigation } from "./MobileNavigation";
export async function SiteHeader({ locale }: { locale: Locale }) {
  const t = await getTranslations("navigation");
  const links = [
    { href: "#collections", label: t("collections") },
    { href: "#approach", label: t("approach") },
  ];
  return (
    <header className="absolute inset-x-0 top-0 z-navigation">
      <Container className="flex h-24 items-center justify-between gap-4 md:h-28">
        <a
          href={`/${locale}`}
          className="flex min-h-11 items-center gap-3 focus-visible:outline-2 focus-visible:outline-gold md:gap-7"
          aria-label={t("home")}
        >
          <BrandMark />
          <span className="text-sm ltr:tracking-[0.22em] rtl:text-xl md:text-base">
            {t("brand")}
          </span>
        </a>
        <nav
          className="flex items-center gap-3 md:gap-10"
          aria-label={t("label")}
        >
          {links.map((link) => (
            <a
              key={link.href}
              href={link.href}
              className="hidden min-h-11 items-center text-base transition-colors hover:text-goldLight focus-visible:outline-2 focus-visible:outline-gold md:inline-flex"
            >
              {link.label}
            </a>
          ))}
          <LocaleSwitch />
          <MobileNavigation links={links} />
        </nav>
      </Container>
    </header>
  );
}
