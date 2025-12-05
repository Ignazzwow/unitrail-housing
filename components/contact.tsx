"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

export function Contact() {
  const { t } = useLanguage()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)

    const formData = new FormData(e.currentTarget)
    const data = {
      firstName: formData.get("firstName"),
      lastName: formData.get("lastName"),
      email: formData.get("email"),
      phone: formData.get("phone") || "",
      university: formData.get("university") || "",
      message: formData.get("message"),
    }

    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      const result = await response.json()

      if (!response.ok) {
        throw new Error(result.error || "Failed to send message")
      }

      toast({
        title: t("contact.messageSent"),
        description: t("contact.messageSentDesc"),
      })

      ;(e.target as HTMLFormElement).reset()
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "Die Nachricht konnte nicht gesendet werden. Bitte versuchen Sie es später erneut."
      
      toast({
        title: "Fehler",
        description: errorMessage,
        variant: "destructive",
      })
      
      console.error("Contact form error:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/20 py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h2 className="mb-4 text-balance text-3xl font-bold tracking-tight text-foreground md:text-4xl lg:text-5xl">
            {t("contact.title")}
          </h2>
          <p className="text-pretty text-lg text-muted-foreground">
            {t("contact.description")}
          </p>
        </div>

        <div className="mx-auto grid max-w-5xl gap-8 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <Card className="border-border bg-card">
              <CardHeader>
                <CardTitle className="text-card-foreground">{t("contact.sendMessage")}</CardTitle>
                <CardDescription className="text-muted-foreground">
                  {t("contact.sendMessageDesc")}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid gap-4 sm:grid-cols-2">
                    <div className="space-y-2">
                      <Label htmlFor="firstName">{t("contact.firstName")}</Label>
                      <Input id="firstName" name="firstName" required />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="lastName">{t("contact.lastName")}</Label>
                      <Input id="lastName" name="lastName" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">{t("contact.email")}</Label>
                    <Input id="email" name="email" type="email" required />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">{t("contact.phone")}</Label>
                    <Input id="phone" name="phone" type="tel" />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="university">{t("contact.university")}</Label>
                    <Input id="university" name="university" placeholder={t("contact.universityPlaceholder")} />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="message">{t("contact.message")}</Label>
                    <Textarea
                      id="message"
                      name="message"
                      rows={5}
                      placeholder={t("contact.messagePlaceholder")}
                      required
                    />
                  </div>

                  <div className="flex items-start gap-2">
                    <input type="checkbox" id="consent" name="consent" required className="mt-1" />
                    <Label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
                      {t("contact.consent")}{" "}
                      <a href="#privacy" className="text-primary underline">
                        {t("contact.privacyPolicy")}
                      </a>
                      . {t("contact.consentEnd")}
                    </Label>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isSubmitting}>
                    {isSubmitting ? t("contact.sending") : t("contact.send")}
                  </Button>
                </form>
              </CardContent>
            </Card>
          </div>

          <div className="space-y-6">
            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Mail className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">{t("contact.emailUs")}</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="mailto:housing@unitrail.in" className="text-primary hover:underline">
                  housing@unitrail.in
                </a>
              </CardContent>
            </Card>

            <Card className="border-border bg-card">
              <CardHeader>
                <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                  <Phone className="h-5 w-5 text-primary" />
                </div>
                <CardTitle className="text-card-foreground">{t("contact.callUs")}</CardTitle>
              </CardHeader>
              <CardContent>
                <a href="tel:+4917656800301" className="text-primary hover:underline">
                  +49 176 56800301
                </a>
                <p className="mt-2 text-sm text-muted-foreground">{t("contact.hours")}</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
