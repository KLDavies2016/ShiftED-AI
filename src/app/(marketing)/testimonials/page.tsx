import { permanentRedirect } from "next/navigation";

/**
 * /testimonials is temporarily disabled — we don't have real customer
 * testimonials yet, so the route redirects to the home page. Re-enable by
 * restoring the previous page body once the testimonials data file has live
 * quotes from real customers.
 */
export default function TestimonialsPage() {
  permanentRedirect("/");
}
