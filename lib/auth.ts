import { NextAuthOptions } from "next-auth"
import CredentialsProvider from "next-auth/providers/credentials"
import bcrypt from "bcryptjs"
import { getAuthSecret } from "./auth-secret"

export const authOptions: NextAuthOptions = {
  secret: getAuthSecret(),
  trustHost: true,
  providers: [
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      async authorize(credentials) {
        if (!credentials?.email || !credentials?.password) return null

        const { prisma } = await import("./db")
        const email = credentials.email.trim().toLowerCase()
        const admin = await prisma.adminUser.findUnique({
          where: { email },
        })
        if (!admin) return null

        const valid = await bcrypt.compare(credentials.password, admin.passwordHash)
        if (!valid) return null

        // Update last login
        await prisma.adminUser.update({
          where: { id: admin.id },
          data: { lastLoginAt: new Date() },
        })

        return {
          id: admin.id,
          email: admin.email,
          name: admin.name,
          role: admin.role,
        }
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
