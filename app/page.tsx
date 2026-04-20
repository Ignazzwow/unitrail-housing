import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { HomeHeroSearchSection } from "@/components/home-hero-search-section"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { HomeLearnMore } from "@/components/home-learn-more"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <HomeHeroSearchSection />
        <Features />
        <HowItWorks />
        <HomeLearnMore />
        <Footer />
      </div>
      <CookieConsent />
    </main>
  )
}
