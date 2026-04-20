"use client"

import { SectionShell } from "./SectionShell"
import type { RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { monthlyOperatingCosts, tierPlanningRows } from "@/lib/rental-analyzer/calculations"
import { formatCurrencyEUR, formatMonths } from "@/lib/rental-analyzer/format"
import { cn } from "@/lib/utils"

export function BreakEvenTimelineSection({ state }: { state: RentalAnalyzerFormState }) {
  const op = monthlyOperatingCosts(state)
  const rows = tierPlanningRows(state, op)

  return (
    <SectionShell
      title="Break-even timeline"
      description="Monthly profit and months to recover startup investment for every margin tier. Your selected tier is highlighted."
    >
      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {rows.map((r) => {
          const selected = r.marginPct === state.selectedTargetMargin
          return (
            <div
              key={r.marginPct}
              className={cn(
                "rounded-2xl border p-4 transition-all",
                selected
                  ? "border-primary bg-primary/[0.07] shadow-md ring-2 ring-primary/25"
                  : "border-slate-200/80 bg-slate-50/40 hover:border-slate-300/90"
              )}
            >
              <div className="flex items-center justify-between gap-2">
                <span className="text-sm font-semibold text-slate-900">{r.marginPct}% tier</span>
                {selected ? (
                  <span className="rounded-md bg-primary px-2 py-0.5 text-[10px] font-bold uppercase tracking-wide text-primary-foreground">
                    Selected
                  </span>
                ) : null}
              </div>
              <div className="mt-4 space-y-3">
                <div
                  className={cn(
                    "rounded-xl border p-3",
                    selected ? "border-primary/40 bg-white" : "border-slate-200/80 bg-white/80"
                  )}
                >
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">Monthly profit</p>
                  <p className="mt-1 text-xl font-semibold tabular-nums text-slate-900">
                    {formatCurrencyEUR(r.netProfit)}
                  </p>
                </div>
                <div className="rounded-xl border border-slate-200/80 bg-white/80 p-3">
                  <p className="text-xs font-medium uppercase tracking-wide text-slate-500">
                    Months to recover setup
                  </p>
                  <p className="mt-1 text-lg font-semibold tabular-nums text-slate-900">
                    {formatMonths(r.breakEvenMonths)}
                  </p>
                  <p className="mt-1 text-xs text-slate-500">
                    vs {formatCurrencyEUR(state.setupCost)} initial setup
                  </p>
                </div>
              </div>
            </div>
          )
        })}
      </div>
    </SectionShell>
  )
}
