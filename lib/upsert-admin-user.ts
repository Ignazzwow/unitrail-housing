import bcrypt from "bcryptjs"
import { prisma } from "./db"

type UpsertAdminInput = {
  email: string
  password: string
  name?: string
  role?: string
  replaceOthers?: boolean
}

export async function upsertAdminUser({
  email,
  password,
  name = "Admin",
  role = "super_admin",
  replaceOthers = true,
}: UpsertAdminInput) {
  const normalizedEmail = email.trim().toLowerCase()
  const passwordHash = await bcrypt.hash(password, 12)

  if (replaceOthers) {
    await prisma.adminUser.deleteMany({
      where: { email: { not: normalizedEmail } },
    })
  }

  const admin = await prisma.adminUser.upsert({
    where: { email: normalizedEmail },
    update: { name, passwordHash, role },
    create: {
      email: normalizedEmail,
      name,
      passwordHash,
      role,
    },
  })

  return admin
}
