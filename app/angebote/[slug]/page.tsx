import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListingBySlugOrId } from "@/lib/listings-data"
import { ListingDetailClient } from "@/components/listing-detail-client"

export const dynamic = "force-dynamic"

export default async function ListingDetailPage({
  params,
}: {
  params: Promise<{ slug: string }>
}) {
  const { slug } = await params
  const listing = await getListingBySlugOrId(slug)

  if (!listing) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          <ListingDetailClient listing={listing} />
        </div>
        <Footer />
      </div>
    </main>
  )
}
