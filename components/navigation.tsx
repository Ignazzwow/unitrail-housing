"use client"

import { useState, useEffect, useMemo } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
import { useLanguage } from "@/contexts/language-context"

/** Must match `Language` in language-context — only these have full UI copy in translations. */
const languages = [
  { code: "en" as const, name: "English", flag: "🇬🇧" },
  { code: "de" as const, name: "Deutsch", flag: "🇩🇪" },
]

export function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const [isDark, setIsDark] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const selectedLanguage = useMemo(
    () => languages.find((l) => l.code === language) ?? languages[0],
    [language]
  )

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")
    const prefersDark = window.matchMedia("(prefers-color-scheme: dark)").matches

    if (savedTheme === "dark" || (!savedTheme && prefersDark)) {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY

      // Show navbar when scrolling up, hide when scrolling down
      if (currentScrollY < lastScrollY || currentScrollY < 10) {
        setIsVisible(true)
      } else if (currentScrollY > lastScrollY && currentScrollY > 100) {
        setIsVisible(false)
        setIsMobileMenuOpen(false) // Close mobile menu when hiding
      }

      setLastScrollY(currentScrollY)
    }

    window.addEventListener("scroll", handleScroll, { passive: true })
    return () => window.removeEventListener("scroll", handleScroll)
  }, [lastScrollY])

  const toggleTheme = () => {
    if (isDark) {
      document.documentElement.classList.remove("dark")
      localStorage.setItem("theme", "light")
      setIsDark(false)
    } else {
      document.documentElement.classList.add("dark")
      localStorage.setItem("theme", "dark")
      setIsDark(true)
    }
  }

  const handleLanguageChange = (lang: (typeof languages)[number]) => {
    setLanguage(lang.code)
  }

  const navLinks = [
    { href: "/for-students", labelKey: "nav.forStudents" as const },
    { href: "/angebote", labelKey: "nav.listings" as const },
    { href: "/faq", labelKey: "nav.faq" as const },
    { href: "/about", labelKey: "nav.about" as const },
    { href: "/contact", labelKey: "nav.contact" as const },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link href="/" className="flex min-w-0 items-center gap-2">
            <div className="w-8 h-8 relative shrink-0">
              <Image
                src="/New_UniTrail_Housing_Logo.png"
                alt={t("nav.logoAlt")}
                width={32}
                height={32}
                className="object-contain rounded-md"
                priority
              />
            </div>
            <span className="truncate font-bold text-base text-foreground sm:text-lg">UniTrail Housing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center gap-4 xl:gap-6">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="group relative text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
              >
                {t(link.labelKey)}
                <span className="absolute -bottom-1 left-0 h-0.5 w-0 bg-primary transition-all duration-300 group-hover:w-full" />
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex shrink-0 items-center gap-2">
            {/* For Landlords — visually separated from the student-facing nav links */}
            <Button
              asChild
              size="sm"
              className="hidden bg-accent text-accent-foreground transition-transform hover:bg-accent/90 hover:scale-105 sm:inline-flex"
            >
              <Link href="/for-landlords">{t("nav.forLandlords")}</Link>
            </Button>

            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">{t("nav.selectLanguage")}</span>
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                {languages.map((language) => (
                  <DropdownMenuItem
                    key={language.code}
                    onClick={() => handleLanguageChange(language)}
                    className="flex items-center gap-2"
                  >
                    <span>{language.flag}</span>
                    <span>{language.name}</span>
                    {selectedLanguage.code === language.code && <span className="ml-auto text-primary">✓</span>}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden sm:flex">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">{t("nav.toggleTheme")}</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="lg:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">{t("nav.openMenu")}</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="flex w-[min(100vw-2rem,400px)] flex-col gap-0 p-0">
                <SheetHeader className="space-y-0 border-b border-border px-6 pb-5 pr-14 pt-6 text-left">
                  <SheetTitle className="text-lg font-semibold text-foreground">{t("nav.menuTitle")}</SheetTitle>
                </SheetHeader>

                <div className="flex flex-1 flex-col overflow-y-auto px-6 py-5">
                  <nav className="flex flex-col gap-1">
                    <Link
                      href="/for-landlords"
                      onClick={() => setIsMobileMenuOpen(false)}
                      className="mb-2 rounded-lg bg-accent px-3 py-2.5 text-base font-medium text-accent-foreground transition-colors hover:bg-accent/90"
                    >
                      {t("nav.forLandlords")}
                    </Link>
                    {navLinks.map((link) => (
                      <Link
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="rounded-lg px-3 py-2.5 text-base font-medium text-foreground transition-colors hover:bg-muted"
                      >
                        {t(link.labelKey)}
                      </Link>
                    ))}
                  </nav>
                </div>

                <div className="mt-auto space-y-5 border-t border-border px-6 py-5">
                  <div className="flex items-center justify-between gap-4 rounded-lg bg-muted/50 px-4 py-3">
                    <span className="text-sm font-medium text-foreground">{t("nav.themeLabel")}</span>
                    <Button variant="outline" size="sm" onClick={toggleTheme} className="shrink-0 gap-2 bg-background">
                      {isDark ? (
                        <>
                          <Sun className="h-4 w-4" />
                          {t("nav.light")}
                        </>
                      ) : (
                        <>
                          <Moon className="h-4 w-4" />
                          {t("nav.dark")}
                        </>
                      )}
                    </Button>
                  </div>

                  <div className="space-y-2">
                    <span className="px-1 text-sm font-medium text-foreground">{t("nav.languageLabel")}</span>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button variant="outline" className="w-full justify-start gap-2 bg-background">
                          <Globe className="h-4 w-4 shrink-0" />
                          <span>{selectedLanguage.flag}</span>
                          <span>{selectedLanguage.name}</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
                        {languages.map((language) => (
                          <DropdownMenuItem
                            key={language.code}
                            onClick={() => handleLanguageChange(language)}
                            className="flex items-center gap-2"
                          >
                            <span>{language.flag}</span>
                            <span>{language.name}</span>
                            {selectedLanguage.code === language.code && (
                              <span className="ml-auto text-primary">✓</span>
                            )}
                          </DropdownMenuItem>
                        ))}
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </div>
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
