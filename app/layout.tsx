import type React from "react"
import type { Metadata } from "next"
import { GeistSans } from "geist/font/sans"
import { GeistMono } from "geist/font/mono"
import "./globals.css"
import { Suspense } from "react"
import { LanguageProvider } from "@/contexts/language-context"

export const metadata: Metadata = {
  title: "UniTrail Housing - Student Accommodation for International Students",
  description:
    "Find safe, affordable, and welcoming accommodation for international students. UniTrail Housing helps you settle into your new home away from home.",
  generator: "v0.app",
  icons: {
    icon: "/New_UniTrail_Housing_Logo.png",
    apple: "/New_UniTrail_Housing_Logo.png",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  return (
    <html lang="en">
      <body className={`font-sans ${GeistSans.variable} ${GeistMono.variable}`}>
        <LanguageProvider>
          <Suspense fallback={<div>Loading...</div>}>{children}</Suspense>
        </LanguageProvider>
      </body>
    </html>
  )
}
