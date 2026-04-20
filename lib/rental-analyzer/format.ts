export function formatCurrencyEUR(value: number, compact = false): string {
  if (!Number.isFinite(value)) return "—"
  return new Intl.NumberFormat("de-DE", {
    style: "currency",
    currency: "EUR",
    maximumFractionDigits: compact ? 0 : 0,
    minimumFractionDigits: 0,
  }).format(value)
}

export function formatMonths(m: number | null): string {
  if (m == null || !Number.isFinite(m)) return "—"
  if (m > 240) return "240+"
  return `${Math.round(m * 10) / 10} mo`
}

export function formatPercent(p: number): string {
  if (!Number.isFinite(p)) return "—"
  return `${Math.round(p * 10) / 10}%`
}

export function sqftToSqm(sqft: number): number {
  return sqft * 0.092903
}

export function sqmToSqft(sqm: number): number {
  return sqm / 0.092903
}

export function displaySize(size: number, unit: "sqm" | "sqft"): string {
  if (!Number.isFinite(size)) return "—"
  const u = unit === "sqm" ? "m²" : "ft²"
  return `${Math.round(size * 10) / 10} ${u}`
}
