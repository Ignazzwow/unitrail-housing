import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getAuthSecret } from "./auth-secret"
import { authorizeFromEnvCredentials, isVercelServerlessRuntime } from "./admin-env-auth"

export const authOptions: NextAuthOptions = {
  secret: getAuthSecret(),
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const email = credentials.email.trim().toLowerCase()
        const password = credentials.password

        // Vercel serverless: validate against env first (no npm/DB bootstrap required).
        if (isVercelServerlessRuntime()) {
          const envUser = authorizeFromEnvCredentials(email, password)
          if (envUser) return envUser
        }

        await import("./ensure-production-db").then(({ ensureProductionReady }) => ensureProductionReady())

        try {
          const { prisma } = await import("./db")
          const admin = await prisma.adminUser.findUnique({
            where: { email },
          })

          if (admin) {
            const valid = await bcrypt.compare(password, admin.passwordHash)
            if (!valid) return null

            try {
              await prisma.adminUser.update({
                where: { id: admin.id },
                data: { lastLoginAt: new Date() },
              })
            } catch {
              // Ignore write errors on read-only filesystems
            }

            return {
              id: admin.id,
              email: admin.email,
              name: admin.name,
              role: admin.role,
            }
          }
        } catch (error) {
          console.error("[auth] Database login failed:", error)
        }

        return null
      },
    }),
  ],
  callbacks: {
    jwt: ({ token, user }) => {
      if (user) {
        const id = String(user.id)
        token.sub = id
        token.id = id
        token.role = (user as { role?: string }).role
      }
      return token
    },
    session: ({ session, token }) => {
      if (session.user) {
        (session.user as { id?: string }).id = token.id as string
        (session.user as { role?: string }).role = token.role as string
      }
      return session
    },
  },
  session: { strategy: "jwt", maxAge: 24 * 60 * 60 }, // 24 hours
  pages: {
    signIn: "/admin/login",
  },
}
