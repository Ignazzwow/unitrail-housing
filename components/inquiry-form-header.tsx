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
      <h1 className="mb-2 break-words text-2xl font-bold tracking-tight sm:text-3xl">
        {t("inquiryPage.titlePrefix")} {title}
      </h1>
      <p className="mb-8 break-words text-muted-foreground">
        {location} - {price} {t("inquiryPage.perMonth")}
      </p>
    </>
  )
}
