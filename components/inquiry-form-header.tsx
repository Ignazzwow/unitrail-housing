"use client"

import { useLanguage } from "@/contexts/language-context"

type InquiryFormHeaderProps = {
  title: string
  location: string
  price: string | number
}

export function InquiryFormHeader({ title, location, price }: InquiryFormHeaderProps) {
  const { t } = useLanguage()

  return (
    <>
      <h1 className="mb-2 text-3xl font-bold tracking-tight">
        {t("inquiryPage.titlePrefix")} {title}
      </h1>
      <p className="mb-8 text-muted-foreground">
        {location} - {price} {t("inquiryPage.perMonth")}
      </p>
    </>
  )
}
