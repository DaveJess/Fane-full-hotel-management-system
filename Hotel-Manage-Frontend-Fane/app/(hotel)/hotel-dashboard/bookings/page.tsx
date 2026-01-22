import type React from "react"
import { Card, CardContent } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Input } from "@/components/ui/input"
import { Search, CheckCircle2, XCircle, Clock, Download, Eye, MessageSquare } from "lucide-react"

const bookings = [
  {
    id: "BK-001",
    guest: "Adebayo Johnson",
    email: "adebayo@email.com",
    phone: "+234 803 456 7890",
    avatar: "/nigerian-business-man-portrait.jpg",
    room: "Deluxe Room",
    roomNumber: "305",
    checkIn: "Jan 15, 2026",
    checkOut: "Jan 18, 2026",
    nights: 3,
    guests: 2,
    status: "confirmed",
    paymentStatus: "paid",
    amount: 285000,
    bookingDate: "Jan 10, 2026",
  },
  {
    id: "BK-002",
    guest: "Chioma Okafor",
    email: "chioma@email.com",
    phone: "+234 805 123 4567",
    avatar: "/nigerian-business-woman-portrait.jpg",
    room: "Executive Suite",
    roomNumber: "1201",
    checkIn: "Jan 16, 2026",
    checkOut: "Jan 19, 2026",
    nights: 3,
    guests: 2,
    status: "pending",
    paymentStatus: "pending",
    amount: 450000,
    bookingDate: "Jan 11, 2026",
  },
  {
    id: "BK-003",
    guest: "Mohammed Bello",
    email: "mohammed@email.com",
    phone: "+234 809 876 5432",
    avatar: "/nigerian-man-smiling-portrait.jpg",
    room: "Standard Room",
    roomNumber: "102",
    checkIn: "Jan 17, 2026",
    checkOut: "Jan 18, 2026",
    nights: 1,
    guests: 1,
    status: "confirmed",
    paymentStatus: "paid",
    amount: 75000,
    bookingDate: "Jan 12, 2026",
  },
  {
    id: "BK-004",
    guest: "Amara Nwosu",
    email: "amara@email.com",
    phone: "+234 802 345 6789",
    avatar: "/nigerian-woman-professional.jpg",
    room: "Deluxe Room",
    roomNumber: "308",
    checkIn: "Jan 10, 2026",
    checkOut: "Jan 12, 2026",
    nights: 2,
    guests: 2,
    status: "checked-out",
    paymentStatus: "paid",
    amount: 190000,
    bookingDate: "Jan 5, 2026",
  },
  {
    id: "BK-005",
    guest: "Emeka Eze",
    email: "emeka@email.com",
    phone: "+234 806 234 5678",
    avatar: "",
    room: "Presidential Suite",
    roomNumber: "PH1",
    checkIn: "Jan 20, 2026",
    checkOut: "Jan 22, 2026",
    nights: 2,
    guests: 4,
    status: "cancelled",
    paymentStatus: "refunded",
    amount: 700000,
    bookingDate: "Jan 8, 2026",
  },
]

const statusConfig: Record<string, { color: string; icon: React.ElementType }> = {
  confirmed: { color: "bg-fane-green/10 text-fane-green", icon: CheckCircle2 },
  pending: { color: "bg-fane-yellow/10 text-fane-yellow-dark", icon: Clock },
  "checked-in": { color: "bg-fane-blue/10 text-fane-blue", icon: CheckCircle2 },
  "checked-out": { color: "bg-muted text-muted-foreground", icon: CheckCircle2 },
  cancelled: { color: "bg-destructive/10 text-destructive", icon: XCircle },
}

const paymentConfig: Record<string, string> = {
  paid: "bg-fane-green/10 text-fane-green",
  pending: "bg-fane-yellow/10 text-fane-yellow-dark",
  refunded: "bg-muted text-muted-foreground",
}

function BookingRow({ booking }: { booking: (typeof bookings)[0] }) {
  const StatusIcon = statusConfig[booking.status]?.icon || Clock

  return (
    <Card>
      <CardContent className="p-4">
        <div className="flex flex-col lg:flex-row lg:items-center gap-4">
          {/* Guest Info */}
          <div className="flex items-center gap-4 min-w-[200px]">
            <Avatar className="h-12 w-12">
              <AvatarImage src={booking.avatar || "/placeholder.svg"} />
              <AvatarFallback>{booking.guest[0]}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{booking.guest}</p>
              <p className="text-xs text-muted-foreground">{booking.id}</p>
            </div>
          </div>

          {/* Room Info */}
          <div className="flex-1 grid grid-cols-2 md:grid-cols-4 gap-4 text-sm">
            <div>
              <p className="text-muted-foreground">Room</p>
              <p className="font-medium">
                {booking.room} - {booking.roomNumber}
              </p>
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
              <p className="text-muted-foreground">Duration</p>
              <p className="font-medium">
                {booking.nights} {booking.nights === 1 ? "night" : "nights"}, {booking.guests}{" "}
                {booking.guests === 1 ? "guest" : "guests"}
              </p>
            </div>
          </div>

          {/* Status & Amount */}
          <div className="flex items-center gap-4">
            <div className="flex flex-col gap-1">
              <Badge className={statusConfig[booking.status]?.color}>
                <StatusIcon className="h-3 w-3 mr-1" />
                {booking.status}
              </Badge>
              <Badge variant="outline" className={paymentConfig[booking.paymentStatus]}>
                {booking.paymentStatus}
              </Badge>
            </div>
            <p className="font-bold text-primary min-w-[100px] text-right">₦{booking.amount.toLocaleString()}</p>
          </div>

          {/* Actions */}
          <div className="flex gap-2">
            <Button variant="outline" size="icon" className="bg-transparent" title="View Details">
              <Eye className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-transparent" title="Contact Guest">
              <MessageSquare className="h-4 w-4" />
            </Button>
            <Button variant="outline" size="icon" className="bg-transparent" title="Download Receipt">
              <Download className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </CardContent>
    </Card>
  )
}

export default function HotelBookingsPage() {
  const confirmedBookings = bookings.filter((b) => b.status === "confirmed")
  const pendingBookings = bookings.filter((b) => b.status === "pending")
  const completedBookings = bookings.filter((b) => b.status === "checked-out")
  const cancelledBookings = bookings.filter((b) => b.status === "cancelled")

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-xl font-semibold">Booking Management</h2>
          <p className="text-muted-foreground">View and manage all reservations</p>
        </div>
        <div className="flex gap-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input placeholder="Search bookings..." className="pl-10 w-64" />
          </div>
          <Button variant="outline" className="bg-transparent">
            <Download className="mr-2 h-4 w-4" />
            Export
          </Button>
        </div>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Total Bookings</p>
            <p className="text-3xl font-bold">{bookings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Confirmed</p>
            <p className="text-3xl font-bold text-fane-green">{confirmedBookings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Pending</p>
            <p className="text-3xl font-bold text-fane-yellow-dark">{pendingBookings.length}</p>
          </CardContent>
        </Card>
        <Card>
          <CardContent className="pt-6">
            <p className="text-sm text-muted-foreground">Revenue</p>
            <p className="text-3xl font-bold text-primary">
              ₦
              {bookings
                .filter((b) => b.paymentStatus === "paid")
                .reduce((sum, b) => sum + b.amount, 0)
                .toLocaleString()}
            </p>
          </CardContent>
        </Card>
      </div>

      {/* Bookings Tabs */}
      <Tabs defaultValue="all" className="w-full">
        <TabsList>
          <TabsTrigger value="all">All ({bookings.length})</TabsTrigger>
          <TabsTrigger value="confirmed">Confirmed ({confirmedBookings.length})</TabsTrigger>
          <TabsTrigger value="pending">Pending ({pendingBookings.length})</TabsTrigger>
          <TabsTrigger value="completed">Completed ({completedBookings.length})</TabsTrigger>
          <TabsTrigger value="cancelled">Cancelled ({cancelledBookings.length})</TabsTrigger>
        </TabsList>

        <TabsContent value="all" className="mt-6 space-y-4">
          {bookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="confirmed" className="mt-6 space-y-4">
          {confirmedBookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="pending" className="mt-6 space-y-4">
          {pendingBookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="completed" className="mt-6 space-y-4">
          {completedBookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TabsContent>

        <TabsContent value="cancelled" className="mt-6 space-y-4">
          {cancelledBookings.map((booking) => (
            <BookingRow key={booking.id} booking={booking} />
          ))}
        </TabsContent>
      </Tabs>
    </div>
  )
}
