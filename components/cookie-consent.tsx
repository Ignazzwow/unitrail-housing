"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { X } from "lucide-react"

export function CookieConsent() {
  const [showConsent, setShowConsent] = useState(false)

  useEffect(() => {
    const consent = localStorage.getItem("cookie-consent")
    if (!consent) {
      setShowConsent(true)
    }
  }, [])

  const acceptCookies = () => {
    localStorage.setItem("cookie-consent", "accepted")
    setShowConsent(false)
  }

  const declineCookies = () => {
    localStorage.setItem("cookie-consent", "declined")
    setShowConsent(false)
  }

  if (!showConsent) return null

  return (
    <div className="fixed bottom-4 left-4 right-4 z-50 md:left-auto md:max-w-md">
      <Card className="border-border bg-card shadow-lg">
        <CardHeader className="relative">
          <Button variant="ghost" size="icon" className="absolute right-2 top-2 h-6 w-6" onClick={declineCookies}>
            <X className="h-4 w-4" />
            <span className="sr-only">Close</span>
          </Button>
          <CardTitle className="text-card-foreground">Cookie Consent</CardTitle>
          <CardDescription className="text-muted-foreground">We use cookies to enhance your experience</CardDescription>
        </CardHeader>
        <CardContent className="space-y-4">
          <p className="text-sm text-muted-foreground">
            We use essential cookies to make our site work and analytics cookies to understand how you use our site. We
            only use cookies with your consent in compliance with GDPR.
          </p>
          <div className="flex flex-col gap-2 sm:flex-row">
            <Button onClick={acceptCookies} className="flex-1">
              Accept All
            </Button>
            <Button onClick={declineCookies} variant="outline" className="flex-1 bg-transparent">
              Essential Only
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Read our{" "}
            <a href="#cookies" className="text-primary underline">
              Cookie Policy
            </a>{" "}
            and{" "}
            <a href="#privacy" className="text-primary underline">
              Privacy Policy
            </a>
          </p>
        </CardContent>
      </Card>
    </div>
  )
}
