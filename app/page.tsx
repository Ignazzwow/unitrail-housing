import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { FAQ } from "@/components/faq"
import { Contact } from "@/components/contact"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <Features />
        <HowItWorks />
        <FAQ />
        <Contact />
        <Footer />
      </div>
      <CookieConsent />
    </main>
  )
}
