import { NextRequest, NextResponse } from "next/server"
import { upsertAdminUser } from "@/lib/upsert-admin-user"

export async function POST(request: NextRequest) {
  const setupSecret = process.env.ADMIN_SETUP_SECRET
  if (!setupSecret) {
    return NextResponse.json({ error: "Admin setup is not enabled." }, { status: 503 })
  }

  const authHeader = request.headers.get("authorization")
  const bearer = authHeader?.startsWith("Bearer ") ? authHeader.slice(7) : null
  const headerSecret = request.headers.get("x-admin-setup-secret")

  if (bearer !== setupSecret && headerSecret !== setupSecret) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  }

  let body: { email?: string; password?: string; name?: string }
  try {
    body = await request.json()
  } catch {
    return NextResponse.json({ error: "Invalid JSON body" }, { status: 400 })
  }

  const email = body.email?.trim()
  const password = body.password

  if (!email || !password) {
    return NextResponse.json({ error: "email and password are required" }, { status: 400 })
  }

  const admin = await upsertAdminUser({
    email,
    password,
    name: body.name || "Admin",
    replaceOthers: true,
  })

  return NextResponse.json({
    ok: true,
    email: admin.email,
  })
}
