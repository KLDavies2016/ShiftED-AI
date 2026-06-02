import type { Metadata } from "next";

import { PricingTable } from "@/components/marketing/pricing-table";
import { FaqSection } from "@/components/marketing/faq-section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { buildMetadata } from "@/lib/seo";
import { faqPageSchema, jsonLd } from "@/lib/schema";
import { faq } from "@/data/faq";

export const metadata: Metadata = buildMetadata({
  title: "Pricing — join the waitlist",
  description:
    "Pre-launch pricing for ShiftED AI. Join the waitlist now and we'll only bill you when the platform goes live.",
  path: "/pricing",
});

export default function PricingPage() {
  // FAQPage JSON-LD: lets search engines (and Siri / ChatGPT / Gemini) read
  // the questions and answers directly, without needing to expand the
  // accordion via JavaScript.
  return (
    <>
      <script
        type="application/ld+json"
        // eslint-disable-next-line react/no-danger
        dangerouslySetInnerHTML={{ __html: jsonLd(faqPageSchema(faq)) }}
      />
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>Pricing</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Honest pricing.{" "}
              <span className="text-gradient-brand">No surprises.</span>
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              Every plan is currently waitlist-gated. Pick the plan that fits
              and we'll only bill you once the platform goes live.
            </p>
          </Reveal>
        </Container>
      </section>

      <PricingTable />

      <FaqSection />
      <CtaBanner />
    </>
  );
}
