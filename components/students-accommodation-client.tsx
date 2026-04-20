"use client"

import Link from "next/link"
import type { PropertyWithRelations } from "@/lib/listing-types"
import { AngeboteListClient } from "@/components/angebote-list-client"
import { useLanguage } from "@/contexts/language-context"

export function StudentsAccommodationClient({ listings }: { listings: PropertyWithRelations[] }) {
  const { t } = useLanguage()

  return (
    <section className="container mx-auto px-4 py-16">
      <div className="mb-8">
        <nav className="mb-4 text-sm text-muted-foreground">
          <Link href="/" className="hover:text-primary">
            {t("studentsAccommodation.breadcrumbHome")}
          </Link>
          <span className="mx-2">/</span>
          <Link href="/for-students" className="hover:text-primary">
            {t("studentsAccommodation.breadcrumbStudents")}
          </Link>
          <span className="mx-2">/</span>
          <span className="text-foreground">{t("studentsAccommodation.breadcrumbCurrent")}</span>
        </nav>
        <h1 className="mb-2 text-4xl font-bold tracking-tight">{t("studentsAccommodation.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("studentsAccommodation.description")}</p>
      </div>
      <AngeboteListClient listings={listings} hideHeader />
    </section>
  )
}
