import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { testerSchema } from "@/lib/validation";
import { hit, ipFromRequest } from "@/lib/rate-limit";
import { sendTesterConfirmation } from "@/lib/resend";
import { databaseConfigured, prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/tester
 *
 * Accepts a tester application from the /testing page. Validates the payload
 * (including the 1-5 importance rating), rate-limits per IP, persists via
 * Prisma when wired up, and triggers Resend to confirm receipt + notify
 * the admin inbox.
 */
export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = hit({ key: `${ip}:tester`, limit: 5, windowMs: 60_000 });
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

  const parsed = testerSchema.safeParse(body);
  if (!parsed.success) {
    return NextResponse.json(
      { error: parsed.error.issues[0]?.message ?? "Validation failed." },
      { status: 422 },
    );
  }

  const data = parsed.data;
  const ipHash = createHash("sha256").update(ip).digest("hex").slice(0, 16);

  if (databaseConfigured()) {
    try {
      await prisma.testerApplication.upsert({
        where: { email: data.email },
        create: {
          email: data.email,
          fullName: data.fullName,
          company: data.company || null,
          importanceRating: data.importanceRating,
          wantsAtWork: data.wantsAtWork,
          biggestChallenge: data.biggestChallenge,
          source: data.source ?? null,
          ipHash,
        },
        update: {
          fullName: data.fullName,
          company: data.company || null,
          importanceRating: data.importanceRating,
          wantsAtWork: data.wantsAtWork,
          biggestChallenge: data.biggestChallenge,
        },
      });
    } catch (e) {
      console.error("tester:persist", e);
    }
  }

  const mail = await sendTesterConfirmation({
    to: data.email,
    fullName: data.fullName,
    importanceRating: data.importanceRating,
    wantsAtWork: data.wantsAtWork,
    biggestChallenge: data.biggestChallenge,
    company: data.company || undefined,
  });
  if (!mail.ok) console.error("tester:mail", mail.error);

  return NextResponse.json({ ok: true });
}
