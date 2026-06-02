import type { Metadata } from "next";
import { ArrowRight } from "lucide-react";
import Link from "next/link";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Reveal } from "@/components/marketing/reveal";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { modules } from "@/data/modules";
import { buildMetadata } from "@/lib/seo";
import { courseSchema, jsonLd } from "@/lib/schema";
import { cn } from "@/lib/utils";

export const metadata: Metadata = buildMetadata({
  title: "Features — a growing module library",
  description:
    "Empathy Practice, Managing Difficult Conversations and Social Media Reliance — the opening modules in ShiftED AI's growing library, each trained by clinical psychologists.",
  path: "/features",
});

export default function FeaturesPage() {
  // Course JSON-LD for each module — gives AI search engines structured
  // entities for queries like "how to practise difficult conversations".
  const courseLd = modules.map((m) =>
    courseSchema({
      name: m.name,
      description: `${m.tagline} ${m.description}`,
      slug: m.slug,
      about: m.bullets,
    }),
  );

  return (
    <>
      {courseLd.map((data, i) => (
        <script
          key={i}
          type="application/ld+json"
          // eslint-disable-next-line react/no-danger
          dangerouslySetInnerHTML={{ __html: jsonLd(data) }}
        />
      ))}
      {/* Page header */}
      <section className="relative overflow-hidden pt-24 pb-16 sm:pt-32 sm:pb-20">
        <AnimatedGlow />
        <Container>
          {/* AEO-friendly factual definition (visually hidden but readable by
              assistive tech and AI parsers). */}
          <p className="sr-only">
            ShiftED AI's module library is a set of psychology-certified
            interactive AI training programmes for professionals practising
            empathy, difficult conversations and attention management. Each
            module is built with clinical frameworks and runs as short,
            repeatable practice sessions.
          </p>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge>Features</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              A growing library.{" "}
              <span className="text-gradient-brand">One human skillset.</span>
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              The work of being human at work isn't one skill — it's many. We're
              opening with three modules and growing the library from here.
            </p>
          </Reveal>
        </Container>
      </section>

      {/* Detailed module sections, alternating sides */}
      {modules.map((m, idx) => {
        const Icon = m.icon;
        const reverse = idx % 2 === 1;
        return (
          <section
            id={m.slug}
            key={m.slug}
            className="relative scroll-mt-20 border-t border-border/60 py-24 sm:py-32"
          >
            <Container>
              <div
                className={cn(
                  "grid gap-12 lg:grid-cols-2 lg:items-center lg:gap-20",
                  reverse && "lg:[&>*:first-child]:order-2",
                )}
              >
                <Reveal>
                  <div
                    className={cn(
                      "inline-flex size-14 items-center justify-center rounded-2xl",
                      m.accent === "pink" && "bg-brand-pink/15 text-brand-pink",
                      m.accent === "violet" && "bg-brand-violet/15 text-brand-violet",
                      m.accent === "blue" && "bg-brand-blue/15 text-brand-blue",
                    )}
                  >
                    <Icon className="size-7" />
                  </div>
                  <h2 className="mt-6 font-display text-display-lg">
                    {m.name}
                  </h2>
                  <p className="mt-3 font-display text-xl text-foreground/85">
                    {m.tagline}
                  </p>
                  <p className="mt-5 max-w-xl text-muted-foreground">
                    {m.description}
                  </p>
                  <ul className="mt-7 space-y-3">
                    {m.bullets.map((b) => (
                      <li key={b} className="flex items-start gap-3 text-sm">
                        <span
                          aria-hidden
                          className={cn(
                            "mt-2 size-1.5 shrink-0 rounded-full",
                            m.accent === "pink" && "bg-brand-pink",
                            m.accent === "violet" && "bg-brand-violet",
                            m.accent === "blue" && "bg-brand-blue",
                          )}
                        />
                        <span className="text-foreground/85">{b}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex gap-3">
                    <Button asChild>
                      <Link href="/#waitlist">
                        Join the waitlist <ArrowRight />
                      </Link>
                    </Button>
                    <Button asChild variant="ghost">
                      <Link href="/contact?topic=sales">For teams</Link>
                    </Button>
                  </div>
                </Reveal>

                <Reveal delay={0.1}>
                  <ModuleMockup accent={m.accent} title={m.name} />
                </Reveal>
              </div>
            </Container>
          </section>
        );
      })}

      <CtaBanner />
    </>
  );
}

function ModuleMockup({
  accent,
  title,
}: {
  accent: "pink" | "violet" | "blue";
  title: string;
}) {
  const accentBg =
    accent === "pink"
      ? "from-brand-pink/30 to-transparent"
      : accent === "violet"
        ? "from-brand-violet/30 to-transparent"
        : "from-brand-blue/30 to-transparent";

  return (
    <div className="relative">
      <div className={cn("absolute -inset-6 -z-10 rounded-[2rem] bg-gradient-to-br blur-3xl", accentBg)} />
      <div className="glass-card noise relative overflow-hidden p-6">
        <div className="flex items-center gap-1.5 border-b border-border/60 pb-3">
          <span className="size-2 rounded-full bg-rose-400/70" />
          <span className="size-2 rounded-full bg-amber-400/70" />
          <span className="size-2 rounded-full bg-emerald-400/70" />
          <span className="ml-2 text-xs text-muted-foreground">{title} — session</span>
        </div>
        <div className="mt-5 space-y-3">
          <div className="rounded-xl bg-background/50 p-4 text-sm">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Prompt
            </div>
            <p className="mt-1.5 text-foreground/85">
              You're 12 minutes into a 30-minute meeting. Energy in the room has
              dropped. What do you do?
            </p>
          </div>
          <div className="rounded-xl bg-background/50 p-4 text-sm">
            <div className="text-[10px] font-semibold uppercase tracking-wider text-muted-foreground">
              Your move
            </div>
            <p className="mt-1.5 text-foreground/85">
              Acknowledge the shift, ask one open question, hand the floor over.
            </p>
          </div>
          <div className="grid grid-cols-3 gap-2 pt-1">
            <Stat label="Validation" value="0.86" />
            <Stat label="Curiosity" value="0.74" />
            <Stat label="Recovery" value="0.61" />
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-base tabular-nums">{value}</div>
    </div>
  );
}
