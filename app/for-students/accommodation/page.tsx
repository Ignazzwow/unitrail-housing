import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListings } from "@/lib/listings-data"
import { serializePropertiesForClient } from "@/lib/listing-types"
import { StudentsAccommodationClient } from "@/components/students-accommodation-client"

export const metadata = {
  title: "Accommodation for Students - UniTrail Housing",
  description: "Browse verified student accommodation. Safe, affordable properties near universities.",
}

export const dynamic = "force-dynamic"

export default async function AccommodationPage() {
  const listings = await getListings()

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <StudentsAccommodationClient listings={serializePropertiesForClient(listings)} />
        <Footer />
      </div>
    </main>
  )
}
