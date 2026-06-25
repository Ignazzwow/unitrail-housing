/**
 * Single source of truth for NextAuth JWT signing / verification.
 * Middleware only reads process.env — it does not use lib/auth.ts — so this must match authOptions.secret.
 */
const DEV_FALLBACK_SECRET = "dev-insecure-nextauth-secret-change-in-production"

export function getAuthSecret(): string {
  const raw = process.env.NEXTAUTH_SECRET?.trim()
  if (raw) return raw

  if (process.env.NODE_ENV === "production") {
    throw new Error(
      "[auth] NEXTAUTH_SECRET is required in production. Set it in your hosting environment."
    )
  }

  console.warn("[auth] NEXTAUTH_SECRET is not set. Using a local dev fallback only.")
  return DEV_FALLBACK_SECRET
}
