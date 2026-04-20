"use client"

import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import { SectionShell } from "./SectionShell"
import type { RentalAnalyzerFormState } from "@/lib/rental-analyzer/types"
import { cn } from "@/lib/utils"

export function PropertyInputsSection({
  state,
  onChange,
}: {
  state: RentalAnalyzerFormState
  onChange: (patch: Partial<RentalAnalyzerFormState>) => void
}) {
  return (
    <SectionShell
      title="Property inputs"
      description="Capture the listing fundamentals. Values drive opportunity, margin, and break-even models across this workspace."
    >
      <div className="grid gap-6 md:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="address" className="text-slate-700">
            Property address
          </Label>
          <Input
            id="address"
            value={state.address}
            onChange={(e) => onChange({ address: e.target.value })}
            placeholder="Street, number"
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="city" className="text-slate-700">
            City
          </Label>
          <Input
            id="city"
            value={state.city}
            onChange={(e) => onChange({ city: e.target.value })}
            placeholder="City"
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <Label htmlFor="size" className="text-slate-700">
              Size
            </Label>
            <div className="flex rounded-lg border border-slate-200 bg-slate-50 p-0.5 text-xs font-medium">
              {(["sqm", "sqft"] as const).map((u) => (
                <button
                  key={u}
                  type="button"
                  onClick={() => onChange({ areaUnit: u })}
                  className={cn(
                    "rounded-md px-3 py-1 transition-colors",
                    state.areaUnit === u
                      ? "bg-white text-slate-900 shadow-sm"
                      : "text-slate-500 hover:text-slate-800"
                  )}
                >
                  {u === "sqm" ? "m²" : "ft²"}
                </button>
              ))}
            </div>
          </div>
          <Input
            id="size"
            type="number"
            min={1}
            step={1}
            value={state.size || ""}
            onChange={(e) => onChange({ size: Number(e.target.value) || 0 })}
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="text-slate-700">
            Bedrooms
          </Label>
          <Input
            id="bedrooms"
            type="number"
            min={0}
            step={1}
            value={state.bedrooms || ""}
            onChange={(e) => onChange({ bedrooms: Number(e.target.value) || 0 })}
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label className="text-slate-700">Property age</Label>
          <div className="flex gap-2">
            {(["new", "existing"] as const).map((age) => (
              <button
                key={age}
                type="button"
                onClick={() => onChange({ propertyAge: age })}
                className={cn(
                  "flex-1 rounded-xl border px-4 py-2.5 text-sm font-medium transition-all",
                  state.propertyAge === age
                    ? "border-primary bg-primary text-primary-foreground shadow-sm"
                    : "border-slate-200 bg-white text-slate-600 hover:border-slate-300"
                )}
              >
                {age === "new" ? "New build" : "Existing"}
              </button>
            ))}
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="floor" className="text-slate-700">
            Floor
          </Label>
          <Input
            id="floor"
            type="number"
            step={1}
            value={state.floor ?? ""}
            onChange={(e) => onChange({ floor: Number(e.target.value) || 0 })}
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="rent" className="text-slate-700">
            Monthly rent (€)
          </Label>
          <Input
            id="rent"
            type="number"
            min={0}
            step={50}
            value={state.monthlyRent || ""}
            onChange={(e) => onChange({ monthlyRent: Number(e.target.value) || 0 })}
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="deposit" className="text-slate-700">
            Deposit (€)
          </Label>
          <Input
            id="deposit"
            type="number"
            min={0}
            step={100}
            value={state.deposit || ""}
            onChange={(e) => onChange({ deposit: Number(e.target.value) || 0 })}
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="space-y-2">
          <Label htmlFor="setup" className="text-slate-700">
            Initial setup cost (€)
          </Label>
          <Input
            id="setup"
            type="number"
            min={0}
            step={100}
            value={state.setupCost || ""}
            onChange={(e) => onChange({ setupCost: Number(e.target.value) || 0 })}
            className="rounded-xl border-slate-200 bg-white"
          />
        </div>
        <div className="md:col-span-2 space-y-4">
          <div className="flex items-center justify-between">
            <Label className="text-slate-700">Max occupancy (people)</Label>
            <span className="text-sm font-semibold tabular-nums text-slate-900">{state.maxOccupancy}</span>
          </div>
          <Slider
            value={[state.maxOccupancy]}
            onValueChange={([v]) => onChange({ maxOccupancy: v })}
            min={1}
            max={12}
            step={1}
            className="py-2"
          />
        </div>
        <div className="md:col-span-2 space-y-2">
          <Label htmlFor="customCharge" className="text-slate-700">
            Custom monthly charge (€)
          </Label>
          <Input
            id="customCharge"
            type="number"
            min={0}
            step={10}
            value={state.customMonthlyCharge || ""}
            onChange={(e) => onChange({ customMonthlyCharge: Number(e.target.value) || 0 })}
            className="max-w-md rounded-xl border-slate-200 bg-white"
          />
          <p className="text-xs text-slate-500">
            Add-ons such as parking, utilities flat-rate, or service fees included in recurring revenue.
          </p>
        </div>
      </div>
    </SectionShell>
  )
}
