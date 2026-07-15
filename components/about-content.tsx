"use client"

import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Globe, Heart, Rocket, Handshake } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function AboutContent() {
  const { t } = useLanguage()

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">{t("about.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("about.lead")}</p>
      </div>

      <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader>
            <Shield className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("about.cardVerifiedTitle")}</CardTitle>
            <CardDescription>{t("about.cardVerifiedDesc")}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <Users className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("about.cardStudentTitle")}</CardTitle>
            <CardDescription>{t("about.cardStudentDesc")}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <Globe className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("about.cardMultilingualTitle")}</CardTitle>
            <CardDescription>{t("about.cardMultilingualDesc")}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <Heart className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("about.cardCommunityTitle")}</CardTitle>
            <CardDescription>{t("about.cardCommunityDesc")}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="mx-auto grid max-w-4xl gap-6 sm:grid-cols-2">
        <div className="rounded-lg border border-border bg-card p-6">
          <Rocket className="mb-3 h-8 w-8 text-primary" />
          <p className="text-muted-foreground">{t("about.body1")}</p>
        </div>
        <div className="rounded-lg border border-border bg-card p-6">
          <Handshake className="mb-3 h-8 w-8 text-primary" />
          <p className="text-muted-foreground">{t("about.body2")}</p>
        </div>
      </div>
    </section>
  )
}
