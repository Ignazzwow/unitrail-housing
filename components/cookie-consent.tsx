"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"
import { updateGoogleConsent } from "@/lib/google-analytics"

export function CookieConsent() {
  const { t } = useLanguage()
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    updateGoogleConsent(true)
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    updateGoogleConsent(false)
    setShowConsent(false)
  }

  const dismissBanner = () => {
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 pb-[env(safe-area-inset-bottom)] md:left-auto md:max-w-md">
      <Card className="border-border bg-card shadow-lg">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6" onClick={dismissBanner}>
            <X className="h-4 w-4" />
            <span className="sr-only">{t("cookie.close")}</span>
          </Button>
          <CardTitle className="text-card-foreground">{t("cookie.title")}</CardTitle>
          <CardDescription className="text-muted-foreground">{t("cookie.subtitle")}</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">{t("cookie.description")}</p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={acceptCookies} className="flex-1">
              {t("cookie.acceptAll")}
            </Button>
            <Button onClick={declineCookies} variant="outline" className="flex-1 bg-transparent">
              {t("cookie.essentialOnly")}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            {t("cookie.readOur")}{" "}
            <a href="/datenschutz#cookies" className="text-primary underline">
              {t("cookie.cookiePolicy")}
            </a>{" "}
            {t("cookie.and")}{" "}
            <a href="/datenschutz" className="text-primary underline">
              {t("cookie.privacyPolicy")}
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
