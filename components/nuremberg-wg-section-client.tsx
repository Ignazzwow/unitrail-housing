"use client"

import Image from "next/image"
import Link from "next/link"
import { ArrowRight, MapPin } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import type { PropertyWithRelations } from "@/lib/listing-types"
import { propertyToListingDisplay } from "@/lib/listing-types"
import { Card, CardContent } from "@/components/ui/card"

export function NurembergWgSectionClient({ listings }: { listings: PropertyWithRelations[] }) {
  const { t } = useLanguage()

  if (listings.length === 0) return null

  return (
    <section className="bg-background py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mb-6 flex flex-wrap items-center justify-between gap-4">
          <h2 className="text-xl font-bold tracking-tight text-foreground sm:text-2xl md:text-3xl">
            {t("nurembergWg.title")}
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {listings.map((property) => {
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
                className="group overflow-hidden border-border/80 bg-card shadow-sm transition-all hover:-translate-y-0.5 hover:shadow-md"
              >
                <Link
                  href={`/angebote/${listing.slug}`}
                  className="block focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                >
                  <div className="relative h-44 w-full">
                    <Image
                      src={imageSrc}
                      alt={listing.title}
                      fill
                      className="object-cover transition-transform group-hover:scale-[1.02]"
                      sizes="(max-width: 1280px) 50vw, 25vw"
                    />
                  </div>
                  <CardContent className="space-y-2 p-3">
                    <p className="line-clamp-1 text-sm font-semibold text-foreground">{listing.title}</p>
                    <div className="flex min-w-0 items-center gap-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5 shrink-0 text-primary" />
                      <span className="truncate">{listing.location}</span>
                    </div>
                    <div className="flex items-center justify-between gap-2">
                      <p className="text-xs text-muted-foreground">
                        {formattedPrice} {t("listings.perMonth")}
                      </p>
                      <span
                        className="inline-flex h-7 w-7 items-center justify-center rounded-full border border-border text-foreground transition-colors group-hover:bg-primary group-hover:text-primary-foreground"
                        aria-hidden
                      >
                        <ArrowRight className="h-3.5 w-3.5" />
                      </span>
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
