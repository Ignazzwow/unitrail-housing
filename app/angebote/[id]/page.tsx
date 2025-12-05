"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Bed, Bath, Square, Calendar, ArrowLeft } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { getListingById } from "@/lib/listings-data"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"

export default function ListingDetailPage() {
  const { t } = useLanguage()
  const params = useParams()
  const id = parseInt(params?.id as string, 10)
  
  const listing = getListingById(id, t)
  
  if (!listing) {
    notFound()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <Link href="/angebote">
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("listings.backToListings") || "Zurück zu den Angeboten"}
            </Button>
          </Link>

          {/* Title and Price */}
          <div className="mb-8">
            <h1 className="mb-4 text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
              {listing.title}
            </h1>
            <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-muted-foreground">
                <MapPin className="h-5 w-5" />
                <span className="text-lg">{listing.location}</span>
              </div>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-bold text-primary">{listing.price}</span>
                <span className="text-muted-foreground">€</span>
                <span className="text-sm text-muted-foreground">{t("listings.perMonth")}</span>
              </div>
            </div>
          </div>

          {/* Image Carousel */}
          <div className="mb-8">
            <Carousel className="w-full">
              <CarouselContent>
                {listing.images.map((image, index) => (
                  <CarouselItem key={index}>
                    <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                      <Image
                        src={image}
                        alt={`${listing.title} - Bild ${index + 1}`}
                        fill
                        className="object-cover"
                        priority={index === 0}
                      />
                    </div>
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          </div>

          <div className="grid gap-8 lg:grid-cols-3">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Description */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  Beschreibung
                </h2>
                <p className="text-muted-foreground whitespace-pre-line">
                  {listing.detailedDescription || listing.description}
                </p>
              </section>

              {/* Property Details */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  {t("listings.propertyDetails") || "Objektangaben"}
                </h2>
                <div className="grid gap-4 sm:grid-cols-2">
                  <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                    <Square className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t("listings.totalSize") || "Gesamtfläche"}</p>
                      <p className="font-semibold text-foreground">{listing.totalSize} m²</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                    <Bed className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">
                        {listing.sharedRoom ? t("listings.roomType") || "Zimmertyp" : t("listings.rooms") || "Zimmer"}
                      </p>
                      <p className="font-semibold text-foreground">
                        {listing.sharedRoom ? t("listings.sharedRoom") : `${listing.rooms} ${t("listings.rooms")}`}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                    <Bath className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t("listings.bathrooms") || "Badezimmer"}</p>
                      <p className="font-semibold text-foreground">{listing.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                    <Calendar className="h-5 w-5 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t("listings.availableFrom") || "Verfügbar ab"}</p>
                      <p className="font-semibold text-foreground">{listing.availableFrom}</p>
                    </div>
                  </div>
                  {listing.address && (
                    <div className="flex items-center gap-3 rounded-lg border border-border p-4 sm:col-span-2">
                      <MapPin className="h-5 w-5 text-primary" />
                      <div>
                        <p className="text-sm text-muted-foreground">{t("listings.address") || "Adresse"}</p>
                        <p className="font-semibold text-foreground">{listing.address}</p>
                      </div>
                    </div>
                  )}
                  {listing.deposit && (
                    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">{t("listings.deposit") || "Kaution"}</p>
                        <p className="font-semibold text-foreground">{listing.deposit} €</p>
                      </div>
                    </div>
                  )}
                  {listing.minimumStay && (
                    <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                      <div>
                        <p className="text-sm text-muted-foreground">
                          {t("listings.minimumStay") || "Mindestmietdauer"}
                        </p>
                        <p className="font-semibold text-foreground">{listing.minimumStay}</p>
                      </div>
                    </div>
                  )}
                </div>
              </section>

              {/* Features */}
              <section>
                <h2 className="mb-4 text-2xl font-semibold text-foreground">
                  {t("listings.featuresTitle") || "Ausstattung"}
                </h2>
                <div className="flex flex-wrap gap-2">
                  {listing.features.map((feature, index) => (
                    <span
                      key={index}
                      className="rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary"
                    >
                      {feature}
                    </span>
                  ))}
                </div>
              </section>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-1">
              <div className="sticky top-24 rounded-lg border border-border bg-card p-6 space-y-4">
                <div className="text-center">
                  <div className="mb-2 flex items-baseline justify-center gap-1">
                    <span className="text-4xl font-bold text-primary">{listing.price}</span>
                    <span className="text-muted-foreground">€</span>
                  </div>
                  <span className="text-sm text-muted-foreground">{t("listings.perMonth")}</span>
                </div>
                <Button className="w-full" size="lg" asChild>
                  <Link href={`/angebote/${listing.id}/anfrage`}>{t("listings.contactButton")}</Link>
                </Button>
              </div>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}

