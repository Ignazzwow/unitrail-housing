"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { useToast } from "@/hooks/use-toast"

interface InquiryFormProps {
  propertyId?: string
  propertyTitle?: string
}

export function InquiryForm({ propertyId, propertyTitle }: InquiryFormProps) {
  const router = useRouter()
  const { toast } = useToast()
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
          title: "Message sent!",
          description: "We'll get back to you soon.",
        })
        router.push("/angebote")
      } else {
        const err = await res.json()
        toast({ title: "Error", description: err.error ?? "Failed to send", variant: "destructive" })
      }
    } catch {
      toast({ title: "Error", description: "Failed to send message", variant: "destructive" })
    } finally {
      setLoading(false)
    }
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Send your inquiry</CardTitle>
        {propertyTitle && (
          <p className="text-sm text-muted-foreground">About: {propertyTitle}</p>
        )}
      </CardHeader>
      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid gap-4 sm:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="firstName">First Name</Label>
              <Input id="firstName" name="firstName" required />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last Name</Label>
              <Input id="lastName" name="lastName" required />
            </div>
          </div>
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" required />
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" type="tel" />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message">Message</Label>
            <Textarea id="message" name="message" rows={5} required />
          </div>
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? "Sending..." : "Send Inquiry"}
          </Button>
        </form>
      </CardContent>
    </Card>
  )
}
