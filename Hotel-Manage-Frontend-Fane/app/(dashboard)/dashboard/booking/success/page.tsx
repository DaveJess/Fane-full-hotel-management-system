"use client"

import { useEffect, useState } from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import {
  CheckCircle2,
  Download,
  Mail,
  CalendarDays,
  MapPin,
  Clock,
  Users,
  Phone,
  Share2,
  ArrowRight,
} from "lucide-react"
import confetti from "canvas-confetti"

export default function BookingSuccessPage() {
  const [showContent, setShowContent] = useState(false)

  useEffect(() => {
    // Trigger confetti
    confetti({
      particleCount: 100,
      spread: 70,
      origin: { y: 0.6 },
      colors: ["#22c55e", "#fbbf24", "#3b82f6"],
    })

    // Delay content for animation
    setTimeout(() => setShowContent(true), 300)
  }, [])

  const booking = {
    id: "BK-" + Math.random().toString(36).substr(2, 9).toUpperCase(),
    hotel: "Eko Hotels & Suites",
    room: "Deluxe Room",
    location: "Victoria Island, Lagos",
    checkIn: "Jan 15, 2026",
    checkOut: "Jan 18, 2026",
    guests: 2,
    nights: 3,
    total: 300000,
    image: "/eko-hotel-lagos-exterior.jpg",
    phone: "+234 1 277 0000",
    email: "reservations@ekohotels.com",
  }

  return (
    <div
      className={`max-w-2xl mx-auto text-center transition-all duration-500 ${showContent ? "opacity-100 translate-y-0" : "opacity-0 translate-y-4"}`}
    >
      {/* Success Animation */}
      <div className="mb-8">
        <div className="w-20 h-20 mx-auto mb-6 rounded-full bg-fane-green/10 flex items-center justify-center animate-in zoom-in duration-500">
          <CheckCircle2 className="h-10 w-10 text-fane-green" />
        </div>
        <h1 className="text-3xl font-bold mb-2">Booking Confirmed!</h1>
        <p className="text-muted-foreground">
          Your reservation has been successfully made. A confirmation email has been sent to your email address.
        </p>
      </div>

      {/* Booking Details Card */}
      <Card className="text-left mb-6">
        <CardContent className="pt-6">
          <div className="flex items-center justify-between mb-4">
            <div>
              <p className="text-sm text-muted-foreground">Booking Reference</p>
              <p className="text-xl font-bold font-mono">{booking.id}</p>
            </div>
            <Badge className="bg-fane-green/10 text-fane-green">Confirmed</Badge>
          </div>

          <Separator className="my-4" />

          <div className="flex gap-4 mb-4">
            <div className="relative w-24 h-24 rounded-lg overflow-hidden">
              <Image src={booking.image || "/placeholder.svg"} alt={booking.hotel} fill className="object-cover" />
            </div>
            <div>
              <h3 className="font-semibold">{booking.hotel}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <MapPin className="h-3 w-3" />
                {booking.location}
              </p>
              <Badge variant="secondary" className="mt-1">
                {booking.room}
              </Badge>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Check-in
              </p>
              <p className="font-medium">{booking.checkIn}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <CalendarDays className="h-4 w-4" />
                Check-out
              </p>
              <p className="font-medium">{booking.checkOut}</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Clock className="h-4 w-4" />
                Duration
              </p>
              <p className="font-medium">{booking.nights} nights</p>
            </div>
            <div>
              <p className="text-sm text-muted-foreground flex items-center gap-1">
                <Users className="h-4 w-4" />
                Guests
              </p>
              <p className="font-medium">{booking.guests} Adults</p>
            </div>
          </div>

          <Separator className="my-4" />

          <div className="flex items-center justify-between">
            <span className="font-medium">Total Paid</span>
            <span className="text-xl font-bold text-primary">₦{booking.total.toLocaleString()}</span>
          </div>
        </CardContent>
      </Card>

      {/* Contact Info */}
      <Card className="text-left mb-6">
        <CardContent className="pt-6">
          <h3 className="font-semibold mb-3">Hotel Contact</h3>
          <div className="space-y-2">
            <a
              href={`tel:${booking.phone}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Phone className="h-4 w-4" />
              {booking.phone}
            </a>
            <a
              href={`mailto:${booking.email}`}
              className="flex items-center gap-2 text-muted-foreground hover:text-foreground"
            >
              <Mail className="h-4 w-4" />
              {booking.email}
            </a>
          </div>
        </CardContent>
      </Card>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3">
        <Button variant="outline" className="flex-1 bg-transparent">
          <Download className="mr-2 h-4 w-4" />
          Download Receipt
        </Button>
        <Button variant="outline" className="flex-1 bg-transparent">
          <Share2 className="mr-2 h-4 w-4" />
          Share
        </Button>
      </div>

      <div className="mt-6 flex flex-col sm:flex-row gap-3">
        <Link href="/dashboard/bookings" className="flex-1">
          <Button variant="secondary" className="w-full">
            View All Bookings
          </Button>
        </Link>
        <Link href="/dashboard/hotels" className="flex-1">
          <Button className="w-full">
            Book Another Hotel
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
    </div>
  )
}
