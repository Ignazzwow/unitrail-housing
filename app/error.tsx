"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"
import { useLanguage } from "@/contexts/language-context"

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const { t } = useLanguage()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-xl font-semibold">{t("appError.title")}</h2>
      <p className="text-center text-muted-foreground">
        {t("appError.description")}{" "}
        <code className="break-all rounded bg-muted px-1">/admin/login</code>. {t("appError.dbHint")}{" "}
        <code className="break-all rounded bg-muted px-1">npx prisma db push</code>.
      </p>
      <Button onClick={reset} variant="outline">
        {t("appError.tryAgain")}
      </Button>
    </div>
  )
}
