import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Contact } from "@/components/contact"

export const metadata = {
  title: "Contact Us - UniTrail Housing",
  description: "Get in touch with UniTrail Housing. We're here to help with your accommodation needs.",
}

export default function ContactPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Suspense fallback={<div className="min-h-[24rem] bg-secondary/20 py-20" aria-hidden />}>
          <Contact />
        </Suspense>
        <Footer />
      </div>
    </main>
  )
}
