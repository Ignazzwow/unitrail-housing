"use client"

import type React from "react"
import { useState } from "react"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Checkbox } from "@/components/ui/checkbox"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"
import { cn } from "@/lib/utils"

type LandlordInquiryDialogProps = {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function LandlordInquiryDialog({ open, onOpenChange }: LandlordInquiryDialogProps) {
  const { t } = useLanguage()
  const { toast } = useToast()
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [consentChecked, setConsentChecked] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const form = e.currentTarget

    setIsSubmitting(true)
    const formData = new FormData(form)
    const name = String(formData.get("name") ?? "").trim()
    const email = String(formData.get("email") ?? "").trim()
    const phone = String(formData.get("phone") ?? "").trim()
    const city = String(formData.get("city") ?? "").trim()
    const message = String(formData.get("message") ?? "").trim()

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name,
          email,
          phone,
          city,
          message,
          source: "landlord_cta_form",
          consent: consentChecked,
        }),
      })
      if (res.ok) {
        toast({
          title: t("landlordInquiry.messageSent"),
          description: t("landlordInquiry.messageSentDesc"),
        })
        form.reset()
        setConsentChecked(false)
        onOpenChange(false)
      } else {
        const err = await res.json().catch(() => ({}))
        toast({
          title: t("propertyInquiry.errorSend"),
          description: typeof err.error === "string" ? err.error : t("propertyInquiry.errorGeneric"),
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: t("propertyInquiry.errorSend"),
        description: t("propertyInquiry.errorGeneric"),
        variant: "destructive",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-h-[min(90vh,720px)] overflow-y-auto sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>{t("landlordInquiry.dialogTitle")}</DialogTitle>
          <DialogDescription>{t("landlordInquiry.dialogDescription")}</DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4 pt-2">
          <div className="space-y-2">
            <Label htmlFor="landlord-name">{t("landlordInquiry.name")}</Label>
            <Input id="landlord-name" name="name" autoComplete="name" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landlord-email">{t("landlordInquiry.email")}</Label>
            <Input id="landlord-email" name="email" type="email" autoComplete="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landlord-phone">{t("landlordInquiry.phone")}</Label>
            <Input id="landlord-phone" name="phone" type="tel" autoComplete="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landlord-city">{t("landlordInquiry.city")}</Label>
            <Input
              id="landlord-city"
              name="city"
              placeholder={t("landlordInquiry.cityPlaceholder")}
              autoComplete="address-level2"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="landlord-message">{t("landlordInquiry.message")}</Label>
            <Textarea
              id="landlord-message"
              name="message"
              rows={8}
              required
              placeholder={t("landlordInquiry.messagePlaceholder")}
              className="min-h-[11rem] resize-y"
            />
          </div>
          <div className="flex items-start gap-2">
            <Checkbox
              id="landlordConsent"
              checked={consentChecked}
              onCheckedChange={(c) => setConsentChecked(Boolean(c))}
              className="mt-1"
            />
            <Label htmlFor="landlordConsent" className="text-sm leading-relaxed text-muted-foreground">
              {t("landlordInquiry.consent")}{" "}
              <a href="/datenschutz" className="text-primary underline" target="_blank" rel="noopener noreferrer">
                {t("landlordInquiry.privacyPolicy")}
              </a>
              {t("landlordInquiry.consentEnd")}
            </Label>
          </div>
          <Button
            type="submit"
            size="lg"
            className={cn("w-full", consentChecked && "bg-accent text-accent-foreground hover:bg-accent/90")}
            disabled={isSubmitting || !consentChecked}
          >
            {isSubmitting ? t("landlordInquiry.sending") : t("landlordInquiry.send")}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  )
}
