"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import { useToast } from "@/hooks/use-toast"

export default function DatenschutzPage() {
  const { t, language } = useLanguage()
  const { toast } = useToast()

  const handleShowCookieConsent = () => {
    localStorage.removeItem("cookie-consent")
    window.location.reload()
  }

  const handleRevokeConsent = () => {
    if (window.confirm(t("privacy.revokeConsentConfirm"))) {
      localStorage.removeItem("cookie-consent")
      toast({ title: t("privacy.consentRevoked") })
      window.location.reload()
    }
  }

  const handlePrivacyHistory = () => {
    const consent = localStorage.getItem("cookie-consent")
    const storedLanguage = localStorage.getItem("language")
    const theme = localStorage.getItem("theme")
    const history = [
      `${t("privacy.cookies")}: ${consent || "—"}`,
      `${t("nav.languageLabel")}: ${storedLanguage || "—"}`,
      `${t("nav.themeLabel")}: ${theme || "—"}`,
      `${t("privacy.lastUpdated")}: ${new Date().toLocaleString(language === "de" ? "de-DE" : "en-GB")}`,
    ].join("\n")
    toast({ title: t("privacy.privacyHistory"), description: history })
  }

  const dataTypes = [
    t("privacy.dataType1"),
    t("privacy.dataType2"),
    t("privacy.dataType3"),
    t("privacy.dataType4"),
    t("privacy.dataType5"),
    t("privacy.dataType6"),
  ]

  const purposes = [
    t("privacy.purpose1"),
    t("privacy.purpose2"),
    t("privacy.purpose3"),
    t("privacy.purpose4"),
    t("privacy.purpose5"),
  ]

  const legalBases = [t("privacy.legalBasis1"), t("privacy.legalBasis2"), t("privacy.legalBasis3")]

  const sharing = [t("privacy.sharing1"), t("privacy.sharing2"), t("privacy.sharing3")]

  const rights = [
    t("privacy.rightsExtended1"),
    t("privacy.rightsExtended2"),
    t("privacy.rightsExtended3"),
    t("privacy.rightsExtended4"),
    t("privacy.rightsExtended5"),
    t("privacy.rightsExtended6"),
    t("privacy.rightsExtended7"),
    t("privacy.rightsExtended8"),
  ]

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <article className="container mx-auto max-w-3xl space-y-10 px-4 py-12 md:py-16 text-muted-foreground">
          <header className="space-y-4" id="privacy">
            <h1 className="text-3xl font-bold text-foreground">{t("privacy.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("privacy.lastUpdated")}:{" "}
              {new Date().toLocaleDateString(language === "de" ? "de-DE" : "en-GB", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </p>
          </header>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.introduction")}</h2>
            <p>{t("privacy.introductionText")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.dataController")}</h2>
            <div className="space-y-1">
              <p className="font-medium text-foreground">{t("privacy.companyName")}</p>
              <p>
                {t("privacy.owner")}: {t("privacy.ownerName")}
              </p>
              <p>{t("privacy.street")}</p>
              <p>{t("privacy.city")}</p>
            </div>
            <div className="mt-4 space-y-1">
              <p className="font-semibold text-foreground">{t("privacy.contact")}</p>
              <p>
                {t("privacy.phone")}: +49 176 56800301
              </p>
              <p>
                {t("privacy.email")}:{" "}
                <a href="mailto:info@unitrail-housing.de" className="break-all text-primary underline">
                  info@unitrail-housing.de
                </a>
              </p>
            </div>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.dataCollection")}</h2>
            <h3 className="text-xl font-semibold text-foreground">{t("privacy.personalData")}</h3>
            <p>{t("privacy.personalDataText")}</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              {dataTypes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.purpose")}</h2>
            <p>{t("privacy.purposeText")}</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              {purposes.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.legalBasis")}</h2>
            <p>{t("privacy.legalBasisText")}</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              {legalBases.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.dataSharing")}</h2>
            <p>{t("privacy.dataSharingText")}</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              {sharing.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3" id="cookies">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.cookies")}</h2>
            <p>{t("privacy.cookiesText")}</p>
            <p>{t("privacy.cookiesText2")}</p>
            <p>{t("privacy.cookiesText3")}</p>
            <p>{t("privacy.cookiesText4")}</p>
            <p>{t("privacy.cookieConsentToolText")}</p>
            <p>{t("privacy.cookieConsentTool2")}</p>
            <p>{t("privacy.cookieConsentTool3")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.security")}</h2>
            <p>{t("privacy.securityText")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.rightsExtended")}</h2>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              {rights.map((item) => (
                <li key={item}>{item}</li>
              ))}
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.storageDuration")}</h2>
            <p>{t("privacy.storageDurationText")}</p>
            <ul className="ml-4 list-disc space-y-1 pl-1">
              <li>{t("privacy.storageDuration1")}</li>
              <li>{t("privacy.storageDuration2")}</li>
              <li>{t("privacy.storageDuration3")}</li>
              <li>{t("privacy.storageDuration4")}</li>
              <li>{t("privacy.storageDuration5")}</li>
            </ul>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.changes")}</h2>
            <p>{t("privacy.changesText")}</p>
          </section>

          <section className="space-y-3" id="terms">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.termsTitle")}</h2>
            <p>{t("privacy.termsIntro")}</p>
            <p>{t("privacy.termsText")}</p>
          </section>

          <section className="space-y-3">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.contactDataProtection")}</h2>
            <p>{t("privacy.contactDataProtectionText")}</p>
            <p>
              <a href="mailto:info@unitrail-housing.de" className="break-all text-primary underline">
                info@unitrail-housing.de
              </a>
            </p>
          </section>

          <section className="space-y-4 border-t border-border pt-8">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.cookieSettings.title")}</h2>
            <div className="flex flex-col gap-3">
              <Button onClick={handleShowCookieConsent} variant="outline" className="w-full justify-start sm:w-auto">
                {t("privacy.privacySettings")}
              </Button>
              <Button onClick={handlePrivacyHistory} variant="outline" className="w-full justify-start sm:w-auto">
                {t("privacy.privacyHistory")}
              </Button>
              <Button onClick={handleRevokeConsent} variant="outline" className="w-full justify-start sm:w-auto">
                {t("privacy.revokeConsent")}
              </Button>
            </div>
          </section>
        </article>
        <Footer />
      </div>
    </main>
  )
}
