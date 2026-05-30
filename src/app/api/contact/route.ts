import { NextResponse } from "next/server";
import { createHash } from "node:crypto";

import { contactSchema } from "@/lib/validation";
import { hit, ipFromRequest } from "@/lib/rate-limit";
import { sendContactNotifications } from "@/lib/resend";
import { databaseConfigured, prisma } from "@/lib/prisma";

export const runtime = "nodejs";
export const dynamic = "force-dynamic";

/**
 * POST /api/contact
 *
 * Validated contact form. Echoes a confirmation to the submitter and
 * forwards a notification to the admin inbox.
 */
export async function POST(req: Request) {
  const ip = ipFromRequest(req);
  const limit = hit({ key: `${ip}:contact`, limit: 4, windowMs: 60_000 });
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

  const parsed = contactSchema.safeParse(body);
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
      await prisma.contactSubmission.create({
        data: {
          email: data.email,
          fullName: data.fullName,
          topic: data.topic,
          message: data.message,
          company: data.company || null,
          ipHash,
        },
      });
    } catch (e) {
      console.error("contact:persist", e);
    }
  }

  const mail = await sendContactNotifications({
    fullName: data.fullName,
    email: data.email,
    topic: data.topic,
    company: data.company || undefined,
    message: data.message,
  });
  if (!mail.ok) console.error("contact:mail", mail.error);

  return NextResponse.json({ ok: true });
}
