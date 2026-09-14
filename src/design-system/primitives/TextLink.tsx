import type { ComponentProps } from "react";
import { IconArrowRight } from "@tabler/icons-react";
import { cn } from "@/design-system/utils/cn";
export function TextLink({
  className,
  children,
  ...props
}: ComponentProps<"a">) {
  return (
    <a
      className={cn(
        "group inline-flex min-h-11 items-center gap-4 text-base text-ivory underline-offset-8 transition-colors hover:text-goldLight focus-visible:outline-2 focus-visible:outline-offset-4 focus-visible:outline-gold",
        className,
      )}
      {...props}
    >
      {children}
      <IconArrowRight
        aria-hidden
        size={24}
        stroke={1.3}
        className="text-gold transition-transform motion-reduce:transition-none ltr:group-hover:translate-x-1 rtl:rotate-180 rtl:group-hover:-translate-x-1"
      />
    </a>
  );
}
