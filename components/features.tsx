"use client"

import Image from "next/image"
import { useLanguage } from "@/contexts/language-context"

export function Features() {
  const { t } = useLanguage()

  return (
    <section id="features" className="bg-background py-20 md:py-24">
      <div className="container mx-auto px-4">
        <div className="overflow-hidden rounded-3xl border border-primary/30 bg-gradient-to-br from-primary via-primary/95 to-primary/85 text-primary-foreground shadow-2xl">
          <div className="grid gap-0 lg:grid-cols-[1.1fr_1fr]">
            <div className="p-6 sm:p-8 md:p-10 lg:p-12">
              <p className="mb-3 text-sm font-semibold uppercase tracking-[0.2em] text-primary-foreground/70">
                {t("aboutHero.eyebrow")}
              </p>
              <h2 className="text-balance text-5xl font-extrabold leading-[0.95] uppercase md:text-7xl lg:text-8xl">
                {t("aboutHero.title")}
              </h2>
              <div className="mt-8 space-y-4 text-sm leading-relaxed text-primary-foreground/85 md:text-base">
                <p>{t("aboutHero.p1")}</p>
                <p>{t("aboutHero.p2")}</p>
                <p className="text-primary-foreground">{t("aboutHero.p3")}</p>
              </div>
            </div>

            <div className="relative flex min-h-[320px] items-center justify-center bg-black lg:min-h-full">
              <div className="absolute left-4 right-4 top-4 h-px bg-primary-foreground/15" />
              <div className="absolute bottom-4 left-4 right-4 h-px bg-primary-foreground/15" />
              <div
                className="relative mx-6 w-[calc(100%-3rem)] overflow-hidden rounded-2xl border border-primary-foreground/20 bg-background/10 shadow-xl backdrop-blur-sm"
                style={{ animation: "floatImage 6s ease-in-out infinite" }}
              >
                <div className="relative aspect-[16/10] w-full">
                  <Image
                    src="/about-unitrail-housing.jpg"
                    alt={t("aboutHero.imageAlt")}
                    fill
                    className="object-cover"
                    sizes="(max-width: 1024px) 100vw, 40vw"
                    priority={false}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <style jsx>{`
        @keyframes floatImage {
          0%,
          100% {
            transform: translateY(0px);
          }
          50% {
            transform: translateY(-10px);
          }
        }
      `}</style>
    </section>
  )
}
