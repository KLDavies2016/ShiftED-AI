# Database setup

The site captures four kinds of submissions:

| Form               | Prisma model          | Table name (in Postgres) |
| ------------------ | --------------------- | ------------------------ |
| Waitlist           | `WaitlistEntry`       | `WaitlistEntry`          |
| Tester application | `TesterApplication`   | `TesterApplication`      |
| Contact            | `ContactSubmission`   | `ContactSubmission`      |
| Newsletter        | `NewsletterSubscriber`| `NewsletterSubscriber`   |

The code is wired up — once you point `DATABASE_URL` at a real Postgres database, every submission gets saved automatically and the confirmation email still goes out as before.

We recommend **Supabase** because it's free, takes 5 minutes to set up, gives you a built-in browser UI to view the captured entries, and is the same provider we'll use for auth in the platform phase. (Neon and Vercel Postgres both work too — instructions identical except for where you copy the connection string from.)

---

## 1. Create a Supabase project

1. Go to **https://supabase.com** and sign up (use your Google account or email).
2. Click **New project**.
3. Fill in:
   - **Project name:** `shifted-ai` (or anything you like)
   - **Database password:** pick a strong password and save it somewhere safe — Supabase won't show it again
   - **Region:** pick the one closest to you (e.g. *London (eu-west-2)* for the UK)
   - **Plan:** **Free** is plenty for waitlist / tester capture
4. Click **Create new project**. Wait ~2 minutes while Supabase provisions Postgres.

## 2. Get the connection strings

When the project is ready:

1. In the Supabase dashboard, click **⚙️ Settings → Database**.
2. Scroll to **Connection string**.
3. You'll see two tabs we care about: **Transaction pooler** (used by serverless functions) and **Session pooler / Direct connection** (used for migrations).

Copy **two** strings:

- **`DATABASE_URL`** — use the **Transaction pooler** URI. It looks like:
  ```
  postgresql://postgres.xxxxx:[YOUR-PASSWORD]@aws-0-eu-west-2.pooler.supabase.com:6543/postgres
  ```
- **`DIRECT_URL`** — use the **Direct connection** URI. It looks like:
  ```
  postgresql://postgres:[YOUR-PASSWORD]@db.xxxxx.supabase.co:5432/postgres
  ```

Replace `[YOUR-PASSWORD]` in both strings with the password you set in step 1.

## 3. Add them to your local env file

Open `.env.local` in the project root (create it from `.env.example` if it doesn't exist) and add:

```env
DATABASE_URL="postgresql://postgres.xxxxx:YOUR-PASSWORD@aws-0-eu-west-2.pooler.supabase.com:6543/postgres"
DIRECT_URL="postgresql://postgres:YOUR-PASSWORD@db.xxxxx.supabase.co:5432/postgres"
```

> **Don't commit `.env.local`.** It's already in `.gitignore`. Never paste these strings into a public repo or Slack — they grant full database access.

## 4. Create the tables

In PowerShell, in the project root:

```powershell
npx prisma generate   # builds the Prisma client based on our schema
npx prisma db push    # creates the tables in Supabase from prisma/schema.prisma
```

You should see output ending with `🚀  Your database is now in sync with your Prisma schema.`

## 5. Restart the dev server

Stop the running `npm run dev` with **Ctrl + C**, then start it again:

```powershell
npm run dev
```

That's it. From this point on:

- Every waitlist submission writes a row into `WaitlistEntry`
- Every tester application writes a row into `TesterApplication`
- Every contact form submission writes into `ContactSubmission`
- Every newsletter signup writes into `NewsletterSubscriber`

## 6. View captured submissions

You have three ways to look at the data:

**Option A — Supabase Table Editor (easiest).** In the Supabase dashboard, click **Table Editor** in the left sidebar. You'll see your four tables. Click any of them to view rows, sort, filter, or export to CSV.

**Option B — Prisma Studio.** In PowerShell, run `npx prisma studio`. A browser tab opens with a polished UI for browsing and editing rows. Closer to a spreadsheet feel.

**Option C — SQL Editor.** In Supabase, click **SQL Editor**. You can run any query, e.g.:

```sql
select email, "fullName", "createdAt"
from "WaitlistEntry"
order by "createdAt" desc;
```

## 7. Deploy to Vercel later

When you deploy:

1. In Vercel → Project Settings → Environment Variables, add `DATABASE_URL` and `DIRECT_URL` with the same values.
2. Vercel runs `npm run build` which includes `prisma generate` automatically (we have it wired into the build).
3. If you change the Prisma schema later, run `npx prisma db push` locally first (against the production `DATABASE_URL`) — schema changes don't deploy through Vercel.

---

## Troubleshooting

**"Error: P1001: Can't reach database server"**
Usually a typo in the connection string or your IP isn't allowed yet. Supabase doesn't restrict IPs by default, but if you're behind a corporate proxy this can fail. Try connecting from a phone hotspot to isolate.

**"Error: P2002: Unique constraint failed"**
Means the same email submitted twice. Our code uses `upsert`, which should handle this — but if you see it, restart your dev server (Prisma client may be stale).

**Submissions go through but nothing appears in the DB.**
Check your `.env.local` is in the project root (not inside `src/`), check the connection string has the password substituted in, and check the terminal where `npm run dev` is running for any `waitlist:persist` or `tester:persist` errors — those tell you exactly what failed.

**Forms submit but no email arrives.**
That's a separate concern — see `RESEND_API_KEY` in `.env.example`. Email delivery is independent from database persistence; one can work without the other.
