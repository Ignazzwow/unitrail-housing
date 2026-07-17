import { NextRequest, NextResponse } from "next/server"
import { del } from "@vercel/blob"
import { prisma } from "@/lib/db"
import { requireAdmin } from "@/lib/auth-utils"

async function checkAuth() {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }
}

// ADMIN: GET /api/admin/properties/:id
export async function GET(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAuth()
  if (auth) return auth

  const { id } = await params
  const property = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      propertyAmenities: { include: { amenity: true } },
    },
  })
  if (!property) return NextResponse.json({ error: "Property not found" }, { status: 404 })
  return NextResponse.json(property)
}

// ADMIN: PUT /api/admin/properties/:id
export async function PUT(
  request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAuth()
  if (auth) return auth

  const { id } = await params
  const body = await request.json()

  const data: Record<string, unknown> = {}
  if (body.title != null) data.title = body.title
  if (body.slug != null) data.slug = body.slug
  if (body.description != null) data.description = body.description
  if (body.descriptionEn != null) data.descriptionEn = body.descriptionEn
  if (body.detailedDescription != null) data.detailedDescription = body.detailedDescription
  if (body.detailedDescriptionEn != null) data.detailedDescriptionEn = body.detailedDescriptionEn
  if (body.additionalInfo != null) data.additionalInfo = body.additionalInfo
  if (body.additionalInfoEn != null) data.additionalInfoEn = body.additionalInfoEn
  if (body.propertyType != null) data.propertyType = body.propertyType
  if (body.listingType != null) data.listingType = body.listingType
  if (body.price != null) data.price = parseFloat(body.price)
  if (body.currency != null) data.currency = body.currency
  if (body.location != null) data.location = body.location
  if (body.address != null) data.address = body.address
  if (body.latitude != null) data.latitude = parseFloat(body.latitude)
  if (body.longitude != null) data.longitude = parseFloat(body.longitude)
  if (body.bedrooms != null) data.bedrooms = parseInt(body.bedrooms, 10)
  if (body.bathrooms != null) data.bathrooms = parseInt(body.bathrooms, 10)
  if (body.roomOccupants != null) {
    const n = parseInt(String(body.roomOccupants), 10)
    data.roomOccupants = Number.isFinite(n) && n >= 1 ? Math.min(3, Math.round(n)) : 1
  }
  if (body.areaSqft != null) data.areaSqft = parseFloat(body.areaSqft)
  if (body.areaSqm != null) data.areaSqm = parseFloat(body.areaSqm)
  if (body.furnishing != null) data.furnishing = body.furnishing
  if (body.availabilityStatus != null) data.availabilityStatus = body.availabilityStatus
  if (body.isFeatured != null) data.isFeatured = Boolean(body.isFeatured)
  if (body.isActive != null) data.isActive = Boolean(body.isActive)
  if (body.deposit != null) data.deposit = body.deposit
  if (body.minimumStay != null) data.minimumStay = body.minimumStay
  if (body.availableFrom != null) data.availableFrom = body.availableFrom

  const property = await prisma.property.update({
    where: { id },
    data,
    include: {
      images: true,
      propertyAmenities: { include: { amenity: true } },
    },
  })

  if (Array.isArray(body.images)) {
    await prisma.propertyImage.deleteMany({ where: { propertyId: id } })
    for (let i = 0; i < body.images.length; i++) {
      await prisma.propertyImage.create({
        data: { propertyId: id, imageUrl: body.images[i], displayOrder: i },
      })
    }
  }
  if (Array.isArray(body.amenityIds)) {
    await prisma.propertyAmenity.deleteMany({ where: { propertyId: id } })
    for (const amenityId of body.amenityIds) {
      await prisma.propertyAmenity.create({
        data: { propertyId: id, amenityId },
      })
    }
  }

  const updated = await prisma.property.findUnique({
    where: { id },
    include: {
      images: { orderBy: { displayOrder: "asc" } },
      propertyAmenities: { include: { amenity: true } },
    },
  })
  return NextResponse.json(updated)
}

// ADMIN: DELETE /api/admin/properties/:id (hard delete)
export async function DELETE(
  _request: NextRequest,
  { params }: { params: Promise<{ id: string }> }
) {
  const auth = await checkAuth()
  if (auth) return auth

  const { id } = await params

  const images = await prisma.propertyImage.findMany({ where: { propertyId: id } })
  await prisma.property.delete({ where: { id } })

  await Promise.all(
    images.map((image) =>
      del(image.imageUrl, { token: process.env.BLOB_READ_WRITE_TOKEN }).catch((error) =>
        console.error("[properties] Failed to delete blob:", error)
      )
    )
  )

  return NextResponse.json({ success: true })
}
