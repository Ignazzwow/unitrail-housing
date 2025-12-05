import { NextRequest, NextResponse } from "next/server"
import nodemailer from "nodemailer"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { firstName, lastName, email, phone, university, message } = body

    // Validate required fields
    if (!firstName || !lastName || !email || !message) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 }
      )
    }

    // Check if SMTP is configured
    if (!process.env.SMTP_USER || !process.env.SMTP_PASSWORD) {
      console.error("SMTP configuration missing. SMTP_USER or SMTP_PASSWORD not set.")
      return NextResponse.json(
        { 
          error: "Email service not configured. Please contact the administrator.",
          details: "SMTP credentials are missing"
        },
        { status: 500 }
      )
    }

    // Create transporter
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST || "smtp.gmail.com",
      port: parseInt(process.env.SMTP_PORT || "587"),
      secure: false, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
      },
      // Add connection timeout
      connectionTimeout: 10000,
      greetingTimeout: 10000,
      socketTimeout: 10000,
    })

    // Verify connection
    try {
      await transporter.verify()
      console.log("SMTP server is ready to send emails")
    } catch (verifyError) {
      console.error("SMTP verification failed:", verifyError)
      return NextResponse.json(
        { 
          error: "Email service configuration error. Please contact the administrator.",
          details: verifyError instanceof Error ? verifyError.message : "SMTP verification failed"
        },
        { status: 500 }
      )
    }

    // Email content
    const mailOptions = {
      from: process.env.SMTP_FROM || process.env.SMTP_USER,
      to: "housing@unitrail.in",
      replyTo: email,
      subject: `Neue Kontaktanfrage von ${firstName} ${lastName}`,
      html: `
        <h2>Neue Kontaktanfrage</h2>
        <p><strong>Name:</strong> ${firstName} ${lastName}</p>
        <p><strong>E-Mail:</strong> <a href="mailto:${email}">${email}</a></p>
        ${phone ? `<p><strong>Telefon:</strong> <a href="tel:${phone}">${phone}</a></p>` : ""}
        ${university ? `<p><strong>Stadt:</strong> ${university}</p>` : ""}
        <p><strong>Nachricht:</strong></p>
        <p>${String(message).replace(/\n/g, "<br>").replace(/</g, "&lt;").replace(/>/g, "&gt;")}</p>
        <hr>
        <p style="color: #666; font-size: 12px;">Diese E-Mail wurde über das Kontaktformular auf unitrail-housing.de gesendet.</p>
      `,
      text: `
Neue Kontaktanfrage

Name: ${firstName} ${lastName}
E-Mail: ${email}
${phone ? `Telefon: ${phone}` : ""}
${university ? `Stadt: ${university}` : ""}

Nachricht:
${message}

---
Diese E-Mail wurde über das Kontaktformular auf unitrail-housing.de gesendet.
      `,
    }

    // Send email
    const info = await transporter.sendMail(mailOptions)
    console.log("Email sent successfully:", info.messageId)

    return NextResponse.json(
      { message: "Email sent successfully", messageId: info.messageId },
      { status: 200 }
    )
  } catch (error) {
    console.error("Error sending email:", error)
    
    // Provide more detailed error information
    const errorMessage = error instanceof Error ? error.message : "Unknown error"
    const errorDetails = error instanceof Error ? error.stack : String(error)
    
    console.error("Error details:", errorDetails)
    
    return NextResponse.json(
      { 
        error: "Failed to send email",
        details: process.env.NODE_ENV === "development" ? errorMessage : undefined
      },
      { status: 500 }
    )
  }
}

