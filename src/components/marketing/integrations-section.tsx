import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { integrations } from "@/data/integrations";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

const statusTone: Record<string, string> = {
  Available: "bg-emerald-400/10 text-emerald-400 border-emerald-400/30",
  Soon: "bg-amber-400/10 text-amber-400 border-amber-400/30",
  Planned: "bg-muted text-muted-foreground border-border/60",
};

export function IntegrationsSection() {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        <Reveal className="mx-auto max-w-2xl text-center">
          <Badge>Integrations</Badge>
          <h2 className="mt-4 font-display text-display-lg">
            Plug into the tools{" "}
            <span className="text-gradient-brand">your team already trusts</span>.
          </h2>
          <p className="mt-4 text-balance text-muted-foreground">
            We meet your work where it happens. From Slack nudges to enterprise SSO,
            ShiftED slots cleanly into your operating model.
          </p>
        </Reveal>

        <div className="mt-14 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {integrations.map((i, idx) => {
            const Icon = i.icon;
            return (
              <Reveal key={i.title} delay={idx * 0.04}>
                <div className="group relative h-full rounded-2xl border border-border/60 bg-card/40 p-6 transition-all hover:bg-card/70">
                  <div className="flex items-center justify-between">
                    <div className="inline-flex size-10 items-center justify-center rounded-xl bg-background/60 text-foreground ring-1 ring-border/60">
                      <Icon className="size-5" />
                    </div>
                    <span
                      className={cn(
                        "rounded-full border px-2 py-0.5 text-[10px] font-medium uppercase tracking-wider",
                        statusTone[i.status],
                      )}
                    >
                      {i.status}
                    </span>
                  </div>
                  <h3 className="mt-5 font-display text-base font-semibold">{i.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                    {i.description}
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
