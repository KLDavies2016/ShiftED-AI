import type { Metadata } from "next";
import Link from "next/link";
import { ArrowUpRight } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { AnimatedGlow } from "@/components/marketing/animated-glow";
import { Reveal } from "@/components/marketing/reveal";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { posts } from "@/data/posts";
import { buildMetadata } from "@/lib/seo";

export const metadata: Metadata = buildMetadata({
  title: "Field notes — research & practice",
  description:
    "Writing from the ShiftED team and clinical partners on empathy, difficult conversations, and the science of practice.",
  path: "/blog",
});

function formatDate(iso: string): string {
  return new Date(iso).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export default function BlogIndexPage() {
  const [featured, ...rest] = posts;
  return (
    <>
      <section className="relative overflow-hidden pt-24 pb-12 sm:pt-32 sm:pb-16">
        <AnimatedGlow />
        <Container>
          <Reveal className="mx-auto max-w-3xl text-center">
            <Badge>Field notes</Badge>
            <h1 className="mt-4 font-display text-display-xl">
              Research and practice from{" "}
              <span className="text-gradient-brand">the front line</span>.
            </h1>
            <p className="mt-6 text-balance text-lg text-muted-foreground">
              Short, clinical, occasionally opinionated. We write about what
              we're learning from the people doing the work.
            </p>
          </Reveal>
        </Container>
      </section>

      <section className="relative pb-24 sm:pb-32">
        <Container>
          {featured && (
            <Reveal>
              <Link
                href={`/blog/${featured.slug}`}
                className="group relative block overflow-hidden rounded-2xl border border-border/60 bg-card/40 p-8 transition-all hover:bg-card/60 sm:p-12"
              >
                <Badge variant="muted">{featured.category}</Badge>
                <h2 className="mt-3 font-display text-3xl font-semibold leading-tight tracking-tight sm:text-4xl">
                  {featured.title}
                </h2>
                <p className="mt-4 max-w-2xl text-muted-foreground">{featured.excerpt}</p>
                <div className="mt-6 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="font-medium text-foreground/80">{featured.author.name}</span>
                  <span aria-hidden>·</span>
                  <span>{formatDate(featured.publishedAt)}</span>
                  <span aria-hidden>·</span>
                  <span>{featured.readingTime}</span>
                </div>
                <ArrowUpRight className="absolute right-8 top-8 size-6 text-muted-foreground transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </Reveal>
          )}

          <ul className="mt-10 grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {rest.map((p, i) => (
              <Reveal key={p.slug} delay={i * 0.04} as="li">
                <Link
                  href={`/blog/${p.slug}`}
                  className="group flex h-full flex-col rounded-2xl border border-border/60 bg-card/40 p-7 transition-all hover:bg-card/60"
                >
                  <Badge variant="muted">{p.category}</Badge>
                  <h3 className="mt-3 font-display text-xl font-semibold leading-snug tracking-tight">
                    {p.title}
                  </h3>
                  <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{p.excerpt}</p>
                  <div className="mt-auto pt-6 text-xs text-muted-foreground">
                    {p.author.name} · {formatDate(p.publishedAt)} · {p.readingTime}
                  </div>
                </Link>
              </Reveal>
            ))}
          </ul>
        </Container>
      </section>

      <CtaBanner />
    </>
  );
}
