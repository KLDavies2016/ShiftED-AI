import type { Metadata } from "next";
import { Mail, MessageSquare, Building2, Newspaper } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { ContactForm } from "@/components/marketing/contact-form";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Contact — talk to the team",
  description:
    "Get in touch with the ShiftED AI team. Sales pilots, partnerships, press, or general questions — we reply within a business day.",
  path: "/contact",
});

const channels = [
  {
    icon: Building2,
    title: "Sales & pilots",
    body: "Rolling ShiftED out across a team, trust or NGO. We'll scope a pilot with you.",
    hint: "topic=sales",
  },
  {
    icon: MessageSquare,
    title: "General questions",
    body: "Curious about the product, the science, or the roadmap.",
    hint: "topic=general",
  },
  {
    icon: Newspaper,
    title: "Press",
    body: "Speaking engagements, briefings, expert quotes on workforce wellbeing.",
    hint: "topic=press",
  },
  {
    icon: Mail,
    title: "Support",
    body: "Trouble with your account or invite? Tell us what's going wrong.",
    hint: "topic=support",
  },
];

interface ContactPageProps {
  searchParams: Promise<{ topic?: string }>;
}

/**
 * Contact page. ?topic=sales etc. preselects the dropdown so the inbound
 * intent is captured even when the visitor doesn't think to set it.
 */
export default async function ContactPage({ searchParams }: ContactPageProps) {
  const { topic } = await searchParams;
  const upper = topic?.toUpperCase() as
    | "SALES" | "GENERAL" | "PARTNERSHIPS" | "PRESS" | "SUPPORT" | undefined;
  const defaultTopic = upper && ["SALES","GENERAL","PARTNERSHIPS","PRESS","SUPPORT"].includes(upper)
    ? upper
    : "GENERAL";

  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge>Contact</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Talk to the{" "}
              <span className="text-gradient-brand">people building this</span>.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              Whether you're scoping a pilot, asking a research question, or
              writing about workforce wellbeing — we'd love to hear from you.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <Container>
          <div className="grid gap-12 lg:grid-cols-[1fr_1.4fr] lg:gap-16">
            <div className="space-y-4">
              {channels.map((c) => {
                const Icon = c.icon;
                return (
                  <div key={c.title} className="rounded-2xl border border-border/60 bg-card/40 p-6">
                    <div className="inline-flex size-10 items-center justify-center rounded-xl bg-brand-gradient/10 text-foreground ring-1 ring-border/60">
                      <Icon className="size-5" />
                    </div>
                    <h2 className="mt-4 font-display text-base font-semibold">{c.title}</h2>
                    <p className="mt-1 text-sm text-muted-foreground">{c.body}</p>
                  </div>
                );
              })}
            </div>
            <div className="rounded-2xl border border-border/60 bg-card/40 p-7 sm:p-10">
              <ContactForm defaultTopic={defaultTopic} />
            </div>
          </div>
        </Container>
      </section>
    </>
  );
}
