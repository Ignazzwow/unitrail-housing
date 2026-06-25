import { Suspense } from "react"
import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { HomeHeroSearchSection } from "@/components/home-hero-search-section"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { HomeLearnMore } from "@/components/home-learn-more"
import { NurembergWgSection } from "@/components/nuremberg-wg-section"
import { Contact } from "@/components/contact"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        <HomeHeroSearchSection />
        <NurembergWgSection />
        <Features />
        <HowItWorks />
        <Suspense fallback={<div className="min-h-[24rem] bg-secondary/20 py-20" aria-hidden />}>
          <Contact />
        </Suspense>
        <HomeLearnMore />
        <Footer />
      </div>
    </main>
  )
}
