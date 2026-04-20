"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Building2, Mail, Star, Eye } from "lucide-react"

interface Stats {
  totalActiveProperties: number
  featuredCount: number
  newInquiriesToday: number
  newInquiriesThisWeek: number
  recentInquiries: Array<{
    id: string
    name: string
    status: string
    createdAt: string
    property?: { id: string; title: string; slug: string } | null
  }>
  recentlyUpdatedProperties: Array<{
    id: string
    title: string
    location: string
    price: number
    availabilityStatus: string
    updatedAt: string
    images: { imageUrl: string }[]
  }>
}

function parseAdminStatsPayload(json: unknown): Stats | null {
  if (!json || typeof json !== "object") return null
  const d = json as Record<string, unknown>
  if (typeof d.error === "string") return null
  if (!Array.isArray(d.recentInquiries) || !Array.isArray(d.recentlyUpdatedProperties)) return null

  const recentInquiries = d.recentInquiries.map((row, i) => {
    const r = row && typeof row === "object" ? (row as Record<string, unknown>) : {}
    const prop =
      r.property && typeof r.property === "object" ? (r.property as Record<string, unknown>) : null
    return {
      id: String(r.id ?? `inq-${i}`),
      name: String(r.name ?? "—"),
      status: String(r.status ?? "new"),
      createdAt: typeof r.createdAt === "string" ? r.createdAt : new Date().toISOString(),
      property:
        prop && (prop.title || prop.id)
          ? {
              id: String(prop.id ?? ""),
              title: String(prop.title ?? ""),
              slug: String(prop.slug ?? ""),
            }
          : null,
    }
  })

  const recentlyUpdatedProperties = d.recentlyUpdatedProperties.map((row, i) => {
    const r = row && typeof row === "object" ? (row as Record<string, unknown>) : {}
    const imgs = Array.isArray(r.images) ? r.images : []
    const first = imgs[0] && typeof imgs[0] === "object" ? (imgs[0] as Record<string, unknown>) : null
    return {
      id: String(r.id ?? `prop-${i}`),
      title: String(r.title ?? "—"),
      location: String(r.location ?? "—"),
      price: typeof r.price === "number" && Number.isFinite(r.price) ? r.price : 0,
      availabilityStatus: String(r.availabilityStatus ?? "—"),
      updatedAt: typeof r.updatedAt === "string" ? r.updatedAt : new Date().toISOString(),
      images: first?.imageUrl ? [{ imageUrl: String(first.imageUrl) }] : [],
    }
  })

  return {
    totalActiveProperties: typeof d.totalActiveProperties === "number" ? d.totalActiveProperties : 0,
    featuredCount: typeof d.featuredCount === "number" ? d.featuredCount : 0,
    newInquiriesToday: typeof d.newInquiriesToday === "number" ? d.newInquiriesToday : 0,
    newInquiriesThisWeek: typeof d.newInquiriesThisWeek === "number" ? d.newInquiriesThisWeek : 0,
    recentInquiries,
    recentlyUpdatedProperties,
  }
}

export default function DashboardPage() {
  const [stats, setStats] = useState<Stats | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetch("/api/admin/stats")
      .then(async (r) => {
        const text = await r.text()
        let parsed: unknown
        try {
          parsed = text ? JSON.parse(text) : null
        } catch {
          setStats(null)
          return
        }
        if (!r.ok) {
          setStats(null)
          return
        }
        const normalized = parseAdminStatsPayload(parsed)
        setStats(normalized)
      })
      .catch(() => setStats(null))
      .finally(() => setLoading(false))
  }, [])

  if (loading) {
    return (
      <div className="flex items-center justify-center py-24">
        <p className="text-muted-foreground">Loading...</p>
      </div>
    )
  }

  const s = stats ?? {
    totalActiveProperties: 0,
    featuredCount: 0,
    newInquiriesToday: 0,
    newInquiriesThisWeek: 0,
    recentInquiries: [],
    recentlyUpdatedProperties: [],
  }

  const statusColor = (status: string) => {
    switch (status) {
      case "new": return "destructive"
      case "in_progress": return "secondary"
      case "closed": return "default"
      default: return "outline"
    }
  }

  return (
    <div className="space-y-6">
      {/* Stats cards */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Total Active Properties
            </CardTitle>
            <Building2 className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.totalActiveProperties}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Inquiries Today
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.newInquiriesToday}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              New Inquiries This Week
            </CardTitle>
            <Mail className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.newInquiriesThisWeek}</div>
          </CardContent>
        </Card>
        <Card>
          <CardHeader className="flex flex-row items-center justify-between pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              Featured Properties
            </CardTitle>
            <Star className="h-4 w-4 text-muted-foreground" />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{s.featuredCount}</div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Inquiries */}
      <Card>
        <CardHeader>
          <CardTitle>Recent Inquiries</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Name</TableHead>
                  <TableHead>Property</TableHead>
                  <TableHead>Date</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead></TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {s.recentInquiries.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No inquiries yet
                    </TableCell>
                  </TableRow>
                ) : (
                  s.recentInquiries.map((inq) => (
                    <TableRow key={inq.id}>
                      <TableCell className="font-medium">{inq.name}</TableCell>
                      <TableCell>
                        {inq.property?.title ?? "—"}
                      </TableCell>
                      <TableCell>
                        {new Date(inq.createdAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <Badge variant={statusColor(inq.status)}>
                          {(inq.status ?? "new").replace(/_/g, " ")}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        <Button variant="ghost" size="sm" asChild>
                          <Link href={`/admin/inquiries/${inq.id}`}>
                            <Eye className="h-4 w-4" />
                          </Link>
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
        </CardContent>
      </Card>

      {/* Recently Updated Properties */}
      <Card>
        <CardHeader>
          <CardTitle>Recently Updated Properties</CardTitle>
        </CardHeader>
        <CardContent>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Title</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead>Last updated</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {s.recentlyUpdatedProperties.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={5} className="text-center text-muted-foreground">
                      No properties yet
                    </TableCell>
                  </TableRow>
                ) : (
                  s.recentlyUpdatedProperties.map((prop) => (
                    <TableRow key={prop.id}>
                      <TableCell className="font-medium">{prop.title}</TableCell>
                      <TableCell>{prop.location}</TableCell>
                      <TableCell>€{prop.price}/mo</TableCell>
                      <TableCell>
                        <Badge variant="outline">{prop.availabilityStatus}</Badge>
                      </TableCell>
                      <TableCell>
                        {new Date(prop.updatedAt).toLocaleDateString()}
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
        </CardContent>
      </Card>
    </div>
  )
}
