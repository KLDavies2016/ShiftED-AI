/**
 * Tiny rate limiter for API routes.
 *
 * Defaults to a per-process in-memory bucket — perfect for preview deploys and
 * single-region setups. Swap the `hit()` implementation for Upstash / Redis
 * before you scale horizontally.
 */
const buckets = new Map<string, { count: number; resetAt: number }>();

interface LimitOptions {
  /** Identifier — usually `ip:route`. */
  key: string;
  /** Max requests within the window. */
  limit: number;
  /** Window in milliseconds. */
  windowMs: number;
}

export interface LimitResult {
  ok: boolean;
  remaining: number;
  resetAt: number;
}

export function hit({ key, limit, windowMs }: LimitOptions): LimitResult {
  const now = Date.now();
  const entry = buckets.get(key);
  if (!entry || entry.resetAt < now) {
    const resetAt = now + windowMs;
    buckets.set(key, { count: 1, resetAt });
    return { ok: true, remaining: limit - 1, resetAt };
  }
  entry.count += 1;
  buckets.set(key, entry);
  if (entry.count > limit) {
    return { ok: false, remaining: 0, resetAt: entry.resetAt };
  }
  return { ok: true, remaining: limit - entry.count, resetAt: entry.resetAt };
}

/** Best-effort IP extractor for edge + node runtimes. */
export function ipFromRequest(req: Request): string {
  const fwd = req.headers.get("x-forwarded-for");
  if (fwd) return fwd.split(",")[0]!.trim();
  return req.headers.get("x-real-ip") ?? "0.0.0.0";
}
