export interface NavLink {
  label: string;
  href: string;
  description?: string;
}

export const primaryNav: NavLink[] = [
  { label: "Features", href: "/features" },
  { label: "Pricing", href: "/pricing" },
  { label: "Integrations", href: "/integrations" },
  { label: "Testing", href: "/testing" },
  { label: "Testimonials", href: "/testimonials" },
  { label: "About", href: "/about" },
];

export const footerNav = {
  product: [
    { label: "Features", href: "/features" },
    { label: "Pricing", href: "/pricing" },
    { label: "Integrations", href: "/integrations" },
    { label: "Testing", href: "/testing" },
    { label: "Testimonials", href: "/testimonials" },
  ],
  company: [
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
    { label: "Careers", href: "/contact?topic=careers" },
  ],
  legal: [
    { label: "Privacy", href: "/legal/privacy" },
    { label: "Terms", href: "/legal/terms" },
    { label: "Cookies", href: "/legal/cookies" },
    { label: "DPA", href: "/legal/dpa" },
  ],
  resources: [
    { label: "Trust & safety", href: "/about#trust" },
    { label: "Inclusive design", href: "/about#inclusive" },
    { label: "Press", href: "/contact?topic=press" },
  ],
};

/**
 * Crisis & professional-support resources surfaced in the footer + the
 * About page. ShiftED AI is a practice-based training platform — not
 * therapy — so we make it easy for anyone in distress to reach a clinician.
 */
export const supportResources = [
  {
    name: "Samaritans",
    description: "24/7 listening service for anyone in distress (UK & Ireland).",
    phone: "116 123",
    href: "https://www.samaritans.org/",
  },
  {
    name: "NHS 24",
    description: "Scotland's 24-hour mental health and wellbeing support line.",
    phone: "111",
    href: "https://www.nhs24.scot/our-services/mental-health-hub/",
  },
  {
    name: "Mind",
    description: "Information and confidential support on any mental-health issue.",
    phone: "0300 123 3393",
    href: "https://www.mind.org.uk/",
  },
];
