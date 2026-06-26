import { copyBundledSqliteToTmp, isVercelServerlessRuntime } from "./ensure-db-env"
import { upsertAdminUser } from "./upsert-admin-user"

let bootstrapPromise: Promise<void> | null = null

/**
 * On Vercel, copy bundled SQLite and sync admin credentials.
 * Never run `npx prisma` at runtime (serverless has no npm home).
 */
export function ensureProductionReady(): Promise<void> {
  if (!isVercelServerlessRuntime()) {
    return Promise.resolve()
  }

  if (!bootstrapPromise) {
    bootstrapPromise = bootstrapProductionDatabase().catch((error) => {
      console.error("[bootstrap] Non-fatal bootstrap failure:", error)
    })
  }

  return bootstrapPromise
}

async function bootstrapProductionDatabase() {
  const hasDb = copyBundledSqliteToTmp()
  if (!hasDb) return

  const email = process.env.ADMIN_LOGIN_EMAIL || process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_LOGIN_PASSWORD || process.env.ADMIN_PASSWORD

  if (!email?.trim() || !password) {
    console.warn("[bootstrap] ADMIN_LOGIN_EMAIL / ADMIN_LOGIN_PASSWORD not set")
    return
  }

  try {
    await upsertAdminUser({
      email,
      password,
      name: process.env.ADMIN_NAME || "Admin",
      replaceOthers: true,
    })
    console.log("[bootstrap] Admin synced for:", email.trim().toLowerCase())
  } catch (error) {
    console.error("[bootstrap] Admin upsert failed:", error)
  }
}
