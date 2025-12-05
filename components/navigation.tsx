"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Menu } from "lucide-react"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"
import Link from "next/link"
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
  { key: "listings", href: "/angebote" },
  { key: "features", href: "/#features" },
  { key: "howItWorks", href: "/#how-it-works" },
  { key: "faq", href: "/#faq" },
  { key: "contact", href: "/#contact" },
]

export function Navigation() {
  const { language, setLanguage, t } = useLanguage()
  const [isDark, setIsDark] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  
  const selectedLanguage = languages.find(l => l.code === language) || languages[0]

  useEffect(() => {
    // Check for saved theme preference or default to light mode
    const savedTheme = localStorage.getItem("theme")

    if (savedTheme === "dark") {
      setIsDark(true)
      document.documentElement.classList.add("dark")
    } else {
      // Default to light mode (remove dark class if present)
      setIsDark(false)
      document.documentElement.classList.remove("dark")
      // Set light theme as default if not saved
      if (!savedTheme) {
        localStorage.setItem("theme", "light")
      }
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

  const handleLanguageChange = (lang: typeof languages[0]) => {
    setLanguage(lang.code)
    setIsMobileMenuOpen(false) // Close mobile menu when changing language
  }

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-2 sm:px-4">
        <div className="flex items-center justify-between h-16 gap-2">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <div className="w-12 h-12 relative">
              <Image
                src="/New_UniTrail_Housing_Logo.png"
                alt="UniTrail Housing Logo"
                width={48}
                height={48}
                className="object-contain rounded-lg"
                priority
              />
            </div>
            <span className="font-bold text-lg text-foreground">UniTrail Housing</span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navRoutes.map((route) => (
              <Link
                key={route.key}
                href={route.href}
                className="text-sm font-medium text-muted-foreground hover:text-primary transition-colors hover:bg-primary/10 px-3 py-1.5 rounded-md"
              >
                {t(`nav.${route.key}`)}
              </Link>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-1 sm:gap-2">
            {/* Language Selector - Always visible */}
            <div className="flex items-center gap-0.5 sm:gap-1">
              {languages.map((languageOption) => (
                <Button
                  key={languageOption.code}
                  variant={selectedLanguage.code === languageOption.code ? "default" : "ghost"}
                  size="sm"
                  className={selectedLanguage.code === languageOption.code ? "px-2 sm:px-3 text-xs sm:text-sm" : "px-2 sm:px-3 bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/30 text-xs sm:text-sm"}
                  onClick={() => handleLanguageChange(languageOption)}
                >
                  {languageOption.code === "hi" ? "IN" : languageOption.code === "zh" ? "CN" : languageOption.code === "ar" ? "AR" : languageOption.code.toUpperCase()}
                </Button>
              ))}
            </div>

            {/* Theme Toggle */}
            <Button variant="ghost" size="icon" onClick={toggleTheme} className="hidden sm:flex">
              {isDark ? <Sun className="h-5 w-5" /> : <Moon className="h-5 w-5" />}
              <span className="sr-only">Toggle theme</span>
            </Button>

            {/* Mobile Menu */}
            <Sheet open={isMobileMenuOpen} onOpenChange={setIsMobileMenuOpen}>
              <SheetTrigger asChild>
                <Button variant="ghost" size="icon" className="md:hidden">
                  <Menu className="h-5 w-5" />
                  <span className="sr-only">Open menu</span>
                </Button>
              </SheetTrigger>
              <SheetContent side="right" className="w-[300px] sm:w-[400px]">
                <div className="flex flex-col gap-6 mt-6">
                  {/* Mobile Navigation Links */}
                  <div className="flex flex-col gap-4">
                    {navRoutes.map((route) => (
                      <Link
                        key={route.key}
                        href={route.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors hover:bg-primary/10 px-3 py-2 rounded-md"
                      >
                        {t(`nav.${route.key}`)}
                      </Link>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">{t("nav.theme")}</span>
                      <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2 bg-transparent">
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

                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium">{t("nav.language")}</span>
                      <div className="flex items-center gap-2">
                        {languages.map((languageOption) => (
                          <Button
                            key={languageOption.code}
                            variant={selectedLanguage.code === languageOption.code ? "default" : "outline"}
                            className={selectedLanguage.code === languageOption.code ? "flex-1" : "flex-1 bg-transparent hover:bg-primary/10 hover:text-primary hover:border-primary/30"}
                            onClick={() => handleLanguageChange(languageOption)}
                          >
                            {languageOption.code === "hi" ? "IN" : languageOption.code === "zh" ? "CN" : languageOption.code === "ar" ? "AR" : languageOption.code.toUpperCase()}
                          </Button>
                        ))}
                      </div>
                    </div>
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
