"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { CalendarDays, MapPin, Clock, Star, ArrowRight, Building2, CreditCard, Loader2, RefreshCw, Bell } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { useRealTimeDashboard } from "@/hooks/useRealTime"
import { useRealTimeNotifications } from "@/hooks/useRealTime"
import { useState, useEffect } from "react"

// Helper function to get user data from JWT token
const getUserFromToken = () => {
  if (typeof window !== 'undefined') {
    const token = localStorage.getItem('token');
    console.log('Token from localStorage:', token ? 'exists' : 'not found');
    
    if (token) {
      try {
        // Check if token looks like a JWT (has 3 parts separated by dots)
        const parts = token.split('.');
        if (parts.length !== 3) {
          console.warn('Token does not appear to be a valid JWT, parts:', parts.length);
          return null;
        }
        
        // Decode the payload (second part)
        const payload = JSON.parse(atob(parts[1]));
        console.log('Decoded JWT payload:', payload);
        return payload;
      } catch (error) {
        console.error('Error parsing token:', error);
        console.log('Token value (first 50 chars):', token.substring(0, 50) + '...');
        return null;
      }
    } else {
      console.log('No token found in localStorage');
    }
  }
  return null;
};

export default function DashboardPage() {
  const { stats, loading, error, lastUpdated, refresh } = useRealTimeDashboard(30000); // Update every 30 seconds
  const { notifications, unreadCount, addNotification, markAllAsRead } = useRealTimeNotifications()
  const [user, setUser] = useState<any>(null)

  // Get user data from token on component mount
  useEffect(() => {
    const fetchUserData = async () => {
      // First try to get from JWT token
      const userData = getUserFromToken();
      if (userData) {
        console.log('User data from JWT:', userData);
        setUser(userData);
      } else {
        // Don't try API call if JWT failed - just use generic fallback
        console.log('JWT token not valid, using generic user data');
        setUser({ firstName: 'User', lastName: '' });
      }
    };

    fetchUserData();
  }, []);

  // Format user name
  const getUserName = () => {
    if (!user) return "there"; // Loading state fallback
    if (user?.firstName && user?.lastName) {
      return `${user.firstName} ${user.lastName}`;
    }
    if (user?.firstName) {
      return user.firstName;
    }
    if (user?.email) {
      return user.email.split('@')[0]; // Use email username as fallback
    }
    return "there"; // Final fallback
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-96">
        <Loader2 className="h-8 w-8 animate-spin" />
        <p className="ml-2 text-muted-foreground">Loading dashboard...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">Error loading dashboard data: {error}</p>
        <Button onClick={refresh} className="mt-4">
          <RefreshCw className="h-4 w-4 mr-2" />
          Retry
        </Button>
      </div>
    )
  }

  // Add robust null checking and default values
  const safeStats = {
    totalBookings: stats?.totalBookings || 0,
    upcomingStays: stats?.upcomingStays || 0,
    favoriteHotels: stats?.favoriteHotels || 0,
    reviewsGiven: stats?.reviewsGiven || 0,
    recentBookings: stats?.recentBookings || [],
    recommendedHotels: stats?.recommendedHotels?.length > 0 ? stats.recommendedHotels : [
      {
        _id: "1",
        name: "Eko Hotel & Suites",
        location: "Victoria Island, Lagos",
        state: "Lagos",
        city: "Lagos Island",
        price: 85000,
        rating: 4.5,
        images: [
          "/eko-hotel-exterior-luxury.jpg",
          "/eko-hotel-room-single-deluxe.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "pool"],
        description: "Luxury hotel in the heart of Victoria Island with world-class amenities.",
        rooms: [
          { id: '1', type: 'Single Room', price: 85000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Deluxe Single', price: 95000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "2", 
        name: "Transcorp Hilton Abuja",
        location: "Central Business District, Abuja",
        state: "FCT",
        city: "Abuja",
        price: 120000,
        rating: 4.7,
        images: [
          "/transcorp-hilton-abuja-exterior.jpg",
          "/transcorp-hilton-executive-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "pool", "spa"],
        description: "Premium luxury hotel in Nigeria's capital city.",
        rooms: [
          { id: '1', type: 'Executive Single', price: 120000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Business Single', price: 100000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "3",
        name: "Lagos Continental Hotel",
        location: "Ikoyi, Lagos", 
        state: "Lagos",
        city: "Ikoyi",
        price: 95000,
        rating: 4.3,
        images: [
          "/lagos-continental-hotel-exterior.jpg",
          "/lagos-continental-standard-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "bar"],
        description: "Modern hotel with stunning views of Lagos skyline.",
        rooms: [
          { id: '1', type: 'Standard Single', price: 95000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Premium Single', price: 110000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "4",
        name: "Enugu Luxury Hotels",
        location: "Independence Layout, Enugu",
        state: "Enugu",
        city: "Enugu",
        price: 75000,
        rating: 4.2,
        images: [
          "/enugu-luxury-hotel-exterior.jpg",
          "/enugu-luxury-classic-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "gym", "conference"],
        description: "Comfortable hotel in the coal city with modern amenities.",
        rooms: [
          { id: '1', type: 'Classic Single', price: 75000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Comfort Single', price: 65000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "5",
        name: "Ibadan Grand Hotel",
        location: "Bodija, Ibadan",
        state: "Oyo",
        city: "Ibadan",
        price: 65000,
        rating: 4.0,
        images: [
          "/ibadan-grand-hotel-exterior.jpg",
          "/ibadan-grand-economy-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant", "bar"],
        description: "Affordable comfort in Nigeria's largest city.",
        rooms: [
          { id: '1', type: 'Economy Single', price: 65000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Standard Single', price: 55000, minGuests: 1, maxGuests: 1, available: true }
        ]
      },
      {
        _id: "6",
        name: "Kano Central Hotel",
        location: "Sabon Gari, Kano",
        state: "Kano",
        city: "Kano",
        price: 55000,
        rating: 3.8,
        images: [
          "/kano-central-hotel-exterior.jpg",
          "/kano-central-basic-room.jpg"
        ],
        amenities: ["wifi", "parking", "restaurant"],
        description: "Traditional hospitality in northern Nigeria's commercial hub.",
        rooms: [
          { id: '1', type: 'Basic Single', price: 55000, minGuests: 1, maxGuests: 1, available: true },
          { id: '2', type: 'Traditional Single', price: 45000, minGuests: 1, maxGuests: 1, available: true }
        ]
      }
    ]
  }

  const realStats = [
    { label: "Total Bookings", value: safeStats.totalBookings.toString(), icon: CalendarDays, change: "+2 this month", color: "text-fane-green" },
    { label: "Upcoming Stays", value: safeStats.upcomingStays.toString(), icon: Clock, change: "Next booking soon", color: "text-fane-blue" },
    { label: "Available Hotels", value: safeStats.favoriteHotels.toString(), icon: Building2, change: "Browse all", color: "text-fane-yellow-dark" },
    { label: "Reviews Given", value: safeStats.reviewsGiven.toString(), icon: Star, change: "Share your experience", color: "text-fane-green" },
  ]

  return (
    <div className="space-y-8">
      {/* Header with real-time status */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl font-bold">Welcome back, {getUserName()}!</h2>
          <p className="text-muted-foreground flex items-center gap-2">
            Here&apos;s what&apos;s happening with your bookings.
            <span className="text-xs text-muted-foreground">
              Last updated: {lastUpdated.toLocaleTimeString()}
            </span>
          </p>
        </div>
        <div className="flex items-center gap-2">
          <Button onClick={refresh} variant="outline" size="sm">
            <RefreshCw className="h-4 w-4 mr-2" />
            Refresh
          </Button>
          <div className="relative">
            <Bell className="h-5 w-5" />
            {unreadCount > 0 && (
              <Badge className="absolute -top-1 -right-1 h-5 w-5 rounded-full p-0 flex items-center justify-center text-xs bg-red-500">
                {unreadCount}
              </Badge>
            )}
          </div>
        </div>
      </div>

      {/* Live Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {realStats.map((stat) => (
          <Card key={stat.label} className="relative overflow-hidden">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-muted-foreground">{stat.label}</p>
                  <p className="text-3xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.change}</p>
                </div>
                <div className={`p-3 rounded-xl bg-secondary ${stat.color}`}>
                  <stat.icon className="h-6 w-6" />
                </div>
              </div>
              {/* Live indicator */}
              <div className="absolute top-2 right-2">
                <div className="flex items-center gap-1">
                  <div className="h-2 w-2 bg-green-500 rounded-full animate-pulse"></div>
                  <span className="text-xs text-green-600">Live</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Dynamic Recent Bookings */}
      <Card>
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>Recent Bookings</CardTitle>
            <CardDescription>Your latest booking activity</CardDescription>
          </div>
          <Link href="/dashboard/bookings">
            <Button variant="ghost" size="sm">
              View All <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {safeStats.recentBookings.length > 0 ? (
              safeStats.recentBookings.map((booking: any) => (
                <div
                  key={booking._id}
                  className="flex flex-col md:flex-row gap-4 p-4 rounded-lg border bg-card hover:bg-secondary/50 transition-colors"
                >
                  <div className="flex-1">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="font-semibold">{typeof booking.hotel === 'object' ? booking.hotel.name : 'Hotel Name'}</h3>
                        <p className="text-sm text-muted-foreground flex items-center gap-1">
                          <MapPin className="h-3 w-3" />
                          {typeof booking.hotel === 'object' ? booking.hotel.location : 'Location'}
                        </p>
                        <div className="flex items-center gap-4 mt-2 text-sm">
                          <span className="flex items-center gap-1">
                            <CalendarDays className="h-3 w-3" />
                            {new Date(booking.checkIn).toLocaleDateString()} - {new Date(booking.checkOut).toLocaleDateString()}
                          </span>
                          <Badge variant={booking.status === 'confirmed' ? 'default' : 'secondary'}>
                            {booking.status}
                          </Badge>
                        </div>
                      </div>
                      <div className="text-right">
                        <p className="font-semibold">₦{booking.totalPrice?.toLocaleString() || '0'}</p>
                      </div>
                    </div>
                  </div>
                </div>
              ))
            ) : (
              <div className="text-center py-8 text-muted-foreground">
                <p>No bookings yet. Book your first hotel to get started!</p>
                <Link href="/dashboard/hotels">
                  <Button className="mt-4">
                    <MapPin className="mr-2 h-4 w-4" />
                    Browse Hotels
                  </Button>
                </Link>
              </div>
            )}
          </div>
        </CardContent>
      </Card>

      {/* Dynamic Recommended Hotels */}
      <Card>
        <CardHeader>
          <CardTitle>Available Hotels</CardTitle>
          <CardDescription>Discover places to stay</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {safeStats.recommendedHotels.length > 0 ? (
              safeStats.recommendedHotels.map((hotel: any) => (
                <Card key={hotel._id} className="overflow-hidden hover:shadow-lg transition-shadow">
                  <div className="relative w-full h-48">
                    <Image
                      src={hotel.images?.[0] || "/placeholder.svg"}
                      alt={hotel.name}
                      fill
                      className="object-cover"
                    />
                    {/* Live availability indicator */}
                    <div className="absolute top-2 right-2">
                      <Badge className="bg-green-500 text-white">
                        Available
                      </Badge>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <h3 className="font-semibold">{hotel.name}</h3>
                    <p className="text-sm text-muted-foreground flex items-center gap-1">
                      <MapPin className="h-3 w-3" />
                      {hotel.location}
                    </p>
                    <p className="text-xs text-muted-foreground mt-1 line-clamp-2">
                      {hotel.description}
                    </p>
                    <div className="flex items-center justify-between mt-2">
                      <div className="flex items-center gap-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm">{hotel.rating || 4.0}</span>
                      </div>
                      <p className="font-semibold">₦{hotel.price?.toLocaleString() || '0'}</p>
                    </div>
                    <div className="flex flex-wrap gap-1 mt-2">
                      {hotel.amenities?.slice(0, 3).map((amenity: string, index: number) => (
                        <Badge key={index} variant="secondary" className="text-xs">
                          {amenity}
                        </Badge>
                      ))}
                      {hotel.amenities?.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{hotel.amenities.length - 3}
                        </Badge>
                      )}
                    </div>
                    <Link href={`/dashboard/hotels/${hotel._id}`}>
                      <Button className="w-full mt-3" size="sm">
                        View Details
                      </Button>
                    </Link>
                  </CardContent>
                </Card>
              ))
            ) : (
              <div className="col-span-full text-center py-8 text-muted-foreground">
                <p>No hotels available at the moment.</p>
              </div>
            )}
          </div>
        </CardContent>
      </Card>
    </div>
  )
}
