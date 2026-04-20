"use client"

import { useEffect, useState } from "react"

/**
 * Recharts' ResponsiveContainer can throw when it runs before the parent has layout
 * (common with nested next/dynamic on the admin dashboard). Mount charts after a brief
 * defer so width/height are non-zero.
 */
export function ChartMountGate({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    const t = window.setTimeout(() => setReady(true), 50)
    return () => clearTimeout(t)
  }, [])

  if (!ready) {
    return (
      <div className="space-y-6" aria-hidden>
        <div className="h-52 animate-pulse rounded-3xl bg-slate-100/90" />
        <div className="h-52 animate-pulse rounded-3xl bg-slate-100/90" />
        <div className="h-52 animate-pulse rounded-3xl bg-slate-100/90" />
        <p className="text-center text-xs text-slate-500">Preparing charts…</p>
      </div>
    )
  }

  return <>{children}</>
}
