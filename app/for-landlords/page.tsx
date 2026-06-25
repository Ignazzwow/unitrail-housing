"use client"

import Image from "next/image"
import { useMemo, useState } from "react"
import {
  Banknote,
  Building2,
  Handshake,
  Headphones,
  TrendingUp,
} from "lucide-react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { LandlordInquiryDialog } from "@/components/landlord-inquiry-dialog"

const BENEFIT_ICON_KEYS = [
  { icon: Banknote, titleKey: "forLandlords.benefitPaymentsTitle", descKey: "forLandlords.benefitPaymentsDesc" },
  { icon: Handshake, titleKey: "forLandlords.benefitPartnerTitle", descKey: "forLandlords.benefitPartnerDesc" },
  { icon: TrendingUp, titleKey: "forLandlords.benefitYieldsTitle", descKey: "forLandlords.benefitYieldsDesc" },
  { icon: Headphones, titleKey: "forLandlords.benefitSupportTitle", descKey: "forLandlords.benefitSupportDesc" },
  {
    icon: Building2,
    titleKey: "forLandlords.benefitManagementTitle",
    descKey: "forLandlords.benefitManagementDesc",
  },
] as const

export default function ForLandlordsPage() {
  const { t } = useLanguage()
  const [landlordFormOpen, setLandlordFormOpen] = useState(false)

  const landlordBenefits = useMemo(
    () =>
      BENEFIT_ICON_KEYS.map(({ icon, titleKey, descKey }) => ({
        icon,
        title: t(titleKey),
        description: t(descKey),
      })),
    [t]
  )

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section className="relative flex min-h-[min(88vh,720px)] items-end md:items-center">
          <Image
            src="/modern-student-apartment-living-room-with-study-ar.jpg"
            alt={t("forLandlords.heroImageAlt")}
            fill
            priority
            className="object-cover object-center"
            sizes="100vw"
          />
          <div
            className="absolute inset-0 bg-gradient-to-t from-background via-background/85 to-background/40 md:bg-gradient-to-r md:from-background md:via-background/80 md:to-transparent"
            aria-hidden
          />
          <div className="relative z-10 w-full">
            <div className="container mx-auto px-4 pb-16 pt-12 md:py-24 lg:py-28">
              <div className="max-w-2xl space-y-6 md:max-w-xl">
                <h1 className="text-balance text-3xl font-bold tracking-tight text-foreground drop-shadow-sm sm:text-4xl md:text-5xl lg:text-[3.25rem] lg:leading-tight">
                  {t("forLandlords.heroTitle")}
                </h1>
                <p className="text-pretty text-lg leading-relaxed text-muted-foreground md:text-xl">
                  {t("forLandlords.heroLead")}
                </p>
              </div>
            </div>
          </div>
        </section>

        <section className="border-b border-border bg-background py-16 md:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-12 max-w-3xl text-center md:mb-16">
              <h2 className="text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("forLandlords.whyTitle")}
              </h2>
            </div>

            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {landlordBenefits.map(({ icon: Icon, title, description }) => (
                <Card
                  key={title}
                  className="border-border/80 bg-card shadow-sm transition-shadow hover:shadow-md"
                >
                  <CardHeader className="gap-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-xl bg-primary/10 text-primary">
                      <Icon className="h-6 w-6 shrink-0" strokeWidth={1.75} aria-hidden />
                    </div>
                    <div className="space-y-2">
                      <CardTitle className="text-lg leading-snug text-card-foreground">{title}</CardTitle>
                      <CardDescription className="text-base leading-relaxed text-muted-foreground">
                        {description}
                      </CardDescription>
                    </div>
                  </CardHeader>
                </Card>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-muted/40 py-16 md:py-20">
          <div className="container mx-auto px-4">
            <div className="mx-auto max-w-3xl rounded-2xl border border-border/60 bg-muted/30 px-6 py-10 shadow-sm md:px-10 md:py-12">
              <h2 className="mb-6 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl">
                {t("forLandlords.promiseTitle")}
              </h2>
              <p className="text-pretty text-lg leading-relaxed text-muted-foreground">
                {t("forLandlords.promisePart1")}
                <strong className="font-semibold text-foreground">{t("forLandlords.promiseBoldFinancial")}</strong>
                {t("forLandlords.promiseComma")}
                <strong className="font-semibold text-foreground">{t("forLandlords.promiseBoldLongTerm")}</strong>
                {t("forLandlords.promiseAnd")}
                <strong className="font-semibold text-foreground">{t("forLandlords.promiseBoldEffortless")}</strong>
                {t("forLandlords.promisePartEnd")}
              </p>
            </div>
          </div>
        </section>

        <section className="container mx-auto px-4 py-16 md:py-20">
          <div
            className="mx-auto max-w-3xl rounded-2xl border border-primary/20 bg-primary/5 px-6 py-10 text-center md:px-10"
            aria-labelledby="landlords-cta-heading"
          >
            <h2
              id="landlords-cta-heading"
              className="mb-3 text-2xl font-bold tracking-tight text-foreground md:text-3xl"
            >
              {t("forLandlords.ctaTitle")}
            </h2>
            <p className="mx-auto mb-8 max-w-xl text-pretty text-muted-foreground">{t("forLandlords.ctaLead")}</p>
            <Button size="lg" className="font-semibold" type="button" onClick={() => setLandlordFormOpen(true)}>
              {t("forLandlords.ctaButton")}
            </Button>
          </div>
        </section>

        <LandlordInquiryDialog open={landlordFormOpen} onOpenChange={setLandlordFormOpen} />

        <Footer />
      </div>
    </main>
  )
}
