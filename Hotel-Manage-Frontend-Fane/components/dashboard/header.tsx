"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Bell, Search, Moon, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const pageTitles: Record<string, string> = {
  "/dashboard": "Dashboard",
  "/dashboard/hotels": "Find Hotels",
  "/dashboard/bookings": "My Bookings",
  "/dashboard/reservations": "Reservations",
  "/dashboard/favorites": "Favorites",
  "/dashboard/profile": "Profile",
  "/dashboard/payments": "Payment Methods",
  "/dashboard/settings": "Settings",
  "/dashboard/help": "Help & Support",
}

export function DashboardHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Dashboard"

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex-1" />

      <div className="hidden md:flex items-center gap-2 max-w-sm">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
          <Input placeholder="Search hotels, bookings..." className="pl-10 bg-secondary/50" />
        </div>
      </div>

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">3</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium">Booking Confirmed!</p>
              <p className="text-xs text-muted-foreground">Your room at Eko Hotel has been confirmed.</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium">Special Offer</p>
              <p className="text-xs text-muted-foreground">20% off on Lagos hotels this weekend.</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium">Review Reminder</p>
              <p className="text-xs text-muted-foreground">Don&apos;t forget to review your recent stay.</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="text-center justify-center text-primary">
            View all notifications
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Button variant="ghost" size="icon">
        <Sun className="h-5 w-5 rotate-0 scale-100 transition-all dark:-rotate-90 dark:scale-0" />
        <Moon className="absolute h-5 w-5 rotate-90 scale-0 transition-all dark:rotate-0 dark:scale-100" />
      </Button>
    </header>
  )
}
