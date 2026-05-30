"use client";

import { motion } from "framer-motion";
import { ArrowUpRight, BarChart3, Flame, MessageCircleHeart, Sparkles, Users } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Reveal } from "./reveal";

/**
 * Stylised "product peek" section. We don't have a real app screenshot yet —
 * but a hand-built mock that demonstrates the dashboard's vibe converts better
 * than a placeholder image and looks credible without lying about features.
 */
export function DashboardPreview() {
  return (
    <section className="relative overflow-hidden py-24 sm:py-32">
      <Container>
        <div className="grid gap-12 lg:grid-cols-[1fr_1.1fr] lg:items-center">
          <Reveal>
            <Badge>Inside ShiftED</Badge>
            <h2 className="mt-4 font-display text-display-lg">
              See your growth{" "}
              <span className="text-gradient-brand">in a glance</span>.
            </h2>
            <p className="mt-4 text-balance text-muted-foreground">
              Your private dashboard tracks the confidence and consistency
              behind every conversation. Teams get the same view in aggregate —
              anonymised, never identifiable.
            </p>
            <ul className="mt-8 space-y-3 text-sm">
              {[
                "Confidence score that moves with your practice",
                "Replay any session — including the choices you didn't make",
                "Soft nudges when you're due for a reset",
                "Team-level patterns without surveillance",
              ].map((b) => (
                <li key={b} className="flex items-start gap-2.5">
                  <span aria-hidden className="mt-1.5 size-1.5 shrink-0 rounded-full bg-brand-gradient" />
                  <span className="text-foreground/85">{b}</span>
                </li>
              ))}
            </ul>
          </Reveal>

          <Reveal delay={0.1}>
            <DashboardMockup />
          </Reveal>
        </div>
      </Container>
    </section>
  );
}

function DashboardMockup() {
  return (
    <div className="glass-card relative overflow-hidden p-5 sm:p-7 shadow-card">
      <div className="flex items-center justify-between border-b border-border/60 pb-4">
        <div className="flex items-center gap-2 text-xs text-muted-foreground">
          <span className="size-2 rounded-full bg-emerald-400" />
          shifted.ai/dashboard
        </div>
        <Badge variant="muted">This week</Badge>
      </div>

      <div className="mt-6 grid grid-cols-2 gap-4 sm:grid-cols-4">
        <StatCard icon={Flame} label="Streak" value="14 days" />
        <StatCard icon={Sparkles} label="Confidence" value="7.4" trend="+0.6" />
        <StatCard icon={MessageCircleHeart} label="Sessions" value="22" />
        <StatCard icon={Users} label="Replays" value="6" />
      </div>

      <div className="mt-5 rounded-xl border border-border/60 bg-background/40 p-5">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm font-medium">
            <BarChart3 className="size-4 text-primary" />
            Confidence over 12 weeks
          </div>
          <a className="inline-flex items-center gap-1 text-xs text-muted-foreground hover:text-foreground" href="#">
            Open report <ArrowUpRight className="size-3" />
          </a>
        </div>
        <div className="mt-4 flex h-32 items-end gap-1.5">
          {[28, 32, 36, 33, 41, 44, 48, 52, 58, 61, 67, 72].map((h, i) => (
            <motion.div
              key={i}
              initial={{ height: 0 }}
              whileInView={{ height: `${h * 1.5}%` }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.04, ease: "easeOut" }}
              className="flex-1 rounded-sm bg-brand-gradient/70"
              style={{ minHeight: 4 }}
            />
          ))}
        </div>
        <div className="mt-2 flex justify-between text-[10px] uppercase tracking-wider text-muted-foreground">
          {["W1", "W3", "W6", "W9", "W12"].map((w) => (
            <span key={w}>{w}</span>
          ))}
        </div>
      </div>

      <div className="mt-5 rounded-xl border border-border/60 bg-background/40 p-5">
        <div className="text-xs font-semibold uppercase tracking-wider text-muted-foreground">
          Latest session
        </div>
        <div className="mt-2 font-display text-base">
          Difficult conversations · "Performance reset" · 11 min
        </div>
        <div className="mt-3 grid grid-cols-3 gap-3 text-xs">
          <Mini label="Validation" value="92" />
          <Mini label="Open Qs" value="74" />
          <Mini label="Recovery" value="68" />
        </div>
      </div>
    </div>
  );
}

function StatCard({
  icon: Icon,
  label,
  value,
  trend,
}: {
  icon: React.ElementType;
  label: string;
  value: string;
  trend?: string;
}) {
  return (
    <div className="rounded-xl border border-border/60 bg-background/40 p-4">
      <div className="flex items-center justify-between text-xs text-muted-foreground">
        <span className="inline-flex items-center gap-1.5">
          <Icon className="size-3.5" />
          {label}
        </span>
        {trend ? <span className="text-emerald-400">{trend}</span> : null}
      </div>
      <div className="mt-2 font-display text-2xl font-semibold tabular-nums">
        {value}
      </div>
    </div>
  );
}

function Mini({ label, value }: { label: string; value: string }) {
  return (
    <div className="rounded-lg bg-card/60 p-3">
      <div className="text-[10px] uppercase tracking-wider text-muted-foreground">{label}</div>
      <div className="mt-1 font-mono text-base tabular-nums">{value}</div>
    </div>
  );
}
