"use client"

import React, { createContext, useContext, useState, useEffect, useMemo, ReactNode, useCallback } from "react"
import { Language, translations } from "@/lib/translations"

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("de")

  // Load saved language preference on mount
  useEffect(() => {
    if (typeof window !== "undefined") {
      const savedLanguage = localStorage.getItem("language") as Language
      if (savedLanguage === "de" || savedLanguage === "en" || savedLanguage === "hi" || savedLanguage === "ru" || savedLanguage === "zh" || savedLanguage === "ar") {
        setLanguageState(savedLanguage)
      } else {
        localStorage.setItem("language", "de")
      }
    }
  }, [])

  // Persist language selection and update <html lang="">
  useEffect(() => {
    if (typeof window !== "undefined") {
      localStorage.setItem("language", language)
      document.documentElement.setAttribute("lang", language)
    }
  }, [language])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
  }, [])

  const t = useCallback((key: string): string => {
    const keys = key.split(".")
    let value: any = translations[language]
    for (const k of keys) {
      value = value?.[k]
      if (value === undefined) {
        return key
      }
    }
    return typeof value === "string" ? value : key
  }, [language])

  const value = useMemo(() => ({
    language,
    setLanguage,
    t,
  }), [language, setLanguage, t])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (context === undefined) {
    throw new Error("useLanguage must be used within a LanguageProvider")
  }
  return context
}

