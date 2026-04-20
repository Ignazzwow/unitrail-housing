"use client"

import dynamic from "next/dynamic"
import { AnalyzerErrorBoundary } from "./AnalyzerErrorBoundary"

const RentalPropertyAnalyzer = dynamic(() => import("./RentalPropertyAnalyzerPage"), {
  ssr: false,
  loading: () => (
    <div className="flex min-h-[40vh] items-center justify-center rounded-xl border border-dashed border-slate-200 bg-slate-50/50 py-12 text-sm text-slate-500">
      Loading Rental Property Analyzer…
    </div>
  ),
})

export function RentalAnalyzerRouteClient() {
  return (
    <AnalyzerErrorBoundary>
      <RentalPropertyAnalyzer />
    </AnalyzerErrorBoundary>
  )
}
