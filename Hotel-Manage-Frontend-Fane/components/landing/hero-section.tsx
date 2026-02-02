"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Search, MapPin, Users, Star, Building2, Shield, Clock } from "lucide-react"

export function HeroSection() {
  const router = useRouter()

  const handleSearch = () => {
    router.push("/dashboard/hotels")
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-green-600 via-green-700 to-blue-600" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-yellow-400 blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-white blur-[120px]" />
      </div>

      <div className="relative container mx-auto px-4 py-20 md:py-32">
        <div className="max-w-5xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Star className="h-3 w-3 mr-1 fill-yellow-400 text-yellow-400" />
            Nigeria&apos;s #1 Hotel Booking Platform
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight mb-6">
            Find Your Perfect Stay <span className="text-yellow-400">Anywhere in Nigeria</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/90 max-w-3xl mx-auto mb-10 leading-relaxed">
            Discover and book from over 1,000+ verified hotels across all 36 states. From budget-friendly to luxury
            suites, Fane has your perfect room waiting.
          </p>

          {/* Simple Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-6 max-w-2xl mx-auto">
            <Button onClick={handleSearch} size="lg" className="w-full">
              <Search className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-8 mt-12">
            <div className="flex items-center gap-2 text-white/90">
              <Building2 className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium">1,000+ Hotels</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Shield className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium">Verified Properties</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Clock className="h-5 w-5 text-yellow-400" />
              <span className="text-sm font-medium">Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2 text-white/90">
              <Star className="h-5 w-5 fill-yellow-400 text-yellow-400" />
              <span className="text-sm font-medium">50k+ Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
