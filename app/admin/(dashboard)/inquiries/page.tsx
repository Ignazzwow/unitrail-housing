"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Card, CardContent } from "@/components/ui/card"
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"
import { Eye, Trash2 } from "lucide-react"
import { getInquiryCategory } from "@/lib/inquiry-category"

interface Inquiry {
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

const statusVariant = (status: string) => {
  switch (status) {
    case "new":
      return "destructive"
    case "in_progress":
      return "secondary"
    case "closed":
      return "default"
    default:
      return "outline"
  }
}

function InquiriesTable({
  inquiries,
  onDeleted,
}: {
  inquiries: Inquiry[]
  onDeleted: (id: string) => void
}) {
  const [deletingId, setDeletingId] = useState<string | null>(null)

  const handleDelete = async (id: string) => {
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/inquiries/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (!res.ok) {
        const err = await res.json().catch(() => ({}))
        alert(err.error ?? "Failed to delete inquiry")
        return
      }
      onDeleted(id)
    } catch {
      alert("Failed to delete inquiry")
    } finally {
      setDeletingId(null)
    }
  }

  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Name</TableHead>
          <TableHead>Property</TableHead>
          <TableHead>Email</TableHead>
          <TableHead>Phone</TableHead>
          <TableHead>Message</TableHead>
          <TableHead>Status</TableHead>
          <TableHead>Created</TableHead>
          <TableHead className="w-28"></TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {inquiries.length === 0 ? (
          <TableRow>
            <TableCell colSpan={8} className="py-12 text-center text-muted-foreground">
              No inquiries found.
            </TableCell>
          </TableRow>
        ) : (
          inquiries.map((inq) => (
            <TableRow key={inq.id}>
              <TableCell className="font-medium">{inq.name}</TableCell>
              <TableCell>
                {inq.property ? (
                  <Link
                    href={`/angebote/${inq.property.slug}`}
                    target="_blank"
                    className="text-primary hover:underline"
                  >
                    {inq.property.title}
                  </Link>
                ) : (
                  <span className="text-muted-foreground">—</span>
                )}
              </TableCell>
              <TableCell className="text-muted-foreground">{inq.email}</TableCell>
              <TableCell className="text-muted-foreground">{inq.phone ?? "—"}</TableCell>
              <TableCell className="max-w-[200px] truncate text-muted-foreground">
                {inq.message.slice(0, 80)}
                {inq.message.length > 80 ? "…" : ""}
              </TableCell>
              <TableCell>
                <Badge variant={statusVariant(inq.status)}>{inq.status.replace("_", "-")}</Badge>
              </TableCell>
              <TableCell className="text-muted-foreground">
                {new Date(inq.createdAt).toLocaleDateString()}
              </TableCell>
              <TableCell>
                <div className="flex items-center gap-1">
                  <Button variant="ghost" size="sm" asChild>
                    <Link href={`/admin/inquiries/${inq.id}`}>
                      <Eye className="h-4 w-4" />
                    </Link>
                  </Button>
                  <AlertDialog>
                    <AlertDialogTrigger asChild>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                        disabled={deletingId === inq.id}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </AlertDialogTrigger>
                    <AlertDialogContent>
                      <AlertDialogHeader>
                        <AlertDialogTitle>Inquiry löschen?</AlertDialogTitle>
                        <AlertDialogDescription>
                          Die Anfrage von <strong>{inq.name}</strong> ({inq.email}) wird dauerhaft
                          gelöscht. Das kann nicht rückgängig gemacht werden.
                        </AlertDialogDescription>
                      </AlertDialogHeader>
                      <AlertDialogFooter>
                        <AlertDialogCancel>Abbrechen</AlertDialogCancel>
                        <AlertDialogAction
                          className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
                          onClick={() => handleDelete(inq.id)}
                        >
                          Löschen
                        </AlertDialogAction>
                      </AlertDialogFooter>
                    </AlertDialogContent>
                  </AlertDialog>
                </div>
              </TableCell>
            </TableRow>
          ))
        )}
      </TableBody>
    </Table>
  )
}

export default function InquiriesPage() {
  const [inquiries, setInquiries] = useState<Inquiry[]>([])
  const [properties, setProperties] = useState<{ id: string; title: string }[]>([])
  const [loading, setLoading] = useState(true)
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [propertyFilter, setPropertyFilter] = useState<string>("all")

  useEffect(() => {
    setLoading(true)
    fetch(
      `/api/admin/inquiries?limit=100${statusFilter !== "all" ? `&status=${statusFilter}` : ""}${propertyFilter !== "all" ? `&property_id=${propertyFilter}` : ""}`
    )
      .then((r) => r.json())
      .then((d) => setInquiries(d.inquiries ?? []))
      .catch(() => setInquiries([]))
      .finally(() => setLoading(false))
  }, [statusFilter, propertyFilter])

  useEffect(() => {
    fetch("/api/admin/properties?limit=200")
      .then((r) => r.json())
      .then((d) => setProperties(d.properties ?? []))
      .catch(() => setProperties([]))
  }, [])

  const handleDeleted = (id: string) => {
    setInquiries((prev) => prev.filter((inq) => inq.id !== id))
  }

  const studentInquiries = inquiries.filter((inq) => getInquiryCategory(inq.source) === "student")
  const landlordInquiries = inquiries.filter((inq) => getInquiryCategory(inq.source) === "landlord")

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Inquiries</h2>
      </div>

      <Card>
        <CardContent className="pt-6">
          <div className="flex flex-wrap items-end gap-4">
            <div className="w-40">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Status</label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="new">New</SelectItem>
                  <SelectItem value="in_progress">In Progress</SelectItem>
                  <SelectItem value="closed">Closed</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-56">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">Property</label>
              <Select value={propertyFilter} onValueChange={setPropertyFilter}>
                <SelectTrigger>
                  <SelectValue placeholder="All properties" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  {properties.map((p) => (
                    <SelectItem key={p.id} value={p.id}>
                      {p.title}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <Tabs defaultValue="student">
              <div className="border-b border-border px-4 pt-4">
                <TabsList>
                  <TabsTrigger value="student">Students / Clients ({studentInquiries.length})</TabsTrigger>
                  <TabsTrigger value="landlord">Landlords ({landlordInquiries.length})</TabsTrigger>
                </TabsList>
              </div>
              <TabsContent value="student" className="mt-0">
                <InquiriesTable inquiries={studentInquiries} onDeleted={handleDeleted} />
              </TabsContent>
              <TabsContent value="landlord" className="mt-0">
                <InquiriesTable inquiries={landlordInquiries} onDeleted={handleDeleted} />
              </TabsContent>
            </Tabs>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
