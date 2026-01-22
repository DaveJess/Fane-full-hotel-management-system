"use client"

import Link from "next/link"
import { usePathname } from "next/navigation"
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarRail,
} from "@/components/ui/sidebar"
import { FaneLogo } from "@/components/fane-logo"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu"
import { Badge } from "@/components/ui/badge"
import {
  LayoutDashboard,
  Building2,
  BedDouble,
  CalendarDays,
  Users,
  Star,
  Settings,
  HelpCircle,
  LogOut,
  ChevronUp,
  CreditCard,
  BarChart3,
  ImageIcon,
} from "lucide-react"

const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/hotel-dashboard" },
  { title: "My Hotel", icon: Building2, href: "/hotel-dashboard/hotel" },
  { title: "Rooms", icon: BedDouble, href: "/hotel-dashboard/rooms" },
  { title: "Bookings", icon: CalendarDays, href: "/hotel-dashboard/bookings", badge: "5" },
  { title: "Guests", icon: Users, href: "/hotel-dashboard/guests" },
  { title: "Reviews", icon: Star, href: "/hotel-dashboard/reviews" },
  { title: "Gallery", icon: ImageIcon, href: "/hotel-dashboard/gallery" },
  { title: "Analytics", icon: BarChart3, href: "/hotel-dashboard/analytics" },
]

const accountNavItems = [
  { title: "Earnings", icon: CreditCard, href: "/hotel-dashboard/earnings" },
  { title: "Settings", icon: Settings, href: "/hotel-dashboard/settings" },
  { title: "Help & Support", icon: HelpCircle, href: "/hotel-dashboard/help" },
]

export function HotelSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link href="/">
          <FaneLogo size="md" />
        </Link>
        <Badge variant="secondary" className="mt-2 w-fit">
          Hotel Portal
        </Badge>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Management</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                      {item.badge && (
                        <Badge className="ml-auto bg-fane-green text-white h-5 w-5 flex items-center justify-center p-0 text-xs">
                          {item.badge}
                        </Badge>
                      )}
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>

        <SidebarGroup>
          <SidebarGroupLabel>Account</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {accountNavItems.map((item) => (
                <SidebarMenuItem key={item.href}>
                  <SidebarMenuButton asChild isActive={pathname === item.href}>
                    <Link href={item.href}>
                      <item.icon className="h-4 w-4" />
                      <span>{item.title}</span>
                    </Link>
                  </SidebarMenuButton>
                </SidebarMenuItem>
              ))}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>

      <SidebarFooter className="border-t">
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/eko-hotel-lagos-exterior.jpg" />
                    <AvatarFallback>EH</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Eko Hotels & Suites</p>
                    <p className="text-xs text-muted-foreground">Victoria Island, Lagos</p>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent side="top" className="w-(--radix-dropdown-menu-trigger-width)">
                <DropdownMenuItem asChild>
                  <Link href="/hotel-dashboard/hotel">
                    <Building2 className="mr-2 h-4 w-4" />
                    Hotel Profile
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild>
                  <Link href="/hotel-dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem asChild className="text-destructive">
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
