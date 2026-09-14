import { cva, type VariantProps } from "class-variance-authority";
import type { ComponentProps } from "react";
import { cn } from "@/design-system/utils/cn";
const button = cva(
  "inline-flex min-h-11 items-center justify-center gap-2 px-5 text-sm transition-colors focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold disabled:cursor-not-allowed disabled:opacity-50",
  {
    variants: {
      variant: {
        solid: "bg-ivory text-ink hover:bg-goldLight",
        outline: "border border-gold text-ivory hover:bg-gold/10",
        quiet: "text-ivory hover:text-goldLight",
      },
    },
    defaultVariants: { variant: "outline" },
  },
);
export function Button({
  variant,
  className,
  type = "button",
  ...props
}: ComponentProps<"button"> & VariantProps<typeof button>) {
  return (
    <button
      type={type}
      className={cn(button({ variant }), className)}
      {...props}
    />
  );
}
