import type { Metadata } from "next";
import { BellRing, FlaskConical } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBanner } from "@/components/marketing/cta-banner";
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

          {/* Light-touch reassurance under the form panel. Keeps the section
              feeling supportive rather than transactional. */}
          <Reveal className="mx-auto mt-10 max-w-3xl">
            <div className="grid gap-4 sm:grid-cols-2">
              <Helper
                icon={BellRing}
                title="Waitlist"
                body="Get one email when we go live. No follow-up sequence, no spam — just the moment the platform opens."
              />
              <Helper
                icon={FlaskConical}
                title="Tester"
                body="Help us shape it. We'll send a short brief, give you early access, and check in occasionally for feedback."
              />
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}

function Helper({
  icon: Icon,
  title,
  body,
}: {
  icon: React.ElementType;
  title: string;
  body: string;
}) {
  return (
    <div className="rounded-2xl border border-border/60 bg-card/40 p-6">
      <div className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
        <Icon className="size-4" />
      </div>
      <h2 className="mt-4 font-display text-base font-semibold">{title}</h2>
      <p className="mt-1 text-sm leading-relaxed text-muted-foreground">{body}</p>
    </div>
  );
}
