import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft } from "lucide-react";

import { Container } from "@/components/ui/container";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CtaBanner } from "@/components/marketing/cta-banner";
import { posts } from "@/data/posts";
import { buildMetadata } from "@/lib/seo";

interface BlogPostProps {
  params: Promise<{ slug: string }>;
}

export async function generateStaticParams() {
  return posts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: BlogPostProps): Promise<Metadata> {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) return {};
  return buildMetadata({
    title: post.title,
    description: post.excerpt,
    path: `/blog/${post.slug}`,
  });
}

/**
 * Blog post page. Body is intentionally a single shell paragraph today — this
 * is the seam where you'll slot in MDX or a CMS payload. Keeping the read
 * UI primitives polished now means swapping the source later is a one-liner.
 */
export default async function BlogPostPage({ params }: BlogPostProps) {
  const { slug } = await params;
  const post = posts.find((p) => p.slug === slug);
  if (!post) notFound();
  const date = new Date(post.publishedAt).toLocaleDateString("en-GB", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <>
      <article className="relative pt-24 pb-16 sm:pt-32 sm:pb-20">
        <Container>
          <Button asChild variant="ghost" size="sm" className="mb-8">
            <Link href="/blog">
              <ArrowLeft /> All field notes
            </Link>
          </Button>

          <div className="mx-auto max-w-3xl">
            <Badge variant="muted">{post.category}</Badge>
            <h1 className="mt-4 font-display text-display-lg leading-tight">
              {post.title}
            </h1>
            <div className="mt-6 flex flex-wrap items-center gap-3 text-sm text-muted-foreground">
              <span className="font-medium text-foreground/80">{post.author.name}</span>
              <span className="text-muted-foreground">{post.author.role}</span>
              <span aria-hidden>·</span>
              <span>{date}</span>
              <span aria-hidden>·</span>
              <span>{post.readingTime}</span>
            </div>

            <div className="prose prose-invert mt-12 max-w-none text-base leading-relaxed text-foreground/85 [&_p]:mb-5">
              <p className="text-xl text-muted-foreground">{post.excerpt}</p>
              <p>
                This is a placeholder body for the field-notes post. When you're
                ready to wire MDX or a headless CMS, replace this block with the
                rendered content stream — the styles, typography rhythm and
                reading width are already tuned for long-form prose.
              </p>
              <p>
                Until then, treat this as a worked example of the article shell:
                full-bleed header, generous reading column, in-body badges and
                the closing waitlist CTA below.
              </p>
            </div>
          </div>
        </Container>
      </article>

      <CtaBanner />
    </>
  );
}
