import { PrismaClient } from "@prisma/client"
import bcrypt from "bcryptjs"

const prisma = new PrismaClient()

const defaultAmenities = [
  "WiFi",
  "Furnished",
  "Near University",
  "Kitchen",
  "Laundry",
  "Parking",
  "Balcony",
  "Lift",
  "Gym",
  "Study Room",
]

async function main() {
  for (const name of defaultAmenities) {
    await prisma.amenity.upsert({
      where: { name },
      create: { name },
      update: {},
    })
  }

  const adminCount = await prisma.adminUser.count()
  if (adminCount === 0) {
    const passwordHash = await bcrypt.hash("admin123", 12)
    await prisma.adminUser.create({
      data: {
        email: "admin@unitrail.in",
        name: "Admin",
        passwordHash,
        role: "super_admin",
      },
    })
    console.log("Admin created: admin@unitrail.in / admin123")
  }

  const propertyCount = await prisma.property.count()
  if (propertyCount === 0) {
    const amenityIds = (await prisma.amenity.findMany({ take: 5 })).map((a) => a.id)

    const p1 = await prisma.property.create({
      data: {
        slug: "cozy-room-berlin-mitte",
        title: "Cozy Room in City Center",
        description: "A cozy room in the heart of Berlin.",
        detailedDescription:
          "Spacious room with natural light, ideal for students. Walking distance to universities and public transport.",
        propertyType: "apartment",
        listingType: "student_housing",
        price: 450,
        currency: "EUR",
        location: "Berlin Mitte",
        address: "Alexanderplatz 1, 10178 Berlin",
        bedrooms: 1,
        bathrooms: 1,
        areaSqm: 25,
        furnishing: "furnished",
        availabilityStatus: "available",
        isFeatured: true,
        isActive: true,
        deposit: "900",
        minimumStay: "6 months",
        availableFrom: "2024-09-01",
      },
    })
    await prisma.propertyImage.create({
      data: {
        propertyId: p1.id,
        imageUrl: "/modern-student-apartment-living-room-with-study-ar.jpg",
        displayOrder: 0,
      },
    })
    for (const amenityId of amenityIds) {
      await prisma.propertyAmenity.create({
        data: { propertyId: p1.id, amenityId },
      })
    }

    const p2 = await prisma.property.create({
      data: {
        slug: "shared-apartment-munich-schwabing",
        title: "Shared Apartment near Campus",
        description: "Shared apartment in student-friendly neighborhood.",
        detailedDescription:
          "Large shared apartment with modern amenities. Great for students looking for community living.",
        propertyType: "apartment",
        listingType: "student_housing",
        price: 380,
        currency: "EUR",
        location: "Munich Schwabing",
        address: "Leopoldstraße 100, 80802 München",
        bedrooms: 3,
        bathrooms: 2,
        areaSqm: 80,
        furnishing: "furnished",
        availabilityStatus: "available",
        isFeatured: false,
        isActive: true,
        deposit: "1140",
        minimumStay: "3 months",
        availableFrom: "2024-08-15",
      },
    })
    await prisma.propertyImage.create({
      data: {
        propertyId: p2.id,
        imageUrl: "/cozy-student-bedroom.png",
        displayOrder: 0,
      },
    })
    for (const amenityId of amenityIds) {
      await prisma.propertyAmenity.create({
        data: { propertyId: p2.id, amenityId },
      })
    }
    console.log("Sample properties created")
  }
}

main()
  .catch(console.error)
  .finally(() => prisma.$disconnect())
