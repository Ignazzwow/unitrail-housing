import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { FAQ } from "@/components/faq"

export const metadata = {
  title: "FAQ - UniTrail Housing",
  description: "Frequently asked questions about UniTrail Housing student accommodation services.",
}

export default function FAQPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <FAQ />
        <Footer />
      </div>
    </main>
  )
}
