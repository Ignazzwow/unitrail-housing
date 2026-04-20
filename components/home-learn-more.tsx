"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export function HomeLearnMore() {
  const { t } = useLanguage()

  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4 text-center">
        <h2 className="mb-6 text-3xl font-bold tracking-tight">{t("homeLearnMore.title")}</h2>
        <p className="mx-auto mb-8 max-w-2xl text-muted-foreground">{t("homeLearnMore.description")}</p>
        <div className="flex flex-wrap justify-center gap-4">
          <Button asChild>
            <Link href="/for-students">{t("homeLearnMore.students")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/for-landlords">{t("homeLearnMore.landlords")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/faq">{t("homeLearnMore.faq")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/about">{t("homeLearnMore.about")}</Link>
          </Button>
          <Button variant="outline" asChild>
            <Link href="/contact">{t("homeLearnMore.contact")}</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
