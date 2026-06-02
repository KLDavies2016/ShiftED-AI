import type { Metadata } from "next";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { TestingSwitcher } from "@/components/marketing/testing-switcher";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testing — help shape ShiftED AI",
  description:
    "Join the waitlist to be notified when ShiftED AI goes live, or sign up to be a tester and help shape the experience.",
  path: "/testing",
});

export default function TestingPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge>Testing</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Be one of the first{" "}
              <span className="text-gradient-brand">to use ShiftED AI</span>.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              You can join the waitlist to be notified when we go live, or sign
              up to be a tester and help us shape what the platform becomes.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="mx-auto max-w-3xl">
            <TestingSwitcher />
          </div>
        </Container>
      </section>
    </>
  );
}
