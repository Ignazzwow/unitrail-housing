"use client"

import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { MapPin, Bed, Bath, Square, Calendar, ArrowLeft, Sofa, Building2, Info, CircleAlert } from "lucide-react"
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

export function ListingDetailClient({ listing }: { listing: PropertyWithRelations }) {
  const { t, language } = useLanguage()
  const L = propertyToListingDisplay(listing, language)

  const propertyTypeKey: Record<string, string> = {
    apartment: "heroSearch.typeFlat",
    house: "heroSearch.typeHouse",
    studio: "heroSearch.typeStudioApartment",
    pg: "heroSearch.typePg",
    student_housing: "heroSearch.typeWgFlats",
  }
  const furnishingKey: Record<string, string> = {
    furnished: "listings.furnished",
    semi: "listings.semiFurnished",
    unfurnished: "listings.unfurnished",
  }
  const availabilityKey: Record<string, string> = {
    reserved: "listings.statusReserved",
    rented: "listings.statusRented",
    sold: "listings.statusSold",
    upcoming: "listings.statusUpcoming",
  }
  const availabilityLabel = L.availabilityStatus !== "available" ? availabilityKey[L.availabilityStatus] : null

  return (
    <>
      <Link href="/angebote">
        <Button variant="ghost" className="mb-8">
          <ArrowLeft className="mr-2 h-4 w-4" />
          {t("listings.backToListings")}
        </Button>
      </Link>

      <div className="mb-8">
        {availabilityLabel && (
          <div className="mb-3 inline-flex items-center gap-1.5 rounded-md bg-destructive/10 px-2.5 py-1 text-sm font-medium text-destructive">
            <CircleAlert className="h-4 w-4" />
            {t(availabilityLabel)}
          </div>
        )}
        <h1 className="mb-4 break-words text-2xl font-bold tracking-tight text-foreground sm:text-3xl md:text-4xl lg:text-5xl">
          {L.title}
        </h1>
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
            <MapPin className="h-5 w-5 shrink-0" />
            <span className="text-base sm:text-lg">{L.location}</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-3xl font-bold text-primary">{L.price}</span>
            <span className="text-muted-foreground">€</span>
            <span className="text-sm text-muted-foreground">{t("listings.perMonth")}</span>
          </div>
        </div>
      </div>

      <div className="relative mb-8 overflow-hidden">
        <Carousel className="w-full">
          <CarouselContent>
            {L.images.length > 0 ? (
              L.images.map((image, index) => (
                <CarouselItem key={index}>
                  <div className="relative aspect-video w-full overflow-hidden rounded-lg">
                    <Image
                      src={image}
                      alt={`${L.title} - ${t("listings.imageLabel")} ${index + 1}`}
                      fill
                      className="object-cover"
                      priority={index === 0}
                    />
                  </div>
                </CarouselItem>
              ))
            ) : (
              <CarouselItem>
                <div className="flex aspect-video w-full items-center justify-center rounded-lg bg-muted text-muted-foreground">
                  {t("listings.noImage")}
                </div>
              </CarouselItem>
            )}
          </CarouselContent>
          <CarouselPrevious className="left-2 h-8 w-8" />
          <CarouselNext className="right-2 h-8 w-8" />
        </Carousel>
      </div>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="space-y-8 lg:col-span-2">
          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">{t("listings.descriptionTitle")}</h2>
            <p className="whitespace-pre-line text-muted-foreground">
              {L.detailedDescription || L.description || t("listings.noDescription")}
            </p>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              {t("listings.propertyDetails")}
            </h2>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <Square className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listings.totalSize")}</p>
                  <p className="font-semibold text-foreground">{L.areaSqm} m²</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <Bed className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">
                    {L.sharedRoom ? t("listings.roomType") : t("listings.rooms")}
                  </p>
                  <p className="font-semibold text-foreground">
                    {L.sharedRoom ? t("listings.sharedRoom") : `${L.bedrooms} ${t("listings.rooms")}`}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <Bath className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listings.bathrooms")}</p>
                  <p className="font-semibold text-foreground">{L.bathrooms}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <Calendar className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listings.availableFrom")}</p>
                  <p className="font-semibold text-foreground">{L.availableFrom}</p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <Building2 className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listings.propertyTypeLabel")}</p>
                  <p className="font-semibold text-foreground">
                    {t(propertyTypeKey[L.propertyType] ?? "heroSearch.typeFlat")}
                  </p>
                </div>
              </div>
              <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                <Sofa className="h-5 w-5 text-primary" />
                <div>
                  <p className="text-sm text-muted-foreground">{t("listings.furnishingLabel")}</p>
                  <p className="font-semibold text-foreground">
                    {t(furnishingKey[L.furnishing] ?? "listings.unfurnished")}
                  </p>
                </div>
              </div>
              {L.address && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-4 sm:col-span-2">
                  <MapPin className="h-5 w-5 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("listings.address")}</p>
                    <p className="font-semibold text-foreground">{listing.address}</p>
                  </div>
                </div>
              )}
              {L.deposit && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">{t("listings.deposit")}</p>
                    <p className="font-semibold text-foreground">{L.deposit} €</p>
                  </div>
                </div>
              )}
              {L.minimumStay && (
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <div>
                    <p className="text-sm text-muted-foreground">
                      {t("listings.minimumStay")}
                    </p>
                    <p className="font-semibold text-foreground">{L.minimumStay}</p>
                  </div>
                </div>
              )}
            </div>
          </section>

          <section>
            <h2 className="mb-4 text-2xl font-semibold text-foreground">
              {t("listings.featuresTitle")}
            </h2>
            {L.features.length > 0 ? (
              <div className="flex flex-wrap gap-2">
                {L.features.map((feature, index) => (
                  <span
                    key={index}
                    className="rounded-md bg-primary/10 px-3 py-1.5 text-sm text-primary"
                  >
                    {feature}
                  </span>
                ))}
              </div>
            ) : (
              <p className="text-sm text-muted-foreground">{t("listings.noFeatures")}</p>
            )}
          </section>

          {L.additionalInfo && (
            <section>
              <h2 className="mb-4 text-2xl font-semibold text-foreground">
                {t("listings.additionalInfoTitle")}
              </h2>
              <p className="whitespace-pre-line text-muted-foreground">{L.additionalInfo}</p>
            </section>
          )}
        </div>

        <div className="lg:col-span-1">
          <div className="lg:sticky lg:top-24 space-y-4 rounded-lg border border-border bg-card p-6">
            <div className="text-center">
              <div className="mb-2 flex items-baseline justify-center gap-1">
                <span className="text-4xl font-bold text-primary">{L.price}</span>
                <span className="text-muted-foreground">€</span>
              </div>
              <span className="text-sm text-muted-foreground">{t("listings.perMonth")}</span>
            </div>
            <Button className="w-full" size="lg" asChild>
              <Link href={`/angebote/${listing.slug}/anfrage`}>{t("listings.contactButton")}</Link>
            </Button>
          </div>
        </div>
      </div>
    </>
  )
}
