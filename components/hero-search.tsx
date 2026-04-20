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
import { useLanguage } from "@/contexts/language-context"

export function HeroSearch() {
  const { t } = useLanguage()
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
          <Label htmlFor="location" className="text-sm font-medium">
            {t("heroSearch.location")}
          </Label>
          <div className="relative">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              id="location"
              placeholder={t("heroSearch.locationPlaceholder")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
        <div className="space-y-2">
          <Label htmlFor="property_type" className="text-sm font-medium">
            {t("heroSearch.propertyType")}
          </Label>
          <Select value={propertyType || "all"} onValueChange={(v) => setPropertyType(v === "all" ? "" : v)}>
            <SelectTrigger id="property_type">
              <SelectValue placeholder={t("heroSearch.any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("heroSearch.any")}</SelectItem>
              <SelectItem value="apartment">{t("heroSearch.typeApartment")}</SelectItem>
              <SelectItem value="house">{t("heroSearch.typeHouse")}</SelectItem>
              <SelectItem value="studio">{t("heroSearch.typeStudio")}</SelectItem>
              <SelectItem value="student_housing">{t("heroSearch.typeStudentHousing")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="listing_type" className="text-sm font-medium">
            {t("heroSearch.listingType")}
          </Label>
          <Select value={listingType || "all"} onValueChange={(v) => setListingType(v === "all" ? "" : v)}>
            <SelectTrigger id="listing_type">
              <SelectValue placeholder={t("heroSearch.any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("heroSearch.any")}</SelectItem>
              <SelectItem value="rent">{t("heroSearch.listingRent")}</SelectItem>
              <SelectItem value="student_housing">{t("heroSearch.typeStudentHousing")}</SelectItem>
              <SelectItem value="pg">{t("heroSearch.listingPg")}</SelectItem>
            </SelectContent>
          </Select>
        </div>
        <div className="space-y-2">
          <Label htmlFor="bedrooms" className="text-sm font-medium">
            {t("heroSearch.bedrooms")}
          </Label>
          <Select value={bedrooms || "all"} onValueChange={(v) => setBedrooms(v === "all" ? "" : v)}>
            <SelectTrigger id="bedrooms">
              <SelectValue placeholder={t("heroSearch.any")} />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="all">{t("heroSearch.any")}</SelectItem>
              <SelectItem value="1">1+</SelectItem>
              <SelectItem value="2">2+</SelectItem>
              <SelectItem value="3">3+</SelectItem>
            </SelectContent>
          </Select>
        </div>
      </div>
      <div className="flex flex-wrap items-end gap-4">
        <div className="flex items-end gap-2">
          <div className="space-y-2">
            <Label htmlFor="min_price" className="text-sm font-medium">
              {t("heroSearch.minPrice")}
            </Label>
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
            <Label htmlFor="max_price" className="text-sm font-medium">
              {t("heroSearch.maxPrice")}
            </Label>
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
          {t("heroSearch.search")}
        </Button>
      </div>
    </form>
  )
}
