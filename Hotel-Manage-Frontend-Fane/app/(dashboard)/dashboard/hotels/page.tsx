"use client"

import type React from "react"

import { useState, Suspense } from "react"
import { useSearchParams, useRouter } from "next/navigation"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Slider } from "@/components/ui/slider"
import { Badge } from "@/components/ui/badge"
import { Checkbox } from "@/components/ui/checkbox"
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet"
import {
  Search,
  MapPin,
  Star,
  Filter,
  SlidersHorizontal,
  Grid,
  List,
  Heart,
  Wifi,
  Car,
  Coffee,
  Dumbbell,
  Building2,
  Loader2,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { HotelSearch } from "@/components/hotels/hotel-search"
import { SimpleStateSelector } from "@/components/forms/simple-state-selector"
import { useHotels } from "@/hooks/useBookings"

const amenityIcons: Record<string, React.ReactNode> = {
  wifi: <Wifi className="h-4 w-4" />,
  parking: <Car className="h-4 w-4" />,
  restaurant: <Coffee className="h-4 w-4" />,
  gym: <Dumbbell className="h-4 w-4" />,
}

function HotelsContent() {
  const searchParams = useSearchParams()
  const router = useRouter()
  const { hotels, loading, error } = useHotels()

  const [searchQuery, setSearchQuery] = useState("")
  const [selectedState, setSelectedState] = useState<string>("")
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [priceRange, setPriceRange] = useState([0, 200000])
  const [selectedStars, setSelectedStars] = useState<number[]>([])
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")
  const [sortBy, setSortBy] = useState("recommended")
  const [filteredHotels, setFilteredHotels] = useState(hotels)

  const handleHotelsFound = (hotels: any[]) => {
    setFilteredHotels(hotels)
  }

  const handleStateChange = (state: string) => {
    setSelectedState(state)
    setSelectedCity("") // Reset city when state changes
  }

  const sortedHotels = [...filteredHotels].sort((a: any, b: any) => {
    switch (sortBy) {
      case "price-low":
        return (a.price || 0) - (b.price || 0)
      case "price-high":
        return (b.price || 0) - (a.price || 0)
      case "rating":
        return (b.rating || 0) - (a.rating || 0)
      default:
        return 0
    }
  })

  const updateURL = () => {
    const params = new URLSearchParams()
    if (selectedState) params.set("state", selectedState)
    if (selectedCity) params.set("city", selectedCity)
    if (searchQuery) params.set("search", searchQuery)
    router.push(`/dashboard/hotels?${params.toString()}`)
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading hotels: {error}</p>
      </div>
    )
  }

  return (
    <div className="space-y-6">
      {/* Search and Filters */}
      <div className="space-y-6">
        {/* State and City Selector */}
        <SimpleStateSelector
          onStateChange={handleStateChange}
          onCityChange={setSelectedCity}
          selectedState={selectedState}
          selectedCity={selectedCity}
          className="mb-6"
        />
        
        <HotelSearch 
          onHotelsFound={handleHotelsFound}
          className="mb-6"
        />
        
        {/* Additional Filters */}
        <div className="flex flex-col lg:flex-row gap-4 items-center">
          <div className="flex items-center gap-2">
            <label className="text-sm font-medium">Sort by:</label>
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-[150px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="recommended">Recommended</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Rating</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <h1 className="text-2xl font-bold">Hotels</h1>
          <p className="text-muted-foreground">
            {sortedHotels.length} hotels found
          </p>
        </div>
        
        <div className="flex items-center gap-2">
          <Select value={sortBy} onValueChange={setSortBy}>
            <SelectTrigger className="w-[150px]">
              <SelectValue />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="recommended">Recommended</SelectItem>
              <SelectItem value="price-low">Price: Low to High</SelectItem>
              <SelectItem value="price-high">Price: High to Low</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          
          <div className="flex border rounded-md">
            <Button
              variant={viewMode === "grid" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("grid")}
            >
              <Grid className="h-4 w-4" />
            </Button>
            <Button
              variant={viewMode === "list" ? "default" : "ghost"}
              size="sm"
              onClick={() => setViewMode("list")}
            >
              <List className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </div>

      {/* Hotels Grid/List */}
      {sortedHotels.length === 0 ? (
        <div className="text-center py-12">
          <Building2 className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
          <h3 className="text-lg font-semibold mb-2">No hotels found</h3>
          <p className="text-muted-foreground">Try adjusting your filters or search criteria</p>
        </div>
      ) : (
        <div className={viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6" : "space-y-4"}>
          {sortedHotels.map((hotel) => (
            <Card key={hotel._id || hotel.id || JSON.stringify(hotel)} className="overflow-hidden hover:shadow-lg transition-shadow">
              <div className="relative">
                <div className="relative w-full h-48">
                  <Image
                    src={hotel.images?.[0] || "/placeholder.svg"}
                    alt={hotel.name}
                    fill
                    className="object-cover"
                  />
                </div>
                <Button variant="ghost" size="sm" className="absolute top-2 right-2 bg-white/80 hover:bg-white">
                  <Heart className="h-4 w-4" />
                </Button>
              </div>
              
              <CardContent className="p-4">
                <div className="flex items-start justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-lg">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {hotel.location}
                    </p>
                  </div>
                  <div className="flex items-center gap-1">
                    <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                    <span className="text-sm font-medium">{hotel.rating || 4.0}</span>
                  </div>
                </div>
                
                <p className="text-sm text-muted-foreground mb-3 line-clamp-2">
                  {hotel.description}
                </p>
                
                <div className="flex flex-wrap gap-1 mb-3">
                  {(hotel.amenities || []).slice(0, 3).map((amenity: string) => (
                    <Badge key={amenity} variant="secondary" className="text-xs">
                      {amenityIcons[amenity.toLowerCase()] || amenity}
                    </Badge>
                  ))}
                  {(hotel.amenities || []).length > 3 && (
                    <Badge variant="outline" className="text-xs">
                      +{(hotel.amenities || []).length - 3} more
                    </Badge>
                  )}
                </div>
                
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-2xl font-bold">₦{(hotel.price || 0).toLocaleString()}</p>
                    <p className="text-xs text-muted-foreground">per night</p>
                  </div>
                  <Link href={`/dashboard/hotels/${hotel._id}`}>
                    <Button className="bg-green-600 hover:bg-green-700">View Details</Button>
                  </Link>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      )}
    </div>
  )
}

export default function HotelsPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center min-h-96"><Loader2 className="h-8 w-8 animate-spin" /></div>}>
      <HotelsContent />
    </Suspense>
  )
}
                                  











