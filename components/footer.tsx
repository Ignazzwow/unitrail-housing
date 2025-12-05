"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"
import type { Language } from "@/lib/translations"

const languages = [
  { code: "de" as Language, name: "Deutsch" },
  { code: "en" as Language, name: "English" },
  { code: "hi" as Language, name: "हिन्दी" },
  { code: "ru" as Language, name: "Русский" },
  { code: "zh" as Language, name: "中文" },
  { code: "ar" as Language, name: "العربية" },
]

const navRoutes = [
  { key: "features", href: "/#features" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/#contact" },
]

export function Footer() {
  const { language, setLanguage, t } = useLanguage()
  const selectedLanguage = languages.find(l => l.code === language) || languages[0]
  
  return (
    <footer className="border-t border-border bg-card py-12">
      <div className="container mx-auto px-4">
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-4">
          <div>
            <Link href="/" className="mb-4 flex items-center gap-2">
              <div className="w-12 h-12 relative">
                <Image
                  src="/New_UniTrail_Housing_Logo.png"
                  alt="UniTrail Housing Logo"
                  width={48}
                  height={48}
                  className="object-contain rounded-lg"
                  loading="lazy"
                />
              </div>
              <span className="text-xl font-bold text-card-foreground">UniTrail Housing</span>
            </Link>
            <p className="text-sm text-muted-foreground mb-4">
              {t("footer.tagline")}
            </p>
            {/* Language Selector */}
            <div className="flex items-center gap-2">
              {languages.map((languageOption) => (
                <Button
                  key={languageOption.code}
                  variant={selectedLanguage.code === languageOption.code ? "default" : "outline"}
                  size="sm"
                  className={selectedLanguage.code === languageOption.code ? "px-3" : "px-3 bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/30"}
                  onClick={() => setLanguage(languageOption.code)}
                >
                  {languageOption.code === "hi" ? "IN" : languageOption.code === "zh" ? "CN" : languageOption.code === "ar" ? "AR" : languageOption.code.toUpperCase()}
                </Button>
              ))}
            </div>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm">
              {navRoutes.map((route) => (
                <li key={route.key}>
                  <Link href={route.href} className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-2 py-1 rounded-md inline-block">
                    {t(`nav.${route.key}`)}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <h3 className="mb-4 font-semibold text-card-foreground">{t("footer.legal")}</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <Link href="/datenschutz" className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-2 py-1 rounded-md inline-block">
                  {t("footer.privacyPolicy")}
                </Link>
              </li>
              <li>
                <Link href="/cookie-einstellungen" className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-2 py-1 rounded-md inline-block">
                  {t("footer.cookieSettings")}
                </Link>
              </li>
              <li>
                <Link href="/impressum" className="text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-2 py-1 rounded-md inline-block">
                  {t("footer.imprint")}
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
        </div>
      </div>
    </footer>
  )
}
