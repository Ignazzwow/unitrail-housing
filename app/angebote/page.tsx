"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Bed, Bath, Square, Euro, Calendar, Users } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { getListings } from "@/lib/listings-data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function AngebotePage() {
  const { t } = useLanguage()

  const listings = getListings(t)

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Header */}
          <div className="mb-12 text-center">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {t("listings.title")}
            </h1>
            <p className="mx-auto max-w-2xl text-lg text-muted-foreground">
              {t("listings.description")}
            </p>
          </div>

          {/* Listings Grid */}
          <div className="grid gap-8 md:grid-cols-2">
            {listings.map((listing) => (
              <Card key={listing.id} className="overflow-hidden border-border bg-card transition-shadow hover:shadow-lg">
                {/* Image Carousel */}
                <div className="relative h-48 w-full overflow-hidden">
                  <Carousel className="w-full">
                    <CarouselContent>
                      {listing.images.map((image, index) => (
                        <CarouselItem key={index}>
                          <div className="relative h-48 w-full">
                            <Image
                              src={image}
                              alt={`${listing.title} - Bild ${index + 1}`}
                              fill
                              className="object-cover"
                              loading={index === 0 ? "lazy" : undefined}
                            />
                          </div>
                        </CarouselItem>
                      ))}
                    </CarouselContent>
                    {listing.images.length > 1 && (
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
                      <CardTitle className="mb-2 text-xl text-card-foreground">{listing.title}</CardTitle>
                      <div className="flex items-center gap-1 text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4" />
                        <span>{listing.location}</span>
                      </div>
                    </div>
                    <div className="text-right">
                      <div className="flex items-baseline gap-1">
                        <span className="text-2xl font-bold text-primary">{listing.price}</span>
                        <span className="text-sm text-muted-foreground">€</span>
                      </div>
                      <span className="text-xs text-muted-foreground">{t("listings.perMonth")}</span>
                    </div>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  {/* Property Details */}
                  <div className="grid grid-cols-2 gap-4 border-t border-border pt-4">
                    <div className="flex items-center gap-2">
                      <Square className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {listing.totalSize} m² {t("listings.totalSize")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bed className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {listing.sharedRoom ? t("listings.sharedRoom") : `${listing.rooms} ${t("listings.rooms")}`}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Bath className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {listing.bathrooms} {t("listings.bathrooms")}
                      </span>
                    </div>
                    <div className="flex items-center gap-2">
                      <Calendar className="h-4 w-4 text-muted-foreground" />
                      <span className="text-sm text-muted-foreground">
                        {listing.availableFrom}
                      </span>
                    </div>
                  </div>

                  {/* Features */}
                  <div className="border-t border-border pt-4">
                    <h4 className="mb-2 text-sm font-semibold text-foreground">{t("listings.featuresTitle")}</h4>
                    <ul className="flex flex-wrap gap-2">
                      {listing.features.map((feature, index) => (
                        <li
                          key={index}
                          className="rounded-md bg-primary/10 px-2 py-1 text-xs text-primary"
                        >
                          {feature}
                        </li>
                      ))}
                    </ul>
                  </div>

                  {/* CTA Buttons */}
                  <div className="space-y-2">
                    <Button className="w-full" variant="outline" asChild>
                      <Link href={`/angebote/${listing.id}`}>
                        {t("listings.viewButton") || "Ansehen"}
                      </Link>
                    </Button>
                    <Button className="w-full" asChild>
                      <Link href={`/angebote/${listing.id}/anfrage`}>{t("listings.contactButton")}</Link>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}

