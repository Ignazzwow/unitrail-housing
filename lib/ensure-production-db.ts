import { isVercelServerlessRuntime } from "./admin-env-auth"
import { upsertAdminUser } from "./upsert-admin-user"

let bootstrapPromise: Promise<void> | null = null

/**
 * On Vercel, defensively re-sync admin credentials from env vars before a DB
 * login lookup, in case they were rotated since the last deploy's build step.
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
  } catch (error) {
    console.error("[bootstrap] Admin upsert failed:", error)
  }
}
