import type { ContentCard } from "@/types";
import {
  Slack,
  MessageSquare,
  Calendar,
  Users,
  KeyRound,
  ShieldCheck,
  GraduationCap,
  Workflow,
} from "lucide-react";

/**
 * Integration cards. We're not yet shipping these — they signal direction and
 * collect demand. Each one is tagged so users see "Available", "Soon" or
 * "Planned".
 */
export const integrations: (ContentCard & { status: "Available" | "Soon" | "Planned" })[] = [
  {
    title: "Slack",
    description: "Nudge a 5-minute practice session into your team's flow without breaking focus.",
    icon: Slack,
    status: "Soon",
  },
  {
    title: "Microsoft Teams",
    description: "Bring scenarios and confidence scores into the channels your managers already live in.",
    icon: MessageSquare,
    status: "Soon",
  },
  {
    title: "Google Calendar",
    description: "Auto-schedule a practice block before a difficult 1:1 lands on the calendar.",
    icon: Calendar,
    status: "Planned",
  },
  {
    title: "BambooHR",
    description: "Sync seats with HRIS so people get the right modules from day one.",
    icon: Users,
    status: "Planned",
  },
  {
    title: "Okta & Azure AD (SSO)",
    description: "SAML / OIDC single sign-on for enterprise rollouts. SCIM provisioning included.",
    icon: KeyRound,
    status: "Available",
  },
  {
    title: "SOC 2 & GDPR posture",
    description: "Practice content is encrypted at rest; DPA and sub-processor list available on request.",
    icon: ShieldCheck,
    status: "Available",
  },
  {
    title: "LMS (SCORM / xAPI)",
    description: "Surface ShiftED courses inside Cornerstone, Workday Learning, or your own LMS.",
    icon: GraduationCap,
    status: "Planned",
  },
  {
    title: "Zapier & Webhooks",
    description: "Trigger downstream workflows when a milestone is reached or a manager flags a concern.",
    icon: Workflow,
    status: "Planned",
  },
];
