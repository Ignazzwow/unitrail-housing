import Script from "next/script"
import { GA_MEASUREMENT_ID, getGoogleConsentDefaultScript } from "@/lib/google-analytics"

export function GoogleAnalytics() {
  if (!GA_MEASUREMENT_ID) return null

  return (
    <>
      <Script id="google-consent-default" strategy="beforeInteractive">
        {getGoogleConsentDefaultScript(GA_MEASUREMENT_ID)}
      </Script>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${GA_MEASUREMENT_ID}`}
        strategy="afterInteractive"
      />
    </>
  )
}
