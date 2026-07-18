"use client"

import { useMemo, useState } from "react"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { Input } from "@/components/ui/input"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"
import {
  ClipboardList,
  FileCheck,
  Eye,
  Receipt,
  Shield,
  Wallet,
  MapPin,
  Sofa,
  CalendarRange,
  DoorOpen,
  LogOut,
  Wrench,
  Users,
  Sparkles,
  UserPlus,
  Landmark,
  Plane,
  HeartHandshake,
  MessageCircleQuestion,
  Search,
} from "lucide-react"

const QUESTION_ICONS = [
  ClipboardList,
  FileCheck,
  Eye,
  Receipt,
  Shield,
  Wallet,
  MapPin,
  Sofa,
  CalendarRange,
  DoorOpen,
  LogOut,
  Wrench,
  Users,
  Sparkles,
  UserPlus,
  Landmark,
  Plane,
  HeartHandshake,
]

export function FAQ() {
  const { language, t } = useLanguage()
  const [query, setQuery] = useState("")

  const bundle = translations[language] ?? translations.en
  const rawQuestions = bundle.faq?.questions
  const faqs = Array.isArray(rawQuestions) ? rawQuestions : translations.en.faq.questions

  const filteredFaqs = useMemo(() => {
    const q = query.trim().toLowerCase()
    if (!q) {
      return faqs.map((faq, index) => ({ faq, index }))
    }
    return faqs
      .map((faq, index) => ({ faq, index }))
      .filter(
        ({ faq }) =>
          faq.question.toLowerCase().includes(q) || faq.answer.toLowerCase().includes(q),
      )
  }, [faqs, query])

  return (
    <section id="faq" className="bg-background py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("faq.title")}
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("faq.description")}
          </p>
        </div>

        <div className="mx-auto max-w-3xl">
          <div className="relative mb-6">
            <Search
              className="pointer-events-none absolute top-1/2 left-3 h-4 w-4 -translate-y-1/2 text-muted-foreground"
              aria-hidden
            />
            <Input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder={t("faq.searchPlaceholder")}
              aria-label={t("faq.searchPlaceholder")}
              className="h-11 pl-10"
            />
          </div>

          {filteredFaqs.length === 0 ? (
            <p className="py-8 text-center text-muted-foreground">{t("faq.searchEmpty")}</p>
          ) : (
            <Accordion type="single" collapsible className="w-full">
              {filteredFaqs.map(({ faq, index }) => {
                const Icon = QUESTION_ICONS[index] ?? MessageCircleQuestion
                return (
                  <AccordionItem key={index} value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-foreground">
                      <span className="flex items-center gap-3">
                        <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-primary/10 text-primary">
                          <Icon className="h-4 w-4" />
                        </span>
                        {faq.question}
                      </span>
                    </AccordionTrigger>
                    <AccordionContent className="whitespace-pre-line pl-11 text-muted-foreground">
                      {faq.answer}
                    </AccordionContent>
                  </AccordionItem>
                )
              })}
            </Accordion>
          )}
        </div>
      </div>
    </section>
  )
}
