import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/design-system/utils/cn";
const text = cva("text-mutedText", {
  variants: {
    size: {
      body: "text-base leading-8",
      lead: "text-xl leading-9",
      caption: "text-sm leading-6",
    },
  },
  defaultVariants: { size: "body" },
});
export function Text({
  size,
  className,
  ...props
}: ComponentProps<"p"> & VariantProps<typeof text>) {
  return <p className={cn(text({ size }), className)} {...props} />;
}
