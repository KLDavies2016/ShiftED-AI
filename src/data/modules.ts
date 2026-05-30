import {
  HeartHandshake,
  MessagesSquare,
  ShieldCheck,
  type LucideIcon,
} from "lucide-react";

export interface Module {
  slug: string;
  name: string;
  tagline: string;
  description: string;
  bullets: string[];
  icon: LucideIcon;
  accent: "pink" | "violet" | "blue";
}

/**
 * The opening three modules in the ShiftED library. Order here drives the
 * home page's feature row, /features deep-dives, and share metadata. New
 * modules will join this list as the library grows.
 */
export const modules: Module[] = [
  {
    slug: "empathy-practice",
    name: "Empathy Practice",
    tagline: "Re-muscle empathy without absorbing the cost.",
    description:
      "Interactive scenarios that help you reconnect with the people in your work — patients, clients, students, colleagues — without carrying their distress home with you.",
    bullets: [
      "AI-led encounters trained by clinical psychologists",
      "Real-time feedback on tone, response, and recovery",
      "Boundary practice that protects long-term resilience",
    ],
    icon: HeartHandshake,
    accent: "pink",
  },
  {
    slug: "managing-difficult-conversations",
    name: "Managing Difficult Conversations",
    tagline: "A flight simulator for the moments that matter.",
    description:
      "Practise delivering tough news, navigating conflict and de-escalating high-stakes moments — with both confidence and empathy — before the real-world stakes are high.",
    bullets: [
      "Branching dialogue trees grounded in validated frameworks",
      "Replay any moment, change one variable, see a new outcome",
      "Confidence score you can track over a quarter",
    ],
    icon: MessagesSquare,
    accent: "violet",
  },
  {
    slug: "moral-injury-mitigation",
    name: "Moral Injury Mitigation",
    tagline: "Process ethical compromise without losing yourself.",
    description:
      "Tools designed with moral-injury specialist Simon Agnew that help people in mission-led roles process ethical compromise and stay anchored to their core values under pressure.",
    bullets: [
      "Structured reflection grounded in moral-injury research",
      "Private journaling with optional clinician oversight",
      "Designed for healthcare, social work and humanitarian roles",
    ],
    icon: ShieldCheck,
    accent: "blue",
  },
];
