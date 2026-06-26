import fs from "fs"
import path from "path"

export const RUNTIME_DB_PATH = "/tmp/unitrail-housing.db"

/** True inside Vercel serverless (not during the build/install phase). */
export function isVercelServerlessRuntime(): boolean {
  return process.env.VERCEL === "1" && Boolean(process.env.VERCEL_REGION)
}

/** Copy build-time SQLite into /tmp before Prisma connects. */
export function copyBundledSqliteToTmp(): boolean {
  if (!isVercelServerlessRuntime()) {
    return true
  }

  if (fs.existsSync(RUNTIME_DB_PATH)) {
    return true
  }

  const candidates = [
    path.join(process.cwd(), "data", "runtime.db"),
    path.join(process.cwd(), "public", "runtime-db.sqlite"),
    path.join(process.cwd(), "prisma", "prod.db"),
    path.join(process.cwd(), "prisma", "prisma", "prod.db"),
    path.join(process.cwd(), "prisma", "dev.db"),
  ]

  for (const source of candidates) {
    if (!fs.existsSync(source)) continue
    try {
      fs.copyFileSync(source, RUNTIME_DB_PATH)
      console.log("[sqlite] Copied database from", source, "to", RUNTIME_DB_PATH)
      return true
    } catch (error) {
      console.error("[sqlite] Failed to copy database from", source, error)
    }
  }

  console.warn("[sqlite] No bundled SQLite file found in deployment")
  return false
}

/**
 * Prisma reads DATABASE_URL when PrismaClient is constructed.
 * Use a path relative to prisma/schema.prisma so SQLite resolves correctly on all platforms.
 */
if (!process.env.DATABASE_URL?.trim()) {
  process.env.DATABASE_URL = "file:./dev.db"
}

// Vercel serverless: only /tmp is writable; copy bundled DB before PrismaClient connects.
if (isVercelServerlessRuntime()) {
  const copied = copyBundledSqliteToTmp()
  if (copied) {
    process.env.DATABASE_URL = `file:${RUNTIME_DB_PATH}`
  }
}
