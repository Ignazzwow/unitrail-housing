"use client"

import { useState } from "react"
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
  locationInfo?: string | null
  locationInfoEn?: string | null
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
  propertyAmenities?: { amenity: { id: string; name?: string } }[]
}

interface PropertyFormTabsProps {
  property?: PropertyFormData | null
  mode: "create" | "edit"
}

const LABELS = {
  de: {
    textLanguage: "Textsprache:",
    textLanguageHint: "Gilt für Beschreibung, Lage-Text und Weitere Informationen.",
    tabBasic: "Basisinfo",
    tabDescription: "Beschreibung",
    tabLocation: "Lage",
    tabAmenities: "Ausstattung",
    tabAdditional: "Weitere Informationen",
    tabPricing: "Preis & Details",
    tabPhotos: "Fotos",
    tabExtra: "Extra / SEO",
    title: "Titel",
    listingType: "Angebotsart",
    propertyType: "Objekttyp",
    rent: "Miete",
    sale: "Kauf",
    pg: "WG / PG",
    studentHousing: "Studentenwohnen",
    apartment: "Wohnung",
    house: "Haus",
    studio: "Studio",
    bedrooms: "Schlafzimmer",
    bathrooms: "Badezimmer",
    area: "Fläche (m²)",
    roomOccupancy: "Zimmerbelegung",
    singleRoom: "Einzelzimmer (1 Person)",
    shared2: "Geteiltes Zimmer (2 Personen)",
    shared3: "Geteiltes Zimmer (3 Personen)",
    roomOccupancyHint: "Wird auf der Website mit 1–3 Personen-Symbolen angezeigt.",
    availabilityStatus: "Verfügbarkeitsstatus",
    available: "Verfügbar",
    reserved: "Reserviert",
    rented: "Vermietet",
    sold: "Verkauft",
    upcoming: "Demnächst",
    availableFrom: "Verfügbar ab",
    visible: "Sichtbar (live auf der Website)",
    description: "Beschreibung",
    city: "Stadt / Viertel",
    street: "Straße",
    locationText: "Lage-Beschreibung",
    locationTextHint: "Freitext zur Lage (z. B. Entfernung zur Uni, ÖPNV, Umgebung).",
    cityPlaceholder: "z. B. Nürnberg",
    streetPlaceholder: "z. B. Holzschuherstraße 12",
    amenities: "Ausstattung (Freitext)",
    amenitiesPlaceholder: "z. B.\nWLAN\nWaschmaschine\nGeschirrspüler\nBalkon",
    amenitiesHint: "Ein Eintrag pro Zeile (oder mit Komma getrennt). Wird unter Ausstattung angezeigt.",
    additionalInfo: "Weitere Informationen",
    price: "Preis",
    currency: "Währung",
    deposit: "Kaution (optional)",
    furnishing: "Möblierung",
    furnished: "Möbliert",
    semi: "Teilmöbliert",
    unfurnished: "Unmöbliert",
    minimumStay: "Mindestmietdauer",
    minimumStayPlaceholder: "z. B. 6 Monate",
    photosHint: "Bilder vom Gerät hochladen. Erstes Bild = Titelbild.",
    uploading: "Wird hochgeladen…",
    uploadPrompt: "Klicken zum Hochladen oder Dateien hierher ziehen",
    uploadFormats: "JPEG, PNG, WebP oder GIF · max. 5 MB pro Bild · wird automatisch optimiert",
    cover: "Titelbild",
    slug: "Slug (URL)",
    slugPlaceholder: "wird automatisch aus dem Titel erzeugt",
    featured: "Hervorgehobenes Objekt",
    saving: "Speichern…",
    save: "Speichern",
    cancel: "Abbrechen",
    saveFailed: "Speichern fehlgeschlagen",
  },
  en: {
    textLanguage: "Text language:",
    textLanguageHint: "Applies to Description, Location text, and Additional information.",
    tabBasic: "Basic Info",
    tabDescription: "Description",
    tabLocation: "Location",
    tabAmenities: "Amenities",
    tabAdditional: "Additional information",
    tabPricing: "Pricing & Details",
    tabPhotos: "Photos",
    tabExtra: "Extra / SEO",
    title: "Title",
    listingType: "Listing type",
    propertyType: "Property type",
    rent: "Rent",
    sale: "Sale",
    pg: "PG",
    studentHousing: "Student housing",
    apartment: "Apartment",
    house: "House",
    studio: "Studio",
    bedrooms: "Bedrooms",
    bathrooms: "Bathrooms",
    area: "Area (m²)",
    roomOccupancy: "Room occupancy",
    singleRoom: "Single room (1 person)",
    shared2: "Shared room (2 people)",
    shared3: "Shared room (3 people)",
    roomOccupancyHint: "Shown on the website with 1–3 person icons.",
    availabilityStatus: "Availability status",
    available: "Available",
    reserved: "Reserved",
    rented: "Rented",
    sold: "Sold",
    upcoming: "Upcoming",
    availableFrom: "Available from",
    visible: "Visible (live on the website)",
    description: "Description",
    city: "City / Area",
    street: "Street",
    locationText: "Location description",
    locationTextHint: "Free text about the location (e.g. distance to uni, transit, surroundings).",
    cityPlaceholder: "e.g. Nuremberg",
    streetPlaceholder: "e.g. Holzschuherstraße 12",
    amenities: "Amenities (free text)",
    amenitiesPlaceholder: "e.g.\nWi-Fi\nWashing machine\nDishwasher\nBalcony",
    amenitiesHint: "One entry per line (or comma-separated). Shown under Amenities.",
    additionalInfo: "Additional information",
    price: "Price",
    currency: "Currency",
    deposit: "Deposit (optional)",
    furnishing: "Furnishing",
    furnished: "Furnished",
    semi: "Semi-furnished",
    unfurnished: "Unfurnished",
    minimumStay: "Minimum stay",
    minimumStayPlaceholder: "e.g. 6 months",
    photosHint: "Upload images from your device. First image = cover photo.",
    uploading: "Uploading…",
    uploadPrompt: "Click to upload or drag and drop",
    uploadFormats: "JPEG, PNG, WebP, or GIF · max. 5 MB per image · automatically optimized",
    cover: "Cover",
    slug: "Slug (URL)",
    slugPlaceholder: "auto-generated from title",
    featured: "Featured property",
    saving: "Saving…",
    save: "Save",
    cancel: "Cancel",
    saveFailed: "Failed to save",
  },
} as const

function todayLocalISODate() {
  const d = new Date()
  const mm = String(d.getMonth() + 1).padStart(2, "0")
  const dd = String(d.getDate()).padStart(2, "0")
  return `${d.getFullYear()}-${mm}-${dd}`
}

function pickDescription(property?: PropertyFormData | null, lang: "de" | "en") {
  if (lang === "en") {
    return property?.detailedDescriptionEn || property?.descriptionEn || ""
  }
  return property?.detailedDescription || property?.description || ""
}

export function PropertyFormTabs({ property, mode }: PropertyFormTabsProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [uploading, setUploading] = useState(false)
  const [isDragging, setIsDragging] = useState(false)
  const [activeLang, setActiveLang] = useState<"de" | "en">("de")
  const L = LABELS[activeLang]

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
    description: pickDescription(property, "de"),
    descriptionEn: pickDescription(property, "en"),
    additionalInfo: property?.additionalInfo ?? "",
    additionalInfoEn: property?.additionalInfoEn ?? "",
    locationInfo: property?.locationInfo ?? "",
    locationInfoEn: property?.locationInfoEn ?? "",
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
    amenitiesText:
      property?.propertyAmenities
        ?.map((pa) => pa.amenity?.name)
        .filter((n): n is string => Boolean(n?.trim()))
        .join("\n") ?? "",
  })

  const update = (key: string, value: string | number | boolean | string[]) => {
    setForm((prev) => ({ ...prev, [key]: value }))
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
      } catch {
        /* skip failed uploads */
      }
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
        // Keep short + detailed description in sync (single field in UI)
        description: form.description,
        detailedDescription: form.description,
        descriptionEn: form.descriptionEn,
        detailedDescriptionEn: form.descriptionEn,
        locationInfo: form.locationInfo,
        locationInfoEn: form.locationInfoEn,
        images: form.images
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        amenitiesText: form.amenitiesText,
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
        alert(err.error ?? L.saveFailed)
      }
    } catch {
      alert(L.saveFailed)
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
      <div className="mb-4 flex flex-wrap items-center gap-3 rounded-md border border-border bg-muted/50 px-3 py-2">
        <span className="text-sm font-medium text-muted-foreground">{L.textLanguage}</span>
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
        <span className="text-xs text-muted-foreground">{L.textLanguageHint}</span>
      </div>

      <Tabs defaultValue="basic" className="space-y-6">
        <TabsList className="flex h-auto flex-wrap">
          <TabsTrigger value="basic">{L.tabBasic}</TabsTrigger>
          <TabsTrigger value="description">{L.tabDescription}</TabsTrigger>
          <TabsTrigger value="location">{L.tabLocation}</TabsTrigger>
          <TabsTrigger value="amenities">{L.tabAmenities}</TabsTrigger>
          <TabsTrigger value="additional">{L.tabAdditional}</TabsTrigger>
          <TabsTrigger value="pricing">{L.tabPricing}</TabsTrigger>
          <TabsTrigger value="photos">{L.tabPhotos}</TabsTrigger>
          <TabsTrigger value="extra">{L.tabExtra}</TabsTrigger>
        </TabsList>

        <TabsContent value="basic">
          <Card>
            <CardHeader>
              <CardTitle>{L.tabBasic}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{L.title}</Label>
                <Input value={form.title} onChange={(e) => update("title", e.target.value)} required />
              </div>
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{L.listingType}</Label>
                  <Select value={form.listingType} onValueChange={(v) => update("listingType", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="rent">{L.rent}</SelectItem>
                      <SelectItem value="sale">{L.sale}</SelectItem>
                      <SelectItem value="pg">{L.pg}</SelectItem>
                      <SelectItem value="student_housing">{L.studentHousing}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label>{L.propertyType}</Label>
                  <Select value={form.propertyType} onValueChange={(v) => update("propertyType", v)}>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="apartment">{L.apartment}</SelectItem>
                      <SelectItem value="house">{L.house}</SelectItem>
                      <SelectItem value="studio">{L.studio}</SelectItem>
                      <SelectItem value="pg">{L.pg}</SelectItem>
                      <SelectItem value="student_housing">{L.studentHousing}</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="grid gap-4 sm:grid-cols-3">
                <div className="space-y-2">
                  <Label>{L.bedrooms}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.bedrooms || ""}
                    onChange={(e) => update("bedrooms", e.target.value ? Number(e.target.value) : 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{L.bathrooms}</Label>
                  <Input
                    type="number"
                    min={0}
                    value={form.bathrooms || ""}
                    onChange={(e) => update("bathrooms", e.target.value ? Number(e.target.value) : 0)}
                  />
                </div>
                <div className="space-y-2">
                  <Label>{L.area}</Label>
                  <Input type="number" step="0.01" value={form.areaSqm} onChange={(e) => update("areaSqm", e.target.value)} />
                </div>
              </div>
              <div className="space-y-2">
                <Label>{L.roomOccupancy}</Label>
                <Select value={String(form.roomOccupants || 1)} onValueChange={(v) => update("roomOccupants", Number(v))}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="1">{L.singleRoom}</SelectItem>
                    <SelectItem value="2">{L.shared2}</SelectItem>
                    <SelectItem value="3">{L.shared3}</SelectItem>
                  </SelectContent>
                </Select>
                <p className="text-xs text-muted-foreground">{L.roomOccupancyHint}</p>
              </div>
              <div className="space-y-2">
                <Label>{L.availabilityStatus}</Label>
                <Select value={form.availabilityStatus} onValueChange={(v) => update("availabilityStatus", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="available">{L.available}</SelectItem>
                    <SelectItem value="reserved">{L.reserved}</SelectItem>
                    <SelectItem value="rented">{L.rented}</SelectItem>
                    <SelectItem value="sold">{L.sold}</SelectItem>
                    <SelectItem value="upcoming">{L.upcoming}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{L.availableFrom}</Label>
                <Input type="date" value={form.availableFrom} onChange={(e) => update("availableFrom", e.target.value)} />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox id="isActive" checked={form.isActive} onCheckedChange={(c) => update("isActive", Boolean(c))} />
                <Label htmlFor="isActive">{L.visible}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="description">
          <Card>
            <CardHeader>
              <CardTitle>{L.tabDescription}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{L.description}</Label>
                <Textarea
                  value={activeLang === "de" ? form.description : form.descriptionEn}
                  onChange={(e) => update(activeLang === "de" ? "description" : "descriptionEn", e.target.value)}
                  rows={10}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="location">
          <Card>
            <CardHeader>
              <CardTitle>{L.tabLocation}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{L.city}</Label>
                <Input value={form.city} onChange={(e) => update("city", e.target.value)} placeholder={L.cityPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label>{L.street}</Label>
                <Input value={form.address} onChange={(e) => update("address", e.target.value)} placeholder={L.streetPlaceholder} />
              </div>
              <div className="space-y-2">
                <Label>{L.locationText}</Label>
                <Textarea
                  value={activeLang === "de" ? form.locationInfo : form.locationInfoEn}
                  onChange={(e) => update(activeLang === "de" ? "locationInfo" : "locationInfoEn", e.target.value)}
                  rows={6}
                />
                <p className="text-xs text-muted-foreground">{L.locationTextHint}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="amenities">
          <Card>
            <CardHeader>
              <CardTitle>{L.tabAmenities}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{L.amenities}</Label>
                <Textarea
                  value={form.amenitiesText}
                  onChange={(e) => update("amenitiesText", e.target.value)}
                  rows={8}
                  placeholder={L.amenitiesPlaceholder}
                />
                <p className="text-xs text-muted-foreground">{L.amenitiesHint}</p>
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="additional">
          <Card>
            <CardHeader>
              <CardTitle>{L.tabAdditional}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{L.additionalInfo}</Label>
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
              <CardTitle>{L.tabPricing}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-4 sm:grid-cols-2">
                <div className="space-y-2">
                  <Label>{L.price}</Label>
                  <Input type="number" step="0.01" value={form.price} onChange={(e) => update("price", e.target.value)} required />
                </div>
                <div className="space-y-2">
                  <Label>{L.currency}</Label>
                  <Select value="EUR" disabled>
                    <SelectTrigger>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="EUR">EUR</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>
              <div className="space-y-2">
                <Label>{L.deposit}</Label>
                <Input value={form.deposit} onChange={(e) => update("deposit", e.target.value)} />
              </div>
              <div className="space-y-2">
                <Label>{L.furnishing}</Label>
                <Select value={form.furnishing} onValueChange={(v) => update("furnishing", v)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="furnished">{L.furnished}</SelectItem>
                    <SelectItem value="semi">{L.semi}</SelectItem>
                    <SelectItem value="unfurnished">{L.unfurnished}</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="space-y-2">
                <Label>{L.minimumStay}</Label>
                <Input
                  value={form.minimumStay}
                  onChange={(e) => update("minimumStay", e.target.value)}
                  placeholder={L.minimumStayPlaceholder}
                />
              </div>
            </CardContent>
          </Card>
        </TabsContent>

        <TabsContent value="photos">
          <Card>
            <CardHeader>
              <CardTitle>{L.tabPhotos}</CardTitle>
              <p className="text-sm text-muted-foreground">{L.photosHint}</p>
            </CardHeader>
            <CardContent className="space-y-4">
              <label
                className={`flex cursor-pointer flex-col items-center justify-center gap-2 rounded-lg border-2 border-dashed px-6 py-12 transition-colors ${
                  isDragging
                    ? "border-primary bg-muted"
                    : "border-muted-foreground/25 bg-muted/50 hover:border-primary/50 hover:bg-muted"
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
                <span className="text-muted-foreground">{uploading ? L.uploading : L.uploadPrompt}</span>
                <span className="text-xs text-muted-foreground">{L.uploadFormats}</span>
              </label>
              {form.images && (
                <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4">
                  {form.images
                    .split("\n")
                    .filter(Boolean)
                    .map((url, i) => (
                      <div key={url} className="group relative aspect-square overflow-hidden rounded-lg border bg-muted">
                        <img src={url} alt="" className="h-full w-full object-cover" />
                        <Button
                          type="button"
                          variant="destructive"
                          size="icon"
                          className="absolute right-1 top-1 h-7 w-7 opacity-0 transition-opacity group-hover:opacity-100"
                          onClick={() => {
                            const urls = form.images.split("\n").filter(Boolean)
                            urls.splice(i, 1)
                            update("images", urls.join("\n"))
                          }}
                        >
                          <X className="h-4 w-4" />
                        </Button>
                        {i === 0 && (
                          <span className="absolute bottom-1 left-1 rounded bg-primary px-1.5 text-xs text-primary-foreground">
                            {L.cover}
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
              <CardTitle>{L.tabExtra}</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label>{L.slug}</Label>
                <Input value={form.slug} onChange={(e) => update("slug", e.target.value)} placeholder={L.slugPlaceholder} />
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isFeatured"
                  checked={form.isFeatured}
                  onCheckedChange={(c) => update("isFeatured", Boolean(c))}
                />
                <Label htmlFor="isFeatured">{L.featured}</Label>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      <div className="mt-6 flex gap-4">
        <Button type="submit" disabled={loading}>
          {loading ? L.saving : L.save}
        </Button>
        <Button type="button" variant="outline" onClick={() => router.push("/admin/properties")}>
          {L.cancel}
        </Button>
      </div>
    </form>
  )
}
