"use client"

import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts"
import { SectionShell, KpiTile } from "./SectionShell"
import { PROFIT_MARGIN_TIERS, type RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import {
  monthlyOperatingCosts,
  tierPlanningRows,
  selectedTierRow,
} from "@/lib/rental-analyzer/calculations"
import { formatCurrencyEUR, formatMonths } from "@/lib/rental-analyzer/format"
import { cn } from "@/lib/utils"

const CHART_COLORS = ["#0ea5e9", "#6366f1", "#8b5cf6", "#a855f7", "#d946ef", "#f97316", "#eab308", "#22c55e"]

export function TargetProfitPlanningSection({
  state,
  onSelectMargin,
}: {
  state: RentalAnalyzerFormState
  onSelectMargin: (m: (typeof PROFIT_MARGIN_TIERS)[number]) => void
}) {
  const op = monthlyOperatingCosts(state)
  const rows = tierPlanningRows(state, op)
  const selected = selectedTierRow(rows, state.selectedTargetMargin)

  const barData = rows.map((r) => ({
    tier: `${r.marginPct}%`,
    revenue: Math.round(Number.isFinite(r.requiredRevenue) ? r.requiredRevenue : 0),
    margin: r.marginPct,
  }))

  const pieData =
    selected && selected.requiredRevenue > 0
      ? [
          { name: "Operating", value: Math.max(0, op), fill: "#94a3b8" },
          {
            name: "Net profit",
            value: Math.max(0, selected.netProfit),
            fill: "#0ea5e9",
          },
        ]
      : []

  const people = Math.max(1, state.maxOccupancy)
  const perPersonPie = Array.from({ length: Math.min(people, 8) }, (_, i) => ({
    name: `Person ${i + 1}`,
    value: 1,
    fill: CHART_COLORS[i % CHART_COLORS.length],
  }))

  const revenueSplitTotal = pieData.reduce((a, p) => a + p.value, 0)

  return (
    <SectionShell
      title="Target profit planning"
      description="Pick a margin tier to see required revenue, per-person rent, profit, and break-even against your setup cost. Charts update instantly — no API calls."
    >
      <div className="flex flex-wrap gap-2">
        {PROFIT_MARGIN_TIERS.map((m) => (
          <button
            key={m}
            type="button"
            onClick={() => onSelectMargin(m)}
            className={cn(
              "rounded-xl border px-3.5 py-2 text-sm font-semibold tabular-nums transition-all",
              state.selectedTargetMargin === m
                ? "border-primary bg-primary text-primary-foreground shadow-md ring-2 ring-primary/30"
                : "border-slate-200 bg-white text-slate-700 hover:border-slate-300 hover:bg-slate-50"
            )}
          >
            {m}%
          </button>
        ))}
      </div>

      {selected ? (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          <KpiTile label="Required total revenue" value={formatCurrencyEUR(selected.requiredRevenue)} highlight />
          <KpiTile label="Target per-person rent" value={formatCurrencyEUR(selected.perPersonRent)} />
          <KpiTile label="Net profit (monthly)" value={formatCurrencyEUR(selected.netProfit)} />
          <KpiTile
            label="Break-even (setup)"
            value={formatMonths(selected.breakEvenMonths)}
            hint="Months to recover initial setup"
          />
        </div>
      ) : null}

      <div className="grid gap-6 lg:grid-cols-2">
        <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
          <p className="mb-3 text-sm font-medium text-slate-800">Revenue by margin tier</p>
          <div className="h-[280px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={barData} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" vertical={false} />
                <XAxis dataKey="tier" tick={{ fontSize: 11, fill: "#64748b" }} axisLine={false} tickLine={false} />
                <YAxis
                  tick={{ fontSize: 11, fill: "#64748b" }}
                  axisLine={false}
                  tickLine={false}
                  tickFormatter={(v) => `€${v / 1000}k`}
                />
                <Tooltip
                  formatter={(v: number) => [formatCurrencyEUR(v), "Revenue"]}
                  contentStyle={{ borderRadius: 12, border: "1px solid #e2e8f0" }}
                />
                <Bar dataKey="revenue" radius={[8, 8, 0, 0]} isAnimationActive>
                  {barData.map((entry) => (
                    <Cell
                      key={entry.tier}
                      fill={entry.margin === state.selectedTargetMargin ? "#0ea5e9" : "#cbd5e1"}
                      className="transition-colors"
                    />
                  ))}
                </Bar>
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="grid gap-4">
          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
            <p className="mb-1 text-sm font-medium text-slate-800">Revenue split (operating vs profit)</p>
            <p className="mb-3 text-xs text-slate-500">At selected {state.selectedTargetMargin}% margin target</p>
            <div className="h-[220px] w-full">
              {pieData.length > 0 && revenueSplitTotal > 0 ? (
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={pieData}
                      dataKey="value"
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={88}
                      paddingAngle={2}
                      isAnimationActive
                    >
                      {pieData.map((entry) => (
                        <Cell key={entry.name} fill={entry.fill} />
                      ))}
                    </Pie>
                    <Tooltip formatter={(v: number) => formatCurrencyEUR(v)} />
                  </PieChart>
                </ResponsiveContainer>
              ) : (
                <div className="flex h-full min-h-[200px] items-center justify-center text-center text-xs text-slate-500">
                  Select a margin tier and ensure rent inputs are set to see the revenue split.
                </div>
              )}
            </div>
            <div className="flex flex-wrap gap-3 text-xs text-slate-600">
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-slate-400" /> Operating
              </span>
              <span className="flex items-center gap-1">
                <span className="h-2 w-2 rounded-full bg-sky-500" /> Net profit
              </span>
            </div>
          </div>

          <div className="rounded-2xl border border-slate-200/80 bg-slate-50/40 p-4">
            <p className="mb-1 text-sm font-medium text-slate-800">Per-person rent share</p>
            <p className="mb-3 text-xs text-slate-500">Equal split across {people} occupant{people > 1 ? "s" : ""}</p>
            <div className="h-[200px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={perPersonPie}
                    dataKey="value"
                    cx="50%"
                    cy="50%"
                    innerRadius={48}
                    outerRadius={80}
                    paddingAngle={1}
                    isAnimationActive
                  >
                    {perPersonPie.map((e, i) => (
                      <Cell key={e.name} fill={e.fill} />
                    ))}
                  </Pie>
                  <Tooltip formatter={() => formatCurrencyEUR(selected?.perPersonRent ?? 0)} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          </div>
        </div>
      </div>

      <p className="text-xs text-slate-500">
        Operating baseline: {formatCurrencyEUR(op)}/mo ·         Implied margin at target:{" "}
        {selected && selected.requiredRevenue > 0
          ? `${Math.round((selected.netProfit / selected.requiredRevenue) * 1000) / 10}%`
          : "—"}
      </p>
    </SectionShell>
  )
}
