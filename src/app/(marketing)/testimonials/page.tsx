import type { Metadata } from "next";
import { Quote } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { testimonials } from "@/data/testimonials";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Testimonials — voices from the work",
  description:
    "What clinicians, social workers, managers, and people leaders are telling us about ShiftED AI.",
  path: "/testimonials",
});

export default function TestimonialsPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>Testimonials</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Voices from{" "}
              <span className="text-gradient-brand">the work</span>.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              We listen carefully to the people who use ShiftED. Here is some
              of what we've heard so far.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((t, i) => (
              <Reveal key={t.author} delay={i * 0.04}>
                <figure className="flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-7">
                  <Quote aria-hidden className="size-7 text-brand-violet" strokeWidth={1.5} />
                  <blockquote className="mt-3 text-balance text-foreground/90">
                    "{t.quote}"
                  </blockquote>
                  <figcaption className="mt-auto pt-6 text-sm">
                    <div className="font-display font-semibold">{t.author}</div>
                    <div className="text-muted-foreground">
                      {t.role}
                      {t.organization ? ` · ${t.organization}` : ""}
                    </div>
                  </figcaption>
                </figure>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
