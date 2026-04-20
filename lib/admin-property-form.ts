import type { Prisma } from "@prisma/client"

export type PropertyWithRelations = Prisma.PropertyGetPayload<{
  include: { images: true; propertyAmenities: { include: { amenity: true } } }
}>

/**
 * Maps Prisma property → shape expected by PropertyFormTabs (null-safe, client-serializable).
 */
export function toPropertyFormData(property: PropertyWithRelations) {
  return {
    id: property.id,
    slug: property.slug,
    title: property.title,
    location: property.location,
    price: property.price,
    bedrooms: property.bedrooms,
    bathrooms: property.bathrooms,
    areaSqm: property.areaSqm,
    description: property.description,
    detailedDescription: property.detailedDescription,
    propertyType: property.propertyType,
    listingType: property.listingType,
    address: property.address,
    furnishing: property.furnishing,
    availabilityStatus: property.availabilityStatus,
    isFeatured: property.isFeatured,
    isActive: property.isActive,
    deposit: property.deposit,
    minimumStay: property.minimumStay,
    availableFrom: property.availableFrom,
    images: property.images.map((i) => ({ imageUrl: i.imageUrl })),
    propertyAmenities: property.propertyAmenities.map((pa) => ({
      amenity: { id: pa.amenity.id },
    })),
  }
}
