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
        <div className="container mx-auto max-w-3xl space-y-10 px-4 py-16 text-muted-foreground">
          <header className="space-y-2">
            <h1 className="text-3xl font-bold text-foreground">{t("imprint.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("imprint.lastUpdated")}:{" "}
              {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
            </p>
            <p>{t("imprint.intro")}</p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("imprint.provider")}</h2>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{t("imprint.companyName")}</p>
              <p>
                {t("imprint.representedBy")}: {t("imprint.ownerName")}
              </p>
              <p>{t("imprint.street")}</p>
              <p>{t("imprint.city")}</p>
            </div>
            <div className="mt-4 space-y-1">
              <p className="font-semibold text-foreground">{t("imprint.contact")}</p>
              <p>
                {t("imprint.phoneLabel")}: +49 176 56800301
              </p>
              <p>
                {t("imprint.emailLabel")}: info@unitrail-housing.de
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("imprint.liabilityContent")}</h2>
            <p>{t("imprint.liabilityContentText")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("imprint.liabilityLinks")}</h2>
            <p>{t("imprint.liabilityLinksText")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("imprint.copyright")}</h2>
            <p>{t("imprint.copyrightText")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("imprint.consumerDispute")}</h2>
            <p>{t("imprint.consumerDisputeText")}</p>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  )
}
