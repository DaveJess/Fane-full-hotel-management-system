import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { MapPin, Calendar, CreditCard, Download, Eye, X } from "lucide-react"
import Image from "next/image"

const bookings = [
  {
    id: "BK-001",
    hotel: "Eko Hotels & Suites",
    location: "Victoria Island, Lagos",
    checkIn: "Jan 15, 2026",
    checkOut: "Jan 18, 2026",
    room: "Deluxe Room",
    guests: 2,
    totalPrice: 285000,
    status: "upcoming",
    paymentStatus: "paid",
    image: "/eko-hotel-lagos-exterior.jpg",
  },
  {
    id: "BK-002",
    hotel: "Transcorp Hilton Abuja",
    location: "Maitama, Abuja",
    checkIn: "Jan 25, 2026",
    checkOut: "Jan 27, 2026",
    room: "Executive Suite",
    guests: 2,
    totalPrice: 240000,
    status: "upcoming",
    paymentStatus: "paid",
    image: "/transcorp-hilton-abuja-exterior.jpg",
  },
  {
    id: "BK-003",
    hotel: "Sheraton Lagos Hotel",
    location: "Ikeja, Lagos",
    checkIn: "Dec 20, 2025",
    checkOut: "Dec 22, 2025",
    room: "Standard Room",
    guests: 1,
    totalPrice: 150000,
    status: "completed",
    paymentStatus: "paid",
    image: "/sheraton-lagos-hotel-pool.jpg",
  },
  {
    id: "BK-004",
    hotel: "Protea Hotel Ikeja",
    location: "Ikeja, Lagos",
    checkIn: "Nov 10, 2025",
    checkOut: "Nov 12, 2025",
    room: "Double Room",
    guests: 2,
    totalPrice: 110000,
    status: "completed",
    paymentStatus: "paid",
    image: "/protea-hotel-ikeja.jpg",
  },
  {
    id: "BK-005",
    hotel: "Le Meridien Ogeyi Place",
    location: "Port Harcourt, Rivers",
    checkIn: "Oct 5, 2025",
    checkOut: "Oct 7, 2025",
    room: "Deluxe Room",
    guests: 2,
    totalPrice: 130000,
    status: "cancelled",
    paymentStatus: "refunded",
    image: "/le-meridien-port-harcourt.jpg",
  },
]

const statusColors: Record<string, string> = {
  upcoming: "bg-fane-blue/10 text-fane-blue",
  completed: "bg-fane-green/10 text-fane-green",
  cancelled: "bg-destructive/10 text-destructive",
}

const paymentColors: Record<string, string> = {
  paid: "bg-fane-green/10 text-fane-green",
  pending: "bg-fane-yellow/10 text-fane-yellow-dark",
  refunded: "bg-muted text-muted-foreground",
}

function BookingCard({ booking }: { booking: (typeof bookings)[0] }) {
  return (
    <Card className="overflow-hidden">
      <div className="flex flex-col md:flex-row">
        <div className="relative w-full md:w-48 h-40 md:h-auto">
          <Image src={booking.image || "/placeholder.svg"} alt={booking.hotel} fill className="object-cover" />
        </div>
        <CardContent className="flex-1 p-4">
          <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
            <div className="flex-1">
              <div className="flex items-center gap-2 mb-2">
                <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                <Badge variant="outline" className={paymentColors[booking.paymentStatus]}>
                  {booking.paymentStatus}
                </Badge>
              </div>
              <h3 className="font-semibold text-lg">{booking.hotel}</h3>
              <p className="text-sm text-muted-foreground flex items-center gap-1 mb-3">
                <MapPin className="h-3 w-3" />
                {booking.location}
              </p>

              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
                <div>
                  <p className="text-muted-foreground">Booking ID</p>
                  <p className="font-medium">{booking.id}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-in</p>
                  <p className="font-medium">{booking.checkIn}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Check-out</p>
                  <p className="font-medium">{booking.checkOut}</p>
                </div>
                <div>
                  <p className="text-muted-foreground">Room Type</p>
                  <p className="font-medium">{booking.room}</p>
                </div>
              </div>
            </div>

            <div className="flex flex-col items-end gap-3">
              <div className="text-right">
                <p className="text-sm text-muted-foreground">Total Price</p>
                <p className="text-xl font-bold text-primary">₦{booking.totalPrice.toLocaleString()}</p>
              </div>
              <div className="flex gap-2">
                <Button size="sm" variant="outline" className="bg-transparent">
                  <Eye className="mr-1 h-4 w-4" />
                  Details
                </Button>
                {booking.paymentStatus === "paid" && (
                  <Button size="sm" variant="outline" className="bg-transparent">
                    <Download className="mr-1 h-4 w-4" />
                    Receipt
                  </Button>
                )}
                {booking.status === "upcoming" && (
                  <Button
                    size="sm"
                    variant="outline"
                    className="text-destructive hover:text-destructive bg-transparent"
                  >
                    <X className="mr-1 h-4 w-4" />
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </CardContent>
      </div>
    </Card>
  )
}

export default function BookingsPage() {
  const upcomingBookings = bookings.filter((b) => b.status === "upcoming")
  const completedBookings = bookings.filter((b) => b.status === "completed")
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  return (
    <div className="space-y-6">
      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Upcoming</p>
                <p className="text-3xl font-bold">{upcomingBookings.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-fane-blue/10 text-fane-blue">
                <Calendar className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Completed</p>
                <p className="text-3xl font-bold">{completedBookings.length}</p>
              </div>
              <div className="p-3 rounded-xl bg-fane-green/10 text-fane-green">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-muted-foreground">Total Spent</p>
                <p className="text-3xl font-bold">
                  ₦
                  {bookings
                    .filter((b) => b.paymentStatus === "paid")
                    .reduce((sum, b) => sum + b.totalPrice, 0)
                    .toLocaleString()}
                </p>
              </div>
              <div className="p-3 rounded-xl bg-fane-yellow/10 text-fane-yellow-dark">
                <CreditCard className="h-6 w-6" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="upcoming">Upcoming ({upcomingBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="upcoming" className="mt-6 space-y-4">
          {upcomingBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          {completedBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6 space-y-4">
          {cancelledBookings.map((booking) => (
            <BookingCard key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
