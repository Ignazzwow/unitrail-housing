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
  Settings,
  ScrollText,
} from "lucide-react"
import { cn } from "@/lib/utils"
import { NotificationBell } from "@/components/admin/notification-bell"

const navItems = [
  { href: "/admin", label: "Dashboard", icon: LayoutDashboard },
  { href: "/admin/properties", label: "Properties", icon: Building2 },
  { href: "/admin/inquiries", label: "Inquiries", icon: Mail },
  {
    href: "/admin/rental-property-analyzer",
    label: "Rental Property Analyzer",
    icon: BarChart3,
  },
  { href: "/admin/email-logs", label: "Email Log", icon: ScrollText },
  { href: "/admin/settings", label: "Settings", icon: Settings },
]

const getPageTitle = (path: string) => {
  if (path === "/admin") return "Dashboard"
  if (path.startsWith("/admin/properties/new")) return "Add Property"
  if (path.match(/\/admin\/properties\/[^/]+\/edit/)) return "Edit Property"
  if (path.startsWith("/admin/properties")) return "Properties"
  if (path.match(/\/admin\/inquiries\/[^/]+/)) return "Inquiry"
  if (path.startsWith("/admin/inquiries")) return "Inquiries"
  if (path.startsWith("/admin/rental-property-analyzer")) return "Rental Property Analyzer"
  if (path.startsWith("/admin/settings")) return "Settings"
  if (path.startsWith("/admin/email-logs")) return "Email Log"
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
    <div className="flex min-h-screen bg-muted/30">
      {/* Sidebar */}
      <aside className="fixed left-0 top-0 z-40 flex h-screen w-56 flex-col border-r border-border bg-card">
        <div className="flex h-14 items-center gap-2 border-b border-border px-4">
          <Image
            src="/New_UniTrail_Housing_Logo.png"
            alt="Logo"
            width={28}
            height={28}
          />
          <span className="font-semibold text-foreground">UniTrail Housing Admin</span>
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
                    : "text-muted-foreground hover:bg-muted hover:text-foreground"
                )}
              >
                <item.icon className="h-4 w-4" />
                {item.label}
              </Link>
            )
          })}
        </nav>
        <div className="border-t border-border p-3">
          <Link
            href="/"
            target="_blank"
            className="flex items-center gap-2 rounded-md px-3 py-2 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
          >
            <ExternalLink className="h-4 w-4" />
            View Site
          </Link>
        </div>
      </aside>

      {/* Main content */}
      <div className="ml-56 flex-1">
        {/* Top bar */}
        <header className="sticky top-0 z-30 flex h-14 items-center justify-between border-b border-border bg-card px-6">
          <h1 className="text-lg font-semibold text-foreground">{pageTitle ?? getPageTitle(pathname)}</h1>
          <div className="flex items-center gap-3">
            <NotificationBell />
            <span className="text-sm text-muted-foreground">
              {session?.user?.name ?? session?.user?.email ?? "Admin"}
            </span>
            <button
              onClick={() => signOut({ callbackUrl: "/admin/login" })}
              className="flex items-center gap-2 rounded-md px-3 py-1.5 text-sm text-muted-foreground hover:bg-muted hover:text-foreground"
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
