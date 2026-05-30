import { Resend } from "resend";

/**
 * Resend client + composable email helpers.
 *
 * The client is constructed lazily so missing env vars don't crash the build.
 * Every helper returns `{ ok, error }` so route handlers can branch cleanly.
 */

let _resend: Resend | null = null;
function getClient(): Resend | null {
  if (_resend) return _resend;
  const key = process.env.RESEND_API_KEY;
  if (!key) return null;
  _resend = new Resend(key);
  return _resend;
}

const FROM = process.env.RESEND_FROM_EMAIL ?? "ShiftED AI <hello@shifted.ai>";
const ADMIN = process.env.RESEND_ADMIN_EMAIL ?? "team@shifted.ai";

interface SendResult {
  ok: boolean;
  error?: string;
}

export async function sendWaitlistConfirmation(args: {
  to: string;
  fullName?: string;
}): Promise<SendResult> {
  const client = getClient();
  if (!client) {
    // Silently no-op in environments without Resend wired (eg. preview, CI).
    return { ok: true };
  }
  const greeting = args.fullName ? `Hi ${args.fullName.split(" ")[0]},` : "Hi,";
  try {
    await client.emails.send({
      from: FROM,
      to: args.to,
      subject: "You're on the ShiftED AI waitlist",
      text: `${greeting}\n\nThank you for joining the ShiftED AI waitlist. We're building a gym for the mind — a practice-based training platform that helps people develop the emotional skills their work demands. Empathy, difficult conversations and moral resilience, trained like any other skill.\n\nShiftED AI is not therapy. If you ever need professional support, Samaritans (116 123), NHS 24 (111) and Mind (0300 123 3393) are there 24/7.\n\nWe'll email you as soon as the platform goes live.\n\n— The ShiftED AI team\nhttps://shifted.ai`,
      html: confirmationHtml(greeting),
    });
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function sendTesterConfirmation(args: {
  to: string;
  fullName: string;
  importanceRating: number;
  wantsAtWork: string;
  biggestChallenge: string;
  company?: string;
}): Promise<SendResult> {
  const client = getClient();
  if (!client) return { ok: true };
  const first = args.fullName.split(" ")[0];
  try {
    await Promise.all([
      client.emails.send({
        from: FROM,
        to: args.to,
        subject: "Thanks for offering to test ShiftED AI",
        text: `Hi ${first},\n\nThank you for offering to help shape ShiftED AI as a tester. We'll be in touch shortly with next steps and a confidentiality note. In the meantime — we appreciate your input.\n\n— The ShiftED AI team`,
      }),
      client.emails.send({
        from: FROM,
        to: ADMIN,
        replyTo: args.to,
        subject: `[ShiftED AI] Tester application — ${args.fullName}`,
        text: `New tester application:\n\nName: ${args.fullName}\nEmail: ${args.to}\nCompany: ${args.company ?? "—"}\nImportance rating: ${args.importanceRating} / 5\n\nWould want at work:\n${args.wantsAtWork}\n\nBiggest challenge:\n${args.biggestChallenge}`,
      }),
    ]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

export async function sendContactNotifications(args: {
  fullName: string;
  email: string;
  topic: string;
  company?: string;
  message: string;
}): Promise<SendResult> {
  const client = getClient();
  if (!client) return { ok: true };
  try {
    await Promise.all([
      client.emails.send({
        from: FROM,
        to: ADMIN,
        replyTo: args.email,
        subject: `[ShiftED AI] ${args.topic} — ${args.fullName}`,
        text: `From: ${args.fullName} <${args.email}>\nCompany: ${args.company ?? "—"}\nTopic: ${args.topic}\n\n${args.message}`,
      }),
      client.emails.send({
        from: FROM,
        to: args.email,
        subject: "Thanks for getting in touch with ShiftED AI",
        text: `Hi ${args.fullName.split(" ")[0]},\n\nWe've received your message and will reply within 1 business day. If it's urgent, just reply to this email.\n\n— The ShiftED AI team`,
      }),
    ]);
    return { ok: true };
  } catch (e) {
    return { ok: false, error: (e as Error).message };
  }
}

function confirmationHtml(greeting: string): string {
  return `<!doctype html>
<html><body style="font-family:-apple-system,Segoe UI,Inter,Roboto,sans-serif;background:#f7f8fb;padding:32px;color:#0b1437;">
  <div style="max-width:520px;margin:0 auto;background:#fff;border-radius:16px;padding:32px;box-shadow:0 2px 24px rgba(15,23,42,0.06);">
    <div style="font-size:22px;font-weight:600;letter-spacing:-0.01em;margin-bottom:16px;">You're on the waitlist 🎉</div>
    <p style="line-height:1.6;">${greeting}</p>
    <p style="line-height:1.6;">Thank you for joining the <strong>ShiftED AI</strong> waitlist. We're building a gym for the mind — a practice-based training platform that helps people develop the emotional skills their work demands.</p>
    <p style="line-height:1.6;">We'll email you when the platform goes live.</p>
    <p style="line-height:1.6;font-size:12px;color:#6b7280;margin-top:24px;">ShiftED AI is not therapy. If you need professional support, Samaritans (116 123), NHS 24 (111) and Mind (0300 123 3393) are available 24/7.</p>
    <p style="line-height:1.6;color:#6b7280;font-size:13px;margin-top:32px;">— The ShiftED AI team</p>
  </div>
</body></html>`;
}
