"use client"

import { HeroSearch } from "@/components/hero-search"
import { useLanguage } from "@/contexts/language-context"

export function HomeHeroSearchSection() {
  const { t } = useLanguage()

  return (
    <div className="container relative z-10 mx-auto -mt-16 px-4">
      <div className="w-full rounded-xl border border-border bg-background p-4 shadow-lg md:p-6">
        <h3 className="mb-3 text-sm font-semibold text-foreground">{t("heroSearch.sectionTitle")}</h3>
        <HeroSearch />
      </div>
    </div>
  )
}
