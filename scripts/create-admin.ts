/**
 * Create first admin user. Run: npx tsx scripts/create-admin.ts
 * Optional env: ADMIN_LOGIN_EMAIL, ADMIN_LOGIN_PASSWORD, ADMIN_NAME
 */
import { upsertAdminUser } from "../lib/upsert-admin-user"
import { prisma } from "../lib/db"

async function main() {
  const email = process.env.ADMIN_LOGIN_EMAIL || process.env.ADMIN_EMAIL || "admin@unitrail.in"
  const password = process.env.ADMIN_LOGIN_PASSWORD || process.env.ADMIN_PASSWORD || "admin123"
  const name = process.env.ADMIN_NAME || "Admin"

  const existing = await prisma.adminUser.findUnique({
    where: { email: email.trim().toLowerCase() },
  })

  if (existing && process.env.ADMIN_UPDATE_PASSWORD !== "1") {
    console.log("Admin already exists:", email)
    console.log("Set ADMIN_UPDATE_PASSWORD=1 to reset the password.")
    return
  }

  const admin = await upsertAdminUser({
    email,
    password,
    name,
    replaceOthers: process.env.ADMIN_REPLACE_OTHERS === "1",
  })

  console.log(existing ? "Password updated for:" : "Admin created:", admin.email)
  console.log("⚠️  Change the password immediately in production!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
