import { NextRequest, NextResponse } from "next/server"
import { prisma } from "@/lib/db"
import { z } from "zod"
import { sendInquiryNotification } from "@/lib/email"
import { checkRateLimit, getClientIp } from "@/lib/rate-limit"

export const maxDuration = 30

const inquirySchema = z.object({
  property_id: z.string().optional().nullable(),
  name: z.string().min(1, "Name is required").max(200),
  email: z.string().email("Invalid email").max(254),
  phone: z.string().max(50).optional().default(""),
  city: z.string().max(120).optional().default(""),
  message: z.string().min(1, "Message is required").max(5000),
  source: z.string().max(80).optional().default("website_form"),
  consent: z.literal(true, {
    errorMap: () => ({ message: "Privacy consent is required" }),
  }),
})

// PUBLIC: POST /api/inquiries - Submit inquiry form
export async function POST(request: NextRequest) {
  try {
    const ip = getClientIp(request)
    const rate = checkRateLimit(`inquiry:${ip}`, { limit: 8, windowMs: 60_000 })
    if (!rate.allowed) {
      return NextResponse.json(
        { error: "Too many requests. Please try again later." },
        {
          status: 429,
          headers: rate.retryAfterMs
            ? { "Retry-After": String(Math.ceil(rate.retryAfterMs / 1000)) }
            : undefined,
        }
      )
    }

    const body = await request.json()
    const parseResult = inquirySchema.safeParse(body)
    if (!parseResult.success) {
      return NextResponse.json(
        { error: "Validation failed", details: parseResult.error.flatten() },
        { status: 400 }
      )
    }

    const { property_id, name, email, phone, city, message, source } = parseResult.data

    const ipAddress = request.headers.get("x-forwarded-for") ?? request.headers.get("x-real-ip") ?? undefined
    const userAgent = request.headers.get("user-agent") ?? undefined

    const inquiry = await prisma.inquiry.create({
      data: {
        propertyId: property_id || null,
        name,
        email,
        phone: phone || "",
        city: city || "",
        message,
        source,
        status: "new",
        ipAddress,
        userAgent,
      },
    })

    // Await email on serverless — fire-and-forget gets killed when the response returns on Vercel
    try {
      const result = await sendInquiryNotification(inquiry.id, {
        name,
        email,
        phone,
        city,
        message,
        propertyId: property_id ?? undefined,
        source,
      })
      if (!result.sent) {
        console.warn(
          `[inquiries] Notification email not sent for inquiry ${inquiry.id}: ${result.reason}`
        )
      }
    } catch (err) {
      console.error("Failed to send inquiry notification:", err)
    }

    return NextResponse.json({ success: true, id: inquiry.id })
  } catch (error) {
    console.error("Failed to create inquiry:", error)
    return NextResponse.json({ error: "Failed to submit inquiry" }, { status: 500 })
  }
}
