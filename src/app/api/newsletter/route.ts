import { NextResponse } from "next/server";

import { newsletterSchema } from "@/lib/validation";
import { hit, ipFromRequest } from "@/lib/rate-limit";
import { databaseConfigured, prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/newsletter
 *
 * Lightweight newsletter capture. Today we just persist; double opt-in via
 * Resend Audiences is the obvious next step.
 */
export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = hit({ key: `${ip}:newsletter`, limit: 6, windowMs: 60_000 });
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

  const parsed = newsletterSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 },
    );
  }

  if (databaseConfigured()) {
    try {
      await prisma.newsletterSubscriber.upsert({
        where: { email: parsed.data.email },
        create: { email: parsed.data.email, source: parsed.data.source ?? null },
        update: { source: parsed.data.source ?? null },
      });
    } catch (e) {
      console.error("newsletter:persist", e);
    }
  }

  return NextResponse.json({ ok: true });
}
