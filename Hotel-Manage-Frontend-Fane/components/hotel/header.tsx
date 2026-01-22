"use client"

import { usePathname } from "next/navigation"
import { SidebarTrigger } from "@/components/ui/sidebar"
import { Separator } from "@/components/ui/separator"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from "@/components/ui/dropdown-menu"
import { Bell, Moon, Sun } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const pageTitles: Record<string, string> = {
  "/hotel-dashboard": "Dashboard",
  "/hotel-dashboard/hotel": "Hotel Profile",
  "/hotel-dashboard/rooms": "Room Management",
  "/hotel-dashboard/bookings": "Bookings",
  "/hotel-dashboard/guests": "Guest Management",
  "/hotel-dashboard/reviews": "Reviews",
  "/hotel-dashboard/gallery": "Photo Gallery",
  "/hotel-dashboard/analytics": "Analytics",
  "/hotel-dashboard/earnings": "Earnings",
  "/hotel-dashboard/settings": "Settings",
  "/hotel-dashboard/help": "Help & Support",
}

export function HotelHeader() {
  const pathname = usePathname()
  const title = pageTitles[pathname] || "Hotel Dashboard"

  return (
    <header className="flex h-16 items-center gap-4 border-b bg-background px-6">
      <SidebarTrigger />
      <Separator orientation="vertical" className="h-6" />
      <h1 className="text-lg font-semibold">{title}</h1>

      <div className="flex-1" />

      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" size="icon" className="relative">
            <Bell className="h-5 w-5" />
            <Badge className="absolute -top-1 -right-1 h-5 w-5 flex items-center justify-center p-0 text-xs">5</Badge>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-80">
          <div className="p-3 border-b">
            <h3 className="font-semibold">Notifications</h3>
          </div>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium">New Booking!</p>
              <p className="text-xs text-muted-foreground">Room 305 booked for Jan 15-18 by Adebayo J.</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium">Check-in Today</p>
              <p className="text-xs text-muted-foreground">3 guests checking in today.</p>
            </div>
          </DropdownMenuItem>
          <DropdownMenuItem className="p-3 cursor-pointer">
            <div>
              <p className="text-sm font-medium">New Review</p>
              <p className="text-xs text-muted-foreground">Chioma O. left a 5-star review.</p>
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
