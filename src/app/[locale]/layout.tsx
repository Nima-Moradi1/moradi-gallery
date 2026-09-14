import type { Metadata } from "next";
import { Manrope, Vazirmatn } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { notFound } from "next/navigation";
import { routing } from "@/i18n/routing";
import { SiteHeader } from "@/features/navigation/SiteHeader";
import { SiteFooter } from "@/features/navigation/SiteFooter";
import "../globals.css";
const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});
const vazirmatn = Vazirmatn({
  subsets: ["arabic"],
  variable: "--font-vazirmatn",
  display: "swap",
});
export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}
export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  const t = await getTranslations({ locale, namespace: "metadata" });
  return {
    title: t("title"),
    description: t("description"),
    robots: { index: false, follow: false },
  };
}
export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations("navigation");
  return (
    <html
      lang={locale}
      dir={locale === "fa" ? "rtl" : "ltr"}
      className={`${manrope.variable} ${vazirmatn.variable}`}
    >
      <body
        className={`bg-ink text-ivory antialiased selection:bg-gold/30 ${locale === "fa" ? "font-persian" : "font-sans"}`}
      >
        <NextIntlClientProvider>
          <a
            href="#main"
            className="fixed start-4 top-4 z-skipLink -translate-y-24 bg-ivory px-5 py-3 text-ink focus:translate-y-0"
          >
            {t("skip")}
          </a>
          <SiteHeader locale={locale} />
          <main id="main" tabIndex={-1}>
            {children}
          </main>
          <SiteFooter />
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
