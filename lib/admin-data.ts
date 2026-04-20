import { prisma } from "./db"

export async function getAdminPropertyById(id: string) {
  try {
    return await prisma.property.findUnique({
      where: { id },
      include: {
        images: { orderBy: { displayOrder: "asc" } },
        propertyAmenities: { include: { amenity: true } },
      },
    })
  } catch (error) {
    console.error("[admin-data] getAdminPropertyById failed:", error)
    return null
  }
}
