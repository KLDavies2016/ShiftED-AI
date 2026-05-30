import { PrismaClient } from "@prisma/client";

/**
 * Prisma client singleton.
 *
 * Next.js dev hot-reloads modules, which otherwise leaks `PrismaClient`
 * instances and exhausts the database connection pool. We cache the client
 * on `globalThis` in non-production environments to dodge that.
 *
 * The client lazily reads `DATABASE_URL` only when a query is executed —
 * importing this file is therefore safe even without the env var present.
 * Routes that use it should still wrap calls in try/catch so missing or
 * unreachable databases degrade gracefully (email still fires, log noted).
 */
const globalForPrisma = globalThis as unknown as {
  prisma?: PrismaClient;
};

export const prisma =
  globalForPrisma.prisma ??
  new PrismaClient({
    log:
      process.env.NODE_ENV === "development"
        ? ["error", "warn"]
        : ["error"],
  });

if (process.env.NODE_ENV !== "production") {
  globalForPrisma.prisma = prisma;
}

/** True when a DATABASE_URL is configured. Cheap pre-flight for routes. */
export const databaseConfigured = (): boolean =>
  Boolean(process.env.DATABASE_URL && process.env.DATABASE_URL.length > 10);
