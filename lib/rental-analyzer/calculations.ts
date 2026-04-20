import {
  PROFIT_MARGIN_TIERS,
  type ProfitMarginTier,
  type RentalAnalyzerFormState,
  type TierPlanningRow,
  type ActualProfitResult,
} from "./types"
import { sqftToSqm } from "./format"

/** Monthly operating cost model (internal tool — tune when finance rules are defined). */
export function monthlyOperatingCosts(state: RentalAnalyzerFormState): number {
  const rent = Math.max(0, state.monthlyRent)
  const extra = Math.max(0, state.customMonthlyCharge)
  const depositFactor = Math.max(0, state.deposit) * 0.004
  return rent * 0.34 + extra * 0.2 + depositFactor + 180
}

export function totalMonthlyRevenue(state: RentalAnalyzerFormState): number {
  return Math.max(0, state.monthlyRent) + Math.max(0, state.customMonthlyCharge)
}

export function sizeInSqm(state: RentalAnalyzerFormState): number {
  const s = Math.max(0.1, state.size)
  return state.areaUnit === "sqm" ? s : sqftToSqm(s)
}

export function requiredRevenueForMargin(
  operatingCosts: number,
  marginPct: number
): number {
  const m = marginPct / 100
  if (m >= 1 || m <= 0) return operatingCosts
  return operatingCosts / (1 - m)
}

export function netProfitAtRevenue(revenue: number, operatingCosts: number): number {
  return revenue - operatingCosts
}

export function marginPctAtRevenue(revenue: number, operatingCosts: number): number {
  if (revenue <= 0) return 0
  return ((revenue - operatingCosts) / revenue) * 100
}

export function perPersonRent(revenue: number, people: number): number {
  const p = Math.max(1, people)
  return revenue / p
}

export function breakEvenMonths(setupCost: number, monthlyNetProfit: number): number | null {
  if (monthlyNetProfit <= 0) return null
  return setupCost / monthlyNetProfit
}

export function tierPlanningRows(
  state: RentalAnalyzerFormState,
  operatingCosts: number
): TierPlanningRow[] {
  const people = Math.max(1, state.maxOccupancy)
  const setup = Math.max(0, state.setupCost)

  return PROFIT_MARGIN_TIERS.map((marginPct) => {
    const requiredRevenue = requiredRevenueForMargin(operatingCosts, marginPct)
    const netProfit = netProfitAtRevenue(requiredRevenue, operatingCosts)
    return {
      marginPct,
      requiredRevenue,
      netProfit,
      perPersonRent: perPersonRent(requiredRevenue, people),
      breakEvenMonths: breakEvenMonths(setup, netProfit),
    }
  })
}

export function selectedTierRow(
  rows: TierPlanningRow[],
  selected: ProfitMarginTier
): TierPlanningRow | undefined {
  return rows.find((r) => r.marginPct === selected)
}

export function computeActualProfit(
  state: RentalAnalyzerFormState,
  operatingCosts: number
): ActualProfitResult {
  const revenue = Math.max(0, state.actualMonthlyCharge)
  const profit = netProfitAtRevenue(revenue, operatingCosts)
  return {
    revenue,
    operatingCosts,
    profit,
    marginPct: marginPctAtRevenue(revenue, operatingCosts),
    perPersonRent: perPersonRent(revenue, Math.max(1, state.maxOccupancy)),
    breakEvenMonths: breakEvenMonths(Math.max(0, state.setupCost), profit),
  }
}
