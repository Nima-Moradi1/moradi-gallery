import { cva, type VariantProps } from "class-variance-authority";
import type { HTMLAttributes } from "react";
import { cn } from "@/design-system/utils/cn";
const heading = cva("font-normal text-ivory", {
  variants: {
    size: {
      hero: "text-[clamp(2.1rem,6.4vw,7.2rem)] leading-[1.04] ltr:tracking-[-0.025em] rtl:text-[clamp(2.1rem,5.3vw,6rem)] rtl:leading-[1.3]",
      section:
        "text-[clamp(2rem,4vw,4.5rem)] leading-[1.15] ltr:tracking-[-0.04em] rtl:leading-[1.5]",
      subsection: "text-2xl leading-snug",
    },
  },
  defaultVariants: { size: "section" },
});
export function Heading({
  as: Tag = "h2",
  size,
  className,
  ...props
}: HTMLAttributes<HTMLHeadingElement> &
  VariantProps<typeof heading> & { as?: "h1" | "h2" | "h3" }) {
  return <Tag className={cn(heading({ size }), className)} {...props} />;
}
