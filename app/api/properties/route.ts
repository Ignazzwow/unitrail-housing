import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"

export const dynamic = "force-dynamic"

// PUBLIC: GET /api/properties - List properties with filters & pagination
export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const page = parseInt(searchParams.get("page") ?? "1", 10)
    const limit = Math.min(parseInt(searchParams.get("limit") ?? "12", 10), 50)
    const skip = (page - 1) * limit
    const location = searchParams.get("location") ?? undefined
    const propertyType = searchParams.get("property_type") ?? undefined
    const listingType = searchParams.get("listing_type") ?? undefined
    const minPrice = searchParams.get("min_price") ? parseFloat(searchParams.get("min_price")!) : undefined
    const maxPrice = searchParams.get("max_price") ? parseFloat(searchParams.get("max_price")!) : undefined
    const bedrooms = searchParams.get("bedrooms") ? parseInt(searchParams.get("bedrooms")!, 10) : undefined
    const featured = searchParams.get("featured") === "true"

    const where: Record<string, unknown> = {
      isActive: true,
      availabilityStatus: "available",
    }
    if (location) {
      where.location = { contains: location }
    }
    if (propertyType) where.propertyType = propertyType
    if (listingType) where.listingType = listingType
    if (minPrice != null || maxPrice != null) {
      where.price = {}
      if (minPrice != null) (where.price as { gte?: number }).gte = minPrice
      if (maxPrice != null) (where.price as { lte?: number }).lte = maxPrice
    }
    if (bedrooms != null) where.bedrooms = bedrooms
    if (featured) where.isFeatured = true

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: { orderBy: { displayOrder: "asc" } },
          propertyAmenities: { include: { amenity: true } },
        },
        orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
        skip,
        take: limit,
      }),
      prisma.property.count({ where }),
    ])

    return NextResponse.json({
      properties,
      pagination: { page, limit, total, totalPages: Math.ceil(total / limit) },
    })
  } catch (error) {
    console.error("Failed to fetch properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}
