/**
 * Sync admin login from env vars. Used during production builds.
 * Set ADMIN_EMAIL and ADMIN_PASSWORD in your hosting provider.
 */
import { upsertAdminUser } from "../lib/upsert-admin-user"
import { prisma } from "../lib/db"

async function main() {
  const email = process.env.ADMIN_LOGIN_EMAIL || process.env.ADMIN_EMAIL
  const password = process.env.ADMIN_LOGIN_PASSWORD || process.env.ADMIN_PASSWORD

  if (!email?.trim() || !password) {
    console.log("[sync-admin] Skipped: ADMIN_LOGIN_EMAIL and ADMIN_LOGIN_PASSWORD not set.")
    return
  }

  const admin = await upsertAdminUser({
    email,
    password,
    name: process.env.ADMIN_NAME || "Admin",
    replaceOthers: true,
  })

  console.log("[sync-admin] Admin credentials synced for:", admin.email)
}

main()
  .catch((error) => {
    console.error("[sync-admin] Failed:", error)
    process.exit(1)
  })
  .finally(() => prisma.$disconnect())
