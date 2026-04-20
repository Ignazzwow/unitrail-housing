"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Search } from "lucide-react"

export function HeroSearch() {
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState<string>("")
  const [listingType, setListingType] = useState<string>("")
  const [minPrice, setMinPrice] = useState("")
  const [maxPrice, setMaxPrice] = useState("")
  const [bedrooms, setBedrooms] = useState<string>("")

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set("location", location.trim())
    if (propertyType) params.set("property_type", propertyType)
    if (listingType) params.set("listing_type", listingType)
    if (minPrice) params.set("min_price", minPrice)
    if (maxPrice) params.set("max_price", maxPrice)
    if (bedrooms) params.set("bedrooms", bedrooms)
    router.push(`/angebote?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch} className="space-y-4">
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6">
        <div className="space-y-2 sm:col-span-2 lg:col-span-2">
          <Label htmlFor="location" className="text-sm font-medium">Location</Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="location"
              placeholder="City or area (e.g. Berlin, Munich)"
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="property_type" className="text-sm font-medium">Property Type</Label>
          <Select value={propertyType || "all"} onValueChange={(v) => setPropertyType(v === "all" ? "" : v)}>
            <SelectTrigger id="property_type">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="apartment">Apartment</SelectItem>
              <SelectItem value="house">House</SelectItem>
              <SelectItem value="studio">Studio</SelectItem>
              <SelectItem value="student_housing">Student Housing</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listing_type" className="text-sm font-medium">Listing Type</Label>
          <Select value={listingType || "all"} onValueChange={(v) => setListingType(v === "all" ? "" : v)}>
            <SelectTrigger id="listing_type">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="rent">Rent</SelectItem>
              <SelectItem value="student_housing">Student Housing</SelectItem>
              <SelectItem value="pg">PG</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="text-sm font-medium">Bedrooms</Label>
          <Select value={bedrooms || "all"} onValueChange={(v) => setBedrooms(v === "all" ? "" : v)}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder="Any" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">Any</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex gap-2 items-end">
          <div className="space-y-2">
            <Label htmlFor="min_price" className="text-sm font-medium">Min Price €</Label>
            <Input
              id="min_price"
              type="number"
              placeholder="0"
              min={0}
              value={minPrice}
              onChange={(e) => setMinPrice(e.target.value)}
              className="w-24"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="max_price" className="text-sm font-medium">Max Price €</Label>
            <Input
              id="max_price"
              type="number"
              placeholder="1000"
              min={0}
              value={maxPrice}
              onChange={(e) => setMaxPrice(e.target.value)}
              className="w-24"
            />
          </div>
        </div>
        <Button type="submit" size="lg" className="gap-2">
          <Search className="h-4 w-4" />
          Search
        </Button>
      </div>
    </form>
  )
}
