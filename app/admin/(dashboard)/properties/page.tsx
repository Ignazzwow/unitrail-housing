"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
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
import { Plus, Pencil, Eye, Star, Trash2 } from "lucide-react"

interface Property {
  id: string
  slug: string
  title: string
  location: string
  listingType: string
  propertyType: string
  price: number
  availabilityStatus: string
  isActive: boolean
  isFeatured: boolean
  updatedAt: string
  images: { imageUrl: string }[]
}

export default function PropertiesPage() {
  const [properties, setProperties] = useState<Property[]>([])
  const [loading, setLoading] = useState(true)
  const [deletingId, setDeletingId] = useState<string | null>(null)
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [listingTypeFilter, setListingTypeFilter] = useState<string>("all")
  const [propertyTypeFilter, setPropertyTypeFilter] = useState<string>("all")
  const [availabilityFilter, setAvailabilityFilter] = useState<string>("all")

  const fetchProperties = async () => {
    try {
      let url = "/api/admin/properties?limit=100"
      if (search) url += `&search=${encodeURIComponent(search)}`
      if (statusFilter === "active") url += "&status=active"
      if (statusFilter === "inactive") url += "&status=inactive"
      if (listingTypeFilter !== "all") url += `&listingType=${listingTypeFilter}`
      if (propertyTypeFilter !== "all") url += `&propertyType=${propertyTypeFilter}`
      if (availabilityFilter !== "all") url += `&availabilityStatus=${availabilityFilter}`
      const res = await fetch(url)
      const data = await res.json()
      setProperties(data.properties ?? [])
    } catch {
      setProperties([])
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchProperties()
  }, [statusFilter, listingTypeFilter, propertyTypeFilter, availabilityFilter])

  const handleDelete = async (id: string, title: string) => {
    if (!window.confirm(`"${title}" permanently delete? This cannot be undone.`)) return
    setDeletingId(id)
    try {
      const res = await fetch(`/api/admin/properties/${id}`, {
        method: "DELETE",
        credentials: "include",
      })
      if (res.ok) {
        setProperties((prev) => prev.filter((p) => p.id !== id))
      } else {
        const err = await res.json()
        alert(err.error ?? "Failed to delete property")
      }
    } catch {
      alert("Failed to delete property")
    } finally {
      setDeletingId(null)
    }
  }

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault()
    fetchProperties()
  }

  const filteredBySearch = properties.filter(
    (p) =>
      !search ||
      p.title.toLowerCase().includes(search.toLowerCase()) ||
      p.location.toLowerCase().includes(search.toLowerCase())
  )

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-lg font-semibold">Properties</h2>
        <Button asChild>
          <Link href="/admin/properties/new">
            <Plus className="mr-2 h-4 w-4" />
            Add Property
          </Link>
        </Button>
      </div>

      {/* Filters */}
      <Card>
        <CardContent className="pt-6">
          <form onSubmit={handleSearch} className="flex flex-wrap items-end gap-4">
            <div className="flex-1 min-w-[200px]">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Search
              </label>
              <Input
                placeholder="Search by title, city..."
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
            </div>
            <div className="w-36">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Status
              </label>
              <Select value={statusFilter} onValueChange={setStatusFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="active">Published</SelectItem>
                  <SelectItem value="inactive">Draft</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Availability
              </label>
              <Select value={availabilityFilter} onValueChange={setAvailabilityFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="available">Available</SelectItem>
                  <SelectItem value="reserved">Reserved</SelectItem>
                  <SelectItem value="rented">Rented</SelectItem>
                  <SelectItem value="sold">Sold</SelectItem>
                  <SelectItem value="upcoming">Upcoming</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-36">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Listing Type
              </label>
              <Select value={listingTypeFilter} onValueChange={setListingTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                  <SelectItem value="student_housing">Student Housing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-40">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Property Type
              </label>
              <Select value={propertyTypeFilter} onValueChange={setPropertyTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="apartment">Apartment</SelectItem>
                  <SelectItem value="house">House</SelectItem>
                  <SelectItem value="studio">Studio</SelectItem>
                  <SelectItem value="pg">PG</SelectItem>
                  <SelectItem value="student_housing">Student Housing</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <Button type="submit" variant="secondary">Apply</Button>
            <Button
              type="button"
              variant="outline"
              onClick={() => {
                setSearch("")
                setStatusFilter("all")
                setListingTypeFilter("all")
                setPropertyTypeFilter("all")
                setAvailabilityFilter("all")
                setTimeout(fetchProperties, 0)
              }}
            >
              Clear
            </Button>
          </form>
        </CardContent>
      </Card>

      {/* Table */}
      <Card>
        <CardContent className="p-0">
          {loading ? (
            <div className="flex items-center justify-center py-24">
              <p className="text-muted-foreground">Loading...</p>
            </div>
          ) : (
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead className="w-14">Image</TableHead>
                  <TableHead>Title</TableHead>
                  <TableHead>City</TableHead>
                  <TableHead>Type</TableHead>
                  <TableHead>Price</TableHead>
                  <TableHead>Status</TableHead>
                  <TableHead className="w-12">Featured</TableHead>
                  <TableHead>Updated</TableHead>
                  <TableHead className="w-24">Actions</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {filteredBySearch.length === 0 ? (
                  <TableRow>
                    <TableCell colSpan={9} className="text-center py-12 text-muted-foreground">
                      No properties found.
                    </TableCell>
                  </TableRow>
                ) : (
                  filteredBySearch.map((prop) => (
                    <TableRow key={prop.id}>
                      <TableCell>
                        <div className="h-10 w-14 overflow-hidden rounded bg-muted">
                          {prop.images?.[0]?.imageUrl ? (
                            <img
                              src={prop.images[0].imageUrl}
                              alt=""
                              className="h-full w-full object-cover"
                            />
                          ) : (
                            <div className="flex h-full items-center justify-center text-xs text-muted-foreground">
                              —
                            </div>
                          )}
                        </div>
                      </TableCell>
                      <TableCell className="font-medium">{prop.title}</TableCell>
                      <TableCell>{prop.location}</TableCell>
                      <TableCell>{prop.listingType}</TableCell>
                      <TableCell>€{prop.price}/mo</TableCell>
                      <TableCell>
                        <Badge variant={prop.isActive ? "default" : "secondary"}>
                          {prop.isActive ? "Published" : "Draft"}
                        </Badge>
                      </TableCell>
                      <TableCell>
                        {prop.isFeatured ? (
                          <Star className="h-4 w-4 fill-amber-400 text-amber-400" />
                        ) : (
                          <span className="text-muted-foreground">—</span>
                        )}
                      </TableCell>
                      <TableCell className="text-muted-foreground">
                        {new Date(prop.updatedAt).toLocaleDateString()}
                      </TableCell>
                      <TableCell>
                        <div className="flex gap-1">
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/admin/properties/${prop.id}/edit`}>
                              <Pencil className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button variant="ghost" size="sm" asChild>
                            <Link href={`/angebote/${prop.slug}`} target="_blank">
                              <Eye className="h-4 w-4" />
                            </Link>
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            disabled={deletingId === prop.id}
                            onClick={() => handleDelete(prop.id, prop.title)}
                          >
                            <Trash2 className="h-4 w-4 text-destructive" />
                          </Button>
                        </div>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          )}
        </CardContent>
      </Card>
    </div>
  )
}
