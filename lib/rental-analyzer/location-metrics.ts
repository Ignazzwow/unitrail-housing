import type { LocationSignalsResult } from "./types"

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/**
 * Deterministic mock location metrics from address + city (no API).
 * Replace with Places / routing APIs when backend is added.
 */
export function getLocationMetrics(address: string, city: string): LocationSignalsResult {
  const key = `${address.trim().toLowerCase()}|${city.trim().toLowerCase()}`
  const h = hashString(key || "default")

  const base = 0.35 + (h % 80) / 200
  const stationKm = Math.round((base + (h % 9) * 0.22) * 10) / 10
  const marketKm = Math.round((base * 1.15 + ((h >> 3) % 7) * 0.18) * 10) / 10
  const transitKm = Math.round((base * 0.95 + ((h >> 5) % 6) * 0.16) * 10) / 10

  const walk = (km: number) => Math.max(4, Math.round((km / 5) * 60))

  const attractiveness: LocationSignalsResult["attractiveness"] =
    stationKm < 1.2 ? "strong" : stationKm < 2.5 ? "moderate" : "developing"
  const tenantFit: LocationSignalsResult["tenantFit"] =
    marketKm < 0.8 && stationKm < 2 ? "excellent" : stationKm < 3 ? "good" : "fair"
  const viability: LocationSignalsResult["viability"] =
    attractiveness === "strong" && tenantFit !== "fair" ? "high" : stationKm < 3 ? "medium" : "watch"

  return {
    stationKm,
    supermarketKm: marketKm,
    transitKm,
    walkMinutesStation: walk(stationKm),
    attractiveness,
    tenantFit,
    viability,
  }
}
