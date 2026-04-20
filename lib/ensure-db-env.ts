/**
 * Prisma reads DATABASE_URL when PrismaClient is constructed.
 * Use a path relative to prisma/schema.prisma so SQLite resolves correctly on all platforms.
 * See: https://www.prisma.io/docs/orm/reference/prisma-schema-reference#sqlite
 */
if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = "file:./dev.db"
}
