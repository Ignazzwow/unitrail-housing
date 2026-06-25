import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Suspense } from "react"
import { getServerSession } from "next-auth"
import { LanguageProvider } from "@/contexts/language-context"
import { AuthProvider } from "@/components/providers/session-provider"
import { Toaster } from "@/components/ui/toaster"
import { CookieConsent } from "@/components/cookie-consent"
import { HtmlLangSync } from "@/components/html-lang-sync"
import { GoogleAnalytics } from "@/components/google-analytics"
import { GoogleAnalyticsConsentSync } from "@/components/google-analytics-consent-sync"
import { authOptions } from "@/lib/auth"

/** Required so getServerSession (uses headers/cookies) never runs during static generation. */
export const dynamic = "force-dynamic"

export const metadata: Metadata = {
  title: "UniTrail Housing - Student Accommodation for International Students",
  description:
    "Find safe, affordable, and welcoming accommodation for international students. UniTrail Housing helps you settle into your new home away from home.",
  icons: {
    icon: "/New_UniTrail_Housing_Logo.png",
    apple: "/New_UniTrail_Housing_Logo.png",
  },
}

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  let session = null
  try {
    session = await getServerSession(authOptions)
  } catch (error) {
    console.error("[layout] getServerSession failed:", error)
  }

  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`min-h-screen overflow-x-hidden bg-background font-sans text-foreground antialiased ${GeistSans.variable} ${GeistMono.variable}`}
      >
        <GoogleAnalytics />
        <AuthProvider session={session}>
          <LanguageProvider>
            <HtmlLangSync />
            <GoogleAnalyticsConsentSync />
            <Suspense fallback={<div className="min-h-screen bg-background p-6 text-foreground">Loading…</div>}>
              {children}
            </Suspense>
            <CookieConsent />
            <Toaster />
          </LanguageProvider>
        </AuthProvider>
      </body>
    </html>
  )
}
