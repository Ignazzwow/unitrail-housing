import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, Globe, Heart } from "lucide-react"
export const metadata = {
  title: "About Us - UniTrail Housing",
  description: "Learn about UniTrail Housing and our mission to help international students find safe, affordable accommodation.",
}

export default function AboutPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              About UniTrail Housing
            </h1>
            <p className="text-lg text-muted-foreground">
              We help international students find safe, affordable, and welcoming accommodation. 
              Our mission is to make your transition to studying abroad as smooth as possible.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="border-border">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified Properties</CardTitle>
                <CardDescription>All listings are checked for safety and quality.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Student Focus</CardTitle>
                <CardDescription>Built for international students.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <Globe className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Multilingual</CardTitle>
                <CardDescription>We speak your language.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <Heart className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Community</CardTitle>
                <CardDescription>Connect with fellow students.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="max-w-2xl mx-auto text-center text-muted-foreground">
            <p className="mb-4">
              UniTrail Housing was founded to simplify the housing search for international students. 
              We understand the challenges of moving to a new country—finding accommodation should not be one of them.
            </p>
            <p>
              Our team works with verified property owners to offer safe, affordable options 
              near universities. We provide support throughout the application process and 
              help you settle into your new home.
            </p>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  )
}
