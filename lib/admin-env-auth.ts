/** Env-only admin login for Vercel (no database required). Safe to import from auth config. */
export function authorizeFromEnvCredentials(email: string, password: string) {
  const expectedEmail = (process.env.ADMIN_LOGIN_EMAIL || process.env.ADMIN_EMAIL)?.trim().toLowerCase()
  const expectedPassword = process.env.ADMIN_LOGIN_PASSWORD || process.env.ADMIN_PASSWORD

  if (!expectedEmail || !expectedPassword) return null
  if (email !== expectedEmail || password !== expectedPassword) return null

  return {
    id: "env-admin",
    email: expectedEmail,
    name: process.env.ADMIN_NAME || "Admin",
    role: "super_admin",
  }
}

export function isVercelServerlessRuntime(): boolean {
  return process.env.VERCEL === "1" && Boolean(process.env.VERCEL_REGION)
}
