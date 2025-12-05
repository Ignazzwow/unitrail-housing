"use client"

import { Card, CardContent } from "@/components/ui/card"
import { Star } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

const testimonials = [
  {
    name: "Maria Garcia",
    country: "Spain",
    image: "/young-female-student-from-spain-smiling-headshot.jpg",
    text: "UniTrail Housing made my move to the UK so much easier. The team was incredibly helpful and my apartment is perfect!",
    textDe: "UniTrail Housing hat meinen Umzug ins Vereinigte Königreich so viel einfacher gemacht. Das Team war unglaublich hilfreich und meine Wohnung ist perfekt!",
    rating: 5,
  },
  {
    name: "Chen Wei",
    country: "China",
    image: "/young-male-student-from-china-smiling-headshot.jpg",
    text: "I was worried about finding accommodation from abroad, but the process was smooth and transparent. Highly recommend!",
    textDe: "Ich war besorgt, eine Unterkunft aus dem Ausland zu finden, aber der Prozess war reibungslos und transparent. Sehr zu empfehlen!",
    rating: 5,
  },
  {
    name: "Priya Patel",
    country: "India",
    image: "/young-female-student-from-india-smiling-headshot.jpg",
    text: "The multilingual support was a lifesaver. They helped me understand everything and I felt supported throughout.",
    textDe: "Der mehrsprachige Support war ein Lebensretter. Sie halfen mir, alles zu verstehen, und ich fühlte mich die ganze Zeit unterstützt.",
    rating: 5,
  },
]

export function Testimonials() {
  const { language, t } = useLanguage()
  
  return (
    <section className="bg-background py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("testimonials.title")}
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("testimonials.description")}
          </p>
        </div>

        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
          {testimonials.map((testimonial) => (
            <Card key={testimonial.name} className="border-border bg-card">
              <CardContent className="pt-6">
                <div className="mb-4 flex gap-1">
                  {Array.from({ length: testimonial.rating }).map((_, i) => (
                    <Star key={i} className="h-5 w-5 fill-accent text-accent" />
                  ))}
                </div>
                <p className="mb-6 text-muted-foreground italic">{language === "de" ? testimonial.textDe : testimonial.text}</p>
                <div className="flex items-center gap-4">
                  <div className="relative h-12 w-12 overflow-hidden rounded-full">
                    <Image
                      src={testimonial.image || "/placeholder.svg"}
                      alt={testimonial.name}
                      width={48}
                      height={48}
                      className="object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div>
                    <div className="font-semibold text-foreground">{testimonial.name}</div>
                    <div className="text-sm text-muted-foreground">{testimonial.country}</div>
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  )
}
