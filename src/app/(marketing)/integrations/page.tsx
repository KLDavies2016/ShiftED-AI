import type { Metadata } from "next";

import { IntegrationsSection } from "@/components/marketing/integrations-section";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Integrations — plug ShiftED into your stack",
  description:
    "Slack, Microsoft Teams, BambooHR, SSO, SCIM, and more. ShiftED AI fits the operating model you already run.",
  path: "/integrations",
});

export default function IntegrationsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>Integrations</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Connect to{" "}
              <span className="text-gradient-brand">your operating model</span>.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              Practice belongs in the flow of work — not in a separate tab no
              one remembers to open.
            </p>
          </Reveal>
        </Container>
      </section>

      <IntegrationsSection />
      <CtaBanner />
    </>
  );
}
