"use client"

import { useEffect } from "react"
import { applyStoredConsentPreference } from "@/lib/google-analytics"

/** Re-applies stored cookie consent to Google Consent Mode after hydration. */
export function GoogleAnalyticsConsentSync() {
  useEffect(() => {
    applyStoredConsentPreference()
  }, [])

  return null
}
