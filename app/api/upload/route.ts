import { NextRequest, NextResponse } from "next/server"
import { writeFile, mkdir } from "fs/promises"
import path from "path"
import { requireAdmin } from "@/lib/auth-utils"

const UPLOAD_DIR = "public/uploads"
const ALLOWED_TYPES = ["image/jpeg", "image/png", "image/webp", "image/gif"]

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

    if (!ALLOWED_TYPES.includes(file.type)) {
      return NextResponse.json(
        { error: "Invalid file type. Use JPEG, PNG, WebP, or GIF." },
        { status: 400 }
      )
    }

    const ext = path.extname(file.name) || ".jpg"
    const uniqueName = `${Date.now()}-${Math.random().toString(36).slice(2, 9)}${ext}`
    const uploadPath = path.join(process.cwd(), UPLOAD_DIR, uniqueName)

    await mkdir(path.join(process.cwd(), UPLOAD_DIR), { recursive: true })
    const bytes = await file.arrayBuffer()
    const buffer = Buffer.from(bytes)
    await writeFile(uploadPath, buffer)

    const url = `/uploads/${uniqueName}`
    return NextResponse.json({ url })
  } catch (error) {
    console.error("Upload failed:", error)
    return NextResponse.json({ error: "Upload failed" }, { status: 500 })
  }
}
