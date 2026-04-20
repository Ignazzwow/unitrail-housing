import { prisma } from "./db"

export interface ListingsFilters {
  location?: string
  propertyType?: string
  listingType?: string
  minPrice?: number
  maxPrice?: number
  bedrooms?: number
}

// Server-side helpers for listings (used by server components)
export async function getListings(filters?: ListingsFilters) {
  try {
    const where: Record<string, unknown> = {
      isActive: true,
      availabilityStatus: "available",
    }
    if (filters?.location) {
      where.location = { contains: filters.location }
    }
    if (filters?.propertyType) where.propertyType = filters.propertyType
    if (filters?.listingType) where.listingType = filters.listingType
    if (filters?.minPrice != null || filters?.maxPrice != null) {
      where.price = {}
      if (filters.minPrice != null) (where.price as { gte?: number }).gte = filters.minPrice
      if (filters.maxPrice != null) (where.price as { lte?: number }).lte = filters.maxPrice
    }
    if (filters?.bedrooms != null) where.bedrooms = { gte: filters.bedrooms }

    return await prisma.property.findMany({
      where,
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        propertyAmenities: { include: { amenity: true } },
      },
      orderBy: [{ isFeatured: "desc" }, { createdAt: "desc" }],
    })
  } catch (error) {
    console.error("[listings-data] getListings failed:", error)
    return []
  }
}

export async function getListingBySlugOrId(slugOrId: string) {
  try {
    return await prisma.property.findFirst({
      where: {
        OR: [{ slug: slugOrId }, { id: slugOrId }],
        isActive: true,
      },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        propertyAmenities: { include: { amenity: true } },
      },
    })
  } catch (error) {
    console.error("[listings-data] getListingBySlugOrId failed:", error)
    return null
  }
}
