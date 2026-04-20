/**
 * Single source of truth for NextAuth JWT signing / verification.
 * Middleware only reads process.env — it does not use lib/auth.ts — so this must match authOptions.secret.
 *
 * Never return undefined: a missing secret breaks getServerSession (root layout) and middleware withAuth,
 * which surfaces as HTTP 500 on every route (common with `next start` locally without .env).
 */
const FALLBACK_SECRET = "dev-insecure-nextauth-secret-change-in-production"

export function getAuthSecret(): string {
  const raw = process.env.NEXTAUTH_SECRET?.trim()
  if (raw) return raw
  if (process.env.NODE_ENV === "production") {
    console.error(
      "[auth] NEXTAUTH_SECRET is not set. Using a built-in fallback so the app can run. Set NEXTAUTH_SECRET in your environment for production."
    )
  }
  return FALLBACK_SECRET
}
