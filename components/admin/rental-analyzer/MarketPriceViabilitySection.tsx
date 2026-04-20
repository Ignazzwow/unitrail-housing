"use client"

import { useMemo } from "react"
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { Badge } from "@/components/ui/badge"
import { SectionShell, KpiTile } from "./SectionShell"
import type { MarketVerdict, RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { sizeInSqm, totalMonthlyRevenue } from "@/lib/rental-analyzer/calculations"
import { getMarketBandEstimate, getMarketVerdict } from "@/lib/rental-analyzer/market-insights"
import { formatCurrencyEUR } from "@/lib/rental-analyzer/format"

function verdictMeta(v: MarketVerdict): { label: string; className: string } {
  switch (v) {
    case "below_market":
      return { label: "Below market", className: "bg-slate-100 text-slate-800 border-slate-200" }
    case "market_fit":
      return { label: "Market fit", className: "bg-emerald-50 text-emerald-900 border-emerald-200" }
    case "premium":
      return { label: "Premium", className: "bg-amber-50 text-amber-900 border-amber-200" }
    case "overpriced":
      return { label: "Overpriced", className: "bg-rose-50 text-rose-900 border-rose-200" }
    default:
      return { label: "—", className: "" }
  }
}

export function MarketPriceViabilitySection({ state }: { state: RentalAnalyzerFormState }) {
  const sqm = sizeInSqm(state)
  const myPrice = totalMonthlyRevenue(state)
  const band = useMemo(() => getMarketBandEstimate(state.city, sqm), [state.city, sqm])
  const verdict = useMemo(() => getMarketVerdict(myPrice, band), [myPrice, band])

  const chartData = [
    { name: "Low", value: band.low, fill: "#94a3b8" },
    { name: "Typical", value: band.average, fill: "#64748b" },
    { name: "High", value: band.high, fill: "#475569" },
    { name: "My price", value: myPrice, fill: "#0ea5e9" },
  ]

  const meta = verdictMeta(verdict)

  return (
    <SectionShell
      title="Market price viability"
      description="Mock market band from city + size for UI prototyping. Replace with live comps when an API is available."
    >
      <div className="flex flex-wrap items-center gap-3">
        <span className="text-sm text-slate-600">Verdict</span>
        <Badge variant="outline" className={`rounded-lg border px-3 py-1 text-sm font-semibold ${meta.className}`}>
          {meta.label}
        </Badge>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <KpiTile label="Estimated low" value={formatCurrencyEUR(band.low)} />
        <KpiTile label="Estimated average" value={formatCurrencyEUR(band.average)} />
        <KpiTile label="Estimated high" value={formatCurrencyEUR(band.high)} />
        <KpiTile label="Estimated € / m²" value={`€${band.eurPerSqm}`} hint="Based on mock mid rent" />
      </div>

      <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
        <p className="mb-3 text-sm font-medium text-slate-800">Rent positioning vs band</p>
        <div className="h-[280px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={chartData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
              <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
              <XAxis dataKey="name" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
              <YAxis
                tick={{ fontSize: 11, fill: "#64748b" }}
                axisLine={false}
                tickLine={false}
                tickFormatter={(v) => `€${v}`}
              />
              <Tooltip formatter={(v: number) => formatCurrencyEUR(v)} contentStyle={{ borderRadius: 12 }} />
              <Bar dataKey="value" radius={[8, 8, 0, 0]} isAnimationActive>
                {chartData.map((e) => (
                  <Cell key={e.name} fill={e.fill} />
                ))}
              </Bar>
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </SectionShell>
  )
}
