# ShiftED AI — Website

> Protecting the human in the workforce.

The marketing site and waitlist landing experience for **ShiftED AI** — a digital de-compressor and practice sandbox that helps people develop the emotional skills their work demands (empathy, difficult conversations, moral resilience).

Built with Next.js 15, TypeScript, Tailwind, shadcn/ui, Framer Motion, Prisma, Supabase auth, Resend, and Vercel.

---

## What's in this repo

- **Marketing site** — home + 8 inner pages (`/features`, `/pricing`, `/integrations`, `/customers`, `/testimonials`, `/about`, `/blog`, `/contact`).
- **Auth shells** — `/login` and `/signup` rendered and wired to forms; Supabase calls are stubbed for the next build phase.
- **API routes** — `/api/waitlist`, `/api/contact`, `/api/newsletter`. Each is zod-validated, rate-limited, persists to Prisma, and triggers Resend transactional email.
- **Design system** — Tailwind tokens, dark/light theme, brand gradient utilities, glass and grid surfaces, motion primitives.
- **SEO** — semantic markup, `sitemap.ts`, `robots.ts`, dynamic OG image (`opengraph-image.tsx`), JSON-LD organization schema, per-page metadata helpers.

For the architecture write-up see [`ARCHITECTURE.md`](./ARCHITECTURE.md).

---

## Quick start

```bash
# 1. Install
npm install

# 2. Environment
cp .env.example .env.local
#    Fill in: NEXT_PUBLIC_SITE_URL, DATABASE_URL, RESEND_API_KEY (and Supabase
#    vars when you wire auth)

# 3. Database (optional for marketing-only run — APIs degrade gracefully)
npm run db:generate
npm run db:push

# 4. Dev
npm run dev
# → http://localhost:3000
```

Node ≥ 20 required.

---

## Scripts

| Script              | Purpose                                              |
| ------------------- | ---------------------------------------------------- |
| `npm run dev`       | Start the Next.js dev server                         |
| `npm run build`     | Production build                                     |
| `npm run start`     | Run the production build                             |
| `npm run lint`      | ESLint                                               |
| `npm run type-check`| `tsc --noEmit`                                       |
| `npm run db:generate` | `prisma generate`                                  |
| `npm run db:push`   | Sync schema → database (dev only)                    |
| `npm run db:studio` | Open Prisma Studio                                   |
| `npm run format`    | Prettier write                                       |

---

## Project layout

```
shifted-ai-web/
├── prisma/schema.prisma          # Waitlist, contact, newsletter + auth schema
├── public/                       # Static assets
└── src/
    ├── app/
    │   ├── layout.tsx            # Root layout, theme provider, fonts, OG
    │   ├── page.tsx              # Home (composes marketing sections)
    │   ├── (marketing)/          # Inner marketing pages + shared header/footer
    │   ├── (auth)/               # /login, /signup with minimal layout
    │   ├── api/                  # waitlist, contact, newsletter handlers
    │   ├── sitemap.ts / robots.ts
    │   └── opengraph-image.tsx
    ├── components/
    │   ├── ui/                   # shadcn-style primitives (Button, Input, etc.)
    │   ├── layout/               # Site header, footer, logo, theme toggle
    │   └── marketing/            # Hero, FeatureGrid, ContactForm, WaitlistForm…
    ├── data/                     # Content sources (modules, nav, pricing, faq)
    ├── hooks/                    # use-mounted, use-prefers-reduced-motion
    ├── lib/                      # prisma, resend, validation, seo, rate-limit, supabase
    ├── styles/globals.css        # Design tokens + utilities
    └── types/index.ts
```

---

## Design system

Brand palette is taken from the official logo gradient:

```
#fa66c6 (pink) → #d568d2 → #a76be2 → #836dee → #696ff7 → #5970fc → #5470fe (blue)
#00092d (deep navy — used as dark-mode surface)
```

Used as **accents only** — gradient text, primary CTA fill, hero glow, module accents. Backgrounds stay neutral (light: `#fafbff`-ish; dark: `#00092d`-derived) so the brand stays premium and meets WCAG contrast.

Open `src/styles/globals.css` for the full token map and `tailwind.config.ts` for the typography and animation scale.

---

## Conversion path

Every page funnels to the **waitlist**:

- Hero contains the form inline (`/#waitlist`).
- Sticky header has a persistent "Join the waitlist" CTA.
- Inner pages close with the shared `<CtaBanner />`.
- `/pricing` swaps "Buy" for "Reserve my seat".
- `/signup` is currently a waitlist confirmation in disguise (it POSTs to `/api/waitlist`). Replace with a Supabase signup once the platform is live.

---

## API contracts

### `POST /api/waitlist`

```jsonc
// Request
{
  "email": "alex@company.com",
  "fullName": "Alex Mensah",         // optional
  "role": "MANAGER",                  // optional enum
  "organization": "Hartwell NHS",    // optional
  "consent": true,                    // required
  "source": "/"                       // optional, captured from window.location
}
// Success
{ "ok": true }
// Failure
{ "error": "Enter a valid email address." }
```

Validation: `src/lib/validation.ts` · Rate limit: 5 req/min/IP.

### `POST /api/contact`

```jsonc
{ "fullName": "...", "email": "...", "topic": "SALES", "company": "...", "message": "..." }
```

Rate limit: 4 req/min/IP.

### `POST /api/newsletter`

```jsonc
{ "email": "...", "source": "/blog" }
```

Rate limit: 6 req/min/IP.

---

## Deployment (Vercel)

1. **Connect the repo** in Vercel → Import Project → pick this repo.
2. **Set environment variables** (see `.env.example`):
   - `NEXT_PUBLIC_SITE_URL` — production URL (e.g. `https://shifted.ai`)
   - `DATABASE_URL` + `DIRECT_URL` — your Postgres connection strings
   - `RESEND_API_KEY`, `RESEND_FROM_EMAIL`, `RESEND_ADMIN_EMAIL`
   - `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY` (only required when auth lands)
3. **Build command:** `npm run build` (default).
4. **Output:** Next.js auto-detected, no overrides needed.
5. **Domain:** point your apex + `www` records at Vercel's IPs/CNAME as instructed.
6. **Run database migration once:** in your local environment with the production `DATABASE_URL` set, run `npm run db:push` (or use `prisma migrate deploy` once you commit a migration set).
7. **Verify** `/sitemap.xml` and `/opengraph-image.png` resolve.

---

## What's next (platform phase)

When you're ready to ship the actual product, build on top of this scaffold:

- **Auth** — replace the `TODO(auth-phase)` calls in `(auth)/login/page.tsx` and `(auth)/signup/page.tsx` with real Supabase `signInWithOtp` / `signUp` flows; wire the cookie session via `src/lib/supabase/server.ts` and add a Next.js middleware to gate `/dashboard`.
- **Dashboard** — build under `src/app/dashboard/`. The Prisma schema in this repo already covers users, teams, memberships, subscriptions, activity logs and notifications.
- **Billing** — integrate Stripe Checkout, swap the waitlist CTA on `/pricing` to a `subscription.create` flow, and ship the `/api/billing/webhook` handler. Schema already has `Subscription`.
- **Admin** — `/admin` route group guarded by `UserRole === ADMIN`. Surface waitlist entries, contact submissions, and content moderation.
- **CMS** — swap `src/data/posts.ts` for MDX (`@next/mdx` or `fumadocs`) or a headless CMS (Sanity / Contentful).

The component primitives, design tokens, and SEO helpers already in place will absorb all of this without restructuring.
