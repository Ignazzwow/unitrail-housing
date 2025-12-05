"use client"

import { useState, useEffect } from "react"
import Link from "next/link"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Switch } from "@/components/ui/switch"
import { Label } from "@/components/ui/label"
import { useLanguage } from "@/contexts/language-context"
import { CheckCircle2 } from "lucide-react"

export default function CookieEinstellungenPage() {
  const { t } = useLanguage()
  const [essentialCookies, setEssentialCookies] = useState(true) // Always true, cannot be disabled
  const [analyticsCookies, setAnalyticsCookies] = useState(false)
  const [marketingCookies, setMarketingCookies] = useState(false)
  const [saved, setSaved] = useState(false)

  useEffect(() => {
    // Load saved preferences
    const consent = localStorage.getItem("cookie-consent")
    const analytics = localStorage.getItem("cookie-analytics")
    const marketing = localStorage.getItem("cookie-marketing")
    
    if (analytics === "accepted") {
      setAnalyticsCookies(true)
    }
    if (marketing === "accepted") {
      setMarketingCookies(true)
    }
  }, [])

  const handleSave = () => {
    localStorage.setItem("cookie-consent", "accepted")
    localStorage.setItem("cookie-analytics", analyticsCookies ? "accepted" : "declined")
    localStorage.setItem("cookie-marketing", marketingCookies ? "accepted" : "declined")
    localStorage.setItem("cookie-consent-date", new Date().toISOString())
    
    setSaved(true)
    setTimeout(() => {
      setSaved(false)
    }, 3000)
  }

  const handleAcceptAll = () => {
    setAnalyticsCookies(true)
    setMarketingCookies(true)
    handleSave()
  }

  const handleRejectAll = () => {
    setAnalyticsCookies(false)
    setMarketingCookies(false)
    handleSave()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto max-w-3xl px-4 py-16 space-y-8">
          <section className="space-y-4">
            <h1 className="text-3xl font-bold text-foreground">{t("cookieSettings.title")}</h1>
            <p className="text-muted-foreground">{t("cookieSettings.description")}</p>
          </section>

          <Card>
            <CardHeader>
              <CardTitle>{t("cookieSettings.cookiePreferences")}</CardTitle>
              <CardDescription>{t("cookieSettings.cookiePreferencesDesc")}</CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              {/* Essential Cookies */}
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1">
                    <Label htmlFor="essential" className="text-base font-semibold">
                      {t("cookieSettings.essentialCookies")}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("cookieSettings.essentialCookiesDesc")}
                    </p>
                  </div>
                  <Switch id="essential" checked={true} disabled />
                </div>
              </div>

              {/* Analytics Cookies */}
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="analytics" className="text-base font-semibold">
                      {t("cookieSettings.analyticsCookies")}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("cookieSettings.analyticsCookiesDesc")}
                    </p>
                  </div>
                  <Switch
                    id="analytics"
                    checked={analyticsCookies}
                    onCheckedChange={setAnalyticsCookies}
                  />
                </div>
              </div>

              {/* Marketing Cookies */}
              <div className="space-y-3 p-4 border rounded-lg">
                <div className="flex items-center justify-between">
                  <div className="space-y-1 flex-1">
                    <Label htmlFor="marketing" className="text-base font-semibold">
                      {t("cookieSettings.marketingCookies")}
                    </Label>
                    <p className="text-sm text-muted-foreground">
                      {t("cookieSettings.marketingCookiesDesc")}
                    </p>
                  </div>
                  <Switch
                    id="marketing"
                    checked={marketingCookies}
                    onCheckedChange={setMarketingCookies}
                  />
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex flex-col gap-3 pt-4 border-t">
                <div className="flex flex-col sm:flex-row gap-3">
                  <Button onClick={handleSave} className="flex-1">
                    {t("cookieSettings.savePreferences")}
                  </Button>
                  <Button onClick={handleAcceptAll} variant="outline" className="flex-1">
                    {t("cookieSettings.acceptAll")}
                  </Button>
                  <Button onClick={handleRejectAll} variant="outline" className="flex-1">
                    {t("cookieSettings.rejectAll")}
                  </Button>
                </div>
                
                {saved && (
                  <div className="flex items-center gap-2 text-sm text-green-600 dark:text-green-400">
                    <CheckCircle2 className="h-4 w-4" />
                    {t("cookieSettings.saved")}
                  </div>
                )}
              </div>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle>{t("cookieSettings.moreInformation")}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-2 text-sm text-muted-foreground">
              <p>{t("cookieSettings.moreInformationText")}</p>
              <p>
                <Link href="/datenschutz" className="text-primary hover:underline">
                  {t("footer.privacyPolicy")}
                </Link>
              </p>
            </CardContent>
          </Card>
        </div>
        <Footer />
      </div>
    </main>
  )
}

