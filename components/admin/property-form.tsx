"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"

interface PropertyFormData {
  id?: string
  slug?: string
  title?: string
  location?: string
  price?: number | string
  bedrooms?: number
  bathrooms?: number
  areaSqm?: number | string
  description?: string
  detailedDescription?: string
  propertyType?: string
  listingType?: string
  address?: string
  furnishing?: string
  availabilityStatus?: string
  isFeatured?: boolean
  isActive?: boolean
  deposit?: string
  minimumStay?: string
  availableFrom?: string
  images?: { imageUrl: string }[]
  propertyAmenities?: { amenity: { id: string } }[]
}

interface PropertyFormProps {
  property?: PropertyFormData | null
  mode: "create" | "edit"
}

export function PropertyForm({ property, mode }: PropertyFormProps) {
  const router = useRouter()
  const [loading, setLoading] = useState(false)
  const [form, setForm] = useState({
    title: property?.title ?? "",
    slug: property?.slug ?? "",
    location: property?.location ?? "",
    price: property?.price ?? "",
    bedrooms: property?.bedrooms ?? 0,
    bathrooms: property?.bathrooms ?? 0,
    areaSqm: property?.areaSqm ?? "",
    description: property?.description ?? "",
    detailedDescription: property?.detailedDescription ?? "",
    propertyType: property?.propertyType ?? "apartment",
    listingType: property?.listingType ?? "rent",
    address: property?.address ?? "",
    furnishing: property?.furnishing ?? "unfurnished",
    availabilityStatus: property?.availabilityStatus ?? "available",
    isFeatured: property?.isFeatured ?? false,
    isActive: property?.isActive ?? true,
    deposit: property?.deposit ?? "",
    minimumStay: property?.minimumStay ?? "",
    availableFrom: property?.availableFrom ?? "",
    images: property?.images?.map((i) => i.imageUrl).join("\n") ?? "",
    amenityIds: property?.propertyAmenities?.map((pa) => pa.amenity.id).join(",") ?? "",
  })

  const update = (key: string, value: string | number | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)
    try {
      const payload = {
        ...form,
        price: parseFloat(String(form.price)) || 0,
        bedrooms: Number(form.bedrooms) || 0,
        bathrooms: Number(form.bathrooms) || 0,
        areaSqm: form.areaSqm ? parseFloat(String(form.areaSqm)) : null,
        images: form.images
          .split("\n")
          .map((s) => s.trim())
          .filter(Boolean),
        amenityIds: form.amenityIds
          .split(",")
          .map((s) => s.trim())
          .filter(Boolean),
      }

      const url = mode === "create" ? "/api/admin/properties" : `/api/admin/properties/${property?.id}`
      const method = mode === "create" ? "POST" : "PUT"
      const res = await fetch(url, {
        method,
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
      })

      if (res.ok) {
        router.push("/admin")
        router.refresh()
      } else {
        const err = await res.json()
        alert(err.error ?? "Failed to save property")
      }
    } catch {
      alert("Failed to save property")
    } finally {
      setLoading(false)
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="space-y-6">
        <Card>
          <CardHeader>
            <CardTitle>Basic Info</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                value={form.title}
                onChange={(e) => update("title", e.target.value)}
                required
              />
            </div>
            {mode === "edit" && (
              <div className="space-y-2">
                <Label htmlFor="slug">Slug (URL)</Label>
                <Input
                  id="slug"
                  value={form.slug}
                  onChange={(e) => update("slug", e.target.value)}
                />
              </div>
            )}
            <div className="space-y-2">
              <Label htmlFor="location">Location</Label>
              <Input
                id="location"
                value={form.location}
                onChange={(e) => update("location", e.target.value)}
                required
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="price">Price (€/month)</Label>
                <Input
                  id="price"
                  type="number"
                  step="0.01"
                  value={form.price}
                  onChange={(e) => update("price", e.target.value)}
                  required
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availableFrom">Available From</Label>
                <Input
                  id="availableFrom"
                  type="date"
                  value={form.availableFrom}
                  onChange={(e) => update("availableFrom", e.target.value)}
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="propertyType">Property Type</Label>
                <Input
                  id="propertyType"
                  value={form.propertyType}
                  onChange={(e) => update("propertyType", e.target.value)}
                  placeholder="apartment, house, studio, pg, student_housing"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="listingType">Listing Type</Label>
                <Input
                  id="listingType"
                  value={form.listingType}
                  onChange={(e) => update("listingType", e.target.value)}
                  placeholder="rent, sale, pg, student_housing"
                />
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Property Details</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="grid gap-4 sm:grid-cols-3">
              <div className="space-y-2">
                <Label htmlFor="areaSqm">Area (m²)</Label>
                <Input
                  id="areaSqm"
                  type="number"
                  step="0.01"
                  value={form.areaSqm}
                  onChange={(e) => update("areaSqm", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bedrooms">Bedrooms</Label>
                <Input
                  id="bedrooms"
                  type="number"
                  min={0}
                  value={form.bedrooms || ""}
                  onChange={(e) => update("bedrooms", e.target.value ? Number(e.target.value) : 0)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="bathrooms">Bathrooms</Label>
                <Input
                  id="bathrooms"
                  type="number"
                  min={0}
                  value={form.bathrooms || ""}
                  onChange={(e) => update("bathrooms", e.target.value ? Number(e.target.value) : 0)}
                />
              </div>
            </div>
            <div className="space-y-2">
              <Label htmlFor="address">Address</Label>
              <Input
                id="address"
                value={form.address}
                onChange={(e) => update("address", e.target.value)}
              />
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="deposit">Deposit (€)</Label>
                <Input
                  id="deposit"
                  value={form.deposit}
                  onChange={(e) => update("deposit", e.target.value)}
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="minimumStay">Minimum Stay</Label>
                <Input
                  id="minimumStay"
                  value={form.minimumStay}
                  onChange={(e) => update("minimumStay", e.target.value)}
                  placeholder="e.g. 6 months"
                />
              </div>
            </div>
            <div className="grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label htmlFor="furnishing">Furnishing</Label>
                <Input
                  id="furnishing"
                  value={form.furnishing}
                  onChange={(e) => update("furnishing", e.target.value)}
                  placeholder="furnished, semi, unfurnished"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="availabilityStatus">Availability</Label>
                <Input
                  id="availabilityStatus"
                  value={form.availabilityStatus}
                  onChange={(e) => update("availabilityStatus", e.target.value)}
                  placeholder="available, reserved, rented, sold, upcoming"
                />
              </div>
            </div>
            <div className="flex gap-6">
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isFeatured"
                  checked={form.isFeatured}
                  onCheckedChange={(checked) => update("isFeatured", Boolean(checked))}
                />
                <Label htmlFor="isFeatured">Featured</Label>
              </div>
              <div className="flex items-center gap-2">
                <Checkbox
                  id="isActive"
                  checked={form.isActive}
                  onCheckedChange={(checked) => update("isActive", Boolean(checked))}
                />
                <Label htmlFor="isActive">Active</Label>
              </div>
            </div>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Images</CardTitle>
          </CardHeader>
          <CardContent>
            <Label htmlFor="images">Image URLs (one per line)</Label>
            <Textarea
              id="images"
              className="mt-2 min-h-[100px] font-mono text-sm"
              value={form.images}
              onChange={(e) => update("images", e.target.value)}
              placeholder={"/image1.jpg\n/image2.jpg"}
            />
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Description</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <Label htmlFor="description">Short Description</Label>
              <Textarea
                id="description"
                value={form.description}
                onChange={(e) => update("description", e.target.value)}
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="detailedDescription">Detailed Description</Label>
              <Textarea
                id="detailedDescription"
                className="min-h-[120px]"
                value={form.detailedDescription}
                onChange={(e) => update("detailedDescription", e.target.value)}
              />
            </div>
          </CardContent>
        </Card>

        <div className="flex gap-4">
          <Button type="submit" disabled={loading}>
            {loading ? "Saving..." : mode === "create" ? "Create Property" : "Save Changes"}
          </Button>
          <Button type="button" variant="outline" onClick={() => router.push("/admin")}>
            Cancel
          </Button>
        </div>
      </div>
    </form>
  )
}
