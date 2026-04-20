import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"

// ADMIN: GET /api/admin/inquiries - List inquiries with filters
export async function GET(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") ?? "1", 10)
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "20", 10), 100)
    const skip = (page - 1) * limit
    const status = searchParams.get("status") ?? undefined
    const propertyId = searchParams.get("property_id") ?? undefined

    const where: Record<string, unknown> = {}
    if (status) (where as { status?: string }).status = status
    if (propertyId) (where as { propertyId?: string }).propertyId = propertyId

    const [inquiries, total] = await Promise.all([
      prisma.inquiry.findMany({
        where,
        include: { property: { select: { id: true, title: true, slug: true } } },
        orderBy: { createdAt: "desc" },
        skip,
        take: limit,
      }),
      prisma.inquiry.count({ where }),
    ])

    return NextResponse.json({
      inquiries,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("Failed to fetch inquiries:", error)
    return NextResponse.json({ error: "Failed to fetch inquiries" }, { status: 500 })
  }
}
