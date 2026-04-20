import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListingBySlugOrId } from "@/lib/listings-data"
import { InquiryForm } from "@/components/inquiry-form"

export const dynamic = "force-dynamic"

export default async function InquiryPage({
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
          <div className="mx-auto max-w-2xl">
            <h1 className="mb-2 text-3xl font-bold tracking-tight">
              Inquiry for: {listing.title}
            </h1>
            <p className="mb-8 text-muted-foreground">
              {listing.location} • {listing.price} €/month
            </p>
            <InquiryForm propertyId={listing.id} propertyTitle={listing.title} />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
