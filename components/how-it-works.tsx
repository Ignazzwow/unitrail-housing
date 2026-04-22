"use client"

import { CalendarCheck2, ClipboardCheck, House, MailCheck, Search } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function HowItWorks() {
  const { t } = useLanguage()
  
  const steps = [
    {
      icon: Search,
      number: "01",
      title: t("howItWorks.step1"),
      description: t("howItWorks.step1Desc"),
      image: "/student-browsing-apartment-listings-on-laptop.jpg",
    },
    {
      icon: ClipboardCheck,
      number: "02",
      title: t("howItWorks.step2"),
      description: t("howItWorks.step2Desc"),
      image: "/only_bewerben_girl.png",
    },
    {
      icon: CalendarCheck2,
      number: "03",
      title: t("howItWorks.step3"),
      description: t("howItWorks.step3Desc"),
      image: "/modern-student-apartment-living-room-with-study-ar.jpg",
    },
    {
      icon: MailCheck,
      number: "04",
      title: t("howItWorks.step4"),
      description: t("howItWorks.step4Desc"),
      image: "/schreibtisch1.png",
    },
    {
      icon: House,
      number: "05",
      title: t("howItWorks.step5"),
      description: t("howItWorks.step5Desc"),
      image: "/spacious_scandinavian_student_room.png",
    },
  ]

  return (
    <section id="how-it-works" className="bg-secondary/20 py-14 md:py-16">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center">
          <h2 className="mb-3 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("howItWorks.title")}
          </h2>
          <p className="text-pretty text-base text-muted-foreground md:text-lg">
            {t("howItWorks.description")}
          </p>
        </div>

        <div className="mx-auto grid max-w-7xl gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5">
          {steps.map((step) => (
            <article
              key={step.number}
              className="flex h-full flex-col overflow-hidden rounded-2xl border border-border bg-card shadow-sm"
            >
              <div className="relative aspect-[5/4] w-full overflow-hidden">
                <Image
                  src={step.image || "/placeholder.svg"}
                  alt={step.title}
                  fill
                  className="object-cover"
                  sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 25vw"
                  loading="lazy"
                />
              </div>

              <div className="flex flex-1 flex-col p-4 md:p-5">
                <div className="mb-3 flex items-center gap-3">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <step.icon className="h-5 w-5" />
                  </div>
                  <span className="text-2xl font-bold leading-none text-primary/30">{step.number}</span>
                </div>
                <h3 className="mb-2 text-lg font-bold text-foreground md:text-xl">{step.title}</h3>
                {step.description ? (
                  <p className="text-sm leading-relaxed text-muted-foreground md:text-base">{step.description}</p>
                ) : null}
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  )
}
