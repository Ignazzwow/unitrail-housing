import type { Property, PropertyImage, PropertyAmenity, Amenity } from "@prisma/client"

export type PropertyWithRelations = Property & {
  images?: PropertyImage[] | null
  propertyAmenities?: (PropertyAmenity & { amenity: Amenity | null })[] | null
}

// Helper to get display values from Prisma property
export function propertyToListingDisplay(p: PropertyWithRelations) {
  const imageUrls = (p.images ?? [])
    .map((i) => (typeof i.imageUrl === "string" ? i.imageUrl.trim() : ""))
    .filter((url) => url.length > 0)
  const featureNames = (p.propertyAmenities ?? [])
    .map((pa) => (pa.amenity?.name ? String(pa.amenity.name).trim() : ""))
    .filter((name) => name.length > 0)

  return {
    id: p.id,
    slug: p.slug,
    title: p.title,
    location: p.location,
    price: String(p.price),
    areaSqm: p.areaSqm ?? 0,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    availableFrom: p.availableFrom ?? "",
    images: imageUrls,
    features: featureNames,
    description: p.description,
    detailedDescription: p.detailedDescription ?? undefined,
    address: p.address ?? undefined,
    deposit: p.deposit ?? undefined,
    minimumStay: p.minimumStay ?? undefined,
    sharedRoom: p.listingType === "pg" || (p.listingType === "student_housing" && p.bedrooms > 1),
  }
}
