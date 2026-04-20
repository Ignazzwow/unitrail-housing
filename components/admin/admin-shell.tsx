"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import { signOut } from "next-auth/react"
import { useSession } from "next-auth/react"
import Image from "next/image"
import {
  LayoutDashboard,
  Building2,
  Mail,
  LogOut,
  ExternalLink,
  BarChart3,
} from "lucide-react"
import { cn } from "@/lib/utils"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
  {
    href: "/admin/rental-property-analyzer",
    label: "Rental Property Analyzer",
    icon: BarChart3,
  },
]

const getPageTitle = (path: string) => {
  if (path === "/admin") return "Dashboard"
  if (path.startsWith("/admin/properties/new")) return "Add Property"
  if (path.match(/\/admin\/properties\/[^/]+\/edit/)) return "Edit Property"
  if (path.startsWith("/admin/properties")) return "Properties"
  if (path.match(/\/admin\/inquiries\/[^/]+/)) return "Inquiry"
  if (path.startsWith("/admin/inquiries")) return "Inquiries"
  if (path.startsWith("/admin/rental-property-analyzer")) return "Rental Property Analyzer"
  return "Admin"
}

export function AdminShell({
  children,
  pageTitle,
}: {
  children: React.ReactNode
  pageTitle?: string
}) {
  const pathname = usePathname()
  const { data: session } = useSession()

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-gray-200 bg-white">
        <div className="flex h-14 items-center gap-2 border-b border-gray-200 px-4">
          <Image
            src="/New_UniTrail_Housing_Logo.png"
            alt="Logo"
            width={28}
            height={28}
          />
          <span className="font-semibold text-gray-900">UniTrail Housing Admin</span>
        </div>
        <nav className="flex-1 space-y-0.5 p-3">
          {navItems.map((item) => {
            const isActive =
              item.href === "/admin"
                ? pathname === "/admin"
                : pathname.startsWith(item.href)
            return (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  "flex items-center gap-2 rounded-md px-3 py-2 text-sm font-medium transition-colors",
                  isActive
                    ? "bg-primary text-primary-foreground"
                    : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-gray-200 p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-56 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-gray-200 bg-white px-6">
          <h1 className="text-lg font-semibold text-gray-900">{pageTitle ?? getPageTitle(pathname)}</h1>
          <div className="flex items-center gap-3">
            <span className="text-sm text-gray-600">
              {session?.user?.name ?? session?.user?.email ?? "Admin"}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 hover:text-gray-900"
            >
              <LogOut className="h-4 w-4" />
              Logout
            </button>
          </div>
        </header>

        {/* Page content */}
        <main className="p-6">{children}</main>
      </div>
    </div>
  )
}
