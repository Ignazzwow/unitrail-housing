import { User } from "lucide-react"
import { cn } from "@/lib/utils"

/** Visual occupancy: 1 person = single room, 2–3 = shared room. */
export function RoomOccupancyIcon({
  occupants,
  className,
  iconClassName,
}: {
  occupants: number
  className?: string
  iconClassName?: string
}) {
  const count = Math.min(3, Math.max(1, Math.round(occupants) || 1))

  return (
    <span
      className={cn("inline-flex items-center gap-0.5", className)}
      aria-hidden
    >
      {Array.from({ length: count }, (_, i) => (
        <User
          key={i}
          className={cn("h-4 w-4 shrink-0 text-muted-foreground", iconClassName)}
        />
      ))}
    </span>
  )
}
