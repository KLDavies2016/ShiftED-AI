import type { LucideIcon } from "lucide-react";

/** Common shape used by feature/module/integration cards. */
export interface ContentCard {
  title: string;
  description: string;
  icon: LucideIcon;
  href?: string;
  badge?: string;
}

/** Pricing plan, rendered by <PricingTable />. */
export interface PricingPlan {
  id: string;
  name: string;
  tagline: string;
  priceLabel: string;        // "£24/mo" or "Talk to us"
  priceSubtext?: string;     // "per seat, billed annually"
  ctaLabel: string;
  ctaHref: string;
  highlighted?: boolean;
  features: string[];
}

/** Testimonial used on home, /testimonials, and quote walls. */
export interface Testimonial {
  quote: string;
  author: string;
  role: string;
  organization?: string;
  avatar?: string;
}

/** Single FAQ item. */
export interface FaqItem {
  question: string;
  answer: string;
}

/** Blog post metadata. Body is fetched separately when we wire MDX. */
export interface BlogPost {
  slug: string;
  title: string;
  excerpt: string;
  author: { name: string; role: string; avatar?: string };
  publishedAt: string;       // ISO
  readingTime: string;       // "6 min read"
  category: string;
  cover?: string;
}
