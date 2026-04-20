"use client"

import { useMemo } from "react"
import { Train, ShoppingCart, Bus, Footprints, Sparkles, Users, Activity } from "lucide-react"
import { Badge } from "@/components/ui/badge"
import { SectionShell, KpiTile } from "./SectionShell"
import type { RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { getLocationMetrics } from "@/lib/rental-analyzer/location-metrics"

function attractivenessMeta(v: string): { text: string; variant: "default" | "secondary" | "outline" } {
  if (v === "strong") return { text: "Strong", variant: "default" }
  if (v === "moderate") return { text: "Moderate", variant: "secondary" }
  return { text: "Developing", variant: "outline" }
}
function tenantMeta(v: string): { text: string; variant: "default" | "secondary" | "outline" } {
  if (v === "excellent") return { text: "Excellent", variant: "default" }
  if (v === "good") return { text: "Good", variant: "secondary" }
  return { text: "Fair", variant: "outline" }
}
function viabilityMeta(v: string): { text: string; variant: "default" | "secondary" | "outline" } {
  if (v === "high") return { text: "High", variant: "default" }
  if (v === "medium") return { text: "Medium", variant: "secondary" }
  return { text: "Watch", variant: "outline" }
}

export function LocationSignalsSection({ state }: { state: RentalAnalyzerFormState }) {
  const loc = useMemo(() => getLocationMetrics(state.address, state.city), [state.address, state.city])

  return (
    <SectionShell
      title="Location & property signals"
      description="Deterministic mock signals from address + city for UI prototyping. Swap for live routing / POI data when APIs are connected."
    >
      <div className="grid gap-4 md:grid-cols-3">
        <KpiTile
          label="Distance to central station"
          value={`${loc.stationKm} km`}
          hint={`~${loc.walkMinutesStation} min walk`}
        />
        <KpiTile label="Supermarket distance" value={`${loc.supermarketKm} km`} />
        <KpiTile label="Public transport access" value={`${loc.transitKm} km`} />
      </div>

      <div className="grid gap-4 md:grid-cols-3">
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <Train className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Station access</p>
            <p className="mt-1 text-xs text-slate-500">Primary commuter anchor for tenant demand.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <ShoppingCart className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Daily needs</p>
            <p className="mt-1 text-xs text-slate-500">Grocery & essentials within reach.</p>
          </div>
        </div>
        <div className="flex items-start gap-3 rounded-2xl border border-slate-200/80 bg-slate-50/60 p-4">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white shadow-sm">
            <Bus className="h-5 w-5 text-slate-700" />
          </div>
          <div>
            <p className="text-sm font-medium text-slate-900">Transit mesh</p>
            <p className="mt-1 text-xs text-slate-500">Secondary lines & bus coverage.</p>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap items-center gap-2 border-t border-slate-100 pt-6">
        <Footprints className="h-4 w-4 text-slate-400" />
        <span className="text-xs font-medium uppercase tracking-wide text-slate-500">Indicators</span>
        <Badge variant={attractivenessMeta(loc.attractiveness).variant} className="rounded-lg">
          <Sparkles className="mr-1 h-3 w-3" />
          Attractiveness · {attractivenessMeta(loc.attractiveness).text}
        </Badge>
        <Badge variant={tenantMeta(loc.tenantFit).variant} className="rounded-lg">
          <Users className="mr-1 h-3 w-3" />
          Tenant fit · {tenantMeta(loc.tenantFit).text}
        </Badge>
        <Badge variant={viabilityMeta(loc.viability).variant} className="rounded-lg">
          <Activity className="mr-1 h-3 w-3" />
          Viability · {viabilityMeta(loc.viability).text}
        </Badge>
      </div>
    </SectionShell>
  )
}
