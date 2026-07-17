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

function parseFeatureLines(text: string | null | undefined): string[] {
  if (!text?.trim()) return []
  return text
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

// Helper to get display values from Prisma property
export function propertyToListingDisplay(p: PropertyWithRelations, language: "de" | "en" = "de") {
  const imageUrls = (p.images ?? [])
    .map((i) => (typeof i.imageUrl === "string" ? i.imageUrl.trim() : ""))
    .filter((url) => url.length > 0)

  const fromJoin = (p.propertyAmenities ?? [])
    .map((pa) => (pa.amenity?.name ? String(pa.amenity.name).trim() : ""))
    .filter((name) => name.length > 0)

  const amenitiesPrimary = p.amenitiesText?.trim()
    ? parseFeatureLines(p.amenitiesText)
    : fromJoin
  const amenitiesEn = parseFeatureLines(p.amenitiesTextEn)
  const featureNames =
    language === "en" && amenitiesEn.length > 0 ? amenitiesEn : amenitiesPrimary

  return {
    id: p.id,
    slug: p.slug,
    title: pickLang(p.title, p.titleEn, language),
    location: p.location,
    price: String(p.price),
    areaSqm: p.areaSqm ?? 0,
    bedrooms: p.bedrooms,
    bathrooms: p.bathrooms,
    roomOccupants: Math.min(3, Math.max(1, p.roomOccupants ?? 1)),
    availableFrom: p.availableFrom ?? "",
    images: imageUrls,
    features: featureNames,
    description: pickLang(p.description, p.descriptionEn, language),
    detailedDescription: pickLang(p.detailedDescription ?? "", p.detailedDescriptionEn, language) || undefined,
    additionalInfo: pickLang(p.additionalInfo ?? "", p.additionalInfoEn, language) || undefined,
    locationInfo: pickLang(p.locationInfo ?? "", p.locationInfoEn, language) || undefined,
    address: p.address ?? undefined,
    deposit: p.deposit ?? undefined,
    minimumStay: p.minimumStay ?? undefined,
    furnishing: p.furnishing,
    propertyType: p.propertyType,
    availabilityStatus: p.availabilityStatus,
    sharedRoom: (p.roomOccupants ?? 1) >= 2,
  }
}
