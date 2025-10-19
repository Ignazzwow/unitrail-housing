import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { MapPin, DollarSign, Calendar, MessageCircle, FileCheck, Globe } from "lucide-react"
import Image from "next/image"

const features = [
  {
    icon: MapPin,
    title: "Prime Locations",
    description: "Properties near universities, public transport, and essential amenities for student life.",
  },
  {
    icon: DollarSign,
    title: "Transparent Pricing",
    description: "No hidden fees. Clear pricing with all costs included upfront so you can budget confidently.",
  },
  {
    icon: Calendar,
    title: "Flexible Terms",
    description: "Short-term and long-term options available to match your study duration and needs.",
  },
  {
    icon: MessageCircle,
    title: "Multilingual Support",
    description: "Our team speaks multiple languages to help you feel comfortable and understood.",
  },
  {
    icon: FileCheck,
    title: "Easy Documentation",
    description: "Simple, straightforward paperwork process designed for international students.",
  },
  {
    icon: Globe,
    title: "Cultural Integration",
    description: "Resources and events to help you settle in and connect with your new community.",
  },
]

export function Features() {
  return (
    <section id="features" className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            Why Choose UniTrail Housing?
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            We understand the challenges of moving to a new country. That's why we've built a service that puts
            international students first.
          </p>
        </div>

        <div className="mb-16 grid gap-4 md:grid-cols-3">
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg md:col-span-2">
            <Image
              src="/modern-student-apartment-living-room-with-study-ar.jpg"
              alt="Modern student apartment"
              width={800}
              height={400}
              className="object-cover"
            />
          </div>
          <div className="relative aspect-video overflow-hidden rounded-2xl shadow-lg">
            <Image
              src="/cozy-student-bedroom.png"
              alt="Cozy student bedroom"
              width={400}
              height={400}
              className="object-cover"
            />
          </div>
        </div>

        <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
          {features.map((feature) => (
            <Card key={feature.title} className="border-border bg-card transition-shadow hover:shadow-lg">
              <CardHeader>
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary/10">
                  <feature.icon className="h-6 w-6 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">{feature.title}</CardTitle>
              </CardHeader>
              <CardContent>
                <CardDescription className="text-muted-foreground">{feature.description}</CardDescription>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
