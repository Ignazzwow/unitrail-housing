import { notFound } from "next/navigation"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListingBySlugOrId } from "@/lib/listings-data"
import { InquiryForm } from "@/components/inquiry-form"
import { InquiryFormHeader } from "@/components/inquiry-form-header"

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
            <InquiryFormHeader title={listing.title} location={listing.location} price={listing.price} />
            <InquiryForm propertyId={listing.id} propertyTitle={listing.title} />
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}
