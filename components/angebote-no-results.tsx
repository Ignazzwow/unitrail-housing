"use client"

import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

export function AngeboteNoResults() {
  const { t } = useLanguage()

  return (
    <div className="py-16 text-center">
      <p className="mb-4 text-lg text-muted-foreground">{t("listings.noMatchingResults")}</p>
      <Link href="/angebote" className="font-medium text-primary hover:underline">
        {t("listings.viewAllListings")}
      </Link>
    </div>
  )
}
