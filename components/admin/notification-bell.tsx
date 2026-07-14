"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import { formatDistanceToNow } from "date-fns"
import { Bell } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

const POLL_INTERVAL_MS = 30_000

interface NewInquiry {
  id: string
  name: string
  message: string
  createdAt: string
  property?: { title: string } | null
}

export function NotificationBell() {
  const [inquiries, setInquiries] = useState<NewInquiry[]>([])
  const [total, setTotal] = useState(0)

  useEffect(() => {
    let cancelled = false

    const load = async () => {
      try {
        const res = await fetch("/api/admin/inquiries?status=new&limit=8", { credentials: "include" })
        if (!res.ok) return
        const data = await res.json()
        if (cancelled) return
        setInquiries(data.inquiries ?? [])
        setTotal(data.pagination?.total ?? data.inquiries?.length ?? 0)
      } catch {
        // ignore transient poll failures
      }
    }

    load()
    const interval = setInterval(load, POLL_INTERVAL_MS)
    return () => {
      cancelled = true
      clearInterval(interval)
    }
  }, [])

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button variant="ghost" size="icon" className="relative">
          <Bell className="h-5 w-5" />
          {total > 0 && (
            <span className="absolute -right-0.5 -top-0.5 flex h-4 min-w-4 items-center justify-center rounded-full bg-destructive px-1 text-[10px] font-medium text-destructive-foreground">
              {total > 9 ? "9+" : total}
            </span>
          )}
          <span className="sr-only">Notifications</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-80">
        <div className="px-2 py-1.5 text-sm font-semibold">
          New inquiries {total > 0 && `(${total})`}
        </div>
        {inquiries.length === 0 ? (
          <p className="px-2 py-4 text-center text-sm text-muted-foreground">No new inquiries.</p>
        ) : (
          inquiries.map((inq) => (
            <DropdownMenuItem key={inq.id} asChild className="flex-col items-start gap-0.5 py-2">
              <Link href={`/admin/inquiries/${inq.id}`}>
                <div className="flex w-full items-center justify-between gap-2">
                  <span className="font-medium">{inq.name}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {formatDistanceToNow(new Date(inq.createdAt), { addSuffix: true })}
                  </span>
                </div>
                <p className="w-full truncate text-xs text-muted-foreground">
                  {inq.property?.title ?? "General inquiry"} — {inq.message}
                </p>
              </Link>
            </DropdownMenuItem>
          ))
        )}
        <DropdownMenuItem asChild className="justify-center text-sm text-primary">
          <Link href="/admin/inquiries">View all inquiries</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  )
}