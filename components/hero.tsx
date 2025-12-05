"use client"

import { Button } from "@/components/ui/button"
import { Shield, Users } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { t } = useLanguage()
  
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-primary/10 via-secondary/20 to-background">
      <div className="container mx-auto px-4 py-20 md:py-32">
        <div className="grid gap-12 lg:grid-cols-2 lg:gap-16 items-center">
          <div className="mx-auto max-w-2xl text-center lg:text-left">
            <h1 className="mb-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <a href="#contact">{t("hero.findHome")}</a>
              </Button>
              <Button size="lg" variant="outline" className="w-full sm:w-auto bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/30" asChild>
                <a href="#how-it-works">{t("hero.howItWorks")}</a>
              </Button>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{t("hero.verifiedProperties")}</h3>
                <p className="text-sm text-muted-foreground text-center lg:text-left">
                  {t("hero.verifiedPropertiesDesc")}
                </p>
              </div>

              <div className="flex flex-col items-center lg:items-start gap-2">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{t("hero.studentCommunity")}</h3>
                <p className="text-sm text-muted-foreground text-center lg:text-left">
                  {t("hero.studentCommunityDesc")}
                </p>
              </div>
              
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl">
              <Image
                src="/diverse-group-of-happy-international-students-smil.jpg"
                alt="Happy international students in their accommodation"
                width={600}
                height={600}
                className="object-cover"
                priority
              />
            </div>
            <div className="absolute -top-4 -right-4 h-24 w-24 rounded-full bg-accent/20 blur-2xl" />
            <div className="absolute -bottom-4 -left-4 h-32 w-32 rounded-full bg-primary/20 blur-2xl" />
          </div>
        </div>
      </div>
    </section>
  )
}
