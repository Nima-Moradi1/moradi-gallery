import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/design-system/utils/cn";
const container = cva("mx-auto w-full px-6 md:px-gutter", {
  variants: {
    size: {
      wide: "max-w-[1920px]",
      content: "max-w-[1440px]",
      narrow: "max-w-[860px]",
    },
  },
  defaultVariants: { size: "wide" },
});
export function Container({
  className,
  size,
  ...props
}: ComponentProps<"div"> & VariantProps<typeof container>) {
  return <div className={cn(container({ size }), className)} {...props} />;
}
