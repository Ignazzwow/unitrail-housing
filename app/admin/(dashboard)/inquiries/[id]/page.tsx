"use client"

import { useEffect, useState } from "react"
import { useParams, useRouter } from "next/navigation"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Copy, Phone, CheckCircle, XCircle } from "lucide-react"

interface InquiryDetail {
  id: string
  name: string
  email: string
  phone?: string | null
  message: string
  status: string
  source: string
  createdAt: string
  property?: { id: string; title: string; slug: string } | null
}

export default function InquiryDetailPage() {
  const params = useParams()
  const router = useRouter()
  const id = params?.id as string
  const [inquiry, setInquiry] = useState<InquiryDetail | null>(null)
  const [loading, setLoading] = useState(true)
  const [copied, setCopied] = useState<string | null>(null)

  useEffect(() => {
    if (!id) return
    fetch(`/api/admin/inquiries/${id}`)
      .then((r) => r.json())
      .then(setInquiry)
      .catch(() => setInquiry(null))
      .finally(() => setLoading(false))
  }, [id])

  const updateStatus = async (status: string) => {
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      })
      if (res.ok && inquiry) setInquiry({ ...inquiry, status })
    } catch {}
  }

  const copyToClipboard = (text: string, label: string) => {
    navigator.clipboard.writeText(text)
    setCopied(label)
    setTimeout(() => setCopied(null), 2000)
  }

  const emailTemplate = inquiry
    ? `Hi ${inquiry.name},\n\nThank you for your inquiry. We will get back to you shortly.\n\nBest regards,\nUniTrail Housing`
    : ""

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  if (!inquiry) {
    return (
      <div className="text-center py-24">
        <p className="text-muted-foreground">Inquiry not found.</p>
        <Button variant="link" onClick={() => router.push("/admin/inquiries")}>
          Back to Inquiries
        </Button>
      </div>
    )
  }

  return (
    <div className="grid gap-6 lg:grid-cols-3">
      <div className="lg:col-span-2 space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Inquiry Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div>
              <p className="text-sm text-muted-foreground">Name</p>
              <p className="font-medium">{inquiry.name}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Email</p>
              <p className="font-medium">{inquiry.email}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Phone</p>
              <p className="font-medium">{inquiry.phone ?? "—"}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Linked Property</p>
              {inquiry.property ? (
                <Link href={`/angebote/${inquiry.property.slug}`} target="_blank" className="font-medium text-primary hover:underline">
                  {inquiry.property.title}
                </Link>
              ) : (
                <p className="font-medium">General inquiry</p>
              )}
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Message</p>
              <p className="whitespace-pre-wrap rounded-md bg-muted p-4">{inquiry.message}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Created</p>
              <p>{new Date(inquiry.createdAt).toLocaleString()}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground">Source</p>
              <p>{inquiry.source}</p>
            </div>
            <div>
              <p className="mb-2 text-sm text-muted-foreground">Status</p>
              <Select value={inquiry.status} onValueChange={updateStatus}>
                <SelectTrigger className="w-40">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </CardContent>
        </Card>
      </div>

      <div>
        <Card>
          <CardHeader>
            <CardTitle>Quick Actions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-2">
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => copyToClipboard(emailTemplate, "email")}
            >
              <Copy className="mr-2 h-4 w-4" />
              {copied === "email" ? "Copied!" : "Copy email template"}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => copyToClipboard(inquiry.phone ?? "", "phone")}
              disabled={!inquiry.phone}
            >
              <Phone className="mr-2 h-4 w-4" />
              {copied === "phone" ? "Copied!" : "Copy phone number"}
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => updateStatus("in_progress")}
              disabled={inquiry.status === "in_progress"}
            >
              <CheckCircle className="mr-2 h-4 w-4" />
              Mark as In Progress
            </Button>
            <Button
              variant="outline"
              className="w-full justify-start"
              onClick={() => updateStatus("closed")}
              disabled={inquiry.status === "closed"}
            >
              <XCircle className="mr-2 h-4 w-4" />
              Mark as Closed
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
