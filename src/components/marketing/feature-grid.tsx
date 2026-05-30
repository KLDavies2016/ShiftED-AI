import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { modules } from "@/data/modules";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/**
 * Module grid. We currently ship three modules and intend to grow a wider
 * library over time — the copy here reflects that "starting library" framing
 * rather than describing a fixed set.
 */
export function FeatureGrid() {
  return (
    <section id="features" className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Our growing library of modules</Badge>
          <h2 className="mt-4 font-display text-display-lg text-foreground">
            A gym for the mind.{" "}
            <span className="text-gradient-brand">Skill by skill.</span>
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            Every AI module has been trained by clinical psychologists, runs in
            short sessions, and lets you replay any moment with a different
            choice — so the learning sticks before the stakes are high. We're
            starting with three; the library grows from here.
          </p>
        </Reveal>

        <div className="mt-16 grid gap-6 md:grid-cols-3">
          {modules.map((m, i) => {
            const Icon = m.icon;
            return (
              <Reveal key={m.slug} delay={i * 0.08}>
                <Link
                  href={`/features#${m.slug}`}
                  className="group relative block h-full"
                >
                  <div
                    className={cn(
                      "glass-card noise h-full p-7 transition-all duration-300 group-hover:-translate-y-1",
                      "before:absolute before:inset-0 before:rounded-2xl before:opacity-0 before:transition-opacity before:duration-500 group-hover:before:opacity-100",
                      m.accent === "pink" &&
                        "before:bg-[radial-gradient(circle_at_30%_0%,rgba(250,102,198,0.18),transparent_60%)]",
                      m.accent === "violet" &&
                        "before:bg-[radial-gradient(circle_at_50%_0%,rgba(167,107,226,0.18),transparent_60%)]",
                      m.accent === "blue" &&
                        "before:bg-[radial-gradient(circle_at_70%_0%,rgba(84,112,254,0.18),transparent_60%)]",
                    )}
                  >
                    <div className="relative">
                      <div
                        className={cn(
                          "inline-flex size-12 items-center justify-center rounded-xl",
                          m.accent === "pink" && "bg-brand-pink/15 text-brand-pink",
                          m.accent === "violet" && "bg-brand-violet/15 text-brand-violet",
                          m.accent === "blue" && "bg-brand-blue/15 text-brand-blue",
                        )}
                      >
                        <Icon className="size-6" />
                      </div>
                      <h3 className="mt-6 font-display text-2xl font-semibold tracking-tight">
                        {m.name}
                      </h3>
                      <p className="mt-2 text-sm font-medium text-foreground/80">
                        {m.tagline}
                      </p>
                      <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                        {m.description}
                      </p>
                      <ul className="mt-6 space-y-2.5">
                        {m.bullets.map((b) => (
                          <li
                            key={b}
                            className="flex items-start gap-2.5 text-sm text-foreground/80"
                          >
                            <span
                              aria-hidden
                              className={cn(
                                "mt-1.5 size-1.5 shrink-0 rounded-full",
                                m.accent === "pink" && "bg-brand-pink",
                                m.accent === "violet" && "bg-brand-violet",
                                m.accent === "blue" && "bg-brand-blue",
                              )}
                            />
                            {b}
                          </li>
                        ))}
                      </ul>
                      <div className="mt-6 inline-flex items-center gap-1 text-sm font-medium text-foreground/90">
                        Explore the module
                        <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                      </div>
                    </div>
                  </div>
                </Link>
              </Reveal>
            );
          })}
        </div>
      </Container>
    </section>
  );
}
