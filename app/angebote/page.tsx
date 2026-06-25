import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListings } from "@/lib/listings-data"
import { serializePropertiesForClient } from "@/lib/listing-types"
import { AngeboteListClient } from "@/components/angebote-list-client"
import { AngeboteFiltersSummary } from "@/components/angebote-filters-summary"
import { AngeboteNoResults } from "@/components/angebote-no-results"
import type { ListingsFilters } from "@/lib/listings-data"

export const dynamic = "force-dynamic"

export default async function AngebotePage({
  searchParams,
}: {
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>
}) {
  const params = await searchParams
  const filters: ListingsFilters = {}
  if (params?.location && typeof params.location === "string") filters.location = params.location
  if (params?.property_type && typeof params.property_type === "string") filters.propertyType = params.property_type
  if (params?.listing_type && typeof params.listing_type === "string") filters.listingType = params.listing_type
  const minP = params?.min_price ? parseFloat(String(params.min_price)) : NaN
  const maxP = params?.max_price ? parseFloat(String(params.max_price)) : NaN
  const beds = params?.bedrooms ? parseInt(String(params.bedrooms), 10) : NaN
  if (!isNaN(minP)) filters.minPrice = minP
  if (!isNaN(maxP)) filters.maxPrice = maxP
  if (!isNaN(beds)) filters.bedrooms = beds

  const hasFilters = Object.keys(filters).length > 0
  const listings = await getListings(hasFilters ? filters : undefined)

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-10 sm:py-16">
          <AngeboteFiltersSummary filters={filters} hasFilters={hasFilters} />
          {listings.length === 0 && hasFilters ? (
            <AngeboteNoResults />
          ) : (
            <AngeboteListClient listings={serializePropertiesForClient(listings)} />
          )}
        </div>
        <Footer />
      </div>
    </main>
  )
}
