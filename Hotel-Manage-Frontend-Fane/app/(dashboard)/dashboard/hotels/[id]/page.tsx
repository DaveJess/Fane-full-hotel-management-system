"use client"

import { useState, use } from "react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Calendar } from "@/components/ui/calendar"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"
import {
  Star,
  MapPin,
  Wifi,
  Car,
  Utensils,
  Dumbbell,
  Waves,
  Coffee,
  Tv,
  AirVent,
  CalendarIcon,
  Users,
  Heart,
  Share2,
  ChevronLeft,
  ChevronRight,
  Check,
  Phone,
  Mail,
  Clock,
  Shield,
} from "lucide-react"
import { format } from "date-fns"
import type { DateRange } from "react-day-picker"

// Mock hotel data
const hotelData = {
  id: "1",
  name: "Eko Hotels & Suites",
  description:
    "Experience luxury at its finest at Eko Hotels & Suites, Lagos' premier 5-star hotel located on the scenic Victoria Island. With stunning ocean views, world-class amenities, and exceptional service, we offer an unforgettable stay for both business and leisure travelers.",
  address: "Plot 1415 Adetokunbo Ademola Street, Victoria Island",
  city: "Victoria Island",
  state: "Lagos",
  rating: 4.8,
  reviews: 2456,
  stars: 5,
  checkIn: "2:00 PM",
  checkOut: "12:00 PM",
  phone: "+234 1 277 0000",
  email: "reservations@ekohotels.com",
  images: [
    "/eko-hotel-lagos-exterior.jpg",
    "/eko-hotel-room-deluxe.jpg",
    "/eko-hotel-pool-area.jpg",
    "/eko-hotel-restaurant.jpg",
    "/eko-hotel-lobby.jpg",
  ],
  amenities: [
    { name: "Free WiFi", icon: Wifi },
    { name: "Swimming Pool", icon: Waves },
    { name: "Fitness Center", icon: Dumbbell },
    { name: "Restaurant", icon: Utensils },
    { name: "Room Service", icon: Coffee },
    { name: "Free Parking", icon: Car },
    { name: "Air Conditioning", icon: AirVent },
    { name: "Smart TV", icon: Tv },
  ],
  policies: [
    "Free cancellation up to 24 hours before check-in",
    "No smoking in rooms",
    "Pets are not allowed",
    "Valid ID required at check-in",
    "Credit card required for incidentals",
  ],
  rooms: [
    {
      id: "r1",
      name: "Standard Room",
      type: "single",
      price: 75000,
      capacity: 2,
      description: "Comfortable room with city view, featuring a queen-size bed and modern amenities.",
      amenities: ["Queen Bed", "City View", "Free WiFi", "Air Conditioning", '32" TV'],
      image: "/eko-hotel-room-standard.jpg",
      available: 5,
    },
    {
      id: "r2",
      name: "Deluxe Room",
      type: "double",
      price: 95000,
      capacity: 2,
      description: "Spacious deluxe room with ocean view, king-size bed, and premium amenities.",
      amenities: ["King Bed", "Ocean View", "Free WiFi", "Mini Bar", '48" TV', "Breakfast"],
      image: "/eko-hotel-room-deluxe.jpg",
      available: 3,
    },
    {
      id: "r3",
      name: "Executive Suite",
      type: "suite",
      price: 150000,
      capacity: 4,
      description: "Luxurious suite with separate living area, premium ocean view, and exclusive lounge access.",
      amenities: ["King Bed", "Living Area", "Ocean View", "Lounge Access", "Mini Bar", "Breakfast", "Butler Service"],
      image: "/eko-hotel-room-suite.jpg",
      available: 2,
    },
    {
      id: "r4",
      name: "Presidential Suite",
      type: "presidential",
      price: 350000,
      capacity: 6,
      description: "The ultimate luxury experience with panoramic views, private terrace, and personalized service.",
      amenities: [
        "Master Bedroom",
        "Second Bedroom",
        "Private Terrace",
        "Panoramic View",
        "Private Chef",
        "24/7 Butler",
      ],
      image: "/eko-hotel-room-presidential.jpg",
      available: 1,
    },
  ],
  reviewsList: [
    {
      id: "rev1",
      user: "Chioma O.",
      avatar: "/nigerian-business-woman-portrait.jpg",
      rating: 5,
      date: "December 2025",
      title: "Exceptional Stay!",
      content:
        "The service was impeccable and the room exceeded my expectations. The ocean view from my deluxe room was breathtaking. Will definitely return!",
    },
    {
      id: "rev2",
      user: "Emmanuel A.",
      avatar: "/nigerian-man-smiling-portrait.jpg",
      rating: 5,
      date: "November 2025",
      title: "Perfect for Business",
      content:
        "Excellent location for business meetings. The executive lounge is well-equipped and the staff is very professional. Highly recommended for corporate stays.",
    },
    {
      id: "rev3",
      user: "Adaeze N.",
      avatar: "/nigerian-woman-professional.jpg",
      rating: 4,
      date: "November 2025",
      title: "Great Experience Overall",
      content:
        "Beautiful hotel with amazing amenities. The pool area is fantastic. Only minor issue was the slow room service on one occasion, but overall a great stay.",
    },
  ],
  ratingBreakdown: {
    cleanliness: 4.9,
    service: 4.8,
    location: 4.9,
    comfort: 4.7,
    value: 4.6,
  },
}

export default function HotelDetailsPage({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter()
  const { id } = use(params)
  const [currentImageIndex, setCurrentImageIndex] = useState(0)
  const [selectedRoom, setSelectedRoom] = useState<string | null>(null)
  const [dateRange, setDateRange] = useState<DateRange | undefined>()
  const [guests, setGuests] = useState("2")
  const [isFavorite, setIsFavorite] = useState(false)

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % hotelData.images.length)
  }

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + hotelData.images.length) % hotelData.images.length)
  }

  const selectedRoomData = hotelData.rooms.find((r) => r.id === selectedRoom)

  const calculateTotal = () => {
    if (!selectedRoomData || !dateRange?.from || !dateRange?.to) return 0
    const nights = Math.ceil((dateRange.to.getTime() - dateRange.from.getTime()) / (1000 * 60 * 60 * 24))
    return selectedRoomData.price * nights
  }

  const handleBookNow = () => {
    if (!selectedRoom || !dateRange?.from || !dateRange?.to) return
    const params = new URLSearchParams({
      hotelId: id,
      roomId: selectedRoom,
      checkIn: dateRange.from.toISOString(),
      checkOut: dateRange.to.toISOString(),
      guests: guests,
    })
    router.push(`/dashboard/booking?${params.toString()}`)
  }

  return (
    <div className="space-y-8">
      {/* Breadcrumb */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <Link href="/dashboard/hotels" className="hover:text-foreground">
          Hotels
        </Link>
        <span>/</span>
        <Link href={`/dashboard/hotels?state=${hotelData.state}`} className="hover:text-foreground">
          {hotelData.state}
        </Link>
        <span>/</span>
        <span className="text-foreground">{hotelData.name}</span>
      </div>

      {/* Image Gallery */}
      <div className="relative">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-2 h-[400px] md:h-[500px]">
          {/* Main Image */}
          <div className="md:col-span-2 md:row-span-2 relative rounded-l-xl overflow-hidden">
            <Image
              src={hotelData.images[currentImageIndex] || "/placeholder.svg"}
              alt={hotelData.name}
              fill
              className="object-cover"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent md:hidden" />

            {/* Mobile Navigation */}
            <div className="md:hidden absolute bottom-4 left-1/2 -translate-x-1/2 flex gap-2">
              {hotelData.images.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setCurrentImageIndex(idx)}
                  className={`w-2 h-2 rounded-full transition-colors ${idx === currentImageIndex ? "bg-white" : "bg-white/50"}`}
                />
              ))}
            </div>

            {/* Navigation Arrows */}
            <button
              onClick={prevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background md:hidden"
            >
              <ChevronLeft className="h-5 w-5" />
            </button>
            <button
              onClick={nextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-background/80 hover:bg-background md:hidden"
            >
              <ChevronRight className="h-5 w-5" />
            </button>
          </div>

          {/* Secondary Images */}
          {hotelData.images.slice(1, 5).map((image, idx) => (
            <div
              key={idx}
              className={`hidden md:block relative overflow-hidden cursor-pointer ${idx === 1 ? "rounded-tr-xl" : ""} ${idx === 3 ? "rounded-br-xl" : ""}`}
              onClick={() => setCurrentImageIndex(idx + 1)}
            >
              <Image
                src={image || "/placeholder.svg"}
                alt={`${hotelData.name} view ${idx + 2}`}
                fill
                className="object-cover hover:scale-105 transition-transform duration-300"
              />
            </div>
          ))}
        </div>

        {/* Action Buttons */}
        <div className="absolute top-4 right-4 flex gap-2">
          <Button
            variant="secondary"
            size="icon"
            onClick={() => setIsFavorite(!isFavorite)}
            className="bg-background/80 hover:bg-background"
          >
            <Heart className={`h-5 w-5 ${isFavorite ? "fill-destructive text-destructive" : ""}`} />
          </Button>
          <Button variant="secondary" size="icon" className="bg-background/80 hover:bg-background">
            <Share2 className="h-5 w-5" />
          </Button>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Main Content */}
        <div className="lg:col-span-2 space-y-8">
          {/* Hotel Header */}
          <div>
            <div className="flex items-center gap-2 mb-2">
              {[...Array(hotelData.stars)].map((_, i) => (
                <Star key={i} className="h-4 w-4 fill-fane-yellow text-fane-yellow" />
              ))}
              <Badge variant="secondary" className="ml-2">
                {hotelData.stars}-Star Hotel
              </Badge>
            </div>
            <h1 className="text-3xl font-bold mb-2">{hotelData.name}</h1>
            <p className="text-muted-foreground flex items-center gap-1">
              <MapPin className="h-4 w-4" />
              {hotelData.address}, {hotelData.city}, {hotelData.state}
            </p>

            <div className="flex items-center gap-6 mt-4">
              <div className="flex items-center gap-2">
                <div className="bg-primary/10 px-3 py-1 rounded-lg">
                  <span className="font-bold text-primary">{hotelData.rating}</span>
                </div>
                <div>
                  <p className="font-medium">Excellent</p>
                  <p className="text-xs text-muted-foreground">{hotelData.reviews.toLocaleString()} reviews</p>
                </div>
              </div>
            </div>
          </div>

          {/* Tabs */}
          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="rooms">Rooms</TabsTrigger>
              <TabsTrigger value="amenities">Amenities</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-6 space-y-6">
              <div>
                <h3 className="text-lg font-semibold mb-3">About This Hotel</h3>
                <p className="text-muted-foreground leading-relaxed">{hotelData.description}</p>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Check-in</p>
                    <p className="font-semibold">{hotelData.checkIn}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Clock className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Check-out</p>
                    <p className="font-semibold">{hotelData.checkOut}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Phone className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Phone</p>
                    <p className="font-semibold text-sm">{hotelData.phone}</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="pt-4 text-center">
                    <Mail className="h-6 w-6 mx-auto mb-2 text-primary" />
                    <p className="text-xs text-muted-foreground">Email</p>
                    <p className="font-semibold text-xs truncate">{hotelData.email}</p>
                  </CardContent>
                </Card>
              </div>

              <div>
                <h3 className="text-lg font-semibold mb-3">Hotel Policies</h3>
                <ul className="space-y-2">
                  {hotelData.policies.map((policy, idx) => (
                    <li key={idx} className="flex items-center gap-2 text-muted-foreground">
                      <Check className="h-4 w-4 text-fane-green" />
                      {policy}
                    </li>
                  ))}
                </ul>
              </div>
            </TabsContent>

            <TabsContent value="rooms" className="mt-6 space-y-4">
              {hotelData.rooms.map((room) => (
                <Card
                  key={room.id}
                  className={`overflow-hidden cursor-pointer transition-all ${selectedRoom === room.id ? "ring-2 ring-primary" : "hover:shadow-lg"}`}
                  onClick={() => setSelectedRoom(room.id)}
                >
                  <div className="flex flex-col md:flex-row">
                    <div className="relative w-full md:w-64 h-48 md:h-auto">
                      <Image src={room.image || "/placeholder.svg"} alt={room.name} fill className="object-cover" />
                      {room.available <= 2 && (
                        <Badge className="absolute top-2 left-2 bg-destructive">Only {room.available} left!</Badge>
                      )}
                    </div>
                    <CardContent className="flex-1 p-4">
                      <div className="flex justify-between items-start">
                        <div>
                          <h3 className="font-semibold text-lg">{room.name}</h3>
                          <p className="text-sm text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Up to {room.capacity} guests
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="text-xl font-bold text-primary">₦{room.price.toLocaleString()}</p>
                          <p className="text-xs text-muted-foreground">per night</p>
                        </div>
                      </div>
                      <p className="text-sm text-muted-foreground mt-2">{room.description}</p>
                      <div className="flex flex-wrap gap-2 mt-3">
                        {room.amenities.map((amenity) => (
                          <Badge key={amenity} variant="secondary" className="font-normal">
                            {amenity}
                          </Badge>
                        ))}
                      </div>
                      {selectedRoom === room.id && (
                        <div className="mt-4 pt-4 border-t">
                          <Badge className="bg-primary">Selected</Badge>
                        </div>
                      )}
                    </CardContent>
                  </div>
                </Card>
              ))}
            </TabsContent>

            <TabsContent value="amenities" className="mt-6">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {hotelData.amenities.map((amenity) => (
                  <Card key={amenity.name}>
                    <CardContent className="pt-6 text-center">
                      <amenity.icon className="h-8 w-8 mx-auto mb-2 text-primary" />
                      <p className="font-medium">{amenity.name}</p>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-6 space-y-6">
              {/* Rating Summary */}
              <Card>
                <CardContent className="pt-6">
                  <div className="flex flex-col md:flex-row gap-8">
                    <div className="text-center">
                      <p className="text-5xl font-bold text-primary">{hotelData.rating}</p>
                      <div className="flex justify-center gap-1 my-2">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-5 w-5 ${i < Math.floor(hotelData.rating) ? "fill-fane-yellow text-fane-yellow" : "text-muted"}`}
                          />
                        ))}
                      </div>
                      <p className="text-muted-foreground">{hotelData.reviews.toLocaleString()} reviews</p>
                    </div>
                    <div className="flex-1 space-y-3">
                      {Object.entries(hotelData.ratingBreakdown).map(([key, value]) => (
                        <div key={key} className="flex items-center gap-4">
                          <p className="w-24 text-sm capitalize">{key}</p>
                          <Progress value={value * 20} className="flex-1" />
                          <p className="w-8 text-sm font-medium">{value}</p>
                        </div>
                      ))}
                    </div>
                  </div>
                </CardContent>
              </Card>

              {/* Reviews List */}
              <div className="space-y-4">
                {hotelData.reviewsList.map((review) => (
                  <Card key={review.id}>
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={review.avatar || "/placeholder.svg"} />
                          <AvatarFallback>{review.user[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <p className="font-semibold">{review.user}</p>
                              <p className="text-sm text-muted-foreground">{review.date}</p>
                            </div>
                            <div className="flex gap-1">
                              {[...Array(review.rating)].map((_, i) => (
                                <Star key={i} className="h-4 w-4 fill-fane-yellow text-fane-yellow" />
                              ))}
                            </div>
                          </div>
                          <h4 className="font-medium mt-2">{review.title}</h4>
                          <p className="text-muted-foreground mt-1">{review.content}</p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Booking Sidebar */}
        <div className="lg:col-span-1">
          <Card className="sticky top-24">
            <CardHeader>
              <CardTitle>Book Your Stay</CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              {/* Date Selection */}
              <div className="space-y-2">
                <label className="text-sm font-medium flex items-center gap-1">
                  <CalendarIcon className="h-4 w-4" /> Check-in & Check-out
                </label>
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" className="w-full justify-start text-left font-normal bg-transparent">
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
                <label className="text-sm font-medium flex items-center gap-1">
                  <Users className="h-4 w-4" /> Guests
                </label>
                <Select value={guests} onValueChange={setGuests}>
                  <SelectTrigger>
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

              {/* Selected Room Summary */}
              {selectedRoomData && (
                <div className="p-4 bg-secondary rounded-lg space-y-2">
                  <p className="font-medium">{selectedRoomData.name}</p>
                  <p className="text-sm text-muted-foreground">₦{selectedRoomData.price.toLocaleString()} × night</p>
                  {dateRange?.from && dateRange?.to && (
                    <>
                      <hr />
                      <div className="flex justify-between font-semibold">
                        <span>Total</span>
                        <span className="text-primary">₦{calculateTotal().toLocaleString()}</span>
                      </div>
                    </>
                  )}
                </div>
              )}

              {!selectedRoom && (
                <div className="p-4 bg-secondary/50 rounded-lg text-center">
                  <p className="text-sm text-muted-foreground">Select a room from the Rooms tab to continue</p>
                </div>
              )}

              <Button
                className="w-full"
                size="lg"
                disabled={!selectedRoom || !dateRange?.from || !dateRange?.to}
                onClick={handleBookNow}
              >
                Book Now
              </Button>

              <div className="flex items-center justify-center gap-2 text-sm text-muted-foreground">
                <Shield className="h-4 w-4 text-fane-green" />
                Free cancellation up to 24 hours
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
