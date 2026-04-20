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
import { Plus, Pencil, Eye, Star } from "lucide-react"

interface Property {
  id: string
  slug: string
  title: string
  location: string
  listingType: string
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
  const [search, setSearch] = useState("")
  const [statusFilter, setStatusFilter] = useState<string>("all")
  const [typeFilter, setTypeFilter] = useState<string>("all")

  const fetchProperties = async () => {
    try {
      let url = "/api/admin/properties?limit=100"
      if (search) url += `&search=${encodeURIComponent(search)}`
      if (statusFilter === "active") url += "&status=active"
      if (statusFilter === "inactive") url += "&status=inactive"
      if (typeFilter !== "all") url += `&listingType=${typeFilter}`
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
  }, [statusFilter, typeFilter])

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
                  <SelectItem value="active">Active</SelectItem>
                  <SelectItem value="inactive">Inactive</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="w-36">
              <label className="mb-1 block text-sm font-medium text-muted-foreground">
                Type
              </label>
              <Select value={typeFilter} onValueChange={setTypeFilter}>
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All</SelectItem>
                  <SelectItem value="rent">Rent</SelectItem>
                  <SelectItem value="sale">Sale</SelectItem>
                  <SelectItem value="student_housing">Student</SelectItem>
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
                setTypeFilter("all")
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
                          {prop.isActive ? "Active" : "Inactive"}
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
