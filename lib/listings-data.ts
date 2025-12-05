import { Translations } from "./translations"

export interface Listing {
  id: number
  title: string
  location: string
  price: number
  totalSize: number
  rooms: number
  bathrooms: number
  availableFrom: string
  description: string
  detailedDescription?: string
  sharedRoom: boolean
  features: string[]
  images: string[]
  address?: string
  utilitiesIncluded?: boolean
  deposit?: number
  minimumStay?: string
}

export function getListings(t: (key: string) => string): Listing[] {
  return [
    {
      id: 1,
      title: t("listings.listing1.title"),
      location: t("listings.listing1.location"),
      price: 395,
      totalSize: 76,
      rooms: 1,
      bathrooms: 1,
      availableFrom: t("listings.listing1.availableFrom"),
      description: t("listings.listing1.description"),
      detailedDescription: t("listings.listing1.detailedDescription") || t("listings.listing1.description"),
      sharedRoom: true,
      features: [
        t("listings.features.heating"),
        t("listings.features.electricity"),
        t("listings.features.wifi"),
        t("listings.features.balcony"),
        t("listings.features.bed"),
        t("listings.features.desk"),
        t("listings.features.deskChair"),
        t("listings.features.wardrobe"),
        t("listings.features.sharedBathroom"),
        t("listings.features.sharedShower"),
        t("listings.features.sharedKitchen"),
        t("listings.features.oven"),
        t("listings.features.stove"),
        t("listings.features.refrigerator"),
        t("listings.features.freezer"),
        t("listings.features.washingMachine"),
      ],
      images: [
        "/cozy-student-bedroom.png",
        "/modern-student-apartment-living-room-with-study-ar.jpg",
        "/diverse-group-of-happy-international-students-smil.jpg",
      ],
      address: "Kobergerstraße, Nürnberg (Südstadt)",
      utilitiesIncluded: true,
      deposit: 790,
      minimumStay: "6 Monate",
    },
    {
      id: 2,
      title: t("listings.listing2.title"),
      location: t("listings.listing2.location"),
      price: 395,
      totalSize: 82,
      rooms: 1,
      bathrooms: 1,
      availableFrom: t("listings.listing2.availableFrom"),
      description: t("listings.listing2.description"),
      detailedDescription: t("listings.listing2.detailedDescription") || t("listings.listing2.description"),
      sharedRoom: true,
      features: [
        t("listings.features.heating"),
        t("listings.features.electricity"),
        t("listings.features.wifi"),
        t("listings.features.balcony"),
        t("listings.features.bed"),
        t("listings.features.desk"),
        t("listings.features.deskChair"),
        t("listings.features.wardrobe"),
        t("listings.features.sharedBathroom"),
        t("listings.features.sharedShower"),
        t("listings.features.sharedKitchen"),
        t("listings.features.oven"),
        t("listings.features.stove"),
        t("listings.features.refrigerator"),
        t("listings.features.freezer"),
        t("listings.features.washingMachine"),
      ],
      images: [
        "/modern-student-apartment-living-room-with-study-ar.jpg",
        "/cozy-student-bedroom.png",
        "/excited-student-holding-keys-to-new-apartment.jpg",
      ],
      address: "Kobergerstraße, Nürnberg (Südstadt)",
      utilitiesIncluded: true,
      deposit: 790,
      minimumStay: "6 Monate",
    },
  ]
}

export function getListingById(id: number, t: (key: string) => string): Listing | undefined {
  return getListings(t).find((listing) => listing.id === id)
}

