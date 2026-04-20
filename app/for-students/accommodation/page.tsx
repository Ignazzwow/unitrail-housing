import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { getListings } from "@/lib/listings-data"
import { AngeboteListClient } from "@/components/angebote-list-client"
import Link from "next/link"

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
        <section className="container mx-auto px-4 py-16">
          <div className="mb-8">
            <nav className="text-sm text-muted-foreground mb-4">
              <Link href="/" className="hover:text-primary">Home</Link>
              <span className="mx-2">/</span>
              <Link href="/for-students" className="hover:text-primary">For Students</Link>
              <span className="mx-2">/</span>
              <span className="text-foreground">Accommodation</span>
            </nav>
            <h1 className="text-4xl font-bold tracking-tight mb-2">Accommodation</h1>
            <p className="text-lg text-muted-foreground">
              Browse our verified student accommodation. All properties are checked for safety and quality.
            </p>
          </div>
          <AngeboteListClient listings={listings} hideHeader />
        </section>
        <Footer />
      </div>
    </main>
  )
}
