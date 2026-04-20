"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-xl font-semibold">Something went wrong</h2>
      <p className="text-center text-muted-foreground">
        An error occurred while rendering this page. Try again, or refresh. If you were using admin, sign in again at{" "}
        <code className="rounded bg-muted px-1">/admin/login</code>. For database issues, run{" "}
        <code className="rounded bg-muted px-1">npx prisma db push</code>.
      </p>
      <Button onClick={reset} variant="outline">
        Try again
      </Button>
    </div>
  )
}
