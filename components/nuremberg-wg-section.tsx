import { getListings } from "@/lib/listings-data"
import { NurembergWgSectionClient } from "@/components/nuremberg-wg-section-client"

export async function NurembergWgSection() {
  const listings = await getListings()
  const nurembergListings = listings.filter((property) => {
    const location = (property.location ?? "").toLowerCase()
    return location.includes("nuremberg") || location.includes("nurnberg") || location.includes("nürnberg")
  })

  return <NurembergWgSectionClient listings={nurembergListings} />
}
