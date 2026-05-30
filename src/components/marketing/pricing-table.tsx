import Link from "next/link";
import { Check, Sparkles } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { pricingPlans } from "@/data/pricing";
import { Reveal } from "./reveal";
import { cn } from "@/lib/utils";

/**
 * 3-column pricing table.
 *
 * @param compact when true, drops the heading + caps card padding for use as
 * a homepage "preview" rather than the full /pricing page.
 */
export function PricingTable({ compact = false }: { compact?: boolean }) {
  return (
    <section className="relative py-24 sm:py-32">
      <Container>
        {!compact && (
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>Pricing</Badge>
            <h2 className="mt-4 font-display text-display-lg">
              Join the waitlist now.{" "}
              <span className="text-gradient-brand">Pay when we go live.</span>
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              Every plan is waitlisted until launch. Join the list — you'll only
              be billed once we've onboarded you, and you can sign up as a
              tester on the <a href="/testing" className="underline underline-offset-2 hover:text-foreground">testing page</a> if
              you'd like to help shape the product.
            </p>
          </Reveal>
        )}

        <div className={cn("mt-12 grid gap-6 lg:grid-cols-3", compact && "mt-0")}>
          {pricingPlans.map((plan, i) => (
            <Reveal key={plan.id} delay={i * 0.06}>
              <div
                className={cn(
                  "relative flex h-full flex-col rounded-2xl border bg-card/60 p-7",
                  plan.highlighted
                    ? "gradient-border border-transparent shadow-glow"
                    : "border-border/60",
                )}
              >
                {plan.highlighted && (
                  <div className="absolute -top-3 left-1/2 -translate-x-1/2">
                    <Badge variant="gradient" className="px-3 py-1">
                      <Sparkles className="size-3" /> Most popular
                    </Badge>
                  </div>
                )}
                <div>
                  <h3 className="font-display text-xl font-semibold">{plan.name}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{plan.tagline}</p>
                </div>
                <div className="mt-6">
                  <div className="font-display text-4xl font-semibold tracking-tight">
                    {plan.priceLabel}
                  </div>
                  {plan.priceSubtext ? (
                    <p className="mt-1 text-xs text-muted-foreground">{plan.priceSubtext}</p>
                  ) : null}
                </div>
                <ul className="mt-6 space-y-3 text-sm">
                  {plan.features.map((f) => (
                    <li key={f} className="flex items-start gap-2.5">
                      <Check className="mt-0.5 size-4 shrink-0 text-primary" />
                      <span className="text-foreground/85">{f}</span>
                    </li>
                  ))}
                </ul>
                <div className="mt-auto pt-8">
                  <Button
                    asChild
                    variant={plan.highlighted ? "primary" : "outline"}
                    size="lg"
                    className="w-full"
                  >
                    <Link href={plan.ctaHref}>{plan.ctaLabel}</Link>
                  </Button>
                </div>
              </div>
            </Reveal>
          ))}
        </div>

        {!compact && (
          <p className="mt-10 text-center text-xs text-muted-foreground">
            Need a tailored rollout, custom scenarios or a procurement review?{" "}
            <Link href="/contact?topic=sales" className="underline underline-offset-2 hover:text-foreground">
              Book a discovery call →
            </Link>
          </p>
        )}
      </Container>
    </section>
  );
}
