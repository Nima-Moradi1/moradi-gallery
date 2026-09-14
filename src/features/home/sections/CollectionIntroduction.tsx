import { getTranslations } from "next-intl/server";
import { Container } from "@/design-system/primitives/Container";
import { Heading } from "@/design-system/primitives/Heading";
import { Text } from "@/design-system/primitives/Text";
export async function CollectionIntroduction() {
  const t = await getTranslations("home.collections");
  const categories = [
    "classic",
    "automatic",
    "sport",
    "swiss",
    "japanese",
  ] as const;
  return (
    <section
      id="collections"
      className="scroll-mt-12 bg-obsidian py-24 md:py-section"
      aria-labelledby="collections-heading"
    >
      <Container size="content">
        <Heading id="collections-heading" className="max-w-[750px]">
          {t("heading")}
        </Heading>
        <Text className="mt-6 max-w-[580px]">{t("body")}</Text>
        <div className="mt-12 grid gap-x-16 md:grid-cols-2">
          {categories.map((category, i) => (
            <div
              key={category}
              className="flex items-baseline gap-6 border-t border-borderDark py-6"
            >
              <span className="font-sans text-sm text-gold" dir="ltr">
                {String(i + 1).padStart(2, "0")}
              </span>
              <h3 className="text-3xl leading-relaxed md:text-4xl">
                {t(category)}
              </h3>
            </div>
          ))}
        </div>
      </Container>
    </section>
  );
}
