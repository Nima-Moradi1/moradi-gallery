export interface Watch {
  id: string;
  slug: string;
  brand: string;
  model: string;
  reference?: string;
  movement?: "automatic" | "quartz" | "manual" | "smart";
  origin?: "swiss" | "japanese" | "other";
  style: string[];
  price?: { amount: number; currency: string };
  images: { src: string; alt: { fa: string; en: string } }[];
  model3d?: { desktop: string; mobile?: string };
}
