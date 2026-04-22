import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin, Star } from "lucide-react"
import { getListings } from "@/lib/listings-data"
import { propertyToListingDisplay } from "@/lib/listing-types"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"

export async function NurembergWgSection() {
  const listings = await getListings()
  const nurembergListings = listings.filter((property) => {
    const location = (property.location ?? "").toLowerCase()
    return location.includes("nuremberg") || location.includes("nurnberg") || location.includes("nürnberg")
  })

  if (nurembergListings.length === 0) return null

  return (
    <section className="bg-background py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex items-center justify-between gap-4">
          <h2 className="text-2xl font-bold tracking-tight text-foreground md:text-3xl">WG- Apartments in Nuremberg</h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {nurembergListings.map((property) => {
            const listing = propertyToListingDisplay(property)
            const imageSrc = listing.images[0] || "/placeholder.svg"
            const formattedPrice = new Intl.NumberFormat("de-DE", {
              style: "currency",
              currency: "EUR",
              maximumFractionDigits: 0,
            }).format(Number(listing.price) || 0)

            return (
              <Card
                key={listing.id}
                className="overflow-hidden border-border/80 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link href={`/angebote/${listing.slug}`} className="block">
                  <div className="relative h-44 w-full">
                    <Image src={imageSrc} alt={listing.title} fill className="object-cover" sizes="(max-width: 1280px) 50vw, 25vw" />
                  </div>
                  <CardContent className="space-y-2 p-3">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">{listing.title}</p>
                    <div className="flex items-center justify-between text-xs text-muted-foreground">
                      <span className="inline-flex items-center gap-1">
                        <MapPin className="h-3.5 w-3.5 text-primary" />
                        {listing.location}
                      </span>
                      <span className="inline-flex items-center gap-1">
                        <Star className="h-3.5 w-3.5 fill-accent text-accent" />
                        4.5
                      </span>
                    </div>
                    <div className="flex items-center justify-between">
                      <p className="text-xs text-muted-foreground">{formattedPrice} / month</p>
                      <Button
                        size="icon"
                        variant="ghost"
                        className="h-7 w-7 rounded-full border border-border text-foreground hover:bg-primary hover:text-primary-foreground"
                        aria-label={`Open ${listing.title}`}
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </Button>
                    </div>
                  </CardContent>
                </Link>
              </Card>
            )
          })}
        </div>
      </div>
    </section>
  )
}
