import type { PricingPlan } from "@/types";

/**
 * Pre-launch pricing. Until we open paid signups, every CTA points at the
 * waitlist; once Stripe lands we'll swap `ctaHref` to the checkout route.
 */
export const pricingPlans: PricingPlan[] = [
  {
    id: "starter",
    name: "Starter",
    tagline: "For individuals who want to develop the human skills their work demands.",
    priceLabel: "£12 / month",
    priceSubtext: "billed monthly · cancel any time",
    ctaLabel: "Join the waitlist",
    ctaHref: "/#waitlist",
    features: [
      "Empathy Practice module",
      "Managing Difficult Conversations module",
      "Personal confidence score & progress timeline",
      "Private journal with secure storage",
      "Email support within 1 business day",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    tagline: "For teams and small departments learning the skills together.",
    priceLabel: "£24 / seat / month",
    priceSubtext: "billed annually · minimum 5 seats",
    ctaLabel: "Join the waitlist",
    ctaHref: "/#waitlist",
    highlighted: true,
    features: [
      "Everything in Starter",
      "Social Media Reliance module",
      "Team confidence dashboards (anonymised)",
      "Shared module library + custom prompts",
      "Slack / Microsoft Teams notifications",
      "Onboarding session with a clinical lead",
    ],
  },
  {
    id: "enterprise",
    name: "Enterprise",
    tagline: "For health systems, NGOs and large employers protecting frontline staff.",
    priceLabel: "Talk to us",
    priceSubtext: "custom pricing · annual licence",
    ctaLabel: "Book a discovery call",
    ctaHref: "/contact?topic=sales",
    features: [
      "Everything in Growth",
      "Single sign-on (SAML / OIDC)",
      "Custom modules authored with your clinicians",
      "Aggregate insight reports for leadership",
      "Dedicated psychologist partner",
      "Procurement, DPA & security review support",
    ],
  },
];
