import { Building2 } from "lucide-react"

interface FaneLogoProps {
  size?: "sm" | "md" | "lg" | "xl"
  showText?: boolean
  variant?: "default" | "white"
}

export function FaneLogo({ size = "md", showText = true, variant = "default" }: FaneLogoProps) {
  const sizeClasses = {
    sm: "h-6 w-6",
    md: "h-8 w-8",
    lg: "h-10 w-10",
    xl: "h-14 w-14",
  }

  const textSizeClasses = {
    sm: "text-lg",
    md: "text-xl",
    lg: "text-2xl",
    xl: "text-4xl",
  }

  const colorClass = variant === "white" ? "text-white" : "text-primary"
  const iconBgClass = variant === "white" ? "bg-white/20" : "bg-primary/10"

  return (
    <div className="flex items-center gap-2">
      <div className={`${iconBgClass} p-2 rounded-xl`}>
        <Building2 className={`${sizeClasses[size]} ${colorClass}`} />
      </div>
      {showText && (
        <div className="flex flex-col">
          <span className={`font-bold ${textSizeClasses[size]} ${colorClass} tracking-tight`}>Fane</span>
          {size === "xl" && (
            <span className={`text-xs ${variant === "white" ? "text-white/70" : "text-muted-foreground"} -mt-1`}>
              Hotels & Reservations
            </span>
          )}
        </div>
      )}
    </div>
  )
}
