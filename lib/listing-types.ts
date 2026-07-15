import type { Property, PropertyImage, PropertyAmenity, Amenity } from "@prisma/client"

export type PropertyWithRelations = Property & {
  images?: PropertyImage[] | null
  propertyAmenities?: (PropertyAmenity & { amenity: Amenity | null })[] | null
}

/** Plain JSON-safe copy for Server → Client Component props. */
export function serializePropertyForClient(property: PropertyWithRelations): PropertyWithRelations {
  return JSON.parse(JSON.stringify(property)) as PropertyWithRelations
}

export function serializePropertiesForClient(
  properties: PropertyWithRelations[]
): PropertyWithRelations[] {
  return properties.map(serializePropertyForClient)
}

/** Prefer the English variant when active, falling back to the primary/German text if untranslated. */
function pickLang(primary: string, en: string | null | undefined, language: "de" | "en") {
  if (language === "en" && en?.trim()) return en
  return primary
}

// Helper to get display values from Prisma property
export function propertyToListingDisplay(p: PropertyWithRelations, language: "de" | "en" = "de") {
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
    description: pickLang(p.description, p.descriptionEn, language),
    detailedDescription: pickLang(p.detailedDescription ?? "", p.detailedDescriptionEn, language) || undefined,
    additionalInfo: pickLang(p.additionalInfo ?? "", p.additionalInfoEn, language) || undefined,
    address: p.address ?? undefined,
    deposit: p.deposit ?? undefined,
    minimumStay: p.minimumStay ?? undefined,
    furnishing: p.furnishing,
    propertyType: p.propertyType,
    availabilityStatus: p.availabilityStatus,
    sharedRoom: p.listingType === "pg" || (p.listingType === "student_housing" && p.bedrooms > 1),
  }
}
