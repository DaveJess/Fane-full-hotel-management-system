"use client"

import * as React from "react"
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
import dynamic from "next/dynamic"

// Dynamically import the dropdown menu to prevent hydration issues
const DynamicDropdownMenu = dynamic(
  () => import("@/components/ui/dropdown-menu").then(mod => ({
    default: mod.DropdownMenu
  })),
  { ssr: false }
)

const DynamicDropdownMenuContent = dynamic(
  () => import("@/components/ui/dropdown-menu").then(mod => ({
    default: mod.DropdownMenuContent
  })),
  { ssr: false }
)

const DynamicDropdownMenuItem = dynamic(
  () => import("@/components/ui/dropdown-menu").then(mod => ({
    default: mod.DropdownMenuItem
  })),
  { ssr: false }
)

const DynamicDropdownMenuTrigger = dynamic(
  () => import("@/components/ui/dropdown-menu").then(mod => ({
    default: mod.DropdownMenuTrigger
  })),
  { ssr: false }
)

import {
  LayoutDashboard,
  Search,
  CalendarDays,
  BookMarked,
  Heart,
  User,
  Settings,
  CreditCard,
  HelpCircle,
  LogOut,
  ChevronUp,
  Wallet,
} from "lucide-react"

const mainNavItems = [
  { title: "Dashboard", icon: LayoutDashboard, href: "/dashboard" },
  { title: "Search Hotels", icon: Search, href: "/dashboard/hotels" },
  { title: "My Bookings", icon: CalendarDays, href: "/dashboard/bookings" },
  { title: "Reservations", icon: BookMarked, href: "/dashboard/reservations" },
  { title: "Favorites", icon: Heart, href: "/dashboard/favorites" },
  { title: "Wallet", icon: Wallet, href: "/dashboard/wallet" },
]

const accountNavItems = [
  { title: "Profile", icon: User, href: "/dashboard/profile" },
  { title: "Payment Methods", icon: CreditCard, href: "/dashboard/payments" },
  { title: "Settings", icon: Settings, href: "/dashboard/settings" },
  { title: "Help & Support", icon: HelpCircle, href: "/dashboard/help" },
]

export function DashboardSidebar() {
  const pathname = usePathname()

  return (
    <Sidebar>
      <SidebarHeader className="p-4 border-b">
        <Link href="/">
          <FaneLogo size="md" />
        </Link>
      </SidebarHeader>

      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Main Menu</SidebarGroupLabel>
          <SidebarGroupContent>
            <SidebarMenu>
              {mainNavItems.map((item) => (
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
            <DynamicDropdownMenu>
              <DynamicDropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="w-full">
                  <Avatar className="h-8 w-8">
                    <AvatarImage src="/nigerian-business-man-portrait.jpg" />
                    <AvatarFallback>AJ</AvatarFallback>
                  </Avatar>
                  <div className="flex-1 text-left">
                    <p className="text-sm font-medium">Adebayo Johnson</p>
                    <p className="text-xs text-muted-foreground">adebayo@email.com</p>
                  </div>
                  <ChevronUp className="h-4 w-4 text-muted-foreground" />
                </SidebarMenuButton>
              </DynamicDropdownMenuTrigger>
              <DynamicDropdownMenuContent side="top" className="w-(--radix-dropdown-menu-trigger-width)">
                <DynamicDropdownMenuItem asChild>
                  <Link href="/dashboard/profile">
                    <User className="mr-2 h-4 w-4" />
                    Profile
                  </Link>
                </DynamicDropdownMenuItem>
                <DynamicDropdownMenuItem asChild>
                  <Link href="/dashboard/settings">
                    <Settings className="mr-2 h-4 w-4" />
                    Settings
                  </Link>
                </DynamicDropdownMenuItem>
                <DynamicDropdownMenuItem asChild className="text-destructive">
                  <Link href="/login">
                    <LogOut className="mr-2 h-4 w-4" />
                    Sign Out
                  </Link>
                </DynamicDropdownMenuItem>
              </DynamicDropdownMenuContent>
            </DynamicDropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>

      <SidebarRail />
    </Sidebar>
  )
}
