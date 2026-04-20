"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, BookOpen, Home } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function ForStudentsOverview() {
  const { t } = useLanguage()

  return (
    <section className="container mx-auto px-4 py-20">
      <div className="mx-auto mb-16 max-w-3xl text-center">
        <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">{t("forStudentsPage.title")}</h1>
        <p className="text-lg text-muted-foreground">{t("forStudentsPage.lead")}</p>
      </div>

      <div className="mb-16 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
        <Card className="border-border">
          <CardHeader>
            <Home className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("forStudentsPage.cardAccommodationTitle")}</CardTitle>
            <CardDescription>{t("forStudentsPage.cardAccommodationDesc")}</CardDescription>
          </CardHeader>
          <CardContent>
            <Button asChild>
              <Link href="/for-students/accommodation">{t("forStudentsPage.cardAccommodationCta")}</Link>
            </Button>
          </CardContent>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <Shield className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("forStudentsPage.cardVerifiedTitle")}</CardTitle>
            <CardDescription>{t("forStudentsPage.cardVerifiedDesc")}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <BookOpen className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("forStudentsPage.cardProcessTitle")}</CardTitle>
            <CardDescription>{t("forStudentsPage.cardProcessDesc")}</CardDescription>
          </CardHeader>
        </Card>
        <Card className="border-border">
          <CardHeader>
            <Users className="mb-2 h-10 w-10 text-primary" />
            <CardTitle>{t("forStudentsPage.cardCommunityTitle")}</CardTitle>
            <CardDescription>{t("forStudentsPage.cardCommunityDesc")}</CardDescription>
          </CardHeader>
        </Card>
      </div>

      <div className="text-center">
        <Button size="lg" asChild>
          <Link href="/angebote">{t("forStudentsPage.browseCta")}</Link>
        </Button>
      </div>
    </section>
  )
}
