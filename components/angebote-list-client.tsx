"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Bed, Bath, Square, Calendar } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import type { PropertyWithRelations } from "@/lib/listing-types"
import { propertyToListingDisplay } from "@/lib/listing-types"

export function AngeboteListClient({ listings, hideHeader }: { listings: PropertyWithRelations[]; hideHeader?: boolean }) {
  const { t } = useLanguage()

  return (
    <>
      {!hideHeader && (
        <div className="mb-12 text-center">
          <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("listings.title")}
          </h1>
          <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
            {t("listings.description")}
          </p>
        </div>
      )}
      <div className="grid gap-8 md:grid-cols-2">
        {listings.map((listing) => {
          const L = propertyToListingDisplay(listing)
          return (
          <Card key={listing.id} className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
            <div className="relative h-48 w-full overflow-hidden">
              <Carousel className="w-full">
                <CarouselContent>
                  {L.images.length > 0 ? (
                    L.images.map((image, index) => (
                      <CarouselItem key={index}>
                        <div className="relative h-48 w-full">
                          <Image
                            src={image}
                            alt={`${L.title} - Bild ${index + 1}`}
                            fill
                            className="object-cover"
                            loading={index === 0 ? "lazy" : undefined}
                          />
                        </div>
                      </CarouselItem>
                    ))
                  ) : (
                    <CarouselItem>
                      <div className="flex h-48 w-full items-center justify-center bg-muted text-muted-foreground">
                        No image
                      </div>
                    </CarouselItem>
                  )}
                </CarouselContent>
                {L.images.length > 1 && (
                  <>
                    <CarouselPrevious className="left-2 h-8 w-8" />
                    <CarouselNext className="right-2 h-8 w-8" />
                  </>
                )}
              </Carousel>
            </div>
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="mb-2 text-xl text-card-foreground">{L.title}</CardTitle>
                  <div className="flex items-center gap-1 text-sm text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    <span>{L.location}</span>
                  </div>
                </div>
                <div className="text-right">
                  <div className="flex items-baseline gap-1">
                    <span className="text-2xl font-bold text-primary">{L.price}</span>
                    <span className="text-sm text-muted-foreground">€</span>
                  </div>
                  <span className="text-xs text-muted-foreground">{t("listings.perMonth")}</span>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {L.areaSqm} m² {t("listings.totalSize")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {L.sharedRoom ? t("listings.sharedRoom") : `${L.bedrooms} ${t("listings.rooms")}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">
                    {L.bathrooms} {t("listings.bathrooms")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm text-muted-foreground">{L.availableFrom}</span>
                </div>
              </div>
              <div className="border-t border-border pt-4">
                <h4 className="mb-2 text-sm font-semibold text-foreground">{t("listings.featuresTitle")}</h4>
                <ul className="flex flex-wrap gap-2">
                  {L.features.map((feature, index) => (
                    <li key={index} className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary">
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
              <div className="space-y-2">
                <Button className="w-full" variant="outline" asChild>
                  <Link href={`/angebote/${listing.slug}`}>{t("listings.viewButton") || "Ansehen"}</Link>
                </Button>
                <Button className="w-full" asChild>
                  <Link href={`/angebote/${listing.slug}/anfrage`}>{t("listings.contactButton")}</Link>
                </Button>
              </div>
            </CardContent>
          </Card>
        )})}
      </div>
    </>
  )
}
