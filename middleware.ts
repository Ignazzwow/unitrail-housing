import { withAuth } from "next-auth/middleware"
import { getAuthSecret } from "@/lib/auth-secret"

export default withAuth({
  // Must match authOptions.secret — middleware does not import authOptions (avoids Edge + Prisma).
  secret: getAuthSecret(),
  pages: {
    signIn: "/admin/login",
  },
})

export const config = {
  matcher: [
    "/admin",
    "/admin/properties/:path*",
    "/admin/inquiries/:path*",
    "/admin/rental-property-analyzer",
    "/admin/rental-property-analyzer/:path*",
  ],
}
