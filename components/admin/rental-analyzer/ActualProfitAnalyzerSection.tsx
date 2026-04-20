"use client"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip } from "recharts"
import { SectionShell, KpiTile } from "./SectionShell"
import type { RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { computeActualProfit, monthlyOperatingCosts } from "@/lib/rental-analyzer/calculations"
import { formatCurrencyEUR, formatMonths, formatPercent } from "@/lib/rental-analyzer/format"

export function ActualProfitAnalyzerSection({
  state,
  onChange,
}: {
  state: RentalAnalyzerFormState
  onChange: (patch: Partial<RentalAnalyzerFormState>) => void
}) {
  const op = monthlyOperatingCosts(state)
  const actual = computeActualProfit(state, op)

  const marginPie = [
    { name: "Margin", value: Math.min(100, Math.max(0, actual.marginPct)), fill: "#0ea5e9" },
    {
      name: "Rest",
      value: Math.max(0, 100 - Math.min(100, actual.marginPct)),
      fill: "#e2e8f0",
    },
  ]

  const people = Math.max(1, state.maxOccupancy)
  const perPersonEqual = actual.perPersonRent
  const perPersonPie = Array.from({ length: Math.min(people, 8) }, (_, i) => ({
    name: `P${i + 1}`,
    value: 1,
    fill: ["#0ea5e9", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#f97316", "#eab308", "#22c55e"][i % 8],
  }))

  return (
    <SectionShell
      title="Actual profit analyzer"
      description="Model your own monthly charge to see realized margin, per-person rent, break-even, and distribution charts."
    >
      <div className="max-w-md space-y-2">
        <Label htmlFor="actualCharge" className="text-slate-700">
          Your monthly charge (€)
        </Label>
        <Input
          id="actualCharge"
          type="number"
          min={0}
          step={50}
          value={state.actualMonthlyCharge || ""}
          onChange={(e) => onChange({ actualMonthlyCharge: Number(e.target.value) || 0 })}
          className="rounded-xl border-slate-200 bg-white"
        />
        <p className="text-xs text-slate-500">Independent of target margin — tests a concrete pricing scenario.</p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Actual revenue" value={formatCurrencyEUR(actual.revenue)} />
        <KpiTile label="Operating costs (modeled)" value={formatCurrencyEUR(actual.operatingCosts)} />
        <KpiTile label="Actual profit" value={formatCurrencyEUR(actual.profit)} highlight />
        <KpiTile label="Actual margin" value={formatPercent(actual.marginPct)} />
        <KpiTile label="Actual per-person rent" value={formatCurrencyEUR(actual.perPersonRent)} />
        <KpiTile label="Break-even (setup)" value={formatMonths(actual.breakEvenMonths)} />
      </div>

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
          <p className="mb-1 text-sm font-medium text-slate-800">Actual margin (radial)</p>
          <p className="mb-3 text-xs text-slate-500">Share of revenue retained after modeled operating costs</p>
          <div className="relative mx-auto h-[240px] w-[240px]">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={marginPie}
                  dataKey="value"
                  startAngle={90}
                  endAngle={-270}
                  innerRadius={68}
                  outerRadius={100}
                  stroke="none"
                  isAnimationActive
                >
                  {marginPie.map((entry) => (
                    <Cell key={entry.name} fill={entry.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={(v: number) => `${Math.round(v * 10) / 10}%`} />
              </PieChart>
            </ResponsiveContainer>
            <div className="pointer-events-none absolute inset-0 flex flex-col items-center justify-center">
              <span className="text-3xl font-bold tabular-nums text-slate-900">
                {Math.round(actual.marginPct * 10) / 10}%
              </span>
              <span className="text-xs text-slate-500">margin</span>
            </div>
          </div>
        </div>

        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
          <p className="mb-1 text-sm font-medium text-slate-800">Per-person pie (equal split)</p>
          <p className="mb-3 text-xs text-slate-500">
            {formatCurrencyEUR(perPersonEqual)} / person · {people} occupant{people > 1 ? "s" : ""}
          </p>
          <div className="h-[240px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie
                  data={perPersonPie}
                  dataKey="value"
                  innerRadius={52}
                  outerRadius={88}
                  paddingAngle={2}
                  isAnimationActive
                >
                  {perPersonPie.map((e) => (
                    <Cell key={e.name} fill={e.fill} />
                  ))}
                </Pie>
                <Tooltip formatter={() => formatCurrencyEUR(perPersonEqual)} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </SectionShell>
  )
}
