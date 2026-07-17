import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"
import { parseAmenityNames, syncPropertyAmenities } from "@/lib/amenities"

function clampRoomOccupants(value: unknown): number {
  const n = typeof value === "number" ? value : parseInt(String(value ?? "1"), 10)
  if (!Number.isFinite(n) || n < 1) return 1
  return Math.min(3, Math.round(n))
}

// ADMIN: GET /api/admin/properties - List all properties (with filters)
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
    const search = searchParams.get("search") ?? undefined
    const status = searchParams.get("status") ?? undefined
    const listingType = searchParams.get("listingType") ?? undefined
    const propertyType = searchParams.get("propertyType") ?? undefined
    const availabilityStatus = searchParams.get("availabilityStatus") ?? undefined

    const where: Record<string, unknown> = {}
    if (search) {
      where.OR = [
        { title: { contains: search } },
        { location: { contains: search } },
        { slug: { contains: search } },
      ]
    }
    if (status === "active") (where as { isActive?: boolean }).isActive = true
    if (status === "inactive") (where as { isActive?: boolean }).isActive = false
    if (availabilityStatus) (where as { availabilityStatus?: string }).availabilityStatus = availabilityStatus
    if (listingType) (where as { listingType?: string }).listingType = listingType
    if (propertyType) (where as { propertyType?: string }).propertyType = propertyType

    const [properties, total] = await Promise.all([
      prisma.property.findMany({
        where,
        include: {
          images: { orderBy: { displayOrder: "asc" } },
          propertyAmenities: { include: { amenity: true } },
        },
        orderBy: { createdAt: "desc" },
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
    console.error("Failed to fetch admin properties:", error)
    return NextResponse.json({ error: "Failed to fetch properties" }, { status: 500 })
  }
}

// ADMIN: POST /api/admin/properties - Create property
export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const body = await request.json()

    function slugify(text: string): string {
      return text
        .toLowerCase()
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/^-|-$/g, "")
    }

    const slug = body.slug || slugify(body.title || "property")
    const existing = await prisma.property.findUnique({ where: { slug } })
    const finalSlug = existing ? `${slug}-${Date.now().toString(36)}` : slug

    const property = await prisma.property.create({
      data: {
        slug: finalSlug,
        title: body.title ?? "Untitled",
        description: body.description ?? "",
        descriptionEn: body.descriptionEn ?? null,
        detailedDescription: body.detailedDescription ?? null,
        detailedDescriptionEn: body.detailedDescriptionEn ?? null,
        additionalInfo: body.additionalInfo ?? null,
        additionalInfoEn: body.additionalInfoEn ?? null,
        propertyType: body.propertyType ?? "apartment",
        listingType: body.listingType ?? "rent",
        price: parseFloat(body.price) || 0,
        currency: body.currency ?? "EUR",
        location: body.location ?? "",
        address: body.address ?? null,
        latitude: body.latitude != null ? parseFloat(body.latitude) : null,
        longitude: body.longitude != null ? parseFloat(body.longitude) : null,
        bedrooms: parseInt(body.bedrooms, 10) || 0,
        bathrooms: parseInt(body.bathrooms, 10) || 0,
        roomOccupants: clampRoomOccupants(body.roomOccupants),
        areaSqft: body.areaSqft != null ? parseFloat(body.areaSqft) : null,
        areaSqm: body.areaSqm != null ? parseFloat(body.areaSqm) : null,
        furnishing: body.furnishing ?? "unfurnished",
        availabilityStatus: body.availabilityStatus ?? "available",
        isFeatured: Boolean(body.isFeatured),
        isActive: body.isActive !== false,
        deposit: body.deposit ?? null,
        minimumStay: body.minimumStay ?? null,
        availableFrom: body.availableFrom ?? null,
      },
    })

    if (body.images?.length) {
      for (let i = 0; i < body.images.length; i++) {
        await prisma.propertyImage.create({
          data: {
            propertyId: property.id,
            imageUrl: body.images[i],
            displayOrder: i,
          },
        })
      }
    }

    if (body.amenityNames != null || body.amenitiesText != null) {
      const names = parseAmenityNames(body.amenityNames ?? body.amenitiesText)
      await syncPropertyAmenities(property.id, names)
    } else if (body.amenityIds?.length) {
      for (const amenityId of body.amenityIds) {
        await prisma.propertyAmenity.create({
          data: { propertyId: property.id, amenityId },
        })
      }
    }

    const full = await prisma.property.findUnique({
      where: { id: property.id },
      include: {
        images: true,
        propertyAmenities: { include: { amenity: true } },
      },
    })

    return NextResponse.json(full)
  } catch (error) {
    console.error("Failed to create property:", error)
    return NextResponse.json({ error: "Failed to create property" }, { status: 500 })
  }
}
