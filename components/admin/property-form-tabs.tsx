"use client"

import { useState, useEffect } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Upload, X } from "lucide-react"

interface PropertyFormData {
  id?: string
  slug?: string
  title?: string
  location?: string
  price?: number | string
  bedrooms?: number
  bathrooms?: number
  roomOccupants?: number
  areaSqm?: number | string | null
  description?: string
  descriptionEn?: string | null
  detailedDescription?: string | null
  detailedDescriptionEn?: string | null
  additionalInfo?: string | null
  additionalInfoEn?: string | null
  propertyType?: string
  listingType?: string
  address?: string | null
  furnishing?: string
  availabilityStatus?: string
  isFeatured?: boolean
  isActive?: boolean
  deposit?: string | null
  minimumStay?: string | null
  availableFrom?: string | null
  images?: { imageUrl: string }[]
  propertyAmenities?: { amenity: { id: string } }[]
}

interface PropertyFormTabsProps {
  property?: PropertyFormData | null
  mode: "create" | "edit"
}

function todayLocalISODate() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}

export function PropertyFormTabs({ property, mode }: PropertyFormTabsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [amenities, setAmenities] = useState<{ id: string; name: string }[]>([])
  const [form, setForm] = useState({
    title: property?.title ?? "",
    slug: property?.slug ?? "",
    location: property?.location ?? "",
    city: property?.location ?? "",
    price: property?.price ?? "",
    bedrooms: property?.bedrooms ?? 0,
    bathrooms: property?.bathrooms ?? 0,
    roomOccupants: property?.roomOccupants ?? 1,
    areaSqm:
      property?.areaSqm === null || property?.areaSqm === undefined
        ? ""
        : property.areaSqm,
    description: property?.description ?? "",
    descriptionEn: property?.descriptionEn ?? "",
    detailedDescription: property?.detailedDescription ?? "",
    detailedDescriptionEn: property?.detailedDescriptionEn ?? "",
    additionalInfo: property?.additionalInfo ?? "",
    additionalInfoEn: property?.additionalInfoEn ?? "",
    propertyType: property?.propertyType ?? "apartment",
    listingType: property?.listingType ?? "rent",
    address: property?.address ?? "",
    furnishing: property?.furnishing ?? "unfurnished",
    availabilityStatus: property?.availabilityStatus ?? "available",
    isFeatured: property?.isFeatured ?? false,
    isActive: property?.isActive ?? false,
    deposit: property?.deposit ?? "",
    minimumStay: property?.minimumStay ?? "",
    availableFrom: property?.availableFrom ?? (mode === "create" ? todayLocalISODate() : ""),
    images: property?.images?.map((i) => i.imageUrl).join("\n") ?? "",
    amenityIds: property?.propertyAmenities?.map((pa) => pa.amenity.id) ?? [] as string[],
  })
  const [activeLang, setActiveLang] = useState<"de" | "en">("de")

  useEffect(() => {
    fetch("/api/amenities", { credentials: "include" })
      .then(async (r) => {
        const data = await r.json()
        if (!r.ok || !Array.isArray(data)) {
          setAmenities([])
          return
        }
        setAmenities(data)
      })
      .catch(() => setAmenities([]))
  }, [])

  const update = (key: string, value: string | number | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const toggleAmenity = (id: string) => {
    const ids = form.amenityIds.includes(id)
      ? form.amenityIds.filter((x) => x !== id)
      : [...form.amenityIds, id]
    update("amenityIds", ids)
  }

  const uploadFiles = async (files: FileList | null) => {
    if (!files?.length) return
    setUploading(true)
    const existing = form.images.split("\n").filter(Boolean)
    const newUrls: string[] = []
    for (let i = 0; i < files.length; i++) {
      const fd = new FormData()
      fd.append("file", files[i])
      try {
        const res = await fetch("/api/upload", {
          method: "POST",
          credentials: "include",
          body: fd,
        })
        const data = await res.json()
        if (data?.url) newUrls.push(data.url)
        else if (data?.error) alert(data.error)
      } catch { /* skip failed uploads */ }
    }
    update("images", [...existing, ...newUrls].join("\n"))
    setUploading(false)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        location: form.city || form.location || "",
        price: parseFloat(String(form.price)) || 0,
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        roomOccupants: Math.min(3, Math.max(1, Number(form.roomOccupants) || 1)),
        areaSqm: form.areaSqm ? parseFloat(String(form.areaSqm)) : null,
        images: form.images.split("\n").map((s) => s.trim()).filter(Boolean),
        amenityIds: form.amenityIds,
      }
      const url = mode === "create" ? "/api/admin/properties" : `/api/admin/properties/${property?.id}`
      const method = mode === "create" ? "POST" : "PUT"
      const res = await fetch(url, {
        method,
        credentials: "include",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })
      if (res.ok) {
        router.push("/admin/properties")
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error ?? "Failed to save")
      }
    } catch {
      alert("Failed to save")
    } finally {
      setLoading(false)
    }
  }

  const preventEnterSubmit = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key === "Enter" && (e.target as HTMLElement).tagName === "INPUT") {
      e.preventDefault()
    }
  }

  return (
    <form onSubmit={handleSubmit} onKeyDown={preventEnterSubmit}>
      <div className="mb-4 flex items-center gap-3 rounded-md border border-border bg-muted/50 px-3 py-2">
        <span className="text-sm font-medium text-muted-foreground">Text language:</span>
        <div className="inline-flex rounded-md border border-border bg-background p-0.5">
          <button
            type="button"
            onClick={() => setActiveLang("de")}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              activeLang === "de" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            Deutsch
          </button>
          <button
            type="button"
            onClick={() => setActiveLang("en")}
            className={`rounded px-3 py-1 text-sm font-medium transition-colors ${
              activeLang === "en" ? "bg-primary text-primary-foreground" : "text-muted-foreground hover:text-foreground"
            }`}
          >
            English
          </button>
        </div>
        <span className="text-xs text-muted-foreground">Applies to Beschreibung and Weitere Informationen tabs below.</span>
      </div>
      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="h-auto flex-wrap">
          <TabsTrigger value="basic">Basic Info</TabsTrigger>
          <TabsTrigger value="description">Beschreibung</TabsTrigger>
          <TabsTrigger value="location">Lage</TabsTrigger>
          <TabsTrigger value="amenities">Ausstattung</TabsTrigger>
          <TabsTrigger value="additional">Weitere Informationen</TabsTrigger>
          <TabsTrigger value="pricing">Pricing & Details</TabsTrigger>
          <TabsTrigger value="photos">Photos</TabsTrigger>
          <TabsTrigger value="extra">Extra / SEO</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>Basic Info</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Title</Label>
                <Input value={form.title} onChange={(e) => update("title", e.target.value)} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Listing Type</Label>
                  <Select value={form.listingType} onValueChange={(v) => update("listingType", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">Rent</SelectItem>
                      <SelectItem value="sale">Sale</SelectItem>
                      <SelectItem value="pg">PG</SelectItem>
                      <SelectItem value="student_housing">Student Housing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>Property Type</Label>
                  <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">Apartment</SelectItem>
                      <SelectItem value="house">House</SelectItem>
                      <SelectItem value="studio">Studio</SelectItem>
                      <SelectItem value="pg">PG</SelectItem>
                      <SelectItem value="student_housing">Student Housing</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>Bedrooms</Label>
                  <Input type="number" min={0} value={form.bedrooms || ""} onChange={(e) => update("bedrooms", e.target.value ? Number(e.target.value) : 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Bathrooms</Label>
                  <Input type="number" min={0} value={form.bathrooms || ""} onChange={(e) => update("bathrooms", e.target.value ? Number(e.target.value) : 0)} />
                </div>
                <div className="space-y-2">
                  <Label>Area (m²)</Label>
                  <Input type="number" step="0.01" value={form.areaSqm} onChange={(e) => update("areaSqm", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>Zimmerbelegung</Label>
                <Select
                  value={String(form.roomOccupants || 1)}
                  onValueChange={(v) => update("roomOccupants", Number(v))}
                >
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">Einzelzimmer (1 Person)</SelectItem>
                    <SelectItem value="2">Geteiltes Zimmer (2 Personen)</SelectItem>
                    <SelectItem value="3">Geteiltes Zimmer (3 Personen)</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">
                  Wird auf der Website mit 1–3 Personen-Symbolen angezeigt.
                </p>
              </div>
              <div className="space-y-2">
                <Label>Availability Status</Label>
                <Select value={form.availabilityStatus} onValueChange={(v) => update("availabilityStatus", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">Available</SelectItem>
                    <SelectItem value="reserved">Reserved</SelectItem>
                    <SelectItem value="rented">Rented</SelectItem>
                    <SelectItem value="sold">Sold</SelectItem>
                    <SelectItem value="upcoming">Upcoming</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="isActive" checked={form.isActive} onCheckedChange={(c) => update("isActive", Boolean(c))} />
                <Label htmlFor="isActive">Sichtbar (live auf der Website)</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>Beschreibung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Short Description {activeLang === "en" && "(English)"}</Label>
                <Textarea
                  value={activeLang === "de" ? form.description : form.descriptionEn}
                  onChange={(e) => update(activeLang === "de" ? "description" : "descriptionEn", e.target.value)}
                  rows={4}
                />
              </div>
              <div className="space-y-2">
                <Label>Detailed Description {activeLang === "en" && "(English)"}</Label>
                <Textarea
                  value={activeLang === "de" ? form.detailedDescription : form.detailedDescriptionEn}
                  onChange={(e) =>
                    update(activeLang === "de" ? "detailedDescription" : "detailedDescriptionEn", e.target.value)
                  }
                  rows={8}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>Lage</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>City / Area</Label>
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder="e.g. Nürnberg" />
              </div>
              <div className="space-y-2">
                <Label>Full Address</Label>
                <Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder="e.g. Holzschuherstraße 12" />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle>Ausstattung</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex flex-wrap gap-2">
                {amenities.map((a) => (
                  <label key={a.id} className="flex items-center gap-1.5 text-sm">
                    <Checkbox checked={form.amenityIds.includes(a.id)} onCheckedChange={() => toggleAmenity(a.id)} />
                    {a.name}
                  </label>
                ))}
                {amenities.length === 0 && <p className="text-sm text-muted-foreground">No amenities defined.</p>}
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional">
          <Card>
            <CardHeader>
              <CardTitle>Weitere Informationen</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Additional Info {activeLang === "en" && "(English)"}</Label>
                <Textarea
                  value={activeLang === "de" ? form.additionalInfo : form.additionalInfoEn}
                  onChange={(e) => update(activeLang === "de" ? "additionalInfo" : "additionalInfoEn", e.target.value)}
                  rows={6}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="pricing">
          <Card>
            <CardHeader>
              <CardTitle>Pricing & Details</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>Price</Label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>Currency</Label>
                  <Select value="EUR" disabled>
                    <SelectTrigger><SelectValue /></SelectTrigger>
                    <SelectContent><SelectItem value="EUR">EUR</SelectItem></SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>Deposit (optional)</Label>
                <Input value={form.deposit} onChange={(e) => update("deposit", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>Furnishing</Label>
                <Select value={form.furnishing} onValueChange={(v) => update("furnishing", v)}>
                  <SelectTrigger><SelectValue /></SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">Furnished</SelectItem>
                    <SelectItem value="semi">Semi</SelectItem>
                    <SelectItem value="unfurnished">Unfurnished</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>Minimum Stay</Label>
                <Input value={form.minimumStay} onChange={(e) => update("minimumStay", e.target.value)} placeholder="e.g. 6 months" />
              </div>
              <div className="space-y-2">
                <Label>Available From</Label>
                <Input type="date" value={form.availableFrom} onChange={(e) => update("availableFrom", e.target.value)} />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>Photos</CardTitle>
              <p className="text-sm text-muted-foreground">Upload images from your device. First image = cover photo.</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <label
                className={`flex flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-12 transition-colors cursor-pointer ${
                  isDragging ? "border-primary bg-muted" : "border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted"
                }`}
                onDragOver={(e) => {
                  e.preventDefault()
                  setIsDragging(true)
                }}
                onDragLeave={(e) => {
                  e.preventDefault()
                  setIsDragging(false)
                }}
                onDrop={async (e) => {
                  e.preventDefault()
                  setIsDragging(false)
                  if (uploading) return
                  await uploadFiles(e.dataTransfer.files)
                }}
              >
                <input
                  type="file"
                  accept="image/jpeg,image/png,image/webp,image/gif"
                  multiple
                  disabled={uploading}
                  className="hidden"
                  onChange={async (e) => {
                    await uploadFiles(e.target.files)
                    e.target.value = ""
                  }}
                />
                <Upload className="h-10 w-10 text-muted-foreground" />
                <span className="text-muted-foreground">
                  {uploading ? "Uploading..." : "Click to upload or drag and drop"}
                </span>
                <span className="text-xs text-muted-foreground">
                  JPEG, PNG, WebP, or GIF · max. 5 MB per image · automatically optimized
                </span>
              </label>
              {form.images && (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                  {form.images.split("\n").filter(Boolean).map((url, i) => (
                    <div key={url} className="relative group aspect-square rounded-lg overflow-hidden bg-muted border">
                      <img src={url} alt="" className="w-full h-full object-cover" />
                      <Button
                        type="button"
                        variant="destructive"
                        size="icon"
                        className="absolute top-1 right-1 h-7 w-7 opacity-0 group-hover:opacity-100 transition-opacity"
                        onClick={() => {
                          const urls = form.images.split("\n").filter(Boolean)
                          urls.splice(i, 1)
                          update("images", urls.join("\n"))
                        }}
                      >
                        <X className="h-4 w-4" />
                      </Button>
                      {i === 0 && (
                        <span className="absolute bottom-1 left-1 text-xs bg-primary text-primary-foreground px-1.5 rounded">
                          Cover
                        </span>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="extra">
          <Card>
            <CardHeader>
              <CardTitle>Extra / SEO</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>Slug (URL)</Label>
                <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder="auto-generated from title" />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="isFeatured" checked={form.isFeatured} onCheckedChange={(c) => update("isFeatured", Boolean(c))} />
                <Label htmlFor="isFeatured">Featured Property</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? "Saving..." : "Save"}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/properties")}>
          Cancel
        </Button>
      </div>
    </form>
  )
}
