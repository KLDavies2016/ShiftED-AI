import type { BlogPost } from "@/types";

/**
 * Lightweight blog index. When you're ready, swap this file for an MDX loader
 * (e.g. fumadocs, contentlayer) or a headless CMS — the consuming components
 * only care about the BlogPost shape.
 */
export const posts: BlogPost[] = [
  {
    slug: "empathy-is-a-finite-resource",
    title: "Empathy is a finite resource. Treat it like one.",
    excerpt:
      "Compassion fatigue isn't a character flaw — it's a predictable response to repeated exposure. Here's how we re-think training so the cost falls.",
    author: { name: "Dr. Iona Hardy", role: "Clinical Lead, ShiftED" },
    publishedAt: "2026-04-22",
    readingTime: "7 min read",
    category: "Research",
  },
  {
    slug: "what-a-flight-simulator-teaches-managers",
    title: "What a flight simulator teaches us about manager training",
    excerpt:
      "Pilots don't learn to land by reading. Why does the average manager still learn difficult conversations from a PDF?",
    author: { name: "Marcus Reyes", role: "Guest contributor" },
    publishedAt: "2026-04-08",
    readingTime: "5 min read",
    category: "Practice",
  },
  {
    slug: "moral-injury-not-burnout",
    title: "It's not burnout — it's moral injury. And the playbook is different.",
    excerpt:
      "We keep treating two distinct conditions with the same lukewarm solutions. Untangling them changes what good support looks like.",
    author: { name: "Simon Agnew", role: "Moral injury specialist" },
    publishedAt: "2026-03-19",
    readingTime: "9 min read",
    category: "Healthcare",
  },
  {
    slug: "the-loneliness-void-of-frontline-leadership",
    title: "The loneliness void of frontline leadership",
    excerpt:
      "First-time managers are the most exposed and the least supported. We mapped the gap — and what closes it.",
    author: { name: "Dr. Iona Hardy", role: "Clinical Lead, ShiftED" },
    publishedAt: "2026-02-04",
    readingTime: "6 min read",
    category: "Leadership",
  },
];
