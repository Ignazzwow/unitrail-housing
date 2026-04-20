"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"
import { useLanguage } from "@/contexts/language-context"

interface InquiryFormProps {
  propertyId?: string
  propertyTitle?: string
}

export function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
  const { t } = useLanguage()
  const [loading, setLoading] = useState(false)

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setLoading(true)
    const form = e.target as HTMLFormElement
    const formData = new FormData(form)
    const name = `${formData.get("firstName")} ${formData.get("lastName")}`.trim()
    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          property_id: propertyId ?? null,
          name,
          email: formData.get("email"),
          phone: formData.get("phone") || "",
          message: formData.get("message"),
          source: propertyId ? "property_inquiry" : "website_form",
        }),
      })
      if (res.ok) {
        toast({
          title: t("propertyInquiry.messageSent"),
          description: t("propertyInquiry.messageSentDesc"),
        })
        router.push("/angebote")
      } else {
        const err = await res.json()
        toast({
          title: t("propertyInquiry.errorSend"),
          description: err.error ?? t("propertyInquiry.errorGeneric"),
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
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>{t("propertyInquiry.title")}</CardTitle>
        {propertyTitle && (
          <p className="text-sm text-muted-foreground">
            {t("propertyInquiry.aboutProperty")} {propertyTitle}
          </p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">{t("propertyInquiry.firstName")}</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">{t("propertyInquiry.lastName")}</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">{t("propertyInquiry.email")}</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">{t("propertyInquiry.phone")}</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">{t("propertyInquiry.message")}</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? t("propertyInquiry.sending") : t("propertyInquiry.send")}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
