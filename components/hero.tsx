"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, Users } from "lucide-react"
import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function Hero() {
  const { t } = useLanguage()

  return (
    <section className="relative min-h-0 overflow-hidden bg-gradient-to-b from-primary/10 via-secondary/20 to-background py-12 sm:min-h-[70vh] md:py-20 lg:min-h-[calc(100vh-100px)] lg:py-32">
      <div className="container mx-auto px-4">
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="mx-auto max-w-2xl text-center lg:text-left">
            <h1 className="mb-6 text-balance font-sans text-4xl font-bold tracking-tight text-foreground md:text-6xl lg:text-7xl">
              {t("hero.title")}
            </h1>

            <p className="mb-8 text-pretty text-lg text-muted-foreground md:text-xl lg:text-2xl">
              {t("hero.description")}
            </p>

            <div className="flex flex-col items-center justify-center gap-4 sm:flex-row lg:justify-start">
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/angebote">{t("hero.ctaBrowseListings")}</Link>
              </Button>
              <Button
                size="lg"
                variant="outline"
                className="w-full bg-transparent hover:border-primary/30 hover:bg-primary/10 hover:text-primary sm:w-auto"
                asChild
              >
                <a href="#how-it-works">{t("hero.ctaHowItWorks")}</a>
              </Button>
            </div>

            <div className="mt-16 grid gap-8 sm:grid-cols-2">
              <div className="flex flex-col items-center gap-2 lg:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Shield className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{t("hero.verifiedTitle")}</h3>
                <p className="text-center text-sm text-muted-foreground lg:text-left">{t("hero.verifiedDesc")}</p>
              </div>

              <div className="flex flex-col items-center gap-2 lg:items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                  <Users className="h-6 w-6 text-primary" />
                </div>
                <h3 className="font-semibold text-foreground">{t("hero.communityTitle")}</h3>
                <p className="text-center text-sm text-muted-foreground lg:text-left">{t("hero.communityDesc")}</p>
              </div>
            </div>
          </div>

          <div className="relative hidden lg:block">
            <div className="pointer-events-none absolute -right-6 -top-8 h-36 w-36 rounded-full bg-accent/25 blur-3xl" />
            <div className="pointer-events-none absolute -bottom-10 -left-8 h-44 w-44 rounded-full bg-primary/25 blur-3xl" />

            <div className="hero-image-float relative">
              <div
                aria-hidden
                className="absolute inset-0 translate-x-3 translate-y-3 rounded-3xl bg-primary/20"
              />
              <div
                aria-hidden
                className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-3xl border border-primary/25"
              />
              <div className="relative aspect-square overflow-hidden rounded-3xl shadow-2xl shadow-primary/20 ring-1 ring-primary/10">
                <Image
                  src="/diverse-group-of-happy-international-students-smil.jpg"
                  alt={t("hero.imageAlt")}
                  fill
                  sizes="(max-width: 1024px) 0px, 40vw"
                  className="object-cover object-center"
                  priority
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <style jsx>{`
        @keyframes heroImageFloat {
          0%,
          100% {
            transform: translateY(0);
          }
          50% {
            transform: translateY(-8px);
          }
        }

        .hero-image-float {
          animation: heroImageFloat 7s ease-in-out infinite;
        }

        @media (prefers-reduced-motion: reduce) {
          .hero-image-float {
            animation: none;
          }
        }
      `}</style>
    </section>
  )
}
