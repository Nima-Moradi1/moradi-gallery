import { getTranslations } from "next-intl/server";
import { Container } from "@/design-system/primitives/Container";
import { Heading } from "@/design-system/primitives/Heading";
import { Text } from "@/design-system/primitives/Text";
export async function BrandManifesto() {
  const t = await getTranslations("home.manifesto");
  return (
    <section
      id="approach"
      className="scroll-mt-12 py-24 md:py-section"
      aria-labelledby="approach-heading"
    >
      <Container size="content">
        <Heading id="approach-heading" className="max-w-[950px]">
          {t("heading")}
        </Heading>
        <Text size="lead" className="mt-10 max-w-[550px] md:ms-auto md:mt-16">
          {t("body")}
        </Text>
      </Container>
    </section>
  );
}
