"use client"

import Image from "next/image"
import { Mail, Phone } from "lucide-react"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useLanguage } from "@/contexts/language-context"

const LANDLORD_PHONE = "+49 176 56800301"
const LANDLORD_PHONE_TEL = "+4917656800301"
const LANDLORD_CONTACT_EMAIL = "paul.worlitzsch@unitrail-housing.de"

export function LandlordContactCard() {
  const { t } = useLanguage()

  return (
    <Card className="h-full border-border bg-card text-left shadow-sm">
      <CardHeader className="pb-4">
        <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
          <Phone className="h-5 w-5 text-primary" />
        </div>
        <CardTitle className="text-card-foreground">{t("contact.callUs")}</CardTitle>
        <a href={`tel:${LANDLORD_PHONE_TEL}`} className="pt-1 text-primary hover:underline">
          {LANDLORD_PHONE}
        </a>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="flex gap-4 border-t border-border pt-4">
          <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
            <Image
              src="/paul-worlitzsch.png"
              alt={t("contact.phoneContactName")}
              fill
              className="object-cover object-top"
              sizes="96px"
            />
          </div>
          <div className="min-w-0 flex-1 space-y-1 text-sm">
            <p className="font-medium text-foreground">{t("contact.phoneContactLine")}</p>
            <p className="text-muted-foreground">{t("contact.phoneContactName")}</p>
          </div>
        </div>
        <a
          href={`mailto:${LANDLORD_CONTACT_EMAIL}`}
          className="inline-flex items-center gap-2 break-all text-sm text-primary hover:underline"
        >
          <Mail className="h-4 w-4 shrink-0" aria-hidden />
          {LANDLORD_CONTACT_EMAIL}
        </a>
        <p className="text-sm text-muted-foreground">{t("contact.hours")}</p>
      </CardContent>
    </Card>
  )
}
