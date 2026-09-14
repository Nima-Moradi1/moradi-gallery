import { getTranslations } from "next-intl/server";
import { Container } from "@/design-system/primitives/Container";
import { Text } from "@/design-system/primitives/Text";
export async function SiteFooter() {
  const t = await getTranslations("footer");
  return (
    <footer>
      <Container className="flex flex-col justify-between gap-4 border-t border-borderDark py-10 md:flex-row">
        <span className="font-sans text-sm tracking-[0.2em]" dir="ltr">
          MORADI GALLERY
        </span>
        <Text size="caption">{t("note")}</Text>
      </Container>
    </footer>
  );
}
