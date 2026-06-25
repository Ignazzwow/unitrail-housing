"use client"

import { useEffect } from "react"
import { Button } from "@/components/ui/button"

const ERROR_COPY = {
  en: {
    title: "Something went wrong",
    description:
      "An error occurred while rendering this page. Try again, or refresh. If you were using admin, sign in again at",
    dbHint: "For database issues, run",
    tryAgain: "Try again",
  },
  de: {
    title: "Etwas ist schiefgelaufen",
    description:
      "Beim Rendern dieser Seite ist ein Fehler aufgetreten. Versuchen Sie es erneut oder laden Sie die Seite neu. Falls Sie im Admin-Bereich waren, melden Sie sich erneut an unter",
    dbHint: "Bei Datenbankproblemen ausführen:",
    tryAgain: "Erneut versuchen",
  },
} as const

function getErrorCopy() {
  if (typeof window === "undefined") return ERROR_COPY.en
  const lang = localStorage.getItem("language")?.trim().toLowerCase()
  return lang === "de" ? ERROR_COPY.de : ERROR_COPY.en
}

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  const copy = getErrorCopy()

  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-[50vh] flex-col items-center justify-center gap-4 px-4">
      <h2 className="text-xl font-semibold">{copy.title}</h2>
      <p className="text-center text-muted-foreground">
        {copy.description}{" "}
        <code className="break-all rounded bg-muted px-1">/admin/login</code>. {copy.dbHint}{" "}
        <code className="break-all rounded bg-muted px-1">npx prisma db push</code>.
      </p>
      {process.env.NODE_ENV === "development" && error.message ? (
        <p className="max-w-lg break-words text-center text-xs text-destructive">{error.message}</p>
      ) : null}
      <Button onClick={reset} variant="outline">
        {copy.tryAgain}
      </Button>
    </div>
  )
}
