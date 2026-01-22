import type React from "react"
import { FaneLogo } from "@/components/fane-logo"

export default function AuthLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <div className="min-h-screen flex">
      {/* Left side - Branding */}
      <div className="hidden lg:flex lg:w-1/2 bg-gradient-to-br from-fane-green via-fane-green-dark to-fane-blue relative overflow-hidden">
        {/* Decorative elements */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-20 w-72 h-72 rounded-full bg-fane-yellow blur-3xl" />
          <div className="absolute bottom-20 right-20 w-96 h-96 rounded-full bg-white blur-3xl" />
        </div>

        <div className="relative z-10 flex flex-col justify-between p-12 w-full">
          <FaneLogo size="xl" variant="white" />

          <div className="space-y-6">
            <h1 className="text-4xl font-bold text-white text-balance leading-tight">
              Discover the best hotels across Nigeria
            </h1>
            <p className="text-white/80 text-lg max-w-md">
              Book rooms in over 1000+ hotels across all 36 states. Find your perfect stay with Fane.
            </p>

            <div className="flex items-center gap-8 pt-4">
              <div className="text-center">
                <p className="text-3xl font-bold text-fane-yellow">36</p>
                <p className="text-white/70 text-sm">States</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-fane-yellow">1000+</p>
                <p className="text-white/70 text-sm">Hotels</p>
              </div>
              <div className="text-center">
                <p className="text-3xl font-bold text-fane-yellow">50k+</p>
                <p className="text-white/70 text-sm">Bookings</p>
              </div>
            </div>
          </div>

          <p className="text-white/60 text-sm">© {new Date().getFullYear()} Fane Hotels. All rights reserved.</p>
        </div>
      </div>

      {/* Right side - Auth Form */}
      <div className="flex-1 flex items-center justify-center p-6 bg-background">
        <div className="w-full max-w-md">
          <div className="lg:hidden mb-8">
            <FaneLogo size="lg" />
          </div>
          {children}
        </div>
      </div>
    </div>
  )
}
