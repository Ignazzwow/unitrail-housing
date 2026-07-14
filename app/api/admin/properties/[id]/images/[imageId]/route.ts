import { NextRequest, NextResponse } from "next/server"
import { del } from "@vercel/blob"
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

  const image = await prisma.propertyImage.findFirst({
    where: { id: imageId, propertyId },
  })
  if (!image) {
    return NextResponse.json({ success: true })
  }

  await prisma.propertyImage.delete({ where: { id: image.id } })

  try {
    await del(image.imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN })
  } catch (error) {
    console.error("[images] Failed to delete blob:", error)
  }

  return NextResponse.json({ success: true })
}
