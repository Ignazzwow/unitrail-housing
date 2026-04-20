import type { ReactNode } from "react"
import { cn } from "@/lib/utils"

export function SectionShell({
  title,
  description,
  children,
  className,
}: {
  title: string
  description: string
  children: ReactNode
  className?: string
}) {
  return (
    <section
      className={cn(
        "rounded-3xl border border-slate-200/90 bg-white p-6 shadow-sm transition-shadow hover:shadow-md md:p-8",
        className
      )}
    >
      <header className="mb-6 border-b border-slate-100 pb-5">
        <h2 className="text-lg font-semibold tracking-tight text-slate-900">{title}</h2>
        <p className="mt-1.5 max-w-3xl text-sm leading-relaxed text-slate-500">{description}</p>
      </header>
      <div className="space-y-6">{children}</div>
    </section>
  )
}

export function KpiTile({
  label,
  value,
  hint,
  highlight,
}: {
  label: string
  value: string
  hint?: string
  highlight?: boolean
}) {
  return (
    <div
      className={cn(
        "rounded-2xl border p-4 transition-colors",
        highlight
          ? "border-primary/40 bg-primary/[0.06] shadow-sm"
          : "border-slate-200/80 bg-slate-50/50 hover:border-slate-300/90"
      )}
    >
      <p className="text-xs font-medium uppercase tracking-wide text-slate-500">{label}</p>
      <p className="mt-2 text-xl font-semibold tabular-nums tracking-tight text-slate-900">{value}</p>
      {hint ? <p className="mt-1 text-xs text-slate-500">{hint}</p> : null}
    </div>
  )
}
