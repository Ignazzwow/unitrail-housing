"use client"

import {
  createContext,
  useContext,
  useState,
  useCallback,
  useEffect,
  type ReactNode,
} from "react"
import { translations } from "@/lib/translations"

const LANGUAGE_STORAGE_KEY = "language"

type Language = "en" | "de"

function readStoredLanguage(): Language | null {
  if (typeof window === "undefined") return null
  const raw = localStorage.getItem(LANGUAGE_STORAGE_KEY)?.trim().toLowerCase()
  if (raw === "en" || raw === "de") return raw
  return null
}

interface LanguageContextType {
  language: Language
  setLanguage: (lang: Language) => void
  t: (key: string) => string
}

const LanguageContext = createContext<LanguageContextType | undefined>(undefined)

export function LanguageProvider({ children }: { children: ReactNode }) {
  const [language, setLanguageState] = useState<Language>("en")

  useEffect(() => {
    const stored = readStoredLanguage()
    if (stored) setLanguageState(stored)
  }, [])

  const setLanguage = useCallback((lang: Language) => {
    setLanguageState(lang)
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, lang)
    } catch {
      /* ignore quota / private mode */
    }
  }, [])

  const t = useCallback(
    (key: string): string => {
      const keys = key.split(".")
      let value: unknown = translations[language]
      for (const k of keys) {
        if (value && typeof value === "object" && k in value) {
          value = (value as Record<string, unknown>)[k]
        } else {
          return key
        }
      }
      return typeof value === "string" ? value : key
    },
    [language]
  )

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
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
