import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { ForStudentsOverview } from "@/components/for-students-overview"

export const metadata = {
  title: "For Students - UniTrail Housing",
  description: "Find safe, affordable accommodation for international students. Verified properties, easy process, student community.",
}

export default function ForStudentsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <ForStudentsOverview />
        <Footer />
      </div>
    </main>
  )
}
