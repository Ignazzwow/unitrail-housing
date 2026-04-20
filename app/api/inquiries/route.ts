import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { sendInquiryNotification } from "@/lib/email"

const inquirySchema = z.object({
  property_id: z.string().optional().nullable(),
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email"),
  phone: z.string().optional().default(""),
  message: z.string().min(1, "Message is required"),
  source: z.string().optional().default("website_form"),
})

// PUBLIC: POST /api/inquiries - Submit inquiry form
export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const parseResult = inquirySchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      )
    }

    const { property_id, name, email, phone, message, source } = parseResult.data

    const ipAddress = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined
    const userAgent = request.headers.get("user-agent") ?? undefined

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId: property_id || null,
        name,
        email,
        phone: phone || "",
        message,
        source,
        status: "new",
        ipAddress,
        userAgent,
      },
    })

    // Send notification email (non-blocking)
    sendInquiryNotification(inquiry.id, { name, email, phone, message, propertyId: property_id ?? undefined }).catch(
      (err) => console.error("Failed to send inquiry notification:", err)
    )

    return NextResponse.json({ success: true, id: inquiry.id })
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}
