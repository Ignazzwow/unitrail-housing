/** @type {import('next').NextConfig} */

const dbFiles = ["./data/runtime.db", "./public/runtime-db.sqlite", "./prisma/prod.db"]

const prismaRoutes = [
  "/",
  "/angebote",
  "/angebote/[slug]",
  "/admin",
  "/admin/properties/new",
  "/admin/properties/[id]/edit",
  "/api/amenities",
  "/api/inquiries",
  "/api/properties",
  "/api/properties/[slugOrId]",
  "/api/upload",
  "/api/admin/stats",
  "/api/admin/properties",
  "/api/admin/properties/[id]",
  "/api/admin/properties/[id]/images",
  "/api/admin/properties/[id]/images/[imageId]",
  "/api/admin/inquiries",
  "/api/admin/inquiries/[id]",
  "/api/admin/setup-credentials",
  "/api/auth/[...nextauth]",
]

const outputFileTracingIncludes = Object.fromEntries(
  prismaRoutes.map((route) => [route, dbFiles])
)

const nextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: true,
  },
  outputFileTracingIncludes,
  async headers() {
    return [
      {
        source: "/(.*)",
        headers: [
          { key: "X-Frame-Options", value: "DENY" },
          { key: "X-Content-Type-Options", value: "nosniff" },
          { key: "Referrer-Policy", value: "strict-origin-when-cross-origin" },
          {
            key: "Permissions-Policy",
            value: "camera=(), microphone=(), geolocation=()",
          },
          {
            key: "Content-Security-Policy",
            value: [
              "default-src 'self'",
              "script-src 'self' 'unsafe-inline' https://www.googletagmanager.com",
              "connect-src 'self' https://www.google-analytics.com https://*.google-analytics.com https://www.googletagmanager.com",
              "img-src 'self' data: blob: https:",
              "style-src 'self' 'unsafe-inline'",
              "font-src 'self' data:",
              "frame-ancestors 'none'",
              "base-uri 'self'",
              "form-action 'self'",
            ].join("; "),
          },
        ],
      },
    ]
  },
}

export default nextConfig
