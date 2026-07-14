import { NextRequest, NextResponse } from "next/server"
import { z } from "zod"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"

const CATEGORIES = ["student", "landlord"] as const

const settingsSchema = z.object({
  student: z.string().email("Invalid email").max(254),
  landlord: z.string().email("Invalid email").max(254),
})

// ADMIN: GET /api/admin/settings/notifications
export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const rows = await prisma.notificationSetting.findMany({
    where: { category: { in: [...CATEGORIES] } },
  })
  const byCategory = Object.fromEntries(rows.map((r) => [r.category, r.email]))

  return NextResponse.json({
    student: byCategory.student ?? process.env.ADMIN_NOTIFICATION_EMAIL ?? process.env.ADMIN_EMAIL ?? "info@unitrail-housing.de",
    landlord: byCategory.landlord ?? process.env.LANDLORD_INQUIRY_EMAIL ?? "vermieten@unitrail-housing.de",
    configured: {
      student: Boolean(byCategory.student),
      landlord: Boolean(byCategory.landlord),
    },
  })
}

// ADMIN: PUT /api/admin/settings/notifications
export async function PUT(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const body = await request.json()
  const parsed = settingsSchema.safeParse(body)
  if (!parsed.success) {
    return NextResponse.json({ error: "Validation failed", details: parsed.error.flatten() }, { status: 400 })
  }

  const { student, landlord } = parsed.data
  await Promise.all([
    prisma.notificationSetting.upsert({
      where: { category: "student" },
      update: { email: student },
      create: { category: "student", email: student },
    }),
    prisma.notificationSetting.upsert({
      where: { category: "landlord" },
      update: { email: landlord },
      create: { category: "landlord", email: landlord },
    }),
  ])

  return NextResponse.json({ success: true })
}