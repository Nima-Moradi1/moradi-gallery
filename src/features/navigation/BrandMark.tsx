import { cn } from "@/design-system/utils/cn";
export function BrandMark({ className }: { className?: string }) {
  return (
    <svg
      aria-hidden="true"
      viewBox="0 0 44 52"
      fill="none"
      className={cn("h-9 w-8 shrink-0 text-gold md:h-11 md:w-10", className)}
    >
      <path
        d="M4 48V5L40 39V48M40 48V5L4 39M4 20L22 39L40 20"
        stroke="currentColor"
        strokeWidth="2"
      />
    </svg>
  );
}
