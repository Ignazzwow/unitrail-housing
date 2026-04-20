/**
 * Create first admin user. Run: npx tsx scripts/create-admin.ts
 * Optional env: ADMIN_EMAIL, ADMIN_PASSWORD, ADMIN_NAME
 */
import bcrypt from "bcryptjs"
import { prisma } from "../lib/db"

async function main() {
  const email = process.env.ADMIN_EMAIL || "admin@unitrail.in"
  const password = process.env.ADMIN_PASSWORD || "admin123"
  const name = process.env.ADMIN_NAME || "Admin"

  const existing = await prisma.adminUser.findUnique({ where: { email } })

  if (existing) {
    if (process.env.ADMIN_UPDATE_PASSWORD === "1") {
      const passwordHash = await bcrypt.hash(password, 12)
      await prisma.adminUser.update({
        where: { email },
        data: { passwordHash },
      })
      console.log("Password updated for:", email)
      return
    }
    console.log("Admin already exists:", email)
    console.log("Set ADMIN_UPDATE_PASSWORD=1 to reset the password.")
    return
  }

  const passwordHash = await bcrypt.hash(password, 12)
  await prisma.adminUser.create({
    data: {
      email,
      name,
      passwordHash,
      role: "super_admin",
    },
  })
  console.log("Admin created:", email, "| Password:", password)
  console.log("⚠️  Change the password immediately in production!")
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
