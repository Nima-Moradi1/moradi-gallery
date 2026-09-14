import { BrandMark } from "@/features/navigation/BrandMark";
export default function Loading() {
  return (
    <div
      className="flex min-h-svh items-center justify-center"
      role="status"
      aria-label="Loading / در حال بارگذاری"
    >
      <BrandMark className="h-16 w-16" />
    </div>
  );
}
