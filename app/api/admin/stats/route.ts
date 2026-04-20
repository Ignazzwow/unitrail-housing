import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"
import { startOfDay, startOfWeek } from "date-fns"

export const dynamic = "force-dynamic"

export async function GET() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const now = new Date()
  const todayStart = startOfDay(now)
  const weekStart = startOfWeek(now, { weekStartsOn: 1 })

  try {
    const [
      totalActiveProperties,
      featuredCount,
      newInquiriesToday,
      newInquiriesThisWeek,
      recentInquiries,
      recentlyUpdatedProperties,
    ] = await Promise.all([
      prisma.property.count({ where: { isActive: true } }),
      prisma.property.count({ where: { isFeatured: true, isActive: true } }),
      prisma.inquiry.count({ where: { createdAt: { gte: todayStart } } }),
      prisma.inquiry.count({ where: { createdAt: { gte: weekStart } } }),
      prisma.inquiry.findMany({
        take: 5,
        orderBy: { createdAt: "desc" },
        include: { property: { select: { id: true, title: true, slug: true } } },
      }),
      prisma.property.findMany({
        take: 5,
        orderBy: { updatedAt: "desc" },
        include: { images: { take: 1 } },
      }),
    ])

    return NextResponse.json({
      totalActiveProperties,
      featuredCount,
      newInquiriesToday,
      newInquiriesThisWeek,
      recentInquiries,
      recentlyUpdatedProperties,
    })
  } catch (e) {
    console.error("[admin/stats]", e)
    return NextResponse.json({
      totalActiveProperties: 0,
      featuredCount: 0,
      newInquiriesToday: 0,
      newInquiriesThisWeek: 0,
      recentInquiries: [],
      recentlyUpdatedProperties: [],
    })
  }
}
