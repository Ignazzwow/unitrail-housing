import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// PUBLIC: GET /api/properties/:slug_or_id - Single property by slug or id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ slugOrId: string }> }
) {
  try {
    const { slugOrId } = await params

    const property = await prisma.property.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
        isActive: true,
      },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        propertyAmenities: { include: { amenity: true } },
      },
    })

    if (!property) {
      return NextResponse.json({ error: "Property not found" }, { status: 404 })
    }

    return NextResponse.json(property)
  } catch (error) {
    console.error("Failed to fetch property:", error)
    return NextResponse.json({ error: "Failed to fetch property" }, { status: 500 })
  }
}
