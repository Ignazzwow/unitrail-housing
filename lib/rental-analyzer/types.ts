export type AreaUnit = "sqm" | "sqft"

export type PropertyAge = "new" | "existing"

export const PROFIT_MARGIN_TIERS = [20, 25, 30, 35, 40, 45, 50, 60] as const

export type ProfitMarginTier = (typeof PROFIT_MARGIN_TIERS)[number]

export interface RentalAnalyzerFormState {
  address: string
  city: string
  size: number
  areaUnit: AreaUnit
  bedrooms: number
  propertyAge: PropertyAge
  floor: number
  monthlyRent: number
  deposit: number
  setupCost: number
  maxOccupancy: number
  customMonthlyCharge: number
  /** User-entered monthly charge for "Actual" section */
  actualMonthlyCharge: number
  selectedTargetMargin: ProfitMarginTier
}

export const DEFAULT_RENTAL_ANALYZER_STATE: RentalAnalyzerFormState = {
  address: "",
  city: "Berlin",
  size: 65,
  areaUnit: "sqm",
  bedrooms: 2,
  propertyAge: "existing",
  floor: 3,
  monthlyRent: 1200,
  deposit: 2400,
  setupCost: 8500,
  maxOccupancy: 3,
  customMonthlyCharge: 120,
  actualMonthlyCharge: 1350,
  selectedTargetMargin: 35,
}

export type MarketVerdict = "below_market" | "market_fit" | "premium" | "overpriced"

export interface LocationSignalsResult {
  stationKm: number
  supermarketKm: number
  transitKm: number
  walkMinutesStation: number
  attractiveness: "strong" | "moderate" | "developing"
  tenantFit: "excellent" | "good" | "fair"
  viability: "high" | "medium" | "watch"
}

export interface MarketBandEstimate {
  low: number
  average: number
  high: number
  eurPerSqm: number
}

export interface TierPlanningRow {
  marginPct: ProfitMarginTier
  requiredRevenue: number
  netProfit: number
  perPersonRent: number
  breakEvenMonths: number | null
}

export interface ActualProfitResult {
  revenue: number
  operatingCosts: number
  profit: number
  marginPct: number
  perPersonRent: number
  breakEvenMonths: number | null
}
