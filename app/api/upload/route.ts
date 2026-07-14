import { NextRequest, NextResponse } from "next/server"
import { put } from "@vercel/blob"
import { requireAdmin } from "@/lib/auth-utils"
import {
  UPLOAD_ALLOWED_TYPES,
  UPLOAD_MAX_BYTES,
  extensionForMime,
  matchesImageSignature,
} from "@/lib/upload-validation"

export async function POST(request: NextRequest) {
  try {
    await requireAdmin()
  } catch {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  try {
    const formData = await request.formData()
    const file = formData.get("file") as File | null

    if (!file || !(file instanceof File)) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 })
    }

    if (file.size > UPLOAD_MAX_BYTES) {
      return NextResponse.json(
        { error: "File too large. Maximum size is 5 MB." },
        { status: 400 }
      )
    }

    if (!UPLOAD_ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
        { status: 400 }
      )
    }

    const ext = extensionForMime(file.type)
    if (!ext) {
      return NextResponse.json({ error: "Unsupported file type." }, { status: 400 })
    }

    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)

    if (!matchesImageSignature(buffer, file.type)) {
      return NextResponse.json(
        { error: "File content does not match the declared image type." },
        { status: 400 }
      )
    }

    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`

    const blob = await put(uniqueName, buffer, {
      access: "public",
      contentType: file.type,
      token: process.env.BLOB_READ_WRITE_TOKEN,
    })

    return NextResponse.json({ url: blob.url })
  } catch (error) {
    console.error("Upload failed:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
