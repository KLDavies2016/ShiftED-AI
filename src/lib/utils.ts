import { type ClassValue, clsx } from "clsx";
import { twMerge } from "tailwind-merge";

/**
 * Tailwind-aware class joiner. Use everywhere you'd otherwise template a
 * className string. Handles conditional and conflicting classes safely.
 */
export function cn(...inputs: ClassValue[]): string {
  return twMerge(clsx(inputs));
}

/** Public site URL with a sensible fallback for dev. */
export const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ??
  "http://localhost:3000";

/** Absolute URL helper for canonical / OG / email links. */
export function absoluteUrl(path: string = "/"): string {
  return `${SITE_URL}${path.startsWith("/") ? path : `/${path}`}`;
}

/** Polite number formatter used on stats blocks. */
export function formatNumber(n: number): string {
  return new Intl.NumberFormat("en-GB").format(n);
}
