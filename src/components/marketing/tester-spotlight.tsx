"use client";

import { ArrowRight, FlaskConical, MessageCircleHeart, Sparkles, Compass } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";
import { TesterForm } from "./tester-form";

/**
 * "Become a tester" spotlight — sits right after the hero on the home page,
 * replacing the social-proof logo wall.
 *
 * The intent is to convert maximum signups for the tester programme: testers
 * are the people who'll shape the platform, so this is a deliberate moment to
 * make the case and capture the application without sending them off-page.
 */
export function TesterSpotlight() {
  return (
    <section
      id="become-a-tester"
      className="relative isolate scroll-mt-24 py-24 sm:py-32"
    >
      {/* Soft gradient backdrop — distinct from the closing CTA banner so the
          two conversion sections don't feel duplicated. Sits low-opacity behind
          the content. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 overflow-hidden"
      >
        <div
          className="absolute -top-32 left-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(250,102,198,0.18), transparent 65%)",
          }}
        />
        <div
          className="absolute -bottom-20 right-1/4 h-[28rem] w-[28rem] rounded-full blur-3xl"
          style={{
            background:
              "radial-gradient(circle, rgba(84,112,254,0.22), transparent 65%)",
          }}
        />
      </div>

      <Container>
        <div className="grid items-start gap-12 lg:grid-cols-[1fr_1.15fr] lg:gap-16">
          {/* Pitch column */}
          <Reveal>
            <Badge variant="gradient" className="mb-6">
              <FlaskConical className="size-3" /> We're looking for testers
            </Badge>
            <h2 className="font-display text-display-lg leading-tight">
              Help us build the platform{" "}
              <span className="text-gradient-brand">you'd actually use</span>.
            </h2>
            <p className="mt-5 max-w-xl text-balance text-muted-foreground">
              We're a small team building ShiftED AI in the open. The testers
              who join us now shape what the platform becomes — which modules
              we build first, how the scenarios feel, what the language sounds
              like. Add your voice and help us get it right.
            </p>

            <ul className="mt-8 space-y-4">
              <Benefit
                icon={Sparkles}
                title="Early access, weeks before public launch"
                body="You'll be the first to try the modules and give feedback before anyone else sees them."
              />
              <Benefit
                icon={MessageCircleHeart}
                title="A direct line to the founders"
                body="Every message lands in our inboxes — Louise, Simon and Joshua read all of it."
              />
              <Benefit
                icon={Compass}
                title="A voice in the roadmap"
                body="Tell us what's missing, what's confusing, what's broken. Your feedback steers what we build next."
              />
            </ul>

            <p className="mt-8 text-xs text-muted-foreground">
              Prefer to just be notified when we go live?{" "}
              <a
                href="#waitlist"
                className="inline-flex items-center gap-1 underline underline-offset-4 hover:text-foreground"
              >
                Join the waitlist instead <ArrowRight className="size-3" />
              </a>
            </p>
          </Reveal>

          {/* Form column */}
          <Reveal delay={0.1}>
            <div className="glass-card noise relative overflow-hidden p-7 sm:p-8">
              <h3 className="font-display text-xl font-semibold tracking-tight">
                Become a tester
              </h3>
              <p className="mt-1 text-sm text-muted-foreground">
                Tell us a little about you and we'll be in touch within a few
                days.
              </p>
              <div className="mt-6">
                <TesterForm />
              </div>
            </div>
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

interface BenefitProps {
  icon: React.ElementType;
  title: string;
  body: string;
}

function Benefit({ icon: Icon, title, body }: BenefitProps) {
  return (
    <li className="flex items-start gap-3.5">
      <span className="mt-0.5 inline-flex size-9 shrink-0 items-center justify-center rounded-lg bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
        <Icon className="size-4" />
      </span>
      <div>
        <div className="font-display text-base font-semibold">{title}</div>
        <p className="mt-1 text-sm leading-relaxed text-muted-foreground">
          {body}
        </p>
      </div>
    </li>
  );
}
