"use client"

import { useState, useEffect } from "react"
import { Button } from "@/components/ui/button"
import { Moon, Sun, Globe, Menu } from "lucide-react"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet"
import Image from "next/image"

const languages = [
  { code: "en", name: "English", flag: "🇬🇧" },
  { code: "es", name: "Español", flag: "🇪🇸" },
  { code: "fr", name: "Français", flag: "🇫🇷" },
  { code: "de", name: "Deutsch", flag: "🇩🇪" },
  { code: "zh", name: "中文", flag: "🇨🇳" },
  { code: "ar", name: "العربية", flag: "🇸🇦" },
  { code: "hi", name: "हिन्दी", flag: "🇮🇳" },
]

export function Navigation() {
  const [isDark, setIsDark] = useState(false)
  const [isVisible, setIsVisible] = useState(true)
  const [lastScrollY, setLastScrollY] = useState(0)
  const [selectedLanguage, setSelectedLanguage] = useState(languages[0])
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

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

  const handleLanguageChange = (language: (typeof languages)[0]) => {
    setSelectedLanguage(language)
    // Here you would integrate with a translation service
    console.log("[v0] Language changed to:", language.code)
  }

  const navLinks = [
    { href: "#features", label: "Features" },
    { href: "#how-it-works", label: "How It Works" },
    { href: "#faq", label: "FAQ" },
    { href: "#contact", label: "Contact" },
  ]

  return (
    <nav
      className={`fixed top-0 left-0 right-0 z-50 bg-background/95 backdrop-blur-sm border-b border-border transition-transform duration-300 ${
        isVisible ? "translate-y-0" : "-translate-y-full"
      }`}
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          {/* Logo */}
          <a href="#" className="flex items-center gap-2">
            <div className="w-8 h-8 relative">
              <Image
                src="/unitrail_housing_logo.png"
                alt="UniTrail Housing Logo"
                width={32}
                height={32}
                className="object-contain rounded-md"
                priority
              />
            </div>
            <span className="font-bold text-lg text-foreground">UniTrail Housing</span>
          </a>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-6">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-sm font-medium text-muted-foreground hover:text-foreground transition-colors"
              >
                {link.label}
              </a>
            ))}
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2">
            {/* Language Selector */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="icon" className="hidden sm:flex">
                  <Globe className="h-5 w-5" />
                  <span className="sr-only">Select language</span>
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
                    {navLinks.map((link) => (
                      <a
                        key={link.href}
                        href={link.href}
                        onClick={() => setIsMobileMenuOpen(false)}
                        className="text-lg font-medium text-foreground hover:text-primary transition-colors"
                      >
                        {link.label}
                      </a>
                    ))}
                  </div>

                  {/* Mobile Actions */}
                  <div className="flex flex-col gap-4 pt-4 border-t border-border">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium">Theme</span>
                      <Button variant="outline" size="sm" onClick={toggleTheme} className="gap-2 bg-transparent">
                        {isDark ? (
                          <>
                            <Sun className="h-4 w-4" />
                            Light
                          </>
                        ) : (
                          <>
                            <Moon className="h-4 w-4" />
                            Dark
                          </>
                        )}
                      </Button>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className="text-sm font-medium">Language</span>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="outline" className="justify-start gap-2 bg-transparent">
                            <Globe className="h-4 w-4" />
                            <span>{selectedLanguage.flag}</span>
                            <span>{selectedLanguage.name}</span>
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="start" className="w-[250px]">
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
                </div>
              </SheetContent>
            </Sheet>
          </div>
        </div>
      </div>
    </nav>
  )
}
