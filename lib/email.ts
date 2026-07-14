import nodemailer from "nodemailer"
import { prisma } from "./db"
import { sanitizeEmailAddress, sanitizeEmailHeader } from "./sanitize-email"

const LANDLORD_SOURCES = new Set(["landlord_cta", "landlord_cta_form", "landlords_page"])

function getSiteUrl() {
  return (
    process.env.NEXT_PUBLIC_SITE_URL?.trim() ||
    process.env.NEXTAUTH_URL?.trim() ||
    "https://www.unitrail-housing.de"
  ).replace(/\/$/, "")
}

export function isSmtpConfigured() {
  return Boolean(
    process.env.SMTP_HOST?.trim() &&
      process.env.SMTP_USER?.trim() &&
      process.env.SMTP_PASS
  )
}

async function getNotificationRecipients(source?: string) {
  const category = source && LANDLORD_SOURCES.has(source) ? "landlord" : "student"

  const setting = await prisma.notificationSetting.findUnique({ where: { category } }).catch(() => null)
  if (setting?.email.trim()) {
    return setting.email
      .split(",")
      .map((email) => email.trim())
      .filter(Boolean)
  }

  if (category === "landlord") {
    return [process.env.LANDLORD_INQUIRY_EMAIL || "vermieten@unitrail-housing.de"]
  }

  const recipients =
    process.env.ADMIN_NOTIFICATION_EMAIL ||
    process.env.ADMIN_EMAIL ||
    "info@unitrail-housing.de"

  return recipients
    .split(",")
    .map((email) => email.trim())
    .filter(Boolean)
}

function createTransporter() {
  const port = parseInt(process.env.SMTP_PORT || "587", 10)
  const secure = process.env.SMTP_SECURE === "true" || port === 465

  return nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port,
    secure,
    auth: {
      user: process.env.SMTP_USER,
      pass: process.env.SMTP_PASS,
    },
  })
}

export async function sendInquiryNotification(
  inquiryId: string,
  data: {
    name: string
    email: string
    phone?: string
    city?: string
    message: string
    propertyId?: string | null
    source?: string
  }
) {
  if (!isSmtpConfigured()) {
    console.warn(
      "[email] SMTP is not configured. Inquiry saved, but no notification email was sent. Set SMTP_HOST, SMTP_USER, and SMTP_PASS."
    )
    return { sent: false, reason: "smtp_not_configured" as const }
  }

  const adminEmails = await getNotificationRecipients(data.source)
  const from = process.env.SMTP_FROM || process.env.SMTP_USER || "noreply@unitrail-housing.de"
  const siteUrl = getSiteUrl()
  const inquiryUrl = `${siteUrl}/admin/inquiries/${inquiryId}`

  let propertyTitle = "General Inquiry"
  if (data.propertyId) {
    const prop = await prisma.property.findUnique({
      where: { id: data.propertyId },
      select: { title: true },
    })
    propertyTitle = prop?.title ?? "Unknown Property"
  }

  const html = `
    <h2>New website inquiry</h2>
    <p><strong>From:</strong> ${escapeHtml(data.name)} (${escapeHtml(data.email)})</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${escapeHtml(data.phone)}</p>` : ""}
    ${data.city ? `<p><strong>City / location:</strong> ${escapeHtml(data.city)}</p>` : ""}
    <p><strong>Property:</strong> ${escapeHtml(propertyTitle)}</p>
    ${data.source ? `<p><strong>Source:</strong> ${escapeHtml(data.source)}</p>` : ""}
    <p><strong>Message:</strong></p>
    <p>${escapeHtml(data.message).replace(/\n/g, "<br>")}</p>
    <hr>
    <p><a href="${inquiryUrl}">View in admin dashboard</a></p>
    <p><small>Inquiry ID: ${escapeHtml(inquiryId)}</small></p>
  `

  const transporter = createTransporter()
  const safeName = sanitizeEmailHeader(data.name)
  const replyTo = sanitizeEmailAddress(data.email)

  await transporter.sendMail({
    from,
    to: adminEmails.join(", "),
    ...(replyTo ? { replyTo } : {}),
    subject: `[UniTrail Housing] New inquiry from ${safeName}`,
    html,
  })

  return { sent: true as const }
}

function escapeHtml(value: string) {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;")
}
