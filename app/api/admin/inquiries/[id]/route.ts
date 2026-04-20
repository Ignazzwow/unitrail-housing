import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"

// ADMIN: GET /api/admin/inquiries/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const inquiry = await prisma.inquiry.findUnique({
    where: { id },
    include: { property: true },
  })
  if (!inquiry) return NextResponse.json({ error: "Inquiry not found" }, { status: 404 })
  return NextResponse.json(inquiry)
}

// ADMIN: PUT /api/admin/inquiries/:id - Update status
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id } = await params
  const body = await request.json()
  const status = body.status

  if (!["new", "in_progress", "closed"].includes(status)) {
    return NextResponse.json({ error: "Invalid status" }, { status: 400 })
  }

  const inquiry = await prisma.inquiry.update({
    where: { id },
    data: { status },
  })
  return NextResponse.json(inquiry)
}
