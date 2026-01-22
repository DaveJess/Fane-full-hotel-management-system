import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, MapPin, Clock, Users, Phone, Mail, CheckCircle2 } from "lucide-react"
import Image from "next/image"

const reservations = [
  {
    id: "RES-001",
    hotel: "Eko Hotels & Suites",
    location: "Victoria Island, Lagos",
    checkIn: "Jan 15, 2026",
    checkOut: "Jan 18, 2026",
    room: "Deluxe Room",
    roomNumber: "305",
    guests: 2,
    status: "active",
    daysUntil: 3,
    image: "/eko-hotel-lagos-exterior.jpg",
    hotelPhone: "+234 800 FANE",
    hotelEmail: "reservations@ekohotels.com",
    amenities: ["King Bed", "Ocean View", "Breakfast Included", "Free Wifi"],
  },
  {
    id: "RES-002",
    hotel: "Transcorp Hilton Abuja",
    location: "Maitama, Abuja",
    checkIn: "Jan 25, 2026",
    checkOut: "Jan 27, 2026",
    room: "Executive Suite",
    roomNumber: "1201",
    guests: 2,
    status: "upcoming",
    daysUntil: 13,
    image: "/transcorp-hilton-abuja-exterior.jpg",
    hotelPhone: "+234 800 HILTON",
    hotelEmail: "reservations@transcorphilton.com",
    amenities: ["King Bed", "City View", "Lounge Access", "Breakfast Included"],
  },
]

const statusConfig: Record<string, { color: string; label: string }> = {
  active: { color: "bg-fane-green/10 text-fane-green", label: "Active" },
  upcoming: { color: "bg-fane-blue/10 text-fane-blue", label: "Upcoming" },
  completed: { color: "bg-muted text-muted-foreground", label: "Completed" },
}

export default function ReservationsPage() {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold">Your Reservations</h2>
          <p className="text-muted-foreground">Manage and track your hotel reservations</p>
        </div>
      </div>

      <div className="space-y-6">
        {reservations.map((reservation) => (
          <Card key={reservation.id} className="overflow-hidden">
            <div className="flex flex-col lg:flex-row">
              {/* Image Section */}
              <div className="relative w-full lg:w-80 h-48 lg:h-auto">
                <Image
                  src={reservation.image || "/placeholder.svg"}
                  alt={reservation.hotel}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 left-4">
                  <Badge className={statusConfig[reservation.status].color}>
                    {statusConfig[reservation.status].label}
                  </Badge>
                </div>
              </div>

              {/* Content Section */}
              <div className="flex-1 p-6">
                <div className="flex flex-col md:flex-row md:items-start justify-between gap-4 mb-6">
                  <div>
                    <p className="text-sm text-muted-foreground mb-1">Reservation #{reservation.id}</p>
                    <h3 className="text-xl font-bold">{reservation.hotel}</h3>
                    <p className="text-muted-foreground flex items-center gap-1 mt-1">
                      <MapPin className="h-4 w-4" />
                      {reservation.location}
                    </p>
                  </div>

                  {reservation.status === "active" && (
                    <div className="bg-fane-green/10 p-4 rounded-xl text-center">
                      <p className="text-sm text-fane-green">Check-in in</p>
                      <p className="text-3xl font-bold text-fane-green">{reservation.daysUntil}</p>
                      <p className="text-sm text-fane-green">days</p>
                    </div>
                  )}
                </div>

                {/* Reservation Details */}
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Check-in</p>
                      <p className="text-sm font-medium">{reservation.checkIn}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Check-out</p>
                      <p className="text-sm font-medium">{reservation.checkOut}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Guests</p>
                      <p className="text-sm font-medium">{reservation.guests} Adults</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <p className="text-xs text-muted-foreground">Room</p>
                      <p className="text-sm font-medium">
                        {reservation.room} - #{reservation.roomNumber}
                      </p>
                    </div>
                  </div>
                </div>

                {/* Amenities */}
                <div className="mb-6">
                  <p className="text-sm font-medium mb-2">Room Amenities</p>
                  <div className="flex flex-wrap gap-2">
                    {reservation.amenities.map((amenity) => (
                      <Badge key={amenity} variant="secondary" className="font-normal">
                        <CheckCircle2 className="h-3 w-3 mr-1 text-fane-green" />
                        {amenity}
                      </Badge>
                    ))}
                  </div>
                </div>

                {/* Contact & Actions */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 pt-4 border-t">
                  <div className="flex flex-wrap gap-4 text-sm">
                    <a
                      href={`tel:${reservation.hotelPhone}`}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <Phone className="h-4 w-4" />
                      {reservation.hotelPhone}
                    </a>
                    <a
                      href={`mailto:${reservation.hotelEmail}`}
                      className="flex items-center gap-1 text-muted-foreground hover:text-foreground"
                    >
                      <Mail className="h-4 w-4" />
                      {reservation.hotelEmail}
                    </a>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" size="sm" className="bg-transparent">
                      Contact Hotel
                    </Button>
                    <Button size="sm">View Details</Button>
                  </div>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>

      {reservations.length === 0 && (
        <Card>
          <CardContent className="py-12 text-center">
            <Calendar className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
            <h3 className="font-semibold text-lg mb-2">No Active Reservations</h3>
            <p className="text-muted-foreground mb-4">You don&apos;t have any active reservations at the moment.</p>
            <Button>Browse Hotels</Button>
          </CardContent>
        </Card>
      )}
    </div>
  )
}
