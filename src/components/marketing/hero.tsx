"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Sparkles, ShieldCheck } from "lucide-react";

import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Container } from "@/components/ui/container";
import { AnimatedGlow } from "./animated-glow";
import { WaitlistForm } from "./waitlist-form";

/**
 * Home hero. Composition:
 *   - Glow + grid background (decorative, behind everything)
 *   - Pill badge (signals trust anchor)
 *   - Eyebrow tagline + display headline with gradient accent
 *   - Subheadline
 *   - Inline waitlist form (primary CTA) + secondary "See how it works"
 *   - Product mockup card on the right (or below on mobile)
 *   - Trust indicators row
 *
 * Layout note: the grid is top-aligned (`items-start`) so the heading copy
 * always sits flush to the top of the viewport, even when the mockup column
 * grows taller than the text column.
 */
export function Hero() {
  return (
    <section className="relative overflow-hidden pt-12 pb-24 sm:pt-16 sm:pb-32">
      <AnimatedGlow />
      <Container>
        <div className="grid items-start gap-16 lg:grid-cols-[1.05fr_1fr]">
          <div>
            {/* AEO-friendly factual definition. Screen-reader / AI-parser
                accessible but visually hidden so it doesn't clutter the hero.
                Helps Gemini / Perplexity / Siri map ShiftED AI as an entity. */}
            <p className="sr-only">
              ShiftED AI is a UK-based, psychology-certified digital training
              platform that uses interactive AI scenarios to help professionals
              practise empathy, difficult conversations and attention
              management.
            </p>
            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
            >
              <Badge variant="gradient" className="mb-5">
                <Sparkles className="size-3" /> Early Access to Group Testing
              </Badge>
              <p className="mb-4 text-sm font-medium uppercase tracking-[0.18em] text-muted-foreground">
                Shift your emotional development with ShiftED AI
              </p>
              <h1 className="font-display text-display-xl text-foreground sm:text-display-2xl">
                Build the human skills,{" "}
                <span className="text-gradient-brand">
                  one practice at a time.
                </span>
              </h1>
              <p className="mt-6 max-w-xl text-balance text-base text-muted-foreground sm:text-lg">
                A gym for the mind that helps you build your empathy, critical
                thinking and emotional intelligence muscles with guided and
                practice-based methods. A practice-based training platform, for
                long-term behavioural change.
              </p>
            </motion.div>

            <motion.div
              id="waitlist"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 max-w-xl scroll-mt-24"
            >
              {/* Full-field form so every entry point to the waitlist looks
                  identical — header "Join the waitlist" button scrolls here
                  via the #waitlist anchor. */}
              <WaitlistForm variant="expanded" />
              <p className="mt-3 text-xs text-muted-foreground">
                Free to join. No credit card. We email you when the platform
                goes live.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="mt-8 flex flex-wrap items-center gap-4 text-xs text-muted-foreground"
            >
              <span className="inline-flex items-center gap-1.5">
                <ShieldCheck className="size-4 text-primary" />
                Certified by psychologists
              </span>
              <span aria-hidden>·</span>
              <span>GDPR-ready · UK & EU hosting</span>
              <span aria-hidden>·</span>
              <Link href="/features" className="inline-flex items-center gap-1 underline underline-offset-2 hover:text-foreground">
                See how it works <ArrowRight className="size-3" />
              </Link>
            </motion.div>
          </div>

          <HeroMockup />
        </div>
      </Container>
    </section>
  );
}

function HeroMockup() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 24, rotate: -1 }}
      animate={{ opacity: 1, y: 0, rotate: 0 }}
      transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
      className="relative"
    >
      <div className="glass-card noise relative overflow-hidden px-5 pb-5 pt-3 sm:px-6 sm:pb-6 sm:pt-4 shadow-card">
        {/* Mock window chrome — tightened top padding so the session label
            sits closer to the top edge of the card. */}
        <div className="flex items-center gap-1.5">
          <span className="size-2.5 rounded-full bg-rose-400/70" />
          <span className="size-2.5 rounded-full bg-amber-400/70" />
          <span className="size-2.5 rounded-full bg-emerald-400/70" />
          <span className="ml-3 text-xs text-muted-foreground">
            shifted.ai · session · difficult-conversations
          </span>
        </div>

        <div className="mt-4 grid gap-4">
          {/* Scenario 1 — from the Difficult Conversations module. */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-4 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-violet">
                Difficult Conversations · 02:14
              </span>
              <span className="rounded-full bg-emerald-400/15 px-2 py-0.5 text-[10px] font-medium text-emerald-300">
                Active
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              "I noticed you missed the last two stand-ups. I want to check in —
              what's going on?"
            </p>
          </div>

          {/* Response choices for scenario 1 */}
          <div className="grid gap-2">
            <ChoiceBar weight={88} label="Validate, then ask an open question" tone="good" />
            <ChoiceBar weight={62} label="Move to logistics and rescheduling" tone="mid" />
            <ChoiceBar weight={31} label="Flag performance concern directly" tone="low" />
          </div>

          {/* Scenario 2 — from the Empathy Practice module. Adds variety and
              fills the right column to match the now-taller expanded waitlist
              form on the left. */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-4 backdrop-blur">
            <div className="flex items-center justify-between gap-3">
              <span className="text-xs font-semibold uppercase tracking-wider text-brand-pink">
                Empathy Practice · 04:38
              </span>
              <span className="rounded-full bg-muted px-2 py-0.5 text-[10px] font-medium text-muted-foreground">
                Up next
              </span>
            </div>
            <p className="mt-2 text-sm leading-relaxed text-foreground/90">
              A teammate stops you in the hallway: "I'm not sure I can do this
              any more. Can we talk?"
            </p>
          </div>

          {/* Response choices for scenario 2 */}
          <div className="grid gap-2">
            <ChoiceBar weight={91} label="Pause, sit down, ask what's on their mind" tone="good" />
            <ChoiceBar weight={54} label="Suggest a proper 1:1 tomorrow morning" tone="mid" />
            <ChoiceBar weight={22} label="Reassure them everyone has tough weeks" tone="low" />
          </div>

          {/* Confidence meter */}
          <div className="rounded-xl border border-border/60 bg-background/40 p-4">
            <div className="flex items-center justify-between text-xs text-muted-foreground">
              <span>Confidence this quarter</span>
              <span className="font-mono text-foreground">7.4 / 10</span>
            </div>
            <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "74%" }}
                transition={{ duration: 1.4, delay: 0.5, ease: "easeOut" }}
                className="h-full bg-brand-gradient"
              />
            </div>
            <div className="mt-3 flex gap-1.5">
              {Array.from({ length: 14 }).map((_, i) => (
                <span
                  key={i}
                  className="h-6 flex-1 rounded-sm"
                  style={{
                    background:
                      i < 10
                        ? "linear-gradient(180deg, rgba(132,109,238,0.5), rgba(84,112,254,0.85))"
                        : "rgba(255,255,255,0.06)",
                  }}
                />
              ))}
            </div>
          </div>
        </div>

        {/* Decorative glow ring */}
        <div
          aria-hidden
          className="pointer-events-none absolute -inset-px rounded-2xl"
          style={{
            background:
              "linear-gradient(135deg, rgba(250,102,198,0.4), transparent 40%, rgba(84,112,254,0.4))",
            mask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMask: "linear-gradient(#000 0 0) content-box, linear-gradient(#000 0 0)",
            WebkitMaskComposite: "xor",
            maskComposite: "exclude",
            padding: 1,
          }}
        />
      </div>
    </motion.div>
  );
}

function ChoiceBar({
  weight,
  label,
  tone,
}: {
  weight: number;
  label: string;
  tone: "good" | "mid" | "low";
}) {
  const accent =
    tone === "good"
      ? "from-emerald-400/60 to-emerald-300/30"
      : tone === "mid"
        ? "from-amber-400/60 to-amber-300/20"
        : "from-rose-400/60 to-rose-300/20";
  return (
    <div className="relative overflow-hidden rounded-lg border border-border/60 bg-card/40 px-3 py-2.5">
      <motion.span
        aria-hidden
        initial={{ scaleX: 0 }}
        animate={{ scaleX: weight / 100 }}
        transition={{ duration: 1.1, delay: 0.4, ease: "easeOut" }}
        className={`absolute inset-y-0 left-0 origin-left bg-gradient-to-r ${accent}`}
        style={{ width: "100%" }}
      />
      <div className="relative flex items-center justify-between text-xs">
        <span className="truncate pr-3">{label}</span>
        <span className="font-mono tabular-nums text-muted-foreground">{weight}%</span>
      </div>
    </div>
  );
}
