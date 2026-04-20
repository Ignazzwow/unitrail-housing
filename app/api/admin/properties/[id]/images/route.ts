import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"

// ADMIN: POST /api/admin/properties/:id/images - Add image
export async function POST(
  request: NextRequest,
  context: { params: Promise<{ id: string }> }
) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  const { id: propertyId } = await context.params
  const body = await request.json()
  const { imageUrl, caption, displayOrder } = body

  const maxOrder = await prisma.propertyImage.aggregate({
    where: { propertyId },
    _max: { displayOrder: true },
  })
  const order = displayOrder ?? (maxOrder._max.displayOrder ?? -1) + 1

  const image = await prisma.propertyImage.create({
    data: {
      propertyId,
      imageUrl: imageUrl ?? "",
      caption: caption ?? "",
      displayOrder: order,
    },
  })
  return NextResponse.json(image)
}
