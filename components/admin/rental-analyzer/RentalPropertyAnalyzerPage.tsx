"use client"

import { useCallback, useState } from "react"
import { BarChart3 } from "lucide-react"
import { DEFAULT_RENTAL_ANALYZER_STATE, type RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { PropertyInputsSection } from "./PropertyInputsSection"
import { QuickOverviewSection } from "./QuickOverviewSection"
import { LocationSignalsSection } from "./LocationSignalsSection"
import { TargetProfitPlanningSection } from "./TargetProfitPlanningSection"
import { ActualProfitAnalyzerSection } from "./ActualProfitAnalyzerSection"
import { MarketPriceViabilitySection } from "./MarketPriceViabilitySection"
import { BreakEvenTimelineSection } from "./BreakEvenTimelineSection"
import { ChartMountGate } from "./ChartMountGate"

export default function RentalPropertyAnalyzerPage() {
  const [state, setState] = useState<RentalAnalyzerFormState>(DEFAULT_RENTAL_ANALYZER_STATE)

  const patch = useCallback((p: Partial<RentalAnalyzerFormState>) => {
    setState((s) => ({ ...s, ...p }))
  }, [])

  return (
    <div className="mx-auto max-w-5xl space-y-8 pb-16">
      <header className="rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm md:p-8">
        <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
          <div className="space-y-2">
            <div className="flex items-center gap-2 text-slate-500">
              <BarChart3 className="h-5 w-5 text-primary" aria-hidden />
              <span className="text-xs font-semibold uppercase tracking-wider">Internal analytics</span>
            </div>
            <h1 className="text-2xl font-semibold tracking-tight text-slate-900 md:text-3xl">
              Rental Property Analyzer
            </h1>
            <p className="max-w-2xl text-sm leading-relaxed text-slate-600">
              Evaluate rental opportunities with margin planning, market positioning, and break-even timelines. All
              figures run client-side for fast iteration — connect APIs when you are ready.
            </p>
          </div>
          <div className="rounded-2xl border border-dashed border-slate-200 bg-slate-50/80 px-4 py-3 text-xs text-slate-600">
            <p className="font-medium text-slate-800">Workspace</p>
            <p className="mt-1">
              Inputs → snapshots → signals → planning → actuals → market → break-even. Scroll vertically; each block is
              independent.
            </p>
          </div>
        </div>
      </header>

      <PropertyInputsSection state={state} onChange={patch} />
      <QuickOverviewSection state={state} />
      <LocationSignalsSection state={state} />
      <ChartMountGate>
        <TargetProfitPlanningSection state={state} onSelectMargin={(m) => patch({ selectedTargetMargin: m })} />
        <ActualProfitAnalyzerSection state={state} onChange={patch} />
        <MarketPriceViabilitySection state={state} />
      </ChartMountGate>
      <BreakEvenTimelineSection state={state} />
    </div>
  )
}
