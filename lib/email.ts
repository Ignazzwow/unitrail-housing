import nodemailer from "nodemailer"
import { prisma } from "./db"

const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST || "localhost",
  port: parseInt(process.env.SMTP_PORT || "587", 10),
  secure: false,
  auth:
    process.env.SMTP_USER && process.env.SMTP_PASS
      ? { user: process.env.SMTP_USER, pass: process.env.SMTP_PASS }
      : undefined,
})

export async function sendInquiryNotification(
  inquiryId: string,
  data: { name: string; email: string; phone?: string; message: string; propertyId?: string | null }
) {
  const adminEmail = process.env.ADMIN_EMAIL || "housing@unitrail.in"
  const from = process.env.SMTP_FROM || "noreply@unitrail.in"

  let propertyTitle = "General Inquiry"
  if (data.propertyId) {
    const prop = await prisma.property.findUnique({
      where: { id: data.propertyId },
      select: { title: true },
    })
    propertyTitle = prop?.title ?? "Unknown Property"
  }

  const html = `
    <h2>New Inquiry</h2>
    <p><strong>From:</strong> ${data.name} (${data.email})</p>
    ${data.phone ? `<p><strong>Phone:</strong> ${data.phone}</p>` : ""}
    <p><strong>Property:</strong> ${propertyTitle}</p>
    <p><strong>Message:</strong></p>
    <p>${data.message.replace(/\n/g, "<br>")}</p>
    <hr>
    <p><small>Inquiry ID: ${inquiryId}</small></p>
  `

  await transporter.sendMail({
    from,
    to: adminEmail,
    subject: `[UniTrail Housing] New inquiry from ${data.name}`,
    html,
  })
}
