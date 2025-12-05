"use client"

import { useState } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function DatenschutzPage() {
  const { t } = useLanguage()
  const [showCookieConsent, setShowCookieConsent] = useState(false)
  
  const handleShowCookieConsent = () => {
    setShowCookieConsent(true)
    // Scroll to top to show cookie consent
    window.scrollTo({ top: 0, behavior: "smooth" })
    // Trigger cookie consent display
    setTimeout(() => {
      localStorage.removeItem("cookie-consent")
      window.location.reload()
    }, 100)
  }
  
  const handleRevokeConsent = () => {
    if (confirm(t("privacy.revokeConsentConfirm") || "Möchten Sie wirklich alle Einwilligungen widerrufen?")) {
      localStorage.removeItem("cookie-consent")
      alert(t("privacy.consentRevoked"))
      window.location.reload()
    }
  }
  
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto max-w-3xl px-4 py-16 space-y-12 text-muted-foreground">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{t("privacy.title")}</h1>
            <p className="text-sm text-muted-foreground">
              {t("privacy.lastUpdated")}: {new Date().toLocaleDateString("de-DE", { year: "numeric", month: "long", day: "numeric" })}
            </p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.introduction")}</h2>
            <p>{t("privacy.introductionText")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.dataController")}</h2>
            <div className="space-y-1">
              <p>UniTrail Housing</p>
              <p>{t("privacy.owner")}: Paul Worlitzsch</p>
              <p>Wiesenstraße 10</p>
              <p>92353 Postbauer-Heng</p>
              <p>Deutschland</p>
            </div>
            <div className="space-y-1 mt-4">
              <p className="font-semibold text-foreground">{t("privacy.contact")}</p>
              <p>{t("privacy.phone")}: +49 176 56800301</p>
              <p>{t("privacy.email")}: info@unitrail-housing.de</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.dataCollection")}</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">{t("privacy.personalData")}</h3>
              <p>{t("privacy.personalDataText")}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t("privacy.dataType1")}</li>
                <li>{t("privacy.dataType2")}</li>
                <li>{t("privacy.dataType3")}</li>
                <li>{t("privacy.dataType4")}</li>
                <li>{t("privacy.dataType5")}</li>
                <li>{t("privacy.dataType6")}</li>
              </ul>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.purpose")}</h2>
            <p>{t("privacy.purposeText")}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t("privacy.purpose1")}</li>
              <li>{t("privacy.purpose2")}</li>
              <li>{t("privacy.purpose3")}</li>
              <li>{t("privacy.purpose4")}</li>
              <li>{t("privacy.purpose5")}</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.legalBasis")}</h2>
            <p>{t("privacy.legalBasisText")}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t("privacy.legalBasis1")}</li>
              <li>{t("privacy.legalBasis2")}</li>
              <li>{t("privacy.legalBasis3")}</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.dataSharing")}</h2>
            <p>{t("privacy.dataSharingText")}</p>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li>{t("privacy.sharing1")}</li>
              <li>{t("privacy.sharing2")}</li>
              <li>{t("privacy.sharing3")}</li>
            </ul>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.cookies")}</h2>
            <p>{t("privacy.cookiesText")}</p>
            <p>{t("privacy.cookiesText2")}</p>
            <p>{t("privacy.cookiesText3")}</p>
            <p>{t("privacy.cookiesText4")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.security")}</h2>
            <p>{t("privacy.securityText")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.changes")}</h2>
            <p>{t("privacy.changesText")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.contactForm")}</h2>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">{t("privacy.contactFormPurpose")}</h3>
              <p>{t("privacy.contactFormPurposeText")}</p>
            </div>
            <div className="space-y-3">
              <h3 className="text-xl font-semibold text-foreground">{t("privacy.contactFormData")}</h3>
              <p>{t("privacy.contactFormDataText")}</p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t("privacy.contactFormData1")}</li>
                <li>{t("privacy.contactFormData2")}</li>
                <li>{t("privacy.contactFormData3")}</li>
                <li>{t("privacy.contactFormData4")}</li>
                <li>{t("privacy.contactFormData5")}</li>
                <li>{t("privacy.contactFormData6")}</li>
                <li>{t("privacy.contactFormData7")}</li>
              </ul>
              <p className="mt-2">{t("privacy.contactFormData8")}</p>
              <p>{t("privacy.contactFormData9")}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.cookieConsentTool")}</h2>
            <p>{t("privacy.cookieConsentToolText")}</p>
            <p>{t("privacy.cookieConsentTool2")}</p>
            <p>{t("privacy.cookieConsentTool3")}</p>
            <p>{t("privacy.cookieConsentTool4")}</p>
            <p>{t("privacy.cookieConsentTool5")}</p>
            <p>{t("privacy.cookieConsentTool6")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.rightsExtended")}</h2>
            <div className="space-y-3">
              <p className="font-semibold">
                <span className="text-foreground">12.1 </span>
                {t("privacy.rightsExtended1").replace(/^12\.1\s/, "")}
              </p>
              <ul className="list-disc list-inside space-y-1 ml-4">
                <li>{t("privacy.rightsExtended2")}</li>
                <li>{t("privacy.rightsExtended3")}</li>
                <li>{t("privacy.rightsExtended4")}</li>
                <li>{t("privacy.rightsExtended5")}</li>
                <li>{t("privacy.rightsExtended6")}</li>
                <li>{t("privacy.rightsExtended7")}</li>
                <li>{t("privacy.rightsExtended8")}</li>
                <li>{t("privacy.rightsExtended9")}</li>
              </ul>
            </div>
            <div className="space-y-3 mt-6">
              <h3 className="text-xl font-semibold text-foreground">{t("privacy.objectionRight")}</h3>
              <p className="font-semibold">{t("privacy.objectionRight1")}</p>
              <p className="font-semibold">{t("privacy.objectionRight2")}</p>
              <p className="font-semibold">{t("privacy.objectionRight3")}</p>
              <p className="font-semibold">{t("privacy.objectionRight4")}</p>
            </div>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.storageDuration")}</h2>
            <p>{t("privacy.storageDurationText")}</p>
            <p>{t("privacy.storageDuration1")}</p>
            <p>{t("privacy.storageDuration2")}</p>
            <p>{t("privacy.storageDuration3")}</p>
            <p>{t("privacy.storageDuration4")}</p>
            <p>{t("privacy.storageDuration5")}</p>
          </section>

          <section className="space-y-4">
            <h2 className="text-2xl font-semibold text-foreground">{t("privacy.contactDataProtection")}</h2>
            <p>{t("privacy.contactDataProtectionText")}</p>
            <div className="space-y-1 mt-4">
              <p>UniTrail Housing</p>
              <p>{t("privacy.email")}: info@unitrail-housing.de</p>
              <p>{t("privacy.phone")}: +49 176 56800301</p>
            </div>
          </section>

          {/* Cookie Settings Section */}
          <section className="space-y-4 pt-8 border-t border-border">
            <h2 className="text-2xl font-semibold text-foreground">15. {t("privacy.cookieSettings.title")}</h2>
            <div className="flex flex-col gap-3">
              <Button 
                onClick={handleShowCookieConsent}
                variant="outline"
                className="w-full sm:w-auto justify-start"
              >
                {t("privacy.privacySettings")}
              </Button>
              <Button 
                onClick={() => {
                  const consent = localStorage.getItem("cookie-consent")
                  const language = localStorage.getItem("language")
                  const theme = localStorage.getItem("theme")
                  const history = `Cookie-Einstellungen: ${consent || "Nicht gesetzt"}\nSprache: ${language || "Nicht gesetzt"}\nTheme: ${theme || "Nicht gesetzt"}\nLetzte Änderung: ${new Date().toLocaleString("de-DE")}`
                  alert(history)
                }}
                variant="outline"
                className="w-full sm:w-auto justify-start"
              >
                {t("privacy.privacyHistory")}
              </Button>
              <Button 
                onClick={handleRevokeConsent}
                variant="outline"
                className="w-full sm:w-auto justify-start"
              >
                {t("privacy.revokeConsent")}
              </Button>
            </div>
          </section>
        </div>
        <Footer />
      </div>
    </main>
  )
}

