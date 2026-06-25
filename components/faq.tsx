"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { useLanguage } from "@/contexts/language-context"
import { translations } from "@/lib/translations"

export function FAQ() {
  const { language, t } = useLanguage()

  const bundle = translations[language] ?? translations.en
  const rawQuestions = bundle.faq?.questions
  const faqs = Array.isArray(rawQuestions) ? rawQuestions : translations.en.faq.questions

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
          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, index) => (
              <AccordionItem key={index} value={`item-${index}`}>
                <AccordionTrigger className="text-left text-foreground">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-muted-foreground">{faq.answer}</AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </div>
    </section>
  )
}
