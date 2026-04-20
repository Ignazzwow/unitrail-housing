import { notFound } from "next/navigation"
import { getAdminPropertyById } from "@/lib/admin-data"
import { toPropertyFormData } from "@/lib/admin-property-form"
import { PropertyFormTabs } from "@/components/admin/property-form-tabs"

export const dynamic = "force-dynamic"

export default async function EditPropertyPage({
  params,
}: {
  params: Promise<{ id: string }> | { id: string }
}) {
  const { id } = await Promise.resolve(params)
  const property = await getAdminPropertyById(id)

  if (!property) {
    notFound()
  }

  return (
    <PropertyFormTabs
      key={property.id}
      property={toPropertyFormData(property)}
      mode="edit"
    />
  )
}
