import { NextResponse } from "next/server"
import { prisma } from "@/lib/db"

// PUBLIC: GET /api/amenities - List all amenities (for filters)
export async function GET() {
  try {
    const amenities = await prisma.amenity.findMany({
      orderBy: { name: "asc" },
    })
    return NextResponse.json(amenities)
  } catch (error) {
    console.error("Failed to fetch amenities:", error)
    return NextResponse.json({ error: "Failed to fetch amenities" }, { status: 500 })
  }
}
