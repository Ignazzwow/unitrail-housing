"use client"

import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"
import { ArrowLeft, MapPin, Bed, Square, Euro } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useParams, notFound } from "next/navigation"
import { getListingById } from "@/lib/listings-data"
import { useState } from "react"
import { useToast } from "@/hooks/use-toast"
import type React from "react"

export default function InquiryPage() {
  const { t } = useLanguage()
  const params = useParams()
  const id = parseInt(params?.id as string, 10)
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  
  const listing = getListingById(id, t)
  
  if (!listing) {
    notFound()
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.target as HTMLFormElement)
    const data = {
      listingId: listing.id,
      listingTitle: listing.title,
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone"),
      university: formData.get("university"),
      introduction: formData.get("introduction"),
    }

    // Simulate form submission
    await new Promise((resolve) => setTimeout(resolve, 1000))

    console.log("Inquiry submitted:", data)

    toast({
      title: t("inquiry.requestSubmitted") || "Anfrage übermittelt",
      description: t("inquiry.requestSubmittedDesc") || "Vielen Dank! Wir melden uns bald bei Ihnen.",
    })

    setIsSubmitting(false)
    ;(e.target as HTMLFormElement).reset()
  }

  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <div className="container mx-auto px-4 py-16">
          {/* Back Button */}
          <Link href={`/angebote/${listing.id}`}>
            <Button variant="ghost" className="mb-8">
              <ArrowLeft className="mr-2 h-4 w-4" />
              {t("inquiry.backToListing") || "Zurück zum Inserat"}
            </Button>
          </Link>

          <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
            {/* Listing Summary Card */}
            <div className="lg:col-span-1">
              <Card className="sticky top-24 border-border bg-card">
                <div className="relative h-48 w-full overflow-hidden rounded-t-lg">
                  <Image
                    src={listing.images[0]}
                    alt={listing.title}
                    fill
                    className="object-cover"
                    priority
                  />
                </div>
                <CardHeader>
                  <CardTitle className="text-lg text-card-foreground">{listing.title}</CardTitle>
                  <CardDescription className="flex items-center gap-1 text-muted-foreground">
                    <MapPin className="h-4 w-4" />
                    {listing.location}
                  </CardDescription>
                </CardHeader>
                <CardContent className="space-y-3">
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">{t("listings.totalSize") || "Gesamtfläche"}</span>
                    <span className="font-semibold text-foreground">{listing.totalSize} m²</span>
                  </div>
                  <div className="flex items-center justify-between text-sm">
                    <span className="text-muted-foreground">
                      {listing.sharedRoom ? t("listings.sharedRoom") : `${listing.rooms} ${t("listings.rooms")}`}
                    </span>
                    <span className="font-semibold text-foreground">
                      {listing.sharedRoom ? t("listings.sharedRoom") : `${listing.rooms} ${t("listings.rooms")}`}
                    </span>
                  </div>
                  <div className="flex items-center justify-between border-t border-border pt-3">
                    <span className="text-muted-foreground">{t("listings.perMonth")}</span>
                    <div className="flex items-baseline gap-1">
                      <span className="text-2xl font-bold text-primary">{listing.price}</span>
                      <span className="text-sm text-muted-foreground">€</span>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Inquiry Form */}
            <div className="lg:col-span-2">
              <Card className="border-border bg-card">
                <CardHeader>
                  <CardTitle className="text-card-foreground">
                    {t("inquiry.title") || "Anfrage stellen"}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {t("inquiry.description") || "Bitte füllen Sie das Formular aus, um eine Anfrage für dieses Inserat zu stellen."}
                  </CardDescription>
                </CardHeader>
                <CardContent>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div className="space-y-2">
                        <Label htmlFor="firstName">
                          {t("contact.firstName") || "Vorname"} <span className="text-destructive">*</span>
                        </Label>
                        <Input id="firstName" name="firstName" required />
                      </div>
                      <div className="space-y-2">
                        <Label htmlFor="lastName">
                          {t("contact.lastName") || "Nachname"} <span className="text-destructive">*</span>
                        </Label>
                        <Input id="lastName" name="lastName" required />
                      </div>
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="email">
                        {t("contact.email") || "E-Mail"} <span className="text-destructive">*</span>
                      </Label>
                      <Input id="email" name="email" type="email" required />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="phone">
                        {t("contact.phone") || "Telefonnummer"}
                      </Label>
                      <Input id="phone" name="phone" type="tel" />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="university">
                        {t("contact.university") || "Universität / Hochschule"}
                      </Label>
                      <Input
                        id="university"
                        name="university"
                        placeholder={t("contact.universityPlaceholder") || "Ihre Universität oder Hochschule"}
                      />
                    </div>

                    <div className="space-y-2">
                      <Label htmlFor="introduction">
                        {t("inquiry.introduction") || "Kurze Vorstellung (optional)"}
                      </Label>
                      <Textarea
                        id="introduction"
                        name="introduction"
                        rows={5}
                        placeholder={t("inquiry.introductionPlaceholder") || "Erzählen Sie uns etwas über sich (z.B. Studium, Interessen, warum Sie diese Unterkunft suchen...)"}
                        className="resize-none"
                      />
                      <p className="text-xs text-muted-foreground">
                        {t("inquiry.introductionHint") || "Dieses Feld ist optional. Sie können später weitere Details ergänzen."}
                      </p>
                    </div>

                    <div className="flex gap-4 pt-4">
                      <Button type="submit" className="flex-1" disabled={isSubmitting} size="lg">
                        {isSubmitting
                          ? t("inquiry.submitting") || "Wird übermittelt..."
                          : t("inquiry.submitButton") || "Anfrage absenden"}
                      </Button>
                    </div>
                  </form>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </main>
  )
}



