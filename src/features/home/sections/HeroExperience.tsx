import Image from "next/image";
import { getTranslations } from "next-intl/server";
import { Heading } from "@/design-system/primitives/Heading";
import { Container } from "@/design-system/primitives/Container";
import { Text } from "@/design-system/primitives/Text";
import { TextLink } from "@/design-system/primitives/TextLink";
export async function HeroExperience() {
  const t = await getTranslations("home.hero");
  return (
    <section
      aria-labelledby="hero-heading"
      className="relative isolate min-h-[720px] h-svh overflow-hidden md:min-h-[700px]"
    >
      <div
        className="pointer-events-none absolute inset-y-0 left-1/2 z-media w-[220%] -translate-x-1/2 md:left-0 md:w-full md:translate-x-0"
        aria-hidden="true"
      >
        <Image
          src="/images/hero/moradi-watch.webp"
          alt=""
          fill
          preload
          sizes="(max-width: 767px) 220vw, 100vw"
          className="object-contain object-center [mask-image:linear-gradient(to_bottom,transparent_18%,black_34%,black_62%,transparent_84%)] md:object-cover md:[mask-image:none]"
          quality={90}
        />
      </div>
      <Container className="relative z-content pt-[150px] text-center md:pt-[15.5svh]">
        <Heading as="h1" size="hero" id="hero-heading">
          <span className="block">{t("lineOne")} </span>
          <span className="block">{t("lineTwo")}</span>
        </Heading>
      </Container>
      <Container className="absolute inset-x-0 bottom-8 z-content flex flex-col items-start justify-between gap-2 md:bottom-12 md:flex-row md:items-center">
        <Text size="body">{t("support")}</Text>
        <TextLink href="#approach">{t("cta")}</TextLink>
      </Container>
    </section>
  );
}
