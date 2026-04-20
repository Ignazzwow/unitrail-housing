import { Navigation } from "@/components/navigation"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Shield, Users, BookOpen, Home } from "lucide-react"
import Link from "next/link"

export const metadata = {
  title: "For Students - UniTrail Housing",
  description: "Find safe, affordable accommodation for international students. Verified properties, easy process, student community.",
}

export default function ForStudentsPage() {
  return (
    <main className="min-h-screen">
      <Navigation />
      <div className="pt-16">
        <section className="container mx-auto px-4 py-20">
          <div className="mx-auto max-w-3xl text-center mb-16">
            <h1 className="mb-6 text-4xl font-bold tracking-tight md:text-5xl">
              For Students
            </h1>
            <p className="text-lg text-muted-foreground">
              UniTrail Housing makes finding accommodation easy for international students. 
              Browse verified properties, apply online, and move in with confidence.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4 mb-16">
            <Card className="border-border">
              <CardHeader>
                <Home className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Accommodation</CardTitle>
                <CardDescription>Browse our verified listings and find your perfect home.</CardDescription>
              </CardHeader>
              <CardContent>
                <Button asChild>
                  <Link href="/for-students/accommodation">View Accommodation</Link>
                </Button>
              </CardContent>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <Shield className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Verified Properties</CardTitle>
                <CardDescription>All listings are checked for safety and quality.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <BookOpen className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Easy Process</CardTitle>
                <CardDescription>Simple application and documentation support.</CardDescription>
              </CardHeader>
            </Card>
            <Card className="border-border">
              <CardHeader>
                <Users className="h-10 w-10 text-primary mb-2" />
                <CardTitle>Student Community</CardTitle>
                <CardDescription>Connect with fellow international students.</CardDescription>
              </CardHeader>
            </Card>
          </div>

          <div className="text-center">
            <Button size="lg" asChild>
              <Link href="/angebote">Browse All Listings</Link>
            </Button>
          </div>
        </section>
        <Footer />
      </div>
    </main>
  )
}
