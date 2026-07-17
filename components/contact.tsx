"use client"

import type React from "react"

import { useState } from "react"
import { useSearchParams } from "next/navigation"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Mail, Phone } from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

export function Contact() {
  const { t } = useLanguage()
  const searchParams = useSearchParams()
  const fromLandlords = searchParams.get("from") === "landlords"
  const publicEmail = t("contact.publicEmail")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)
  const { toast } = useToast()

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setIsSubmitting(true)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = `${formData.get("firstName")} ${formData.get("lastName")}`.trim()
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email: formData.get("email"),
          phone: formData.get("phone") || "",
          message: formData.get("message"),
          source: fromLandlords ? "landlords_page" : "website_form",
          consent: consentChecked,
        }),
      })
      if (res.ok) {
        toast({
          title: t("contact.messageSent"),
          description: t("contact.messageSentDesc"),
        })
        form.reset()
        setConsentChecked(false)
      } else {
        const err = await res.json()
        toast({
          title: t("contact.errorTitle"),
          description: err.error ?? t("contact.errorSend"),
          variant: "destructive",
        })
      }
    } catch {
      toast({ title: t("contact.errorTitle"), description: t("contact.errorSendMessage"), variant: "destructive" })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <section id="contact" className="bg-secondary/20 py-12 md:py-20">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-10 max-w-3xl text-center md:mb-16">
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
                {fromLandlords ? (
                  <p className="mb-4 rounded-md border border-primary/25 bg-primary/5 px-3 py-2.5 text-sm text-foreground">
                    {t("contact.landlordListingNote")}
                  </p>
                ) : null}
                <p className="mb-4 border-l-2 border-primary pl-3 text-sm leading-relaxed text-muted-foreground">
                  {t("contact.teamReplyWithin24")}
                </p>
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
                    <Checkbox
                      id="consent"
                      checked={consentChecked}
                      onCheckedChange={(c) => setConsentChecked(Boolean(c))}
                      className="mt-1"
                    />
                    <Label htmlFor="consent" className="text-sm leading-relaxed text-muted-foreground">
                      {t("contact.consent")}{" "}
                      <a href="/datenschutz" className="text-primary underline">
                        {t("contact.privacyPolicy")}
                      </a>
                      . {t("contact.consentEnd")}
                    </Label>
                  </div>

                  <Button
                    type="submit"
                    size="lg"
                    className={cn("w-full", consentChecked && "bg-accent text-accent-foreground hover:bg-accent/90")}
                    disabled={isSubmitting || !consentChecked}
                  >
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
                <a href={`mailto:${publicEmail}`} className="break-all text-primary hover:underline">
                  {publicEmail}
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
                <div className="mt-4 flex gap-4 border-t border-border pt-4">
                  <div className="relative h-24 w-24 shrink-0 overflow-hidden rounded-lg border border-border bg-muted">
                    <Image
                      src="/paul-worlitzsch.png"
                      alt={t("contact.phoneContactName")}
                      fill
                      className="object-cover object-top"
                      sizes="96px"
                    />
                  </div>
                  <div className="min-w-0 flex-1 space-y-1 text-sm">
                    <p className="font-medium text-foreground">{t("contact.phoneContactLine")}</p>
                    <p className="text-muted-foreground">{t("contact.phoneContactName")}</p>
                  </div>
                </div>
                <p className="mt-2 text-sm text-muted-foreground">{t("contact.hours")}</p>
              </CardContent>
            </Card>

          </div>
        </div>
      </div>
    </section>
  )
}
