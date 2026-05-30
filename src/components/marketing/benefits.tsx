import { BrainCircuit, Gauge, Heart, ShieldCheck, Sparkles, Users } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";

const benefits = [
  {
    icon: BrainCircuit,
    title: "Built on clinical research",
    body: "Scenarios authored with psychologists and wellbeing experts — not pop-psychology prompts. Every interaction maps to a validated framework.",
  },
  {
    icon: Gauge,
    title: "Twenty minutes a week",
    body: "Short, repeatable practice sessions you can fit between meetings. The repetition is the point — your skill curve compounds.",
  },
  {
    icon: Heart,
    title: "Empathy without the cost",
    body: "Re-muscle your ability to connect with people in distress without absorbing it. Boundaries are a learnable craft.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Personal practice stays personal. Teams see anonymised confidence patterns — never the content of any session.",
  },
  {
    icon: Sparkles,
    title: "Confidence as a metric",
    body: "Track how you change. Replay any moment, change one variable, and watch your decision quality move quarter over quarter.",
  },
  {
    icon: Users,
    title: "Designed for the hardest jobs",
    body: "Clinicians, social workers, humanitarian staff, first-time managers. The roles where the cost of getting it wrong is real.",
  },
];

export function Benefits() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Why ShiftED</Badge>
          <h2 className="mt-4 font-display text-display-lg text-foreground">
            The skills that compound{" "}
            <span className="text-gradient-brand">over a career</span>.
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Empathy and resilience aren't soft skills — they're the highest-leverage
            capabilities most professionals never get to practise. We make them
            trainable, measurable, and sustainable.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {benefits.map((b, i) => {
            const Icon = b.icon;
            return (
              <Reveal key={b.title} delay={i * 0.05}>
                <div className="group relative h-full rounded-2xl border border-border/60 bg-card/40 p-7 transition-colors hover:bg-card/70">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
                    <Icon className="size-5" />
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">{b.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {b.body}
                  </p>
                </div>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
