import type { Metadata } from "next";
import Link from "next/link";
import Image from "next/image";
import {
  Accessibility,
  Activity,
  ArrowRight,
  BrainCircuit,
  Building2,
  Ear,
  Heart,
  HeartHandshake,
  Keyboard,
  LifeBuoy,
  Linkedin,
  ShieldCheck,
  Smartphone,
  Sparkles,
} from "lucide-react";

import { supportResources } from "@/data/nav";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "About — protecting the human in the workforce",
  description:
    "Why we're building ShiftED AI: empathy is a finite resource, the modern workforce is running it down, and the right kind of practice can restore it.",
  path: "/about",
});

const values = [
  {
    icon: Heart,
    title: "Care comes first",
    body: "We have designed this for all who want to develop their skills in emotional intelligence, awareness, resilience and so much more.",
  },
  {
    icon: BrainCircuit,
    title: "Practice-based. Not one-off training.",
    body: "Every module journey is built with our psychologists' framework and certified skills coaches. You don't just complete skills training — you practise and reflect for long-term change.",
  },
  {
    icon: ShieldCheck,
    title: "Private by default",
    body: "Personal practice stays personal. Teams see anonymised patterns, never identifiable content.",
  },
  {
    icon: Sparkles,
    title: "Practice over performance",
    body: "You can track your progress and identify the gaps in your skillset. The point isn't to win score streaks, but to see long-term behavioural change.",
  },
];

/**
 * Founding team. Bios verbatim from the founders' brief. Photos should live in
 * `/public/team/` — set `photo` to `/team/<filename>.jpg` to render the photo,
 * otherwise the gradient initials avatar shows as a graceful fallback.
 */
const team = [
  {
    name: "Louise Davies",
    role: "Founder",
    bio: "Founder of ShiftED AI and Equal Differences. Experienced in business operations and account management with a passion for empathy-driven AI and community building.",
    tags: ["ShiftED AI", "Equal Differences"],
    linkedin: "https://www.linkedin.com/in/kelly-louise-davies-75401b78",
    photo: "/team/kelly-louise-davies.jpg",
    initials: "LD",
    accent: "from-brand-pink/30 to-brand-violet/30",
  },
  {
    name: "Simon Andrew Agnew",
    role: "Co-Founder & Special Advisor",
    bio: "Psychological Therapist and former British Army Military Police Officer. Extensive experience in humanitarian operations with the UN and World Food Programme.",
    tags: ["Ex-UN / WFP", "Mental Health Expert"],
    linkedin: "https://www.linkedin.com/in/simon-andrew-agnew-38641839/",
    photo: "/team/simon-andrew-agnew.jpg",
    initials: "SA",
    accent: "from-brand-violet/30 to-brand-blue/30",
  },
  {
    name: "Joshua Hatcher",
    role: "Director of Strategic Partnerships & Growth",
    bio: "Director at DeluxePad Media with a strong background in sales and business development across Europe. Founder of The Lead Lab.",
    tags: ["DeluxePad Media", "Sales Strategy"],
    linkedin: "https://www.linkedin.com/in/joshua-h-b86673a4/",
    photo: "/team/joshua-hatcher.jpg",
    initials: "JH",
    accent: "from-brand-blue/30 to-brand-pink/30",
  },
] as const;

const inclusion = [
  {
    icon: Accessibility,
    title: "WCAG 2.2 AA across the site",
    body: "Every page meets WCAG 2.2 at the AA standard — and AAA where the design can carry it. Colour contrast, focus order, ARIA roles and semantic landmarks are built in, not bolted on after launch.",
  },
  {
    icon: Keyboard,
    title: "Keyboard-first navigation",
    body: "Every interaction works without a mouse. Tab through the site, press Enter on what you mean — visible focus rings show exactly where you are, and a skip-to-content link gets readers past the header in a single hop.",
  },
  {
    icon: Activity,
    title: "Reduced motion respected",
    body: "If your operating system asks for less motion, our animated neural background, scroll reveals and interface transitions step quietly aside. The reading experience is identical — the wallpaper just stops moving.",
  },
  {
    icon: Ear,
    title: "Built for screen readers",
    body: "Buttons say what they do. Headings carry meaning. Decorative graphics are hidden from assistive tech so screen readers hear the page that matters, not the noise around it.",
  },
  {
    icon: HeartHandshake,
    title: "Trauma-informed by default",
    body: "We work with difficult content, so we ask before we surface it. No autoplay video, no sudden audio, no jarring transitions — permission first, always. Our defaults are the gentlest version of the experience.",
  },
  {
    icon: Smartphone,
    title: "Works on any device",
    body: "Layouts adapt from a small phone to an ultrawide display. Tap targets are large enough for thumbs. Performance budgets keep the site fast on older hardware and slow connections.",
  },
];

export default function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge>About</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Empathy is a{" "}
              <span className="text-gradient-brand">finite resource</span>.
              <br className="hidden sm:block" /> We treat it like one.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              ShiftED AI exists because the modern world is quietly burning
              through its capacity for care — and the standard answers (one-off
              training, generic wellbeing apps, gym-class coaching) aren't
              built to refill the well.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative py-24">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <Reveal>
              <h2 className="font-display text-display-lg">Why now.</h2>
              <p className="mt-4 text-muted-foreground">
                Over 60% of new managers feel unprepared within their first 90
                days. Compassion fatigue and moral injury are climbing across
                healthcare and humanitarian work. The annual training spend is
                vast — somewhere between $160 billion and $356 billion globally
                — yet behavioural change is the exception, not the rule. The
                ingredient that's missing isn't more content. It's repeated,
                low-stakes practice under structured pressure.
              </p>
            </Reveal>
            <Reveal>
              <h2 className="font-display text-display-lg">What we build.</h2>
              <p className="mt-4 text-muted-foreground">
                A gym for the mind — somewhere to rehearse the moments that
                matter before they arrive. The scenarios are clinical, the
                feedback is specific, and the cadence is short enough to fit a
                coffee break. The work compounds for real life behavioural
                change.
              </p>
            </Reveal>
          </div>
        </Container>
      </section>

      {/* Founding team — diverse expertise in AI, mental health and growth. */}
      <section className="relative py-24" id="team">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>The Team</Badge>
            <h2 className="mt-4 font-display text-display-lg">
              A diverse founding team{" "}
              <span className="text-gradient-brand">behind ShiftED AI</span>.
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              Combining expertise in AI, mental-health advocacy and strategic
              growth — three founders building one product.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 md:grid-cols-3">
            {team.map((person, i) => (
              <Reveal key={person.name} delay={i * 0.06}>
                <article className="glass-card noise relative flex h-full flex-col items-center p-7 text-center">
                  {/* Top accent line — keeps the cards visually tied to the
                      brand gradient even without photographs. */}
                  <span
                    aria-hidden
                    className={`pointer-events-none absolute inset-x-7 top-0 h-px bg-gradient-to-r ${person.accent}`}
                  />
                  <div
                    className={`relative size-20 overflow-hidden rounded-full bg-gradient-to-br ${person.accent} ring-1 ring-border/60`}
                  >
                    {/* Initials fallback — always rendered centred, sits behind
                        the photo. If the photo file is missing or fails to
                        load, the initials show through. */}
                    <span
                      aria-hidden={!!person.photo}
                      className="absolute inset-0 flex items-center justify-center font-display text-xl font-semibold text-foreground"
                    >
                      {person.initials}
                    </span>
                    {person.photo ? (
                      <Image
                        src={person.photo}
                        alt={person.name}
                        fill
                        sizes="80px"
                        className="object-cover"
                      />
                    ) : null}
                  </div>
                  <h3 className="mt-5 font-display text-lg font-semibold">
                    {person.name}
                  </h3>
                  <div className="mt-1 text-[10px] font-semibold uppercase tracking-[0.18em] text-muted-foreground">
                    {person.role}
                  </div>
                  <p className="mt-4 text-sm leading-relaxed text-muted-foreground">
                    {person.bio}
                  </p>
                  <div className="mt-5 flex flex-wrap justify-center gap-2">
                    {person.tags.map((t) => (
                      <Badge key={t} variant="muted">
                        {t}
                      </Badge>
                    ))}
                  </div>
                  <a
                    href={person.linkedin}
                    target="_blank"
                    rel="noreferrer"
                    aria-label={`${person.name} on LinkedIn (opens in new tab)`}
                    className="mt-5 inline-flex size-9 items-center justify-center rounded-full border border-border/60 bg-card/60 text-muted-foreground transition-colors hover:text-foreground hover:border-foreground/30"
                  >
                    <Linkedin className="size-4" />
                  </a>
                </article>
              </Reveal>
            ))}
          </div>
        </Container>
      </section>

      <section className="relative py-24" id="trust">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>Trust & safety</Badge>
            <h2 className="mt-4 font-display text-display-lg">
              Built with{" "}
              <span className="text-gradient-brand">clinical partners</span>.
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              ShiftED is developed and certified by psychologists and
              wellbeing experts. Our AI Engine is designed and trained by
              our Co-Founder & Special Advisor{" "}
              <strong className="text-foreground">Simon Agnew</strong>.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2">
            {values.map((v, i) => {
              const Icon = v.icon;
              return (
                <Reveal key={v.title} delay={i * 0.05}>
                  <div className="rounded-2xl border border-border/60 bg-card/40 p-7">
                    <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">{v.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {v.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>
        </Container>
      </section>

      {/* Inclusive design — extends Trust & safety with our concrete
          accessibility & equity commitments. Anchored as #inclusive so the
          footer / blog posts can deep-link straight to it. */}
      <section className="relative py-24" id="inclusive">
        <Container>
          <Reveal className="mx-auto max-w-2xl text-center">
            <Badge>Inclusive by design</Badge>
            <h2 className="mt-4 font-display text-display-lg">
              Accessible Experience.{" "}
              <span className="text-gradient-brand">Built for Everyone.</span>
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              A slick design isn't worth much if it locks people out. We treat
              inclusion as a design constraint, not an accessibility audit at
              the end. Woven into the type, contrast, motion, copy and
              defaults from the first wireframe.
            </p>
          </Reveal>

          <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {inclusion.map((item, i) => {
              const Icon = item.icon;
              return (
                <Reveal key={item.title} delay={i * 0.05}>
                  <div className="h-full rounded-2xl border border-border/60 bg-card/40 p-7">
                    <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
                      <Icon className="size-5" />
                    </div>
                    <h3 className="mt-5 font-display text-lg font-semibold">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                      {item.body}
                    </p>
                  </div>
                </Reveal>
              );
            })}
          </div>

          <Reveal className="mx-auto mt-12 max-w-3xl">
            <div className="rounded-2xl border border-border/60 bg-card/30 p-7 text-sm leading-relaxed text-muted-foreground">
              <p>
                <strong className="text-foreground/90">Still finding a barrier?</strong>{" "}
                Accessibility is never finished. If something on the site
                stops you from using it — a colour combination, a label,
                a flow — tell us at{" "}
                <a
                  href="/contact?topic=support"
                  className="underline underline-offset-4 hover:text-foreground"
                >
                  contact / support
                </a>{" "}
                and we'll prioritise the fix.
              </p>
            </div>
          </Reveal>
        </Container>
      </section>

      {/* Important framing for users in distress. ShiftED is a training
          platform, not therapy — anyone needing professional support gets
          direct routes to clinicians here. */}
      <section className="relative py-24" id="support">
        <Container>
          <Reveal>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-8 sm:p-12">
              <div className="flex flex-col gap-6 lg:flex-row lg:items-start lg:gap-10">
                <div className="lg:max-w-md">
                  <div className="inline-flex size-11 items-center justify-center rounded-xl bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
                    <LifeBuoy className="size-5" />
                  </div>
                  <h2 className="mt-5 font-display text-2xl font-semibold tracking-tight sm:text-3xl">
                    A practice-based training platform — not therapy.
                  </h2>
                  <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                    ShiftED helps you build skills. It isn't a substitute for
                    clinical care. If something you're working through feels
                    bigger than practice, the services below offer fast,
                    confidential professional support.
                  </p>
                </div>
                <ul className="grid flex-1 gap-3 sm:grid-cols-3">
                  {supportResources.map((s) => (
                    <li
                      key={s.name}
                      className="rounded-xl border border-border/60 bg-background/40 p-4"
                    >
                      <div className="font-display text-sm font-semibold">{s.name}</div>
                      <p className="mt-1 text-xs leading-relaxed text-muted-foreground">
                        {s.description}
                      </p>
                      <div className="mt-3 flex flex-wrap items-center gap-x-3 gap-y-1 text-xs">
                        <a
                          href={`tel:${s.phone.replace(/\s+/g, "")}`}
                          className="font-mono font-medium text-foreground hover:text-primary"
                        >
                          {s.phone}
                        </a>
                        <a
                          href={s.href}
                          target="_blank"
                          rel="noreferrer"
                          className="text-muted-foreground underline underline-offset-4 hover:text-foreground"
                        >
                          website
                        </a>
                      </div>
                    </li>
                  ))}
                </ul>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <section className="relative py-24">
        <Container>
          <Reveal>
            <div className="glass-card relative overflow-hidden p-10 sm:p-14">
              <Building2 className="size-7 text-primary" />
              <h2 className="mt-4 font-display text-display-lg max-w-3xl">
                For organisations rolling out at scale.
              </h2>
              <p className="mt-4 max-w-2xl text-muted-foreground">
                If you are a larger organisation and would like to discuss what
                we can do to help your team, please do contact us for a custom
                setup tailored to your business needs and your team.
              </p>
              <div className="mt-8 flex flex-wrap gap-3">
                <Button asChild>
                  <Link href="/contact?topic=sales">
                    Book a discovery call <ArrowRight />
                  </Link>
                </Button>
                <Button asChild variant="outline">
                  <Link href="/features">See the practices</Link>
                </Button>
              </div>
            </div>
          </Reveal>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
