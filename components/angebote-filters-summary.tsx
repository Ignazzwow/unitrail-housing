"use client"

import Link from "next/link"
import type { ListingsFilters } from "@/lib/listings-data"
import { useLanguage } from "@/contexts/language-context"

export function AngeboteFiltersSummary({
  filters,
  hasFilters,
}: {
  filters: ListingsFilters
  hasFilters: boolean
}) {
  const { t } = useLanguage()
  if (!hasFilters) return null

  return (
    <div className="mb-6 flex flex-wrap items-center gap-2 text-sm text-muted-foreground">
      <span>{t("listings.filtersIntro")}</span>
      {filters.location && (
        <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
          {t("listings.filterLocation")} {filters.location}
        </span>
      )}
      {filters.propertyType && (
        <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
          {t("listings.filterType")} {filters.propertyType}
        </span>
      )}
      {filters.listingType && (
        <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
          {t("listings.filterListingType")} {filters.listingType}
        </span>
      )}
      {filters.minPrice != null && (
        <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
          {t("listings.filterMin")} €{filters.minPrice}
        </span>
      )}
      {filters.maxPrice != null && (
        <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
          {t("listings.filterMax")} €{filters.maxPrice}
        </span>
      )}
      {filters.bedrooms != null && (
        <span className="rounded-md bg-primary/10 px-2 py-1 text-primary">
          {filters.bedrooms}
          {t("listings.filterBedroomsSuffix")}
        </span>
      )}
      <Link href="/angebote" className="ml-2 text-primary hover:underline">
        {t("listings.clearFilters")}
      </Link>
    </div>
  )
}
