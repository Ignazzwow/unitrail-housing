import { prisma } from "@/lib/db"

/** Parse free-text amenities (one per line or comma-separated). */
export function parseAmenityNames(input: unknown): string[] {
  if (Array.isArray(input)) {
    return input.map((n) => String(n).trim()).filter(Boolean)
  }
  if (typeof input !== "string") return []
  return input
    .split(/[\n,;]+/)
    .map((s) => s.trim())
    .filter(Boolean)
}

/** Replace all amenities on a property from a list of free-text names. */
export async function syncPropertyAmenities(propertyId: string, names: string[]) {
  await prisma.propertyAmenity.deleteMany({ where: { propertyId } })

  const unique = [...new Set(names.map((n) => n.trim()).filter(Boolean))]
  for (const name of unique) {
    const amenity = await prisma.amenity.upsert({
      where: { name },
      create: { name },
      update: {},
    })
    await prisma.propertyAmenity.create({
      data: { propertyId, amenityId: amenity.id },
    })
  }
}
