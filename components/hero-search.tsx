"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Slider } from "@/components/ui/slider"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Building2, MapPin, Search, WalletCards } from "lucide-react"
import { useLanguage } from "@/contexts/language-context"

export function HeroSearch() {
  const { t } = useLanguage()
  const router = useRouter()
  const [location, setLocation] = useState("")
  const [propertyType, setPropertyType] = useState<string>("")
  const [priceRange, setPriceRange] = useState<[number, number]>([200, 3000])

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    const params = new URLSearchParams()
    if (location.trim()) params.set("location", location.trim())
    if (propertyType) params.set("property_type", propertyType)
    params.set("min_price", String(priceRange[0]))
    params.set("max_price", String(priceRange[1]))
    router.push(`/angebote?${params.toString()}`)
  }

  return (
    <form onSubmit={handleSearch}>
      <div className="rounded-2xl border border-border/80 bg-background p-2 shadow-sm">
        <div className="flex flex-col gap-2 lg:flex-row lg:items-center">
          <div className="flex w-full items-center gap-2 rounded-xl px-3 py-2 lg:min-w-0 lg:flex-1 lg:border-r lg:border-border">
            <MapPin className="h-4 w-4 shrink-0 text-muted-foreground" />
            <Input
              id="location"
              placeholder={t("heroSearch.locationPlaceholder")}
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              className="h-auto min-w-0 border-0 p-0 text-sm shadow-none focus-visible:ring-0"
            />
          </div>

          <div className="w-full rounded-xl px-3 py-2 lg:min-w-0 lg:flex-1 lg:border-r lg:border-border">
            <Select value={propertyType || "all"} onValueChange={(v) => setPropertyType(v === "all" ? "" : v)}>
              <SelectTrigger
                id="property_type"
                className="h-auto w-full border-0 p-0 text-sm shadow-none ring-0 focus:ring-0 focus:ring-offset-0"
              >
                <div className="flex min-w-0 items-center gap-2 text-muted-foreground">
                  <Building2 className="h-4 w-4 shrink-0" />
                  <SelectValue placeholder={t("heroSearch.propertyType")} />
                </div>
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="all">{t("heroSearch.any")}</SelectItem>
                <SelectItem value="house">{t("heroSearch.typeHouse")}</SelectItem>
                <SelectItem value="apartment">{t("heroSearch.typeFlat")}</SelectItem>
                <SelectItem value="student_housing">{t("heroSearch.typeWgFlats")}</SelectItem>
                <SelectItem value="studio">{t("heroSearch.typeStudioApartment")}</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="w-full space-y-1 rounded-xl px-3 py-2 lg:min-w-0 lg:flex-[1.2]">
            <div className="flex flex-col gap-1 sm:flex-row sm:items-center sm:justify-between">
              <div className="flex items-center gap-2 text-sm text-muted-foreground">
                <WalletCards className="h-4 w-4 shrink-0" />
                <span>{t("heroSearch.price")}</span>
              </div>
              <div className="text-xs font-medium text-muted-foreground">
                EUR {priceRange[0].toLocaleString()} - EUR {priceRange[1].toLocaleString()}
              </div>
            </div>
            <Slider
              value={priceRange}
              min={200}
              max={3000}
              step={25}
              onValueChange={(value) => setPriceRange([value[0], value[1]])}
              className="[&_[data-slot=slider-range]]:bg-primary [&_[data-slot=slider-thumb]]:border-primary"
            />
          </div>

          <Button
            type="submit"
            className="h-12 w-full shrink-0 rounded-xl bg-primary text-primary-foreground hover:bg-primary/90 lg:w-12"
            aria-label={t("heroSearch.search")}
          >
            <Search className="h-5 w-5 lg:mx-auto" />
            <span className="ml-2 lg:sr-only">{t("heroSearch.search")}</span>
          </Button>
        </div>
      </div>
    </form>
  )
}
