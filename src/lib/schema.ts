/**
 * JSON-LD schema helpers.
 *
 * Each function returns a Schema.org-compliant object that we serialise into
 * a <script type="application/ld+json"> tag. This is the primary signal we
 * give to AI search engines (Gemini, Perplexity, ChatGPT browse, Siri) and
 * traditional crawlers about who/what/where the entities on each page are.
 */
import { absoluteUrl, SITE_URL } from "./utils";

const ORG_ID = `${SITE_URL}/#organization`;

/** Schema.org Organization — the canonical company entity. */
export const organizationSchema = {
  "@context": "https://schema.org",
  "@type": "Organization",
  "@id": ORG_ID,
  name: "ShiftED AI",
  alternateName: "ShiftED",
  url: SITE_URL,
  logo: {
    "@type": "ImageObject",
    url: absoluteUrl("/icon.svg"),
    width: 332,
    height: 332,
  },
  description:
    "ShiftED AI is a UK-based, psychology-certified digital training platform that uses interactive AI scenarios to help professionals practise empathy, difficult conversations and attention management.",
  foundingDate: "2025",
  founder: [
    {
      "@type": "Person",
      name: "Louise Davies",
      jobTitle: "Founder",
      sameAs: ["https://www.linkedin.com/in/kelly-louise-davies-75401b78"],
    },
    {
      "@type": "Person",
      name: "Simon Andrew Agnew",
      jobTitle: "Co-Founder & Special Advisor",
      sameAs: ["https://www.linkedin.com/in/simon-andrew-agnew-38641839/"],
    },
    {
      "@type": "Person",
      name: "Joshua Hatcher",
      jobTitle: "Director of Strategic Partnerships & Growth",
      sameAs: ["https://www.linkedin.com/in/joshua-h-b86673a4/"],
    },
  ],
  contactPoint: [
    {
      "@type": "ContactPoint",
      contactType: "customer support",
      url: absoluteUrl("/contact"),
      availableLanguage: ["English"],
    },
    {
      "@type": "ContactPoint",
      contactType: "sales",
      url: absoluteUrl("/contact?topic=sales"),
      availableLanguage: ["English"],
    },
  ],
  areaServed: { "@type": "Country", name: "United Kingdom" },
  sameAs: ["https://my-pwb.co.uk"],
};

/** Person schema for founder profile cards on /about. */
export interface PersonSchemaInput {
  name: string;
  jobTitle: string;
  description: string;
  linkedin: string;
  image?: string;
  knowsAbout?: string[];
}

export function personSchema(p: PersonSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Person",
    name: p.name,
    jobTitle: p.jobTitle,
    description: p.description,
    image: p.image ? absoluteUrl(p.image) : undefined,
    sameAs: [p.linkedin],
    worksFor: { "@id": ORG_ID },
    knowsAbout: p.knowsAbout,
  };
}

/** FAQPage schema — built from our shared FAQ data. */
export function faqPageSchema(items: { question: string; answer: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((item) => ({
      "@type": "Question",
      name: item.question,
      acceptedAnswer: {
        "@type": "Answer",
        text: item.answer,
      },
    })),
  };
}

/** Course schema — used for each of the three training modules on /features. */
export interface CourseSchemaInput {
  name: string;
  description: string;
  slug: string;
  /** Plain-language list of skills the module covers (knowsAbout-style). */
  about?: string[];
}

export function courseSchema(c: CourseSchemaInput) {
  return {
    "@context": "https://schema.org",
    "@type": "Course",
    name: c.name,
    description: c.description,
    url: absoluteUrl(`/features#${c.slug}`),
    provider: {
      "@type": "Organization",
      "@id": ORG_ID,
      name: "ShiftED AI",
    },
    educationalLevel: "Professional",
    learningResourceType: "Interactive practice scenarios",
    inLanguage: "en-GB",
    about: c.about,
  };
}

/**
 * Renders a chunk of JSON-LD as a <script type="application/ld+json"> tag.
 * Centralised so we keep the same dangerouslySetInnerHTML pattern everywhere.
 */
export function jsonLd(data: unknown): string {
  return JSON.stringify(data);
}
