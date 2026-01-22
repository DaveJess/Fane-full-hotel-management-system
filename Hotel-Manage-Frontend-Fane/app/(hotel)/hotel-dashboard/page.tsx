import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Progress } from "@/components/ui/progress"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  CalendarDays,
  TrendingUp,
  BedDouble,
  Star,
  ArrowRight,
  CreditCard,
  Clock,
  CheckCircle2,
  XCircle,
  AlertCircle,
} from "lucide-react"
import Link from "next/link"

const stats = [
  { label: "Total Bookings", value: "156", icon: CalendarDays, change: "+12%", changeType: "positive" },
  { label: "Occupancy Rate", value: "78%", icon: BedDouble, change: "+5%", changeType: "positive" },
  { label: "Revenue (MTD)", value: "₦12.5M", icon: CreditCard, change: "+18%", changeType: "positive" },
  { label: "Avg. Rating", value: "4.8", icon: Star, change: "+0.2", changeType: "positive" },
]

const recentBookings = [
  {
    id: "BK-001",
    guest: "Adebayo Johnson",
    avatar: "/nigerian-business-man-portrait.jpg",
    room: "Deluxe Room 305",
    checkIn: "Jan 15",
    checkOut: "Jan 18",
    status: "confirmed",
    amount: 285000,
  },
  {
    id: "BK-002",
    guest: "Chioma Okafor",
    avatar: "/nigerian-business-woman-portrait.jpg",
    room: "Executive Suite 1201",
    checkIn: "Jan 16",
    checkOut: "Jan 19",
    status: "pending",
    amount: 450000,
  },
  {
    id: "BK-003",
    guest: "Mohammed Bello",
    avatar: "/nigerian-man-smiling-portrait.jpg",
    room: "Standard Room 102",
    checkIn: "Jan 17",
    checkOut: "Jan 18",
    status: "confirmed",
    amount: 75000,
  },
]

const todayActivity = [
  { type: "check-in", count: 5, icon: CheckCircle2, color: "text-fane-green" },
  { type: "check-out", count: 3, icon: XCircle, color: "text-fane-blue" },
  { type: "pending", count: 2, icon: AlertCircle, color: "text-fane-yellow-dark" },
]

const roomAvailability = [
  { type: "Standard", total: 20, available: 8, occupied: 12 },
  { type: "Deluxe", total: 15, available: 4, occupied: 11 },
  { type: "Suite", total: 8, available: 2, occupied: 6 },
  { type: "Presidential", total: 2, available: 1, occupied: 1 },
]

const statusColors: Record<string, string> = {
  confirmed: "bg-fane-green/10 text-fane-green",
  pending: "bg-fane-yellow/10 text-fane-yellow-dark",
  cancelled: "bg-destructive/10 text-destructive",
}

export default function HotelDashboardPage() {
  return (
    <div className="space-y-8">
      {/* Welcome Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, Eko Hotels!</h2>
          <p className="text-muted-foreground">Here&apos;s what&apos;s happening with your property today.</p>
        </div>
        <Link href="/hotel-dashboard/rooms">
          <Button>
            <BedDouble className="mr-2 h-4 w-4" />
            Manage Rooms
          </Button>
        </Link>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p
                    className={`text-xs flex items-center gap-1 mt-1 ${stat.changeType === "positive" ? "text-fane-green" : "text-destructive"}`}
                  >
                    <TrendingUp className="h-3 w-3" />
                    {stat.change} from last month
                  </p>
                </div>
                <div className="p-3 rounded-xl bg-primary/10 text-primary">
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Today's Activity */}
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Today&apos;s Activity
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {todayActivity.map((activity) => (
                <div key={activity.type} className="flex items-center justify-between p-3 bg-secondary rounded-lg">
                  <div className="flex items-center gap-3">
                    <activity.icon className={`h-5 w-5 ${activity.color}`} />
                    <span className="capitalize font-medium">{activity.type}</span>
                  </div>
                  <span className="text-2xl font-bold">{activity.count}</span>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Room Availability */}
        <Card className="lg:col-span-2">
          <CardHeader className="flex flex-row items-center justify-between">
            <div>
              <CardTitle>Room Availability</CardTitle>
              <CardDescription>Current room occupancy status</CardDescription>
            </div>
            <Link href="/hotel-dashboard/rooms">
              <Button variant="ghost" size="sm">
                View All <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            </Link>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {roomAvailability.map((room) => (
                <div key={room.type} className="space-y-2">
                  <div className="flex items-center justify-between text-sm">
                    <span className="font-medium">{room.type}</span>
                    <span className="text-muted-foreground">
                      {room.available} available / {room.total} total
                    </span>
                  </div>
                  <Progress value={(room.occupied / room.total) * 100} className="h-2" />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Latest reservations for your property</CardDescription>
          </div>
          <Link href="/hotel-dashboard/bookings">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {recentBookings.map((booking) => (
              <div
                key={booking.id}
                className="flex flex-col md:flex-row md:items-center justify-between gap-4 p-4 rounded-lg border"
              >
                <div className="flex items-center gap-4">
                  <Avatar>
                    <AvatarImage src={booking.avatar || "/placeholder.svg"} />
                    <AvatarFallback>{booking.guest[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{booking.guest}</p>
                    <p className="text-sm text-muted-foreground">{booking.room}</p>
                  </div>
                </div>
                <div className="flex items-center gap-6">
                  <div className="text-sm">
                    <p className="text-muted-foreground">Check-in</p>
                    <p className="font-medium">{booking.checkIn}</p>
                  </div>
                  <div className="text-sm">
                    <p className="text-muted-foreground">Check-out</p>
                    <p className="font-medium">{booking.checkOut}</p>
                  </div>
                  <Badge className={statusColors[booking.status]}>{booking.status}</Badge>
                  <p className="font-semibold text-primary">₦{booking.amount.toLocaleString()}</p>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
