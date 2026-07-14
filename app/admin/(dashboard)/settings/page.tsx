"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card"

export default function NotificationSettingsPage() {
  const [student, setStudent] = useState("")
  const [landlord, setLandlord] = useState("")
  const [loading, setLoading] = useState(true)
  const [saving, setSaving] = useState(false)
  const [savedAt, setSavedAt] = useState<number | null>(null)

  useEffect(() => {
    fetch("/api/admin/settings/notifications", { credentials: "include" })
      .then((r) => r.json())
      .then((data) => {
        setStudent(data.student ?? "")
        setLandlord(data.landlord ?? "")
      })
      .finally(() => setLoading(false))
  }, [])

  const handleSave = async (e: React.FormEvent) => {
    e.preventDefault()
    setSaving(true)
    try {
      const res = await fetch("/api/admin/settings/notifications", {
        method: "PUT",
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ student, landlord }),
      })
      if (res.ok) {
        setSavedAt(Date.now())
      } else {
        const err = await res.json()
        alert(err.error ?? "Failed to save")
      }
    } catch {
      alert("Failed to save")
    } finally {
      setSaving(false)
    }
  }

  if (loading) {
    return <p className="text-muted-foreground">Loading...</p>
  }

  return (
    <div className="max-w-xl space-y-6">
      <h2 className="text-lg font-semibold">Notification Settings</h2>

      <Card>
        <CardHeader>
          <CardTitle>Inquiry email routing</CardTitle>
          <CardDescription>
            Choose which inbox gets notified for each type of inquiry. Applies as soon as SMTP is configured.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSave} className="space-y-4">
            <div className="space-y-2">
              <Label>Student / property inquiries</Label>
              <Input
                type="email"
                value={student}
                onChange={(e) => setStudent(e.target.value)}
                placeholder="info@unitrail-housing.de"
                required
              />
              <p className="text-xs text-muted-foreground">
                Contact form and property inquiries from prospective tenants.
              </p>
            </div>
            <div className="space-y-2">
              <Label>Landlord inquiries</Label>
              <Input
                type="email"
                value={landlord}
                onChange={(e) => setLandlord(e.target.value)}
                placeholder="vermieten@unitrail-housing.de"
                required
              />
              <p className="text-xs text-muted-foreground">
                Submissions from the "List your property" / landlord call-to-action forms.
              </p>
            </div>
            <div className="flex items-center gap-3">
              <Button type="submit" disabled={saving}>
                {saving ? "Saving..." : "Save"}
              </Button>
              {savedAt && <span className="text-sm text-muted-foreground">Saved.</span>}
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
