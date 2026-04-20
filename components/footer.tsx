"use client"

import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

const navRoutes = [
  { key: "listings", href: "/angebote" },
  { key: "forStudents", href: "/for-students" },
  { key: "forLandlords", href: "/for-landlords" },
  { key: "faq", href: "/faq" },
  { key: "about", href: "/about" },
  { key: "contact", href: "/contact" },
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
                  alt="UniTrail Housing Logo"
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
            <h3 className="mb-4 font-semibold text-card-foreground">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              {navRoutes.map((route) => (
                <li key={route.key}>
                  <Link href={route.href} className="text-muted-foreground hover:text-primary">
                    {t(`nav.${route.key}`)}
                  </Link>
                </li>
              ))}
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-primary">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-primary">
                  {t("footer.imprint")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-primary">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-primary">
                  {t("footer.imprint")}
                </Link>
              </li>
              <li>
                <a href="#terms" className="text-muted-foreground hover:text-primary">
                  {t("footer.termsOfService")}
                </a>
              </li>
              <li>
                <Link href="/datenschutz#cookies" className="text-muted-foreground hover:text-primary">
                  {t("footer.cookiePolicy")}
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("footer.about")}</h3>
            <p className="text-sm text-muted-foreground">
              {t("footer.aboutDesc")}
            </p>
          </div>
        </div>

        <div className="mt-12 border-t border-border pt-8 text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t("footer.copyright")}</p>
          <p className="mt-2">{t("footer.gdpr")}</p>
          <nav className="mt-4 flex flex-wrap items-center justify-center gap-x-3 gap-y-2" aria-label={t("footer.legal")}>
            <Link href="/datenschutz" className="hover:text-primary">
              {t("footer.privacyPolicy")}
            </Link>
            <span className="text-border" aria-hidden>
              |
            </span>
            <Link href="/impressum" className="hover:text-primary">
              {t("footer.imprint")}
            </Link>
            <span className="text-border" aria-hidden>
              |
            </span>
            <Link href="/datenschutz#cookies" className="hover:text-primary">
              {t("footer.cookiePolicy")}
            </Link>
          </nav>
        </div>
      </div>
    </footer>
  )
}
