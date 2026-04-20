import type { Metadata } from "next"

export const metadata: Metadata = {
  title: "Datenschutzerklärung | UniTrail Housing",
  description:
    "Datenschutzerklärung gemäß DSGVO (Stand Dezember 2025). Entspricht unitrail-housing.de/datenschutz.",
}

export default function DatenschutzLayout({ children }: { children: React.ReactNode }) {
  return children
}
