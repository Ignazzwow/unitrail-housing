import type { MarketBandEstimate, MarketVerdict } from "./types"

function hashString(s: string): number {
  let h = 0
  for (let i = 0; i < s.length; i++) h = (Math.imul(31, h) + s.charCodeAt(i)) | 0
  return Math.abs(h)
}

/**
 * Mock market rent bands from city + size (€/month). Replace with comps API later.
 */
export function getMarketBandEstimate(city: string, sizeSqm: number): MarketBandEstimate {
  const h = hashString(city.trim().toLowerCase() || "berlin")
  const cityFactor = 8 + (h % 12) + (h % 7) * 0.4
  const basePerSqm = cityFactor + Math.min(6, sizeSqm / 40)
  const mid = Math.round(sizeSqm * basePerSqm)
  const low = Math.round(mid * 0.78)
  const high = Math.round(mid * 1.28)
  const eurPerSqm = sizeSqm > 0 ? Math.round((mid / sizeSqm) * 10) / 10 : 0
  return { low, average: mid, high, eurPerSqm }
}

export function getMarketVerdict(myMonthlyRent: number, band: MarketBandEstimate): MarketVerdict {
  if (myMonthlyRent < band.low * 0.92) return "below_market"
  if (myMonthlyRent > band.high * 1.08) return "overpriced"
  if (myMonthlyRent > band.average * 1.05) return "premium"
  return "market_fit"
}
