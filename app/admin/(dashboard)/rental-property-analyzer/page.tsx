import { RentalAnalyzerRouteClient } from "@/components/admin/rental-analyzer/RentalAnalyzerRouteClient"

export const metadata = {
  title: "Rental Property Analyzer | UniTrail Housing Admin",
  description: "Internal analytics for rental opportunity evaluation.",
}

export default function RentalPropertyAnalyzerRoutePage() {
  return <RentalAnalyzerRouteClient />
}
