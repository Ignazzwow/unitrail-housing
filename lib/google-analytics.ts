export const GA_MEASUREMENT_ID =
  process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID?.trim() || "G-22J83ZRT3C"

/** EEA + UK + Switzerland — consent required before analytics/ads storage. */
export const CONSENT_REQUIRED_REGIONS = [
  "AT",
  "BE",
  "BG",
  "HR",
  "CY",
  "CZ",
  "DK",
  "EE",
  "FI",
  "FR",
  "DE",
  "GR",
  "HU",
  "IE",
  "IT",
  "LV",
  "LT",
  "LU",
  "MT",
  "NL",
  "PL",
  "PT",
  "RO",
  "SK",
  "SI",
  "ES",
  "SE",
  "IS",
  "LI",
  "NO",
  "GB",
  "CH",
] as const

export type ConsentState = "granted" | "denied"

export function getGtag(): ((...args: unknown[]) => void) | undefined {
  if (typeof window === "undefined") return undefined
  return window.gtag
}

export function updateGoogleConsent(granted: boolean) {
  const gtag = getGtag()
  if (!gtag) return

  const state: ConsentState = granted ? "granted" : "denied"

  gtag("consent", "update", {
    ad_storage: state,
    analytics_storage: state,
    ad_user_data: state,
    ad_personalization: state,
    personalization_storage: state,
  })
}

export function applyStoredConsentPreference() {
  if (typeof window === "undefined") return

  const stored = localStorage.getItem("cookie-consent")
  if (stored === "accepted") {
    updateGoogleConsent(true)
  } else if (stored === "declined") {
    updateGoogleConsent(false)
  }
}

/** Inline script: must run before gtag.js loads (Consent Mode v2 + regional defaults). */
export function getGoogleConsentDefaultScript(measurementId: string) {
  const regions = JSON.stringify(CONSENT_REQUIRED_REGIONS)

  return `
    window.dataLayer = window.dataLayer || [];
    function gtag(){dataLayer.push(arguments);}
    gtag('js', new Date());

    gtag('consent', 'default', {
      ad_storage: 'denied',
      analytics_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      functionality_storage: 'denied',
      personalization_storage: 'denied',
      security_storage: 'granted',
      wait_for_update: 500,
      region: ${regions}
    });

    gtag('consent', 'default', {
      ad_storage: 'granted',
      analytics_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
      functionality_storage: 'granted',
      personalization_storage: 'granted',
      security_storage: 'granted'
    });

    (function () {
      try {
        var stored = localStorage.getItem('cookie-consent');
        if (stored === 'accepted') {
          gtag('consent', 'update', {
            ad_storage: 'granted',
            analytics_storage: 'granted',
            ad_user_data: 'granted',
            ad_personalization: 'granted',
            personalization_storage: 'granted'
          });
        } else if (stored === 'declined') {
          gtag('consent', 'update', {
            ad_storage: 'denied',
            analytics_storage: 'denied',
            ad_user_data: 'denied',
            ad_personalization: 'denied',
            personalization_storage: 'denied'
          });
        }
      } catch (e) {}
    })();

    gtag('config', '${measurementId}', { anonymize_ip: true });
  `
}

declare global {
  interface Window {
    dataLayer?: unknown[]
    gtag?: (...args: unknown[]) => void
  }
}
