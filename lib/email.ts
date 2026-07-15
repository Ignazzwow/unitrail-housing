import nodemailer from "nodemailer"
import { prisma } from "./db"
import { sanitizeEmailAddress, sanitizeEmailHeader } from "./sanitize-email"
import { getInquiryCategory } from "./inquiry-category"

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
  const category = getInquiryCategory(source)

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

async function logEmail(entry: {
  inquiryId?: string | null
  recipients: string
  subject: string
  status: "sent" | "failed" | "skipped"
  errorMessage?: string
}) {
  await prisma.emailLog
    .create({
      data: {
        inquiryId: entry.inquiryId ?? null,
        recipients: entry.recipients,
        subject: entry.subject,
        status: entry.status,
        errorMessage: entry.errorMessage ?? null,
      },
    })
    .catch((error) => console.error("[email] Failed to write email log:", error))
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
  const adminEmails = await getNotificationRecipients(data.source)
  const safeName = sanitizeEmailHeader(data.name)
  const subject = `[UniTrail Housing] New inquiry from ${safeName}`
  const recipients = adminEmails.join(", ")

  if (!isSmtpConfigured()) {
    console.warn(
      "[email] SMTP is not configured. Inquiry saved, but no notification email was sent. Set SMTP_HOST, SMTP_USER, and SMTP_PASS."
    )
    await logEmail({ inquiryId, recipients, subject, status: "skipped", errorMessage: "smtp_not_configured" })
    return { sent: false, reason: "smtp_not_configured" as const }
  }

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
  const replyTo = sanitizeEmailAddress(data.email)

  try {
    await transporter.sendMail({
      from,
      to: recipients,
      ...(replyTo ? { replyTo } : {}),
      subject,
      html,
    })
  } catch (error) {
    const message = error instanceof Error ? error.message : "Unknown error"
    await logEmail({ inquiryId, recipients, subject, status: "failed", errorMessage: message })
    return { sent: false, reason: "send_failed" as const }
  }

  await logEmail({ inquiryId, recipients, subject, status: "sent" })
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
