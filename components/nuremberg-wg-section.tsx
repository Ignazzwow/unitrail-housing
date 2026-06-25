import { getListings } from "@/lib/listings-data"
import { serializePropertiesForClient } from "@/lib/listing-types"
import { NurembergWgSectionClient } from "@/components/nuremberg-wg-section-client"

export async function NurembergWgSection() {
  const listings = await getListings()
  const nurembergListings = listings.filter((property) => {
    const location = (property.location ?? "").toLowerCase()
    return location.includes("nuremberg") || location.includes("nurnberg") || location.includes("nürnberg")
  })

  return (
    <NurembergWgSectionClient listings={serializePropertiesForClient(nurembergListings)} />
  )
}
