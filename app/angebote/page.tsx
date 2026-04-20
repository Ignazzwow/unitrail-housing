import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListings } from "@/lib/listings-data"
import { AngeboteListClient } from "@/components/angebote-list-client"
import type { ListingsFilters } from "@/lib/listings-data"
import Link from "next/link"

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
        <div className="container mx-auto px-4 py-16">
          {hasFilters && (
            <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
              <span>Showing results for:</span>
              {filters.location && (
                <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">Location: {filters.location}</span>
              )}
              {filters.propertyType && (
                <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">Type: {filters.propertyType}</span>
              )}
              {filters.minPrice != null && (
                <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">Min: €{filters.minPrice}</span>
              )}
              {filters.maxPrice != null && (
                <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">Max: €{filters.maxPrice}</span>
              )}
              {filters.bedrooms != null && (
                <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">{filters.bedrooms}+ bedrooms</span>
              )}
              <Link href="/angebote" className="text-primary hover:underline ml-2">Clear filters</Link>
            </div>
          )}
          {listings.length === 0 && hasFilters ? (
            <div className="py-16 text-center">
              <p className="text-lg text-muted-foreground mb-4">No properties found matching your search.</p>
              <Link href="/angebote" className="text-primary hover:underline font-medium">View all listings</Link>
            </div>
          ) : (
            <AngeboteListClient listings={listings} />
          )}
        </div>
        <Footer />
      </div>
    </main>
  )
}
