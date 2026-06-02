import type { Metadata } from "next";
import { absoluteUrl, SITE_URL } from "./utils";

/**
 * Build consistent <head> metadata across pages.
 *
 * Pass page-specific bits; we layer them onto the brand defaults so canonical,
 * Open Graph, and Twitter cards always agree.
 */
export interface BuildMetadataInput {
  title: string;
  description: string;
  path?: string;
  image?: string;
  noIndex?: boolean;
  keywords?: string[];
}

const DEFAULT_OG_IMAGE = "/og/default.png";

export function buildMetadata({
  title,
  description,
  path = "/",
  image = DEFAULT_OG_IMAGE,
  noIndex = false,
  keywords = [],
}: BuildMetadataInput): Metadata {
  const url = absoluteUrl(path);
  const imageUrl = image.startsWith("http") ? image : absoluteUrl(image);
  const fullTitle = title.includes("ShiftED AI")
    ? title
    : `${title} — ShiftED AI`;

  return {
    metadataBase: new URL(SITE_URL),
    title: fullTitle,
    description,
    keywords: [
      "emotional intelligence",
      "workforce wellbeing",
      "empathy training",
      "difficult conversations",
      "social media reliance",
      "manager training",
      "burnout prevention",
      ...keywords,
    ],
    alternates: { canonical: url },
    robots: noIndex
      ? { index: false, follow: false }
      : { index: true, follow: true },
    openGraph: {
      type: "website",
      url,
      title: fullTitle,
      description,
      siteName: "ShiftED AI",
      images: [{ url: imageUrl, width: 1200, height: 630, alt: title }],
    },
    twitter: {
      card: "summary_large_image",
      title: fullTitle,
      description,
      images: [imageUrl],
    },
    // Icons are auto-detected by Next.js from `src/app/icon.svg` and
    // `src/app/apple-icon.png` — no manual config needed here.
  };
}

// Schema markup helpers (Organization, Person, FAQPage, Course) now live in
// `@/lib/schema` so they can be composed per-page without bloating this file.
// Backwards-compat re-export kept for layout.tsx imports.
export { organizationSchema } from "./schema";
