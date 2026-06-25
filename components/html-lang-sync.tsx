"use client"

import { useEffect } from "react"
import { useLanguage } from "@/contexts/language-context"

/** Keeps document lang in sync with the active UI language for screen readers and SEO. */
export function HtmlLangSync() {
  const { language } = useLanguage()

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  return null
}
