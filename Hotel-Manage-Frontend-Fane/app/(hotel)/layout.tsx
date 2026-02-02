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
      <div className="flex min-h-screen bg-background">
        <HotelSidebar />
        <div className="flex-1 flex flex-col">
          <HotelHeader />
          <main className="flex-1 p-6 max-w-7xl mx-auto w-full">
            <div className="space-y-6">
              {children}
            </div>
          </main>
        </div>
      </div>
    </SidebarProvider>
  )
}
