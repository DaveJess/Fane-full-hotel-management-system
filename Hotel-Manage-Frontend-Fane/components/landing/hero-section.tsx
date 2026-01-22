"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon, Search, MapPin, Users, Star, Building2, Shield, Clock } from "lucide-react"
import { format } from "date-fns"
import { nigeriaStates } from "@/lib/nigeria-states"
import type { DateRange } from "react-day-picker"

export function HeroSection() {
  const router = useRouter()
  const [selectedState, setSelectedState] = useState("")
  const [guests, setGuests] = useState("2")
  const [dateRange, setDateRange] = useState<DateRange | undefined>()

  const handleSearch = () => {
    const params = new URLSearchParams()
    if (selectedState) params.set("state", selectedState)
    if (guests) params.set("guests", guests)
    if (dateRange?.from) params.set("checkIn", dateRange.from.toISOString())
    if (dateRange?.to) params.set("checkOut", dateRange.to.toISOString())
    router.push(`/dashboard/hotels?${params.toString()}`)
  }

  return (
    <section className="relative overflow-hidden">
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-fane-green via-fane-green-dark to-fane-blue" />
      <div className="absolute inset-0 opacity-10">
        <div className="absolute top-20 left-20 w-96 h-96 rounded-full bg-fane-yellow blur-[100px]" />
        <div className="absolute bottom-20 right-20 w-[500px] h-[500px] rounded-full bg-white blur-[120px]" />
      </div>

      <div className="relative container py-20 md:py-32">
        <div className="max-w-4xl mx-auto text-center">
          {/* Badge */}
          <Badge variant="secondary" className="mb-6 bg-white/20 text-white border-white/30 hover:bg-white/30">
            <Star className="h-3 w-3 mr-1 fill-fane-yellow text-fane-yellow" />
            Nigeria&apos;s #1 Hotel Booking Platform
          </Badge>

          {/* Heading */}
          <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white text-balance leading-tight mb-6">
            Find Your Perfect Stay <span className="text-fane-yellow">Anywhere in Nigeria</span>
          </h1>

          {/* Subheading */}
          <p className="text-lg md:text-xl text-white/80 max-w-2xl mx-auto mb-10">
            Discover and book from over 1,000+ verified hotels across all 36 states. From budget-friendly to luxury
            suites, Fane has your perfect room waiting.
          </p>

          {/* Search Box */}
          <div className="bg-white rounded-2xl shadow-2xl p-4 md:p-6 max-w-4xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Location */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <MapPin className="h-3 w-3" /> Location
                </label>
                <Select value={selectedState} onValueChange={setSelectedState}>
                  <SelectTrigger className="bg-secondary/50 border-0">
                    <SelectValue placeholder="Select state" />
                  </SelectTrigger>
                  <SelectContent className="max-h-[300px]">
                    {nigeriaStates.map((state) => (
                      <SelectItem key={state.code} value={state.name}>
                        {state.name}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              {/* Dates */}
              <div className="space-y-2 md:col-span-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <CalendarIcon className="h-3 w-3" /> Check-in & Check-out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button
                      variant="outline"
                      className="w-full justify-start text-left font-normal bg-secondary/50 border-0"
                    >
                      {dateRange?.from ? (
                        dateRange.to ? (
                          <>
                            {format(dateRange.from, "MMM dd")} - {format(dateRange.to, "MMM dd, yyyy")}
                          </>
                        ) : (
                          format(dateRange.from, "MMM dd, yyyy")
                        )
                      ) : (
                        <span className="text-muted-foreground">Select dates</span>
                      )}
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      initialFocus
                      mode="range"
                      defaultMonth={dateRange?.from}
                      selected={dateRange}
                      onSelect={setDateRange}
                      numberOfMonths={2}
                      disabled={{ before: new Date() }}
                    />
                  </PopoverContent>
                </Popover>
              </div>

              {/* Guests */}
              <div className="space-y-2">
                <label className="text-xs font-medium text-muted-foreground flex items-center gap-1">
                  <Users className="h-3 w-3" /> Guests
                </label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger className="bg-secondary/50 border-0">
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    {[1, 2, 3, 4, 5, 6].map((num) => (
                      <SelectItem key={num} value={num.toString()}>
                        {num} {num === 1 ? "Guest" : "Guests"}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            <Button onClick={handleSearch} size="lg" className="w-full mt-4">
              <Search className="mr-2 h-4 w-4" />
              Search Hotels
            </Button>
          </div>

          {/* Trust indicators */}
          <div className="flex flex-wrap justify-center gap-6 mt-10">
            <div className="flex items-center gap-2 text-white/80">
              <Building2 className="h-5 w-5 text-fane-yellow" />
              <span className="text-sm">1,000+ Hotels</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Shield className="h-5 w-5 text-fane-yellow" />
              <span className="text-sm">Verified Properties</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Clock className="h-5 w-5 text-fane-yellow" />
              <span className="text-sm">Instant Confirmation</span>
            </div>
            <div className="flex items-center gap-2 text-white/80">
              <Star className="h-5 w-5 text-fane-yellow fill-fane-yellow" />
              <span className="text-sm">50k+ Reviews</span>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
