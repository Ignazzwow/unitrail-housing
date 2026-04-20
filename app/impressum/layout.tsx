import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Impressum | UniTrail Housing",
  description: "Impressum und Anbieterkennzeichnung für UniTrail Housing.",
}

export default function ImpressumLayout({ children }: { children: React.ReactNode }) {
  return children
}
