"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { useLanguage } from "@/contexts/language-context"

export default function ImpressumPage() {
  const { t } = useLanguage()
  
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto max-w-3xl px-4 py-16 space-y-12 text-muted-foreground">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{t("impressum.title")}</h1>
            <div className="space-y-1">
              <p>UniTrail Housing</p>
              <p>{t("impressum.owner")}: Paul Worlitzsch</p>
              <p>Wiesenstraße 10</p>
              <p>92353 Postbauer-Heng</p>
              <p>Deutschland</p>
            </div>
            <div className="space-y-1">
              <p className="font-semibold text-foreground">{t("impressum.contact")}</p>
              <p>{t("impressum.phone")}: +49 176 56800301</p>
              <p>{t("impressum.email")}: info@unitrail-housing.de</p>
              <p>{t("impressum.vatId")}: {t("impressum.vatIdPlaceholder")}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("impressum.disclaimer")}</h2>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{t("impressum.contentLiability")}</h3>
              <p>
                {t("impressum.contentLiabilityText")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{t("impressum.linkLiability")}</h3>
              <p>
                {t("impressum.linkLiabilityText")}
              </p>
            </div>

            <div className="space-y-2">
              <h3 className="text-xl font-semibold text-foreground">{t("impressum.copyright")}</h3>
              <p>
                {t("impressum.copyrightText")}
              </p>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  )
}

