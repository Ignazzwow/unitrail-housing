"use client"

import { SectionShell, KpiTile } from "./SectionShell"
import type { RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { monthlyOperatingCosts, totalMonthlyRevenue, sizeInSqm, requiredRevenueForMargin } from "@/lib/rental-analyzer/calculations"
import { formatCurrencyEUR, displaySize } from "@/lib/rental-analyzer/format"

export function QuickOverviewSection({
  state,
}: {
  state: RentalAnalyzerFormState
}) {
  const baseRent = state.monthlyRent
  const revenue = totalMonthlyRevenue(state)
  const targetRev = requiredRevenueForMargin(monthlyOperatingCosts(state), state.selectedTargetMargin)
  const sqm = sizeInSqm(state)

  return (
    <SectionShell
      title="Quick opportunity snapshot"
      description="High-level KPIs for the scenario: base rent, target revenue at your selected margin, occupancy, size, and startup capital."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
        <KpiTile label="Base rent" value={formatCurrencyEUR(baseRent)} hint="Monthly contract rent" />
        <KpiTile
          label="Target revenue (selected margin)"
          value={formatCurrencyEUR(targetRev)}
          hint={`At ${state.selectedTargetMargin}% target margin`}
          highlight
        />
        <KpiTile
          label="Occupancy (max people)"
          value={`${state.maxOccupancy}`}
          hint="Used for per-person economics"
        />
        <KpiTile
          label="Property size"
          value={displaySize(state.size, state.areaUnit)}
          hint={`≈ ${Math.round(sqm * 10) / 10} m²`}
        />
        <KpiTile
          label="Total recurring revenue"
          value={formatCurrencyEUR(revenue)}
          hint="Rent + custom monthly charges"
        />
        <KpiTile
          label="Initial setup cost"
          value={formatCurrencyEUR(state.setupCost)}
          hint="Capital to recover via monthly profit"
        />
      </div>
    </SectionShell>
  )
}
