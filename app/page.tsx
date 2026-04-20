import { Navigation } from "@/components/navigation"
import { Hero } from "@/components/hero"
import { HeroSearch } from "@/components/hero-search"
import { Features } from "@/components/features"
import { HowItWorks } from "@/components/how-it-works"
import { Footer } from "@/components/footer"
import { CookieConsent } from "@/components/cookie-consent"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function Home() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <Hero />
        {/* Search box below hero - half visible on first load, pulls up into viewport */}
        <div className="container mx-auto px-4 -mt-16 relative z-10">
          <div className="p-4 md:p-6 rounded-xl bg-background border border-border shadow-lg w-full">
            <h3 className="mb-3 text-sm font-semibold text-foreground">Search accommodation</h3>
            <HeroSearch />
          </div>
        </div>
        <Features />
        <HowItWorks />
        <section className="bg-background py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="mb-6 text-3xl font-bold tracking-tight">Learn More</h2>
            <p className="mb-8 max-w-2xl mx-auto text-muted-foreground">
              Browse accommodation, read our FAQ, learn about us, or get in touch.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <Button asChild>
                <Link href="/for-students">For Students</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/for-landlords">For Landlords</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/faq">FAQ</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/about">About Us</Link>
              </Button>
              <Button variant="outline" asChild>
                <Link href="/contact">Contact</Link>
              </Button>
            </div>
          </div>
        </section>
        <Footer />
      </div>
      <CookieConsent />
    </main>
  )
}
