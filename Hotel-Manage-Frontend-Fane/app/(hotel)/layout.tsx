import type React from "react"
import { HotelSidebar } from "@/components/hotel/sidebar"
import { HotelHeader } from "@/components/hotel/header"
import { SidebarProvider, SidebarInset } from "@/components/ui/sidebar"

export default function HotelLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <SidebarProvider>
      <HotelSidebar />
      <SidebarInset>
        <HotelHeader />
        <main className="flex-1 p-6">{children}</main>
      </SidebarInset>
    </SidebarProvider>
  )
}
