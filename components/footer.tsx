"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const studentRoutes = [
  { key: "listings", href: "/angebote" },
  { key: "forStudents", href: "/for-students" },
  { key: "faq", href: "/faq" },
  { key: "about", href: "/about" },
]

const landlordRoutes = [
  { key: "forLandlords", href: "/for-landlords" },
  { key: "contact", href: "/contact" },
]

const legalRoutes = [
  { labelKey: "footer.privacyPolicy", href: "/datenschutz" },
  { labelKey: "footer.imprint", href: "/impressum" },
  { labelKey: "footer.termsOfService", href: "/datenschutz#terms" },
  { labelKey: "footer.cookiePolicy", href: "/datenschutz#cookies" },
]

export function Footer() {
  const { t } = useLanguage()
  
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="mb-4 flex items-center gap-2">
              <div className="w-10 h-10 relative">
                <Image
                  src="/New_UniTrail_Housing_Logo.png"
                  alt={t("nav.logoAlt")}
                  width={40}
                  height={40}
                  className="object-contain"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-bold text-card-foreground">UniTrail Housing</span>
            </div>
            <p className="text-sm text-muted-foreground">
              {t("footer.tagline")}
            </p>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("nav.forStudents")}</h3>
            <ul className="space-y-2 text-sm">
              {studentRoutes.map((route) => (
                <li key={route.key}>
                  <Link href={route.href} className="text-muted-foreground hover:text-primary">
                    {t(`nav.${route.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("nav.forLandlords")}</h3>
            <ul className="space-y-2 text-sm">
              {landlordRoutes.map((route) => (
                <li key={route.key}>
                  <Link href={route.href} className="text-muted-foreground hover:text-primary">
                    {t(`nav.${route.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              {legalRoutes.map((route) => (
                <li key={route.href}>
                  <Link href={route.href} className="text-muted-foreground hover:text-primary">
                    {t(route.labelKey)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <p className="mt-2">{t("footer.gdpr")}</p>
        </div>
      </div>
    </footer>
  )
}
