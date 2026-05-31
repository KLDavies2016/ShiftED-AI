import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/utils";
import { modules } from "@/data/modules";

const staticRoutes = [
  "/",
  "/features",
  "/pricing",
  "/integrations",
  "/testing",
  "/about",
  "/contact",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const fixed = staticRoutes.map((path) => ({
    url: `${SITE_URL}${path}`,
    lastModified: now,
    changeFrequency: "weekly" as const,
    priority: path === "/" ? 1 : 0.7,
  }));
  // Anchors are not separate URLs but listing module slugs explicitly helps
  // social previews target the right deep-link.
  const moduleRoutes = modules.map((m) => ({
    url: `${SITE_URL}/features#${m.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.5,
  }));
  return [...fixed, ...moduleRoutes];
}
