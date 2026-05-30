# ShiftED AI — Website Architecture

> **Phase:** Waitlist + marketing site. Full product platform (auth flows, dashboard, billing, modules) will be built later.

## 1. Stack

| Layer            | Choice                                                                       |
| ---------------- | ---------------------------------------------------------------------------- |
| Framework        | **Next.js 15** (App Router, React Server Components, TypeScript strict)      |
| Styling          | **Tailwind CSS v4** with custom design tokens; class-based dark mode         |
| UI primitives    | **shadcn/ui** (Radix under the hood), copied into `src/components/ui`        |
| Animation        | **Framer Motion** for scroll reveals, hero glow, page transitions            |
| Forms / validation | **react-hook-form** + **zod**                                              |
| Email            | **Resend** for transactional (waitlist confirmation, contact echo)           |
| Database         | **PostgreSQL** via **Prisma ORM** (hosted on Supabase or Neon)               |
| Auth             | **Supabase Auth** (stubs only this pass — login/signup pages render)         |
| Deployment       | **Vercel** (Edge runtime for marketing, Node for API routes that need it)   |
| Analytics        | Vercel Analytics + custom event hooks (placeholder)                          |

## 2. Sitemap

```
/                       Home (hero + sections, primary waitlist CTA)
/features               Deep dive on the 3 modules
/pricing                Plans (waitlist-gated until launch)
/integrations           Slack, Teams, BambooHR, SSO etc.
/customers              Logos + case studies
/testimonials           Curated quote wall
/about                  Mission, team (Simon Agnew), the science, my-pwb.co.uk trust anchor
/blog                   MDX/CMS-ready index
/blog/[slug]            Individual post (shell)
/contact                Sales/general contact form
/login                  Supabase login shell
/signup                 Supabase signup shell

API
/api/waitlist           POST — capture email + role, persist, fire Resend confirmation
/api/contact            POST — sales/contact form, fire Resend echo + admin notification
/api/newsletter         POST — newsletter subscribe (placeholder, same shape)
```

## 3. Folder structure

```
shifted-ai-web/
├── prisma/
│   └── schema.prisma              # Users, WaitlistEntry, ContactSubmission, Subscriber, etc.
├── public/
│   ├── logo/                       # PNG/SVG exports of brand mark
│   ├── og/                         # Open Graph image(s)
│   └── patterns/                   # Background grid, noise
├── src/
│   ├── app/
│   │   ├── layout.tsx              # Root: <html>, theme provider, fonts, metadata
│   │   ├── page.tsx                # Home (composes marketing sections)
│   │   ├── (marketing)/            # Route group — share marketing layout
│   │   │   ├── layout.tsx          # Site header + footer wrapper
│   │   │   ├── features/page.tsx
│   │   │   ├── pricing/page.tsx
│   │   │   ├── integrations/page.tsx
│   │   │   ├── customers/page.tsx
│   │   │   ├── testimonials/page.tsx
│   │   │   ├── about/page.tsx
│   │   │   ├── contact/page.tsx
│   │   │   └── blog/
│   │   │       ├── page.tsx        # Index
│   │   │       └── [slug]/page.tsx # Post shell
│   │   ├── (auth)/                 # Auth shells
│   │   │   ├── login/page.tsx
│   │   │   └── signup/page.tsx
│   │   ├── api/
│   │   │   ├── waitlist/route.ts
│   │   │   ├── contact/route.ts
│   │   │   └── newsletter/route.ts
│   │   ├── sitemap.ts              # Dynamic sitemap
│   │   ├── robots.ts
│   │   └── opengraph-image.tsx     # Generated OG card
│   ├── components/
│   │   ├── ui/                     # Primitive Button, Input, Card, etc. (shadcn)
│   │   ├── layout/                 # SiteHeader, SiteFooter, MobileNav, ThemeToggle
│   │   └── marketing/              # Hero, FeatureGrid, ModuleCard, TestimonialCarousel, Pricing, FAQ, CTABanner, WaitlistForm, AnimatedGlow, LogoWall
│   ├── lib/
│   │   ├── prisma.ts               # Singleton client
│   │   ├── supabase/               # Browser + server helpers (stubs)
│   │   ├── resend.ts               # Mail helper
│   │   ├── validation.ts           # Zod schemas
│   │   ├── seo.ts                  # buildMetadata() helper
│   │   ├── analytics.ts            # Event tracker (no-op + provider hook)
│   │   ├── rate-limit.ts           # In-memory + Upstash-compatible rate limiter
│   │   └── utils.ts                # cn() helper, formatters
│   ├── hooks/
│   │   ├── use-mounted.ts
│   │   ├── use-scroll-position.ts
│   │   └── use-prefers-reduced-motion.ts
│   ├── data/                       # Static content keeping copy DRY
│   │   ├── modules.ts              # The 3 product modules
│   │   ├── nav.ts                  # Header/footer links
│   │   ├── pricing.ts              # Plan definitions
│   │   ├── testimonials.ts
│   │   ├── faq.ts
│   │   ├── integrations.ts
│   │   └── posts.ts                # Sample blog post metadata
│   ├── types/
│   │   └── index.ts
│   └── styles/
│       └── globals.css             # Tailwind + design tokens + base layer
├── .env.example
├── .eslintrc.json
├── .gitignore
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
├── tailwind.config.ts
└── tsconfig.json
```

## 4. Design tokens

The brand gradient lives in the logo SVG: `#fa66c6` → `#d568d2` → `#a76be2` → `#836dee` → `#696ff7` → `#5970fc` → `#5470fe`. We expose it as:

```css
--brand-gradient: linear-gradient(135deg, #fa66c6 0%, #a76be2 45%, #5470fe 100%);
--brand-pink: #fa66c6;
--brand-violet: #a76be2;
--brand-blue:  #5470fe;
--brand-ink:   #00092d;  /* logo wordmark color, used as dark-mode surface */
```

Backgrounds stay neutral (`zinc-50` in light, `#00092d`-derived in dark) — the gradient is reserved for headlines, primary CTAs, hero glow, and module accents. This matches Stripe/Linear/Vercel discipline.

## 5. Conversion path

Every page funnels to the **waitlist CTA**. The header has a persistent "Join the waitlist" button on the right. The home page contains the form inline in the hero and again in the closing CTA banner. The pricing page replaces "Buy" with "Reserve your seat → waitlist". The contact page splits "Sales enquiry" from "Join the waitlist".

## 6. What's stubbed vs production-ready

| Concern                | State            | Notes                                                                                   |
| ---------------------- | ---------------- | --------------------------------------------------------------------------------------- |
| Marketing pages        | **Production**   | All copy, animations, responsive, dark/light, SEO                                       |
| Waitlist API + email   | **Production**   | Zod validated, rate-limited, Resend wired, Prisma persisted                            |
| Contact API            | **Production**   | Same shape as waitlist                                                                  |
| Login/Signup pages     | **Stub**         | Render the form; Supabase calls commented with TODO                                     |
| Dashboard              | **Excluded**     | Per user direction, not in this pass                                                    |
| Stripe                 | **Excluded**     | Pricing page is waitlist-gated; integrate when launching paid                           |
| Blog CMS               | **Stub**         | File-based metadata in `src/data/posts.ts`; swap for MDX or CMS later                  |
| Admin panel            | **Excluded**     | Add later under `/admin` with Supabase role check                                       |
