"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, Calendar, MessageCircle, FileCheck } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function Features() {
  const { t } = useLanguage()
  
  const features = [
    {
      icon: MapPin,
      title: t("features.primeLocations"),
      description: t("features.primeLocationsDesc"),
    },
    {
      icon: DollarSign,
      title: t("features.transparentPricing"),
      description: t("features.transparentPricingDesc"),
    },
    {
      icon: Calendar,
      title: t("features.flexibleTerms"),
      description: t("features.flexibleTermsDesc"),
    },
    {
      icon: MessageCircle,
      title: t("features.multilingualSupport"),
      description: t("features.multilingualSupportDesc"),
    },
    {
      icon: FileCheck,
      title: t("features.easyDocumentation"),
      description: t("features.easyDocumentationDesc"),
    }
  ]

  return (
    <section id="features" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("features.title")}
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("features.description")}
          </p>
        </div>

        <div className="mb-16 grid gap-4 md:grid-cols-3">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg md:col-span-2">
            <Image
              src="/modern-student-apartment-living-room-with-study-ar.jpg"
              alt="Modern student apartment"
              width={800}
              height={400}
              className="object-cover"
              loading="lazy"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/cozy-student-bedroom.png"
              alt="Cozy student bedroom"
              width={400}
              height={400}
              className="object-cover"
              loading="lazy"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
