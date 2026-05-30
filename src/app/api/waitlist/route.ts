import { NextResponse } from "next/server";

import { waitlistSchema } from "@/lib/validation";
import { hit, ipFromRequest } from "@/lib/rate-limit";
import { sendWaitlistConfirmation } from "@/lib/resend";
import { databaseConfigured, prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/waitlist
 *
 * Validates → rate limits → persists → emails. We swallow Prisma errors
 * around unique-email collisions and treat them as success (idempotent) so the
 * UI doesn't punish people who clicked twice.
 */
export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = hit({ key: `${ip}:waitlist`, limit: 5, windowMs: 60_000 });
  if (!limit.ok) {
    return NextResponse.json(
      { error: "Too many requests. Try again in a minute." },
      { status: 429, headers: { "Retry-After": "60" } },
    );
  }

  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  const parsed = waitlistSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 },
    );
  }

  const data = parsed.data;

  // Persist. Wrapped in try/catch so a missing or unreachable database doesn't
  // 500 the signup — we still send the confirmation email and log the failure.
  if (databaseConfigured()) {
    try {
      await prisma.waitlistEntry.upsert({
        where: { email: data.email },
        create: {
          email: data.email,
          fullName: data.fullName || null,
          role: data.role ?? null,
          organization: data.organization || null,
          source: data.source ?? null,
          consent: data.consent,
        },
        update: {
          fullName: data.fullName || null,
          role: data.role ?? null,
          organization: data.organization || null,
        },
      });
    } catch (e) {
      console.error("waitlist:persist", e);
    }
  }

  // Best-effort confirmation email.
  const mail = await sendWaitlistConfirmation({
    to: data.email,
    fullName: data.fullName || undefined,
  });
  if (!mail.ok) console.error("waitlist:mail", mail.error);

  return NextResponse.json({ ok: true });
}
