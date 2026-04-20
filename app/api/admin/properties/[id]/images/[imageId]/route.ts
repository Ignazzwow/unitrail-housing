import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"

// ADMIN: DELETE /api/admin/properties/:id/images/:imageId
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string; imageId: string }> }
) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: propertyId, imageId } = await params

  await prisma.propertyImage.deleteMany({
    where: { id: imageId, propertyId },
  })
  return NextResponse.json({ success: true })
}
