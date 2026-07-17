"use client"

import { useEffect, useRef, useState } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import {
  MapPin,
  Bed,
  Bath,
  Square,
  Calendar,
  ArrowLeft,
  Sofa,
  Building2,
  CircleAlert,
  Wallet,
  Clock,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { RoomOccupancyIcon } from "@/components/room-occupancy-icon"
import type { PropertyWithRelations } from "@/lib/listing-types"
import { propertyToListingDisplay } from "@/lib/listing-types"

export function ListingDetailClient({ listing }: { listing: PropertyWithRelations }) {
  const { t, language } = useLanguage()
  const L = propertyToListingDisplay(listing, language)
  const [descriptionExpanded, setDescriptionExpanded] = useState(false)
  const sidebarRef = useRef<HTMLDivElement>(null)
  const textRef = useRef<HTMLParagraphElement>(null)
  const [clampHeight, setClampHeight] = useState<number | null>(null)
  const [needsClamp, setNeedsClamp] = useState(false)

  useEffect(() => {
    const sidebarEl = sidebarRef.current
    const textEl = textRef.current
    if (!sidebarEl || !textEl) return

    const update = () => {
      const height = sidebarEl.getBoundingClientRect().height
      setClampHeight(height)
      // Measure the text's natural height against the sidebar height to decide if clamping is needed at all.
      const previousMaxHeight = textEl.style.maxHeight
      textEl.style.maxHeight = "none"
      const naturalHeight = textEl.scrollHeight
      textEl.style.maxHeight = previousMaxHeight
      setNeedsClamp(naturalHeight > height)
    }

    update()
    const observer = new ResizeObserver(update)
    observer.observe(sidebarEl)
    return () => observer.disconnect()
  }, [language, L.detailedDescription, L.description])

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
  const mainText = L.detailedDescription || L.description || t("listings.noDescription")

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
        <div className="lg:col-span-2">
          <Tabs defaultValue="description">
            <TabsList>
              <TabsTrigger value="description">{t("listings.descriptionTitle")}</TabsTrigger>
              <TabsTrigger value="location">{t("listings.locationTitle")}</TabsTrigger>
              <TabsTrigger value="amenities">{t("listings.featuresTitle")}</TabsTrigger>
              <TabsTrigger value="more">{t("listings.additionalInfoTitle")}</TabsTrigger>
            </TabsList>

            <TabsContent value="description" className="pt-6">
              <div className="relative">
                <p
                  ref={textRef}
                  className="whitespace-pre-line text-muted-foreground"
                  style={
                    !descriptionExpanded && needsClamp && clampHeight
                      ? { maxHeight: clampHeight, overflow: "hidden" }
                      : undefined
                  }
                >
                  {mainText}
                </p>
                {!descriptionExpanded && needsClamp && (
                  <div className="pointer-events-none absolute inset-x-0 bottom-0 h-10 bg-gradient-to-t from-card to-transparent" />
                )}
              </div>
              {needsClamp && (
                <button
                  type="button"
                  onClick={() => setDescriptionExpanded((v) => !v)}
                  className="mt-2 text-sm font-medium text-primary hover:underline"
                >
                  {descriptionExpanded ? t("listings.showLess") : t("listings.showMore")}
                </button>
              )}
            </TabsContent>

            <TabsContent value="location" className="pt-6">
              <div className="space-y-3">
                <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                  <MapPin className="h-5 w-5 shrink-0 text-primary" />
                  <div>
                    <p className="text-sm text-muted-foreground">{t("listings.cityAreaLabel")}</p>
                    <p className="font-semibold text-foreground">{L.location}</p>
                  </div>
                </div>
                {L.address ? (
                  <div className="flex items-center gap-3 rounded-lg border border-border p-4">
                    <MapPin className="h-5 w-5 shrink-0 text-primary" />
                    <div>
                      <p className="text-sm text-muted-foreground">{t("listings.address")}</p>
                      <p className="font-semibold text-foreground">{listing.address}</p>
                    </div>
                  </div>
                ) : (
                  <p className="text-sm text-muted-foreground">{t("listings.noLocationDetails")}</p>
                )}
              </div>
            </TabsContent>

            <TabsContent value="amenities" className="pt-6">
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
            </TabsContent>

            <TabsContent value="more" className="pt-6">
              {L.additionalInfo ? (
                <p className="whitespace-pre-line text-muted-foreground">{L.additionalInfo}</p>
              ) : (
                <p className="text-sm text-muted-foreground">{t("listings.noAdditionalInfo")}</p>
              )}
            </TabsContent>
          </Tabs>
        </div>

        <div className="lg:col-span-1">
          <div ref={sidebarRef} className="lg:sticky lg:top-24 space-y-5 rounded-lg border border-border bg-card p-6">
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

            <div className="space-y-3 border-t border-border pt-5">
              <h3 className="text-sm font-semibold text-foreground">{t("listings.quickFactsTitle")}</h3>
              <div className="grid grid-cols-2 gap-3 text-sm">
                <div className="flex items-center gap-2">
                  <Square className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{L.areaSqm} m²</span>
                </div>
                <div className="flex items-center gap-2">
                  <RoomOccupancyIcon occupants={L.roomOccupants} iconClassName="text-primary" />
                  <span className="text-muted-foreground">
                    {L.sharedRoom ? t("listings.sharedRoom") : t("listings.singleRoom")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bed className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    {`${L.bedrooms} ${t("listings.rooms")}`}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Bath className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{L.bathrooms} {t("listings.bathrooms")}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Building2 className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    {t(propertyTypeKey[L.propertyType] ?? "heroSearch.typeFlat")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Sofa className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">
                    {t(furnishingKey[L.furnishing] ?? "listings.unfurnished")}
                  </span>
                </div>
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4 shrink-0 text-primary" />
                  <span className="text-muted-foreground">{L.availableFrom}</span>
                </div>
                {L.deposit && (
                  <div className="flex items-center gap-2">
                    <Wallet className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{L.deposit} € {t("listings.deposit")}</span>
                  </div>
                )}
                {L.minimumStay && (
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{L.minimumStay}</span>
                  </div>
                )}
                {L.address && (
                  <div className="col-span-2 flex items-center gap-2">
                    <MapPin className="h-4 w-4 shrink-0 text-primary" />
                    <span className="text-muted-foreground">{listing.address}</span>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
