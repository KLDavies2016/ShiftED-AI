import type { Metadata } from "next";

import { SiteHeader } from "@/components/layout/site-header";
import { SiteFooter } from "@/components/layout/site-footer";

import { Hero } from "@/components/marketing/hero";
import { LogoWall } from "@/components/marketing/logo-wall";
import { FeatureGrid } from "@/components/marketing/feature-grid";
import { Benefits } from "@/components/marketing/benefits";
import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { DashboardPreview } from "@/components/marketing/dashboard-preview";
import { TestimonialCarousel } from "@/components/marketing/testimonial-carousel";
import { PricingTable } from "@/components/marketing/pricing-table";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBanner } from "@/components/marketing/cta-banner";

import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "ShiftED AI — Build the human skills your work demands",
  description:
    "A gym for the mind. ShiftED AI is the practice-based training platform for emotional intelligence at work — empathy, difficult conversations and moral resilience, trained like any other skill.",
  path: "/",
});

/**
 * Home composes the full marketing experience top-to-bottom. The shared
 * (marketing) layout doesn't wrap the root, so we mount header + footer here
 * directly to keep the URL `/` instead of `/(marketing)`.
 */
export default function HomePage() {
  return (
    <div className="flex min-h-screen flex-col">
      {/* Background colour lives on <body> in app/layout.tsx so the fixed
          neural-network canvas can show through the page wrapper. */}
      <SiteHeader />
      <main id="main" className="flex-1">
        <Hero />
        <LogoWall />
        <FeatureGrid />
        <Benefits />
        <DashboardPreview />
        <IntegrationsSection />
        <TestimonialCarousel />
        <PricingTable compact={false} />
        <FaqSection />
        <CtaBanner />
      </main>
      <SiteFooter />
    </div>
  );
}
